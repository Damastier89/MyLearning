"use strict"

//////////////// Флаги и дескрипторы свойств /////////////////

// Флаги свойств
// Помимо значения value, свойства объекта имеют три специальных атрибута (так называемые «флаги»).

// writable – если true, свойство можно изменить, иначе оно только для чтения.
// enumerable – если true, свойство перечисляется в циклах, в противном случае циклы его игнорируют.
// configurable – если true, свойство можно удалить, а эти атрибуты можно изменять, иначе этого делать нельзя.

// let descriptor = Object.getOwnPropertyDescriptor(obj, propertyName);

// obj - Объект, из которого мы получаем информацию.
// propertyName - Имя свойства.
// Возвращаемое значение – это объект, так называемый «дескриптор свойства»: он содержит значение свойства и все его флаги.

const user = {
  name: "Kate",
}

let descriptorUser = Object.getOwnPropertyDescriptor(user, 'name');
JSON.stringify(descriptorUser, null, 2);
// дескриптор свойства:
// {
//   "value": "Kate", 
//   "writable": true, // доступная для записи
//   "enumerable": true, // перечислимая
//   "configurable": true // настраиваемая
// }

// Чтобы изменить флаги, можно использовать метод Object.defineProperty.
// Object.defineProperty(obj, propertyName, descriptor)

// Если свойство существует, defineProperty обновит его флаги. 
// В противном случае метод создаёт новое свойство с указанным значением и флагами; 
// если какой-либо флаг не указан явно, ему присваивается значение false.

const customer = {}; // {name: 'Sergei', age: 32}

Object.defineProperty(customer, "name", {
  value: "Sergei",
  "writable": true,
});

Object.defineProperty(customer, "age", {
  value: 32,
});

let descriptorCustomer = Object.getOwnPropertyDescriptor(customer, "age");
JSON.stringify(descriptorCustomer, null, 2);
// дескриптор свойства:
// {
//   "value": "Sergei",
//   "writable": false,
//   "enumerable": false,
//   "configurable": false
// }


// Только для чтения
// Сделаем свойство customer.name доступным только для чтения. Для этого изменим флаг writable:

Object.defineProperty(customer, "name", {
  "writable": false,
});

// Теперь никто не сможет изменить имя пользователя, 
// если только не обновит соответствующий флаг новым вызовом defineProperty.
// customer.name = "Kate"; // Cannot assign to read only property 'name' of object


// Неперечислимое свойство

// Встроенный метод toString в объектах – неперечислимый, его не видно в цикле for..in. 
// Но если написать свой собственный метод toString, цикл for..in будет выводить его по умолчанию:

const users = {
  name: "Max",
  toString () {
    return this.name;
  }
}

for (let key in users) {
  // console.log(key);
} // name , toString

Object.defineProperty(users , "toString", {
  "enumerable": false,
});

// Теперь свойство toString пропало из цикла:
for (let key in users) {
  // console.log(key);
} // name


// Неконфигурируемое свойство
// Флаг неконфигурируемого свойства (configurable:false) иногда предустановлен для некоторых встроенных объектов и свойств.
// Неконфигурируемое свойство не может быть удалено.
// Например, свойство Math.PI – только для чтения, неперечислимое и неконфигурируемое:

// Определение свойства как неконфигурируемого – это дорога в один конец. 
// Невозможно отменить это действие, потому что defineProperty не работает с неконфигурируемыми свойствами.

const foreverName = {};

Object.defineProperty(foreverName, "name" , {
  value: "Infinity",
  "enumerable": false,
  "configurable": false,
});

// теперь невозможно изменить foreverName.name или его флаги
// всё это не будет работать:
//   foreverName.name = "Pete"
//   delete foreverName.name
//   defineProperty(foreverName, "name", ...)
// Object.defineProperty(foreverName, "name", {writable: true}); // Cannot redefine property: name at Function.defineProperty


// Метод Object.defineProperties
// Существует метод Object.defineProperties(obj, descriptors), который позволяет определять множество свойств сразу.

const userName = {}; // {surname: 'Grand', name: 'Maximus'}

Object.defineProperties(userName, {
  name: {
    value: "Maximus",
    "writable": true,
    "enumerable": false,
    "configurable": false
  },
  surname: {
    value: "Grand",
    "writable": true,
    "enumerable": true,
    "configurable": false
  },
  // some properties...
});


// Object.getOwnPropertyDescriptors
// Чтобы получить все дескрипторы свойств сразу, 
// можно воспользоваться методом Object.getOwnPropertyDescriptors(obj).
// Вместе с Object.defineProperties этот метод можно использовать для клонирования объекта вместе с его флагами:

let clone = Object.defineProperties({}, Object.getOwnPropertyDescriptors(obj));

for (let key in user) {
  clone[key] = userName[key]
}