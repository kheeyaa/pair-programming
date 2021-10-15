const $accordion = document.querySelector('.accordion');

const activeAccordionMenu = target => {
  [...$accordion.children].forEach($menuContainer => {
    $menuContainer === target
      ? $menuContainer.classList.add('active')
      : $menuContainer.classList.remove('active');
  });
};

const getHeight = target => {
  const totalHeight = [...target.children].reduce(
    (height, $subMenuItem) =>
      height + getComputedStyle($subMenuItem).height.slice(0, -2) * 1,
    0
  );
  return totalHeight + 'px';
};

const expandMenu = target => {
  [...$accordion.children].forEach($menuContainer => {
    $menuContainer.lastElementChild.style.height =
      $menuContainer.classList.contains('active') ? getHeight(target) : 0;
  });
};

const initializeMenuHeight = () => {
  const $active = document.querySelector('.active');
  $active.lastElementChild.style.height = 'auto';

  $active.lastElementChild.style.height = getComputedStyle(
    $active.lastElementChild
  ).height;
};

// event bindings
$accordion.onclick = e => {
  if (!e.target.classList.contains('menu')) return;

  activeAccordionMenu(e.target.parentNode);
  expandMenu(e.target.nextElementSibling);
};

window.addEventListener('DOMContentLoaded', initializeMenuHeight);
