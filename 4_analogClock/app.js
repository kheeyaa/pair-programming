// DOM Nodes
const $hour = document.querySelector('.hand.hour');
const $minute = document.querySelector('.hand.minute');
const $second = document.querySelector('.hand.second');

// functions
const renderClock = () => {
  const now = new Date();
  const hour = now.getHours();
  const minute = now.getMinutes();
  const second = now.getSeconds();

  $second.style.setProperty('--deg', second * 6);
  $minute.style.setProperty('--deg', minute * 6 + second * 0.1);
  $hour.style.setProperty('--deg', hour * 30 + minute * 0.5);
};

setInterval(renderClock, 1000);

// event bindings
window.addEventListener('DOMContentLoaded', renderClock);
