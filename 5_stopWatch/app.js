const $display = document.querySelector('.display');
const $stopwatch = document.querySelector('.stopwatch');

const $leftControl = $stopwatch.children[1];
const $rightControl = $stopwatch.children[2];

let isRunning = false;
let interval = 0;

const formatTime = () => {
  const millisecond = interval % 100;
  const second = Math.floor(interval / 100) % 60;
  const minute = Math.floor(interval / 6000);

  return `${minute > 9 ? minute : '0' + minute}:${
    second > 9 ? second : '0' + second
  }:${millisecond > 9 ? millisecond : '0' + millisecond}`;
};

const render = () => {
  $display.innerHTML = formatTime();
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
    render();
  }, 10);
};

const stopTimer = () => {
  $rightControl.setAttribute('disabled', true);
  $leftControl.innerHTML = 'Start';
  $rightControl.innerHTML = 'Reset';
};

$leftControl.onclick = () => {
  isRunning ? stopTimer() : startTimer();
  isRunning = !isRunning;
};
