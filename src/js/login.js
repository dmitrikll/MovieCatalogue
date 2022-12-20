import { logIn, signUp } from './auth';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

import getRefs from './refs';
const {
  loginOpenBtn,
  loginBackdrop,
  loginCloseBtn,
  loginForm,
  loginEmail,
  loginPassword,
  loginSubmitBtn,
} = getRefs();

loginOpenBtn.addEventListener('click', () => {
  loginForm.reset();
  loginBackdrop.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
});

loginCloseBtn.addEventListener('click', () => {
  loginBackdrop.classList.add('hidden');
  document.body.style.overflow = 'visible';
});

loginBackdrop.addEventListener('click', e => {
  if (e.target === loginBackdrop) {
    loginBackdrop.classList.add('hidden');
    document.body.style.overflow = 'visible';
  }
});

loginSubmitBtn.addEventListener('click', e => {
  e.preventDefault();

  if (/^\s*$/.test(loginEmail.value) || /^\s*$/.test(loginPassword.value)) {
    Notify.warning('Please fill out all fields');
    return;
  }

  const mode = document.querySelector('input[name="mode"]:checked').value;

  if (mode === 'log-in') {
    logIn();
  }

  if (mode === 'sign-up') {
    signUp();
  }
});
