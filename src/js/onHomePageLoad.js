import { renderMovieList } from './renderFilmList';

onHomePageLoad();

function onHomePageLoad() {
  document.body.style.overflow = 'hidden';
  renderMovieList();
  window.onload = e => {
    setTimeout(() => {
      document.querySelector('.preloader').classList.add('done');
    }, 250);
  };
  document.body.style.overflow = 'visible';
}
