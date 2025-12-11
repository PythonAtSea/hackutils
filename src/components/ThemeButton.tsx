"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useCallback, useEffect } from "react";
import { useImmersiveMode } from "./ImmersiveModeProvider";

export function ThemeButton() {
  const { setTheme, resolvedTheme } = useTheme();
  const { isImmersive } = useImmersiveMode();

  const toggleTheme = useCallback(() => {
    if (resolvedTheme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, [resolvedTheme, setTheme]);

  useEffect(() => {
    if (isImmersive) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === "m") {
        event.preventDefault();
        toggleTheme();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isImmersive, toggleTheme]);

  if (isImmersive) return null;

  return (
    <button
      className="fixed top-2 right-2 size-7 flex flex-row items-center justify-center rounded-md hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50"
      onClick={toggleTheme}
    >
      <Moon className="size-4 dark:scale-0" />
      <Sun className="size-4 absolute scale-0 dark:scale-100" />
    </button>
  );
}
