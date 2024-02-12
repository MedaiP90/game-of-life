class Renderer {
  canDraw = false;

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
  #renderCallback = () => {};
  #minFramerate = 5;
  #drawEventCallback = () => {};

  constructor(automaton, htmlAutomaton, htmlDisplayGrid, redrawCallback = () => {}, renderCallback = () => {}) {
    this.#automaton = automaton;
    this.#htmlAutomaton = htmlAutomaton;
    this.#htmlDisplayGrid = htmlDisplayGrid;
    this.#automatonContext = htmlAutomaton.getContext("2d");
    this.#redrawCallback = redrawCallback;
    this.#renderCallback = renderCallback;

    this.#initDrawFunc();
  }

  get color() {
    return this.#color;
  }

  set drawEventCallback(callback) {
    this.#drawEventCallback = callback ? callback : () => {};
  }

  start() {
    setTimeout(() => {
      let forceCellsDraw = false;
      let redrawn = false;

      /* The grid has to be updated */

      if (this.#redraw) {
        this.#redraw = false;
        this.#automatonSize = this.#automaton.size;
        forceCellsDraw = true;

        this.#buildGrid();

        redrawn = true;
      }

      /* Draw cells state on the grid */

      const before = new Date().getTime();

      if (this.#gameProgress || forceCellsDraw) {
        forceCellsDraw = false;

        this.#automatonContext.clearRect(0, 0, this.#htmlAutomaton.width, this.#htmlAutomaton.height);
        this.#drawCells(0, this.#automatonSize - 1, 0, this.#automatonSize - 1);
      }

      const after = new Date().getTime();

      if (redrawn) {
        this.#redrawCallback();
      }

      if (this.#gameProgress) {
        this.#renderCallback(after - before + this.#minFramerate);
      }

      this.start();
    }, this.#minFramerate);
  }

  redrawGrid() {
    this.#redraw = true;
  }

  toggleCellDraw(newValue) {
    if (newValue == undefined) return this.#gameProgress = !this.#gameProgress;
    this.#gameProgress = newValue;
  }

  changeColor(baseColor) {
    this.#color = baseColor;
  }

  #initDrawFunc() {
    this.#htmlAutomaton.addEventListener("click", (evt) => {
      if (!this.canDraw) return;

      const { offsetX, offsetY } = evt;

      // Get cell coordinates from click coordinates
      const indexX = Math.floor(offsetX / this.#pixelSize.width);
      const indexY = Math.floor(offsetY / this.#pixelSize.height);

      if (this.#drawEventCallback) this.#drawEventCallback({ x: indexX, y: indexY });
    });
  }

  #buildGrid() {
    this.#pixelSize = {
      width: this.#htmlAutomaton.clientWidth / this.#automatonSize,
      height: this.#htmlAutomaton.clientHeight / this.#automatonSize,
    };

    this.#htmlAutomaton.width = this.#htmlAutomaton.clientWidth;
    this.#htmlAutomaton.height = this.#htmlAutomaton.clientHeight;
  }

  #drawCells(xStart, xEnd, yStart, yEnd) {
    // Base case
    if (xStart == xEnd && yStart == yEnd) {
      this.#drawSingleCell(this.#automaton.grid[yStart][xStart], xStart, yStart);
      return;
    }

    if (xStart == xEnd) {
      this.#drawCells(xStart, xEnd, yStart, Math.floor((yStart + yEnd) / 2));
      this.#drawCells(xStart, xEnd, Math.floor((yStart + yEnd) / 2) + 1, yEnd);
      return;
    }

    if (yStart == yEnd) {
      this.#drawCells(xStart, Math.floor((xStart + xEnd) / 2), yStart, yEnd);
      this.#drawCells(Math.floor((xStart + xEnd) / 2) + 1, xEnd, yStart, yEnd);
      return;
    }

    this.#drawCells(xStart, Math.floor((xStart + xEnd) / 2), yStart, Math.floor((yStart + yEnd) / 2));
    this.#drawCells(Math.floor((xStart + xEnd) / 2) + 1, xEnd, yStart, Math.floor((yStart + yEnd) / 2));
    this.#drawCells(xStart, Math.floor((xStart + xEnd) / 2), Math.floor((yStart + yEnd) / 2) + 1, yEnd);
    this.#drawCells(Math.floor((xStart + xEnd) / 2) + 1, xEnd, Math.floor((yStart + yEnd) / 2) + 1, yEnd);
  }

  #drawSingleCell(cell, x, y) {
    const cellState = cell.state;
    let cellOpacity = Math.floor(cellState * 255).toString(16);

    if (cellOpacity.length === 1) cellOpacity = `0${cellOpacity}`;

    const computedColor = cellState > 0 ? `${this.#color}${cellOpacity}` : undefined;

    if (computedColor != undefined) return this.#fillRect(computedColor, x, y);
    if (this.#htmlDisplayGrid.checked) this.#rect("#1b1b1b42", x, y);
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
