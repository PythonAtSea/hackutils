"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { ChevronDownIcon } from "lucide-react";
import SwapIcon from "@/components/IconSwapper";
import { Progress } from "@/components/ui/progress";

export default function Page() {
  const getNextOClock = () => {
    const now = new Date();
    const nextHour =
      now.getMinutes() === 0 && now.getSeconds() === 0
        ? now.getHours()
        : now.getHours() + 1;
    return `${nextHour.toString().padStart(2, "0")}:00:00`;
  };

  const [now, setNow] = useState(new Date());
  const [running, setRunning] = useState(false);
  const [paused, setPaused] = useState(false);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [targetTime, setTargetTime] = useState<Date | null>(null);
  const [pausedAt, setPausedAt] = useState<Date | null>(null);
  const [totalPausedDuration, setTotalPausedDuration] = useState(0);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const [selectedTime, setSelectedTime] = useState(getNextOClock());
  const [hours, setHours] = useState("0");
  const [minutes, setMinutes] = useState("0");
  const [seconds, setSeconds] = useState("0");

  const getEndTimeFromDate = (): Date | null => {
    if (!selectedDate) return null;
    const [h, m, s] = selectedTime.split(":").map(Number);
    const endTime = new Date(selectedDate);
    endTime.setHours(h || 0, m || 0, s || 0, 0);
    return endTime;
  };

  const getEndTimeFromHms = (): Date | null => {
    const h = parseInt(hours) || 0;
    const m = parseInt(minutes) || 0;
    const s = parseInt(seconds) || 0;

    if (h === 0 && m === 0 && s === 0) {
      return null;
    }

    const now = new Date();
    const endTime = new Date(
      now.getTime() + h * 3600000 + m * 60000 + s * 1000
    );
    return endTime;
  };

  const handleStart = () => {
    const end = getEndTimeFromDate();
    if (end && new Date() <= end) {
      setStartTime(new Date());
      setTargetTime(end);
      setPaused(false);
      setPausedAt(null);
      setTotalPausedDuration(0);
      setRunning(true);
    }
  };

  const handleStartFromHms = () => {
    const end = getEndTimeFromHms();
    if (end) {
      setStartTime(new Date());
      setTargetTime(end);
      setPaused(false);
      setPausedAt(null);
      setTotalPausedDuration(0);
      setRunning(true);
    }
  };

  const handleQuickStart = (minutes: number) => {
    const start = new Date();
    const end = new Date(start.getTime() + minutes * 60000);
    setStartTime(start);
    setTargetTime(end);
    setSelectedDate(end);
    setSelectedTime(
      `${end.getHours().toString().padStart(2, "0")}:${end
        .getMinutes()
        .toString()
        .padStart(2, "0")}:${end.getSeconds().toString().padStart(2, "0")}`
    );
    setPaused(false);
    setPausedAt(null);
    setTotalPausedDuration(0);
    setRunning(true);
  };

  useEffect(() => {
    if (running && !paused) {
      const interval = setInterval(() => {
        setNow(new Date());
      }, 1);
      return () => clearInterval(interval);
    }
  }, [running, paused]);

  const formatTime = (ms: number) => {
    ms = Math.max(0, ms);
    const hours = Math.floor(ms / 3600000);
    const minutes = Math.floor((ms % 3600000) / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = ms % 1000;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}.${milliseconds.toString().padStart(3, "0")}`;
  };

  const endTime = running ? targetTime : getEndTimeFromDate();

  const handlePauseToggle = () => {
    if (paused) {
      const pausedDuration = new Date().getTime() - (pausedAt?.getTime() || 0);
      setTotalPausedDuration(totalPausedDuration + pausedDuration);
      setPausedAt(null);
      setPaused(false);
    } else {
      setPausedAt(new Date());
      setPaused(true);
    }
  };

  return (
    <div className="flex flex-row items-center justify-center py-2 size-full gap-4">
      {!running && (
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-4">
            <div>
              <div className="flex flex-row items-end gap-2">
                <div className="flex flex-col">
                  <Label className="mb-1" htmlFor="date-picker">
                    date
                  </Label>
                  <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        id="date-picker"
                        className="justify-between font-normal w-full border-input"
                      >
                        {selectedDate
                          ? selectedDate.toLocaleDateString()
                          : "Select date"}
                        <ChevronDownIcon />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto overflow-hidden p-0"
                      align="start"
                    >
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={(date) => {
                          setSelectedDate(date);
                          setCalendarOpen(false);
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="flex flex-col">
                  <Label className="mb-1" htmlFor="time-picker">
                    time
                  </Label>
                  <Input
                    type="time"
                    id="time-picker"
                    step="1"
                    placeholder="23:59:59"
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none w-full"
                  />
                </div>
              </div>
              <Button
                onClick={handleStart}
                disabled={
                  !getEndTimeFromDate() || new Date() > getEndTimeFromDate()!
                }
                className="w-full mt-2"
              >
                <SwapIcon name="start" />
              </Button>
            </div>
            <div>
              <div className="flex flex-row items-end gap-2">
                <div className="flex flex-col">
                  <Label className="mb-1" htmlFor="hours-input">
                    hours
                  </Label>
                  <Input
                    type="number"
                    id="hours-input"
                    min="0"
                    placeholder="0"
                    value={hours}
                    onChange={(e) => setHours(e.target.value)}
                    className="bg-background w-32"
                  />
                </div>
                <div className="flex flex-col">
                  <Label className="mb-1" htmlFor="minutes-input">
                    minutes
                  </Label>
                  <Input
                    type="number"
                    id="minutes-input"
                    min="0"
                    max="59"
                    placeholder="0"
                    value={minutes}
                    onChange={(e) => setMinutes(e.target.value)}
                    className="bg-background w-32"
                  />
                </div>
                <div className="flex flex-col">
                  <Label className="mb-1" htmlFor="seconds-input">
                    seconds
                  </Label>
                  <Input
                    type="number"
                    id="seconds-input"
                    min="0"
                    max="59"
                    placeholder="0"
                    value={seconds}
                    onChange={(e) => setSeconds(e.target.value)}
                    className="bg-background w-32"
                  />
                </div>
              </div>
              <Button
                onClick={handleStartFromHms}
                disabled={getEndTimeFromHms() === null}
                className="w-full mt-2"
              >
                <SwapIcon name="start" />
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Button onClick={() => handleQuickStart(1)} variant="outline">
              1 minute
            </Button>
            <Button onClick={() => handleQuickStart(5)} variant="outline">
              5 minutes
            </Button>
            <Button onClick={() => handleQuickStart(30)} variant="outline">
              30 minutes
            </Button>
            <Button onClick={() => handleQuickStart(60)} variant="outline">
              1 hour
            </Button>
          </div>
        </div>
      )}
      {running && endTime && (
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-9xl font-bold">
            {formatTime(endTime.getTime() - now.getTime())}
          </h1>
          <Progress
            value={
              startTime && endTime
                ? endTime.getTime() - startTime.getTime() > 0
                  ? Math.max(
                      0,
                      Math.min(
                        100,
                        ((now.getTime() -
                          startTime.getTime() -
                          totalPausedDuration) /
                          (endTime.getTime() - startTime.getTime())) *
                          100
                      )
                    )
                  : 100
                : 0
            }
            className={
              endTime.getTime() - now.getTime() <= 10000
                ? "bg-red-600"
                : endTime.getTime() - now.getTime() <= 30000
                  ? "bg-yellow-600"
                  : ""
            }
          />
          <div className="flex flex-row gap-2">
            <Button
              onClick={() => setRunning(false)}
              variant={
                endTime.getTime() - now.getTime() <= 0 ? "default" : "outline"
              }
              className="w-24"
            >
              <SwapIcon
                name={
                  endTime.getTime() - now.getTime() <= 0 ? "reset" : "cancel"
                }
              />
            </Button>
            {endTime.getTime() - now.getTime() >= 0 && (
              <Button
                onClick={handlePauseToggle}
                className="w-24"
                variant={paused ? "default" : "outline"}
              >
                <SwapIcon name={paused ? "resume" : "pause"} />
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
