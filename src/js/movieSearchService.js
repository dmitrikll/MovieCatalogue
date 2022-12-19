import getRefs from './refs';
const { searchForm, filmGallery, guard } = getRefs();
import { fetchSearchQuery, fetchGenres } from './fetchMoviesAPIService';
import { markUpGallery } from './renderFilmList';
import { observer, fetchInfiniteResults } from './infiniteScroll';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

let isFetching = false;
let page = 1;

searchForm.addEventListener('submit', onFormSubmit);

async function onFormSubmit(e) {
  e.preventDefault();

  const searchQuery = e.currentTarget.elements.query.value.trim().toLowerCase();

  if (!searchQuery) {
    return;
  } else {
    const fetchedMovies = await fetchSearchQuery(searchQuery, page);
    const genres = await fetchGenres();
    const total_results = await fetchedMovies.data.total_results;

    if (!total_results) {
      searchForm.reset();

      Notify.warning(
        'Sorry, there are no movies matching your search query. Please try again.'
      );
      return;
    }
    Notify.success(`Hooray! We found ${total_results} movies.`);
    filmGallery.innerHTML = '';

    filmGallery.insertAdjacentHTML(
      'beforeend',
      markUpGallery(fetchedMovies.data.results, genres)
    );

    const options = {
      root: document.querySelector('filmGallery'),
      rootMargin: '500px',
      threshold: 1.0,
    };

    const observer = new IntersectionObserver(onFetchMoviesInfinitely, options);

    function onFetchMoviesInfinitely(entries, observer) {
      entries.forEach(entry => {
        if (entry.isIntersecting && !isFetching) {
          page += 1;
          fetchInfiniteResults(searchQuery, page);
        }
      });
    }

    observer.observe(guard);
  }
}
