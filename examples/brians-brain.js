let aliveNeighbors = neighbors.reduce(
  (acc, curr) => {
    const nstate = curr.state == 1 ? 1 : 0;
    return acc + nstate;
  },
  0
);

if (currentState == 0) {
  return aliveNeighbors == 2 ? 1 : 0;
}

return currentState == 0.5 ? 0 : 0.5;

