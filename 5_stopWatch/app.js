const $display = document.querySelector('.display');
const $stopwatch = document.querySelector('.stopwatch');
const $laps = document.querySelector('.laps');

const $leftControl = $stopwatch.children[1];
const $rightControl = $stopwatch.children[2];

let isRunning = false;
let interval = 0;
let laps = [];

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
  $rightControl.removeAttribute('disabled');
  $leftControl.innerHTML = 'Stop';
  $rightControl.innerHTML = 'Lap';

  const runTimer = setInterval(() => {
    interval += 1;
    if (!isRunning) {
      clearInterval(runTimer);
    }
    renderTime();
  }, 10);
};

const stopTimer = () => {
  if (interval === 0) {
    $rightControl.setAttribute('disabled', true);
  }
  $leftControl.innerHTML = 'Start';
  $rightControl.innerHTML = 'Reset';
};

$leftControl.onclick = () => {
  isRunning ? stopTimer() : startTimer();
  isRunning = !isRunning;
};

$rightControl.onclick = () => {
  if (isRunning) {
    laps = [...laps, formatTime()];
    renderLapsTime();
  } else {
    interval = 0;
    laps = [];
    renderTime();
    renderLapsTime();
    $rightControl.setAttribute('disabled', true);
  }
};
