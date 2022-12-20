function getRefs() {
  return {
    filmGallery: document.querySelector('.film-gallery'),
    guard: document.querySelector('.guard-js'),
    containerPagination: document.getElementById('pagination'),
    watchedBtn: document.querySelector('.header_btn-watched'),
    queueBtn: document.querySelector('.header_btn-queue'),
    myLibraryList: document.querySelector('.mylibrary-film-gallery'),
  };
}

export default getRefs;

// увага!   іпортуемо таким чином!
//  але дивіться на якому рівнв ваша папка
// приклад:
// import getRefs from './refs';
// const { filmGallery, guard } = getRefs();
