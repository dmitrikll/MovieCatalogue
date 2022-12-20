import TrendingFilmsApiService from './apiFilms/apiTrending';
import getRefs from './refs';
const { watchedBtn, queueBtn, filmGallery, placeholder, btnAddToWatch } =
  getRefs();

const TrendingFilmsApiService = new TrendingApiService();

onWatchedMarkup();

watchedBtn.addEventListener('click', onWatchedBtnClick);

function onWatchedBtnClick() {
  queueBtn.classList.remove('header-active-button');
  watchedBtn.classList.add('header-active-button');
  onWatchedMarkup();
}

function onWatchedMarkup() {
  if (getActiveTab() !== 'watched') {
    return;
  }
  const filmsFromLocalStorage = JSON.parse(localStorage.getItem('watched'));

  if (filmsFromLocalStorage) {
    topMoviesMarkUp(filmsFromLocalStorage);
  } else {
    // const placeholder = document.querySelector('.js-search__form');
    placeholder.style.display = 'block';
    filmGallery.innerHTML = '';
  }
}

function isLocalStorageItemEmpty(localStorageKey) {
  if (!localStorage.getItem(localStorageKey)) {
    return true;
  }

  return JSON.parse(localStorage.getItem(localStorageKey)).length === 0;
}

//Rerender after delete movie
btnAddToWatch.addEventListener('click', e => {
  setTimeout(() => onWatchedMarkup(), 100);
});

function getActiveTab() {
  return watchedBtn.classList.contains('header-active-button')
    ? 'watched'
    : 'queue';
}
