"use strict";
const app = document.querySelector('#app');
const button = document.querySelector('.btn')

function buttonHendler() {
  button.remove();

  const firstButton = document.createElement('button');
  firstButton.classList.add('btn');
  firstButton.textContent = 'button_2';
  app.appendChild(firstButton);

  const secondButton = document.createElement('button');
  secondButton.classList.add('btn');
  secondButton.textContent = 'button_3'
  app.appendChild(secondButton)
}

button.addEventListener('click', buttonHendler);