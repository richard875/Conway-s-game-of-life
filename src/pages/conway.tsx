import React from "react";

import "../styles/conway.css";
import conwayHelper from "../helpers/conwayHelper";
import ConwayGrid from "./conwayGrid";

const cellSize = 20;
const width = 1200;
const height = 700;

class Game extends React.Component {
  private rows: number;
  private cols: number;
  private board: any[];

  private boardRef: any;
  private timeoutHandler: any;

  constructor() {
    super({});

    this.rows = height / cellSize;
    this.cols = width / cellSize;
    this.board = conwayHelper.makeEmptyBoard(this.rows, this.cols);
  }

  state = {
    cells: [],
    isRunning: false,
  };

  handleClick = (event: any) => {
    const elemOffset = conwayHelper.getElementOffset(this.boardRef);
    const offsetX = event.clientX - elemOffset.x;
    const offsetY = event.clientY - elemOffset.y;

    const x = Math.floor(offsetX / cellSize);
    const y = Math.floor(offsetY / cellSize);

    if (x >= 0 && x <= this.cols && y >= 0 && y <= this.rows)
      this.board[y][x] = !this.board[y][x];

    this.setState({
      cells: conwayHelper.makeCells(this.rows, this.cols, this.board),
    });
  };

  runGame = () => {
    this.setState({ isRunning: true });
    this.run();
  };

  stopGame = () => {
    this.setState({ isRunning: false });
    if (this.timeoutHandler) {
      window.clearTimeout(this.timeoutHandler);
      this.timeoutHandler = null;
    }
  };

  run() {
    this.board = conwayHelper.startGame(this.rows, this.cols, this.board);
    this.setState({
      cells: conwayHelper.makeCells(this.rows, this.cols, this.board),
    });

    this.timeoutHandler = window.setTimeout(() => this.run(), 100);
  }

  render() {
    return (
      <div className="conway">
        <div
          className="board"
          style={{
            width: width,
            height: height,
            backgroundSize: `${cellSize}px ${cellSize}px`,
          }}
          onClick={this.handleClick}
          ref={(n) => (this.boardRef = n)}
        >
          {this.state.cells.map((cell: any) => (
            <ConwayGrid
              x={cell.x}
              y={cell.y}
              cellSize={cellSize}
              key={`${cell.x},${cell.y}`}
            />
          ))}
        </div>

        <div className="button-section">
          {this.state.isRunning ? (
            <div className="button" onClick={this.stopGame}>Stop</div>
          ) : (
            <div className="button" onClick={this.runGame}>Srart</div>
          )}
        </div>
      </div>
    );
  }
}

export default Game;
