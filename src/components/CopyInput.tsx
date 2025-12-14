"use client";

import * as React from "react";
import { Check, Copy } from "lucide-react";
import { InputWithButton } from "@/components/ui/input-with-button";

export function CopyInput(props: React.ComponentProps<typeof InputWithButton>) {
  const [copied, setCopied] = React.useState(false);
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleCopy = () => {
    const value = props.value || props.defaultValue;
    if (value) {
      navigator.clipboard.writeText(value.toString());
      setCopied(true);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        setCopied(false);
        timeoutRef.current = null;
      }, 2000);
    }
  };

  return (
    <InputWithButton
      {...props}
      onButtonClick={handleCopy}
      button={
        copied ? (
          <Check className="text-green-500 dark:text-green-600" />
        ) : (
          <Copy />
        )
      }
    />
  );
}
