"use strict";
//////////////// Остаточные параметры ...Rest и оператор расширения ...Spread /////////////////
// ...rest - остальное
// Остаточные параметры могут быть обозначены через три точки ...
// Буквально это значит: «собери оставшиеся параметры и положи их в массив».

function sumAll(...args) {
let sum = 0;

for (let result of args) {
    sum += result;
}

return sum;
}
sumAll(3, 3, 3); // 9

// Мы можем положить первые несколько параметров в переменные, а остальные – собрать в массив.
// Остаточные параметры должны всегда располагаться в конце.

// Переменная "arguments"
// Все аргументы функции находятся в псевдомассиве arguments под своими порядковыми номерами.
// У стрелочных функций нет собственного this и своего объекта arguments.

function showName(firstName, surName, ...titles) {
console.log(`${firstName} ${surName}. Регалии : ${titles}`); // Julius Caesar. Регалии : Consul,Emperor
console.log(titles.length); // 2 ["Consul", "Emperor"]
console.log(arguments); // Arguments(4) ["Julius", "Caesar", "Consul", "Emperor", callee: (...), Symbol(Symbol.iterator): ƒ]
console.log(arguments[1]); // "Caesar"
console.log(arguments.length); // 4
// Объект arguments можно перебирать
for (let item of arguments) {
    console.log(item); // "Julius", "Caesar", "Consul", "Emperor"
}
}

const user = showName("Julius", "Caesar", "Consul", "Emperor");


// Оператор расширения(разворота) ...spread
// Когда ...spread используется при вызове функции, он «расширяет»(разворачивает) перебираемый объект arr в список аргументов.

const arrNumbersOne = [1, 2, 3, 4, 5, 6, 7,];
const arrNumbersTwo = [8, 9, 10,];
Math.min(arrNumbersOne); // NaN
Math.max(...arrNumbersOne); // 7 (оператор "раскрывает" массив в список аргументов)
Math.min(...arrNumbersOne); // 1 (оператор "раскрывает" массив в список аргументов)

//Этим же способом мы можем передать несколько итерируемых объектов
Math.max(...arrNumbersOne, ...arrNumbersTwo); // 10

function log(a, b, c) {
	console.log(a);
	console.log(b);
	console.log(c);
}

const num = [1, 4, 6];
log(...num); // 1, 4, 6

// Оператор расширения можно использовать и для слияния массивов
const arrOne = [1, 2, 3, 4, 5,];
const arrTwo = [6, 7, 8, 9, 10];

const arrResult = [...arrOne, 25, ...arrTwo].sort((a, b) => { return a - b}); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 25]

const video = ['youtube', 'rutube', 'vk'],
			blogs = ['wordpress', 'blogger', 'livejournal'],
			internet = [...video, ...blogs, 'facebook'];

console.log(internet); // ['youtube', 'rutube', 'vk', 'wordpress', 'blogger', 'livejournal', 'facebook']	

const array = ['a', 'b'];
const newArrray = [...array];
newArrray.push('c');
console.log(array); // ['a', 'b']
console.log(newArrray); // ['a', 'b', 'c']

const obj = {
	one: 1,
	two: 2
};

const newObj = {
	...obj
};
newObj.three = 3;
console.log(obj); // {one: 1, two: 2}
console.log(newObj); // {one: 1, two: 2, three: 3}

// Оператор ...spread работает с любым перебираемым объектом.
const string = "Hello world";

const stringArr = [...string]; // ["H", "e", "l", "l", "o", " ", "w", "o", "r", "l", "d"]
Array.from(string); // ["H", "e", "l", "l", "o", " ", "w", "o", "r", "l", "d"]

// Между Array.from(obj) и [...obj] есть разница:

// Array.from работает как с псевдомассивами, так и с итерируемыми объектами
// Оператор расширения работает только с итерируемыми объектами

// Если ... располагается в конце списка аргументов функции, то это «остаточные параметры». 
// Он собирает остальные неуказанные аргументы и делает из них массив.

// Если ... встретился в вызове функции или где-либо ещё, то это «оператор расширения». 
// Он извлекает элементы из массива.

// ВАЖНО!!!
// Остаточные параметры используются, чтобы создавать новые функции с неопределённым числом аргументов.

// С помощью оператора расширения можно вставить массив в функцию, которая по умолчанию работает с обычным списком аргументов.

// Вместе эти конструкции помогают легко преобразовывать наборы значений в массивы и обратно.

// К аргументам функции можно обращаться и по-старому — через псевдомассив arguments.