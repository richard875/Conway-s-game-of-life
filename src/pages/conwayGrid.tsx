import React from "react";

import "../styles/conwayGrid.css";

interface Grid {
  x: number;
  y: number;
  cellSize: number;
}

function ConwayGrid(props: Grid) {
  const x: number = props.x;
  const y: number = props.y;
  const cellSize: number = props.cellSize;

  return (
    <div
      className="grid"
      style={{
        left: `${cellSize * x + 1}px`,
        top: `${cellSize * y + 1}px`,
        width: `${cellSize - 1}px`,
        height: `${cellSize - 1}px`,
      }}
    ></div>
  );
}

export default ConwayGrid;
