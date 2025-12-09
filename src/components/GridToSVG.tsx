import React from "react";

interface GridToSVGProps {
  grid: string[][];
  cellSize?: number;
  id?: string;
}

const colorMap: Record<string, string> = {
  w: "#fff",
  b: "#000",
  x: "#fff",
};

export function GridToSVG({ grid, cellSize = 40, id }: GridToSVGProps) {
  const rows = grid.length;
  const cols = grid[0]?.length || 0;
  return (
    <svg
      width={cols * cellSize}
      height={rows * cellSize}
      viewBox={`0 0 ${cols * cellSize} ${rows * cellSize}`}
      xmlns="http://www.w3.org/2000/svg"
      style={{}}
      id={id}
    >
      {grid.map((row, y) =>
        row.map((cell, x) => (
          <rect
            key={`${x}-${y}`}
            x={x * cellSize}
            y={y * cellSize}
            width={cellSize}
            height={cellSize}
            fill={colorMap[cell] || "#888"}
          />
        )),
      )}
    </svg>
  );
}
