///////////////////// Привязка контекста к функции //////////////////////
// При передаче методов объекта в качестве колбэков, 
// например для setTimeout, возникает известная проблема – потеря this.

let user = {
  name: "Kate",
  sayHello() {
    console.log(`Hello, ${this.name}!`);
  }
}

// setTimeout получил функцию sayHello отдельно от объекта user
setTimeout(user.sayHello, 3000); // Контекст потерян Hello undefined !
// Можно обернуть вызов в анонимную функцию, создав замыкание:
setTimeout(function() { user.sayHello()}, 4500); // Hello, Kate!
// То же самое, только короче:
setTimeout( () => user.sayHello(), 6500); // Hello, Kate!


// Что произойдёт, если до момента срабатывания setTimeout в переменную customer будет записано другое значение? 
let customer = {
  name: "Sergei",
  sayHello() {
    console.log(`Hello , ${this.name}!`);
  },
}

customer = { sayHello() { console.log(`Opppss, another user...`);}};

setTimeout(() => customer.sayHello(), 3000); // Opppss, another user...

// В JavaScript у функций есть встроенный метод bind, который позволяет зафиксировать this.

let user1 = {
  name: "Kate",
};

function sayName() {
  console.log(this.name);
}

function sayPhrase(phrase) {
  console.log(`${phrase} ${this.name}!!!`);
}

const userSay = sayName.bind(user1); // Kate
userSay();

const elseUserSay = sayName.bind(user1); // Kate
elseUserSay();

const userPhrase = sayPhrase.bind(user1); // Hello Kate!!! (аргумент "Hello" передан, при этом this = user)
userPhrase("Hello");

// Метод обьекта
let customer = {
  name: "Max",
  sayHello() {
    console.log(`Hello ${this.name}...`);
  }
}
const sayCustomer = customer.sayHello.bind(customer); // берём метод customer.sayHello и привязываем его к customer
sayCustomer(); // Hello Max...
setTimeout(() => sayCustomer(), 3000); // Hello Max...

// bind исправляет только this, а аргументы передаются как есть:
let user = {
  name: "Kate",
  say(phrase) {
    console.log(`${phrase} ${this.name}`);
  }
}

const sayUser = user.say.bind(user);
sayUser("Hello"); // Hello Kate
sayUser("Bay"); // Bay Kate

// Метод: bindAll
// Если у объекта много методов и мы планируем их активно передавать, 
// то можно привязать контекст для них всех в цикле:
for (let key of customer) {
  if (typeof customer[key] == 'function') {
    customer[key] = customer[key].bind(customer);
  }
}