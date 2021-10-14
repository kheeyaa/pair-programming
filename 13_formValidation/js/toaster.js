const $body = document.querySelector('body');

const deleteToast = $toast => {
  setTimeout(() => {
    $body.removeChild($toast);
  }, 3000);
};

const toaster = {
  add(toasterHTML) {
    document.querySelector('body').appendChild(toasterHTML);
    toasterHTML.style.bottom = 0;
    deleteToast(toasterHTML);
  }
};

const createToastAction = (type, title, message) => {
  const $div = document.createElement('div');
  $div.classList.add('toast');
  $div.classList.add('toast-' + type);
  $div.innerHTML = `
      <div class="toast-heading">${title}</div>
      <div class="toast-message">
        <svg width="24" height="24">
          <use xlink:href="#${type}" />
        </svg>
        <p>${message}</p>
      </div>
      <a class="close">&times;</a>`;
  return $div;
};

export default e => {
  e.preventDefault();
  toaster.add(
    createToastAction('success', 'Well done!', 'This is a success alert')
  );
};
