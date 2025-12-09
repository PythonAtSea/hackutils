"use client";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
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
    rUnit: Unit | "",
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
    rUnit: Unit | "",
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
    <div className="flex flex-row items-center justify-center py-2 size-full gap-4">
      <Input type="number" onChange={handleLeftValueChange} value={leftValue} />
      <Select onValueChange={handleLeftUnitChange} value={leftUnit}>
        <SelectTrigger>
          <SelectValue placeholder="unit of length" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>metric</SelectLabel>
            <SelectItem value="mm">millimeter (mm)</SelectItem>
            <SelectItem value="cm">centimeter (cm)</SelectItem>
            <SelectItem value="m">meter (m)</SelectItem>
            <SelectItem value="km">kilometer (km)</SelectItem>
          </SelectGroup>
          <SelectGroup>
            <SelectLabel>imperial</SelectLabel>
            <SelectItem value="in">inch (in)</SelectItem>
            <SelectItem value="ft">foot (ft)</SelectItem>
            <SelectItem value="yd">yard (yd)</SelectItem>
            <SelectItem value="mi">mile (mi)</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <span className="text-2xl">=</span>
      <Input
        type="number"
        onChange={handleRightValueChange}
        value={rightValue}
      />
      <Select onValueChange={handleRightUnitChange} value={rightUnit}>
        <SelectTrigger>
          <SelectValue placeholder="unit of length" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>metric</SelectLabel>
            <SelectItem value="mm">millimeter (mm)</SelectItem>
            <SelectItem value="cm">centimeter (cm)</SelectItem>
            <SelectItem value="m">meter (m)</SelectItem>
            <SelectItem value="km">kilometer (km)</SelectItem>
          </SelectGroup>
          <SelectGroup>
            <SelectLabel>imperial</SelectLabel>
            <SelectItem value="in">inch (in)</SelectItem>
            <SelectItem value="ft">foot (ft)</SelectItem>
            <SelectItem value="yd">yard (yd)</SelectItem>
            <SelectItem value="mi">mile (mi)</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
