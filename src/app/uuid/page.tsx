"use client";
import { Button } from "@/components/ui/button";
import { Check, Copy } from "lucide-react";
import { useEffect, useState } from "react";

export default function Page() {
  const [uuid, setUuid] = useState("");
  const [copyIcon, setCopyIcon] = useState(<Copy size={16} />);

  useEffect(() => {
    setUuid(crypto.randomUUID());
  }, []);
  return (
    <div className="flex flex-row items-center justify-center py-2 size-full gap-4">
      {uuid && (
        <>
          <div className="rounded-md h-9 border bg-background text-center justify-center flex flex-col items-center px-3 py-2 select-all shadow-xs dark:border-input dark:bg-border/30">
            {uuid}
          </div>
          <Button
            variant="outline"
            onClick={() => {
              navigator.clipboard.writeText(uuid);
              setCopyIcon(<Check size={16} />);
              setTimeout(() => setCopyIcon(<Copy size={16} />), 1000);
            }}
          >
            {copyIcon}
          </Button>
        </>
      )}
      <Button onClick={() => setUuid(crypto.randomUUID())}>re-roll</Button>
    </div>
  );
}
