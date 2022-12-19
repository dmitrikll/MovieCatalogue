import { getMovieById } from "./get-movie-by-id";
import { getKey } from "./modal-button-localstorage";
import { renderMyLibrary } from "./mylibrary-render";

let watchedIdList = [];
let queueIdList = [];
let fullIdList = [];

export function inWatchedQueueLocalStorage() {
    if (getKey('watched')) {
        watchedIdList = getKey('watched');
    };
    if (getKey('queue')) {
        queueIdList = getKey('queue');
    };

    fullIdList = [...watchedIdList, ...queueIdList];

    for (let id of fullIdList) {
        getMovieById(id).then(movie => renderMyLibrary(movie)).catch(error => console.log(error));
    };
};

export function inWatchedLocalStorage() {
    if (getKey('watched')) {
        watchedIdList = getKey('watched')
    };

    for (let id of watchedIdList) {
        getMovieById(id).then(movie => renderMyLibrary(movie)).catch(error => console.log(error));
    };
};

export function inQueueLocalStorage() {
    if (getKey('queue')) {
        queueIdList = getKey('queue')
    };

    for (let id of queueIdList) {
        getMovieById(id).then(movie => renderMyLibrary(movie)).catch(error => console.log(error));
    };
};