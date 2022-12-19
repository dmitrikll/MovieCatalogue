const myLibraryList = document.querySelector('.mylibrary-film-gallery');
console.log(myLibraryList);
export function renderMyLibrary({
  genres,
  original_title,
  overview,
  popularity,
  poster_path,
  title,
  vote_average,
  vote_count,
  id,
}) {
  const markup = `
    <li class="film-gallery__item">
    <img class="film-gallery__image" src="https://image.tmdb.org/t/p/w500${poster_path}" alt="Movie poster" loading="lazy">
    <div class="film-gallery__info">
        <p class="film-gallery__title">${original_title}</p>
        <p class="film-gallery__text">${genres
          .map(genre => genre.name)
          .join(', ')}</p>
    </div>
    </li>`;

  myLibraryList.insertAdjacentHTML('afterbegin', markup);
}
