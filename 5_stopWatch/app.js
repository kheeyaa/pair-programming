// DOM Nodes
const $display = document.querySelector('.display');
const $stopwatch = document.querySelector('.stopwatch');
const $laps = document.querySelector('.laps');
const $startStopControl = $stopwatch.children[1];
const $resetLapsControl = $stopwatch.children[2];

// states
let isRunning = false;
let laps = [];
const intervalTime = (() => {
  let interval = 0;
  return {
    increase() {
      interval += 1;
    },
    reset() {
      interval = 0;
    },
    get value() {
      return interval;
    }
  };
})();

// functions
const formatTime = () => {
  const millisecond = intervalTime.value % 100;
  const second = Math.floor(intervalTime.value / 100) % 60;
  const minute = Math.floor(intervalTime.value / 6000);

  return `${minute > 9 ? minute : '0' + minute}:${
    second > 9 ? second : '0' + second
  }:${millisecond > 9 ? millisecond : '0' + millisecond}`;
};

const renderTime = () => {
  $display.innerHTML = formatTime();
};

const toggleVisibilityLapTitle = () => {
  const $lapTitles = document.querySelectorAll('.lap-title');
  [...$lapTitles].forEach($lapTitle => {
    $lapTitle.style.display = laps.length ? 'block' : 'none';
  });
};

const renderLapsTime = () => {
  const $fragment = document.createDocumentFragment();
  const $lapsId = document.createElement('div');
  const $lapsTime = document.createElement('div');

  if (laps.length > 0) {
    $lapsId.innerHTML = laps.length;
    $lapsTime.innerHTML = laps[laps.length - 1];
    $fragment.appendChild($lapsId);
    $fragment.appendChild($lapsTime);
    $laps.appendChild($fragment);
  } else {
    $laps.innerHTML = `
      <div class="lap-title">Laps</div>
      <div class="lap-title">Time</div>`;
  }
  toggleVisibilityLapTitle();
};

const startTimer = () => {
  $resetLapsControl.removeAttribute('disabled');

  const runTimer = setInterval(() => {
    isRunning ? intervalTime.increase() : clearInterval(runTimer);
    renderTime();
  }, 10);
};

const toggleBtnName = isRunning => {
  $startStopControl.innerHTML = isRunning ? 'Start' : 'Stop';
  $resetLapsControl.innerHTML = isRunning ? 'Reset' : 'Lap';
};

// event bindings
$startStopControl.onclick = () => {
  toggleBtnName(isRunning);
  if (!isRunning) startTimer();
  isRunning = !isRunning;
};

$resetLapsControl.onclick = () => {
  if (isRunning) {
    laps = [...laps, formatTime()];
    renderLapsTime();
  } else {
    intervalTime.reset();
    laps = [];
    renderTime();
    renderLapsTime();
    $resetLapsControl.setAttribute('disabled', '');
  }
};

window.addEventListener('DOMContentLoaded', toggleVisibilityLapTitle);
