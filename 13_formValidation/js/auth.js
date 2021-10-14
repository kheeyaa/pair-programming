// DOM Nodes

import toaster from './toaster.js';

const $signinUserid = document.getElementById('signin-userid');
const $signinPassword = document.getElementById('signin-password');
const $signinBtn = document.querySelector('.signin.button');
const $signinForm = document.querySelector('.signin.form');
const $signupForm = document.querySelector('.signup.form');

// varaibles
// constants
const ID_REGEXP =
  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
const PW_REGEXP = /^[0-9a-zA-Z]{6,12}$/;
const ID_ERROR_MESSAGE = '이메일 형식에 맞게 입력해 주세요.';
const PW_ERROR_MESSAGE = '영문 또는 숫자를 6~12자 입력해 주세요.';

// states
let idValidateState = false;
let pwValidateState = false;

// functions

const isValidate = (inputType, inputVal, regexp) => {
  const validation = regexp.test(inputVal);
  inputType === 'id'
    ? (idValidateState = validation)
    : (pwValidateState = validation);
  return validation;
};

const noticeValidation = (inputType, target) => {
  if (inputType !== 'id' && inputType !== 'pw')
    throw new TypeError('input type Error!');

  const [regexp, message] =
    inputType === 'id'
      ? [ID_REGEXP, ID_ERROR_MESSAGE]
      : [PW_REGEXP, PW_ERROR_MESSAGE];

  if (isValidate(inputType, target.value, regexp)) {
    target.parentNode.lastElementChild.innerHTML = '';
    [...target.parentNode.children].forEach(node =>
      node.matches('.icon-success')
        ? node.classList.remove('hidden')
        : node.matches('.icon-error')
        ? node.classList.add('hidden')
        : node
    );
  } else {
    target.parentNode.lastElementChild.innerHTML = message;
    [...target.parentNode.children].forEach(node =>
      node.matches('.icon-error')
        ? node.classList.remove('hidden')
        : node.matches('.icon-success')
        ? node.classList.add('hidden')
        : node
    );
  }
};

const activeSigninBtn = () => {
  if (idValidateState && pwValidateState)
    $signinBtn.removeAttribute('disabled');
  else $signinBtn.setAttribute('disabled', '');
};

// Event Bindings

$signinUserid.oninput = e => {
  noticeValidation('id', e.target);
  activeSigninBtn();
};

$signinPassword.oninput = e => {
  noticeValidation('pw', e.target);
  activeSigninBtn();
};

$signinForm.onsubmit = e => {
  e.preventDefault();
  toaster(e);
};
