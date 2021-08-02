"use strict";

let number = 15;

function showFirstMassage(text) {
    console.log(text);
    let num = 10;
    console.log(num);
    console.log(number); 
}

showFirstMassage('Hello');
console.log(number);

/* function calc(a, b) {
    return a + b;
}
console.log(calc(2, 2)); */

function ret() {
    let num = 50;
    return num;
}

const anotherNum = ret();
console.log(anotherNum);

const logger = function () {
    console.log('Hello');
};

logger();

const calc = (a, b) => {
    return a + b;

};
// Замыкание!!!!!!!!!
// Замыкание — это коллекция всех переменных из области видимости во время создания функции.
function getUrl(url) {
    let domen = '.com';
    return function () {
        return `https://${url}${domen}`;
    };
}
let google = getUrl('google');
let faceBook = getUrl('facebook');
console.log(google());
console.log(faceBook());

function counter() {
    let count = 0;
    return function () {
        count++;
        return count;
    };
}

let counretOne = counter();

console.log(counretOne());
console.log(counretOne());
console.log(counretOne());

let counterTwo = counter();
console.log(counterTwo());
console.log(counterTwo());
console.log(counterTwo());