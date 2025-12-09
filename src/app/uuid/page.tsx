"use client";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export default function Page() {
  const [uuid, setUuid] = useState("");
  useEffect(() => {
    setUuid(crypto.randomUUID());
  }, []);
  return (
    <div className="flex flex-row items-center justify-center py-2 size-full gap-4">
      <p>{uuid}</p>
      <Button onClick={() => setUuid(crypto.randomUUID())}>generate</Button>
    </div>
  );
}
