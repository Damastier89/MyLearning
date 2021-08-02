"use strict";
const arr = [1, 2, 22, 3, 15, 4, 28, 5, ];

let popped = arr.pop();
// console.log(arr);
// console.log(popped);

arr.push(10);
// console.log(arr);

for (let i = 0; i < arr.length; i++) {
    // console.log(arr[i]);
}

for (let value of arr) {
    value += 2;
    // console.log(value);
}

arr[99] = 15;
// console.log(arr.length);
// console.log(arr);

arr.forEach(function (item, i, arr) {
    // console.log(`${i}: ${item} in array ${arr}`);
});

arr.forEach((item, i, arr) => {
  if (item % 2 == 0) {
    // console.log(`Числа делящиеся без остатка на 2 - `, item);
  }
  // console.log(`${i} : ${item} in array ${arr}`);
});

const arrNum = [1, 23, 334, 545, 43];
let value;
value = arrNum.unshift(111); //* добавляет элемент в начало массива 6 [ 111, 1, 23, 13, 545, 43 ]
value = arrNum.shift(); //* удаляет элемент из начала массива 111 [ 1, 23, 13, 545, 43 ]

const str = prompt("", "");
const product = str.split(', ');
product.sort();
// console.log(product.join('; '));

arr.sort(campareNum);
// console.log(arr);

function campareNum(a, b) {
    return a - b;
}