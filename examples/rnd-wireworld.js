// 0 -> blank
// 0.3333 -> electron head
// 0.6667 -> electron tail
// 1 -> conductor

const electronHeadsNeighbors = neighbors
  .filter((n) => n != undefined)
  .filter((n) => n.state == 0.3333)
  .length;

const conductorsNeighbors = neighbors
  .filter((n) => n != undefined)
  .filter((n) => n.state > 0)
  .length;

// Remove excessive wiring
if (conductorsNeighbors > 4) {
  return 0;
}

if (currentState == 1) { // Conductor
  return electronHeadsNeighbors == 1 || electronHeadsNeighbors == 2 ? 0.3333 : 1;
}

if (currentState == 0.3333) { // Electron head
  return 0.6667;
}

if (currentState == 0.6667) { // Electron tail
  return 1;
}

// Generate new wires
if (conductorsNeighbors == 4) {
  return 1;
}

return 0;
