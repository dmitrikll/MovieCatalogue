const setKey = (key, value) => {
  const movieId = JSON.stringify(value);
  localStorage.setItem(key, movieId);
};

export const getKey = key => {
  let movieId = localStorage.getItem(key);
  return (movieId = JSON.parse(movieId) || undefined);
};

const removeKey = key => {
  localStorage.removeItem(key);
};

export function textModalButton(id) {
  const modalWatchedButton = document.querySelector('.btn-add-to-watched');
  const modalQueueButton = document.querySelector('.btn-add-to-queue');

  if (localStorageCheck(id, 'watched')) {
    modalWatchedButton.textContent = 'Remove from watched';
    modalWatchedButton.classList.add('in-mylibrary');
  } else {
    modalWatchedButton.textContent = 'Add to watched';
    modalWatchedButton.classList.remove('in-mylibrary');
  };

  if (localStorageCheck(id, 'queue')) {
    modalQueueButton.textContent = 'Remove from queue';
    modalQueueButton.classList.add('in-mylibrary');
  } else {
    modalQueueButton.textContent = 'Add to queue';
    modalQueueButton.classList.remove('in-mylibrary');
  };

  function localStorageCheck(id, key) {
    let array = [];
    let localStorageArray = getKey(key);
    if (localStorageArray) {
      array = [...localStorageArray];
    };
    const listSet = new Set(array);
    return listSet.has(id);
  };
};

export function changeWatchedQueueList(id) {
    const modalWatchedButton = document.querySelector('.btn-add-to-watched');
    const modalQueueButton = document.querySelector('.btn-add-to-queue');

    modalWatchedButton.addEventListener('click', addToWatched);
    modalQueueButton.addEventListener('click', addToQueue);

  function addToWatched() {
    const modalWatchedButton = document.querySelector('.btn-add-to-watched');

    if (modalWatchedButton.classList.contains('in-mylibrary')) {
      removeFromWatched(id);
    } else {
      let watchedList = [];
      let userWatchedList = getKey('watched');
      if (userWatchedList) {
        watchedList = [...userWatchedList];
      };

      let queueList = [];
      let userQueueList = getKey('queue');
      if (userQueueList) {
        queueList = [...userQueueList];
      };

      let queueSet = new Set(queueList);
      if (queueSet.has(id)) {
        removeKey('queue');
        let movieIndex = queueList.indexOf(id);
        queueList.splice(movieIndex, 1);
        setKey('queue', queueList);
      };

      const watchedSet = new Set(watchedList);
      if (watchedSet.has(id)) {
        textModalButton(id);
      } else {
        watchedList.push(id);
        setKey('watched', watchedList);
        textModalButton(id);
      };
    };
  };

  function addToQueue() {
    const modalQueueButton = document.querySelector('.btn-add-to-queue');

    if (modalQueueButton.classList.contains('in-mylibrary')) {
      removeFromQueue(id);
    } else {
      let queueList = [];
      let userQueueList = getKey('queue');
      if (userQueueList) {
        queueList = [...userQueueList];
      };

      let watchedList = [];
      let userWatchedList = getKey('watched');
      if (userWatchedList) {
        watchedList = [...userWatchedList];
      };

      let watchedSet = new Set(watchedList);
      if (watchedSet.has(id)) {
        removeKey('watched');
        let movieIndex = watchedList.indexOf(id);
        watchedList.splice(movieIndex, 1);
        setKey('watched', watchedList);
        textModalButton(id);
      };

      const queueSet = new Set(queueList);
      if (queueSet.has(id)) {
        textModalButton(id);
      } else {
        queueList.push(id);
        setKey('queue', queueList);
        textModalButton(id);
      };
    };
  };

  function removeFromWatched(id) {
    let watchedList = [];
    let userWatchedList = getKey('watched');
    
    if (userWatchedList) {
      watchedList = [...userWatchedList];
    };

    removeKey('watched');

    let movieIndex = watchedList.indexOf(id);
    watchedList.splice(movieIndex, 1);

    setKey('watched', watchedList);

    textModalButton();
  };

  function removeFromQueue(id) {
    let queueList = [];
    let userQueueList = getKey('queue');

    if (userQueueList) {
      queueList = [...userQueueList];
    };

    removeKey('queue');

    let movieIndex = queueList.indexOf(id);
    queueList.splice(movieIndex, 1);

    setKey('queue', queueList);
    
    textModalButton();
  };
};