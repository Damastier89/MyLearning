"use strict";
//////////// Есть ли совпадения в массиве ////////////
const nums1 = [1, 2, 3, 1]; // true
const nums2 = [1, 2, 3, 4]; // false
const nums3 = [1,1,1,3,3,4,3,2,4,2] // true

function checkMatches(arr) {
  let result = [];
  for(let i of arr) {
    if(!result.includes(i)) {
      result.push(i)
    }
  }
  return result;
}

function checkMatches(arr) {
  let valueArr = new Set();
  let isDublicate = arr.some( item => {
    return valueArr.size === valueArr.add(item).size;
  });
  return isDublicate;
}

function checkMatches(arr) {
  let valueArr = arr.map( item => { return item });
  let isDublicate = valueArr.some( (item, idx) => {
    return valueArr.indexOf(item) != idx;
  });
  return isDublicate;
}

const res1 = checkMatches(nums1); // true
const res2 = checkMatches(nums2); // false
const res3 = checkMatches(nums3); // true

///////////////// Оставать уникальные значения в массиве ////////////
const arrNum = [1, 4, 3, 3, 5, 5];
const arrStr = ['Hi', 'Hi', 'hi', 'html', 'html', 'Html'];
console.log(new Set(arrNum)); // Set(4) {1, 4, 3, 5}

function uniqueNum(data) {
  let newData = [...new Set(data)];
  return newData;
}
console.log(uniqueNum(arrNum)); // [1, 4, 3, 5]
console.log(uniqueNum(arrStr)); // ['Hi', 'hi', 'html', 'Html']

///////////////// Минемальное и максимальное число в массиве ////////////////
const arr = [50, 10, 23, 56, 72, 80, 92];

function getMaxNum(arr) {
  let max;
  for (let maxNum of arr) {
    max = Math.max(maxNum);
  }
  return max;
}

console.log(getMaxNum(arr));

function getMinNum(arr) {
  return Math.min(...arr);;
}

console.log(getMinNum(arr));

console.log([...'hello all']); // ['h', 'e', 'l', 'l', 'o', ' ', 'a', 'l', 'l']
console.log('Hello my friends'[0]); // H

///////////////// Сравнить два массива //////////////////
const first = [1, 2, 3, 4, 5];
const second = [4, 5, 6, 7, 8];

// Вернет похожие элементы
function intersection(first, second) {
  let result = first.filter(el => second.includes(el));
  return result;
}
console.log(intersection(first, second)); // 4, 5

// Вернет элементы которых нет в first и second массивах
function difference(first, second) {
  let resultFirst = first.filter(el => !second.includes(el));
  let resultSecond = second.filter(el => !first.includes(el));
  let result = [...resultFirst, ...resultSecond];
  return result;
} 

console.log(difference(first, second)); // [1, 2, 3, 6, 7, 8]

// Для нахождения отсутствующего числа (работает по индексу массива)
const numbers1 = [0, 3, 2,];
const numbers2 = [2, 0, 5, 1, 4]

function checkMissingValues(array) {
  let stepOne = array.sort((a, b) => a - b);
  let stepTwo = stepOne.find((value, index) => { value != index }) - 1;
  return stepTwo;
}

checkMissingValues(numbers1);
checkMissingValues(numbers2);

// function checkMissingValues(array) {
//   return array.sort((a, b) => a - b).find((value, index) => value != index) - 1;
// }

// checkMissingValues(numbers1);
// console.log(checkMissingValues(numbers2));

// Найти все числа, отсутствующие в массиве
const numbers3 = [4, 3, 2, 7, 8, 2, 3, 1];
const numbers4 = [1, 1];

function checkMissingAllValues(array) {
  let result = [];

  for (let i = 1; i < array.length + 1; i++) {
    if (!array.includes(i)) {
      result.push(i);
    }
  }

  return result;
}

console.log(`checkMissingAllValues :` ,checkMissingAllValues(numbers3));
console.log(`checkMissingAllValues :` ,checkMissingAllValues(numbers4));

// В непустом массиве целых чисел numbers каждый элемент встречается дважды, кроме одного. Найди найти его.
const numbers = [2, 2, 1];
const numbers5 = [2, 2, 1, 1, 3];

function singleNumber(array) {
  let result = 0;
  for (let i = 0; i < array.length; i++) {
    result ^= array[i];
  }
  
  return result;
}

console.log(singleNumber(numbers)); // 1
console.log(singleNumber(numbers5)); // 3

// Вы поднимаетесь по лестнице. Требуется n шагов, чтобы добраться до вершины.
// Каждый раз вы можете подняться на 1 или 2 ступеньки. 
// Сколькими различными способами вы можете подняться на вершину?

function isManyWays(n) {
  if (n === 1 || n === 0) return 1;

  let step = 1;
  let dubleStep = 2;

  for (let i = 3; i <= n; i++) {
    let therdStep = step + dubleStep;
    step = dubleStep;
    dubleStep = therdStep
  }

  return dubleStep;
}

console.log(isManyWays(4));

// Учитывая целочисленный массив nums, найдите непрерывный подмассив (содержащий хотя бы одно число), 
// который имеет наибольшую сумму, и верните его сумму.

const numbers6 = [5, 4, -1, 7, 8];
const numbers7 = [-2, 1, -3, 4, -1, 2, 1, -5, 4];

function maximumSubarray(array) {
  let maxSum = -Infinity;
  let currentSum = 0;

  for (let i = 0; i < array.length; i++) {
    currentSum = Math.max(array[i], currentSum + array[i]);
    maxSum = Math.max(currentSum, maxSum);
  }

  return maxSum;
}

console.log(maximumSubarray(numbers7));

// Создать новый массив
function createNewArray() {
  const arr = [3, 5, 8, 16, 20, 23, 50];
  const result = [];
  arr.map(item => result.push(item));

  return result;
}
console.log(createNewArray());// [3, 5, 8, 16, 20, 23, 50];

// Перебрать массив, числа умножить на два, к строке добавить " - done";
const data = [5, 10, 'Shopping', 20, 'Homework'];
function changeArray(data) {
  for (let i = 0; i < data.length; i++) {
    if (typeof(data[i]) === 'string') {
      data[i] = `${data[i]} - done`;
    }

    if (typeof(data[i]) === 'number') {
      data[i] *= 2;
    }
  }

  return data; 
}
console.log(changeArray(data)); // [ 10, 20, 'Shopping - done', 40, 'Homework - done' ]

// Развернуть массив в обратную сторону.
const data2 = [5, 10, 'Shopping', 20, 'Homework'];
function revertArray(data) {
  const result = [];
  for (let i = 0; i < data.length; i++) {
    result.unshift(data[i]);
  }
  return result;
}

console.log(revertArray(data2)); // [ 'Homework', 20, 'Shopping', 10, 5 ]

// работа с массивами
const family = ['Peter', 'Ann', 'Alex', 'Linda'];
const familyVoid = [];

function showFamily(arr) {
  if (!arr.length) {
    return `Семья пуста!`;
  }
  const result = arr.join(', ');
  return `Семья состоит из: ${result}.`;
}
console.log(showFamily(family));
console.log(showFamily(familyVoid));

const favoriteCities = ['liSBon', 'ROME', 'miLan', 'Dublin'];

function standardizeStrings(arr) {
  return result = arr.join(', ').toLowerCase();
}
console.log(standardizeStrings(favoriteCities));

// Вернуть доступные валюты и двух банков. 
// Первый аргумент - вылюты банков. 
// Второй аргумент - отсутствующая валюта
const baseCurrencies = ['USD', 'EUR'];
const additionalCurrencies = ['UAH', 'RUB', 'CNY'];

function availableCurr(arr, missingCurr) {
  let result = [];
  if (!arr.length) {
    return `Нет доступных валют!`;
  }

  if (arr.includes(missingCurr)) {
    arr.pop(arr.includes(missingCurr));
    result = arr;
    
  }

  return `Доступные вылюты : \n ${result.join('\n ')}`;
}

console.log(availableCurr([...additionalCurrencies, ...baseCurrencies], 'CNY'));

// Пребрать массив и вернуть следующий результат :
// [
//   [ 'Andrew', 'Ann', 'Bernard' ],
//   [ 'Cris', 'Josh', 'Mark' ],
//   [ 'Peter', 'Sam', 'Sandra' ],
//   'Оставшиеся студенты : - '
// ] три массива, а все что не всемтилось в перевести в строку.
const students = ['Peter', 'Andrew', 'Ann', 'Mark', 'Josh', 'Sandra', 'Cris', 'Bernard', 'Takesi', 'Sam'];
const studentsMinusOne = ['Peter', 'Andrew', 'Ann', 'Mark', 'Josh', 'Sandra', 'Cris', 'Bernard', 'Sam'];
const studentsPlusOne = ['Peter', 'Andrew', 'Ann', 'Mark', 'Josh', 'Sandra', 'Cris', 'Bernard', 'Takesi', 'Sam', 'Somebody'];

function sortStudentsByGroups(arr) {
  
  const sortNames = arr.sort();
  const result = [];
  let lastName;

  for (let i = 0; i <= 3; i++) {
    result.push(sortNames.splice(0, 3));
  }
  
  lastName = result.pop().join(', ');

  if (lastName === '') {
    result.push(`Оставшиеся студенты : - `);
  } else {
    result.push(`Оставшиеся студенты : ${lastName}`);
  }
  
  return result;
}

console.log(sortStudentsByGroups(students));
console.log(sortStudentsByGroups(studentsMinusOne));
console.log(sortStudentsByGroups(studentsPlusOne));

// Подсчитать все элементы массива, в том числе и вложенные.
const elements = [2, 'Kate', [3, 5], {names: 'Kate'}, {}];
function deepCount(arr) {
  let count = arr.length;
  for (let i = 0; i < arr.length; i++) {

    if (Array.isArray(arr[i])) {
      count += deepCount(arr[i]);
    }

  }

  return count;
}

console.log(deepCount(elements)); // 7

// Перебор различных частей массива
const films = [
  {
      name: 'Titanic',
      rating: 9
  },
  {
      name: 'Die hard 5',
      rating: 5
  },
  {
      name: 'Matrix',
      rating: 8
  },
  {
      name: 'Some bad film',
      rating: 4
  }
];

function showGoodFilms(arr) {
  return arr.filter(item => item.rating >= 8);
}

// console.log(showGoodFilms(films)); // [ { name: 'Titanic', rating: 9 }, { name: 'Matrix', rating: 8 } ]

function showListOfFilms(arr) {
  const result = [];
  arr.map(element => result.push(element.name));
  return result.join(', ');
  // return arr.reduce((acc, current) => ${typeof(acc) === 'object' ? acc.name : acc}, ${current.name});
}

// console.log(showListOfFilms(films)); // Titanic, Die hard 5, Matrix, Some bad film

function setFilmsIds(arr) {
  const result = [];
  arr.map((element, index) => {
    element.id = index
    result.push(element);
  });

  return result;
}

// console.log(setFilmsIds(films));
// [
//   { name: 'Titanic', rating: 9, id: 0 },
//   { name: 'Die hard 5', rating: 5, id: 1 },
//   { name: 'Matrix', rating: 8, id: 2 },
//   { name: 'Some bad film', rating: 4, id: 3 }
// ]

const tranformedArray = setFilmsIds(films);

// При срабатывании every на первом фильме он натыкается на id = 0;
// 0 - это неправда в логическом ключе, поэтому и весь метод возвращает false
function checkFilms(arr) {
  return arr.every(film => film.id || film.id === 0 ? true : false);
}

console.log(checkFilms(tranformedArray));

const funds = [
  {amount: -1400},
  {amount: 2400},
  {amount: -1000},
  {amount: 500},
  {amount: 10400},
  {amount: -11400}
];

function getPositiveIncomeAmount(data) {
  let result = 0;
  data.map(element => {
    if (element.amount > 0) {
      result += element.amount;
    }
  });

  return result;
};

// console.log(getPositiveIncomeAmount(funds));

function getTotalIncomeAmount(data) {
  let result;
  data.forEach(element => {
    if (element.amount > 0) {
      result = getPositiveIncomeAmount(data);
    } else {
      result = data.reduce((acc, element) => {return acc += element.amount},0);
    }
  });

  return result;
};

console.log(getTotalIncomeAmount(funds));