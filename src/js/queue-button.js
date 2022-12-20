import TrendingFilmsApiService from './apiFilms/apiTrending';
import getRefs from './refs';
const { watchedBtn, queueBtn, filmGallery, placeholderQB, btnAddToQueue } =
  getRefs();

const TrendingFilmsApiService = new TrendingApiService();
queueBtn.addEventListener('click', onWatchedBtnClick);

function onWatchedBtnClick() {
  watchedBtn.classList.remove('header-active-button');
  queueBtn.classList.add('header-active-button');
  onWatchedMarkup();
}
function onWatchedMarkup() {
  console.log(getActiveTab());

  if (getActiveTab() !== 'queue') {
    return;
  }

  const filmsFromLocalStorage = JSON.parse(localStorage.getItem('queue'));

  if (filmsFromLocalStorage) {
    topMoviesMarkUp(filmsFromLocalStorage);
  } else {
    placeholderQB.style.display = 'block';
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
btnAddToQueue.addEventListener('click', e => {
  setTimeout(() => onWatchedMarkup(), 100);
});

function getActiveTab() {
  return watchedBtn.classList.contains('header-active-button')
    ? 'watched'
    : 'queue';
}
