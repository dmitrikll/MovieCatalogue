const refs = {
  openModalBtn: document.querySelector('.modal-open'),
  closeModalBtn: document.querySelector('.modal__close'),
  modal: document.querySelector('.backdrop-team'),
  body: document.querySelector('body'),

  btnRecommendedFilms: document.querySelector('.modal__btn__recommended-films'),
  sectionWorker: document.querySelector('.worker'),
};

refs.btnRecommendedFilms.addEventListener('click', toggleSection);

function toggleSection() {
  refs.sectionWorker.classList.toggle('visually-hidden');
}

refs.openModalBtn.addEventListener('click', toggleModal);
refs.closeModalBtn.addEventListener('click', toggleModal);
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && refs.body.classList.contains('no-scroll')) {
    refs.modal.classList.toggle('is-hidden');
    refs.body.classList.toggle('no-scroll');
  }
});

refs.modal.addEventListener('click', onClickClose);
function onClickClose(event) {
  if (event.target.className === 'backdrop-team') {
    refs.modal.classList.toggle('is-hidden');
    refs.body.classList.toggle('no-scroll');
  }
}

function toggleModal() {
  refs.modal.classList.toggle('is-hidden');
  refs.body.classList.toggle('no-scroll');
}
