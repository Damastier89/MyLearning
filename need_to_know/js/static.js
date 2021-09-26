class Users {
  // Поле countUsers принадлежит только классу, но не обьектам этого класса
  static countUsers = 0;
  constructor(name, old) {
    Users.countUsers++;
    this.name = name;
    this.old = old;
  }

  getName(){ return this.name; }

  // Метод compareOld принадлежит только классу, но не обьектам этого класса
  static compareOld(userOne, userTwo) {
    console.log(Users , this == Admin);
    return userOne.old == userTwo.old;
  }
}

class Admin extends Users {
  constructor(name, old, login, password){
    super(name, old); // конструктор базового класса
    this.login = login;
    this.password = password;
  }
  // Метод createAdmin доступен только в классе Admin и его наследниках
  // this в этом методе указывает на тот класс из которого он был вызван.
  static createAdmin(name, old) {
    return new this(name, old, 'admin', 'root')
  }
}

let sergei = new Users('Sergei', 32);
let max = new Users('Max', 32)
let admin = new Admin('Ivan', 25, 'van', '12345');

console.log(`Users.compareOld `, Users.compareOld(sergei, max));
// Ститические методы доступны и у наследников. 
// Но доступны они только на уровне класса.
console.log(`Admin` , Admin.compareOld(sergei, max));
console.log(`Users count` , Users.countUsers);