import toaster from './toaster.js';
import {
  noticeValidation,
  activeBtn,
  initializationValidateStates
} from './states.js';

// DOM Nodes
const $signinForm = document.querySelector('.signin.form');
const $signupForm = document.querySelector('.signup.form');
const $links = document.querySelectorAll('.link > a');

const printUserInput = $form => {
  [...$form.children]
    .filter(element => element.matches('.input-container'))
    .map(element => [...element.children])
    .flat()
    .filter(element => element.matches('input'))
    .forEach(element => {
      console.log(element.value);
    });
};

// Event Bindings
export default () => {
  [$signinForm, $signupForm].forEach($form => {
    $form.oninput = e => {
      const targetForm = e.target.closest('form').classList.contains('signin')
        ? 'signin'
        : 'signup';
      noticeValidation(e.target.name, e.target);
      activeBtn(targetForm);
    };
  });

  [$signinForm, $signupForm].forEach($form => {
    $form.onsubmit = e => {
      e.preventDefault();
      toaster(e);
      printUserInput(e.target);
    };
  });

  $links.forEach($el => {
    $el.onclick = () => {
      [$signupForm, $signinForm].forEach($form => {
        $form.classList.toggle('hidden');
      });

      initializationValidateStates();
    };
  });
};
