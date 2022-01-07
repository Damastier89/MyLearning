"use strict";
///////////////// Proxy и Reflect ////////////////
// Объект Proxy «оборачивается» вокруг другого объекта и может перехватывать (и, при желании, самостоятельно обрабатывать) 
// разные действия с ним, например чтение/запись свойств и другие.

// let proxy = new Proxy(target, handler);

// target – это объект, для которого нужно сделать прокси, может быть чем угодно, включая функции.
// handler – конфигурация прокси: объект с «ловушками» («traps»): методами, которые перехватывают разные операции, 
// например, ловушка get – для чтения свойства из target, ловушка set – для записи свойства в target и так далее.

// При операциях над proxy, если в handler имеется соответствующая «ловушка», то она срабатывает, 
// и прокси имеет возможность по-своему обработать её, иначе операция будет совершена над оригинальным объектом target.

let target = {};
let proxy = new Proxy(target, {}); // пустой handler

proxy.test = 5; // записываем в прокси (1)
console.log(target); // { test: 5 }
console.log(target.test); // 5, появилось в target!
console.log(proxy.test);  // 5, мы также можем прочитать его из прокси (2)

for (let key in proxy) {
  console.log(key); // test, итерация работает (3)
};

// Так как нет ловушек, то все операции на proxy применяются к оригинальному объекту target.
// Запись свойства proxy.test= устанавливает значение на target.
// Чтение свойства proxy.test возвращает значение из target.
// Итерация по proxy возвращает значения из target.

// Как мы видим, без ловушек proxy является прозрачной обёрткой над target.
// Proxy – это особый, «экзотический», объект, у него нет собственных свойств. 
// С пустым handler он просто перенаправляет все операции на target.

// Для большинства действий с объектами в спецификации JavaScript есть так называемый «внутренний метод», 
// который на самом низком уровне описывает, как его выполнять. Например, [[Get]] – внутренний метод для чтения свойства, 
// [[Set]] – для записи свойства, и так далее. Эти методы используются только в спецификации, 
// мы не можем обратиться напрямую к ним по имени.
// Ловушки как раз перехватывают вызовы этих внутренних методов.


// Для каждого внутреннего метода в этой таблице указана ловушка, то есть имя метода, 
// который мы можем добавить в параметр handler при создании new Proxy, чтобы перехватывать данную операцию:

// Внутренний метод	    Ловушка	                     Что вызывает
// [[Get]]	              get	                       чтение свойства
// [[Set]]	              set	                       запись свойства
// [[HasProperty]]	      has	                       оператор in
// [[Delete]]	            deleteProperty	           оператор delete
// [[Call]]	              apply	                     вызов функции
// [[Construct]]	        construct	                 оператор new
// [[GetPrototypeOf]]	    getPrototypeOf	           Object.getPrototypeOf
// [[SetPrototypeOf]]	    setPrototypeOf	           Object.setPrototypeOf
// [[IsExtensible]]	      isExtensible	             Object.isExtensible
// [[PreventExtensions]]	preventExtensions	         Object.preventExtensions
// [[DefineOwnProperty]]	defineProperty	           Object.defineProperty, Object.defineProperties
// [[GetOwnProperty]]	    getOwnPropertyDescriptor	 Object.getOwnPropertyDescriptor, for..in, Object.keys/values/entries
// [[OwnPropertyKeys]]	  ownKeys	                   Object.getOwnPropertyNames, Object.getOwnPropertySymbols, for..in, Object.keys/values/entries


// Значение по умолчанию с ловушкой «get»
// Чаще всего используются ловушки на чтение/запись свойств.
// Чтобы перехватить операцию чтения, handler должен иметь метод get(target, property, receiver).

// Он срабатывает при попытке прочитать свойство объекта, с аргументами:

// target – это оригинальный объект, который передавался первым аргументом в конструктор new Proxy,
// property – имя свойства,
// receiver – если свойство объекта является геттером, то receiver – это объект, 
// который будет использован как this при его вызове. Обычно это сам объект прокси (или наследующий от него объект). 

// Давайте применим ловушку get, чтобы реализовать «значения по умолчанию» для свойств объекта.
// Например, сделаем числовой массив, так чтобы при чтении из него несуществующего элемента возвращался 0.
// Обычно при чтении из массива несуществующего свойства возвращается undefined, 
// но мы обернём обычный массив в прокси, который перехватывает операцию чтения свойства из массива и возвращает 0, если такого элемента нет:

let numbersExemple = [0, 1, 2];

numbersExemple = new Proxy(numbersExemple, {
  get(target, properties) {
    if (properties in target) {
      return target[properties];
    } else {
      return 0; // значение по умолчанию
    }
  }
})

console.log(`numbersExemple[1] : `, numbersExemple[1]); // есть такое свойство 1
console.log(`numbersExemple[111] : `, numbersExemple[111]); // нет такого свойства 0

////////////////// Exemple ///////////////////
let btn = document.querySelector('#btn');
let phraseToDiv = document.querySelector('#phrase');

let dictionary = {
  'Hola':'Привет',
  'Adiós':'Пока',
};

dictionary = new Proxy(dictionary , {
  get(target, phrase) { // перехватываем чтение свойства в dictionary
    if (phrase in target) { // если перевод для фразы есть в словаре
      return `Перевод вашего слова - "${target[phrase]}"`; // возвращаем его
    } else {
      return `Для "${phrase}" нет перевода, извените`; // иначе возвращаем непереведённую фразу
    }
  },
});

btn.addEventListener('click', () => {
  let inputValue = document.querySelector('.dictionary').value;
  addPraseToHtml(dictionary[`${inputValue}`])
});

function addPraseToHtml(phrase) {
  let div = document.createElement(`div`);
  div.innerHTML = phrase;
  phraseToDiv.append(div);
}
/////////////////////////////////////////////////

// Валидация с ловушкой «set»
// Допустим, мы хотим сделать массив исключительно для чисел. 
// Если в него добавляется значение иного типа, то это должно приводить к ошибке.
// Ловушка set срабатывает, когда происходит запись свойства.

// set(target, property, value, receiver):
// target – это оригинальный объект, который передавался первым аргументом в конструктор new Proxy,
// property – имя свойства,
// value – значение свойства,
// receiver – аналогично ловушке get, этот аргумент имеет значение, только если свойство – сеттер.
// Ловушка set должна вернуть true, если запись прошла успешно, и false в противном случае (будет сгенерирована ошибка TypeError).

let numbers = [];

numbers = new Proxy(numbers, { // (*)
  set(target, properties, value) { // для перехвата записи свойства
    if ( typeof value == "number") {
      target[properties] = value;
      return true; // Для set реализация ловушки должна возвращать true в случае успешной записи свойства.
    } else {
      return false;
    }
  },
});

numbers.push(1); // добавилось успешно 
numbers.push(2); // добавилось успешно
numbers.push(3); // добавилось успешно
numbers.push(4); // добавилось успешно
numbers.push(5); // добавилось успешно

// console.log(numbers.push('test')); // TypeError: 'set' on proxy: trap returned falsish for property '5'

console.log(`Длина массива numbers ${numbers.length}`); // Длина массива numbers 5
console.log(`numbers : `, numbers); // numbers :  Proxy {0: 1, 1: 2, 2: 3, 3: 4, 4: 5}

// Обратите внимание, что встроенная функциональность массива по-прежнему работает! 
// Значения добавляются методом push. Свойство length при этом увеличивается. Наш прокси ничего не ломает


////////////////////  Reflect //////////////////
// Reflect – встроенный объект, упрощающий создание прокси.
// Ранее мы говорили о том, что внутренние методы, такие как [[Get]], [[Set]] и другие, 
// существуют только в спецификации, что к ним нельзя обратиться напрямую.
// Объект Reflect делает это возможным. Его методы – минимальные обёртки вокруг внутренних методов.
// Вот примеры операций и вызовы Reflect, которые делают то же самое:

// Операция	                Вызов Reflect	               Внутренний метод
// obj[prop]	          Reflect.get(obj, prop)	            [[Get]]
// obj[prop] = value	  Reflect.set(obj, prop, value)	      [[Set]]
// delete obj[prop]	    Reflect.deleteProperty(obj, prop)	  [[Delete]]
// new F(value)	        Reflect.construct(F, value)	        [[Construct]]

let user = {};

Reflect.set(user, "name", "Sergei");

console.log(user.name); // Sergei

// Для каждого внутреннего метода, перехватываемого Proxy, 
// есть соответствующий метод в Reflect, который имеет такое же имя и те же аргументы, 
// что и у ловушки Proxy.

let costumer = {
  name: 'Sergei',
};

costumer = new Proxy(costumer, {
  get(target, properties, receiver) {
    console.log(`GET : `, `${properties}`);
    return Reflect.get(target, properties, receiver); // 1
  },
  set(target, properties, value, receiver) {
    console.log(`SET : `, `${properties} = ${value}`);
    return Reflect.set(target, properties, value, receiver); // 2
  }
});

let name = costumer.name; // GET :  name
costumer.name = 'Kate'; // SET :  name = Kate

// 1) Reflect.get читает свойство объекта.
// 2) Reflect.set записывает свойство и возвращает true при успехе, иначе false.

// let count = 0;

// setTimeout(() => {
//   window.location.reload();
//   for (let i = 1; i > count; i++) {
//     count += i
//     console.log(count);
//   }
  
// }, 5000);

// let www {
//   'url': url
// }
