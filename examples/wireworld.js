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

switch (currentState) {
  case 1: // Conductor
    return electronHeadsNeighbors == 1 || electronHeadsNeighbors == 2 ? 0.3333 : 1;
  case 0.3333: // Electron head
    return 0.6667;
  case 0.6667: // Electron tail
    return 1;
  default:
    return 0;
}
