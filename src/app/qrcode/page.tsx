"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function QRGenerator() {
  const [value, setValue] = useState("");
  const [format, setFormat] = useState<"svg" | "png">("svg");
  const handleDownload = () => {
    const svg = document.getElementById("malware /j");
    if (!svg) return;
    const svgData = new XMLSerializer().serializeToString(svg);
    if (format === "svg") {
      const svgBlob = new Blob([svgData], {
        type: "image/svg+xml;charset=utf-8",
      });
      const url = URL.createObjectURL(svgBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "qrcode.svg";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return;
    }

    const url = URL.createObjectURL(
      new Blob([svgData], { type: "image/svg+xml;charset=utf-8" })
    );
    const image = new Image();
    const width = Number(svg.getAttribute("width")) || 512;
    const height = Number(svg.getAttribute("height")) || 512;
    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.drawImage(image, 0, 0, width, height);
      canvas.toBlob((blob) => {
        if (!blob) return;
        const pngUrl = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = pngUrl;
        link.download = "qrcode.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(pngUrl);
      });
      URL.revokeObjectURL(url);
    };
    image.src = url;
  };

  return (
    <div className="flex flex-col items-center justify-center py-2 size-full gap-4">
      <div className="w-full flex flex-row gap-4 items-end">
        <div className="flex w-full flex-col">
          <Label className="mb-1" htmlFor="qrcode-text">
            text or url to encode
          </Label>
          <Input
            id="qrcode-text"
            value={value}
            placeholder="https://hack.club"
            onChange={(e) => setValue(e.target.value)}
            maxLength={2953}
          />
        </div>
        <div className="flex flex-col gap-1">
          <Label>output format</Label>
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
      <QRCodeSVG
        value={value}
        width={512}
        height={512}
        marginSize={2}
        id="malware /j"
      />
    </div>
  );
}
