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
  
  let customers = {name: 'Sergei'};
  let admin = {name: 'Kate'};
  
  function sayHi() {
    console.log(`Hello`, this.name);
  }
  
  customers.foo = sayHi;
  admin.foo = sayHi;
  
  console.log(customers.foo());
  console.log(admin.foo());