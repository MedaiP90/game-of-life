class Cell {
  state = 0;
  tmpState = 0;

  #cellBehavior = "";
  #onError = () => {};

  constructor(cellBehavior, onError) {
    this.#cellBehavior = cellBehavior;
    this.#onError = onError;
  }

  behave(neighbors = []) {
    try {
      const behavior = new Function("currentState", "neighbors", this.#cellBehavior);
      this.tmpState = behavior(this.state, neighbors);
    } catch (error) {
      this.#onError(error);
    }
  }

  flush() {
    this.state = this.tmpState;
  }
}
