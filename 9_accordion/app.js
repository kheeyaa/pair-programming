const $accordion = document.querySelector('.accordion');

const activeAccordion = target => {
  [...$accordion.children].forEach(menu => {
    menu === target
      ? menu.classList.add('active')
      : menu.classList.remove('active');
  });
};

const showMenu = target => {
  const totalHeight = [...target.children].reduce(
    (height, subMenu) =>
      height +
      window.getComputedStyle(subMenu).getPropertyValue('height').slice(0, -2) *
        1,
    0
  );
  target.style.height = totalHeight + 'px';
};

$accordion.onclick = e => {
  if (!e.target.classList.contains('menu')) return;
  activeAccordion(e.target.parentNode);
  showMenu(e.target.nextElementSibling);
};
