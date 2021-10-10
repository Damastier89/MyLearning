///////////////////// Формат JSON, метод toJSON ///////////////////////

// JSON (JavaScript Object Notation) – это общий формат для представления значений и объектов. 
// Его описание задокументировано в стандарте RFC 4627. Первоначально он был создан для JavaScript, 
// но многие другие языки также имеют библиотеки, которые могут работать с ним. 
// Таким образом, JSON легко использовать для обмена данными, когда клиент использует JavaScript, 
// а сервер написан на Ruby/PHP/Java или любом другом языке.

// JavaScript предоставляет методы:
// JSON.stringify для преобразования объектов в JSON.
// JSON.parse для преобразования JSON обратно в объект.

const student = {
  name: "Sergei",
  age: 32,
  isAdmin: false,
  courses: ["JavaScript", "Angular", "HTML/CSS"],
  wife: undefined,
}

// Метод JSON.stringify(student) берёт объект и преобразует его в строку.
const json = JSON.stringify(student); // "{"name":"Sergei","age":32,"isAdmin":false,"courses":["JavaScript","Angular","HTML/CSS"]}"


// Объект в формате JSON имеет несколько важных отличий от объектного литерала:

// Строки используют двойные кавычки. Никаких одинарных кавычек или обратных кавычек в JSON. Так 'John' становится "John".
// Имена свойств объекта также заключаются в двойные кавычки. Это обязательно. Так age:30 становится "age":30.
// JSON.stringify может быть применён и к примитивам.

// JSON поддерживает следующие типы данных:

// Объекты { ... }
// Массивы [ ... ]
// Примитивы:
// строки,
// числа,
// логические значения true/false,
// null

// число в JSON остаётся числом
JSON.stringify(1); // 1

// строка в JSON по-прежнему остаётся строкой, но в двойных кавычках
JSON.stringify('test'); // "test"
JSON.stringify(true); // true
JSON.stringify([1, 2, 3]); // [1,2,3]

// JSON является независимой от языка спецификацией для данных, 
// поэтому JSON.stringify пропускает некоторые специфические свойства объектов JavaScript.

// Свойства-функции (методы).
// Символьные свойства.
// Свойства, содержащие undefined.

const example = {
  sayHi() { // будет пропущено
    alert("Hello");
  },
  [Symbol("id")]: 123, // также будет пропущено
  something: undefined // как и это - пропущено
};

JSON.stringify(example); // {} (пустой объект)

// Вложенные объекты поддерживаются и конвертируются автоматически.
const meetup = {
  title: "Conference",
  room: {
    number: 23,
    participants: ["john", "ann"]
  }
};

const meetupJson = JSON.stringify(meetup); // "{"title":"Conference","room":{"number":23,"participants":["john","ann"]}}"

// Важное ограничение: не должно быть циклических ссылок.

// Чтобы декодировать JSON-строку, нам нужен другой метод с именем JSON.parse.

// строковый массив
let numbers = "[0, 1, 2, 3, 4, 5]";
numbers = JSON.parse(numbers); // [0, 1, 2, 3, 4, 5]

let userObj = '{ "name": "John", "age": 35, "isAdmin": false, "friends": [0,1,2,3] }';
userObj = JSON.parse(userObj); // {name: "John", age: 35, isAdmin: false, friends: Array(4)}

// Строка пришла с сервера... (проблема с парсингом даты)
let str = '{"title":"Conference","date":"2017-11-30T12:00:00.000Z"}';
let meetupStr = JSON.parse(str, function(key, value) {
  if (key == "date") return new Date(value);
  return value;
})
// {title: "Conference", date: Thu Nov 30 2017 15:00:00 GMT+0300 (Москва, стандартное время)}
// Это работает и для вложенных объектов:


// JSON – это формат данных, который имеет собственный независимый стандарт и библиотеки для большинства языков программирования.
// JSON поддерживает простые объекты, массивы, строки, числа, логические значения и null.
// JavaScript предоставляет методы JSON.stringify для сериализации в JSON и JSON.parse для чтения из JSON.
// Оба метода поддерживают функции преобразования для интеллектуального чтения/записи.
// Если объект имеет метод toJSON, то он вызывается через JSON.stringify.


// Глубокое копирование объектов

const customer = {
  name: "Kate",
  age: 38,
  isAdmin: false,
  country: {
    city: "Kaluga",
    street:"Azarovo"
  }
}

const cloneCustomer = JSON.parse(JSON.stringify(customer));
cloneCustomer.name = "Sergei"
cloneCustomer.age = 32;
console.log(customer);
console.log(cloneCustomer);

////////////////////////////////////////////////////////////
let userJS = {
  name: "Василий Иванович",
  age: 35,
  isAdmin: false,
};

userJS = JSON.stringify(userJS); // " {"name":"Василий Иванович","age":35,"isAdmin":false} "
let userJsToParse = JSON.parse(userJS); // {name: "Василий Иванович", age: 35, isAdmin: false}

///////

let roomJS = {
  number: 23
};

let meetupJS = {
  title: "Совещание",
  occupiedBy: [{name: "Иванов"}, {name: "Петров"}],
  place: roomJS,
};
// циклические ссылки
roomJS.occupiedBy = meetupJS; // {number: 23, occupiedBy: {…}}
meetupJS.self = meetupJS; // {title: "Совещание", occupiedBy: Array(2), place: {…}, self: {…}}

let result = JSON.stringify(meetupJS, function replacer(key, value) {
  return (key != "" && value == meetupJS) ? undefined : value;
});

result; // {"title":"Совещание","occupiedBy":[{"name":"Иванов"},{"name":"Петров"}],"place":{"number":23}}