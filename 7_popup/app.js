const $togglePopup = document.querySelector('.toggle-popup');
const $modalWrap = document.querySelector('.modal-wrap');
const $modalCancel = document.querySelector('.modal-cancel');
const $modalClose = document.querySelector('.modal-close');
const $modalInput = document.querySelector('.modal-input');
const $modalForm = document.querySelector('.modal-form');
const $popupMessage = document.querySelector('.popup-message');

$togglePopup.onclick = () => {
  $modalInput.value = '';
  $modalWrap.classList.remove('hidden');
  $modalInput.focus();
};

[$modalCancel, $modalClose].forEach($modalBtn => {
  $modalBtn.onclick = () => {
    $modalWrap.classList.add('hidden');
  };
});

$modalForm.onsubmit = e => {
  e.preventDefault();
  $popupMessage.innerHTML = $modalInput.value;
  $modalWrap.classList.add('hidden');
};
