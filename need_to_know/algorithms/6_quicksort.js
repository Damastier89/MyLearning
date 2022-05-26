"use strict";
// Принцип "Разделяй и влавствуй"
// Алгоритм Евклида (...исходный надел земли... делим на квадраты, остаток снова делим на квадраты и так до конца)

/////////////// loop sum /////////////////
const arrayNum = [1, 2, 3, 4, 5];
function sumloop(array) {
  let result = 0;
  for (let i = 0; i < array.length; i++) {
    result += array[i];
  }
  return result;
}

const arreyReduce = (array) => (
  array.reduce((acc, prev) => acc + prev)
);

console.log(arreyReduce(arrayNum)); // 15
console.log(sumloop(arrayNum)); // 15

//////////// Recursive sum ////////////////
const recursiveSum = (arr) => (
  // slice - возвращает новый массив, в который копирует элементы, начиная с индекса start и до end (не включая end).
  arr.length === 0 ? 0 : arr[0] + recursiveSum(arr.slice(1))
);

console.log(recursiveSum(arrayNum)); // 15

//////////// Recursive count //////////////
// Подсчет элементов в массиве
const recursiveCount = (arr) => ( 
  arr.length === 0 ? 0 : 1 + recursiveCount(arr.slice(1))
);

console.log(recursiveCount(arrayNum)); // 5

//////////// Recursive max ////////////////

const max = (array) => {
  if (array.length === 2) return array[0] > array[1] ? array[0] : array[1];
  const subMax = max(array.slice(1));
  return array[0] > subMax ? array[0] : subMax;
};

const alternativeSolutionMax = (array, max = 0) => (
  array.length === 0
    ? max
    : alternativeSolutionMax(array.slice(1), array[0] > max ? array[0] : max)
);
console.log(max([1, 5, 10, 25, 16, 1])); // 25
console.log(alternativeSolutionMax([1, 5, 10, 25, 16, 1])); // 25

//////////////// quicksort ///////////////

const quicksort = (array) => {
  if (array.length < 2) { // Базовый случай, массив с 0 и 1 элементов уже "отсортированы"
    return array;
  }

  const pivot = array[0]; // Рекурсивный случай
  const keysAreLessPivot = array.slice(1).filter(key => key <= pivot); // Подмассив всех элементов меньше опорного
  const keysAreMorePivot = array.slice(1).filter(key => key > pivot); // Подмассив всех элемнтов больше опорного

  return [
    ...quicksort(keysAreLessPivot),
    pivot,
    ...quicksort(keysAreMorePivot),
  ];
};

console.log(quicksort([10, 5, 2, 3]));














