"use strict"
const btns = document.querySelectorAll('button'),
      wrapper = document.querySelector('.btn-block');

// console.log(btns[0].classList.length); // два елемента в псевдомассиве
// console.log(btns[0].classList.item(0)); // blue - получить класс у элемента по его индексу 
// console.log(btns[1].classList.add('red')); // добавить класс
// console.log(btns[0].classList.remove('blue'));
// console.log(btns[0].classList.toggle('blue'));

if (btns[1].classList.contains('red')) { // contains - проверяет наличие класса и возвращает boolen
    console.log('true');
}

btns[0].addEventListener('click', () => {
    // if (!btns[1].classList.contains('red')) {
    //     btns[1].classList.add('red');
    // } else {
    //     btns[1].classList.remove('red');
    // }

		btns[1].classList.toggle('red');
});

// Делегирование событий
wrapper.addEventListener('click', (event) => {
    if (event.target && event.target.tagName == 'BUTTON') { //  event.target.classList.contains()
        console.dir(event.target);
        event.target.classList.toggle('red');
    }
});

// !!! ДИНАМИЧЕСКИ СОЗДАННЫЕ ЭЛЕМЕНТЫ НИ ЧЕГО НЕ ЗНАЮ О РАНЕЕ ДОБАВЛЕНЫХ ПРАВИЛАХ ДЛЯ ПОХОЖИХ ЕЛЕМЕНТОВ!!!

// При данном переборе, 
// динамически созданные элементы не будут знать о ранее добавленныйх изменениях.

// btns.forEach(button =>
//     button.addEventListener('click', () => {
//         button.classList.toggle('red');
//     })
// );

const btn = document.createElement('button');
btn.classList.add('red', 'new-btn');
wrapper.append(btn);