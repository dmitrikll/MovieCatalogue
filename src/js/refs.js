function getRefs() {
  return {
    filmGallery: document.querySelector('.film-gallery'),
    searchInput: document.querySelector('.search_input'),
    guard: document.querySelector('.guard-js'),
    containerPagination: document.getElementById('pagination'),
    watchedBtn: document.querySelector('.header_btn-watched'),
    queueBtn: document.querySelector('.header_btn-queue'),
    myLibraryList: document.querySelector('.mylibrary-film-gallery'),
    placeholder: document.querySelector('.js-search__form'),
    addToWatchedBtn: document.querySelector('.btn-add-to-watched'),
    btnAddToWatch: document.querySelector('.wached'),
    themaSwitchToogle: document.querySelector('.theme-switch__toggle'),
    body: document.querySelector('body'),
    loader: document.querySelector('.loader'),
    modalWindow: document.querySelector('.modal'),
    placeholderQB: document.querySelector('.placeholder'),
    btnAddToQueue: document.querySelector('.queue'),
    backdrop: document.querySelector('.backdrop'),
    closeButton: document.querySelector('.close-button'),
    openModalBtn: document.querySelector('.modal-open'),
    closeModalBtn: document.querySelector('.modal__close'),
    modal: document.querySelector('.backdrop-team'),

    loginOpenBtn: document.querySelector('.login__open-button'),
    loginBackdrop: document.querySelector('.login__backdrop'),
    loginCloseBtn: document.querySelector('.login__close-button'),
    loginForm: document.querySelector('.login__form'),
    loginEmail: document.getElementById('email'),
    loginPassword: document.getElementById('password'),
    loginSubmitBtn: document.querySelector('.login__submit-button'),
    currentUser: document.querySelector('.login__current-user'),
  };
}

export default getRefs;

// увага!   іпортуемо таким чином!
//  але дивіться на якому рівнв ваша папка
// приклад:
// import getRefs from './refs';
// const { filmGallery, guard } = getRefs();
