"use client";
import { useState, useEffect } from "react";

export default function Clock() {
  const formatTime = (date: Date) => {
    return (
      date.getHours().toString().padStart(2, "0") +
      ":" +
      date.getMinutes().toString().padStart(2, "0") +
      ":" +
      date.getSeconds().toString().padStart(2, "0") +
      "." +
      date.getMilliseconds().toString().padStart(3, "0")
    );
  };

  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-2 size-full gap-4">
      <h1 className="text-9xl font-bold">{formatTime(time)}</h1>
    </div>
  );
}
