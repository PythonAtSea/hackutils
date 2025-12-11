"use client";

import * as React from "react";
import { useSidebar } from "@/components/ui/sidebar";

type ImmersiveModeContextType = {
  isImmersive: boolean;
  toggleImmersive: () => void;
};

const ImmersiveModeContext =
  React.createContext<ImmersiveModeContextType | null>(null);

export function useImmersiveMode() {
  const context = React.useContext(ImmersiveModeContext);
  if (!context) {
    throw new Error(
      "useImmersiveMode must be used within a ImmersiveModeProvider"
    );
  }
  return context;
}

export function ImmersiveModeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isImmersive, setIsImmersive] = React.useState(false);
  const { open, setOpen, openMobile, setOpenMobile, isMobile } = useSidebar();
  const [wasOpenBeforeImmersive, setWasOpenBeforeImmersive] =
    React.useState(open);

  const toggleImmersive = React.useCallback(() => {
    if (!isImmersive) {
      if (isMobile) {
        setWasOpenBeforeImmersive(openMobile);
        setOpenMobile(false);
      } else {
        setWasOpenBeforeImmersive(open);
        setOpen(false);
      }
      setIsImmersive(true);
    } else {
      if (isMobile) {
        setOpenMobile(wasOpenBeforeImmersive);
      } else {
        setOpen(wasOpenBeforeImmersive);
      }
      setIsImmersive(false);
    }
  }, [
    isImmersive,
    open,
    setOpen,
    openMobile,
    setOpenMobile,
    isMobile,
    wasOpenBeforeImmersive,
  ]);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "i") {
        e.preventDefault();
        toggleImmersive();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleImmersive]);

  React.useEffect(() => {
    const isOpen = isMobile ? openMobile : open;
    if (isImmersive && isOpen) {
      setIsImmersive(false);
    }
  }, [open, openMobile, isMobile, isImmersive]);

  return (
    <ImmersiveModeContext.Provider value={{ isImmersive, toggleImmersive }}>
      {children}
    </ImmersiveModeContext.Provider>
  );
}
