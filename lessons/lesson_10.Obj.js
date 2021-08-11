"use strict";

const options = {
    name: 'test',
    width: 1024,
    height: 1024,
    colors: {
        border: 'black',
        bg: 'red'
    },
    makeTest: function (name) {
        return `Hi ${name}`;
    }
};

console.log(options.makeTest('Sergey'));
console.log(options.colors.bg);

let user = {
  name: "John",
  age: 30
};

let key = prompt("Что вы хотите узнать о пользователе?", "name");

// доступ к свойству через переменную
alert( user[key] );

// Проверка существования свойства, оператор «in»
let user = { name: "John", age: 30 };

alert( "age" in user ); // true, user.age существует
alert( "blabla" in user ); // false, user.blabla не существует

let user1 = {
  name: "John",
  age: 30,
  isAdmin: true
};

for (let key in user1) {
  user[key] = 'Новое значение ключа'
  console.log(`ключ обьекта `, key); // ключ обьекта
  console.log(`значения ключа `, user[key]);// значения ключа
}

// свойства упорядочены особым образом: 
// свойства с целочисленными ключами сортируются по возрастанию, 
// остальные располагаются в порядке создания.

let codes = {
  "49": "Германия",
  "41": "Швейцария",
  "44": "Великобритания",
  // ..,
  "1": "США"
};

for (let code in codes) {
  console.log(typeof(code), code); // 1, 41, 44, 49
}
// мы можем схитрить, 
// сделав коды не целочисленными свойствами. 
// Добавления знака "+" перед каждым кодом будет достаточно.

let code = {
  "+49": "Германия",
  "+41": "Швейцария",
  "+44": "Великобритания",
  // ..,
  "+1": "США"
};

for (let codes in code) {
  console.log( typeof(+codes), +codes ); // 49, 41, 44, 1
}

let schedule = {};
// функция, которая возвращает true, если у объекта нет свойств, иначе false.
function isEmpty(value) {
  for (let key in value) {
    return true;
  }
  return false; 
}

let salaries = {
  John: 100,
  Ann: 160,
  Pete: 130,
  Ken: 110,
}

function plusValueObj(obj) {
  let sum = 0;
  for (let key in obj){
    sum = sum + obj[key];
  }
  return sum;
}

let menu = {
  width: 200,
  height: 300,
  title: "My menu"
};
console.log(menu);

function multiplyNumeric(obj) {
  for (let key in obj) {
    if(typeof obj[key] == 'number') {
      obj[key] *= 2;
    }
  }
}

// Copy object
// Если принимающий объект (user) уже имеет свойство с таким именем, 
// оно будет перезаписано:

let user = { name: 'Sergei'},
    surname = { surname:'Lantsev'},
    isMarried = { isMarried: true };

Object.assign(user , surname, isMarried);

console.log(user);

function marry(man, woman) {
  man.wife = man;
  woman.husband = woman;

  return {
    father: man,
    mother: woman,
  }
}

let family = marry({name: 'Sergei'}, {name: 'Kate'});
console.log(family);

/* Объекты – это ассоциативные массивы с рядом дополнительных возможностей.

Они хранят свойства (пары ключ-значение), где:
Ключи свойств должны быть строками или символами (обычно строками).
Значения могут быть любого типа.
Чтобы получить доступ к свойству, мы можем использовать:
Запись через точку: obj.property.
Квадратные скобки obj["property"]. Квадратные скобки позволяют взять ключ из переменной, например, obj[varWithKey].
Дополнительные операторы:
Удаление свойства: delete obj.prop.
Проверка существования свойства: "key" in obj.
Перебор свойств объекта: цикл for for (let key in obj). */

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

/* Геттеры/сеттеры можно использовать как обёртки над «реальными» значениями свойств, чтобы получить больше контроля над операциями с ними.
Например, если мы хотим запретить устанавливать короткое имя для user, мы можем использовать сеттер name для проверки, а само значение хранить в отдельном свойстве _name: */

let user = {
    firstName: 'Sergey',
    lastName: 'Lantcev',

    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    },
    set fullName(value) {
        [this.firstName, this.lastName] = value.split(' ');
    }
};

console.log(user);
console.log(user.fullName);
console.log(user.fullName = 'Alisa Back');
console.log(user);

let users = {
    get name() {
        return this._name;
    },

    set name(value) {
        if (value.length < 4) {
            alert("Имя слишком короткое, должно быть более 4 символов");
            return;
        }
        this._name = value;
    }
};

user.name = "Pete";
console.log(user.name);


