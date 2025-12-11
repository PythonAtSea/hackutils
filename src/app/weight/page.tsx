"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import convert, { Unit } from "convert";

export default function Page() {
  const [leftUnit, setLeftUnit] = useState<Unit | "">("");
  const [rightUnit, setRightUnit] = useState<Unit | "">("");
  const [leftValue, setLeftValue] = useState("");
  const [rightValue, setRightValue] = useState("");
  const [lastChanged, setLastChanged] = useState<"left" | "right" | null>(null);

  const isValidNumber = (val: string) => val !== "" && !isNaN(Number(val));

  const convertLeftToRight = (
    val: string,
    lUnit: Unit | "",
    rUnit: Unit | ""
  ) => {
    if (!isValidNumber(val) || !lUnit || !rUnit) {
      setRightValue("");
      return;
    }
    try {
      const result = convert(Number(val), lUnit).to(rUnit);
      setRightValue(result.toString());
    } catch {
      setRightValue("");
    }
  };

  const convertRightToLeft = (
    val: string,
    lUnit: Unit | "",
    rUnit: Unit | ""
  ) => {
    if (!isValidNumber(val) || !lUnit || !rUnit) {
      setLeftValue("");
      return;
    }
    try {
      const result = convert(Number(val), rUnit).to(lUnit);
      setLeftValue(result.toString());
    } catch {
      setLeftValue("");
    }
  };

  const handleLeftValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setLeftValue(val);
    setLastChanged("left");
    convertLeftToRight(val, leftUnit, rightUnit);
  };

  const handleRightValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setRightValue(val);
    setLastChanged("right");
    convertRightToLeft(val, leftUnit, rightUnit);
  };

  const handleLeftUnitChange = (value: string) => {
    setLeftUnit(value as Unit | "");
    if (lastChanged === "left") {
      convertLeftToRight(leftValue, value as Unit, rightUnit);
    } else if (lastChanged === "right") {
      convertRightToLeft(rightValue, value as Unit, rightUnit);
    }
  };

  const handleRightUnitChange = (value: string) => {
    setRightUnit(value as Unit | "");
    if (lastChanged === "left") {
      convertLeftToRight(leftValue, leftUnit, value as Unit);
    } else if (lastChanged === "right") {
      convertRightToLeft(rightValue, leftUnit, value as Unit);
    }
  };

  return (
    <div className="flex items-center justify-center size-full">
      <div className="flex flex-row items-stretch gap-4">
        <div className="flex flex-col">
          <Label className="mb-1" htmlFor="weight-left-value">
            weight
          </Label>
          <Input
            id="weight-left-value"
            type="number"
            placeholder="3.5"
            onChange={handleLeftValueChange}
            value={leftValue}
          />
        </div>
        <div className="flex flex-col">
          <Label className="mb-1" htmlFor="weight-left-unit">
            unit
          </Label>
          <Select onValueChange={handleLeftUnitChange} value={leftUnit}>
            <SelectTrigger id="weight-left-unit">
              <SelectValue placeholder="pounds" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="pound">pound (lb)</SelectItem>
                <SelectItem value="kg">kilogram (kg)</SelectItem>
                <SelectItem value="g">gram (g)</SelectItem>
                <SelectItem value="oz">ounce (oz)</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-end pb-1">
          <span className="text-2xl">=</span>
        </div>
        <div className="flex flex-col">
          <Label className="mb-1" htmlFor="weight-right-value">
            weight
          </Label>
          <Input
            id="weight-right-value"
            type="number"
            placeholder="56"
            onChange={handleRightValueChange}
            value={rightValue}
          />
        </div>
        <div className="flex flex-col">
          <Label className="mb-1" htmlFor="weight-right-unit">
            unit
          </Label>
          <Select onValueChange={handleRightUnitChange} value={rightUnit}>
            <SelectTrigger id="weight-right-unit">
              <SelectValue placeholder="kilograms" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="pound">pound (lb)</SelectItem>
                <SelectItem value="kg">kilogram (kg)</SelectItem>
                <SelectItem value="g">gram (g)</SelectItem>
                <SelectItem value="oz">ounce (oz)</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
