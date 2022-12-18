import Pagination from 'tui-pagination';
import getRefs from './refs';
const { containerPagination } = getRefs();
const Theme = {
  LIGHT: 'light-theme',
  DARK: 'dark-theme',
};
const Ref = {
  themaSwitchToogle: document.querySelector('.theme-switch__toggle'),
  body: document.querySelector('body'),
};

let thema = localStorage.getItem('thema');

if (!thema) {
  thema = Theme.LIGHT;
  localStorage.setItem('thema', thema);
}

Ref.body.classList.add(thema);

Ref.themaSwitchToogle.checked = thema === Theme.LIGHT ? false : true;

Ref.themaSwitchToogle.addEventListener('change', onToogleThema);
function onToogleThema() {
  if (Ref.themaSwitchToogle.checked) {
    Ref.body.classList.remove(Theme.LIGHT);
    Ref.body.classList.add(Theme.DARK);
    localStorage.setItem('thema', Theme.DARK);
  } else {
    Ref.body.classList.remove(Theme.DARK);
    Ref.body.classList.add(Theme.LIGHT);
    localStorage.setItem('thema', Theme.LIGHT);
  }
}
