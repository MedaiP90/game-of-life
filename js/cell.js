class Cell {
  state = 0;
  tmpState = 0;
  htmlElement = undefined;

  constructor(htmlBuilder) {
    this.htmlElement = htmlBuilder();
  }

  get alive() {
    return this.state == 1;
  }

  behave(neighbors = []) {
    let aliveNeighbors = neighbors.reduce((acc, curr) => acc + curr.state, 0);
  
    const remainsAlive =
      (this.alive && aliveNeighbors >= 2 && aliveNeighbors <= 3) ||
      (!this.alive && aliveNeighbors == 3);
  
    this.tmpState = remainsAlive ? 1 : 0;
  }

  flush() {
    this.state = this.tmpState;
  }
}
