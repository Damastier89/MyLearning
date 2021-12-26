"use strict"
// Бинарный поиск ищет от середины, далее от середины оставщегося и так далее до искомого значения.

function binarySearch(list, item) {
  // В этих переменных храняться границы той части списка, в которой выполняется поиск.
  let low = 0;  
  let high = list.length - 1; 

  while(low <= high) {
    // Math.floor() - Округляет аргумент до ближайшего меньшего целого.
    // Пока эта часть не сократится до одного элемента, проверяем средний элемент.
    let mid = Math.floor((low + high) / 2);
    let guess = list[mid];
    
    if (guess === item) { // Значение найдено
      return mid;
    }

    if (guess > item) { // Много
      high = mid - 1;
    } else { // Мало
      low = mid + 1;
    }
  }

  return null; // Значения не существует
}

const myList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,];

console.log(binarySearch(myList, 15)); // 14 - вернул индекс искомого эелемента
console.log(binarySearch(myList, -1)); // null - элемента не существует