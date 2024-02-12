class Automaton {
  #cycle = 0;
  #grid = [];
  #size = 0;
  #neighborsType = "m";
  #crossBorders = true;

  #updateStats = () => {};

  constructor(updateStats = () => {}) {
    this.#updateStats = updateStats;
  }

  get size() {
    return this.#size;
  }

  get grid() {
    return this.#grid;
  }

  get cycle() {
    return this.#cycle;
  }

  reset() {
    this.#cycle = 0;
    this.#grid = [];
  }

  generateEmptyGrid(
    crossBorders,
    cellsPerRow = 0,
    neighborsType = "m",
    cellBehavior = "",
    onCellError = (e) => console.error(e)
  ) {
    this.generateGrid(crossBorders, cellsPerRow, neighborsType, cellBehavior, onCellError);
    this.initializeGrid(0, () => 0);
  }

  generateGrid(
    crossBorders,
    cellsPerRow = 0,
    neighborsType = "m",
    cellBehavior = "",
    onCellError = (e) => console.error(e)
  ) {
    this.reset();
    this.#crossBorders = crossBorders;
    this.#size = cellsPerRow;
    this.#neighborsType = neighborsType;

    for (let y = 0; y < cellsPerRow; y++) {
      this.#grid[y] = [];
    
      for (let x = 0; x < cellsPerRow; x++) {
        this.#grid[y][x] = new Cell(cellBehavior, onCellError);
      }
    }
  }

  setCellState(x, y, state) {
    this.#grid[y][x].state = state;
  }

  initializeGrid(totalCells, randomFunction, stateFunction = () => 1, prebuilt = undefined) {
    const moore = this.#neighborsType == "m";

    this.#grid.forEach((row, y) => {
      row.forEach((cell, x) => {
        const yB = y - 1 < 0
          ? this.#crossBorders ? this.#size - 1 : undefined
          : y - 1;
        const xB = x - 1 < 0
          ? this.#crossBorders ? this.#size - 1 : undefined
          : x - 1;
        const yA = y + 1 == this.#size
          ? this.#crossBorders ? 0 : undefined
          : y + 1;
        const xA = x + 1 == this.#size
          ? this.#crossBorders ? 0 : undefined
          : x + 1;

        const neighbors = [
          moore && yB != undefined && xB != undefined ? this.#grid[yB][xB] : undefined,
          yB != undefined ? this.#grid[yB][x] : undefined,
          moore && yB != undefined && xA != undefined ? this.#grid[yB][xA] : undefined,
          xB != undefined ? this.#grid[y][xB] : undefined,
          xA != undefined ? this.#grid[y][xA] : undefined,
          moore && yA != undefined && xB != undefined ? this.#grid[yA][xB] : undefined,
          yA != undefined ? this.#grid[yA][x] : undefined,
          moore && yA != undefined && xA != undefined ? this.#grid[yA][xA] : undefined,
        ];

        cell.neighborhood = neighbors;
      });
    });

    if (prebuilt === undefined) {
      for (let i = 0; i < totalCells; i++) {
        const rndX = randomFunction();
        const rndY = randomFunction();

        this.#grid[rndY][rndX].state = stateFunction();
      }
    } else {
      prebuilt.forEach((row, y) => {
        row.forEach((state, x) => {
          this.#grid[y][x].state = state;
        });
      });
    }
  }

  simulate() {
    const before = new Date().getTime();

    this.#cellsRecursion(0, this.#size - 1, 0, this.#size - 1, this.#behaveCell);
    this.#cellsRecursion(0, this.#size - 1, 0, this.#size - 1, this.#flushCell);

    const after = new Date().getTime();

    this.#updateStats(++this.#cycle, after - before);
  }

  #cellsRecursion(xStart, xEnd, yStart, yEnd, callback) {
    // Base case
    if (xStart == xEnd && yStart == yEnd) {
      callback(this.#grid[yStart][xStart]);
      return;
    }

    if (xStart == xEnd) {
      this.#cellsRecursion(xStart, xEnd, yStart, Math.floor((yStart + yEnd) / 2), callback);
      this.#cellsRecursion(xStart, xEnd, Math.floor((yStart + yEnd) / 2) + 1, yEnd, callback);
      return;
    }

    if (yStart == yEnd) {
      this.#cellsRecursion(xStart, Math.floor((xStart + xEnd) / 2), yStart, yEnd, callback);
      this.#cellsRecursion(Math.floor((xStart + xEnd) / 2) + 1, xEnd, yStart, yEnd, callback);
      return;
    }

    this.#cellsRecursion(xStart, Math.floor((xStart + xEnd) / 2), yStart, Math.floor((yStart + yEnd) / 2), callback);
    this.#cellsRecursion(Math.floor((xStart + xEnd) / 2) + 1, xEnd, yStart, Math.floor((yStart + yEnd) / 2), callback);
    this.#cellsRecursion(xStart, Math.floor((xStart + xEnd) / 2), Math.floor((yStart + yEnd) / 2) + 1, yEnd, callback);
    this.#cellsRecursion(Math.floor((xStart + xEnd) / 2) + 1, xEnd, Math.floor((yStart + yEnd) / 2) + 1, yEnd, callback);
  }

  #behaveCell(cell) {
    if (cell.hasNeighbors) cell.behave();
  }

  #flushCell(cell) {
    cell.flush();
  }
}
