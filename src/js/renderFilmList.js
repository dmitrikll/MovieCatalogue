import getRefs from './refs';
const { filmGallery } = getRefs();
import { fetchMovies, fetchGenres } from './fetchMoviesAPIService';

async function renderMovieList() {
  try {
    const films = await fetchMovies();
    const genres = await fetchGenres();

    filmGallery.insertAdjacentHTML('beforeend', markUpGallery(films, genres));
  } catch (error) {
    console.log(error);
  }
}

function markUpGallery(filmsArr, genres) {
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

export { markUpGallery, renderMovieList };
