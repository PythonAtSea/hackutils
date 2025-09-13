"use client";
import { GridToSVG } from "@/components/GridToSVG";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AprilTagFamily } from "apriltag";
import tagConfig16h5 from "apriltag/families/16h5.json";
import tagConfig25h9 from "apriltag/families/25h9.json";
import tagConfig36h9 from "apriltag/families/36h9.json";
import tagConfig36h10 from "apriltag/families/36h10.json";
import tagConfig36h11 from "apriltag/families/36h11.json";
import tagConfigCircle21h7 from "apriltag/families/circle21h7.json";
import tagConfigCircle49h12 from "apriltag/families/circle49h12.json";
import tagConfigCustom48h12 from "apriltag/families/custom48h12.json";
import tagConfigStandard41h12 from "apriltag/families/standard41h12.json";
import tagConfigStandard52h13 from "apriltag/families/standard52h13.json";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Page() {
  const tag16h5 = new AprilTagFamily(tagConfig16h5);
  const tag25h9 = new AprilTagFamily(tagConfig25h9);
  const tag36h9 = new AprilTagFamily(tagConfig36h9);
  const tag36h10 = new AprilTagFamily(tagConfig36h10);
  const tag36h11 = new AprilTagFamily(tagConfig36h11);
  const tagCircle21h7 = new AprilTagFamily(tagConfigCircle21h7);
  const tagCircle49h12 = new AprilTagFamily(tagConfigCircle49h12);
  const tagCustom48h12 = new AprilTagFamily(tagConfigCustom48h12);
  const tagStandard41h12 = new AprilTagFamily(tagConfigStandard41h12);
  const tagStandard52h13 = new AprilTagFamily(tagConfigStandard52h13);
  const [tagId, setTagId] = useState(0);
  const [tagFamily, setTagFamily] = useState("tag36h11");

  const handleDownload = () => {
    const svg = document.getElementById("tag");
    if (!svg) return;
    const svgData = new XMLSerializer().serializeToString(svg);
    const svgBlob = new Blob([svgData], {
      type: "image/svg+xml;charset=utf-8",
    });
    const url = URL.createObjectURL(svgBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "apriltag.svg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col items-center justify-center py-2 size-full gap-4">
      <GridToSVG
        grid={
          (tagFamily === "tag36h11"
            ? tag36h11.render(Math.min(tagId, tagConfig36h11.codes.length - 1))
            : tagFamily === "tag16h5"
            ? tag16h5.render(Math.min(tagId, tagConfig16h5.codes.length - 1))
            : tagFamily === "tag25h9"
            ? tag25h9.render(Math.min(tagId, tagConfig25h9.codes.length - 1))
            : tagFamily === "tag36h9"
            ? tag36h9.render(Math.min(tagId, tagConfig36h9.codes.length - 1))
            : tagFamily === "tag36h10"
            ? tag36h10.render(Math.min(tagId, tagConfig36h10.codes.length - 1))
            : tagFamily === "tagCircle21h7"
            ? tagCircle21h7.render(
                Math.min(tagId, tagConfigCircle21h7.codes.length - 1)
              )
            : tagFamily === "tagCircle49h12"
            ? tagCircle49h12.render(
                Math.min(tagId, tagConfigCircle49h12.codes.length - 1)
              )
            : tagFamily === "tagCustom48h12"
            ? tagCustom48h12.render(
                Math.min(tagId, tagConfigCustom48h12.codes.length - 1)
              )
            : tagFamily === "tagStandard41h12"
            ? tagStandard41h12.render(
                Math.min(tagId, tagConfigStandard41h12.codes.length - 1)
              )
            : tagFamily === "tagStandard52h13"
            ? tagStandard52h13.render(
                Math.min(tagId, tagConfigStandard52h13.codes.length - 1)
              )
            : null) || [[]]
        }
        id="tag"
      />
      <div className="flex flex-row gap-2">
        <Input
          type="number"
          placeholder="tag id"
          value={tagId}
          min={0}
          onChange={(e) => {
            const value = e.target.value;
            if (!isNaN(Number(value))) {
              setTagId(Number(value));
            }
          }}
        />
        <Select
          value={tagFamily}
          onValueChange={(value) => {
            setTagFamily(value);
            console.log(value);
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="select a tag family" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="tag16h5">16h5</SelectItem>
            <SelectItem value="tag25h9">25h9</SelectItem>
            <SelectItem value="tag36h9">36h9</SelectItem>
            <SelectItem value="tag36h10">36h10</SelectItem>
            <SelectItem value="tag36h11">36h11</SelectItem>
            <SelectItem value="tagCircle21h7">circle 21h7</SelectItem>
            <SelectItem value="tagCircle49h12">circle 49h12</SelectItem>
            <SelectItem value="tagCustom48h12">custom 48h12</SelectItem>
            <SelectItem value="tagStandard41h12">standard 41h12</SelectItem>
            <SelectItem value="tagStandard52h13">standard 52h13</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={handleDownload}>download</Button>
      </div>
    </div>
  );
}
