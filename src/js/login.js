const loginOpenBtn = document.querySelector('.login__open-button');
const loginBackdrop = document.querySelector('.login__backdrop');
const loginCloseBtn = document.querySelector('.login__close-button');
const loginSubmitBtn = document.querySelector('.login__submit-button');
const loginForm = document.querySelector('.login__form');

loginOpenBtn.addEventListener('click', () => {
  loginBackdrop.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
});

loginCloseBtn.addEventListener('click', () => {
  loginBackdrop.classList.add('hidden');
  document.body.style.overflow = 'visible';
});

loginSubmitBtn.addEventListener('click', e => {
  e.preventDefault();

  console.log(document.querySelector('input[name="mode"]:checked').value);
  loginForm.reset();
});

loginBackdrop.addEventListener('click', e => {
  if (e.target === loginBackdrop) {
    loginBackdrop.classList.add('hidden');
    document.body.style.overflow = 'visible';
  }
});
