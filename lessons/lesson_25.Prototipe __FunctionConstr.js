"use strict";

function User(name, id) {
    this.name = name;
    this.id = id;
    this.human = true;
    this.hello = function () {
        console.log(`Hello ${this.name}`);
    };
}

User.prototype.exit = function () {
    console.log(`Пользователь ${this.name} вышел`);
};

class Users {
    constructor(name, id) {
        this.name = name;
        this.id = id;
        this.human = true;
    }
    hello() {
        console.log(`Hello ${this.name}`);
    }
    exit() {
        console.log(`Пользователь ${this.name} вышел`);
    }
}

const sergei = new User('Sergei', 1);
const elena = new User('Elena', 2);

console.log(sergei);
console.log(elena);

const olga = new Users('Olga', 3);

console.log(olga);
console.log(olga.exit());

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

console.log(pockets.pen);
console.log(bed.glasses);
console.log(table.glasses);

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

console.log(speedy.stomach);// apple
console.log(lazy.stomach); // ------

let animal = {
  eats: true,
  sayHello: function() {
    return console.log(`Hello ` + this.name);
  }
};

function Rabbit (name) {
  this.name = name;
}

console.log(Rabbit.prototype.constructor == Rabbit); // true

let greenRabbit = new Rabbit(`Green Rabbit`);
// Соответственно, если мы ничего не меняем, 
// то свойство constructor будет доступно всем кроликам через [[Prototype]]:
console.log(greenRabbit.constructor == Rabbit); // true

Rabbit.prototype = animal;

Rabbit.prototype.seyHello = function() {
  return console.log(`Hello ` + this.name);
};

let rabbit = new Rabbit('White Rabbit');
console.log(rabbit.name);
console.log(rabbit.eats);
console.log(rabbit.sayHello());

let blackRabbit = new Rabbit(`Black Rabbit`);
console.log(blackRabbit.sayHello());
console.log(blackRabbit.name);
console.log(blackRabbit.eats);


String.prototype.show = function() {
  console.log(this + ' xa-xa-xa');
};

"Boom".show();
"Warrrr".show();

Function.prototype.defer = function(ms) {
  setTimeout(this, ms)
};

function f() {
  alert("Hello!");
}

f.defer(5000);

///////// Function constructor ////////
function User(name) {
  this.name = name;
  this.isMarred = false;

  this.SayHello = function() {
    console.log(`My name is`, this.name);
  }
}

const woman = new User('Kate');
console.log(woman);
console.log(woman.SayHello());

const man = new User('Sergei');
console.log(man.SayHello());

// Если функция возвращает объект, 
// то вместо this будет возвращён этот объект.

const obj = {};

function A() { return obj;}
function B() { return obj;}

console.log(new A == new B);

function Calculator() {

  this.read = function() {
    this.a = +prompt(`a?`, 0);
    this.b = +prompt(`b?`, 0);
  }

  this.sum = function() {
    return this.a + this.b;
  }
  this.mult = function() {
    return this.a * this.b;
  }
}

let calculator = new Calculator();
calculator.read();
console.log(`Sum = `,calculator.sum());

function Accumulator(startingValue) {
  // Храним «текущее значение» в свойстве value. 
  // Начальное значение устанавливается в аргументе конструктора startingValue.
  this.value = startingValue; 
  
  //Метод read() использует prompt для получения числа и прибавляет его к свойству value.
  this.read = function() {
    this.value = this.value * +prompt(`Сколько нужно добавить?`, 0);
    return this; // return - для цепочки вызовов.
  };
}

const accum = new Accumulator(100);
accum.read().read().read();
console.log(accum.value);