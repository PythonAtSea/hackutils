import * as React from "react";

import { cn } from "@/lib/utils";

function InputWithButton({
  className,
  type,
  button,
  onButtonClick,
  ...props
}: React.ComponentProps<"input"> & {
  button?: React.ReactNode;
  onButtonClick?: React.MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 border-input h-9 w-full rounded-md border bg-transparent shadow-xs transition-[color,box-shadow] dark:bg-input/30",
        "focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        props.disabled && "opacity-50 cursor-not-allowed pointer-events-none",
        className
      )}
    >
      <input
        type={type}
        data-slot="input"
        className={cn(
          "pl-3 flex-1 h-full min-w-0 bg-transparent text-base placeholder:text-muted-foreground outline-none selection:bg-primary selection:text-primary-foreground md:text-sm",
          "file:text-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium"
        )}
        {...props}
      />
      <button
        type="button"
        onClick={onButtonClick}
        onMouseDown={(e) => e.preventDefault()}
        className="m-1 rounded-sm bg-primary text-primary-foreground hover:bg-primary/90 size-7 cursor-pointer p-1.5 flex items-center justify-center active:scale-95 transition-all"
      >
        {button}
      </button>
    </div>
  );
}

export { InputWithButton };
