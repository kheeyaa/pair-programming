import toaster from './toaster.js';

// DOM Nodes
const $signinForm = document.querySelector('.signin.form');
const $signinBtn = document.querySelector('.signin.button');
const $signupForm = document.querySelector('.signup.form');
const $signupBtn = document.querySelector('.signup.button');
const $links = document.querySelectorAll('.link > a');

// constants and states
const INPUT_TYPE_INFO = {
  userid: {
    message: '이메일 형식에 맞게 입력해 주세요.',
    regExp:
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i,
    validateState: false
  },
  username: {
    message: '이름을 입력해 주세요.',
    regExp: /^[A-Za-z가-힣]+$/,
    validateState: false
  },
  password: {
    message: '영문 또는 숫자를 6~12자 입력해 주세요.',
    regExp: /^[0-9a-zA-Z]{6,12}$/,
    validateState: false
  },
  'confirm-password': {
    message: '패스워드가 일치하지 않습니다.',
    validateState: false
  }
};

// functions
const isEqualPw = () => {
  const $signupPassword = document.getElementById('signup-password');
  const $signupConfirmPassword = document.getElementById(
    'signup-confirm-password'
  );
  INPUT_TYPE_INFO['confirm-password'].validateState =
    $signupPassword.value === $signupConfirmPassword.value;
  return INPUT_TYPE_INFO['confirm-password'].validateState;
};

const isValidate = (inputType, inputVal) => {
  // const validation = regexp.test(inputVal);
  const validation = INPUT_TYPE_INFO[inputType].regExp.test(inputVal);

  INPUT_TYPE_INFO[inputType].validateState = validation;

  return validation;
};

const noticeValidation = (inputType, target) => {
  if (!(inputType in INPUT_TYPE_INFO)) {
    throw new TypeError('input type Error!');
  }

  const validation =
    inputType === 'confirm-password'
      ? isEqualPw()
      : isValidate(inputType, target.value);

  const [iconForHidden, iconNotForHidden, innerMessage] = validation
    ? ['success', 'error', '']
    : ['error', 'success', INPUT_TYPE_INFO[inputType].message];
  // 일단 킵//////////////////////////////////

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
  if (
    INPUT_TYPE_INFO.userid.validateState &&
    INPUT_TYPE_INFO.password.validateState
  )
    $signinBtn.removeAttribute('disabled');
  else $signinBtn.setAttribute('disabled', '');
};

const activeSignupBtn = () => {
  if (
    INPUT_TYPE_INFO.userid.validateState &&
    INPUT_TYPE_INFO.password.validateState &&
    INPUT_TYPE_INFO.username.validateState &&
    INPUT_TYPE_INFO['confirm-password'].validateState
  )
    $signupBtn.removeAttribute('disabled');
  else $signupBtn.setAttribute('disabled', '');
};

// if (
//   INPUT_TYPE_INFO.userid.validateState &&
//   INPUT_TYPE_INFO.password.validateState &&
//   (AAA ? true : INPUT_TYPE_INFO.username.validateState) &&
//   (AAA ? true : INPUT_TYPE_INFO['confirm-password'].validateState)
// )

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
      INPUT_TYPE_INFO.userid.validateState,
      INPUT_TYPE_INFO.password.validateState,
      INPUT_TYPE_INFO.username.validateState,
      INPUT_TYPE_INFO['confirm-password'].validateState
    ] = [false, false, false, false];
  };
});
