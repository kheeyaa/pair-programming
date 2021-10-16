import toaster from './toaster.js';
import {
  INPUT_TYPE_INFO,
  isValidate,
  initializeValidateStates,
  isEqualPw,
  isValidateAll
} from './states.js';

// DOM Nodes
const $signinForm = document.querySelector('.form.signin');
const $signupForm = document.querySelector('.form.signup');
const $links = document.querySelectorAll('.link > a');

const printFormData = $form => {
  $form.method = 'POST';
  console.log($form.method);
  [...new FormData($form).entries()].forEach(([key, value]) => {
    console.log(`${key}: ${value}`);
  });
};

// Event Bindings
export default () => {
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

      isValidateAll($container)
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
};
