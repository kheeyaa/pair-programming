// state
let isActive = false;

// DOM
const $toggle = document.querySelector('.toggle');
const $nav = document.querySelector('nav');

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

// event bindings
window.addEventListener('DOMContentLoaded', () => {
  fetchState();
  $nav.classList.toggle('active', isActive);
});

$toggle.onclick = () => {
  toggleNavigatorState();
};
