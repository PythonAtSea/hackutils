"use client";
import SwapIcon from "@/components/IconSwapper";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Page() {
  const [result, setResult] = useState<"heads" | "tails" | null>(null);

  return (
    <div className="flex flex-row items-center justify-center py-2 size-full gap-4">
      <p
        onClick={() => setResult(null)}
        className="text-9xl text-bold cursor-pointer select-none"
      >
        {result}
      </p>
      {!result && (
        <Button
          className="select-none"
          onClick={() => setResult(Math.random() < 0.5 ? "heads" : "tails")}
        >
          <SwapIcon name="flip" />
        </Button>
      )}
    </div>
  );
}
