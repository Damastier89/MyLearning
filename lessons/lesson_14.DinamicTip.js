function seyHello() {
    console.log('Hello');
}

seyHello();

const arr = [3, 5, 7, 65, 26, 5, 83];

arr.sort(compareNum);

function compareNum(a, b) {
    return a - b;
}

console.log(arr);

// to String 

console.log(typeof (String(4)));
const num = 10;

console.log('https://google/catalog/' + num);

const fontSize = 20 + 'xp';

//to Number

console.log(typeof (Number('5')));
console.log(typeof ((+'5')));
console.log(typeof (parseInt('5px', 10)));

// to boolean

/* 0 , '', null, undefined, NaN - false */

let switcher = null;

// в if подставляется false и условие не выполнится.
if (switcher) {
    console.log('Working...');
}
switcher = 1;

// в if подставляется true и условие выполнится.
if (switcher) {
    console.log('Working...');
}

console.log(typeof (Boolean('5')));
console.log(typeof (!!'444'));