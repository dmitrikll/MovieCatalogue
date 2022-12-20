import Pagination from 'tui-pagination';
import getRefs from './refs';
const { body, themaSwitchToogle } = getRefs();
const Theme = {
  LIGHT: 'light-theme',
  DARK: 'dark-theme',
};

let thema = localStorage.getItem('thema');

if (!thema) {
  thema = Theme.LIGHT;
  localStorage.setItem('thema', thema);
}

body.classList.add(thema);

themaSwitchToogle.checked = thema === Theme.LIGHT ? false : true;

themaSwitchToogle.addEventListener('change', onToogleThema);
function onToogleThema() {
  if (themaSwitchToogle.checked) {
    body.classList.remove(Theme.LIGHT);
    body.classList.add(Theme.DARK);
    localStorage.setItem('thema', Theme.DARK);
  } else {
    body.classList.remove(Theme.DARK);
    body.classList.add(Theme.LIGHT);
    localStorage.setItem('thema', Theme.LIGHT);
  }
}
