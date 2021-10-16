// DOM Nodes
const $body = document.querySelector('body');

// states
let toastRecord = [];

// functions
const changePositionOfToast = () => {
  toastRecord.forEach(($toast, idx) => {
    $toast.style.bottom = idx * $toast.scrollHeight + 'px';
  });
};

const expireToast = $toast => {
  $body.removeChild($toast);
  toastRecord = toastRecord.slice(0, -1);
};

const toaster = {
  add($toast) {
    document.querySelector('body').appendChild($toast);
    toastRecord = [$toast, ...toastRecord];
    changePositionOfToast();
    setTimeout(expireToast, 3000, $toast);
  }
};

const createToastAction = (type, title, message) => {
  const $div = document.createElement('div');
  $div.className = 'toast toast-' + type;
  $div.innerHTML = `
      <h4 class="toast-heading">${title}</h4>
      <div class="toast-message">
        <svg width="24" height="24">
          <use xlink:href="#${type}" />
        </svg>
        <p>${message}</p>
      </div>
      <a class="close">&times;</a>`;
  return $div;
};

const TOAST_TYPE = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning'
};

// Button click Event Handlers
document.querySelector('.show-success').onclick = () =>
  toaster.add(
    createToastAction(
      TOAST_TYPE.SUCCESS,
      'Well done!',
      'This is a success alert'
    )
  );

document.querySelector('.show-error').onclick = () =>
  toaster.add(
    createToastAction(
      TOAST_TYPE.ERROR,
      'Check it out!',
      'This is a error alert'
    )
  );

document.querySelector('.show-warning').onclick = () =>
  toaster.add(
    createToastAction(
      TOAST_TYPE.WARNING,
      'Check it out!',
      'This is a warning alert'
    )
  );
