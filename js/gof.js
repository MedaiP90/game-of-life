/* Utility functions */

function stopProgress() {
  gameProgress = false;
  startBtn.innerHTML = "Start";
  generateBtn.disabled = false;
  screenshotBtn.disabled = false;
}

function startProgress() {
  setTimeout(
    () => {
      automaton.simulate();
      if (gameProgress) startProgress();
    },
    Number(speed.value)
  );
}

function generateStatuses() {
  statesList = [];

  if (statuses.value < 2) statuses.value = 2;
  if (statuses.value > 1000) statuses.value = 1000;

  const availableStates = Number(statuses.value);
  const step = 1 / (1 + (availableStates - 2));

  let tmpState = 0;

  while (tmpState <= 1) {
    statesList.push(Number(tmpState.toFixed(4)));
    tmpState += step;
  }

  const statusesContainer = document.getElementById("statuses-preview");

  statusesContainer.innerHTML = "";
  statesList.forEach((status) => {
    const sButton = document.createElement("button");

    sButton.textContent = status;
    sButton.className = "status-button";
    sButton.title = `Click to insert the value "${status}" in the text area at the current position`;

    sButton.addEventListener("click", () => {
      if (rules.selectionStart || rules.selectionStart == "0") {
        const startPos = rules.selectionStart;
        const endPos = rules.selectionEnd;

        rules.value = rules.value.substring(0, startPos) + status + rules.value.substring(endPos, rules.value.length);
      } else {
        rules.value += status;
      }
    });

    statusesContainer.appendChild(sButton);
  });
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/* Select visual elements */

const grid = document.getElementById("automaton");
const size = document.getElementById("size");
const speed = document.getElementById("speed");
const rules = document.getElementById("rules");
const statuses = document.getElementById("cell-statuses");
const presets = document.getElementById("rules-preset");
const errorLog = document.getElementById("error-log");
const cyclesStat = document.getElementById("cycles");
const computeStat = document.getElementById("compute");
const statusStat = document.getElementById("status");
const fpsStat = document.getElementById("fps");
const gridChk = document.getElementById("grid");
const bordersChk = document.getElementById("borders");
const neighborsSel = document.getElementById("neighbors-type");
const colorInput = document.getElementById("color");
const generateBtn = document.getElementById("generator");
const startBtn = document.getElementById("starter");
const screenshotBtn = document.getElementById("screenshot");
const loader = document.getElementById("loader");

/* Define variables */

let gameProgress = false;
let gameRenderer = undefined;
let statesList = [];

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
      htmlPreset.setAttribute("statuses", preset.statuses || "");

      presets.appendChild(htmlPreset);
    });

    presets.addEventListener("change", async () => {
      const selected = presets.value;
      const path = `examples/${selected}`;
      const nt = presets.options[presets.selectedIndex].getAttribute("neighborhood");
      const st = presets.options[presets.selectedIndex].getAttribute("statuses");

      if (nt != "") neighborsSel.value = nt;
      if (st != "") statuses.value = Number(st);
      if (selected == "--") return rules.value = "";

      generateStatuses();

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
  updateStats = (cycle, computeMs) => {
    cyclesStat.innerHTML = cycle;
    computeStat.innerHTML = computeMs;
  }
);

// Create game renderer
const renderer = new Renderer(
  automaton,
  grid,
  gridChk,
  () => (loader.style.display = "none"),
  (millis) => (fpsStat.innerHTML = Math.floor(1000 / millis))
);

/* Setup listeners */

startBtn.addEventListener("click", () => {
  if (gameProgress) {
    stopProgress();

    statusStat.innerHTML = "Stopped";
  } else {
    gameProgress = true;

    startProgress();

    startBtn.innerHTML = "Pause";
    statusStat.innerHTML = "Running";
    generateBtn.disabled = true;
    screenshotBtn.disabled = true;
  }

  renderer.toggleCellDraw();
});

generateBtn.addEventListener("click", () => {
  loader.style.display = "flex";

  startBtn.disabled = true;
  generateBtn.disabled = true;
  screenshotBtn.disabled = true;

  errorLog.style.display = "none";
  errorLog.innerHTML = "";
  cyclesStat.innerHTML = "--";
  computeStat.innerHTML = "--";
  statusStat.innerHTML = "--";
  fpsStat.innerHTML = "--";

  setTimeout(() => {
    automaton.generateGrid(
      crossBorders = bordersChk.checked,
      cellsPerRow = Number(size.value),
      neighborsType = neighborsSel.value,
      cellBehavior = rules.value,
      onCellError = (error) => {
        errorLog.innerHTML = error.message;
        errorLog.style.display = "inline";
        statusStat.innerHTML = "Error";

        console.error(error);
  
        stopProgress();
        renderer.toggleCellDraw(false);
      }
    );
  
    // Generate initial active cells
    automaton.initializeGrid(
      totalCells = getRandomInt(1, automaton.size * automaton.size),
      randomFunction = () => getRandomInt(0, automaton.size - 1),
      stateFunction = () => statesList[getRandomInt(1, statesList.length - 1)]
    );
  
    // Trigger grid update
    renderer.redrawGrid();
  
    startBtn.disabled = false;
    generateBtn.disabled = false;
    screenshotBtn.disabled = false;
  }, 100);
});

screenshotBtn.addEventListener("click", () => {
  loader.style.display = "flex";
  screenshotBtn.disabled = true;

  const tmpCanvas = document.createElement("canvas");
  const ctx = tmpCanvas.getContext("2d");
  const growthFactor = 0.5;
  const marginV = 30;
  const marginH = 15;
  const spacing = 10;
  const lineHeight = 16;
  const strings = [
    `Behavior: ${presets.options[presets.selectedIndex].text}`,
    `Neighborhood: ${neighborsSel.options[neighborsSel.selectedIndex].text}`,
    `Cell statuses: ${statuses.value}`,
    `Size: ${size.value}x${size.value}`,
    `Can cross borders: ${bordersChk.checked}`,
    `Cycle: ${automaton.cycle}`,
  ];

  tmpCanvas.clientHeight = grid.clientHeight + 2 * marginV;
  tmpCanvas.clientWidth = (1 + growthFactor) * grid.clientWidth + marginH;
  tmpCanvas.height = grid.height + 2 * marginV;
  tmpCanvas.width = (1 + growthFactor) * grid.width + marginH;
  
  // White background
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, tmpCanvas.width, tmpCanvas.height);

  // Automaton margin
  ctx.beginPath();
  ctx.lineWidth = "1";
  ctx.strokeStyle = "#1b1b1b";
  ctx.rect(growthFactor * grid.clientWidth - 1, marginV - 1, grid.width + 1, grid.height + 1);
  ctx.stroke();

  // Text setup
  ctx.font = `${lineHeight}px sans-serif`;
  ctx.fillStyle = "#1b1b1b";

  // Add text
  strings.forEach((s, i) => ctx.fillText(s, marginH, marginV + i * (lineHeight + spacing)));

  // Add old canvas
  ctx.drawImage(grid, growthFactor * grid.clientWidth, marginV);

  /* Download as image */

  const tmpLink = document.createElement("a");

  tmpLink.download = `cellular-automaton_${size.value}x${size.value}-${automaton.cycle}.png`;
  tmpLink.href = tmpCanvas.toDataURL();

  tmpLink.click();
  screenshotBtn.disabled = false;
  loader.style.display = "none";
});

colorInput.addEventListener("change", () => {
  renderer.changeColor(colorInput.value?.slice(0, 7));
  document.getElementById("color-preview").style.background = renderer.color;
});

statuses.addEventListener("change", () => generateStatuses());

/* Initialize */

size.value = 10;
speed.value = 30;
statuses.value = 2;

generateStatuses();
renderer.changeColor("#1b1b1b");
renderer.start();

loader.style.display = "none";
