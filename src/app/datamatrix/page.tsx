"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import bwipjs from "bwip-js";
import { useState } from "react";

export default function Page() {
  const [data, setData] = useState("");

  return (
    <div className="flex flex-col items-center justify-center py-2 size-full gap-4">
      <div className="flex w-full flex-col">
        <Label className="mb-1" htmlFor="datamatrix-text">
          data to encode
        </Label>
        <Input
          id="datamatrix-text"
          type="text"
          placeholder="top secret catnip map"
          value={data}
          onChange={(e) => setData(e.target.value)}
          maxLength={2335}
        />
      </div>
      <canvas
        ref={(canvas) => {
          if (!canvas) {
            return;
          }

          bwipjs.toCanvas(canvas, {
            bcid: "datamatrix",
            text: data !== "" ? data : " ",
            scale: window.devicePixelRatio,
            height: 100,
            width: 100,
            includetext: true,
            textxalign: "center",
            backgroundcolor: "FFFFFF",
            showborder: true,
          });
        }}
      />
    </div>
  );
}
