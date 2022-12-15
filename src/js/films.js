import { BASE_URL } from './apiFilms/baseUrl';

import { TrendingFilmsApiService } from './apiFilms/apiTrending';
import axios from 'axios';
const trending = new TrendingFilmsApiService();

const filmGallery = document.querySelector('.film-gallery');
const btnRef = document.querySelector('.btn-lm');
console.log(btnRef);
btnRef.style.display = 'none';
btnRef.addEventListener('click', onLoadMore);
function onLoadMore() {
  console.log('bgkjhghkgobject');
  trending.incrementPage();
  trending
    .fetchFilms()
    .then(response => console.log('response2', response))
    .then(filmer);
  //     .then(); //так чтоб в скобки зпсунуть функцию отрисовкм
}

trending.fetchFilms().then(
  response => console.log(response)
  // filmGallery.innerHTML = markUpGallery(response.results)
);
// trending.fetchGenres().then(response =>
//     console.log(response))

export async function filmer() {
  try {
    const films = await trending.fetchFilms();
    const genres = await trending.fetchGenres();
    trending.genres = genres;
    console.log('into filmer -trending.genres', trending.genres);
    console.log('into filmer -genres', genres);
    // filmGallery.innerHTML = markUpGallery(films,genres)
    filmGallery.insertAdjacentHTML('beforeend', markUpGallery(films, genres));
    btnRef.style.display = 'block';
  } catch (err) {
    console.log(err);
  }
}

// filmer();

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

      return `<li class = "gallery-item">
           <img class="gallery-image" src="${imgPath}" alt="${title}" loading="lazy"/>
           <div class="info">
            <p class="info-item">${title.toUpperCase()}</p>
            <p class="info-item">${Object.values(
              genresList
            )} | ${releaseYear}</p>
          </div>
          </li>`;
    })
    .join('');
}
