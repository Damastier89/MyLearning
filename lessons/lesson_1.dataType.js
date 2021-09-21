"use strict";
// Существует 2 основных отличия var от let/const:
// Переменные var не имеют блочной области видимости, они ограничены, как минимум, телом функции.
// Объявления (инициализация) переменных var производится в начале исполнения функции (или скрипта для глобальных переменных).

var some = "some code..."
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

// Приведение типов 

"" + 1 + 0 // "10" ok
"" - 1 + 0 // -1 not
true + false // 1 not
6 / "3" // 2 ok
"2" * "3" // 6 ok
4 + 5 + "px" // "9px" ok
"$" + 4 + 5 // "$45" ok 
"4" - 2 // 2 ok
"4px" - 2 // NaN ok
7 / 0 // infinity ok
"  -9  " + 5 // " -9 5" not
"  -9  " - 5 // -14 ok 
null + 1 // 1 not
undefined + 1 // NaN not 
" \t \n" - 2 // -2 not

// Опциональная цепочка '?.'

// Синтаксис опциональной цепочки ?. имеет три формы:
// obj?.prop – возвращает obj.prop, если существует obj, и undefined в противном случае.
// obj?.[prop] – возвращает obj[prop], если существует obj, и undefined в противном случае.
// obj.method?.() – вызывает obj.method(), если существует obj.method, в противном случае возвращает undefined.
// Как мы видим, все они просты и понятны в использовании. ?. проверяет левую часть выражения на равенство null/undefined, и продолжает дальнейшее вычисление, только если это не так.
// Цепочка ?. позволяет без возникновения ошибок обратиться к вложенным свойствам.
