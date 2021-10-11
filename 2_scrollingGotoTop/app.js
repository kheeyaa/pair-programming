// DOM Nodes
const $scrollIcon = document.querySelector('.scroll-icon');

// Event Binding

window.onscroll = () => {
  console.log('A');
  $scrollIcon.style.display = window.pageYOffset > 100 ? 'block' : 'none';
};

$scrollIcon.onclick = () => {
  window.scrollTo(0, 0);
};
