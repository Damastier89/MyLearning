"use strict";
// 1) обычная функция: this -> window bat 'use strict' this -> undefined
function showThis(a, b) {
    console.log(this);

    function sum() {
        console.log(this);
        return a + b;
    }
    console.log(sum());
}
showThis(4, 5);

// 2) this in objeck -> always this objeck!!!
//Если вызвать функцию внутри метода, то контекст потеряется.
const obj = {
    a: 20,
    b: 25,
    sum: function () {
        function shout() {
            console.log(this);
        }
        shout();
    }
};

obj.sum();

// 3) this в конструкторах и классах ссылается на только что созданный новый объект.

function User(name, age) {
    this.name = name;
    this.age = age;
    this.human = true;
    this.hello = function () {
        console.log(`Hello ${this.name}`);
    };
}

let sergei = new User('Sergei', 31);

function sayName(surname) {
    console.log(this);
    console.log(this.name + surname);
}

const user = {
    name: 'Sergei',
};

sayName.call(user, ' Lantsev');
sayName.apply(user, [' Lantsev']);

function count(num) {
    return this * num;
}

const double = count.bind(2); // this это 2
// теперь double это функция
console.log(double(3));
console.log(double(33));
console.log(double(333));

const btn = document.querySelector('.add');

btn.addEventListener('click', function () {
    console.log(this);
});

const objeckt = {
    num: 5,
    sayNumber: function () {
        const say = () => {
            console.log(this);
        };
        say();
    }
};

objeckt.sayNumber();

const user = {
    name: 'Sergei',
    age: 32,
    sayHello() {
      console.log(`Hello `, this.name, user.name);
    },
  }
  user.sayHello();
  
// Значение this вычисляется во время выполнения кода и зависит от контекста.

const user = {
  name: 'Sergei',
  age: 32,
  sayHello() {
    console.log(`Hello `, this.name, user.name);
  },
}
user.sayHello();

let customers = {name: 'Sergei'};
let admin = {name: 'Kate'};

function sayHi() {
  console.log(`Hello`, this.name);
}

customers.foo = sayHi;
admin.foo = sayHi;

console.log(customers.foo());
console.log(admin.foo());

const user = {
  name: 'Max',
  age: 30,
  hello() {
    console.log(`hello `, this.name);
  }
}

user.hello();

const costomer = Object.create(user);
costomer.name = 'Kate';
costomer.age = 25;
costomer.hello();

// Привязывает контекст обьекта user
const newUser = { name: "Sergei"};
newUser.hello = user.hello.bind(user);

console.log(newUser.hello());

const calculator = {
  read() {
    this.a = +prompt('Введите значение первого аргумента', '');
    this.b = +prompt('Введите значение второго аргумента', '');
  },
  sum() {
    return this.a + this.b;
  },
  mult() {
    return this.a * this.b;
  },
};

calculator.read(); 
console.log(calculator.sum());
console.log(calculator.mult());

const math = {};
math.sum = calculator.sum();
math.mult = calculator.mult();
console.log(`math`, math);

const newMath = Object.create(calculator);
newMath.read();
newMath.sum = newMath.sum();
newMath.mult = newMath.mult();
console.log(`newMath`, newMath);

// Для последовательных вызовов нужен return
const ladder = {
  step: 0,
  up() {
    this.step++;
    return this;
  },
  down() {
    this.step--;
    return this;
  },
  showStep: function() {
    console.log(`Steps -`, this.step);
    return this;
  }
}

let count = ladder.up().up().up().up().down().showStep()
