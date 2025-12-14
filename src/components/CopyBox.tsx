"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

interface CopyBoxProps {
  children: React.ReactNode;
}

export default function CopyBox({ children }: CopyBoxProps) {
  const [copyIcon, setCopyIcon] = useState(<Copy size={16} className="ml-3" />);

  return (
    <div
      className="rounded-md h-9 border bg-background text-center justify-center flex flex-row items-center px-3 py-2 select-none shadow-xs dark:border-input dark:bg-border/30 cursor-pointer hover:bg-accent dark:hover:bg-input/50 transition-all active:scale-[0.97]"
      onClick={() => {
        navigator.clipboard.writeText(children as string);
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
      {children}
      {copyIcon}
    </div>
  );
}
