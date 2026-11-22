import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";
import { premiumAj, freeAj } from "../arcjet/config";
import { auth, currentUser } from "@clerk/nextjs/server";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY! });

const PROMPT = `
You are an AI Trip Planner Agent. Your goal is to help the user plan a trip.

CRITICAL RULES:
1. ALWAYS scan the ENTIRE conversation history for already-provided information before asking anything.
2. If the user's very first message contains info like "mumbai to goa, 3 days", extract:
   - origin = "Mumbai", destination = "Goa", duration = "3 Days"
   And do NOT ask for those agains.
3. Ask only ONE question at a time, only for info that is genuinely missing.
4. Collect these details (skip any already provided):
   - Origin (starting location)
   - Destination
   - Group size
   - Budget
   - Trip duration
   - Travel interests / special requirements
5. Never re-ask something the user already answered.
6. Once ALL 6 details are collected, set ui to "final".

Response format — always return strict JSON:
{
  "resp": "Your conversational message here",
  "ui": "budget | groupSize | tripDuration | final | null"
}

- Use "groupSize" ui only if group size is unknown
- Use "budget" ui only if budget is unknown  
- Use "tripDuration" ui only if duration is unknown AND include the extracted duration as a hint if partially known
- Use "final" when everything is collected
- Use null when just chatting

Return JSON only. No extra text outside JSON.
`;

const FINAL_PROMPT = `
Generate a complete travel plan using the collected details from the conversation.

Return strictly valid JSON in this schema:

{
  "trip_plan": {
    "destination": "string",
    "duration": "string",
    "origin": "string",
    "budget": "string",
    "group_size": "string",
    "hotels": [
      {
        "hotel_name": "string",
        "hotel_address": "string",
        "price_per_night": "string",
        "hotel_image_url": "string",
        "geo_coordinates": {
          "latitude": 0,
          "longitude": 0
        },
        "rating": 0,
        "description": "string"
      }
    ],
    "itinerary": [
      {
        "day": 1,
        "day_plan": "string",
        "best_time_to_visit_day": "string",
        "activities": [
          {
            "place_name": "string",
            "place_details": "string",
            "place_image_url": "string",
            "geo_coordinates": {
              "latitude": 0,
              "longitude": 0
            },
            "place_address": "string",
            "ticket_pricing": "string",
            "time_travel_each_location": "string",
            "best_time_to_visit": "string"
          }
        ]
      }
    ]
  }
}

Return JSON only. No explanations.
`;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages, isFinal } = body;

    let user;
    try {
      user = await currentUser();
    } catch (authErr) {
      console.error("Clerk currentUser() failed:", authErr);
      return NextResponse.json(
        { error: "Authentication failed. Please refresh and try again." },
        { status: 401 }
      );
    }

    let hasPremiumAccess = false;
    try {
      const { has } = await auth();
      hasPremiumAccess = has({ plan: "monthly" });
    } catch (planErr) {
      console.warn("Plan check failed (non-fatal):", planErr);
    }

    console.log("hasPremiumAccess:", hasPremiumAccess);

    try {
      const aj = hasPremiumAccess ? premiumAj : freeAj;

      const decision = await aj.protect(req, {
        userId: user?.primaryEmailAddress?.emailAddress ?? "anonymous",
        requested: isFinal ? 5 : 1,
      });

      console.log("Arcjet decision:", decision);

      if (decision.isDenied()) {
        return NextResponse.json({
          resp: "No Free Credit Remaining",
          ui: "limit",
        });
      }
    } catch (arcjetErr) {
      console.warn("Arcjet protect() failed (non-fatal):", arcjetErr);
    }

    if (!process.env.GROQ_API_KEY) {
      console.error("GROQ_API_KEY is not set");
      return NextResponse.json(
        { error: "Server misconfiguration: missing API key." },
        { status: 500 }
      );
    }

    let responseText: string;
    try {
      const systemPrompt = isFinal ? FINAL_PROMPT : PROMPT;

      // Build messages array for Groq (OpenAI-compatible format)
      const groqMessages: { role: "system" | "user" | "assistant"; content: string }[] = [
        { role: "system", content: systemPrompt },
        ...messages.slice(-7).map((msg: any) => ({
          role: msg.role === "assistant" ? "assistant" : "user",
          content: msg.content,
        })),
      ];

      const result = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: groqMessages,
        max_tokens: isFinal ? 4096 : 1024,
        temperature: 0.7,
        response_format: { type: "json_object" },
      });

      responseText = result.choices[0]?.message?.content ?? "{}";

    } catch (groqErr: any) {
      console.error("Groq API error:", groqErr);
      if (groqErr?.status === 429) {
        return NextResponse.json(
          { error: "AI rate limit reached. Please wait a moment and try again." },
          { status: 429 }
        );
      }
      return NextResponse.json(
        { error: `AI service error: ${groqErr?.message ?? "Unknown error"}` },
        { status: 500 }
      );
    }

    const rawContent = responseText ?? "{}";
    console.log("AI RAW RESPONSE:", rawContent);

    const cleaned = rawContent.replace(/^```json\s*|^```\s*|```$/gm, "").trim();

    let parsed;
    try {
      parsed = JSON.parse(cleaned);
    } catch (parseErr) {
      console.error("JSON Parse Error. Raw content:", rawContent);
      return NextResponse.json(
        { error: "AI returned an invalid response. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json(parsed);

  } catch (error: any) {
    console.error("Unhandled API route error:", error);
    return NextResponse.json(
      { error: error?.message ?? "An unexpected error occurred." },
      { status: 500 }
    );
  }
}