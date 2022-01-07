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




