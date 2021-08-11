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


