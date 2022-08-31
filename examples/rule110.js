// Choose only left and right neighbors
const trueNeighbors = [
  neighbors[3]?.state ?? 0,
  neighbors[4]?.state ?? 0,
];

if (currentState == 1) {
  return trueNeighbors[0] == 1 && trueNeighbors[1] == 1 ? 0 : 1;
} else {
  return trueNeighbors[1] == 1 ? 1 : 0;
}
