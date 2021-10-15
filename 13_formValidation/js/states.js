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

  const [iconNotForHidden, iconForHidden, innerMessage] = validation
    ? ['.icon-success', '.icon-error', '']
    : ['.icon-error', '.icon-success', INPUT_TYPE_INFO[inputType].message];

  target.parentNode.lastElementChild.innerHTML = innerMessage;
  [...target.parentNode.children].forEach(node =>
    node.matches(iconNotForHidden)
      ? node.classList.remove('hidden')
      : node.matches(iconForHidden)
      ? node.classList.add('hidden')
      : node
  );
};

const activeBtn = targetForm => {
  const $signinBtn = document.querySelector('.signin.button');
  const $signupBtn = document.querySelector('.signup.button');

  const $targetBtn = targetForm === 'signin' ? $signinBtn : $signupBtn;
  if (
    INPUT_TYPE_INFO.userid.validateState &&
    INPUT_TYPE_INFO.password.validateState &&
    (targetForm === 'signin'
      ? true
      : INPUT_TYPE_INFO.username.validateState &&
        INPUT_TYPE_INFO['confirm-password'].validateState)
  )
    $targetBtn.removeAttribute('disabled');
  else $targetBtn.setAttribute('disabled', '');
};

const initializationValidateStates = () => {
  [
    INPUT_TYPE_INFO.userid.validateState,
    INPUT_TYPE_INFO.password.validateState,
    INPUT_TYPE_INFO.username.validateState,
    INPUT_TYPE_INFO['confirm-password'].validateState
  ] = [false, false, false, false];
};

export { noticeValidation, activeBtn, initializationValidateStates };
