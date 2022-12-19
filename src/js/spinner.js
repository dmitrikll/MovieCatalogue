import LoadMoreBtn from './load-more-btn'

const container = document.querySelector('body')

// window.addEventListener('load', function() {
    // displayLoader();
// });

export function displayLoader() {
    const loader = document.querySelector('.loader');
    if (loader)
        loader.classList.remove('disable');
}

export function disableLoader() {
    // setTimeout(() => {
        const loader = document.querySelector('.loader');
        if (loader)
            loader.classList.add('disable');
    // }, 1400);
    // container.classList.add('.loader-background');
    
}





// const loadMoreBtn = new LoadMoreBtn({
//     selector: '[data-action="load-more"]',
//     hidden: true,
// });