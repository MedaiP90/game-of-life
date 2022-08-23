class Automaton {
  #cycle = 0;
  #grid = [];
  #size = 0;

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

  reset() {
    this.#cycle = 0;
    this.#grid = [];
  }

  generateGrid(
    cellsPerRow = 0,
    cellBehavior = "",
    cellBuilder = () => document.createElement("div"),
    onCellError = (e) => console.error(e)
  ) {
    this.reset();
    this.#size = cellsPerRow;

    for (let y = 0; y < cellsPerRow; y++) {
      this.#grid[y] = [];
    
      for (let x = 0; x < cellsPerRow; x++) {
        this.#grid[y][x] = new Cell(cellBehavior, cellBuilder, onCellError);
      }
    }
  }

  initializeGrid(totalCells, randomFunction, stateFunction = () => 1) {
    for (let i = 0; i < totalCells; i++) {
      const rndX = randomFunction();
      const rndY = randomFunction();

      this.#grid[rndY][rndX].state = stateFunction();
    }
  }

  simulate() {
    this.#updateStats(++this.#cycle);

    const cellsPerRow = this.#grid.length;

    for (let y = 0; y < cellsPerRow; y++) {
      for (let x = 0; x < cellsPerRow; x++) {
        const yB = y - 1 < 0
          ? bordersChk.checked ? cellsPerRow - 1 : undefined
          : y - 1;
        const xB = x - 1 < 0
          ? bordersChk.checked ? cellsPerRow - 1 : undefined
          : x - 1;
        const yA = y + 1 == cellsPerRow
          ? bordersChk.checked ? 0 : undefined
          : y + 1;
        const xA = x + 1 == cellsPerRow
          ? bordersChk.checked ? 0 : undefined
          : x + 1;

        const neighbors = [
          yB != undefined && xB != undefined ? this.#grid[yB][xB] : undefined,
          yB != undefined ? this.#grid[yB][x] : undefined,
          yB != undefined && xA != undefined ? this.#grid[yB][xA] : undefined,
          xB != undefined ? this.#grid[y][xB] : undefined,
          xA != undefined ? this.#grid[y][xA] : undefined,
          yA != undefined && xB != undefined ? this.#grid[yA][xB] : undefined,
          yA != undefined ? this.#grid[yA][x] : undefined,
          yA != undefined && xA != undefined ? this.#grid[yA][xA] : undefined,
        ].filter((n) => n != undefined);

        this.#grid[y][x].behave(neighbors);
      }
    }

    this.#grid.forEach((row) => {
      row.forEach((cell) => cell.flush());
    });
  }
}
