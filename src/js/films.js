export { markUpGallery };
import { TrendingFilmsApiService } from './apiFilms/apiTrending';
import { displayLoader, disableLoader } from './spinner';
import getRefs from './refs';
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import defaultPicture from '../images/defaultPicture.png'

const { filmGallery, containerPagination } = getRefs();
const trending = new TrendingFilmsApiService();

const options = {
  totalItems: 100,
  itemsPerPage: 20,
  visiblePages: 5,
  page: 1,
  centerAlign: true,
  firstItemClassName: 'tui-first-child',
  lastItemClassName: 'tui-last-child',
  template: {
    page: '<a href="#" class="tui-page-btn custom">{{page}}</a>',
    currentPage: '<strong class="tui-page-btn custom tui-is-selected custom">{{page}}</strong>',
    moveButton:
      '<a href="#" class="tui-page-btn custom tui-{{type}}">' +
        '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</a>',
    disabledMoveButton:
      '<span class="tui-page-btn custom tui-is-disabled tui-{{type}}">' +
        '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</span>'
      ,
    moreButton:
      '<a href="#" class="tui-page-btn custom tui-{{type}}-is-ellip">' +
        '<span class="tui-ico-ellip">...</span>' +
      '</a>'
  }
};
const pagination = new Pagination(containerPagination, options);

displayLoader();
filmer();
disableLoader();

async function filmer() {
  try {
    const films = await trending.fetchFilms();
    const genres = await trending.fetchGenres();
    const total_results = await films.total_results;
    pagination.setTotalItems(total_results);
    pagination.reset();
    containerPagination.classList.remove('hide');
    trending.genres = genres;
    filmGallery.innerHTML = markUpGallery(films.results, genres);
  } catch (err) {
    console.log(err);
  }
}

pagination.on('afterMove', async event => {
  const currentPage = event.page;
  trending.page = currentPage;
  //на усмотрения Вови
  window.scrollTo({
    top: 230,
  });
  try {
    displayLoader();
    const films = await trending.fetchFilms();
    const genres = await trending.fetchGenres();
    trending.genres = genres;
    filmGallery.innerHTML = markUpGallery(films.results, genres);
    disableLoader();
    // filmGallery.insertAdjacentHTML('beforeend', markUpGallery(films.results, genres));
  } catch (err) {
    console.log(err);
  }
});

function markUpGallery(filmsArr, genres) {
  return filmsArr
    .map(({ id, title = 'Unknown', release_date, poster_path, genre_ids }) => {
      let imgPath = '';
      if (poster_path) {
        imgPath = `https://image.tmdb.org/t/p/w500${poster_path}`;
      } else {
        imgPath = defaultPicture;
      }

      let releaseYear = 0;
      if (release_date) {
        const releaseDate = new Date(`${release_date}`);
        releaseYear = releaseDate.getFullYear();
      } else {
        releaseYear = 'No information';
      }
      let genresList = '';
      if (genre_ids.length) {
        genresList = genres
        .filter(genre => genre_ids.includes(genre.id))
          .map(arr => arr.name);
        genresList = Object.values(genresList);
         if (genresList.length > 2) {
          genresList =
          genresList.slice(0, 2).join(', ') + ', Other';
        } else if (genresList.length > 0 && genresList.length <= 2) {
           genresList = genresList.join(', ');
        } 
      } else {
        genresList = 'No information';
      }

      return `<li class = "film-gallery__item" data-id="${id}">
           <img class="film-gallery__image" src="${imgPath}" alt="${title}" loading="lazy"/>
           <div class="film-gallery__info">
            <p class="film-gallery__title">${title.toUpperCase()}</p>
            <p class="film-gallery__text">${genresList} | ${releaseYear}</p>
          </div>
          </li>`;
    })
    .join('');
}

// const filmGallery = document.querySelector('.film-gallery');
// const guard = document.querySelector('.guard-js');
//old
// let ObserverOptions = {
//   root: null,
//   rootMargin: '500px',
//   threshold: 1.0,
// };

// export let observer = new IntersectionObserver(
//   observerFunction,
//   ObserverOptions
// );

// let page = trending.page;

// function observerFunction(entries, observer) {
//   entries.forEach(entry => {
//     if (entry.isIntersecting) {
//       trending.incrementPage();
//       displayLoader();
//       filmer().then(function () {
//         document.querySelector('.loader').remove()
//       });
//       page += 1;
//       console.log(page);
//     }
//   });
// }

// export async function filmer() {
//   try {
//     const films = await trending.fetchFilms();
//     const genres = await trending.fetchGenres();
//     trending.genres = genres;
//     console.log('into filmer -trending.genres', trending.genres);
//     console.log('into filmer -genres', genres);
//     // filmGallery.innerHTML = markUpGallery(films,genres)
//     filmGallery.insertAdjacentHTML('beforeend', markUpGallery(films, genres));
//     observer.observe(guard);
//     // btnRef.style.display = 'block';
//   } catch (err) {
//     console.log(err);
//   }
// }

//єто нужно

//
