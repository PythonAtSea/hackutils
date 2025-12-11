"use client";

import { useSidebar } from "@/components/ui/sidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useImmersiveMode } from "@/components/ImmersiveModeProvider";

export function FloatingSidebarTrigger() {
  const { isMobile, open } = useSidebar();
  const { isImmersive } = useImmersiveMode();
  const shouldShift = !isMobile && open;

  if (isImmersive) return null;

  return (
    <div
      className="fixed top-2 z-50 transition-all duration-200 ease-linear"
      style={{ left: shouldShift ? "calc(16rem + 0.5rem)" : "0.5rem" }}
    >
      <SidebarTrigger />
    </div>
  );
}
