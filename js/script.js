"use strict"
const box = document.getElementById('box');
console.log(box);
const button = document.getElementsByTagName('button');
console.log(button);

const changeBtn = document.querySelector('.change');

function changeColor() {
  const btn = document.querySelectorAll('button');
  btn.forEach( btn => {
      btn.classList.toggle('green'); 
  });
}

changeBtn.addEventListener('click', changeColor);
