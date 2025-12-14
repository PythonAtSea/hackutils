"use client";

import {
  Pause,
  HelpCircle,
  Play,
  RotateCcw,
  Infinity,
  RotateCcwKey,
  HandCoins,
  Dices,
  Hash,
  Download,
  X,
} from "lucide-react";
import { JSX } from "react";
import { useIconPreference } from "./IconPreferenceProvider";

interface SwapIconProps {
  name: string;
}

export default function SwapIcon({ name }: SwapIconProps) {
  const { preference } = useIconPreference();

  const iconMap: { [key: string]: JSX.Element } = {
    start: <Play />,
    reset: <RotateCcw />,
    pause: <Pause />,
    lap: <Infinity />,
    "re-roll": <RotateCcwKey />,
    flip: <HandCoins />,
    roll: <Dices />,
    hash: <Hash />,
    download: <Download />,
    cancel: <X />,
  };
  return preference === "icon" ? (
    iconMap[name] || <HelpCircle />
  ) : (
    <span>{name}</span>
  );
}
