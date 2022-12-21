import { BASE_URL } from './apiFilms/baseUrl';
import { API_KEY } from './apiFilms/apiKey';
import { onPlayButtonClick } from './fetchTrailer';
import defaultPicture from '../images/defaultPicture.png'

// ! ДГ - імпортував функцію
import {
  changeWatchedQueueList,
  textModalButton,
} from './modal-button-localstorage';
import getRefs from './refs';
const { filmGallery, modalWindow, backdrop, closeButton } = getRefs();

filmGallery.addEventListener('click', onModalWindowOpen);
closeButton.addEventListener('click', onModalWindowClose);
backdrop.addEventListener('click', onBackdropClick);

async function fetchMovieDetails(movieId) {
  const response = await fetch(
    `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`
  );
  if (!response.ok) {
    throw new Error(response.status);
  }
  return await response.json();
}

export function onModalWindowOpen(e) {
  if (!e.target.closest('li')) {
    return;
  } else if (e.target.closest('li')) {
    const movieId = e.target.closest('li').dataset.id;
    const information = document.querySelector('.information');
    if (information) {
      information.remove();
    }

    fetchMovieDetails(movieId)
      .then(movie => {
        renderMovieModal(movie);
        const playButton = document.querySelector('.circle');
        playButton.addEventListener('click', onPlayButtonClick);
      })
      .catch(error => console.log(error));
    document.body.style.overflow = 'hidden';
    backdrop.classList.remove('is-hidden');
    document.addEventListener('keydown', onEscClose);
  }
}

function renderMovieModal({
  genres,
  original_title = 'Unknown',
  overview,
  popularity,
  poster_path,
  title = 'Unknown',
  vote_average = 0,
  vote_count = 0,
  id, //! ДГ - додав ключ
}) {
  let genresList = '';
  if (genres.length) {
    genresList = genres.map(genre => genre.name).join(', ');
  } else {
    genresList = 'No information';
  }
  let imgPath = '';
  if (poster_path) {
    imgPath = `https://image.tmdb.org/t/p/w500${poster_path}`;
  } else {
    imgPath = defaultPicture;
  }

  let descr = '';
  if (overview) {
    descr = overview;
  } else {
    descr = 'No description';
  }
  const markup = `<div class="information" data-id="${id}"><div class="trailer">
  <img src="${imgPath}" alt="Movie poster"/>
  <div class="overlay">
    <div class="circle"><svg width="60" height="60" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 0c-8.837 0-16 7.163-16 16s7.163 16 16 16 16-7.163 16-16-7.163-16-16-16zM16 29c-7.18 0-13-5.82-13-13s5.82-13 13-13 13 5.82 13 13-5.82 13-13 13zM12 9l12 7-12 7z"></path>
        </svg></div>
    </div>
  </div>
    <div class="movie-details">
      <h3 class="movie-heading">${title}</h3>
      <ul class="movie-list-info">
        <li class="movie-list-info__item">
          <p class="movie-testimonial">Vote / Votes</p>
          <p class="movie-mark">
            <span class="rating">${vote_average.toFixed(1)}</span>
            <span class="delimeter">/</span
            ><span class="quantity">${vote_count}</span>
          </p>
        </li>
        <li class="movie-list-info__item">
          <p class="movie-testimonial">Popularity</p>
          <p class="movie-mark">${popularity.toFixed(1)}</p>
        </li>
        <li class="movie-list-info__item">
          <p class="movie-testimonial">Original Title</p>
          <p class="movie-mark movie-mark--original-title">${original_title}</p>
        </li>
        <li class="movie-list-info__item">
          <p class="movie-testimonial">Genre</p>
          <p class="movie-mark">${genresList}</p>
        </li>
      </ul>
      <p class="about">About</p>
      <p class="about-descr">${descr}</p>
      <div class="button-wrapper">
      <button class="button btn-add-to-watched modal__active-btn" type="button">Add to watched</button>
      <button class="button btn-add-to-queue" type="button">Add to queue</button>
    </div>
  </div>
</div>`; //! ДГ - на кнопки додав класи

  modalWindow.firstElementChild.insertAdjacentHTML('afterend', markup);

  //! ДГ - додав виклик функції
  changeWatchedQueueList(id);
  textModalButton(id);
}

function onModalWindowClose() {
  backdrop.classList.add('is-hidden');
  document.body.style.overflow = 'visible';
}

function onBackdropClick(e) {
  if (e.currentTarget === e.target) {
    onModalWindowClose();
  }
}

export function onEscClose(e) {
  if (e.code === 'Escape') {
    document.removeEventListener('keydown', onEscClose);
    onModalWindowClose();
  }
}
