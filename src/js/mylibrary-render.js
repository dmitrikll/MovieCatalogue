import getRefs from './refs';
const { myLibraryList } = getRefs();
import defaultPicture from '../images/defaultPicture.png'

export function renderMyLibrary({
  genres,
  original_title,
  overview,
  popularity,
  poster_path,
  title,
  release_date,
  vote_average,
  vote_count,
  id,
}) {
  let releaseYear = 0;
      if (release_date) {
        const releaseDate = new Date(`${release_date}`);
        releaseYear = releaseDate.getFullYear();
      } else {
        releaseYear = 'No information';
      }
   let genresList = '';
   if (genres.length) {
    genresList = genres.map(genre => genre.name);
    if (genresList.length > 2) {
          genresList =
          genresList.slice(0, 2).join(', ') + ', Other';
        } else if (genresList.length > 0 && genresList.length <= 2) {
          genresList = genresList.join(', ');
        } 
  } else {
    genresList = 'No information';
  }
  let imgPath = '';
  if (poster_path) {
    imgPath = `https://image.tmdb.org/t/p/w500${poster_path}`;
  } else {
    imgPath = defaultPicture;
  }
  const markup = `
    <li class="film-gallery__item" data-id="${id}">
    <img class="film-gallery__image" src="${imgPath}" alt="Movie poster" loading="lazy">
    <div class="film-gallery__info">
        <p class="film-gallery__title">${original_title}</p>
        <p class="film-gallery__text"><span class="genre">${genresList} |</span>
              <span>${releaseYear}</span><span class="vote-average">${vote_average.toFixed(1)}</span></p>
    </div>
    </li>`;

  myLibraryList.insertAdjacentHTML('afterbegin', markup);
}
