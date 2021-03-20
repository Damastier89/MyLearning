const btn = document.querySelector('.btn_color ');

function changeColor() {
    const block = document.querySelectorAll('.color');
    block.forEach(item => {
        item.classList.toggle('red');
        /* item.classList.add('red'); */
    });
}

btn.addEventListener('click', changeColor);

const box = document.getElementById('box');

const buttons = document.getElementsByTagName('button');
console.log(buttons[0]);

const circles = document.getElementsByClassName('circle');
console.log(circles);

const hearts = document.querySelectorAll('.heart');
console.log(hearts);

/* hearts.forEach(item => {
    item.classList.add('black');
});
 */
const heart = document.querySelector('.heart');
console.log(heart);
heart.classList.add('black');