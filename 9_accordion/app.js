const $accordion = document.querySelector('.accordion');

const activeAccordion = target => {
  [...$accordion.children].forEach(menuContainer => {
    menuContainer === target
      ? menuContainer.classList.add('active')
      : menuContainer.classList.remove('active');
  });
};

const getHeight = target => {
  //   if (!target.parentNode.classList.contains('active')) return;

  const totalHeight = [...target.children].reduce(
    (height, subMenu) =>
      height +
      window.getComputedStyle(subMenu).getPropertyValue('height').slice(0, -2) *
        1,
    0
  );
  return totalHeight + 'px';
};

const showMenu = target => {
  [...$accordion.children].forEach(menuContainer => {
    menuContainer.lastElementChild.style.height =
      menuContainer.classList.contains('active') ? getHeight(target) : 0;
  });
};

const initialMenu = () => {
  const $active = document.querySelector('.active');
  $active.lastElementChild.style.height = 'auto';

  $active.lastElementChild.style.height = getComputedStyle(
    $active.lastElementChild
  ).height;
};

// initialMenu에서 초기 height를 auto로 한 결과 뚝딱거림. 디버깅 필요함.

$accordion.onclick = e => {
  if (!e.target.classList.contains('menu')) return;

  activeAccordion(e.target.parentNode);
  showMenu(e.target.nextElementSibling);
};

window.addEventListener('DOMContentLoaded', initialMenu);
