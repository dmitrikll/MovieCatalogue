import {
  inWatchedQueueLocalStorage,
  inWatchedLocalStorage,
  inQueueLocalStorage,
} from './mylibrary-buttons-function';

//! ДГ - написати логіку:
// 1) якщо inWatchedQueueLocalStorage() = [] - повідомлення та лінк на головну, якщо ні - запускати inWatchedQueueLocalStorage()
// 2) прив'язати inWatchedLocalStorage, inQueueLocalStorage до кнопок
//
// теоретично має працювати

const watchedBtn = document.querySelector('.header_btn-watched');
const queueBtn = document.querySelector('.header_btn-queue');

watchedBtn.addEventListener('click', onWatchedBtn);
queueBtn.addEventListener('click', onQueueBtn);

if (inWatchedQueueLocalStorage.length === 0) {
  console.log('пусто');
} else {
  inWatchedQueueLocalStorage();
}

function onWatchedBtn() {
  inWatchedLocalStorage();
}

function onQueueBtn() {
  inQueueLocalStorage();
}
