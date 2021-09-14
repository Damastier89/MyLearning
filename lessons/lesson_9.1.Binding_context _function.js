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

// Частичное применение
// Можно привязать не только this, но и аргументы. Это делается редко, но иногда может быть полезно.
// Полный синтаксис bind:
// let bound = func.bind(context, [arg1], [arg2], ...);
// Это позволяет привязать контекст this и начальные аргументы функции.

function mult(a, b) {
  return a * b;
}

let double = mult.bind(null , 2);
double(3); // 6
double(5); // 10

let triple = mult.bind(null, 3);
triple(3); // 9
triple(10); // 30


// Вызов mul.bind(null, 2) создаёт новую функцию double, которая передаёт вызов mul, фиксируя null как контекст, и 2 – как первый аргумент. 
// Следующие аргументы передаются как есть.
// Это называется "частичное применение" – мы создаём новую функцию, 
// фиксируя некоторые из существующих параметров.

// Частичное применение без контекста

function partial(func, ...argsBound) { // partial привязывает только аргументы.
  return function(...args) { // (*)
    return func.call(this, ...argsBound, ...args);
  }
}

let user = {
  name: "Kate",
  say(time, phrase) {
    console.log(`[${time}] ${this.name}: ${phrase}`);
  }
}
// добавляем частично применённый метод с фиксированным временем
user.sayNow = partial(user.say, new Date().getHours() + ':' + new Date().getMinutes());
user; // {name: "Kate", say: ƒ, sayNow: ƒ}
user.sayNow("Hello World"); // [17:22] Kate: Hello World

// Результатом вызова partial(func[, arg1, arg2...]) будет обёртка (*), которая вызывает func с:

// Тем же this, который она получает (для вызова user.sayNow – это будет user)
// Затем передаёт ей ...argsBound – аргументы из вызова partial ("10:00")
// Затем передаёт ей ...args – аргументы, полученные обёрткой ("Hello")

////////////////////////////////////////////////////
function foo1() {
  console.log(this); // null Контекст связанной функции жёстко фиксирован. Изменить однажды привязанный контекст уже нельзя.
}

const user = {
  func: foo1.bind(null),
}

user.func();

///////
function foo2() {
  console.log(this.name);
}

foo2 = foo2.bind( {name: "Kate"} ).bind( {name: "Sergei"}); // Вторая привязка не сработет.
// Можно сделать новую привязку, но нельзя изменить существующую.
foo2(); // Kate

///////
function sayHello() {
  console.log(this.name);
}

sayHello.test = 5;

let bound = sayHello.bind( { name: "Kate" } );

bound.test; // undefined
// Результатом работы bind является другой объект. У него уже нет свойства test.

///////
function askPassword(ok, fail) {
  let password = prompt(`Enter the password...`, "");
  if(password == "rockstar") {
    ok();
  } else {
    fail();
  }
}

let customer = {
  name: "Max",

  loginOk() {
    console.log(`${this.name} logged in`);
  },

  loginFail() {
    console.log(`${this.name} failed to log in`);
  },
}

askPassword(customer.loginOk.bind(customer), customer.loginFail.bind(customer))
askPassword(() => customer.loginOk(), () => customer.loginFail());

///////
function askPassword2(ok, fail) {
  let password = prompt(`Enter the password...`, "");
  if(password == "rockstar") {
    ok();
  } else {
    fail();
  }
}

let customer2 = {
  name: "Maximus",

  login(result) {
    console.log(this.name + (result ? " logged in" : " failed to log in"));
  }  
}
// Нужно использовать стрелочную функцию-обёртку:
askPassword2(() => customer2.login(true), () => customer2.login(false));