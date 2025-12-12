"use client";
import { Button } from "@/components/ui/button";

import React, { useRef, useState, useEffect } from "react";

export default function Page() {
  const [elapsed, setElapsed] = useState(0);
  const [running, setRunning] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);
  const [lapWidth, setLapWidth] = useState<number>(0);
  const startTimeRef = useRef<Date | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (running) {
      if (!startTimeRef.current) {
        startTimeRef.current = new Date();
      }
      intervalRef.current = setInterval(() => {
        setElapsed(Date.now() - (startTimeRef.current?.getTime() || 0));
      }, 10);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [running]);

  const handleStart = () => {
    if (startTimeRef.current === null) {
      startTimeRef.current = new Date(Date.now());
    } else {
      startTimeRef.current = new Date(Date.now() - elapsed);
    }
    setRunning(true);
  };

  const handleReset = () => {
    setElapsed(0);
    setLaps([]);
    startTimeRef.current = null;
  };

  const handleStop = () => {
    setRunning(false);
  };

  const handleLap = () => {
    const lapTime = elapsed - (laps.reduce((a, b) => a + b, 0) || 0);
    const newLaps = [...laps, lapTime];
    setLaps(newLaps);
    setLapWidth(String(newLaps.length).length);
  };

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = ms % 1000;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}.${milliseconds.toString().padStart(3, "0")}`;
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="mt-[50vh] -translate-y-1/2 flex flex-col items-center justify-center gap-4">
        <h1 className="text-9xl font-bold">{formatTime(elapsed)}</h1>
        {!running && (
          <div className="flex flex-row gap-4">
            <Button onClick={handleStart} className="w-20">
              start
            </Button>
            <Button variant="outline" onClick={handleReset} className="w-20">
              reset
            </Button>
          </div>
        )}
        {running && (
          <div className="flex flex-row gap-4">
            <Button onClick={handleStop} className="w-20">
              stop
            </Button>
            <Button variant="outline" className="w-20" onClick={handleLap}>
              lap
            </Button>
          </div>
        )}
      </div>
      {laps.length > 0 && (
        <div className="flex flex-col items-center gap-4">
          {laps.map((lap, index) => (
            <div
              key={index}
              className={`text-2xl font-bold gap-2 flex flex-row items-center ${lap === Math.min(...laps) && laps.length > 2 ? "text-green-400" : ""} ${lap === Math.max(...laps) && laps.length > 2 ? "text-red-500" : ""}`}
            >
              <span className="text-muted-foreground text-sm">
                lap {(index + 1).toString().padStart(lapWidth, "0")}:{" "}
              </span>
              {formatTime(lap)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
