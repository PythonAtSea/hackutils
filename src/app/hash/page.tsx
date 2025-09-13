"use client";
import { Input } from "@/components/ui/input";
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
      <p className="text-3xl font-bold break-all" onClick={() => setHash("")}>
        {hash}
      </p>
      <div className="flex flex-row gap-2">
        <Input
          type="text"
          placeholder="text to hash"
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
        <Select
          value={algorithm}
          onValueChange={(value) => {
            setAlgorithm(value);
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="select a hashing algorithm" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="md5">md5</SelectItem>
            <SelectItem value="sha1">sha-1</SelectItem>
            <SelectItem value="sha256">sha-256</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={handleHash}>hash</Button>
      </div>
    </div>
  );
}
