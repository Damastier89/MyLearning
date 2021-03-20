const btns = document.querySelectorAll('button'),
    btnBlock = document.querySelector('.btn-block');

/* console.log(btns[0].classList.length); */
/* console.log(btns[0].classList.item(0)); */
/* console.log(btns[1].classList.add('red')); */
/* console.log(btns[0].classList.remove('blue'));
console.log(btns[0].classList.toggle('blue')); */

/* if (btns[1].classList.contains('red')) {
    console.log('true');
} */

btns[0].addEventListener('click', () => {
    if (!btns[1].classList.contains('red')) {
        btns[1].classList.add('red');
    } else {
        btns[1].classList.remove('red');
    }
});

/* btns.forEach(button =>
    button.addEventListener('click', () => {
        button.classList.toggle('red');
    })
);
 */
btnBlock.addEventListener('click', (e) => {
    if (e.target && e.target.tagName == 'BUTTON') {
        console.dir(e.target);
        e.target.classList.toggle('red');
    }
});

const btn = document.createElement('button');
btn.classList.add('red', 'new-btn');
btnBlock.append(btn);