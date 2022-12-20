import getRefs from './refs';
const { loader } = getRefs();

export function displayLoader() {
  if (loader) loader.classList.remove('disable');
}

export function disableLoader() {
  if (loader) loader.classList.add('disable');
}
