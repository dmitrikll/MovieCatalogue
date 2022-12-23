import { API_KEY } from './apiFilms/apiKey';
import { BASE_URL } from './apiFilms/baseUrl';

import fetchMovies from './apiFilms/fetchMovies';

import { markUpGallery } from './films';

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import axios from 'axios';
import throttle from 'lodash.throttle';

import { disableLoader, displayLoader } from './spinner';

import getRefs from './refs';
const { filmGallery } = getRefs();

export let scrollListener = null;

export default function infiniteScroll(query, page, per_page = 20) {
  let triggered = false;

  window.addEventListener(
    'scroll',
    (scrollListener = throttle(async () => {
      const height = document.body.offsetHeight;
      const screenHeight = window.innerHeight;
      const scrolled = window.scrollY;
      const threshold = height - screenHeight / 3;
      const position = scrolled + screenHeight;

      if (position < threshold || triggered) {
        return;
      }

      triggered = true;
      page += 1;

      //Place for spinner
      displayLoader();
      const fetchedMovies = await fetchMovies(query, page);
      const genres = await axios(
        `${BASE_URL}/genre/movie/list?api_key=${API_KEY}`
      );
      disableLoader();

      const total_results = await fetchedMovies.data.total_results;

      filmGallery.insertAdjacentHTML(
        'beforeend',
        markUpGallery(fetchedMovies.data.results, genres.data.genres)
      );

      if (per_page * page >= total_results) {
        Notify.info('You have reached the end of search results.');

        triggered = true;
        return;
      }

      triggered = false;
    }, 300000))
  );
}
