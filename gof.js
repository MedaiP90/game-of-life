const aliveColor = "#1b1b1b";

function generateCell() {
  const cell = document.createElement("div");

  cell.style.background = "#ffffff";
  cell.setAttribute("alive", "0");

  if (gridChk.checked) cell.style["box-shadow"] = "0px 0px 0px 1px #1b1b1b42";
  if (circlesChk.checked) cell.style["border-radius"] = "50%";

  return cell;
}

function generateGrid() {
  automaton = [];

  let gridColumnsTemplate = "";
  let gridRowsTemplate = "";

  for (let i = 0; i < cellsPerRow; i++) {
    gridColumnsTemplate += ` ${96 / cellsPerRow}vh`;
    gridRowsTemplate += ` ${96 / cellsPerRow}vh`;
  }

  grid.style["grid-template-columns"] = gridColumnsTemplate;
  grid.style["grid-template-rows"] = gridRowsTemplate;
  grid.innerHTML = "";

  for (let y = 0; y < cellsPerRow; y++) {
    automaton[y] = [];
  
    for (let x = 0; x < cellsPerRow; x++) {
      automaton[y][x] = generateCell();
  
      grid.appendChild(automaton[y][x]);
    }
  }
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function reset() {
  cellsPerRow = Number(size.value);
  initialCells = 0;

  generateGrid();

  for (let y = 0; y < automaton.length; y++) {
    for (let x = 0; x < automaton[y].length; x++) {
      automaton[y][x].style.background = "#ffffff";
      automaton[y][x].setAttribute("alive", "0");
    }
  }

  cycle = 0;

  document.getElementById("cycles").innerHTML = cycle;
}

function setup() {
  document.getElementById("starter").disabled = true;
  document.getElementById("generator").disabled = true;

  reset();

  // Generate initial active cells

  document.getElementById("cycles").innerHTML = cycle;

  initialCells = getRandomInt(1, cellsPerRow * cellsPerRow);

  for (let i = 0; i < initialCells; i++) {
    const rndX = getRandomInt(0, cellsPerRow - 1);
    const rndY = getRandomInt(0, cellsPerRow - 1);

    automaton[rndY][rndX].style.background = aliveColor;
    automaton[rndY][rndX].setAttribute("alive", "1");
  }

  document.getElementById("starter").disabled = false;
  document.getElementById("generator").disabled = false;
}

function cellBehavior(cell = { x: 0, y: 0, alive: false }, neighbors = []) {
  let aliveNeighbors = neighbors.reduce((acc, curr) => {
    return acc + (curr.getAttribute("alive") == "1" ? 1 : 0)
  }, 0);

  const remainsAlive =
    (cell.alive && aliveNeighbors >= 2 && aliveNeighbors <= 3) ||
    (!cell.alive && aliveNeighbors == 3);

  return remainsAlive ? aliveColor : "#ffffff";
}

function game() {
  // Start the game

  gameProgress = setInterval(() => {
    document.getElementById("cycles").innerHTML = ++cycle;

    const tmpColors = [];

    for (let y = 0; y < cellsPerRow; y++) {
      tmpColors[y] = [];

      for (let x = 0; x < cellsPerRow; x++) {
        const yB = y - 1 < 0 ? cellsPerRow - 1 : y - 1;
        const xB = x - 1 < 0 ? cellsPerRow - 1 : x - 1;
        const yA = y + 1 == cellsPerRow ? 0 : y + 1;
        const xA = x + 1 == cellsPerRow ? 0 : x + 1;

        const neighbors = [
          automaton[yB][xB],
          automaton[yB][x],
          automaton[yB][xA],
          automaton[y][xB],
          automaton[y][xA],
          automaton[yA][xB],
          automaton[yA][x],
          automaton[yA][xA],
        ];

        tmpColors[y][x] = cellBehavior(
          { x, y, alive: automaton[y][x].getAttribute("alive") == "1" },
          neighbors
        );
      }
    }

    for (let y = 0; y < automaton.length; y++) {
      for (let x = 0; x < automaton[y].length; x++) {
        automaton[y][x].style.background = tmpColors[y][x];
        automaton[y][x].setAttribute("alive", tmpColors[y][x] == aliveColor ? "1" : "0");
      }
    }
  }, 500);
}

const grid = document.getElementById("automaton");
const size = document.getElementById("size");
const gridChk = document.getElementById("grid");
const circlesChk = document.getElementById("circles");

let cellsPerRow = 10;
let automaton = [];

size.value = cellsPerRow;

generateGrid();

let gameProgress = undefined;
let initialCells = 0;
let cycle = 0;

document.getElementById("starter").addEventListener("click", () => {
  if (gameProgress != undefined) {
    clearInterval(gameProgress);
    gameProgress = undefined;
    document.getElementById("starter").innerHTML = "Start";
    document.getElementById("generator").disabled = false;
  } else {
    game();
    document.getElementById("starter").innerHTML = "Pause";
    document.getElementById("generator").disabled = true;
  }
});

document.getElementById("generator").addEventListener("click", setup);
