// DOM Nodes
const $display = document.querySelector('.display');
const $stopwatch = document.querySelector('.stopwatch');
const $laps = document.querySelector('.laps');
const $startStopControl = $stopwatch.children[1];
const $resetLapsControl = $stopwatch.children[2];

// states
let isRunning = false;
let interval = 0;
let laps = [];

// functions
const formatTime = () => {
  const millisecond = interval % 100;
  const second = Math.floor(interval / 100) % 60;
  const minute = Math.floor(interval / 6000);

  return `${minute > 9 ? minute : '0' + minute}:${
    second > 9 ? second : '0' + second
  }:${millisecond > 9 ? millisecond : '0' + millisecond}`;
};

const renderTime = () => {
  $display.innerHTML = formatTime();
};

const renderLapsTime = () => {
  const $fragment = document.createDocumentFragment();
  const $lapsId = document.createElement('div');
  const $lapsTime = document.createElement('div');
  if (laps.length === 1) {
    $laps.innerHTML = `
      <div class="lap-title">Laps</div>
      <div class="lap-title">Time</div>`;
  }
  if (laps.length > 0) {
    $lapsId.innerHTML = laps.length;
    $lapsTime.innerHTML = laps[laps.length - 1];
    $fragment.appendChild($lapsId);
    $fragment.appendChild($lapsTime);
    $laps.appendChild($fragment);
  } else {
    $laps.innerHTML = '';
  }
};

const startTimer = () => {
  $resetLapsControl.removeAttribute('disabled');
  $startStopControl.innerHTML = 'Stop';
  $resetLapsControl.innerHTML = 'Lap';

  const runTimer = setInterval(() => {
    interval += 1;
    if (!isRunning) {
      clearInterval(runTimer);
    }
    renderTime();
  }, 10);
};

const stopTimer = () => {
  $startStopControl.innerHTML = 'Start';
  $resetLapsControl.innerHTML = 'Reset';
};

// event bindings
$startStopControl.onclick = () => {
  isRunning ? stopTimer() : startTimer();
  isRunning = !isRunning;
};

$resetLapsControl.onclick = () => {
  if (isRunning) {
    laps = [...laps, formatTime()];
    renderLapsTime();
  } else {
    interval = 0;
    laps = [];
    renderTime();
    renderLapsTime();
    $resetLapsControl.setAttribute('disabled', '');
  }
};
