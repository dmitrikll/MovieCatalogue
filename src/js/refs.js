function getRefs() {
  return {
    filmGallery: document.querySelector('.film-gallery'),
    guard: document.querySelector('.guard-js'),
    containerPagination: document.getElementById('pagination'),
  };
}

export default getRefs;

// увага!   іпортуемо таким чином!
//  але дивіться на якому рівнв ваша папка
// приклад:
// import getRefs from './refs';
// const { filmGallery, guard } = getRefs();
