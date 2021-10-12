const $body = document.querySelector('body');

let isDarkMode = false;

const fetchState = () => {
  isDarkMode = localStorage.getItem('isDarkMode')
    ? JSON.parse(localStorage.getItem('isDarkMode'))
    : false;
};

// window.matchMedia('(prefers-color-scheme: dark)')

fetchState();
$body.classList.toggle('dark', isDarkMode);
