"use strict";
/////////////////// Деструктуризация ///////////////////////

// Деструктурирующее присваивание – это специальный синтаксис, 
// который позволяет нам «распаковать» массивы или объекты в кучу переменных, 
// так как иногда они более удобны. Деструктуризация также прекрасно работает со сложными функциями, 
// которые имеют много параметров, значений по умолчанию и так далее.

const user = {};
[user.name, user.surname] = 'Sergei Lantsev'.split(' ');
// console.log(user.name);

const arr = ['hi', 'done', 'error', 'hello', 'world', 'max', 'age', 'red'];

for (let i = 0; i < arr.length; i++) {
  console.log(`${arr[i]}`);
};

for (let [index , item] of arr.entries()) {
  console.log(index + 1, item);
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

console.log(one);
console.log(two);
console.log(three);

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

// Деструктуризация массива
const arrNames = ["Kate", "Sergei", "Maximus"];

const [ nameOne, nameTwo, namethree ] = arrNames;

nameOne; // "Kate"
nameTwo; // "Sergei"
namethree; // "Maximus"

const [firstName, surname] = "Sergei Lantsev".split(" "); // Разбивает строку и передает в переменные.
firstName; // "Sergei"
surname; // "Lantsev"

// второй элемент не нужен, отбросить его с помошь запятой
const [firstname, , title] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];
firstname; // "Julius"
title; // Consul"

// Можно использовать любой перебираемый объект, не только массивы.
const [a, b, c] = 'abc';
const [one, two, three] = new Set([1, 2, 3,]);

// Можно использовать что угодно «присваивающее» с левой стороны.
const user = {};
[user.name, user.surname] = "Sergei Lantsev".split(" ");
user; // {name: "Sergei", surname: "Lantsev"}

// Цикл с .entries()
// Можно использовать его с деструктуризацией для цикличного перебора ключей и значений объекта.

const customer = {
  name: "Sergei",
  age: 32,
  city: "Kaluga",
}

for (let [key, value] of Object.entries(customer)) {
  console.log(`${key} : ${value}`);
}

// …то же самое для map
const customerMap = new Map();
customerMap.set("name", "Sergei");
customerMap.set("age", 32);
customerMap.set("city", "Kaluga");

for (let [key, value] of customerMap) {
  console.log(`${key} : ${value}`);
}

// Остаточные параметры "..."
const [customerName, customertitle, ...customerRest] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];
customerName; // "Julius"
customertitle; // "Caesar"
customerRest; // ["Consul", "of the Roman Republic"] `rest` является массивом.

// Значения по умолчанию
const [guestName = "Guest", guestSurname = "Anonymous"] = ["Julius"];
guestName; // "Julius"
guestSurname; // "Anonymous"

// Prompt будет запущен только для отсутствующего значения => lastName
// const [fitrsName = prompt("name?", ""), lastName = prompt("surname?", "")] = ["Julius"];

// Деструктуризация объекта
const options = {
  menu: "Menu",
  width: 200,
  height: 350,
}

const {menu, width, height} = options;
menu; // "Menu"
width; // 200
height; // 350

// Если мы хотим присвоить свойство объекта переменной с другим названием, например, 
// свойство options.width присвоить переменной w, то мы можем использовать двоеточие.
// Двоеточие показывает «что : куда идёт»
const {menu: m, width: w, height: h} = options;
m; // "Menu"
w; // 200
h; // 350

// Для потенциально отсутствующих свойств мы можем установить значения по умолчанию, используя "="
const optionMenu = {
  optionTitle: "Menu",
};

const { optionWidth = 150, optionHeight = 250, optionTitle} = optionMenu;
optionWidth; // 150
optionHeight; // 250
optionTitle; // "Menu"

// Можно комбинировать...
// const { width : optWidth, radius = 500, suptitle  = prompt("Title?", "")} = options;
// optWidth; // 200
// radius; // 500
// suptitle; // Значение из prompt

// Если у нас есть большой объект с множеством свойств, можно взять только то, что нужно
const optionsMenuTitle = {
  suptitle: "Title",
  // some code...
  // some code...
  // some code...
}

const { suptitle } = optionsMenuTitle;
suptitle; // "Title"

// Остаток объекта "...". Можно использовать троеточие, как и для массивов. 
const car = {
  company: "Hyundai",
  model: "Solaris",
  power: 1600,
  price: 1e6, 
}

const { company , ...rest} = car;
company; // Hyundai
rest; // {model: "Solaris", power: 1600, price: 1000000}

// Вложенная деструктуризация
const passengerCar = {
  companyCar: "Hyundai",
  carSize: {
    widthCar: 1600,
    heightCar: 3800
  },
  interior: ["skin", "cloth"],
  power: true
};

const { carSize: {widthCar, heightCar}, interior: [itemOne, itemTwo], companyCar, petrol = "AE - 95"} = passengerCar;
widthCar; // 1600
heightCar; // 3800
itemOne; // "skin"
itemTwo; // "cloth"
company; // "Hyumdai"
petrol; // "AE - 95"

/////////////////////////////////////////////////////////
const userSalaries = {
  "Sergei": 100,
  "Kate": 300,
  "Maximus": 250
};

function topSalary(salaries) {

  let max = 0;
  let maxName = null;

  for (let [name, salary] of Object.entries(salaries)) {
    if (max < salary) {
      max = salary;
      maxName = name;
    }
  }
  return maxName;
}

const maxSelatyUser = topSalary(userSalaries);
maxSelatyUser; // "Kate"

///////
const userData = {
  userDataName: "Sergei",
  userDataAge: 32,
}

const { userDataName, userDataAge : userDataYears, isAdmin = false } = userData;
userDataName; // "Sergei"
userDataYears; // 32
isAdmin; // false