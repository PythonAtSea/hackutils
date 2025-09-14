"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import convert from "convert";

export default function Page() {
  const [fahrenheit, setFahrenheit] = useState<number | null>(null);
  const [celsius, setCelsius] = useState<number | null>(null);
  const [kelvin, setKelvin] = useState<number | null>(null);

  return (
    <div className="flex flex-row items-center justify-center py-2 size-full gap-4">
      <div className="flex flex-col">
        <Label htmlFor="fahrenheit">fahrenheit</Label>
        <Input
          type="number"
          id="fahrenheit"
          value={fahrenheit ?? ""}
          onChange={(e) => {
            setFahrenheit(Number(e.target.value));
            setCelsius(
              Number(
                convert(Number(e.target.value), "fahrenheit")
                  .to("celsius")
                  .toFixed(2)
              )
            );
            setKelvin(
              Number(
                convert(Number(e.target.value), "fahrenheit")
                  .to("kelvin")
                  .toFixed(2)
              )
            );
          }}
        />
      </div>
      <div className="flex flex-col">
        <Label htmlFor="celsius">celsius</Label>
        <Input
          type="number"
          id="celsius"
          value={celsius ?? ""}
          onChange={(e) => {
            setCelsius(Number(e.target.value));
            setFahrenheit(
              Number(
                convert(Number(e.target.value), "celsius")
                  .to("fahrenheit")
                  .toFixed(2)
              )
            );
            setKelvin(
              Number(
                convert(Number(e.target.value), "celsius")
                  .to("kelvin")
                  .toFixed(2)
              )
            );
          }}
        />
      </div>
      <div className="flex flex-col">
        <Label htmlFor="kelvin">kelvin</Label>
        <Input
          type="number"
          id="kelvin"
          value={kelvin ?? ""}
          onChange={(e) => {
            setKelvin(Number(e.target.value));
            setCelsius(
              Number(
                convert(Number(e.target.value), "kelvin")
                  .to("celsius")
                  .toFixed(2)
              )
            );
            setFahrenheit(
              Number(
                convert(Number(e.target.value), "kelvin")
                  .to("fahrenheit")
                  .toFixed(2)
              )
            );
          }}
        />
      </div>
    </div>
  );
}
