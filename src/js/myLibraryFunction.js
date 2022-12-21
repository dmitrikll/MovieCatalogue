import getRefs from './refs';
const { filmGallery } = getRefs();
import { getFullListCount } from './mylibrary-buttons-function';
import { getWatchedListCount } from './mylibrary-buttons-function';
import { getQueueListCount } from './mylibrary-buttons-function';
import myLIbraryImg from '../images/myLibrary-img.jpg';
import watchedDefault from '../images/watchedDefault.jpg';
import queueDefault from '../images/queueDefault.jpg';
import { onModalWindowOpen } from './modal';

import {
  inWatchedQueueLocalStorage,
  inWatchedLocalStorage,
  inQueueLocalStorage,
} from './mylibrary-buttons-function';

getRefs().watchedBtn.addEventListener('click', onWatchedBtn);
getRefs().queueBtn.addEventListener('click', onQueueBtn);

inWatchedQueueLocalStorage();
const markup = `<li class="mylibrary-img" role="presentation"><img src="${myLIbraryImg}"></img></li>`;

if (getFullListCount() == 0) {
  getRefs().myLibraryList.innerHTML = markup;
  filmGallery.removeEventListener('click', onModalWindowOpen);
}

function onWatchedBtn() {
  getRefs().myLibraryList.innerHTML = '';
  getRefs().watchedBtn.classList.add('btn-active');
  getRefs().queueBtn.classList.remove('btn-active');
  getRefs().watchedBtn.disabled = true;
  getRefs().queueBtn.disabled = false;
  inWatchedLocalStorage();
  const markup = `<li class="mylibrary-img" role="presentation"><img src="${watchedDefault}"></img></li>`;
  if (getWatchedListCount() == 0) {
    getRefs().myLibraryList.innerHTML = markup;  
  filmGallery.removeEventListener('click', onModalWindowOpen);  
}
}

function onQueueBtn() {
  getRefs().myLibraryList.innerHTML = '';
  getRefs().queueBtn.classList.add('btn-active');
  getRefs().watchedBtn.classList.remove('btn-active');
  getRefs().queueBtn.disabled = true;
  getRefs().watchedBtn.disabled = false;
  inQueueLocalStorage();
  const markup = `<li class="mylibrary-img" role="presentation"><img src="${queueDefault}"></img></li>`;
  if (getQueueListCount() == 0) {
    getRefs().myLibraryList.innerHTML = markup; 
  filmGallery.removeEventListener('click', onModalWindowOpen);  
}
}
