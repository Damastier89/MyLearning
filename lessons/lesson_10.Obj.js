"use strict";

const options = {
    name: 'test',
    width: 1024,
    height: 1024,
    colors: {
        border: 'black',
        bg: 'red'
    },
    makeTest: function (name) {
        return `Hi ${name}`;
    }
};

console.log(options.makeTest('Sergey'));

let {
    title = "Меню", width, height, colors: {
        border,
        bg
    }
} = options;
console.log(title);
console.log(width);
console.log(height);
console.log(border);
console.log(bg);
console.log(options);

console.log(Object.keys(options).length);


delete options.name;
console.log(options);
let counter = 0;
for (let key in options) {
    if (typeof (options[key]) === 'object') {
        for (let i in options[key]) {
            console.log(`Properties ${i} have value ${options[key][i]}`);
            counter++;
        }
    } else {
        console.log(`Properties ${key} have value ${options[key]}`);
        counter++;
    }
}
console.log(counter);

let user = {
    firstName: 'Sergey',
    lastName: 'Lantcev',

    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    },
    set fullName(value) {
        [this.firstName, this.lastName] = value.split(' ');
    }
};

console.log(user);
console.log(user.fullName);
console.log(user.fullName = 'Alisa Back');
console.log(user);

/* Геттеры/сеттеры можно использовать как обёртки над «реальными» значениями свойств, чтобы получить больше контроля над операциями с ними.
Например, если мы хотим запретить устанавливать короткое имя для user, мы можем использовать сеттер name для проверки, а само значение хранить в отдельном свойстве _name: */

let users = {
    get name() {
        return this._name;
    },

    set name(value) {
        if (value.length < 4) {
            alert("Имя слишком короткое, должно быть более 4 символов");
            return;
        }
        this._name = value;
    }
};

user.name = "Pete";
console.log(user.name);