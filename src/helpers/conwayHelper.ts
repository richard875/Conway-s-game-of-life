class conwayHelper {
  static makeEmptyBoard(rows: number, cols: number) {
    let board: any[] = [];
    for (let y = 0; y < rows; y++) {
      board[y] = [];
      for (let x = 0; x < cols; x++) {
        board[y][x] = false;
      }
    }

    return board;
  }

  static makeCells(rows: number, cols: number, board: any[]) {
    let cells: any[] = [];
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        if (board[y][x]) cells.push({ x, y });
      }
    }

    return cells;
  }

  static calculateNeighbors(
    board: any[],
    x: number,
    y: number,
    rows: number,
    cols: number
  ) {
    let neighbors: number = 0;
    const dirs: any[] = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, 1],
      [1, 1],
      [1, 0],
      [1, -1],
      [0, -1],
    ];
    for (let i = 0; i < dirs.length; i++) {
      const dir = dirs[i];
      let y1 = y + dir[0];
      let x1 = x + dir[1];

      if (x1 >= 0 && x1 < cols && y1 >= 0 && y1 < rows && board[y1][x1]) {
        neighbors++;
      }
    }

    return neighbors;
  }

  static getElementOffset(boardRef: any) {
    const rect = boardRef.getBoundingClientRect();
    const doc = document.documentElement;

    return {
      x: rect.left + window.pageXOffset - doc.clientLeft,
      y: rect.top + window.pageYOffset - doc.clientTop,
    };
  }

  static startGame(rows: number, cols: number, board: any[]) {
    let newBoard: any[] = conwayHelper.makeEmptyBoard(rows, cols);

    // Declear logic
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        let neighbors = conwayHelper.calculateNeighbors(
          board,
          x,
          y,
          rows,
          cols
        );
        if (board[y][x]) {
          if (neighbors === 2 || neighbors === 3) newBoard[y][x] = true;
          else newBoard[y][x] = false;
        } else {
          if (!board[y][x] && neighbors === 3) newBoard[y][x] = true;
        }
      }
    }

    return newBoard;
  }
}

export default conwayHelper;
