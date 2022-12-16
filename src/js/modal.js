import { BASE_URL } from './apiFilms/baseUrl';
import { API_KEY } from './apiFilms/apiKey';

const movieList = document.querySelector('.film-gallery');
const modalWindow = document.querySelector('.modal');
const backdrop = document.querySelector('.backdrop');
const closeButton = document.querySelector('.close-button');

movieList.addEventListener('click', onModalWindowOpen);
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

function onModalWindowOpen(e) {
  if (e.target.nodeNmae === 'LI') {
    return;
  } else if (e.target.closest('li')) {
    const movieId = e.target.closest('li').dataset.id;
    const information = document.querySelector('.information');
  if (information) {
    information.remove();
    }
    
    fetchMovieDetails(movieId)
    .then(movie => renderMovieModal(movie))
      .catch(error => console.log(error));
    document.body.style.overflow = 'hidden';
  backdrop.classList.remove('is-hidden');
  document.addEventListener('keydown', onEscClose);
  }
}

function renderMovieModal({
  genres,
  original_title,
  overview,
  popularity,
  poster_path,
  title,
  vote_average,
  vote_count,
}) {
    const markup = `<div class="information">
  <img src="https://image.tmdb.org/t/p/w500${poster_path}" alt="Movie poster"/>
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
          <p class="movie-mark">${genres
            .map(genre => genre.name)
            .join(', ')}</p>
        </li>
      </ul>
      <p class="about">About</p>
      <p class="about-descr">${overview}</p>
      <div class="button-wrapper">
      <button class="button" type="button">Add to watched</button>
      <button class="button" type="button">Add to queue</button>
    </div>
  </div>
</div>`;

  modalWindow.firstElementChild.insertAdjacentHTML('afterend', markup);
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

function onEscClose(e) {
  if (e.code === 'Escape') {
    document.removeEventListener('keydown', onEscClose);
    onModalWindowClose();
  }
}

function clearMarkup(container) {
  container.innerHTML = '';
}