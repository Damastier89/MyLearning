"use strict";
class Rectangle {
    constructor(height, width) {
        this.height = height;
        this.width = width;
    }

    calcArea() {
        return this.height * this.width;
    }
}

class ColorRectangleWithText extends Rectangle {
    constructor(height, width, text, bgColor) {
        super(height, width); // вызывает конструктор родителя
        this.text = text;
        this.bgColor = bgColor;
    }

    showMyProps() {
        console.log(`Текст : ${this.text}, цвет: ${this.bgColor}`);
    }
}

const squere = new Rectangle(10, 10);
const long = new Rectangle(100, 10);

const text = new ColorRectangleWithText(25, 25, 'hello', 'white');

console.log(text.showMyProps());
console.log(text.calcArea());

/* console.log(squere.calcArea());
console.log(long.calcArea()); */

//////////////////// Класс: базовый синтаксис ///////////////////

// В объектно-ориентированном программировании класс – это расширяемый шаблон кода для создания объектов, 
// который устанавливает в них начальные значения (свойства) и реализацию поведения (методы).

// Базовый синтаксис

class myClass {
  // properties (переменные)
  text;
  constructor() {}
  // methods
  method1 () {}
  method2 () {}
}

// Затем используйте вызов new MyClass() для создания нового объекта со всеми перечисленными методами.
// При этом автоматически вызывается метод constructor(), в нём мы можем инициализировать объект.

class User {
  constructor(name) {
    this.name = name;
  }

  sayHello() {
    console.log(`Hello ${this.name}`);
  }
}

const kate = new User("Kate");
kate.sayHello();

// Когда вызывается new User("Kate"):
// Создаётся новый объект.
// constructor запускается с заданным аргументом и сохраняет его в this.name.
// Затем можно вызывать на объекте методы, такие как user.sayHi().


// В JavaScript класс – это разновидность функции.
// console.log(typeof User); // function

// Вот что на самом деле делает конструкция class User {...}:

// Создаёт функцию с именем User, которая становится результатом объявления класса. 
// Код функции берётся из метода constructor (она будет пустой, если такого метода нет).
// Сохраняет все методы, такие как sayHello(), в User.prototype.
// При вызове метода объекта new User он будет взят из прототипа. 
// Таким образом, объекты new User имеют доступ к методам класса


// Не просто синтаксический сахар.
// Перепишем класс UserName на чистых функциях

// 1. Создаём функцию constructor
function UserName(name) {
  this.name = name;
};

// каждый прототип функции имеет свойство constructor по умолчанию,
// поэтому нам нет необходимости его создавать.

// 2. Добавляем метод в прототип
UserName.prototype.seyHi = function() {
  console.log(`Hello ${this.name}`);
}

// Использование:
const sergei = new UserName("Sergei");
sergei.seyHi(); // Hello Sergei


// Однако есть важные отличия:

// Во-первых, функция, созданная с помощью class, 
// помечена специальным внутренним свойством [[FunctionKind]]:"classConstructor". 
// Поэтому это не совсем то же самое, что создавать её вручную.

// В отличие от обычных функций, конструктор класса не может быть вызван без new:
// User(); //  TypeError: Class constructor User cannot be invoked without 'new'

// Строковое представление конструктора класса в большинстве движков JavaScript начинается с «class …»
// console.log(User); // class User {...}

// Методы класса являются неперечислимыми. Определение класса устанавливает флаг enumerable в false для всех методов в "prototype".
// И это хорошо, так как если мы проходимся циклом for..in по объекту, то обычно мы не хотим при этом получать методы класса.

// Классы всегда используют use strict. Весь код внутри класса автоматически находится в строгом режиме.


// Class Expression
// Как и функции, классы можно определять внутри другого выражения, передавать, возвращать, присваивать и т.д.

// Class Expression (по аналогии с Function Expression):
const Customer = class {
  seyHello() {
    console.log(`Hello`);
  }
};

// Аналогично Named Function Expression, Class Expression может иметь имя.
// Если у Class Expression есть имя, то оно видно только внутри класса:

// "Named Class Expression"
// (в спецификации нет такого термина, но происходящее похоже на Named Function Expression)
const userCustomer = class customerUser {
  sayHello() {
    console.log(customerUser);
  }
};

new userCustomer().sayHello(); // работает, выводит определение userCustomer
// console.log(customerUser); ReferenceError: customerUser is not defined

// Можно динамически создавать классы «по запросу»:

function makeClass(name) {
  // объявляем класс и возвращаем его
  return class {
    seyHello() {
      console.log(`Hello ${name}`);
    };
  };
};

// Создаём новый класс
const Admin = makeClass("Sergei");
new Admin().seyHello(); // Hello Sergei


// Геттеры/сеттеры, другие сокращения

class Admins {

  constructor(name) {
    // вызывает сеттер
    this.name = name;
  }

  get name() {
    return this._name;
  }

  set name(value) {
    if (value.length < 4) {
      console.log(`Имя слишком короткое...`);
      return;
    }
    this._name = value;
  }

  sayHello() {
    console.log(`Hello ${this.name}`);
  }

};

const newAdmin = new Admins("Maximus");
newAdmin.name; // Maximus
newAdmin.name = ""; // Имя слишком короткое...
newAdmin.sayHello(); // Hello Maximus


// Добавим свойство в класс:
class Anonimus {
  name = "Anonimus";

  seyHello() {
    console.log(`Hello ${this.name}`);
  };
};

const userAnonimus = new Anonimus();
userAnonimus.seyHello(); // Hello Anonimus

/////////////////////////////////////////////////
class Clock {
  constructor({ template }) {
    this.template = template;
  }

  render() {
    let date = new Date();

    let hours = date.getHours();
      if (hours < 10) {
        hours = "0" + hours;
      }

    let mins = date.getMinutes();
      if (mins < 10) {
        mins = "0" + mins;
      }
    
    let secs = date.getSeconds();
      if (secs < 10) {
        secs = "0" + secs;
      }  

    let output = this.template
      .replace("h", hours)
      .replace("m", mins)
      .replace("s", secs) 
      
    document.getElementById("clock").innerHTML = output;  
  }

  stop() {
    clearInterval(this.timer);
  }

  start() {
    this.render();
    this.timer = setInterval(() => this.render(), 1000);
  }
}

const clock = new Clock({ template: "h:m:s"});
clock.start();

const time = setInterval(function() {
  const date = new Date();
  document.getElementById("clock")
  .innerHTML = (date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds());
}, 1000);


////////////////// Наследование классов ///////////////////

// У нас есть два класса.
class Animal {
  constructor(name) {
    this.name = name;
    this.speed = 0;
  }

  run(speed) {
    this.speed = speed;
    console.log(`${this.name} бежит со скоростью ${this.speed} км/ч`);
  }

  stop() {
    this.speed = 0;
    console.log(`${this.name} стоит.`);
  }
};

const myAnimalCat = new Animal("Maximus");
myAnimalCat; // {name: 'Maximus', speed: 0}
myAnimalCat.run(3); // Maximus бежит со скоростью 3 км/ч
myAnimalCat.stop(); // Maximus стоит.

// Но мы хотим, чтобы Rabbit расширял Animal. Другими словами, кролики должны происходить от животных, 
// т.е. иметь доступ к методам Animal и расширять функциональность Animal своими методами.
// Для того, чтобы наследовать класс от другого, 
// нужно использовать ключевое слово "extends" и указать название родительского класса перед {..}
class Rabbit extends Animal {

  hide() {
    console.log(`${this.name} прячется!`);
  }

};

// Ключевое слово extends работает, используя прототипы. 
// Оно устанавливает Rabbit.prototype.[[Prototype]] в Animal.prototype. 
// Так что если метод не найден в Rabbit.prototype, JavaScript берёт его из Animal.prototype.

const myAnimalRabbit = new Rabbit("Krol");
myAnimalRabbit.run(5); // Krol бежит со скоростью 5 км/ч
myAnimalRabbit.hide(); // Krol прячется!


// Переопределение методов
// Сейчас Rabbit наследует от Animal метод stop, который устанавливает this.speed = 0.
// Если определить свой метод stop в классе Rabbit, то он будет использоваться взамен родительского:

// …Впрочем, обычно мы не хотим полностью заменить родительский метод, 
// а скорее хотим сделать новый на его основе, изменяя или расширяя его функциональность. 
// Мы делаем что-то в нашем методе и вызываем родительский метод до/после или в процессе.

// У классов есть ключевое слово "super" для таких случаев.

// super.method(...) вызывает родительский метод.
// super(...) вызывает родительский конструктор (работает только внутри нашего конструктора).

class LazyRabbit extends Animal {

  hide() {
    console.log(`${this.name} прячется...`);
  }

  stop() {
    super.stop(); // вызываем родительский метод stop
    this.hide(); // и затем hide
  }

  // У стрелочных функций нет super
  // При обращении к super стрелочной функции он берётся из внешней функции:

  stopInterval() {
    setTimeout(() => {
      super.stop();// вызывает родительский stop после 3 секунд
    }, 3000);
  }
};

// Теперь у класса lazyRabbit есть метод stop, который вызывает родительский super.stop() в процессе выполнения.
const myAnimalLazyRabbit = new LazyRabbit("Lazy Krol");
myAnimalLazyRabbit.run(1); // Lazy Krol бежит со скоростью 1 км/ч
myAnimalLazyRabbit.stop(); // Lazy Krol стоит. Lazy Krol прячется...
myAnimalLazyRabbit.stopInterval(); // вызывает родительский stop после 3 секунд


// Переопределение конструктора
// Согласно спецификации, если класс расширяет другой класс и не имеет конструктора, 
// то автоматически создаётся такой «пустой» конструктор:

// class Rabbit extends Animal {
//   // генерируется для классов-потомков, у которых нет своего конструктора
//   constructor(...args) {
//     super(...args);
//   }
// }

// В JavaScript существует различие между «функцией-конструктором наследующего класса» и всеми остальными. 
// В наследующем классе соответствующая функция-конструктор помечена специальным внутренним свойством [[ConstructorKind]]:"derived".

// Разница в следующем:

// Когда выполняется обычный конструктор, он создаёт пустой объект и присваивает его this .
// Когда запускается конструктор унаследованного класса, он этого не делает. Вместо этого он ждёт, что это сделает конструктор родительского класса.
// Поэтому, если мы создаём собственный конструктор, мы должны вызвать super, в противном случае объект для this не будет создан, и мы получим ошибку.

class MyAnimalSpeedyRabbit extends Animal {

  constructor(name, tailLength) {
    super(name);
    this.tailLength = tailLength;
  }

  stop() {
    super.stop(); // вызываем родительский метод stop
    console.log(`Это быстрого krola завут ${this.name}`);
  }
    
};

const myAnimalSpeedyRabbit = new MyAnimalSpeedyRabbit("Speedy Krol");
myAnimalSpeedyRabbit.name; // Speedy Krol
myAnimalSpeedyRabbit.stop(); // Speedy Krol стоит. Это быстрого krola завут Speedy Krol


///////////////////////////////////////////
class Clock {
  constructor({ template }) {
    this.template = template;
  }

  render() {
    let date = new Date();

    let hours = date.getHours();
    if (hours < 10) hours = '0' + hours;

    let mins = date.getMinutes();
    if (mins < 10) mins = '0' + mins;

    let secs = date.getSeconds();
    if (secs < 10) secs = '0' + secs;

    let output = this.template
      .replace('h', hours)
      .replace('m', mins)
      .replace('s', secs);

    console.log(output);
  }

  stop() {
    clearInterval(this.timer);
  }

  start() {
    this.render();
    this.timer = setInterval(() => this.render(), 1000);
  }
}

// const clock = new Clock({ template: "h.m.s"});
// clock.start();

class ExtendedClock extends Clock {
  constructor(options) {
    super(options);
    let { precision = 1000 } = options;
    this.precision = precision;
  }

  start() {
    this.render();
    this.timer = setInterval(() => this.render(), this.precision);
  }
};

const clock = new ExtendedClock({ template: 'h.m.s'});
clock.start();