// DOM Nodes
const $scrollIcon = document.querySelector('.scroll-icon');

// functions
const throttle = (callback, delay) => {
  let timerId;
  return event => {
    if (timerId) return;
    timerId = setTimeout(
      () => {
        callback(event);
        timerId = null;
      },
      delay,
      event
    );
  };
};

// event Bindings
window.onscroll = throttle(() => {
  $scrollIcon.style.display = window.pageYOffset > 100 ? 'block' : 'none';
}, 300);

$scrollIcon.onclick = () => {
  window.scrollTo(0, 0);
};
