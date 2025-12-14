"use client";
import SwapIcon from "@/components/IconSwapper";
import { Button } from "@/components/ui/button";
import { Check, Copy } from "lucide-react";
import { useEffect, useState } from "react";

export default function Page() {
  const [uuid, setUuid] = useState("");
  const [copyIcon, setCopyIcon] = useState(<Copy size={16} className="ml-3" />);

  useEffect(() => {
    setUuid(crypto.randomUUID());
  }, []);
  return (
    <div className="flex flex-row items-center justify-center py-2 size-full gap-4">
      {uuid && (
        <>
          <div
            className="rounded-md h-9 border bg-background text-center justify-center flex flex-row items-center px-3 py-2 select-none shadow-xs dark:border-input dark:bg-border/30 cursor-pointer hover:bg-accent dark:hover:bg-input/50 transition-all"
            onClick={() => {
              navigator.clipboard.writeText(uuid);
              setCopyIcon(
                <Check
                  size={16}
                  className="ml-3 text-green-600 dark:text-green-400"
                />
              );
              setTimeout(
                () => setCopyIcon(<Copy size={16} className="ml-3" />),
                2000
              );
            }}
          >
            {uuid}
            {copyIcon}
          </div>
        </>
      )}
      <Button onClick={() => setUuid(crypto.randomUUID())}>
        <SwapIcon name="re-roll" />
      </Button>
    </div>
  );
}
