'use strict';

// В реализации большинства языков программирования (C++, C#, Java и другие), 
// обеспечивает механизм сокрытия, позволяющий разграничивать доступ к различным компонентам программы.

// Обьект хранит своё состояние в приватном порядке, и только методы обьекта имеют
// доступ для его изменений.

function User(name, age) {
  this.name = name;
  this.age = age;

  this.say = function() {
    console.log(`Имя пользователя: ${this.name}, возраст: ${this.age}`);
  }
};

const kate = new User('Kate', 39);
console.log(kate.say());


// Создаем свойства как переменные , а не через this. Таким образом мы можем инкапсулировать
// доступ к переменным. Для работы с переменными нам нужны методы get/set
function UserInc(name, age) {
  let userName = name;
  let userAge = age;

  this.say = function() {
    console.log(`Инкапсулированный user. Имя: ${userName}, возраст: ${userAge}`);
  };

  this.getAge = function() {
    return console.log(userAge);
  };

  this.setAge = function(value) {
    if (typeof value === 'number' && value > 0 && value < 110) {
      return userAge = value;
    } else {
      console.log(`Не верные данные!`);
    }

    return value;
  };

};

const sergei = new UserInc('Sergei', 32);
sergei.say();
sergei.userAge = 35;

sergei.getAge();
sergei.setAge(35)
sergei.say();


// Инкапсулируем класс. Для этого пишем свойство через _age
// Для доступа нужно успользовать свойства get/set
class Customer {
  constructor(name, age) {
    this.name = name;
    this._age = age;
  };

  #surname = 'Lantseva'

  say() {
    console.log(`Новый класс Customer. Имя: ${this.name} ${this.#surname}, возраст: ${this._age}`);
  }

  get age() {
    return console.log(this._age);
  }

  set age(value) {
    if (typeof value === 'number' && value > 0 && value < 110) {
      return this._age = value;
    } else {
      console.log(`Не верные данные!`);
    }

    return value;
  }

};

const max = new Customer('Elena', 50);
max.say();
max.age = 55;
max.age;
max.say();





