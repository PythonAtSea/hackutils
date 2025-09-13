"use client";
import { useEffect, useRef, useState } from "react"
import { ChevronDownIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export default function Page() {
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [now, setNow] = useState(new Date(Date.now()))
  const [running, setRunning] = useState(false)

  const handleStart = () => {
    const value = inputRef.current?.value
    if (!value) return
    setDate(new Date(Date.now() + Number(value) * 1000))
    setRunning(true)
  }

  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (running) {
      const interval = setInterval(() => {
        setNow(new Date(Date.now()))
      }, 1)
      return () => clearInterval(interval)
    }
  }, [running])

  const formatTime = (ms: number) => {
    ms = Math.max(0, ms);
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = ms % 1000;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}.${milliseconds.toString().padStart(3, "0")}`;
  };

  return (
    <div className="flex flex-row items-center justify-center py-2 size-full gap-4">
      {!running && (
        <>
          <Input type="number" placeholder="seconds" ref={inputRef} onChange={(e) => {
            const value = e.target.value;
            if (!isNaN(Number(value))) {
              setDate(new Date(Date.now() + Number(value) * 1000));
            }
          }} />
          {date && <Button onClick={handleStart}>start</Button>}
        </>
      )}
      {running && date && <h1 onClick={() => {setRunning(false)}} className="text-9xl font-bold">{formatTime(date.getTime() - now.getTime())}</h1>}
    </div>
  )
}