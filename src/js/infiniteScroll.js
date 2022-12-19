import getRefs from './refs';
const { filmGallery, guard } = getRefs();

import { fetchSearchQuery, fetchGenres } from './fetchMoviesAPIService';
import { markUpGallery } from './renderFilmList';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

async function fetchInfiniteResults(query, page) {
  const perPage = 20;

  isFetching = true;

  const fetchedMovies = await fetchSearchQuery(query, page);
  console.log(fetchedMovies);
  const genres = await fetchGenres();
  const totalResults = await fetchedMovies.data.total_results;

  if (perPage * page >= totalResults) {
    Notify.info('You have reached the end of search results.');
    observer.unobserve(guard);
  }

  filmGallery.insertAdjacentHTML(
    'beforeend',
    markUpGallery(fetchedMovies.data.results, genres)
  );
  isFetching = false;
}

export { observer, fetchInfiniteResults };
