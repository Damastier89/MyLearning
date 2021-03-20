const box = document.getElementById('box');
const buttons = document.getElementsByTagName('button');
const circles = document.getElementsByClassName('circle');
const hearts = document.querySelectorAll('.heart');
const heart = document.querySelector('.heart');
const wrapper = document.querySelectorAll('.wrapper');

/* box.style.backgroundColor = '#FFCE44';
box.style.width = '500px'; */

box.style.cssText = 'background-color:#FFCE44; width: 500px;';

buttons[2].style.borderRadius = '100%';
circles[1].style.backgroundColor = '#FFCE44';

hearts.forEach(item => {
    item.style.background = '#007ACC';
});

const div = document.createElement('div');
div.classList.add('black');
div.innerHTML = '<span>Hello World</span>';
/* div.textContent = 'w'; */

/* wrapper[1].append(div); */
wrapper[1].prepend(div);

/* hearts[0].before(div);
circles[2].remove(); */

/* circles[0].replaceWith(hearts[0]); */

console.dir(box);

div.insertAdjacentHTML('beforebegin', '<h1>Hello</h1>');
/* 'beforebegin': до самого element (до открывающего тега).
'afterbegin': сразу после открывающего тега  element (перед первым потомком).
'beforeend': сразу перед закрывающим тегом element (после последнего потомка).
'afterend': после element (после закрывающего тега). */