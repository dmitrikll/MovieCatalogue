function getRefs() {
  return {
    filmGallery: document.querySelector('.film-gallery'),
    guard: document.querySelector('.guard-js'),
    searchForm: document.querySelector('.js-search__form'),
    watchedBtn: document.querySelector('.header_btn-watched'),
    queueBtn: document.querySelector('.header_btn-queue'),
    backdrop: document.querySelector('.backdrop'),
    closeButton: document.querySelector('.close-button'),
    containerPagination: document.getElementById('pagination'),
  };
}

export default getRefs;

// увага!   іпортуемо таким чином!
//  але дивіться на якому рівнв ваша папка
// приклад:
// import getRefs from './refs';
// const { filmGallery, guard } = getRefs();
