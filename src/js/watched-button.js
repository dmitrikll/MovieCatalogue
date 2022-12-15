 import TrendingFilmsApiService from './apiFilms/apiTrending';
const refs = {
    watchedBtn: document.querySelector('.header_btn-watched'),
    queueBtn: document.querySelector('.header_btn-queue'),
};

 const TrendingFilmsApiService = new TrendingApiService;

 onWatchedMarkup();

 refs.watchedBtn.addEventListener('click', onWatchedBtnClick);
 
 function onWatchedBtnClick() {
    // refs.queueBtn.classList.remove('header-active-button');
    refs.watchedBtn.classList.add('header-active-button');
    onWatchedMarkup();
  }
  
function onWatchedMarkup() {
    if (getActiveTab() !== 'watched') {
      return;
    }
}