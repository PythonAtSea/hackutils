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

export default function Page() {
  const [now, setNow] = useState(new Date());
  const [running, setRunning] = useState(false);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [targetTime, setTargetTime] = useState<Date | null>(null);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState("12:00:00");

  const getEndTime = (): Date | null => {
    if (!selectedDate) return null;
    const [hours, minutes, seconds] = selectedTime.split(":").map(Number);
    const endTime = new Date(selectedDate);
    endTime.setHours(hours || 0, minutes || 0, seconds || 0, 0);
    return endTime;
  };

  const handleStart = () => {
    const end = getEndTime();
    if (end) {
      setStartTime(new Date());
      setTargetTime(end);
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
    setRunning(true);
  };

  useEffect(() => {
    if (running) {
      const interval = setInterval(() => {
        setNow(new Date());
      }, 1);
      return () => clearInterval(interval);
    }
  }, [running]);

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

  const endTime = running ? targetTime : getEndTime();

  return (
    <div className="flex flex-row items-center justify-center py-2 size-full gap-4">
      {!running && (
        <div className="flex flex-col gap-4">
          <div className="flex flex-row items-end gap-4">
            <div className="flex flex-col">
              <Label className="mb-1" htmlFor="date-picker">
                date
              </Label>
              <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    id="date-picker"
                    className="justify-between font-normal w-35 border-input"
                  >
                    {selectedDate
                      ? selectedDate.toLocaleDateString()
                      : "7/12/1941"}
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
                className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
              />
            </div>
          </div>
          <Button
            onClick={handleStart}
            disabled={!endTime || new Date() > endTime}
          >
            <SwapIcon name="start" />
          </Button>
          <div className="grid grid-cols-2 gap-4">
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
          <Button
            onClick={() => setRunning(false)}
            variant={
              endTime.getTime() - now.getTime() <= 0 ? "default" : "outline"
            }
            className="w-full"
          >
            <SwapIcon
              name={endTime.getTime() - now.getTime() <= 0 ? "reset" : "cancel"}
            />
          </Button>
        </div>
      )}
    </div>
  );
}
