"use strict";
let result = '';
let length = 9;

// треугольник в консоли
for (let i = 0; i <= length; i++) {
  result += '*';
  console.log(result);
}

function firstTask() {
  for (let i = 5; i <= 10; i++) {
    console.log(i)
  }
}
firstTask();

function secondTask() {
  for (let i = 20; i >= 10; i--) {
    if (i === 13) break;
    console.log(i)
  }
}
secondTask();

// Вывести четные числа
function thirdTask() {
  for (let i = 2; i <= 10; i++) {
    if (i % 2 === 0) {
      console.log(i);
    }
  }
}
thirdTask();

// Вывести нечетные числа в консоль через while
function fourthTask() {
  let i = 2

  while(i <= 16) {
    if (i % 2 === 0) {
      i++;
      continue;
    } else {
      console.log(i)
    }
    i++
  }
}

fourthTask();

// Рисует триугольник в консоли.
function drowRectengle(lines, figure) {
  for (let i = 0; i <= lines; i++) {
    
    for (let j = 0; j < lines - i; j++) {
      figure += ' ';
    }

    for (let j = 0; j < 2 * i + 1; j++) {
      figure += '*';
    }

    figure += "\n";
  }

  return figure;
}


console.log(drowRectengle(5, ''));

// Вернуть массив чисел, больше или меньше на 1 чем переданный агрумент.
function returnNeighboringNumbers(number) {
  const result = [];
  result.push(number - 1, number, number + 1);
  return result;
}

console.log(returnNeighboringNumbers(6)); // [ 5, 6, 7 ]

function getMathResult(base, iterator) {
  if (typeof(iterator) === 'string' || iterator <= 0) {
    return base;
  } 

  let result = '';

  for (let i = 1; i <= iterator; i++) {
    if (i === iterator) {
      result += ${base * i};
    } else {
      result += ${base * i}---;
    }
  }
  return result;
}

console.log(getMathResult(5 , 'hi')); // 5
console.log(getMathResult(4 , -5)); // 4
console.log(getMathResult(3 , 0)); // 3
console.log(getMathResult(3 , 10)); // 3---6---9---12---15---18---21---24---27---30