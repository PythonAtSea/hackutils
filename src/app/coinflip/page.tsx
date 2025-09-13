"use client";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

export default function Page() {
  const [result, setResult] = useState<"heads" | "tails" | null>(null);

  return (
    <div className="flex flex-row items-center justify-center py-2 size-full gap-4">
      <p onClick={() => setResult(null)} className="text-3xl text-bold">
        {result}
      </p>
      <Button
        onClick={() => setResult(Math.random() < 0.5 ? "heads" : "tails")}
      >
        flip
      </Button>
    </div>
  );
}
