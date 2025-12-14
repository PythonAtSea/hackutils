"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import crypto from "crypto";
import { Button } from "@/components/ui/button";
import SwapIcon from "@/components/IconSwapper";
import CopyBox from "@/components/CopyBox";

export default function Page() {
  const [text, setText] = useState("");
  const [hash, setHash] = useState("");
  const [algorithm, setAlgorithm] = useState("md5");

  const handleHash = () => {
    if (!text) return;
    setHash("");
    setHash(crypto.createHash(algorithm).update(text).digest("hex"));
  };

  return (
    <div className="flex flex-col items-center justify-center py-2 size-full gap-4">
      <div className="flex flex-row gap-4 items-end">
        <div className="flex flex-col">
          <Label className="mb-1" htmlFor="hash-text">
            text to hash
          </Label>
          <Input
            id="hash-text"
            type="text"
            placeholder="beep boop secret sauce"
            onChange={(e) => {
              setText(e.target.value);
            }}
          />
        </div>
        <div className="flex flex-col">
          <Label className="mb-1" htmlFor="hash-algorithm">
            hashing algorithm
          </Label>
          <Select
            value={algorithm}
            onValueChange={(value) => {
              setAlgorithm(value);
            }}
          >
            <SelectTrigger id="hash-algorithm" className="w-full">
              <SelectValue placeholder="sha-256" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="md5">md5</SelectItem>
              <SelectItem value="sha1">sha-1</SelectItem>
              <SelectItem value="sha256">sha-256</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button onClick={handleHash} disabled={text === ""}>
          <SwapIcon name="hash" />
        </Button>
      </div>
      {hash && <CopyBox>{hash}</CopyBox>}
    </div>
  );
}
