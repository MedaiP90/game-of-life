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

  initializeGrid(totalCells, randomFunction, stateFunction = () => 1) {
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

        const moore = this.#neighborsType == "m"
          ? [
              yB != undefined && xB != undefined ? this.#grid[yB][xB] : undefined,
              yB != undefined && xA != undefined ? this.#grid[yB][xA] : undefined,
              yA != undefined && xB != undefined ? this.#grid[yA][xB] : undefined,
              yA != undefined && xA != undefined ? this.#grid[yA][xA] : undefined,
            ]
          : [];
        const neighbors = [
          yB != undefined ? this.#grid[yB][x] : undefined,
          xB != undefined ? this.#grid[y][xB] : undefined,
          xA != undefined ? this.#grid[y][xA] : undefined,
          yA != undefined ? this.#grid[yA][x] : undefined,
          ...moore
        ].filter((n) => n != undefined);

        cell.neighborhood = neighbors;
      });
    });

    for (let i = 0; i < totalCells; i++) {
      const rndX = randomFunction();
      const rndY = randomFunction();

      this.#grid[rndY][rndX].state = stateFunction();
    }
  }

  simulate() {
    this.#grid.forEach((row) => {
      row.forEach((cell) => {
        if (cell.hasNeighbors) cell.behave();
      });
    });

    this.#grid.forEach((row) => {
      row.forEach((cell) => cell.flush());
    });

    this.#updateStats(++this.#cycle);
  }
}
