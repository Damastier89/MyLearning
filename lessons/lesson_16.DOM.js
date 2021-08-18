const box = document.getElementById('box');
const buttons = document.getElementsByTagName('button');
const circles = document.getElementsByClassName('circle');
const hearts = document.querySelectorAll('.heart');
const heart = document.querySelector('.heart');
const wrapper = document.querySelectorAll('.wrapper');

// box.style.backgroundColor = '#FFCE44';
// box.style.width = '150px';
buttons[1].style.borderRadius = '100%';
// circles[0].style.backgroundColor = '#FFCE44';
const width = '500px';
box.style.cssText = `background-color: #FFCE44; width: ${width};`;

// hearts.forEach(item => {
//     item.style.background = '#007ACC';
// });

const div = document.createElement('div');
const text = document.createTextNode('Hellooooo');
div.classList.add('black');
div.innerHTML = '<span>Hello World</span>'; // Добавить тег в элемент
// div.textContent = 'w'; // Добавить только текст в элемент

wrapper[1].prepend(div); // Добавить перед родителем
// wrapper[1].append(div); // Добавить после родителем

// hearts[0].before(div);
// hearts[1].after(div);
// circles[1].remove();

// hearts[0].replaceWith(circles[0]); // Для замены элемента другим элементом

console.dir(box);

div.insertAdjacentHTML('afterend', '<h1>Hello</h1>');
/* 'beforebegin': до самого element (до открывающего тега).
'afterbegin': сразу после открывающего тега  element (перед первым потомком).
'beforeend': сразу перед закрывающим тегом element (после последнего потомка).
'afterend': после element (после закрывающего тега). */