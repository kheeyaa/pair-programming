// DOM Nodes

const $signinUserid = document.getElementById('signin-userid');
const $signinPassword = document.getElementById('signin-password');

// varaibles
const ID_REGEXP =
  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
const PW_REGEXP = /^[0-9a-zA-Z]{6,12}$/g;
const ID_ERROR_MESSAGE = '이메일 형식에 맞게 입력해 주세요.';
const PW_ERROR_MESSAGE = '영문 또는 숫자를 6~12자 입력해 주세요.';

// functions

const isValidate = (inputVal, regexp) => regexp.test(inputVal);

const renderError = (target, regexp, message) => {
  target.parentNode.lastElementChild.innerHTML = isValidate(
    target.value,
    regexp
  )
    ? ''
    : message;
  console.log(isValidate(target.value, regexp));
};

// Event Bindings

$signinUserid.oninput = e => {
  renderError(e.target, ID_REGEXP, ID_ERROR_MESSAGE);
};

$signinPassword.oninput = e => {
  renderError(e.target, PW_REGEXP, PW_ERROR_MESSAGE);
};
