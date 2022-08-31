const aliveNeighbors = neighbors
  .filter((n) => n != undefined)
  .reduce((acc, curr) => acc + curr.state, 0);

return currentState == 0 && aliveNeighbors == 2 ? 1 : 0;
