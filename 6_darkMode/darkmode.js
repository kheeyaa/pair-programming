const $body = document.querySelector('body');

let isDarkMode = false;

const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

const fetchState = () => {
  isDarkMode = localStorage.getItem('isDarkMode')
    ? JSON.parse(localStorage.getItem('isDarkMode'))
    : darkModeMediaQuery.matches;
};

fetchState();
$body.classList.toggle('dark', isDarkMode);
