"use strict";
const changeBtn = document.querySelector('.change-color'); // Получаем псевдомассив
const btns = document.querySelectorAll('.btn'); // Получаем псевдомассив
const overlay = document.querySelector('.overlay');
const link = document.querySelector('.link');

// Чтобы повесить обработчик события на несколько элементов, 
// его сначало нужно перебрать и только потом повесить на каждый элемент обработчик
btns.forEach( btn => btn.addEventListener("click", () => {
	console.log(`click`);
}));

function changeColorBtn() {
	btns.forEach( btn => { 
		btn.classList.toggle("color")
	} );
}

// {once: true} опции для обработчика
changeBtn.addEventListener("click", changeColorBtn, {once: true});

// event - объект события
const changeColorElement = (event) => {
	console.log(event.target);
	console.log(event.type);
	// let count = 0;
	// count++;
	// if (count == 1) {
	// 	changeBtn.removeEventListener("click", changeColorElement);
	// }
	// event.target.style.backgroundColor = 'red';
}

changeBtn.addEventListener("click", changeColorElement);
// всплытие событий срабатывает сначало на вложенных элементах, 
// а потом поднимаеться по иерархии вверх
overlay.addEventListener("click", changeColorElement);

link.addEventListener('click', (event) => {
	event.preventDefault(); // Отменить стандартное поведение элемента
	console.log(event.target);
})