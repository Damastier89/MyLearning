"use strict";

// Упорядоченные коллекции данных. Особый подвид объектов. Копируется по ссылке.
const arr = [1, 2, 22, 3, 15, 4, 28, 5, ];
const arr = ['Kety', {name: 'Sergei'}, false, function(){ console.log(`Hello`) },];
// arr[3](); // Вызов функции из массива

// pop - Удаляет последний элемент из массива и возвращает его.
const colors = ['red', 'green', 'grey', 'blue',];
const color = colors.pop(); // 'blue'

// push - Добавляет элемент в конец массива. Можно добавлять несколько елементов.
colors.push('black', 'yellow'); // ["red", "green", "grey", "black", "yellow"]

// shift - Удаляет из массива первый элемент и возвращает его
const firstColor = colors.shift(); // 'red'

// unshift - Добавляет элемент в начало массива. Можно добавлять несколько елементов.
colors.unshift('orange', 'pink'); // ["orange", "pink", "green", "grey", "black", "yellow"]

for (let i = 0; i < colors.length; i++) {
  console.log(colors[i]);
}

// Цикл for...of для массивов!
for (let value of arr) {
    value += 2;
    console.log(value);
}

// самый простой способ очистить массив – это arr.length = 0;

arr[99] = 15;
console.log(arr.length);
console.log(arr);

arr.forEach(function (item, i, arr) {
    console.log(`${i}: ${item} in array ${arr}`);
});

arr.forEach((item, i, arr) => {
  if (item % 2 == 0) {
    console.log(`Числа делящиеся без остатка на 2 - `, item);
  }
  console.log(`${i} : ${item} in array ${arr}`);
});

// Многомерные массивы
const matrix = [
  [1, 2, 3,],
  [4, 5, 6,],
  [7, 8, 9,],
];

[] + 1; // "1" [] становится пустой строкой.
matrix[1][1]; // 5

let fruits = ['apple', 'orange', 'banana'];
let soppingCard = fruits;
soppingCard.push('cherry') // ссылка на массив

const styles = ['Джаз', 'Блюз',];
styles.push('Рок-н-ролл');
styles[Math.floor((styles.length - 1) / 2)] = "Классика"; // Заменяет значение в середине массива любой длины
const firstStyle = styles.shift();
// console.log(firstStyle);
styles.unshift('Рэп', 'Регги');

const arrThis = ['a', 'b'];
arrThis.push(function() {console.log( this )});

// arrThis[2](); // ["a", "b", ƒ]

function sumInput() {
  let resultArr = [];

  while(true) {
    let value = prompt('Введите число...', '');
    // Прекращаем ввод?
    if (value == '' || value == null || value == !isFinite(value)) break;
    resultArr.push(+value);
  }

  let sumValueInArr = 0;
  for (let number of resultArr) {
    sumValueInArr += number
  }

  return sumValueInArr;
}

// const value = sumInput();
// console.log(value);

function getMaxSubSum(arr) {
  let maxSum = 0;
  let partialSum = 0;

  for (let num of arr) { // для каждого элемента массива
    partialSum += num; // добавляем значение элемента к partialSum
    maxSum = Math.max(maxSum , partialSum) // запоминаем максимум на данный момент
    if (partialSum < 0) {
      partialSum = 0;
    }
  }
  return maxSum;
}
getMaxSubSum([-1, 2, 3, -9]); // 5
getMaxSubSum([100, -9, 2, -3, 5]); // 100
getMaxSubSum([1, 2, 3]); // 6
getMaxSubSum([-1, -2, -3, -24, -25]); // 0

/////// Copy/past/delete

// splice(index[, deleteCount, elem1, ..., elemN])
// splice - Он начинает с позиции index, 
// удаляет deleteCount кол-во элементов и вставляет elem1, ..., elemN на их место. 
// Возвращает массив из удалённых элементов.

const arr1 = ["Я", "изучаю", "JavaScript"]; // ["Я", "JavaScript"]
const newArr1 = arr1.splice(1, 1); // ["изучаю"]

const arr2 = ["Я", "изучаю", "JavaScript", "прямо", "сейчас"]; // ["Давай", "танцева", "прямо", "сейчас"]
const newArr2 = arr2.splice(0, 3, "Давай", "танцева"); // ["Я", "изучаю", "JavaScript"]

const arr3 = ["Я", "изучаю", "JavaScript"]; // ["Я", "изучаю", "интересный", "язык", "JavaScript"]
arr3.splice(2, 0, "интересный", "язык"); // ["Я", "изучаю", "интересный", "язык", "JavaScript"]

const arr4 = [1, 2, 5]; // начиная с индекса -1 (перед последним элементом)
                        // удалить 0 элементов,
                        // затем вставить числа 3 и 4
arr4.splice(-1, 0, 3, 4); // [1, 2, 3, 4, 5]

// slice([start], [end])
// Возвращает новый массив, в который копирует элементы, 
// начиная с индекса start и до end (не включая end). 
// Оба индекса start и end могут быть отрицательными.

// Можно вызвать slice без аргументов: arr.slice() создаёт копию массива arr.

const arr5 = ["Я", "изучаю", "JavaScript", "прямо", "сейчас"]; // ["Я", "изучаю", "JavaScript", "прямо", "сейчас"]
const newArr5 = arr5.slice(1, 3); // ["изучаю", "JavaScript"]

// concat(arg1, arg2...) создаёт новый массив, в который копирует данные из других массивов и дополнительные значения. 
// принимает любое количество аргументов, 
// которые могут быть как массивами, так и простыми значениями.

const arr6 = [1, 2];
const arr7 = arr6.concat([3, 4], 5, 6 , {name: 'name'});

/////// Перебор array

// forEach позволяет запускать функцию для каждого элемента массива.
// forEach((item, index, array) => {......});

const arr8 = ["Я", "изучаю", "JavaScript", "прямо", "сейчас"];
arr8.forEach((item, index, arr) => {
  console.log(` У элемента "${item}", ${index} индекс в массиве "${arr}"`);
});

/////// Поиск в array

// indexOf(item, from) возвращает 0/-1, lastIndexOf(item, from)возвращает 0/-1, includes(item, from) true/false
// имеют одинаковый синтаксис и делают то же самое, 
// что и их строковые аналоги, но работают с элементами вместо символов:

const arr9 = ["Я", "изучаю", "JavaScript", "прямо", "сейчас"];
arr9.includes('прямо'); // true

// find
// Если функция возвращает true, поиск прерывается и возвращается item. 
// Если ничего не найдено, возвращается undefined.
// find ищет один (первый попавшийся) элемент, на котором функция-колбэк вернёт true.

const arr10 = [
  {id: 1, name: 'Kate'},
  {id: 2, name: 'Sergei'},
  {id: 3, name: 'Max'},
  {id: 4, name: 'Elena'},
  {id: 5, name: 'Den'},
];

const user = arr10.find(item => item.id == 1);
user.name; // Kate

// filter возвращает массив из всех подходящих элементов
// возвращается пустой массив в случае, если ничего не найдено

const users = arr10.filter(users => users.id >= 4);
users // [{id: 4, name: "Elena"}, {id: 5, name: "Den"},]
const shortName = arr10.filter(user => user.name.length < 4); // [ { id: 3, name: 'Max' }, { id: 5, name: 'Den' } ]
console.log(shortName);

/////// Преобразование массива
// map - вызывает функцию для каждого элемента массива и возвращает массив результатов выполнения этой функции.

const arr11 = ["Я", "изучаю", "JavaScript", "прямо", "сейчас"]; // ["Я", "изучаю", "JavaScript", "прямо", "сейчас"]
const newArr11 = arr11.map(item => item.toUpperCase()); // ["Я", "ИЗУЧАЮ", "JAVASCRIPT", "ПРЯМО", "СЕЙЧАС"]

// sort сортирует массив на месте, меняя в нём порядок элементов
const arr12 = [1, 5, 47, 3, 37, 2, 7];
arr12.sort((a, b) => {return a - b}); // [1, 2, 3, 5, 7, 37, 47] Для корректной сотрировки

// split(", ") разбивает строку на массив по заданному разделителю
// Вызов split("") с пустым аргументом, разбил бы строку на массив букв:
const names = "Kate, Sergei, Max";
const arr13 = names.split(", "); // ["Kate", "Sergei", "Max"]
// Перебираем массив
for (let name of arr13) {
  console.log(`Massage from ${name}`);
}

// join(", ") - создаёт строку из элементов arr, вставляя ", " между ними
const arr14 = ["Kate", "Sergei", "Max",];
const newArr14 = arr14.join("; "); // Kate; Sergei; Max

// reduce(function(previousValue, item, index, array)
// используются для вычисления какого-нибудь единого значения на основе всего массива.

const arr15 = [1, 2, 3, 4, 5, 6, 7,];
const newArr15 = arr15.reduce((acc, item) => acc + item, 0); // 28

////////////////////////////////////////////////////////////

function camelize(str) {
  let stepOne = str.split("-");
  let stepTwo = stepOne.map((word, index) => { 
    return index == 0 ? word : word[0].toUpperCase() + word.slice(1)
  });
  let result = stepTwo.join("");
  return result;
}
const result = camelize("list-style-imag") // listStyleImag

///////////////
function filterRange(arr, a, b,) {
  let copyArr = arr.filter(item => { return (a <= item && item <= b) });
  return copyArr;
}

const arr16 = [5, 3, 8, 1];
const filtered = filterRange(arr16, 1, 4,); // 3,1 (значения в диапазоне)

///////////////
function filterRangeInPlace(arr, a, b,) {
  for (let i = 0; i < arr.length; i++) {
    let value = arr[i];
    if (value < a || value > b) {
      arr.splice(i , 1);
      i--;
    }
  }
}

let arr17 = [5, 3, 8, 1]; // [3, 1] удалены числа вне диапазона 1..4
filterRangeInPlace(arr17, 1, 4,);

///////////////
const arr18 = [5, 1, 35, 15, -10, 27, 3];
arr18.sort((a, b) => { return a - b }).reverse(); // [35, 27, 15, 5, 3, 1, -10]

///////////////
const arr19 = ["HTML", "JavaScript", "TypeScript", "CSS", "Angular",];
function copySorted(arr) {
  let result = arr.slice().sort();
  return result;
}

const result = copySorted(arr19); // ["Angular", "CSS", "HTML", "JavaScript", "TypeScript"]

//////////////
function Calculator() {
  this.methods = {
    "-": (a, b) => a - b,
    "+": (a, b) => a + b
  };

  this.calculate = function(str) {

    let split = str.split(' '),
      a = +split[0],
      operand = split[1],
      b = +split[2]

    if (!this.methods[operand] || isNaN(a) || isNaN(b)) {
      return NaN;
    }

    return this.methods[operand](a, b);
  }

  this.addMethod = function(name, func) {
    this.methods[name] = func;
  };
}

const calc = new Calculator();
calc.addMethod("*", (a, b) => a * b);

const plus = calc.calculate("2 + 2"); // 4
const multiplication = calc.calculate("3 * 3"); // 9

/////////////
const _sergei = { name: "Sergei", age: 25 };
const _kate = { name: "Kate", age: 30 };
const _maximus = { name: "Maximus", age: 28 };
const _max = { name: "Max", age: 21 };
const _elena = { name: "Elena", age: 33 };

const users1 = [ _sergei, _kate, _maximus, _max, _elena,];

const names = users1.map(obj => obj.name); // ["Sergei", "Kate", "Maximus", "Max", "Elena"]

////////////
const sergei = { name: "Sergei", surname: "Lantsev", id: 1 };
const kate = { name: "Kate", surname: "Lantseva", id: 2 };
const maximus = { name: "Maximus", surname: "Great", id: 3 };

const users2 = [ sergei, kate, maximus ];

const usersMapped = users2.map(user => ({
  fullname: `${user.name} ${user.surname}`,
  id: user.id, 
})); // {fullname: "Sergei Lantsev", id: 1}, {fullname: "Kate Lantseva", id: 2}.....

///////////
const users3 = [ _sergei, _kate, _maximus, _max, _elena,];

function sortByAge(arr) {
  let result = arr.sort((a, b,) => a.age > b.age ? 1 : -1);
  return result;
}

const sortUser = sortByAge(users3); // {name: "Sergei", age: 25}, {name: "Maximus", age: 28}.....

//////////
const users4 = [ _sergei, _kate, _maximus, _max, _elena,];

function getAverangeAge(users) {
  let result = users.reduce((acc, user) => acc + user.age, 0) / users.length;
  return result;
}

const averangeAge = getAverangeAge(users4); // age: 27.4

//////////
const arr20 = ["HTML", "Angular", "JavaScript", "TypeScript", "HTML", "CSS", "Angular",];

function unique(arr) {
  let result = [];

  for (let str of arr) {
    if (!result.includes(str)) {
      result.push(str);
    }
  }
  return result.sort();
}

const uniqueValue = unique(arr20); // ["Angular", "CSS", "HTML", "JavaScript", "TypeScript"]

/////////
// Array.from(obj[, mapFn, thisArg])
// Array.from, принимает итерируемый объект или псевдомассив и делает из него «настоящий» Array.

const noArr = {
  0: "Hello",
  1: "World",
  length: 2,
}

const realArr = Array.from(noArr); // ["Hello", "World"]

const arr21 = [5, 1, 35, 15, 27, 3];
const newArr21 = Array.from(arr21, num => num * num); // [25, 1, 1225, 225, 729, 9]
