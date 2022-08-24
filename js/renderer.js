class Renderer {
  #automaton = undefined;
  #htmlAutomaton = undefined;
  #htmlDisplayGrid = { checked: true };
  #automatonContext = undefined;
  #automatonSize = 0;
  #color = "#1b1b1b";
  #redraw = false;
  #gameProgress = false;
  #pixelSize = 0;
  #redrawCallback = () => {};

  constructor(automaton, htmlAutomaton, htmlDisplayGrid, redrawCallback = () => {}) {
    this.#automaton = automaton;
    this.#htmlAutomaton = htmlAutomaton;
    this.#htmlDisplayGrid = htmlDisplayGrid;
    this.#automatonContext = htmlAutomaton.getContext("2d");
    this.#redrawCallback = redrawCallback;
  }

  get color() {
    return this.#color;
  }

  start() {
    setTimeout(() => {
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

      this.start();
    }, 33);
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
    this.#pixelSize = {
      width: this.#htmlAutomaton.clientWidth / this.#automatonSize,
      height: this.#htmlAutomaton.clientHeight / this.#automatonSize,
    };

    this.#htmlAutomaton.width = this.#htmlAutomaton.clientWidth;
    this.#htmlAutomaton.height = this.#htmlAutomaton.clientHeight;

    if (!this.#htmlDisplayGrid.checked) return;

    this.#automaton.grid.forEach((row, y) => {
      row.forEach((_cell, x) => {
        this.#rect("#1b1b1b42", x, y);
      });
    });
  }

  #drawCells() {
    this.#automaton.grid.forEach((row, y) => {
      row.forEach((cell, x) => {
        const cellState = cell.state;
        let cellOpacity = Math.floor(cellState * 255).toString(16);

        if (cellOpacity.length === 1) cellOpacity = `0${cellOpacity}`;

        const computedColor = cellState > 0 ? `${this.#color}${cellOpacity}` : undefined;

        this.#fillRect("white", x, y);

        if (computedColor != undefined) return this.#fillRect(computedColor, x, y);
        if (this.#htmlDisplayGrid.checked) this.#rect("#1b1b1b42", x, y);
      });
    });
  }

  #fillRect(color, x, y) {
    this.#automatonContext.fillStyle = color;
    this.#automatonContext.fillRect(x * this.#pixelSize.width, y * this.#pixelSize.height, this.#pixelSize.width, this.#pixelSize.height);
  }

  #rect(color, x, y) {
    this.#automatonContext.beginPath();
    this.#automatonContext.lineWidth = "0.5";
    this.#automatonContext.strokeStyle = color;
    this.#automatonContext.rect(x * this.#pixelSize.width, y * this.#pixelSize.height, this.#pixelSize.width, this.#pixelSize.height);
    this.#automatonContext.stroke();
  }
}
