const $display = document.querySelector('.display');
const $stopwatch = document.querySelector('.stopwatch');

const $leftControl = $stopwatch.children[1];
const $rightControl = $stopwatch.children[2];

let isRunning = false;

let interval = 0;

const runTimer = () => {
  setInterval(() => {
    interval += 10;
    if (!isRunning) {
      clearInterval(runTimer);
    }
  }, 10);
};

const startTimer = () => {
  $rightControl.removeAttribute('disabled');
  $leftControl.innerHTML = 'Stop';
  $rightControl.innerHTML = 'Lap';
  runTimer();
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
