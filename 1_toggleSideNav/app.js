// state
let isActive = false;

// DOM
const $toggle = document.querySelector('.toggle');
const $nav = document.querySelector('nav');
const $main = document.querySelector('main');

// functions
const fetchState = () => {
  isActive = localStorage.getItem('isActive')
    ? JSON.parse(localStorage.getItem('isActive'))
    : false;
};

const toggleNavigatorState = () => {
  fetchState();
  isActive = !isActive;
  localStorage.setItem('isActive', isActive);
  $nav.classList.toggle('active', isActive);
};

const toggleTransitionState = isDisable => {
  $nav.classList.toggle('notransition', isDisable);
  $main.classList.toggle('notransition', isDisable);
  $toggle.classList.toggle('notransition', isDisable);
};

// event bindings
window.addEventListener('DOMContentLoaded', () => {
  toggleTransitionState(true);
  fetchState();
  $nav.classList.toggle('active', isActive);
});

$toggle.onclick = () => {
  toggleTransitionState(false);
  toggleNavigatorState();
};
