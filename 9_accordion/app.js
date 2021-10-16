// DOM Nodes
const $accordion = document.querySelector('.accordion');
const $menuContainers = document.querySelectorAll('.menu-container');

// functions
const activeAccordionMenu = selectedMenuContainer => {
  $menuContainers.forEach($menuContainer => {
    $menuContainer.classList.toggle(
      'active',
      $menuContainer === selectedMenuContainer
    );
  });
};

const expandMenu = () => {
  $menuContainers.forEach($menuContainer => {
    const $submenu = $menuContainer.querySelector('.submenu');
    $submenu.style.height = $menuContainer.classList.contains('active')
      ? $submenu.scrollHeight + 'px'
      : 0;
  });
};

const initializeMenuHeight = () => {
  const $active = document.querySelector('.active');
  $active.lastElementChild.style.height = 'auto';

  $active.lastElementChild.style.height =
    $active.lastElementChild.scrollHeight + 'px';
};

// event bindings
$accordion.onclick = e => {
  if (!e.target.classList.contains('menu')) return;

  activeAccordionMenu(e.target.parentNode);
  expandMenu();
};

window.addEventListener('DOMContentLoaded', initializeMenuHeight);
