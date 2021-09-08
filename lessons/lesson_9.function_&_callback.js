"use strict";

/// CallBack
function first() {
    // do something
    setTimeout(function () {
        console.log(1);
    }, 500);
}

function second() {
    console.log(2);
}

first();
second();

function learnJS(lang, callback) {
    console.log(`I am learn: ${lang}`);
    callback();
}

function done() {
    console.log('I am finished this class!');
}
learnJS('JavaScript', done);

function _ask(question, yes, no) {
    // if(confirm(question)) {
    //   yes();
    // } else {
    //   no();
    // }
    confirm(question) ? yes() : no();
  }
  
  function showOk () {
    alert(`Yes!!!`);
  };
  
  function showNo() {
    alert(`No!!!`);
  }
  
  _ask(`Вы согласны?`, showOk, showNo)
  
  // Здесь функции объявляются прямо внутри вызова ask(...). 
  // У них нет имён, поэтому они называются анонимными.
  function ask(question, yes, no) {
    if (confirm(question)) yes()
    else no();
  }
  
  ask(
    "Вы согласны?",
    function() { alert("Вы согласились."); },
    function() { alert("Вы отменили выполнение."); }
  );
  
  let age = prompt("Сколько Вам лет?", 18);
  
  let welcome = (age < 18) ? () => alert('Привет') : () => alert("Здравствуйте!");
  
  welcome();

// function expression - тоже самое что и function declaration
let sayHi = function() {
  alert( "Привет" );
};

let func = sayHi;

// function declaration
function sayHi() {
  console.log(`Hello`);
};

let func = sayHi();

console.log(func); // Запишется результат вызова функции
console.log(sayHi()); // Скопируется сома функция
console.log(func()); // Скопируется сома функция


function showPrimes(n) {
  for (let i = 2; i < n; i++) {
    if (!isPrime(i)) continue;

    console.log(i);  // простое число
  }
}

function isPrime(n) {
  for (let i = 2; i < n; i++) {
    if ( n % i == 0) return false;
  }
  return true;
}

showPrimes(8)

function checkAge(age) {
  // if (age > 18) {
  //   return true;
  // } else {
  //   return confirm('Родители разрешили?');
  // }
  return (age > 18) ? true : confirm('Родители разрешили?') 
}

function min(a, b) {
  // if (a < b) {
  //   return a;
  // } else {
  //   return b
  // }

  return (a < b) ? a : b;
}

console.log(min(2, 3)); 

function pow(x , n) {
  x = prompt(`Передайте значение Х`, '');
  n = prompt(`Укажите степень n`, '');

  return alert(Math.pow(x , n)); 
}

pow();

function pow(x, n) {
  let result = x;

  for (let i = 1; i < n; i++) {
    result *= x;
  }

  return result;
}

let x = prompt("x?", '');
let n = prompt("n?", '');

if (n < 1) {
  alert(`Степень ${n} не поддерживается, используйте натуральное число`);
} else {
  alert( pow(x, n) );
}

///////////////////////// Объект функции, NFE //////////////////////////
// В JavaScript функции – это объекты.

// Можно представить функцию как «объект, который может делать какое-то действие». 
// Функции можно не только вызывать, 
// но и использовать их как обычные объекты: добавлять/удалять свойства, передавать их по ссылке и т.д.

// Имя функции доступно как свойство «name»:
function helloWorld() {
  console.log("hi");
}

helloWorld.name; // helloWorld

// Также имена имеют и методы объекта:
const userObj = {

  sayHello() {},

  sayHi() {},
}

userObj.sayHello.name; // sayHello
userObj.sayHi.name; // sayHi

// Свойство «length»
// Ещё одно встроенное свойство «length» содержит количество параметров функции в её объявлении.

function foo1(a) {};
function foo2(a, b) {};
function foo3(a, b, ...rest) {};

foo1.length; // 1
foo2.length; // 2
foo3.length; // 2

function ask(question, ...handlers) {
  let isYes = confirm(question);

  for (let handler of handlers) {
    if (handler.length == 0) {
      if (isYes) handler();
    } else {
      handler(isYes);
    }
  }
}
// для положительных ответов вызываются оба типа обработчиков
// для отрицательных - только второго типа

// ask("Question?", () => console.log("You say, Yes"), result => console.log(result));

// Пользовательские свойства
// Можно добавить свои собственные свойства.
function sayHelloWorld() {
  // console.log(`Hello World`);
  sayHelloWorld.counter++;
}
sayHelloWorld.counter = 0;

sayHelloWorld();
sayHelloWorld();
sayHelloWorld();

// console.log(`sayHelloWorld , вызвана ${sayHelloWorld.counter} раз`); // 3

// функцию-счётчик c замыкание
function makeCounter() {

  function counter() {
    return counter.count++;
  }
  // Свойство count теперь хранится прямо в функции, а не в её внешнем лексическом окружении
  counter.count = 0;

  return counter;
}

let counter = makeCounter();
counter(); // 0
counter(); // 1
counter(); // 2

// Функции – это объекты.
// Их свойства:
// name – имя функции. Обычно берётся из объявления функции, но если там нет – JavaScript пытается понять его из контекста.
// length – количество аргументов в объявлении функции. Троеточие («остаточные параметры») не считается.

////////////////////////////////////////////////
function elseMakeCounter() {
  let count = 0;

  function counter() {
    return count++;
  }

  counter.set = value => count = value;

  counter.decrease = () => count--;

  return counter;
}

///////
function sum(a) {

  let currentSum = a;

  function f(b) {
    currentSum += b;
    return f;
  }

  f.toString = function() {
    return currentSum;
  };

  return f;
}

// alert(sum(1)(2)(3))


/////////////////////////// Синтаксис "new Function" /////////////////////////

// Функция создаётся с заданными аргументами arg1...argN и телом functionBody.
// let func = new Function([arg1, arg2, ...argN], functionBody);
let sum = new Function('a', 'b', 'return a + b');
sum(1, 2); // 3

// new Function позволяет превратить любую строку в функцию

let str;// код, полученный с сервера динамически ...

let foo4 = new Function(str);
foo4();

// Замыкание
// Обычно функция запоминает, где родилась, в специальном свойстве [[Environment]]. 
// Это ссылка на лексическое окружение (Lexical Environment), в котором она создана 
// Но когда функция создаётся с использованием new Function, в её [[Environment]] записывается ссылка не на внешнее лексическое окружение, 
// в котором она была создана, а на глобальное. 
// Поэтому такая функция имеет доступ только к глобальным переменным.

function getFunc() {
  let value = "test";

  let func = new Function(`alert(value)`);

  return func;
}

getFunc()(); // ошибка: ReferenceError: value is not defined

// Функции, объявленные через new Function, имеют [[Environment]], 
// ссылающийся на глобальное лексическое окружение, а не на родительское. 
// Поэтому они не могут использовать внешние локальные переменные. 
// Переданные явно параметры – гораздо лучшее архитектурное решение, 
// которое не вызывает проблем у минификаторов.