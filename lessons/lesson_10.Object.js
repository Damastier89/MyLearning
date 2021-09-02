"use strict";
// Объекты – это ассоциативные массивы с рядом дополнительных возможностей.

// Они хранят свойства (пары ключ-значение), где:
// Ключи свойств должны быть строками или символами (обычно строками).
// Значения могут быть любого типа.
// Чтобы получить доступ к свойству, мы можем использовать:
// Запись через точку: obj.property.
// Квадратные скобки obj["property"]. Квадратные скобки позволяют взять ключ из переменной, например, obj[varWithKey].
// Дополнительные операторы:
// Удаление свойства: delete obj.prop.
// Проверка существования свойства: "key" in obj.
// Перебор свойств объекта: цикл for for (let key in obj).

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

function copyObj(mainObj) {
	let objCopy = {};

	let key;
	for (key in mainObj) {
		objCopy[key] = mainObj[key]; // пройдется по переданному обьекту и передаст скопированные свойства в новый обьект
	}
	return objCopy;
}

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

////////////// Object.keys, values, entries ////////////////

// Для простых объектов доступны следующие методы:

Object.keys(obj); // возвращает массив ключей.
Object.values(obj); // возвращает массив значений.
Object.entries(obj); // возвращает массив пар [ключ, значение].

const costomer = {
  name: "Sergei",
  age: 32,
}

Object.keys(costomer); // ["name", "age"]
Object.values(costomer); // ["Sergei", 32]
Object.entries(costomer); // [ ["name", "Sergei"], ["age", 32] ]

// Перебор значений свойств в цикле:
for (let val of Object.values(costomer)) {
  console.log(val); // "Sergei" , 32
}

// Трансформации объекта

// У объектов нет множества методов, которые есть в массивах, например map, filter и других.
// Если мы хотели бы их применить, то можно использовать Object.entries с последующим вызовом Object.fromEntries:

// Вызов Object.entries(obj) возвращает массив пар ключ/значение для obj.
// На нём вызываем методы массива, например, map.
// Используем Object.fromEntries(array) на результате, чтобы преобразовать его обратно в объект.

const prices = {
  banana: 1,
  orange: 2,
  meat: 4,
};

const doublePrices = Object.fromEntries(
    // преобразовать в массив, затем map, затем fromEntries обратно объект
    Object.entries(prices).map(([key, val]) => [key, val * 2])
);

doublePrices // {banana: 2, orange: 4, meat: 8}

/////////////////////
const salaries = {
  "John": 100,
  "Pete": 300,
  "Mary": 250
};

function sumSalaries(salaries) {
  let sum = 0;
  
  for (let salary of Object.values(salaries)) {
    sum += salary;
  }
  return sum;
}

const salariesUsers = sumSalaries(salaries); // 650

///////
function count(obj) {
  let result = Object.keys(obj).length;
  return result;
}

const lengthObj = count(salaries); // 3