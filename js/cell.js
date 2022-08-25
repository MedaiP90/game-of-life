class Cell {
  state = 0;
  tmpState = 0;

  #cellBehavior = "";
  #neighborhood = [];
  #memory = {};
  #onError = () => {};

  constructor(cellBehavior, onError) {
    this.#cellBehavior = cellBehavior;
    this.#onError = onError;
  }

  get hasNeighbors() {
    return this.#neighborhood.length > 0;
  }

  set neighborhood(neighbors) {
    this.#neighborhood = neighbors;
  }

  behave() {
    try {
      const behavior = new Function("currentState", "neighbors", "memory", this.#cellBehavior);
      this.tmpState = behavior(this.state, this.#neighborhood, this.#memory);
    } catch (error) {
      this.#onError(error);
    }
  }

  flush() {
    this.state = this.tmpState;
  }

  getFromMemory(key) {
    return this.#memory[key];
  }
}
