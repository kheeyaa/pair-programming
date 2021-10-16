import toaster from './toaster.js';

// DOM Nodes
const $signinForm = document.querySelector('.form.signin');
const $signupForm = document.querySelector('.form.signup');
const $links = document.querySelectorAll('.link > a');

// states
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
const isValidate = (inputType, inputVal) => {
  const validation = INPUT_TYPE_INFO[inputType].regExp.test(inputVal);

  INPUT_TYPE_INFO[inputType].validateState = validation;

  return validation;
};

const initializeValidateStates = () => {
  [...Object.keys(INPUT_TYPE_INFO)].forEach(inputType => {
    INPUT_TYPE_INFO[inputType].validateState = false;
  });
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

const printFormData = $form => {
  $form.method = 'POST';
  console.log($form.method);
  [...new FormData($form).entries()].forEach(([key, value]) => {
    console.log(`${key}: ${value}`);
  });
};

// Event Bindings
const $inputContainers = document.querySelectorAll('.input-container');

[...$inputContainers].forEach($container => {
  const $input = $container.querySelector('input');
  const $iconSuccess = $container.querySelector('.icon-success');
  const $iconError = $container.querySelector('.icon-error');
  const $error = $container.querySelector('.error');
  const $submitBtn = $container.parentNode.querySelector('.button');

  $input.oninput = () => {
    const validation =
      $input.name === 'confirm-password'
        ? isEqualPw()
        : isValidate($input.name, $input.value);

    $iconSuccess.classList.toggle('hidden', !validation);
    $iconError.classList.toggle('hidden', validation);
    $error.innerHTML = validation ? '' : INPUT_TYPE_INFO[$input.name].message;
    const isValidateAll = [
      ...$container.parentNode.querySelectorAll('input')
    ].every($input => INPUT_TYPE_INFO[$input.name].validateState);

    isValidateAll
      ? $submitBtn.removeAttribute('disabled')
      : $submitBtn.setAttribute('disabled', '');
  };
});

[$signinForm, $signupForm].forEach($form => {
  $form.onsubmit = e => {
    e.preventDefault();
    toaster(e);
    printFormData($form);
  };
});

$links.forEach($el => {
  $el.onclick = () => {
    [$signinForm, $signupForm].forEach($form => {
      $form.classList.toggle('hidden');
    });

    initializeValidateStates();
  };
});
