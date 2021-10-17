// DOM Nodes
const $body = document.querySelector('body');

// state
let isDarkMode = false;

// functions
const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

const fetchState = () => {
  isDarkMode = localStorage.getItem('isDarkMode')
    ? JSON.parse(localStorage.getItem('isDarkMode'))
    : darkModeMediaQuery.matches;
};

const initializeDarkMode = () => {
  fetchState();
  $body.classList.toggle('dark', isDarkMode);
};

initializeDarkMode();
