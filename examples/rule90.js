// Choose only left and right neighbors
const trueNeighbors = [
  neighbors[3]?.state ?? 0,
  neighbors[4]?.state ?? 0,
];

return trueNeighbors[0] != trueNeighbors[1] ? 1 : 0;
