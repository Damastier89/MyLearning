"use strict";
const str = 'test';
const arr = [1, 2, 3, 4, 5];
/* console.log(str[2]);
console.log(arr.length); */
console.log(str);
console.log(str.toUpperCase());

const fruit = 'Some fruit';
console.log(fruit.indexOf('fruit'));

const logg = 'Hello World';
console.log(logg.slice(6, 11));
console.log(logg.substring(6, 11));
console.log(logg.substr(6, 5));
const string = 'JavaScript is the best lenguage in the world. Let`s learn JavaScript together!';
console.log(string.replace('JavaScript', 'java'));
console.log(string.replaceAll('JavaScript', 'java'));

const num = 12.2;
console.log(Math.round(num));

const test = '12.2px';
console.log(parseInt(test));
console.log(parseFloat(test));