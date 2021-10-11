// state
let isActive = false;

// DOM 요소
const $toggle = document.querySelector('.toggle');
const $nav = document.querySelector('nav');

// event 핸들러 등록

const fetchState = () => {
  isActive = localStorage.getItem('isActive')
    ? JSON.parse(localStorage.getItem('isActive'))
    : false;
};

const toggleNavigator = () => {
  isActive = !isActive;
  isActive = localStorage.setItem('isActive', isActive);
  $nav.classList.toggle('active', isActive);
};

window.addEventListener('DOMContentLoaded', () => {
  fetchState();
  $nav.classList.toggle('active', isActive);
});

$toggle.onclick = () => {
  fetchState();
  toggleNavigator();
};
