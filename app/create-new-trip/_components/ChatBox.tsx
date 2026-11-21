"use client"
import EmptyBoxState from './EmptyBoxState'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import axios, { AxiosError } from 'axios'
import { Loader, Send } from 'lucide-react'
import React, { useState } from 'react'
import GroupSizeUi from './GroupSizeUi'
import BudgetUi from './BudgetUi'
import SelectDays from './SelectDays'
import FinalUi from './FinalUi'
import { useMutation } from 'convex/react'
import { api } from "@/convex/_generated/api"
import { useUserDetail } from "@/context/UserDetailContext"
import { v4 as uuidv4 } from 'uuid';
import { useTripDetail } from '@/app/provider'

type Message = {
    role: string,
    content: string,
    ui?: string,
    durationHint?: number,
}
export type TripInfo = {
    budget: string;
    destination: string;
    duration: string;
    group_size: string;
    origin: string;
    hotels: Hotel[];
    itinerary: Itinerary[];
};

export type Hotel = {
    hotel_name: string;
    hotel_address: string;
    price_per_night: string;
    hotel_image_url: string;
    geo_coordinates: {
        latitude: number;
        longitude: number;
    };
    rating: number;
    description: string;
}

export type Activity = {
    place_name: string;
    place_details: string;
    place_image_url: string;
    geo_coordinates: {
        latitude: number;
        longitude: number;
    };
    place_address: string;
    ticket_pricing: string;
    time_travel_each_location: string;
    best_time_to_visit: string;
};

export type Itinerary = {
    day: number;
    day_plan: string;
    best_time_to_visit_day: string;
    activities: Activity[];
};


function extractDaysFromMessages(messages: Message[]): number {
    for (const msg of messages) {
        const match = msg.content.match(/(\d+)\s*day/i);
        if (match) return parseInt(match[1]);
    }
    return 3;
}

function getTripPlanFromResponse(data: any): TripInfo | null {
    if (!data || typeof data !== "object") return null;
    return data.trip_plan ?? data.tripPlan ?? data.data?.trip_plan ?? null;
}

/** Extract a human-readable message from an Axios error */
function getErrorMessage(error: unknown): string {
    if (error instanceof AxiosError) {
        const status = error.response?.status;
        const serverMsg =
            error.response?.data?.error ||
            error.response?.data?.message ||
            error.response?.data;

        if (status === 500) {
            return typeof serverMsg === "string" && serverMsg
                ? `Server error: ${serverMsg}`
                : "The server encountered an error. Please try again in a moment.";
        }
        if (status === 429) return "Too many requests. Please wait a moment before trying again.";
        if (status === 401) return "Authentication error. Please refresh the page and try again.";
        if (status === 400) return `Bad request: ${typeof serverMsg === "string" ? serverMsg : "Invalid input."}`;
        return `Request failed (${status ?? "unknown"}). Please try again.`;
    }
    if (error instanceof Error) return error.message;
    return "Something went wrong. Please try again.";
}

function ChatBox() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [userInput, setUserInput] = useState<string>('');
    const [loading, setLoading] = useState(false);
    const [tripDetail, setTripDetail] = useState<TripInfo>()
    const SaveTripDetail = useMutation(api.tripDetail.CreateTripDetail)
    const { userDetail } = useUserDetail();
    const { setTripDetailInfo } = useTripDetail();

    const appendAssistantError = (content: string) => {
        setMessages((prev) => [
            ...prev,
            { role: "assistant", content }
        ]);
    };

    const onSend = async (inputValue?: string, isFinalStep?: boolean) => {
        const messageToSend = inputValue ?? userInput;
        if (!messageToSend?.trim()) return;

        setLoading(true);
        setUserInput('');

        const newMsg: Message = {
            role: 'user',
            content: messageToSend
        };

        const updatedMessages = [...messages, newMsg];
        setMessages(updatedMessages);

        try {
            const result = await axios.post('/api/aimodel', {
                messages: updatedMessages,
                isFinal: isFinalStep || false
            });

            console.log("RESPONSE:", result.data);

            if (!isFinalStep) {
                const durationHint =
                    result?.data?.ui === 'tripDuration'
                        ? extractDaysFromMessages(updatedMessages)
                        : undefined;

                setMessages((prev: Message[]) => [
                    ...prev,
                    {
                        role: 'assistant',
                        content: result?.data?.resp,
                        ui: result?.data?.ui,
                        durationHint,
                    }
                ]);
            } else {
                console.log("FINAL TRIP PLAN");
                const tripId = uuidv4();
                const tripPlan = getTripPlanFromResponse(result?.data);

                if (!tripPlan) {
                    const fallbackMessage =
                        result?.data?.resp ||
                        result?.data?.error ||
                        "Couldn't generate a trip plan right now. Please try again.";

                    appendAssistantError(fallbackMessage);
                    setLoading(false);
                    return;
                }

                if (!userDetail?._id) {
                    console.error("User not logged in");
                    appendAssistantError("Please log in to save your trip.");
                    setLoading(false);
                    return;
                }

                setTripDetail(tripPlan);
                setTripDetailInfo(tripPlan);

                await SaveTripDetail({
                    tripDetail: tripPlan,
                    tripId: tripId,
                    uid: userDetail._id,
                });
            }

        } catch (error) {
            console.error("ChatBox error:", error);
            appendAssistantError(getErrorMessage(error));
        }

        setLoading(false);
    };

    const RenderGenerativeUi = (ui: string, durationHint?: number) => {
        if (ui === 'budget') {
            return <BudgetUi onSelectedOption={(v: string) => onSend(v)} />
        }
        else if (ui === 'groupSize') {
            return <GroupSizeUi onSelectedOption={(v: string) => onSend(v)} />
        }
        else if (ui === 'tripDuration') {
            return <SelectDays
                initialDays={durationHint ?? 3}
                onSelectedOption={(v: string) => onSend(v)}
            />
        }
        else if (ui === 'final') {
            return <FinalUi viewTrip={() => onSend("Generate My Trip", true)} />
        }

        return null;
    };

    return (
        <div className='h-[85vh] flex flex-col border shadow rounded-2xl p-5'>
            {messages?.length === 0 &&
                <EmptyBoxState onSelectOption={(v: string) => onSend(v)} />
            }

            <section className='flex-1 overflow-y-auto p-4'>
                {messages.map((msg: Message, index) => (
                    msg.role === 'user' ?
                        <div className='flex justify-end mt-2' key={index}>
                            <div className='max-w-lg bg-primary text-white px-4 py-2 rounded-lg'>
                                {msg.content}
                            </div>
                        </div> :
                        <div className='flex justify-start mt-2' key={index}>
                            <div className='max-w-lg bg-gray-100 text-black px-4 py-2 rounded-lg'>
                                {msg.content}
                                {RenderGenerativeUi(msg.ui ?? '', msg.durationHint)}
                            </div>
                        </div>
                ))}

                {loading &&
                    <div className='flex justify-start mt-2'>
                        <div className='max-w-lg bg-gray-100 text-black px-4 py-2 rounded-lg'>
                            <Loader className="animate-spin" />
                        </div>
                    </div>
                }
            </section>

            <section>
                <div className="border rounded-2xl p-4 relative">
                    <Textarea
                        placeholder="Start Typing here"
                        className="w-full h-28 bg-transparent border-none shadow-none focus-visible:ring-0 resize-none"
                        onChange={(event) => setUserInput(event.target.value)}
                        value={userInput}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey && !loading) {
                                e.preventDefault();
                                onSend();
                            }
                        }}
                    />
                    <Button
                        disabled={loading}
                        className="text-center absolute bottom-6 right-6"
                        size={'icon'}
                        onClick={() => onSend()}
                    >
                        <Send className="h-4 w-4" />
                    </Button>
                </div>
            </section>
        </div>
    )
}

export default ChatBox;
