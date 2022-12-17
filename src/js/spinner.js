import LoadMoreBtn from './load-more-btn'

const container = document.querySelector('body')

// window.addEventListener('load', function() {
//     displayLoader();
// });

export function displayLoader() {
    // container.classList.add('.loader-background');
    container.insertAdjacentHTML('afterbegin', '<div class="loader"></div>');
}





// const loadMoreBtn = new LoadMoreBtn({
//     selector: '[data-action="load-more"]',
//     hidden: true,
// });