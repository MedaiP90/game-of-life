const turnRight = [2, 0, 3, 1];
const trueNeighbors = [
  neighbors[1], // top
  neighbors[3], // left
  neighbors[4], // right
  neighbors[6], // bottom
];

if (memory.termiteState == undefined) {
  memory.termiteState = currentState;
  memory.direction = Math.floor(Math.random() * 4);
  memory.tmp = {};

  return currentState;
}

// 1. Turn
// 2. Color (state)
// 3. Move

let newState = 0;
let next = undefined;

if (currentState == 1) {
  if (memory.termiteState == 1) {
    next = trueNeighbors[memory.direction]?.getFromMemory("tmp");
    newState = 0;

    if (next != undefined) {
      next.termiteState = 1;
      next.direction = memory.direction;
    }
  } else {
    memory.direction = turnRight[memory.direction];
    next = trueNeighbors[memory.direction]?.getFromMemory("tmp");
    newState = 1;

    if (next != undefined) {
      next.termiteState = 1;
      next.direction = memory.direction;
    }
  }
} else {
  if (memory.termiteState == 1) {
    next = trueNeighbors[memory.direction]?.getFromMemory("tmp");
    newState = 0;

    if (next != undefined) {
      next.termiteState = 0;
      next.direction = memory.direction;
    }
  } else {
    memory.direction = turnRight[memory.direction];
    next = trueNeighbors[memory.direction]?.getFromMemory("tmp");
    newState = 1;

    if (next != undefined) {
      next.termiteState = 0;
      next.direction = memory.direction;
    }
  }
}

if (memory.tmp.termiteState != undefined) {
  memory.termiteState = memory.tmp.termiteState;
  memory.tmp.termiteState = undefined;
}

if (memory.tmp.direction != undefined) {
  memory.direction = memory.tmp.direction;
  memory.tmp.direction = undefined;
}

return newState;
