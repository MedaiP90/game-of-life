let aliveNeighbors = neighbors
  .filter((n) => n != undefined)
  .reduce((acc, curr) => acc + curr.state, 0);

const remainsAlive =
  (currentState == 1 && aliveNeighbors >= 2 && aliveNeighbors <= 3) ||
  (currentState == 0 && aliveNeighbors == 3);

return remainsAlive ? 1 : 0;
