// DOM Nodes
const $togglePopup = document.querySelector('.toggle-popup');
const $modalWrap = document.querySelector('.modal-wrap');
const $modalInput = document.querySelector('.modal-input');
const $modalForm = document.querySelector('.modal-form');
const $popupMessage = document.querySelector('.popup-message');

// event bindings
$togglePopup.onclick = () => {
  $modalInput.value = '';
  $modalWrap.classList.remove('hidden');
  $modalInput.focus();
};

$modalWrap.onclick = e => {
  ['modal-wrap', 'modal-cancel', 'bx-x'].forEach(className => {
    if (e.target.classList.contains(className)) {
      $modalWrap.classList.add('hidden');
    }
  });
};

$modalForm.onsubmit = e => {
  e.preventDefault();
  $popupMessage.innerHTML = $modalInput.value;
  $modalWrap.classList.add('hidden');
};
