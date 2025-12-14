"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";

type IconPreference = "icon" | "text";

interface IconPreferenceContextType {
  preference: IconPreference;
  setPreference: (preference: IconPreference) => void;
  togglePreference: () => void;
}

const IconPreferenceContext = createContext<
  IconPreferenceContextType | undefined
>(undefined);

export function IconPreferenceProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [preference, setPreference] = useState<IconPreference>("text");

  const togglePreference = useCallback(() => {
    setPreference((prev) => (prev === "icon" ? "text" : "icon"));
  }, []);

  useEffect(() => {
    document.cookie = `iconPreference=${preference}; path=/; max-age=31536000`;
  }, [preference]);

  useEffect(() => {
    const cookies = document.cookie.split("; ").reduce(
      (acc, cookie) => {
        const [key, value] = cookie.split("=");
        acc[key] = value;
        return acc;
      },
      {} as Record<string, string>
    );
    const savedPreference = cookies.iconPreference as IconPreference;
    if (
      savedPreference &&
      (savedPreference === "icon" || savedPreference === "text")
    ) {
      setPreference(savedPreference);
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && e.key.toLowerCase() === "l") {
        e.preventDefault();
        togglePreference();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [togglePreference]);

  return (
    <IconPreferenceContext.Provider
      value={{ preference, setPreference, togglePreference }}
    >
      {children}
    </IconPreferenceContext.Provider>
  );
}

export function useIconPreference() {
  const context = useContext(IconPreferenceContext);
  if (context === undefined) {
    throw new Error(
      "useIconPreference must be used within an IconPreferenceProvider"
    );
  }
  return context;
}
