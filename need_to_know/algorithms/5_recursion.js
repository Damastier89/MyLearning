"use strict";
// Рекурсия требует больших затрат памяти, так как хранит в стеке всю промежуточную информацию.
// Когда мы вызываем функцию из другой функции, 
// вызывающая функция приостанавливается в частично завершенном состоянии.
// В каждой рекурсивной финкции должно быть два случая: базовый и рекурсивный

function countdown(number) {
  console.log(number);
  if (number <= 0) {
    return;
  }
  setTimeout(() => {
    countdown(number - 1);
  }, 1000);
  
}

countdown(10);

/////////////////////////////////////////
// Стек вызовов
// Стек поддерживает две операции: занесение и извлечение
// Все вызовы функций сохраняются в стеке вызовов.
function greeting(name) {
  console.log(`Hello ${name}!`);
  greet(name);
  console.log(`Greeting ready to say bye...`);
  bye();
}

function greet(name) {
  console.log(`How are you ${name}?`);
}

function bye() {
  console.log(`Ok, bye`);
}

greeting('Kate');
/////////////////////////////////////////
// Factorial
function getFactorial(number) {
  if (number === 0) {
    return 1;
  }
  return number * getFactorial(number - 1);
}
console.log(getFactorial(5)); // 120
