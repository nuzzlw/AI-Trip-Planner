"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"

function SelectDays({
  onSelectedOption,
  initialDays = 3, // default to 3, will be overridden by AI hint
}: {
  onSelectedOption: (value: string) => void;
  initialDays?: number;
}) {
  const [days, setDays] = useState<number>(initialDays);

  const increase = () => setDays(prev => prev + 1);
  const decrease = () => {
    if (days > 1) setDays(prev => prev - 1);
  };

  return (
    <div className="bg-white p-5 rounded-xl mt-4 shadow-sm border w-full">
      <h2 className="text-lg font-semibold text-center">
        How many days do you want to travel?
      </h2>

      <div className="flex items-center justify-center gap-6 mt-4">
        <Button variant="outline" onClick={decrease}>-</Button>
        <span className="text-xl font-bold">{days} Days</span>
        <Button variant="outline" onClick={increase}>+</Button>
      </div>

      <div className="flex justify-center mt-5">
        <Button onClick={() => onSelectedOption(`${days} Days`)}>
          Confirm
        </Button>
      </div>
    </div>
  );
}

export default SelectDays;
