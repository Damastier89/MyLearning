"use strict";
/**
 * Finds smallest element of an aray
 * @param {Array} arr array for searching
 * @return {number} index of the smallest element in array
 */
function findSmallest(arr){
  let smallest = arr[0];
  let smallestIndex = 0;
  let arrLen = arr.length;

  for (let i = 0; i < arrLen; i++) {
    if (arr[i] < smallest) {
      smallest = arr[i];
      smallestIndex = i;
    }
  }
  return smallestIndex;
};

/**
* Sorts recursively an array of numbers
* @param {Array} array An array of numbers
* @return {Array} New sorted array
*/
function selectionSort(array) {
  if (!array.length) return [];
  let smallest = array.splice(findSmallest(array), 1);
  return smallest.concat(selectionSort(array));
};


const arrayNumber = [5, 2, 15, 1, 7, 3, 9, 4, 8, 6, 10, 13, 12, 14, 11];
const arrayString = ['Dad', 'Five', 'I', 'Bay', 'Add', 'Const',];
console.log(selectionSort(arrayNumber)); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
console.log(selectionSort(arrayString)); // ['Add', 'Bay', 'Const', 'Dad', 'Five', 'I']