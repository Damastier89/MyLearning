///////// Function constructor ////////

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