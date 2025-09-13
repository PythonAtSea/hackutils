"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
      <p className="text-9xl font-bold" onClick={() => setResult(null)}>
        {result}
      </p>
      {!result && (
        <>
          <Input
            type="number"
            placeholder="min"
            defaultValue={min}
            onChange={(e) => setMin(Number(e.target.value))}
          />
          <Input
            type="number"
            placeholder="max"
            defaultValue={max}
            onChange={(e) => setMax(Number(e.target.value))}
          />
          <Button onClick={handleRoll}>roll</Button>
        </>
      )}
    </div>
  );
}
