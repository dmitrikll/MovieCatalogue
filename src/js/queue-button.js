import TrendingFilmsApiService from './apiFilms/apiTrending';
const refs = {
    watchedBtn: document.querySelector('.header_btn-watched'),
    queueBtn: document.querySelector('.header_btn-queue'),
    list: document.querySelector('.film-gallery'),
}
const TrendingFilmsApiService = new TrendingApiService();
refs.queueBtn.addEventListener('click', onWatchedBtnClick);

function onWatchedBtnClick() {
  refs.watchedBtn.classList.remove('header-active-button');
  refs.queueBtn.classList.add('header-active-button');
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
    const placeholder = document.querySelector('.placeholder');
    placeholder.style.display = 'block';
    refs.list.innerHTML = '';
  }
}
// 
function topMoviesMarkUp(movies) {
  refs.list.innerHTML = movies
    .map(movie => {
      let movie_g = getGenrs(JSON.parse(localStorage.getItem('genres')));
      if (movie_g.length > 2) {
        movie_g = [movie_g[0], movie_g[1], 'Other'];
      }
      return `<li class="movies__item" id="${movie.id}" data-id=${movie.id}>
    <a href="" class="movies__link">
        <img src='${checkImgLink(
          movie.poster_path
        )}' class="movie__image" alt="Movie">
        <div class="movie__text-part">
            <h2 class="movie__title">${movie.title || movie.name}</h2>
            <p class="movie__genre">${
              movie_g.join(', ') || 'No data'
            } <span class="stick">|</span> 
                <span class="movie__year">${
                  (movie.release_date || movie.first_air_date || '').slice(
                    0,
                    4
                  ) || 'No data'
                }</span></p>
        </div>
    </a>
</li>`;
    })
    .join('');

  const placeholder = document.querySelector('.placeholder');
  if (isLocalStorageItemEmpty('queue')) {
    placeholder.style.display = 'block';
  } else {
    placeholder.style.display = 'none';
  }
}

function isLocalStorageItemEmpty(localStorageKey) {
  if (!localStorage.getItem(localStorageKey)) {
    return true;
  }

  return JSON.parse(localStorage.getItem(localStorageKey)).length === 0;
}

function getGenrs(genres) {
  return genres.map(genre => {
    return genre.name;
  });
}

//Rerender after delete movie
const btnAddToQueue = document.querySelector('.queue');
btnAddToQueue.addEventListener('click', e => {
  setTimeout(() => onWatchedMarkup(), 100); //Dirty hack due to late work with localstorage
});

function getActiveTab() {
  const watchedButton = document.querySelector('.header_btn-watched');

  return watchedButton.classList.contains('header-active-button')
    ? 'watched'
    : 'queue';
}
function checkImgLink(data) {
  if (data) {
    return `https://image.tmdb.org/t/p/original/${data}`;
  }
  return `https://bflix.biz/no-poster.png`;
}