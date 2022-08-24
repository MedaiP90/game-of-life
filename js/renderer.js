class Renderer {
  #automaton = undefined;
  #htmlAutomaton = undefined;
  #automatonGrid = [];
  #automatonSize = 0;
  #size = 0;
  #color = "#1b1b1b";
  #redraw = false;
  #gameProgress = false;
  #redrawCallback = () => {};

  _rendererInterval = undefined;

  constructor(automaton, htmlAutomaton, size, redrawCallback = () => {}) {
    this.#automaton = automaton;
    this.#htmlAutomaton = htmlAutomaton;
    this.#size = size;
    this.#redrawCallback = redrawCallback;
  }

  get color() {
    return this.#color;
  }

  start() {
    this._rendererInterval = setInterval(() => {
      let forceCellsDraw = false;

      /* The grid has to be updated */

      if (this.#redraw) {
        this.#redraw = false;
        this.#automatonSize = this.#automaton.size;
        this.#buildGrid();

        forceCellsDraw = true;
        this.#redrawCallback();
      }

      /* Draw cells state on the grid */

      if (this.#gameProgress || forceCellsDraw) {
        forceCellsDraw = false;
        this.#drawCells();
      }
    }, 33); // 30 fps
  }

  redrawGrid() {
    this.#redraw = true;
  }

  toggleCellDraw() {
    this.#gameProgress = !this.#gameProgress;
  }

  changeColor(baseColor) {
    this.#color = baseColor;
  }

  #buildGrid() {
    this.#automatonGrid = [];

    let gridColumnsTemplate = "";
    let gridRowsTemplate = "";

    for (let i = 0; i < this.#automatonSize; i++) {
      gridColumnsTemplate += ` ${this.#size / this.#automatonSize}vh`;
      gridRowsTemplate += ` ${this.#size / this.#automatonSize}vh`;
    }

    this.#htmlAutomaton.style["grid-template-columns"] = gridColumnsTemplate;
    this.#htmlAutomaton.style["grid-template-rows"] = gridRowsTemplate;
    this.#htmlAutomaton.innerHTML = "";

    this.#automaton.grid.forEach((row, y) => {
      this.#automatonGrid[y] = [];

      row.forEach((cell, x) => {
        this.#automatonGrid[y][x] = cell.htmlElement;
        this.#htmlAutomaton.appendChild(this.#automatonGrid[y][x]);
      });
    });
  }

  #drawCells() {
    this.#automatonGrid.forEach((row, y) => {
      row.forEach((cell, x) => {
        const cellState = this.#automaton.grid[y][x].state;
        let cellOpacity = Math.floor(cellState * 255).toString(16);

        if (cellOpacity.length === 1) cellOpacity = `0${cellOpacity}`;

        cell.style.background = cellState > 0 ? `${this.#color}${cellOpacity}` : `${this.#color}00`;
      });
    });
  }
}
