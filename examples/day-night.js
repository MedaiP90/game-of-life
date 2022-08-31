const toBorn = [3, 6, 7, 8];
const toLive = [3, 4, 6, 7, 8];

const aliveNeighbors = neighbors
  .filter((n) => n != undefined)
  .reduce((acc, curr) => acc + curr.state, 0);

if (currentState == 1) {
  return toLive.includes(aliveNeighbors) ? 1 : 0;
} else {
  return toBorn.includes(aliveNeighbors) ? 1 : 0;
}
