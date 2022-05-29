// Оператор нулевого слияния ??. Проверяет на null или undefined
const box = document.querySelector('.box');

const boxHeight = 100;
const boxWidth = 100;

function changeBox(elem, height, width) {
  elem.style.background = '#000'
  elem.style.height = `${height ?? 300}px`;
  elem.style.width = `${width ?? 300}px`;
}

const boxHeigthNull = null;

changeBox(box, boxHeigthNull, boxWidth);