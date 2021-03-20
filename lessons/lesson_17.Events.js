"use strict";
/* btn.onclick = function () {}; */

const btns = document.querySelectorAll('button'),
    overlay = document.querySelector('.overlay');


/* let i = 0; */
const deleteElement = (e) => {
    console.log(e.currentTarget);
    console.log(e.type);

    /*  i++;
     if (i == 3) {
         heart.removeEventListener('click', deleteElement);
     } */
};

btns.forEach(btn => btn.addEventListener('click', deleteElement, {
    once: true
}));

overlay.addEventListener('click', deleteElement);

const link = document.querySelector('.link');

link.addEventListener('click', e => {
    e.preventDefault();
    console.log(e.target);
});