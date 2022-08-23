/* Utility functions */

function cellGenerator(gridVisible, circularCells) {
  const cell = document.createElement("div");

  cell.style.background = "#ffffff";
  if (gridVisible) cell.style["box-shadow"] = "0px 0px 0px 1px #1b1b1b42";
  if (circularCells) cell.style["border-radius"] = "50%";

  return cell;
}

function stopProgress() {
  clearInterval(gameProgress);
  gameProgress = undefined;

  startBtn.innerHTML = "Start";
  generateBtn.disabled = false;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/* Select visual elements */

const grid = document.getElementById("automaton");
const size = document.getElementById("size");
const speed = document.getElementById("speed");
const rules = document.getElementById("rules");
const presets = document.getElementById("rules-preset");
const errorLog = document.getElementById("error-log");
const cyclesStat = document.getElementById("cycles");
const statusStat = document.getElementById("status");
const gridChk = document.getElementById("grid");
const circlesChk = document.getElementById("circles");
const bordersChk = document.getElementById("borders");
const neighborsSel = document.getElementById("neighbors-type");
const colorInput = document.getElementById("color");
const generateBtn = document.getElementById("generator");
const startBtn = document.getElementById("starter");

// Presets selection
fetch("examples/index.json")
  .then(async (res) => {
    const availablePresets = await res.json();

    availablePresets.unshift({ name: "--", file: "--" });

    availablePresets.forEach((preset) => {
      const htmlPreset = document.createElement("option");

      htmlPreset.innerHTML = preset.name;
      htmlPreset.value = preset.file;
      htmlPreset.setAttribute("neighborhood", preset.neighborhood || "");

      presets.appendChild(htmlPreset);
    });

    presets.addEventListener("change", async () => {
      const selected = presets.value;
      const path = `examples/${selected}`;
      const nt = presets.options[presets.selectedIndex].getAttribute("neighborhood");

      if (nt != "") neighborsSel.value = nt;
      if (selected == "--") return rules.value = "";

      try {
        const response = await fetch(path);
        rules.value = await response.text();
      } catch {
        /* Unhandled */
      }
    });

    presets.style.display = "inline";
  })
  .catch(() => (presets.style.display = "none"));

// Create a new game
const automaton = new Automaton(
  updateStats = (cycle) => (cyclesStat.innerHTML = cycle)
);

// Create game renderer
const renderer = new Renderer(automaton, grid, 96);

/* Setup listeners */

startBtn.addEventListener("click", () => {
  if (gameProgress != undefined) {
    stopProgress();

    statusStat.innerHTML = "Stopped";
  } else {
    gameProgress = setInterval(() => automaton.simulate(), Number(speed.value));

    startBtn.innerHTML = "Pause";
    statusStat.innerHTML = "Running";
    generateBtn.disabled = true;
  }
});

generateBtn.addEventListener("click", () => {
  startBtn.disabled = true;
  generateBtn.disabled = true;

  errorLog.style.display = "none";
  errorLog.innerHTML = "";
  cyclesStat.innerHTML = "--";
  statusStat.innerHTML = "--";

  automaton.generateGrid(
    cellsPerRow = Number(size.value),
    neighborsType = neighborsSel.value,
    cellBehavior = rules.value,
    cellBuilder = () => cellGenerator(gridChk.checked, circlesChk.checked),
    onCellError = (error) => {
      errorLog.innerHTML = error.message;
      errorLog.style.display = "inline";
      statusStat.innerHTML = "Error";

      stopProgress();
    }
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
