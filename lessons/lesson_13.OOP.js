"use strict";

let str = "some";
let strObj = new String(str);

console.log(typeof (str));
console.log(typeof (strObj));

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

/* const maxOne = {
    health: 100
};
Object.setPrototypeOf(maxOne, soldierOne);
maxOne.seyHello(); */

const newMax = Object.create(soldierOne);

newMax.seyHello();