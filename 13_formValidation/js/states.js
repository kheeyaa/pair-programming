// states
const validateState = {
  userid: false,
  username: false,
  password: false,
  'confirm-password': false
};

// constant
const INPUT_TYPE_INFO = {
  userid: {
    message: '이메일 형식에 맞게 입력해 주세요.',
    regExp:
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i
  },
  username: {
    message: '이름을 입력해 주세요.',
    regExp: /^[A-Za-z가-힣]+$/
  },
  password: {
    message: '영문 또는 숫자를 6~12자 입력해 주세요.',
    regExp: /^[0-9a-zA-Z]{6,12}$/
  },
  'confirm-password': {
    message: '패스워드가 일치하지 않습니다.'
  }
};

// DOM Nodes
const $signupForm = document.querySelector('.form.signup');

// functions
const isValidate = (inputType, inputVal) => {
  const validation = INPUT_TYPE_INFO[inputType].regExp.test(inputVal);
  validateState[inputType] = validation;
  return validation;
};

const initializeValidateStates = () => {
  [...Object.keys(INPUT_TYPE_INFO)].forEach(inputType => {
    validateState[inputType] = false;
  });
};

const isEqualPw = () => {
  //   const $signupPassword = document.getElementById('signup-password');
  //   const $signupConfirmPassword = document.getElementById(
  //     'signup-confirm-password'
  //   );

  //     validateState['confirm-password'] =
  //       $signupPassword.value === $signupConfirmPassword.value;

  const $passwordInputs = $signupForm.querySelectorAll(
    'input[type = password]'
  );
  validateState['confirm-password'] = [...$passwordInputs].every(
    $input => $input.value === $passwordInputs[0].value
  );

  return validateState['confirm-password'];
};

const isValidateAll = $container =>
  [...$container.parentNode.querySelectorAll('input')].every(
    $input => validateState[$input.name]
  );

export {
  INPUT_TYPE_INFO,
  isValidate,
  initializeValidateStates,
  isEqualPw,
  isValidateAll
};
