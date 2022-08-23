/* Utility functions */

function cellGenerator(gridVisible, circularCells) {
  const cell = document.createElement("div");

  cell.style.background = "#ffffff";
  if (gridVisible) cell.style["box-shadow"] = "0px 0px 0px 1px #1b1b1b42";
  if (circularCells) cell.style["border-radius"] = "50%";

  return cell;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/* Select visual elements */

const grid = document.getElementById("automaton");
const size = document.getElementById("size");
const speed = document.getElementById("speed");
const cyclesStat = document.getElementById("cycles");
const gridChk = document.getElementById("grid");
const circlesChk = document.getElementById("circles");
const bordersChk = document.getElementById("borders");
const colorInput = document.getElementById("color");
const generateBtn = document.getElementById("generator");
const startBtn = document.getElementById("starter");

// Create a new game
const automaton = new Automaton(
  updateStats = (cycle) => (cyclesStat.innerHTML = cycle),
);

// Create game renderer
const renderer = new Renderer(automaton, grid, 96);

/* Setup listeners */

startBtn.addEventListener("click", () => {
  if (gameProgress != undefined) {
    clearInterval(gameProgress);
    gameProgress = undefined;

    startBtn.innerHTML = "Start";
    generateBtn.disabled = false;
  } else {
    gameProgress = setInterval(() => automaton.simulate(), Number(speed.value));

    startBtn.innerHTML = "Pause";
    generateBtn.disabled = true;
  }
});

generateBtn.addEventListener("click", () => {
  startBtn.disabled = true;
  generateBtn.disabled = true;

  automaton.generateGrid(
    cellsPerRow = Number(size.value),
    cellBuilder = () => cellGenerator(gridChk.checked, circlesChk.checked)
  );

  // Generate initial active cells
  automaton.initializeGrid(
    totalCells = getRandomInt(1, automaton.size * automaton.size),
    randomFunction = () => getRandomInt(0, automaton.size - 1),
    stateFunction = () => 1
  );

  // Trigger grid update
  renderer.redrawGrid();

  startBtn.disabled = false;
  generateBtn.disabled = false;
});

colorInput.addEventListener("change", () => {
  renderer.changeColor(colorInput.value?.slice(0, 7));
  document.getElementById("color-preview").style.background = renderer.color;
});

/* Define variables */

let gameProgress = undefined;
let gameRenderer = undefined;

/* Initialize */

size.value = 10;
speed.value = 500;

renderer.changeColor("#1b1b1b");
renderer.start();
