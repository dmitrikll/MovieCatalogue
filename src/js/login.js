import { logIn, signUp } from './auth';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

const loginOpenBtn = document.querySelector('.login__open-button');
const loginBackdrop = document.querySelector('.login__backdrop');
const loginCloseBtn = document.querySelector('.login__close-button');
const loginForm = document.querySelector('.login__form');
const loginEmail = document.getElementById('email');
const loginPassword = document.getElementById('password');
const loginSubmitBtn = document.querySelector('.login__submit-button');

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
