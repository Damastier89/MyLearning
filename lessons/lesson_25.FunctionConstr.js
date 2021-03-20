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