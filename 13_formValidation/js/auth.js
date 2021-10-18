import toaster from './toaster.js';

// states
let userInput = {};

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
const $signinForm = document.querySelector('.form.signin');
const $signupForm = document.querySelector('.form.signup');
const $inputContainers = document.querySelectorAll('.input-container');
const $links = document.querySelectorAll('.link > a');

// functions
const isValidateAll = inputLength => {
  if (inputLength !== Object.keys(userInput).length) return false;
  return Object.entries(userInput).every(el => el[1].validation);
};

const printFormData = $form => {
  $form.method = 'POST';
  console.log($form.method);
  [...new FormData($form).entries()].forEach(([key, value]) => {
    console.log(`${key}: ${value}`);
  });
};

// Event Bindings
export default () => {
  [...$inputContainers].forEach($container => {
    const $input = $container.querySelector('input');
    const $iconSuccess = $container.querySelector('.icon-success');
    const $iconError = $container.querySelector('.icon-error');
    const $error = $container.querySelector('.error');
    const $submitBtn = $container.parentNode.querySelector('.button');

    $input.oninput = () => {
      const validation =
        $input.name === 'confirm-password'
          ? userInput.password.value === $input.value
          : INPUT_TYPE_INFO[$input.name].regExp.test($input.value);

      userInput[$input.name] = { value: $input.value, validation };

      $iconSuccess.classList.toggle('hidden', !validation);
      $iconError.classList.toggle('hidden', validation);
      $error.innerHTML = validation ? '' : INPUT_TYPE_INFO[$input.name].message;

      const inputLength =
        $container.parentNode.querySelectorAll('input').length;
      isValidateAll(inputLength)
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
      userInput = {};
    };
  });
};
