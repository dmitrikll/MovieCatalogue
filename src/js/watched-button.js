import getRefs from './refs';
const { watchedBtn, queueBtn } = getRefs();

onWatchedMarkup();

watchedBtn.addEventListener('click', onWatchedBtnClick);

function onWatchedBtnClick() {
  watchedBtn.classList.add('header-active-button');
  onWatchedMarkup();
}

function onWatchedMarkup() {
  if (getActiveTab() !== 'watched') {
    return;
  }
}

function getActiveTab() {
  const watchedButton = document.querySelector('.header_btn-watched');

  return watchedButton.classList.contains('header-active-button')
    ? 'watched'
    : 'queue';
}
