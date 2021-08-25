"use strict";
/////////////////// Деструктуризация ///////////////////////
const user = {};
[user.name, user.surname] = 'Sergei Lantsev'.split(' ');
// console.log(user.name);

const arr = ['hi', 'done', 'error', 'hello', 'world', 'max', 'age', 'red'];

for (let i = 0; i < arr.length; i++) {
  // console.log(`${arr[i]}`);
};

for (let [index , item] of arr.entries()) {
  // console.log(index + 1, item);
}

const persons = [
  { name: 'Sergei', surname: 'Lantsev'},
  { name: 'Ekaterina', surname:'Semenova'},
];
for (const { name } of persons) {
  console.log(name);
};

// Ненужные элементы массива также могут быть отброшены через запятую
let [one, two, three] = arr;

// console.log(one);
// console.log(two);
// console.log(three);

let {
  title = "Меню", width, height, colors: {
    border,
    bg
  }
} = options;
console.log(title);
console.log(width);
console.log(height);
console.log(border);
console.log(bg);
console.log(options);

console.log(Object.keys(options).length);

delete options.name;
console.log(options);
let counter = 0;
for (let key in options) {
    if (typeof (options[key]) === 'object') {
        for (let i in options[key]) {
            console.log(`Properties ${i} have value ${options[key][i]}`);
            counter++;
        }
    } else {
        console.log(`Properties ${key} have value ${options[key]}`);
        counter++;
    }
}
console.log(counter);

const user = {
  name: 'Sergei',
  age: 32,
  isMarried: false,
  hobbys: {
    dance: 'Bachata',
    game: 'Diablo',
  },
};

for (let key in user) {
  if ( typeof(user[key]) === 'object') {
    for ( let i in user[key]) {
      console.log(`В свойстве ${i} есть значение ${user[key][i]}`);
    }
  } else {
    console.log(`В свойстве ${key} есть значение ${user[key]}`);
  }
};

console.log(counters);