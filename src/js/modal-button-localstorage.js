// Запис до LocalStorage
const setKey = (key, value) => {
  const movieId = JSON.stringify(value);
  localStorage.setItem(key, movieId);
};

// Отримання з LocalStorage
const getKey = key => {
  let movieId = localStorage.getItem(key);
  return (movieId = JSON.parse(movieId) || undefined);
};

// Видалення з LocalStorage
const removeKey = key => {
  localStorage.removeItem(key);
};

// зміна тексту на кнопках
export function textModalButton(id) {
  const modalWatchedButton = document.querySelector('.btn-add-to-watched');
  const modalQueueButton = document.querySelector('.btn-add-to-queue');

  // перевірка на наявність у списку
  if (localStorageCheck(id, 'watched')) {
    modalWatchedButton.textContent = 'Remove watched';
    modalWatchedButton.classList.add('in-mylibrary');
  } else {
    modalWatchedButton.textContent = 'Add to watched';
    modalWatchedButton.classList.remove('in-mylibrary');
  };

  if (localStorageCheck(id, 'queue')) {
    modalQueueButton.textContent = 'Remove queue';
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

// зміна переліку фільмів
export function changeWatchedQueueList(id) {
    const modalWatchedButton = document.querySelector('.btn-add-to-watched');
    const modalQueueButton = document.querySelector('.btn-add-to-queue');

    modalWatchedButton.addEventListener('click', addToWatched);
    modalQueueButton.addEventListener('click', addToQueue);

  // відправка id до LocalStorage - watched
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
        let filmIndex = queueList.indexOf(id);
        queueList.splice(filmIndex, 1);
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

  // відправка id до LocalStorage - queue
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
        let filmIndex = watchedList.indexOf(id);
        watchedList.splice(filmIndex, 1);
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

  // видалення id з LocalStorage - watched
  function removeFromWatched(id) {
    let watchedList = [];
    let userWatchedList = getKey('watched');
    
    if (userWatchedList) {
      watchedList = [...userWatchedList];
    };

    removeKey('watched');

    let filmIndex = watchedList.indexOf(id);
    watchedList.splice(filmIndex, 1);

    setKey('watched', watchedList);

    textModalButton();
  };

  // видалення id з LocalStorage - queue
  function removeFromQueue(id) {
    let queueList = [];
    let userQueueList = getKey('queue');

    if (userQueueList) {
      queueList = [...userQueueList];
    };

    removeKey('queue');

    let filmIndex = queueList.indexOf(id);
    queueList.splice(filmIndex, 1);

    setKey('queue', queueList);
    
    textModalButton();
  };
};

export { setKey, getKey, removeKey };
