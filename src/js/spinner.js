import LoadMoreBtn from './load-more-btn';

const container = document.querySelector('body');

// window.addEventListener('load', function() {
// displayLoader();
// });

export function displayLoader() {
  // container.classList.add('.loader-background');
  // container.insertAdjacentHTML('afterbegin', '<div class="loader"></div>');
  document.querySelector('.loader').classList.remove('disable');
}

export function disableLoader() {
  setTimeout(() => {
    document.querySelector('.loader').classList.add('disable');
  }, 400);
  // container.classList.add('.loader-background');
}

// const loadMoreBtn = new LoadMoreBtn({
//     selector: '[data-action="load-more"]',
//     hidden: true,
// });
