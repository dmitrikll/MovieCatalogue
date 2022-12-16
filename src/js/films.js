import { BASE_URL } from './apiFilms/baseUrl';
export { markUpGallery };
import { TrendingFilmsApiService } from './apiFilms/apiTrending';
import axios from 'axios';
import { displayLoader } from './spinner';
import getRefs from './refs';
const { filmGallery, guard } = getRefs();
const trending = new TrendingFilmsApiService();

// const filmGallery = document.querySelector('.film-gallery');
// const guard = document.querySelector('.guard-js');

let ObserverOptions = {
  root: null,
  rootMargin: '500px',
  threshold: 1.0,
};

export let observer = new IntersectionObserver(
  observerFunction,
  ObserverOptions
);


let page = trending.page;

function observerFunction(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      trending.incrementPage();
      displayLoader();
      filmer().then(function () {
        document.querySelector('.loader').remove()
      });
      page += 1;
      console.log(page);
    }
  });
}

export async function filmer() {
  try {
    const films = await trending.fetchFilms();
    const genres = await trending.fetchGenres();
    trending.genres = genres;
    console.log('into filmer -trending.genres', trending.genres);
    console.log('into filmer -genres', genres);
    // filmGallery.innerHTML = markUpGallery(films,genres)
    filmGallery.insertAdjacentHTML('beforeend', markUpGallery(films, genres));
    observer.observe(guard);
    // btnRef.style.display = 'block';
  } catch (err) {
    console.log(err);
  }
}

filmer().then(function () {
  document.querySelector('.loader').remove()
});

function markUpGallery(filmsArr, genres) {
  console.log('filmsArr', filmsArr);
  console.log('genres', genres);
  return filmsArr
    .map(({ id, title, release_date, poster_path, genre_ids }) => {
      const imgPath = `https://image.tmdb.org/t/p/w500${poster_path}`;
      const releaseDate = new Date(`${release_date}`);
      const releaseYear = releaseDate.getFullYear();
      const genresList = genres
        .filter(genre => genre_ids.includes(genre.id))
        .map(arr => arr.name);

      return `<li class = "film-gallery__item" data-id="${id}">
           <img class="film-gallery__image" src="${imgPath}" alt="${title}" loading="lazy"/>
           <div class="film-gallery__info">
            <p class="film-gallery__title">${title.toUpperCase()}</p>
            <p class="film-gallery__text">${Object.values(genresList).join(
              ', '
            )} | ${releaseYear}</p>
          </div>
          </li>`;
    })
    .join('');
}
