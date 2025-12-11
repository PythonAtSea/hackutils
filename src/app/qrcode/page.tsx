"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/ui/button";

export default function QRGenerator() {
  const [value, setValue] = useState("");
  const handleDownload = () => {
    const svg = document.getElementById("malware /j");
    if (!svg) return;
    const svgData = new XMLSerializer().serializeToString(svg);
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
  };

  return (
    <div className="flex flex-col items-center justify-center py-2 size-full gap-4">
      <QRCodeSVG
        value={value}
        width={512}
        height={512}
        marginSize={2}
        id="malware /j"
      />
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
        <Button onClick={handleDownload}>download</Button>
      </div>
    </div>
  );
}
