"use client";

import { useEffect, useState } from "react";
import { useSidebar } from "@/components/ui/sidebar";
import { Kbd, KbdGroup } from "./ui/kbd";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";

export function KeyboardLegend() {
  const { isMobile, open } = useSidebar();
  const [isOpen, setIsOpen] = useState(false);

  const shortcuts = [
    {
      keys: ["Ctrl", "?"],
      description: "view keyboard shortcuts",
    },
  ];

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const isSlashKey = e.key === "/" || e.key === "?" || e.code === "Slash";
      if (isSlashKey && e.ctrlKey && !e.metaKey && !e.altKey) {
        const active = document.activeElement as HTMLElement | null;
        if (!active) {
          setIsOpen(true);
          return;
        }
        const tag = active.tagName;
        const isEditable = active.isContentEditable;
        if (tag !== "INPUT" && tag !== "TEXTAREA" && !isEditable) {
          setIsOpen(true);
        }
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  if (isMobile) return null;

  return (
    <>
      <div
        className="fixed bottom-2 z-50 bg-background transition-all duration-200 ease-linear flex flex-row items-center gap-4"
        style={{ left: open ? "calc(16rem + 0.5rem)" : "0.5rem" }}
      >
        <p className="text-muted-foreground text-sm">
          <KbdGroup className="mr-1">
            <Kbd>ctrl</Kbd>
            <span>+</span>
            <Kbd>?</Kbd>
          </KbdGroup>
          view keyboard shortcuts
        </p>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Keyboard Shortcuts</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col">
            {shortcuts.map((shortcut, index) => (
              <div
                key={index}
                className="flex flex-row items-center justify-between even:bg-neutral-900 p-2"
              >
                <KbdGroup>
                  {shortcut.keys.map((key, keyIndex) => (
                    <>
                      <Kbd key={keyIndex + "key"}>{key}</Kbd>
                      {keyIndex < shortcut.keys.length - 1 && (
                        <span className="mx-1" key={keyIndex + "plus"}>
                          +
                        </span>
                      )}
                    </>
                  ))}
                </KbdGroup>
                <p className="text-sm text-muted-foreground">
                  {shortcut.description}
                </p>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
