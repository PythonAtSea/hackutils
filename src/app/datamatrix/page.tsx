"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import bwipjs from "bwip-js";
import { useState } from "react";

export default function Page() {
  const [data, setData] = useState("");
  const [format, setFormat] = useState<"svg" | "png">("png");

  const handleDownload = () => {
    if (format === "svg") {
      const svgString = bwipjs.toSVG({
        bcid: "datamatrix",
        text: data !== "" ? data : " ",
        scale: 3,
        includetext: true,
        textxalign: "center",
        backgroundcolor: "FFFFFF",
        showborder: true,
      });
      const svgBlob = new Blob([svgString], {
        type: "image/svg+xml;charset=utf-8",
      });
      const url = URL.createObjectURL(svgBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "datamatrix.svg";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return;
    }

    const canvas = document.querySelector("canvas");
    if (!canvas) return;
    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "datamatrix.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  };

  return (
    <div className="flex flex-col items-center justify-center py-2 size-full gap-4">
      <div className="flex w-full flex-col items-center">
        <div className="flex items-end gap-4">
          <div className="flex flex-col gap-1">
            <Label htmlFor="datamatrix-text">data to encode</Label>
            <Input
              id="datamatrix-text"
              type="text"
              placeholder="top secret catnip map"
              value={data}
              onChange={(e) => setData(e.target.value)}
              maxLength={2335}
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="datamatrix-format">output format</Label>
            <Select
              value={format}
              onValueChange={(value) => setFormat(value as "svg" | "png")}
            >
              <SelectTrigger className="w-[120px]" aria-label="output format">
                <SelectValue placeholder="format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="svg">SVG</SelectItem>
                <SelectItem value="png">PNG</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button onClick={handleDownload}>download</Button>
        </div>
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
