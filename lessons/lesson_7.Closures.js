"use strict"
/////////////////// Замыкание /////////////////
// JavaScript – язык с сильным функционально-ориентированным уклоном. 
// Он даёт нам много свободы. Функция может быть динамически создана, 
// скопирована в другую переменную или передана как аргумент другой функции и позже вызвана из совершенно другого места.
// Замыкание – это функция, которая запоминает свои внешние переменные и может получить к ним доступ.
// То есть, они автоматически запоминают, где были созданы, с помощью скрытого свойства [[Environment]] и все они могут получить доступ к внешним переменным.

let userName1 = "Kate"; // глобальная переменная

function sayHi() {
  console.log(`Hi ${userName1}`);
}

sayHi(); // "Kate"

userName1 = "Sergei"; // Переприсваиваем переменную
// Функция получает текущее значение внешних переменных, то есть, их последнее значение
sayHi(); // "Sergei"


function makeWorker() {
  let userName2 = "Max"; // локальная переменная

  // Данная функция замкнута на области видемости финкции в которой была вызвана
  return function() {
    console.log(`Hello ${userName2}`); 
  }
}

let userName2 = "Maximus"; // глобальная переменная

let work = makeWorker();

work();

// В JavaScript у каждой выполняемой функции, 
// блока кода и скрипта есть связанный с ними внутренний (скрытый) объект, 
// называемый лексическим окружением LexicalEnvironment.

// Объект лексического окружения состоит из двух частей:

// Environment Record – объект, в котором как свойства хранятся все локальные переменные 
// (а также некоторая другая информация, такая как значение this).

// Ссылка на внешнее лексическое окружение – то есть то, которое соответствует коду снаружи 
// (снаружи от текущих фигурных скобок).


// Function Declaration

// В отличие от переменных, объявленных с помощью let, они полностью инициализируются не тогда, 
// когда выполнение доходит до них, а раньше, когда создаётся лексическое окружение.
// Для верхнеуровневых функций это означает момент, когда скрипт начинает выполнение.
// Вот почему мы можем вызвать функцию, объявленную через Function Declaration, до того, как она определена.

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// Когда код хочет получить доступ к переменной – сначала происходит поиск во внутреннем лексическом окружении, 
// затем во внешнем, затем в следующем и так далее, до глобального.

// Один вызов – одно лексическое окружение
// Новое лексическое окружение функции создаётся каждый раз, когда функция выполняется.


// Вложенные функции
function sayHelloAndBye(firstName, surName) {
  
  function getFullName() {
    return firstName + " " + surName;
  }
  console.log(`Hello ${getFullName()}`);
  console.log(`Bye ${getFullName()}`);
}

sayHelloAndBye("Kate", "Lantseva")
sayHelloAndBye("Sergei", "Lantsev")

// функция-конструктор возвращает новый объект
function User(name) {
  // методом объекта становится вложенная функция
  this.sayHello = function() {
    console.log(`Hello ${name}`);
  }

}

const userKate = new User("Kate");
userKate.sayHello(); // Hello Kate

// Cоздаём и возвращаем функцию «счётчик»:
function makeCounter() {
  let counter = 0;

  return function() {
    return counter++; // есть доступ к внешней переменной "count"
  }
}

let counter1 = makeCounter();
counter1(); // 0
counter1(); // 1
counter1(); // 2
let counter2 = makeCounter();
counter2(); // 0
counter2(); // 1
counter2(); // 2


// Блоки кода и циклы, IIFE
// Лексическое окружение существует для любых блоков кода {...}.
// Лексическое окружение создаётся при выполнении блока кода и содержит локальные переменные для этого блока.

if (true) {
  let name = "Kate"; // еременная name существует только в блоке if
}

// Когда выполнение попадает в блок if, для этого блока создаётся новое лексическое окружение.

for (let i = 0; i <= 5; i++) {
  // У каждой итерации цикла своё собственное лексическое окружение
  console.log(i); // 0, 1, 2, 3, 4, 5
}
// console.log(i); // ReferenceError: i is not defined

// Можно использовать «простые» блоки кода {...}, 
// чтобы изолировать переменные в «локальной области видимости».

{
  let message = "Hello world";
  console.log(message); // Hello world
}
// console.log(message); // ReferenceError: message is not defined


// «immediately-invoked function expressions» (аббревиатура IIFE), 
// что означает функцию, запускаемую сразу после объявления(самовызывающаяся функция).

// Здесь создаётся и немедленно вызывается Function Expression. 
// Так что код выполняется сразу же и у него есть свои локальные переменные.
(function() {
  let newMassage = "Hello World";
  console.log(newMassage); // Hello world
})();

// Замыкание — это коллекция всех переменных из области видимости во время создания функции.
function getUrl(url) {
	let domen = '.com';
	return function () {
			return `https://${url}${domen}`;
	};
}
let google = getUrl('google');
let faceBook = getUrl('facebook');
console.log(google());
console.log(faceBook());

////////////////////////////////////////////////
function Stepper() {
  let counter = 0;
  this.up = function() {
    return ++counter;
  }
  this.down = function() {
    return --counter
  }
}

let stepper = new Stepper();
console.log(stepper.up()); // 1
console.log(stepper.up()); // 2
console.log(stepper.up()); // 3
console.log(stepper.down()); // 2

///////
let phrase = "Hello";

if (true) {
  let user = "Jonh";

  // Функция живет только в нутри блока этого кода
  function sayHelloUser() {
    console.log(`${phrase} ${user}`);
  }
}

///////
function sumNumbers(numOne) {

  return function(numTwo) {
    return numTwo + numOne;  // берёт "numOne" из внешнего лексического окружения
  }
}
sumNumbers(2)(2); // 4
sumNumbers(10)(12); // 22

///////
let arr = [1, 2, 3, 4, 5, 6, 7,];
// выбирает только значения между a и b (включительно).
function isBetween(a, b) {
  return function(x) {
    return x >= a && x <= b;
  }
}
arr.filter(isBetween(2, 4)); // [2, 3, 4]

// выбирает только элементы, совпадающие с одним из элементов массива
function isArray(arr) {
  return function (n) {
    return arr.includes(n);
  }
}
arr.filter(isArray([1,2,3,10,524])); // [1, 2, 3]

///////
let users = [
  { name: "John", age: 20, surname: "Johnson" },
  { name: "Pete", age: 18, surname: "Peterson" },
  { name: "Ann", age: 19, surname: "Hathaway" }
];

// const resultSortName = users.sort((a, b) => a.name > b.name ? 1 : -1 );
// const resultSortAge = users.sort((a, b) => a.age - b.age);

function byFields(field) {
  return (a, b) => a[field] > b[field] ? 1 : -1;
}

const sortByName = users.sort(byFields("name"));
sortByName.forEach(name => console.log(name));

const sortByAge = users.sort(byFields('age'));
sortByAge.forEach(age => console.log(age));

///////
function makeArmy() {
  let shooters = [];

  for (let item = 0; item < 10; item++) {
    let shooter = function() {
      console.log(item);
    };
    shooters.push(shooter);
  }

  return shooters;
}

let army = makeArmy();

console.log(army[1]()); // 1
console.log(army[2]()); // 2
console.log(army[3]()); // 3
console.log(army[9]()); // 9


