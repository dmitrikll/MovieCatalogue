import getRefs from './refs';
const { openModalBtn, closeModalBtn, modal, body } = getRefs();

openModalBtn.addEventListener('click', toggleModal);
closeModalBtn.addEventListener('click', toggleModal);
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && body.classList.contains('no-scroll')) {
    modal.classList.toggle('is-hidden');
    body.classList.toggle('no-scroll');
  }
});

modal.addEventListener('click', onClickClose);
function onClickClose(event) {
  if (event.target.className === 'backdrop-team') {
    modal.classList.toggle('is-hidden');
    body.classList.toggle('no-scroll');
  }
}

function toggleModal() {
  modal.classList.toggle('is-hidden');
  body.classList.toggle('no-scroll');
}
