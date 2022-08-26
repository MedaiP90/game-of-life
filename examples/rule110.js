// Choose only left and right neighbors
const trueNeighbors = [
  neighbors[3]?.state ?? 0,
  neighbors[4]?.state ?? 0,
];

if (currentState == 1) {
  if (trueNeighbors[0] == 1 && trueNeighbors[1] == 1) return 0;
  else return 1;
} else {
  if (trueNeighbors[1] == 1) return 1;
  else return 0;
}
