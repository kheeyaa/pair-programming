// fetch fake data ----------------------------------------
// eslint-disable-next-line arrow-body-style
const fetchTabsData = () => {
  return new Promise(resolve => {
    setTimeout(
      () =>
        resolve([
          {
            title: 'HTML',
            content: `HTML(HyperText Markup Language) is the most basic building block of the Web. It describes and defines the content of a webpage along with the basic layout of the webpage. Other technologies besides HTML are generally used to describe a web page's appearance/presentation(CSS) or functionality/ behavior(JavaScript).`
          },
          {
            title: 'CSS',
            content: `Cascading Style Sheets(CSS) is a stylesheet language used to describe the presentation of a document written in HTML or XML (including XML dialects such as SVG, MathML or XHTML). CSS describes how elements should be rendered on screen, on paper, in speech, or on other media.`
          },
          {
            title: 'JavaScript',
            content: `JavaScript(JS) is a lightweight interpreted or JIT-compiled programming language with first-class functions. While it is most well-known as the scripting language for Web pages, many non-browser environments also use it, such as Node.js, Apache CouchDB and Adobe Acrobat. JavaScript is a prototype-based, multi-paradigm, dynamic language, supporting object-oriented, imperative, and declarative (e.g. functional programming) styles.`
          },
          {
            title: 'JavaScript',
            content: `JavaScript(JS) is a lightweight interpreted or JIT-compiled programming language with first-class functions. While it is most well-known as the scripting language for Web pages, many non-browser environments also use it, such as Node.js, Apache CouchDB and Adobe Acrobat. JavaScript is a prototype-based, multi-paradigm, dynamic language, supporting object-oriented, imperative, and declarative (e.g. functional programming) styles.`
          },
          {
            title: 'JavaScript',
            content: `JavaScript(JS) is a lightweight interpreted or JIT-compiled programming language with first-class functions. While it is most well-known as the scripting language for Web pages, many non-browser environments also use it, such as Node.js, Apache CouchDB and Adobe Acrobat. JavaScript is a prototype-based, multi-paradigm, dynamic language, supporting object-oriented, imperative, and declarative (e.g. functional programming) styles.`
          }
        ]),
      1000
    );
  });
};

// DOM Nodes
const $tabs = document.querySelector('.tabs');
const $spinner = document.querySelector('.spinner');

// states
let tabData = [];

// functions
const render = () => {
  const navHTML =
    '<nav>' +
    tabData
      .map(
        ({ title }, i) => `<div class="tab" data-index="${i}">${title}</div>`
      )
      .join('') +
    `<span class="glider"></span>
    </nav>`;

  const contentHTML = tabData
    .map(
      ({ content }, i) => `
        <div class="tab-content ${i === 0 ? 'active' : ''}">
          ${content}
        </div>`
    )
    .join('');
  $tabs.innerHTML = navHTML + contentHTML;
};

const addTabs = () => {
  $tabs.style.setProperty('--tab-width', 600 / tabData.length);
  $tabs.style.setProperty('--tabs-length', tabData.length);
  $spinner.style.display = 'none';
  render();
};

const activateTab = id => {
  [...$tabs.children].forEach((tab, i) =>
    tab.classList.toggle('active', i === +id + 1)
  );

  const $glider = document.querySelector('.glider');
  $glider.style.transform = `translateX(calc(var(--tab-width) * ${+id}px))`;
};

const hideShadow = () => {
  $tabs.style.setProperty('--tab-width', 0);
};

fetchTabsData().then(value => {
  tabData = [...value];
  addTabs();
});

// event bindins
window.addEventListener('DOMContentLoaded', hideShadow);

$tabs.onclick = e => {
  if (!e.target.classList.contains('tab')) return;

  activateTab(e.target.dataset.index);
};
