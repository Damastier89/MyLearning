'use sctict';

const btnStart = document.querySelector('.start');
const btnEnd = document.querySelector('.end')
const elem = document.querySelector('.box');
let positions = 0;
let animation;

function startAnimation() {
  positions++;
  elem.style.top = positions + 'px';
  elem.style.left = positions + 'px';

  if (positions < 294) {
    animation = requestAnimationFrame(startAnimation);
  } 
}

// Чтобы запускать функции с агрументами внутри, нужно использовать () =>
btnStart.addEventListener('click', () => requestAnimationFrame(startAnimation));

// Для отключения анимации можно использовать переменную(animation) или уникальный ID:
function stopAnimation() {
  // let requestId = requestAnimationFrame(startAnimation); // Не работатет...
  // cancelAnimationFrame(requestId);
  cancelAnimationFrame(animation)
}


btnEnd.addEventListener('click' , stopAnimation)