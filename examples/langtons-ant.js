// 0: empty
// 0.5: path
// 1: ant

const turnRight = [2, 0, 3, 1];
const turnLeft = [1, 3, 0, 2];
const trueNeighbors = [
  neighbors[1], // top
  neighbors[3], // left
  neighbors[4], // right
  neighbors[6], // bottom
];

if (memory.transition == undefined) {
  memory.transition = {
    direction: currentState != 1 ? -1 : Math.floor(Math.random() * 4),
    state: Math.floor(Math.random() * 2),
    turnAnt: false,
  };

  return currentState;
}

if (currentState == 1) {
  memory.transition.turnAnt = false;
  memory.transition.direction = memory.transition.state == 0
    ? turnRight[memory.transition.direction]
    : turnLeft[memory.transition.direction];

  const next = trueNeighbors[memory.transition.direction]?.getFromMemory("transition");

  if (next != undefined) {
    next.state = new Number(trueNeighbors[memory.transition.direction].state);
    next.direction = new Number(memory.transition.direction);
    next.turnAnt = true;
  }

  memory.transition.direction = -1;
  memory.transition.state = new Number(memory.transition.state == 0 ? 0.5 : 0);

  return memory.transition.state;
}

if (memory.transition.turnAnt) {
  return 1;
}

return currentState;
