"use strict";
/////////////////// Прототипное наследование /////////////////

// В программировании мы часто хотим взять что-то и расширить.

// Например, у нас есть объект user со своими свойствами и методами, 
// и мы хотим создать объекты admin и guest как его слегка изменённые варианты. 
// Мы хотели бы повторно использовать то, что есть у объекта user, не копировать/переопределять его методы, 
// а просто создать новый объект на его основе.

// Прототипное наследование — это возможность языка, которая помогает в этом.


// [[Prototype]]
// В JavaScript объекты имеют специальное скрытое свойство [[Prototype]] (так оно названо в спецификации), 
// которое либо равно null, либо ссылается на другой объект. Этот объект называется «прототип».

// Когда мы хотим прочитать свойство из object, а оно отсутствует, JavaScript автоматически берёт его из прототипа. 
// В программировании такой механизм называется «прототипным наследованием». 

// Свойство [[Prototype]] является внутренним и скрытым, но есть много способов задать его.
// Одним из них является использование __proto__.

const animal = {
  eats: true,
};

const rabbit = {
  jumps: true,
}; // {jumps: true}

rabbit._proto_ = animal;

rabbit; // {jumps: true, _proto_: {eats: true}}

// Свойство __proto__ — исторически обусловленный геттер/сеттер для [[Prototype]]
// Обратите внимание, что __proto__ — не то же самое, что [[Prototype]]. Это геттер/сеттер для него.

// Он существует по историческим причинам, 
// в современном языке его заменяют функции Object.getPrototypeOf/Object.setPrototypeOf, 
// которые также получают/устанавливают прототип.

// Если мы ищем свойство в rabbit, а оно отсутствует, JavaScript автоматически берёт его из animal.

// Здесь мы можем сказать, что "animal является прототипом rabbit" или "rabbit прототипно наследует от animal".

const human = {
  eats: true,
  walk() {
    console.log(`Human walk`);
  }
}

const child = {
  jumps: true,
  _proto_: human,
}

// walk взят из прототипа
child._proto_.walk; // Human walk

// Цепочка прототипов может быть длиннее.
const man = {
  work: true,
  _proto_: child,
}

// walk взят из прототипа
man._proto_._proto_.walk(); // Human walk
// true взят из child
man._proto_.jumps; // true


// Есть только два ограничения:

// Ссылки не могут идти по кругу. JavaScript выдаст ошибку.
// Значение __proto__ может быть объектом или null. Другие типы игнорируются.
// Может быть только один [[Prototype]]. Объект не может наследоваться от двух других объектов.


// Операция записи не использует прототип.
// Прототип используется только для чтения свойств.
// Операции записи/удаления работают напрямую с объектом.

man.work = function() {
  console.log(`Go to work!`);
}

// Теперь вызов man.walk() находит метод непосредственно в объекте и выполняет его, не используя прототип.
man.work(); // Go to work!

// Свойства-аксессоры – исключение, так как запись в него обрабатывается функцией-сеттером. 
// То есть, это, фактически, вызов функции.
const user = {
  name: "Sergei",
  surname: "Lantsev",

  get fullName() {
    return `${this.name} ${this.surname}`;
  },

  set fullName(value) {
    [this.name , this.surname] = value.split(" ");
  }
};

const admin = {
  _proto_: user,
  isAdmon: true,
}
// get fullname
admin._proto_.fullName; // Sergei Lantsev
// set fullname
admin._proto_.fullName = "Kate Lantseva"; // Kate Lantseva


// Значение «this»

// Прототипы никак не влияют на this.
// Неважно, где находится метод: в объекте или его прототипе. 
// При вызове метода this — всегда объект перед точкой.

const animals = {

  walk() {
    if (!this.isSleeping) {
      console.log(`I walk...`);
    }
  },

  sleep() {
    this.isSleeping = true;
    console.log(this.isSleeping);
  },

};

let rabbits = {
  name: "White Rabbit",
  // _proto_: animals,
}

Object.setPrototypeOf(rabbits , animals) // Назначить прототип для rabbits

console.log(rabbits);
// { 
//   name: "White Rabbit"
//     [[Prototype]]: Object
//       sleep: ƒ sleep()
//       walk: ƒ walk()
// }       
rabbits.walk(); // I walk...
rabbits.sleep();  // this.isSleeping = true

// Если бы у нас были другие объекты, такие как bird, snake и т.д., 
// унаследованные от animals, они также получили бы доступ к методам animals. 
// Но this при вызове каждого метода будет соответствовать объекту (перед точкой), 
// на котором происходит вызов, а не animals. Поэтому, когда мы записываем данные в this, 
// они сохраняются в этих объектах.

// В результате методы являются общими, а состояние объекта — нет.


// Цикл for…in
// Цикл for..in проходит не только по собственным, но и по унаследованным свойствам объекта.

// Object.keys возвращает только собственные ключи
console.log(Object.keys(rabbits)); // name, isSleeping

// for..in проходит и по своим, и по унаследованным ключам
for (let keys in rabbits) {
  console.log(keys); // name, isSleeping, walk, sleep
}

// Если унаследованные свойства нам не нужны, 
// то мы можем отфильтровать их при помощи встроенного метода obj.hasOwnProperty(key): он возвращает true, 
// если у obj есть собственное, не унаследованное, свойство с именем key.

for (let properties in rabbits) {
  let isOwn = rabbits.hasOwnProperty(properties);

  if (isOwn) {
    console.log(`Our : ${properties}`); // name, isSleeping
  } else {
    console.log(`Inherited : ${properties}`); // унаследованное walk, sleep
  }
}
// Object.prototype.hasOwnProperty. То есть, он унаследован.

// В JavaScript все объекты имеют скрытое свойство [[Prototype]], 
// которое является либо другим объектом, либо null.

// Мы можем использовать obj.__proto__ для доступа к нему (исторически обусловленный геттер/сеттер).
// Объект, на который ссылается [[Prototype]], называется «прототипом».
// Если мы хотим прочитать свойство obj или вызвать метод, которого не существует у obj, 
// тогда JavaScript попытается найти его в прототипе.

// Операции записи/удаления работают непосредственно с объектом, 
// они не используют прототип (если это обычное свойство, а не сеттер).

// Если мы вызываем obj.method(), а метод при этом взят из прототипа, то this всё равно ссылается на obj. 
// Таким образом, методы всегда работают с текущим объектом, даже если они наследуются.
// Цикл for..in перебирает как свои, так и унаследованные свойства. 
// Остальные методы получения ключей/значений работают только с собственными свойствами объекта.


//////////////////////////////////////////////////
const badAnimals = {
  jumps: null,
}

const badHamster = {
  jumps: true,
  _proto_: badAnimals,
}

badHamster.jumps; // true
delete badHamster.jumps; // удалено
badHamster.jumps; // null
delete badAnimals.jumps; // удалено
badHamster.jumps; // undefined

///////
let head = {
  glasses: 1,
};

let table = {
  pen: 3,
  __proto__: head,
};

let bed = {
  sheet: 1,
  pillow: 2,
  __proto__: table,
};

let pockets = {
  money: 2000,
  __proto__: bed,
};

console.log(pockets.pen); // 3
console.log(bed.glasses); // 1
console.log(table.money); // undefined

///////
let hamster = {
  stomach: [],

  eat(food) {
    this.stomach.push(food);
  }
};

let speedy = {
  stomach: [],
  __proto__: hamster
};

let lazy = {
  stomach: [],
  __proto__: hamster
};

speedy.eat("apple");
speedy.eat("banana");
lazy.eat("tomato")

speedy.stomach;// ['apple', 'banana']
lazy.stomach; // ['tomato']


/////////////////////// Function.prototype //////////////////////

// Если в F.prototype содержится объект, 
// оператор new устанавливает его в качестве [[Prototype]] для нового объекта.

// F.prototype означает обычное свойство с именем "prototype" для F. 
// Это ещё не «прототип объекта», а обычное свойство F с таким именем.

const animal = {
  eats: true,
}

function Rabbit(name) {
  this.name = name;
}

Rabbit.prototype = animal;

const rabbit = new Rabbit("Black Rabbit"); // //  rabbit.__proto__ == animal

rabbit.eats; // true

// Установка Rabbit.prototype = animal буквально говорит интерпретатору следующее: 
// "При создании объекта через new Rabbit() запиши ему animal в [[Prototype]]".


// Function.prototype по умолчанию, свойство constructor
// У каждой функции по умолчанию уже есть свойство "prototype".
// По умолчанию "prototype" – объект с единственным свойством constructor, которое ссылается на функцию-конструктор.

function Animal() {
  /* прототип по умолчанию
      Animal.prototype = { constructor: Animal };
*/
}

Animal.prototype.constructor == Animal; // true

// Соответственно, если мы ничего не меняем, то свойство constructor будет доступно всем через [[Prototype]]:
const animals = new Animal();

animals.constructor == Animal; // true

function Human(name) {
  this.name = name;
  console.log(name);
}

const human = new Human("Max");
const woman = human.constructor("Kate");


// Это удобно, когда у нас есть объект, но мы не знаем, 
// какой конструктор использовался для его создания (например, он мог быть взят из сторонней библиотеки), 
// а нам необходимо создать ещё один такой объект.
// Но, пожалуй, самое важное о свойстве "constructor" это то, что…
// …JavaScript сам по себе не гарантирует правильное значение свойства "constructor".
// Да, оно является свойством по умолчанию в "prototype" у функций, но что случится с ним позже – зависит только от нас.
// В частности, если мы заменим прототип по умолчанию на другой объект, то свойства "constructor" в нём не будет.

function Women() {}
Women.prototype = {
  jumps: true
};

let women = new Women();
women.constructor === Women; // false

// Таким образом, чтобы сохранить верное свойство "constructor", мы должны добавлять/удалять/изменять 
// свойства у прототипа по умолчанию вместо того, чтобы перезаписывать его целиком.
function Children() {};

// Не перезаписываем Children.prototype полностью, а добавляем к нему свойство.
Children.prototype.jumps = true;

// Прототип по умолчанию сохраняется, и мы всё ещё имеем доступ к Children.prototype.constructor.

// Свойство F.prototype (не путать с [[Prototype]]) устанавливает[[Prototype]] для новых объектов при вызове new F().
// Значение F.prototype должно быть либо объектом, либо null. Другие значения не будут работать.
// Свойство "prototype" является особым, только когда оно назначено функции-конструктору, которая вызывается оператором new.

// В обычных объектах prototype не является чем-то особенным:
let user = {
  name: "John",
  prototype: "Bla-bla" // никакой магии нет - обычное свойство
};


////////////////// Встроенные прототипы ////////////////////

// Свойство "prototype" широко используется внутри самого языка JavaScript. 
// Все встроенные функции-конструкторы используют его.

// Таким образом, когда вызывается obj.toString(), метод берётся из Object.prototype.

// Другие встроенные объекты, такие как Array, Date, Function и другие, также хранят свои методы в прототипах.
// Например, при создании массива [1, 2, 3] внутренне используется конструктор массива Array. 
// Поэтому прототипом массива становится Array.prototype, 
// предоставляя ему свои методы. Это позволяет эффективно использовать память.

// Согласно спецификации, наверху иерархии встроенных прототипов находится Object.prototype. 
// Поэтому иногда говорят, что «всё наследует от объектов».

let arr = [1, 2, 3];

// наследует ли от Array.prototype?
arr.__proto__ === Array.prototype; // true

// затем наследует ли от Object.prototype?
arr.__proto__.__proto__ === Object.prototype; // true

// и null на вершине иерархии
arr.__proto__.__proto__.__proto__; // null

// У Object.prototype есть свой метод toString, но так как Array.prototype ближе в цепочке прототипов, 
// то берётся именно вариант для массивов.

// Другие встроенные объекты устроены аналогично. Даже функции – они объекты встроенного конструктора Function, 
// и все их методы (call/apply и другие) берутся из Function.prototype. 
// Также у функций есть свой метод toString.


// Примитивы
// Самое сложное происходит со строками, числами и булевыми значениями.

// Как мы помним, они не объекты. Но если мы попытаемся получить доступ к их свойствам, 
// то тогда будет создан временный объект-обёртка с использованием встроенных конструкторов String, Number и Boolean, 
// который предоставит методы и после этого исчезнет.

// Эти объекты создаются невидимо для нас, и большая часть движков оптимизирует этот процесс, 
// но спецификация описывает это именно таким образом. Методы этих объектов также находятся в прототипах, 
// доступных как String.prototype, Number.prototype и Boolean.prototype.

// Изменение встроенных прототипов считается плохой идеей.
String.prototype.show = function() {
  console.log(this + ' xa-xa-xa');
};

"Boom".show();
"Warrrr".show();

// Все встроенные объекты следуют одному шаблону:
// Методы хранятся в прототипах (Array.prototype, Object.prototype, Date.prototype и т.д.).
// Сами объекты хранят только данные (элементы массивов, свойства объектов, даты).
// Примитивы также хранят свои методы в прототипах объектов-обёрток: 
// Number.prototype, String.prototype, Boolean.prototype. 
// Только у значений undefined и null нет объектов-обёрток.
// Встроенные прототипы могут быть изменены или дополнены новыми методами. 
// Но не рекомендуется менять их. Единственная допустимая причина – это добавление нового метода из стандарта, 
// который ещё не поддерживается движком JavaScript.

///////////////////////////////////////////////

Function.prototype.defer = function(ms) {
  setTimeout(this, ms)
};

function f() {
  console.log("Hello!");
}

f.defer(5000);

///////
Function.prototype.defers = function(ms) {
  let f = this;
  return function(...args) {
    setTimeout(() => f.apply(this, args), ms);
  }
};

// check it
function foo(a, b) {
  console.log( a + b );
}

foo.defers(3000)(1, 2); // выведет 3 через 1 секунду.


/////////////// Методы прототипов, объекты без свойства __proto__ ///////////////

// Свойство __proto__ считается устаревшим, и по стандарту оно должно поддерживаться только браузерами.

// Современные методы это:

// Object.create(proto, [descriptors]) – создаёт пустой объект со свойством [[Prototype]], 
// указанным как proto, и необязательными дескрипторами свойств descriptors.
// Object.getPrototypeOf(obj) – возвращает свойство [[Prototype]] объекта obj.
// Object.setPrototypeOf(obj, proto) – устанавливает свойство [[Prototype]] объекта obj как proto.

// Эти методы нужно использовать вместо __proto__.

const animal = {
  eats: true,
};

const bird = Object.create(animal); // создаём новый объект с прототипом animal
bird.eats; // true

// получаем прототип объекта bird.
Object.getPrototypeOf(bird) === animal; // true

// заменяем прототип объекта bird на {}
Object.setPrototypeOf(bird, {});
Object.getPrototypeOf(bird) === animal; // false

// У Object.create есть необязательный второй аргумент: дескрипторы свойств. 
// Мы можем добавить дополнительное свойство новому объекту таким образом:

const human = {
  eats: true,
};

const child = Object.create(human, {
  jumps: {
    value: true,
  }
});

child.jumps; // true

// Можно использовать Object.create для «продвинутого» клонирования объекта, 
// более мощного, чем копирование свойств в цикле for..in:
// let clone = Object.create(Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj));

const user = {
  name: "Kate",
  age: 38,
  isAdmin: false,
}

const customer = Object.create(
  Object.getPrototypeOf(user), Object.getOwnPropertyDescriptors(user)
); // Такой вызов создаёт точную копию объекта user, включая все свойства: 
// перечисляемые и неперечисляемые, геттеры/сеттеры для свойств – и всё это с правильным свойством [[Prototype]].

customer; // {name: 'Kate', age: 38, isAdmin: false}
customer.isAdmin = true;
user; // {name: 'Kate', age: 38, isAdmin: false}
customer; // {name: 'Kate', age: 38, isAdmin: true}

// На данный момент это пофиксили в браузерах. Добавить __proto__ сейчас нельзя.
// const db = {}
// const question = prompt(`How many?`, "__proto__");

// db.question = "some value";
// db.question = question; // "__proto__"

// console.log(db);

//////////////////////////////////////////

const dictionary = Object.create(null, {
  toString: { // определяем свойство toString
    value() { // значение - это функция
      return Object.keys(this).join();
    }
  }
});
console.log(dictionary);

// dictionary.toString = function() {
//   console.log(`Method - toStrong`);
// }
// добавляем немного данных
dictionary.apply = "Apply";
dictionary.__proto__ = "test" // здесь __proto__ - это обычный ключ

for(let key in dictionary) {
  console.log(key); // apply, __proto__
}

// Когда мы создаём свойство с помощью дескриптора, все флаги по умолчанию имеют значение false. 
// Таким образом, в коде выше dictionary.toString – неперечисляемое свойство.

///////
function CreateUser(name) {
  this.name = name;
}

CreateUser.prototype.sayHello = function() {
  console.log(`Hello ${this.name}`);
}

const userOne = new CreateUser("Kate"); 
userOne.sayHello(); // Hello Kate

const userTwo = new CreateUser("Sergei");
userTwo.sayHello(); // Hello Sergei

CreateUser.prototype.sayHello(); // Hello undefined
Object.getPrototypeOf(userOne).sayHello(); // Hello undefined
userOne.__proto__.sayHello(); // Hello undefined

// В первых вызовах this == CreateUser, во всех остальных this равен CreateUser.prototype, так как это объект перед точкой.
// Так что только первый вызов выведет CreateUser, а остальные – undefined.