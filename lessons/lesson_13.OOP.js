"use strict";

let str = "some";
let strObj = new String(str);

console.log(typeof (str)); // string
console.log(typeof (strObj)); // object

function CreateSoldiers(health, armor) {
    this.health = health;
    this.armor = armor;
    /* this.sayHello = function (name) {
        return `Hello ${name}`;
    }; */
}

CreateSoldiers.prototype.sayHello = function (name) {
    return `Hello ${name}`;
};

const soldier = new CreateSoldiers(500, 100);
const max = new CreateSoldiers(100, 50);
console.log(soldier);
console.log(soldier.sayHello('Den'));
console.log(max.sayHello('Sergei'));


const soldierOne = {
    health: 500,
    armor: 150,
    seyHello: function () {
        console.log('Hello');
    }
};

const maxOne = {
    health: 100
};
Object.setPrototypeOf(maxOne, soldierOne); // установить прототип
maxOne.seyHello();

const newMax = Object.create(soldierOne);

newMax.seyHello();


// Связывание обьектов через __proto__
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
  
  console.log(speedy.stomach);
  console.log(lazy.stomach); 