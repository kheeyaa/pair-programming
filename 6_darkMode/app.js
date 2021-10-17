// DOM Nodes
const $toggleButton = document.querySelector('.toggle-button');

// functions
const toggleDarkMode = () => {
  isDarkMode = !isDarkMode;
  localStorage.setItem('isDarkMode', isDarkMode);
  $body.classList.toggle('dark', isDarkMode);
};

// event binding
$toggleButton.onclick = toggleDarkMode;
