"use client";
import { Input } from "@/components/ui/input";
import bwipjs from "bwip-js";
import { useState, useEffect, useRef } from "react";

export default function Page() {
  const [data, setData] = useState("");

  return (
    <div className="flex flex-col items-center justify-center py-2 size-full gap-4">
      <Input
        type="text"
        placeholder="data to encode"
        value={data}
        onChange={(e) => setData(e.target.value)}
        maxLength={2335}
      />
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
