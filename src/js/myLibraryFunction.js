import getRefs from './refs';
import { getFullListCount } from './mylibrary-buttons-function';

import {
  inWatchedQueueLocalStorage,
  inWatchedLocalStorage,
  inQueueLocalStorage,
} from './mylibrary-buttons-function';

getRefs().watchedBtn.addEventListener('click', onWatchedBtn);
getRefs().queueBtn.addEventListener('click', onQueueBtn);

inWatchedQueueLocalStorage();

if (getFullListCount() == 0) {
  console.log('НЕТУ ФИЛЬМОВ');
}

function onWatchedBtn() {
  getRefs().myLibraryList.innerHTML = '';
  getRefs().watchedBtn.disabled = true;
  getRefs().queueBtn.disabled = false;
  inWatchedLocalStorage();
}

function onQueueBtn() {
  getRefs().myLibraryList.innerHTML = '';
  getRefs().queueBtn.disabled = true;
  getRefs().watchedBtn.disabled = false;
  inQueueLocalStorage();
}
