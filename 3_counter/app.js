// DOM Nodes
const $increase = document.querySelector('.increase');
const $decrease = document.querySelector('.decrease');
const $counter = document.querySelector('.counter');

// functions
const counter = (function () {
  let number = 0;
  return {
    increase() {
      number += 1;
      return number;
    },
    decrease() {
      number = number > 0 ? number - 1 : number;
      return number;
    }
  };
})();

// Event Bindings
$increase.onclick = () => {
  $counter.innerHTML = counter.increase();
};

$decrease.onclick = () => {
  $counter.innerHTML = counter.decrease();
};
