"use strict";
// Selection sort - O(n^2);

// 1. Найти наименьшее значение в массиве
function findSmallestIndex(array) {
  let smallestElement = array[0]; // Для хранения наименьшего значения
  let smallestIndex = 0; // Для хранения индекса наименьшего значения

  for (let i = 1; i < array.length; i++) {
    if (array[i] < smallestElement) {
      smallestElement = array[i];
      smallestIndex = i;
    }
  }

  return smallestIndex;
};

// 2. Сортировка массива выбором
function selectionSort(array) { // сортирует массив
  let sortedArray = [];
  let length = array.length;

  for (let i = 0; i < length; i++) {
    // Находим наименьший элемент в массиве
    let smallestIndex = findSmallestIndex(array);
    // Добавляем наименьший элемент в новый массив
    sortedArray.push(array.splice(smallestIndex, 1)[0]);
  }
  
  return sortedArray;
};

const arrayNumber = [5, 2, 15, 1, 7, 3, 9, 4, 8, 6, 10, 13, 12, 14, 11];
const arrayString = ['Dad', 'Five', 'I', 'Bay', 'Add', 'Const',];
console.log(selectionSort(arrayNumber)); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
console.log(selectionSort(arrayString)); // [ 'Add', 'Bay', 'Const', 'Dad', 'Five', 'I' ]

