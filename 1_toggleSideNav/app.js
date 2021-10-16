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

const toggleNavState = () => {
  fetchState();
  isActive = !isActive;
  localStorage.setItem('isActive', isActive);
  $nav.classList.toggle('active', isActive);
};

const toggleTransitionState = isDisable => {
  [$nav, $main, $toggle].forEach($element =>
    $element.classList.toggle('notransition', isDisable)
  );
};

// event bindings
window.addEventListener('DOMContentLoaded', () => {
  toggleTransitionState(true);
  fetchState();
  $nav.classList.toggle('active', isActive);
});

$toggle.onclick = () => {
  toggleTransitionState(false);
  toggleNavState();
};
