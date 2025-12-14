"use client";
import CopyBox from "@/components/CopyBox";
import SwapIcon from "@/components/IconSwapper";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export default function Page() {
  const [uuid, setUuid] = useState("");

  useEffect(() => {
    setUuid(crypto.randomUUID());
  }, []);
  return (
    <div className="flex flex-row items-center justify-center py-2 size-full gap-4">
      {uuid && <CopyBox>{uuid}</CopyBox>}
      <Button onClick={() => setUuid(crypto.randomUUID())}>
        <SwapIcon name="re-roll" />
      </Button>
    </div>
  );
}
