"use strict";

let number = 1;
const leftBorderWidth = 5;

/**
 * Типы данных:
 /* 1. Примитивные
 * - Number: 2020, 1.5, NaN, Infinity
 * - String: 'Hello', "Hello", `Hello`
 * - Boolean: true, false
 * - Null: null
 * - Undefined: undefined,
 * - Symbol()
 */
console.log(2020, 1.5);
console.log(20 * 'asdasd'); // NaN
console.log(1 / 0); // Infinity

console.log('Hello', "Hello", `Hello`);

console.log(true, false);

console.log(null);

console.log(undefined);

console.log(Symbol());

/**
 * Типы данных:
 * 2. Объекты. (Reference type) Передаються по ссылке.
 *  * Object: { name: 'Sergey', age: 30 }
 *  * Array: [1, 2, 3]
 *  * Function: function foo() {}
 *  * Date: new Date()
 *  ....
 */

const user = {
    name: 'Sergei',
    age: 30,
    isMarried: false,
};
console.log(user.name);
console.log(user["age"]);

// Массив, часный случай объекта
let arr = ['white', 1, 'black', {}, [], 'number'];
console.log(arr[2]);
console.log(typeof(arr));
/**
/* Особености:
* 1. JS динамически типизированный язык
* 2. Одна и та же переменная может хранить в себе любой тип данных
* 3. Нам не нужно определять тип данных при создании переменных
* 4. Если мы хотим использовать статическую типизацию мы можем использовать TypeScript или Flow
*/