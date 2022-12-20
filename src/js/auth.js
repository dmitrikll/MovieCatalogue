import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

import { Notify } from 'notiflix/build/notiflix-notify-aio';
Notify.init({
  position: 'center-top',
});

import getRefs from './refs';
const { loginBackdrop, loginForm, loginEmail, loginPassword, currentUser } =
  getRefs();

const firebaseConfig = {
  apiKey: 'AIzaSyAqu3lJCaapNyYKDGfS1HPnGF0Y5sU0_JE',
  authDomain: 'nezlamniprj.firebaseapp.com',
  projectId: 'nezlamniprj',
  storageBucket: 'nezlamniprj.appspot.com',
  messagingSenderId: '794936873149',
  appId: '1:794936873149:web:aae6f8e49a52b6be1667d4',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

if (localStorage.getItem('currentUser')) {
  currentUser.textContent = localStorage.getItem('currentUser');
}

export async function logIn() {
  try {
    const credentials = await signInWithEmailAndPassword(
      auth,
      loginEmail.value,
      loginPassword.value
    );

    localStorage.setItem('currentUser', credentials.user.email);
    currentUser.textContent = credentials.user.email;
    Notify.success(`Logged in as ${credentials.user.email}`);
    loginBackdrop.classList.add('hidden');
    document.body.style.overflow = 'visible';
    loginForm.reset();
  } catch (error) {
    switch (error.code) {
      case 'auth/user-not-found':
        Notify.failure('No such user, try to sign up instead');
        break;
      case 'auth/invalid-email':
        Notify.failure('Incorrect E-mail');
        break;
      case 'auth/wrong-password':
        Notify.failure('Wrong password, please try again');
        break;
    }
  }
}

export async function signUp() {
  try {
    const credentials = await createUserWithEmailAndPassword(
      auth,
      loginEmail.value,
      loginPassword.value
    );

    Notify.success('Your account has been successfully created');
    logIn();
  } catch (error) {
    switch (error.code) {
      case 'auth/email-already-in-use':
        Notify.failure('E-Mail already in use');
        break;
      case 'auth/invalid-email':
        Notify.failure('Incorrect E-mail');
        break;
      case 'auth/weak-password':
        Notify.failure('Weak password');
        break;
    }
  }
}
