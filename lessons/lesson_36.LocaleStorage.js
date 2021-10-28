"use strict";

/////////////////////// LocalStorage, sessionStorage //////////////////////

// Объект localStorage используеться для локального хранения данных.

// Объекты веб-хранилища localStorage и sessionStorage позволяют хранить пары ключ/значение в браузере.
// Что в них важно – данные, которые в них записаны, сохраняются после обновления страницы 
// (в случае sessionStorage) и даже после перезапуска браузера (при использовании localStorage).

// Объекты хранилища localStorage и sessionStorage предоставляют одинаковые методы и свойства:
// setItem(key, value) – сохранить пару ключ/значение.
// getItem(key) – получить данные по ключу key.
// removeItem(key) – удалить данные с ключом key.
// clear() – удалить всё.
// key(index) – получить ключ на заданной позиции.
// length – количество элементов в хранилище

// Основные особенности localStorage:
// Этот объект один на все вкладки и окна в рамках источника (один и тот же домен/протокол/порт).
// Данные не имеют срока давности, по которому истекают и удаляются. 
// Сохраняются после перезапуска браузера и даже ОС.

const form = document.querySelector('.form-signin');
const input = document.querySelector('.form-control');
const checkbox = document.querySelector('#checkbox');
const changeColor = document.querySelector('#color');

if (localStorage.getItem('isChecked')) {
  checkbox.checked = true;
}

checkbox.addEventListener('change', () => {
  if (localStorage.getItem('isChecked')) {
    localStorage.removeItem('isChecked');
    checkbox.checked = false;
  } else {
    localStorage.setItem('isChecked', true)
    checkbox.checked = true;
  }
});

if (localStorage.getItem('bg') === 'changed') {
  form.style.backgroundColor = 'red';
}

changeColor.addEventListener('click', () => {
  if (localStorage.getItem('bg') === 'changed') {
    localStorage.removeItem('bg');
    form.style.backgroundColor = '#fff';
  } else {
    localStorage.setItem('bg', 'changed');
    form.style.backgroundColor = 'red';
  }
});

const customer = {
  name: 'Kate',
  age: 38,
  isAdmin: false,
};

// Мы можем использовать JSON для хранения объектов:

const serializedUser = JSON.stringify(customer);
localStorage.setItem('Kate', serializedUser);
console.log(JSON.parse(localStorage.getItem('Kate'))); // {name: 'Kate', age: 38, isAdmin: false}


// Перебор ключей

// Oбъекты веб-хранилища нельзя перебрать в цикле, они не итерируемы.
// Но можно пройти по ним, как по обычным массивам:

for (let i = 0; i < localStorage.length; i++) {
  let key = localStorage.key(i);
  console.log(`${key} : ${localStorage.getItem(key)}`);
};











