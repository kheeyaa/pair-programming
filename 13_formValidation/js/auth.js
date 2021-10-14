// DOM Nodes

import toaster from './toaster.js';

const $signinUserid = document.getElementById('signin-userid');
const $signinPassword = document.getElementById('signin-password');
const $signinBtn = document.querySelector('.signin.button');
const $signinForm = document.querySelector('.signin.form');
const $signupForm = document.querySelector('.signup.form');
const $links = document.querySelectorAll('.link > a');
const $signupUserid = document.getElementById('signup-userid');
const $signupPassword = document.getElementById('signup-password');
const $signupName = document.getElementById('signup-name');
const $signupConfirmPassword = document.getElementById(
  'signup-confirm-password'
);

const $signupBtn = document.querySelector('.signup.button');

// varaibles
// constants
const ID_REGEXP =
  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
const PW_REGEXP = /^[0-9a-zA-Z]{6,12}$/;
const NAME_REGEXP = /^[A-Za-z가-힣]+$/;
// const PW_CONFIRM_REGEXP = //

const ID_ERROR_MESSAGE = '이메일 형식에 맞게 입력해 주세요.';
const PW_ERROR_MESSAGE = '영문 또는 숫자를 6~12자 입력해 주세요.';
const NAME_ERROR_MESSAGE = '이름을 입력해 주세요.';
const PW_CONFIRM_ERROR_MESSAGE = '패스워드가 일치하지 않습니다.';

// states
let idValidateState = false;
let pwValidateState = false;
let nameValidateState = false;
let confirmValidateState = false;

// functions

const isEqualPw = () => {
  confirmValidateState = $signupPassword.value === $signupConfirmPassword.value;
  return confirmValidateState;
};

const isValidate = (inputType, inputVal, regexp) => {
  const validation = regexp.test(inputVal);

  inputType === 'userid'
    ? (idValidateState = validation)
    : inputType === 'password'
    ? (pwValidateState = validation)
    : (nameValidateState = validation);

  return validation;
};

const noticeValidation = (inputType, target) => {
  const INPUT_TYPES = ['userid', 'username', 'password', 'confirm-password'];

  if (!INPUT_TYPES.includes(inputType))
    throw new TypeError('input type Error!');

  const [regexp, message] =
    inputType === 'userid'
      ? [ID_REGEXP, ID_ERROR_MESSAGE]
      : inputType === 'password'
      ? [PW_REGEXP, PW_ERROR_MESSAGE]
      : inputType === 'username'
      ? [NAME_REGEXP, NAME_ERROR_MESSAGE]
      : [null, PW_CONFIRM_ERROR_MESSAGE];

  const validation = [...INPUT_TYPES].slice(0, 3).includes(inputType)
    ? isValidate(inputType, target.value, regexp)
    : isEqualPw();

  const [iconForHidden, iconNotForHidden, innerMessage] = validation
    ? ['success', 'error', '']
    : ['error', 'success', message];

  target.parentNode.lastElementChild.innerHTML = innerMessage;
  [...target.parentNode.children].forEach(node =>
    node.matches('.icon-' + iconForHidden)
      ? node.classList.remove('hidden')
      : node.matches('.icon-' + iconNotForHidden)
      ? node.classList.add('hidden')
      : node
  );
};

const activeSigninBtn = () => {
  if (idValidateState && pwValidateState)
    $signinBtn.removeAttribute('disabled');
  else $signinBtn.setAttribute('disabled', '');
};

const activeSignupBtn = () => {
  if (
    idValidateState &&
    pwValidateState &&
    nameValidateState &&
    confirmValidateState
  )
    $signupBtn.removeAttribute('disabled');
  else $signupBtn.setAttribute('disabled', '');
};

// Event Bindings

[$signinForm, $signupForm].forEach($form => {
  $form.oninput = e => {
    noticeValidation(e.target.name, e.target);
    activeSigninBtn();
    activeSignupBtn();
  };
});

[$signinForm, $signupForm].forEach($form => {
  $form.onsubmit = e => {
    e.preventDefault();
    toaster(e);
  };
});

$links.forEach($el => {
  $el.onclick = () => {
    [$signupForm, $signinForm].forEach($form => {
      $form.classList.toggle('hidden');
    });

    [
      idValidateState,
      pwValidateState,
      nameValidateState,
      confirmValidateState
    ] = [false, false, false, false];
  };
});
