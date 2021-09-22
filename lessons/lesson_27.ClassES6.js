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