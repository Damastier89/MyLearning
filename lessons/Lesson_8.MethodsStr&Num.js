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

//////////////////// Number ////////////////////

// В JavaScript можно использовать букву "e", чтобы укоротить запись числа. 
// Она добавляется к числу и заменяет указанное количество нулей:

const billion = 1e9; // 1 миллиард, буквально: 1 и 9 нулей
const ms = 1e-6; // шесть нулей, слева от 1

// Метод num.toString(base) возвращает строковое представление числа num в системе счисления base.
const num = 255;
num.toString(16);// "ff"
num.toString(2); // "11111111"

const bigNum = 123456; 
bigNum.toString(36); // "2n9c"
123456..toString(36); // "2n9c"

// Метод toFixed(n) округляет число до n знаков после запятой,
// Округляет значение до ближайшего числа,
const fixed = 124.355;
fixed.toFixed(1); // "124.4"

// Преобразовать полученное значение в число, используя унарный оператор +

// Потеря точности
// Справедливости ради заметим, 
// что ошибка в точности вычислений для чисел с плавающей точкой сохраняется в любом другом языке, 
// где используется формат IEEE 754, включая PHP, Java, C, Perl, Ruby.
// toFixed - это удобно для форматирования цен в интернет-магазине

// 0.1 + 0.2 == 0.3 // false ?!?
// (0.1 + 0.2).toFixed(20) // 0.30000000000000004441
// 0.3.toFixed(20); // 0.29999999999999998890

// Функция parseInt возвращает целое число, 
// а parseFloat возвращает число с плавающей точкой:
// parseInt(str, base) преобразует строку в целое число в соответствии с указанной системой,
// шестнадцатеричной (0x), восьмеричной (0o) и бинарной (0b)
const parseInt = "100px";
// parseInt( parseInt ); // 100
const parseFloat = "10.5px";
// parseFloat( parseFloat ); // 10.5
const pow = Math.pow(2 , 10); // 2 в степени 10 = 1024

function readNumber() {
  let question;

  do {
    question = prompt(`Введите число...`, "");
  }
  while(!isFinite(question));
  
  if(question === null || question === '') {
    return null;
  }
  return console.log(+question);
}
// Функция генерирует случайное число с плавающей точкой от min до max (но не включая max). 
function random(min, max) {
  return min + Math.random() * (max - min);
}
// Генерирует случайное целое число от min до max (включительно).
// Любое число из интервала min..max появляеться с одинаковой вероятностью.
function randomInteger(min, max) {
  let rang = min + Math.random() * (max + 1 - min);
  return Math.floor(rang);
}
console.log(randomInteger(1, 5));
