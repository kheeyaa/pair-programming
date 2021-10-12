const $toggleButton = document.querySelector('.toggle-button');

const toggleDarkMode = () => {
  isDarkMode = !isDarkMode;
  localStorage.setItem('isDarkMode', isDarkMode);
  $body.classList.toggle('dark', isDarkMode);
};

$toggleButton.onclick = () => {
  toggleDarkMode();
};
