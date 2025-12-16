"use client";
import SwapIcon from "@/components/IconSwapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function Page() {
  const [result, setResult] = useState<number | null>(null);
  const [min, setMin] = useState<number>(1);
  const [max, setMax] = useState<number>(6);
  const handleRoll = () => {
    if (min !== null && max !== null) {
      setResult(Math.floor(Math.random() * (max - min + 1)) + min);
    }
  };

  return (
    <div className="flex flex-row items-center justify-center py-2 size-full gap-4">
      <p
        className="text-9xl font-bold cursor-pointer"
        onClick={() => setResult(null)}
      >
        {result}
      </p>
      {!result && (
        <div className="flex flex-row gap-2 items-end">
          <div className="flex flex-col">
            <Label className="mb-1" htmlFor="randint-min">
              minimum value
            </Label>
            <Input
              id="randint-min"
              type="number"
              placeholder="1"
              defaultValue={min}
              onChange={(e) => setMin(Number(e.target.value))}
            />
          </div>
          <div className="flex flex-col">
            <Label className="mb-1" htmlFor="randint-max">
              maximum value
            </Label>
            <Input
              id="randint-max"
              type="number"
              placeholder="20"
              defaultValue={max}
              onChange={(e) => setMax(Number(e.target.value))}
            />
          </div>
          <Button
            onClick={handleRoll}
            disabled={min === null || max === null || min >= max}
          >
            <SwapIcon name="roll" />
          </Button>
        </div>
      )}
    </div>
  );
}
