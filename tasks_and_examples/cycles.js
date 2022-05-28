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

// Вернуть диапазон всех результатов умножения переданых агрументов. 
function getMathResult(base, iterator) {
  if (typeof(iterator) === 'string' || iterator <= 0) {
    return base;
  } 

  let result = '';

  for (let i = 1; i <= iterator; i++) {
    if (i === iterator) {
      result += `${base * i}`;
    } else {
      result += `${base * i}---`;
    }
  }
  return result;
}

console.log(getMathResult(5 , 'hi')); // 5
console.log(getMathResult(4 , -5)); // 4
console.log(getMathResult(3 , 0)); // 3
console.log(getMathResult(3 , 10)); // 3---6---9---12---15---18---21---24---27---30

// Растичать объем и площадь кубаю.
function calculateVolumeAndArea(length) {
  if (typeof(length) !== 'number' || length < 0 || !Number.isInteger(length)) {
    return `Ошибка при вычеслении!`;
  }

  let volume = 0;
  let area = 0;

  volume = length * length * length;
  area = 6 * (length * length);

  return `Обьем куба: ${volume}, площадь поверхности: ${area}.`;
}

console.log(calculateVolumeAndArea(3));

function getCoupeNumber(coupe) {
  if (typeof(coupe) !== 'number' || coupe < 0 || !Number.isInteger(length)) {
    return `Ошибка, данные введены не правильно!`;
  }

  if (coupe === 0 || coupe > 36) {
    return `Таких мест в вагоне не существует!`;
  }

  for (let i = 1; i < 36; i++) {
    if (coupe <= i) {
      return Math.ceil(i / 4)
    }
  }
}

// Расчитать сколько час в минутах
function getTimeFromMitutes(minutesTotal) {
  if (typeof(minutesTotal) !== 'number' ||  minutesTotal < 0 || !Number.isInteger(minutesTotal)) {
    return `Ошибка при вычеслении!`;
  }

  const hours = Math.floor(minutesTotal / 60);
  const minutes = minutesTotal % 60;

  let hoursTostring = '';

  switch(hours) {
    case 0:
      hoursTostring = 'часов';
      break;
    case 1:   
      hoursTostring = 'час';
      break;
    case 2:
    case 3:
    case 4:
    case 83:
    case 833:  
      hoursTostring = 'часа';
      break;
    default:
      hoursTostring = 'часов';           
  }

  return `Это ${hours} ${hoursTostring} и ${minutes} минут`;
}

console.log(getTimeFromMitutes(50000));


function timeStemp() {
  let start = new Date(); // начинаем отсчёт времени

  // выполняем некоторые действия
  for (let i = 0; i < 100000; i++) {
    let doSomething = i * i * i;
  }
  
  let end = new Date(); // заканчиваем отсчёт времени
  
  return console.log(`Цикл отработал за ${end - start} миллисекунд `);
}

timeStemp();

function findMaxNumber(a, b, c, d) {
  if (typeof(a) !== 'number' || typeof(b) !== 'number' || typeof(c) !== 'number' || typeof(d) !== 'number') {
    return 0;
  } else {
    return Math.max(a, b ,c, d);
  }
}

// Последовательность чисел Фибоначчи определяется формулой Fn = Fn-1 + Fn-2. То есть, следующее число получается как сумма двух предыдущих.
// Первые два числа равны 1, затем 2(1+1), затем 3(1+2), 5(2+3) и так далее: 1, 1, 2, 3, 5, 8, 13, 21....
// Числа Фибоначчи тесно связаны с золотым сечением и множеством природных явлений вокруг нас.
// https://learn.javascript.ru/task/fibonacci-numbers
function fibonachi(n) {
  if (typeof(n) !== 'number' ||  n <= 0 || !Number.isInteger(n)) {
    return 'Opppcc';
  } 
  let result = '';
  let first = 0;
  let second = 1;

  for (let i = 0; i < n; i++) {
      if (i + 1 === n) {
          result += `${first}`;
          // Без пробела в конце
      } else {
          result += `${first}` ;
      }

      let third = first + second;
      first = second;
      second = third;
  }

  return result;
}

console.log(fibonachi(7));