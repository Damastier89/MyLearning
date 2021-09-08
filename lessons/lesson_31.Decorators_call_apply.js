/////////////////// Декораторы и переадресация вызова, call/apply ///////////////////
// JavaScript предоставляет исключительно гибкие возможности по работе с функциями: 
// они могут быть переданы в другие функции, использованы как объекты, 
// а так же можно перенаправлять вызовы между ними и декорировать их.

// Декоратор – это обёртка вокруг функции, которая изменяет поведение последней. 
// Основная работа по-прежнему выполняется функцией.

function slow(x) {
  // здесь могут быть ресурсоёмкие вычисления
  console.log(`Accomplishment some code.....`);
  return x;
}

function cachingDecorator(func) {
  let cache = new Map();

  return function(x) { // функция обертка
    if (cache.has(x)) {    // если кеш содержит такой x,
      return cache.get(x); // читаем из него результат
    }

    let result = func(x); // иначе, вызываем функцию

    cache.set(x, result); // и кешируем (запоминаем) результат
    return result;
  };
}
// С точки зрения внешнего кода, обёрнутая функция slow по-прежнему делает то же самое. 
// Обёртка всего лишь добавляет к её поведению аспект кеширования.
slow = cachingDecorator(slow);

console.log(`slow :`, slow(1)); // slow(1) кешируем
console.log(`slow agen: `, slow(1)); // возвращаем из кеша

// Функцию cachingDecorator можно использовать повторно. Можно применить её к другой функции.
// Логика кеширования является отдельной, она не увеличивает сложность самой slow (если таковая была).
// При необходимости мы можем объединить несколько декораторов.


// Применение «func.call» для передачи контекста.
let worker = {
  someMethod() {
    return 1;
  },

  slow(x) {
    // здесь может быть страшно тяжёлая задача для процессора
    console.log(`Else accomplishment some code... ${x}`);
    return x * this.someMethod();
  }
};

worker.slow(3); // работатет 3

worker.slow = cachingDecorator(worker.slow); // теперь сделаем его кеширующим

worker.slow(2); // TypeError: Cannot read property 'someMethod' of undefined
// Декоратор передаёт вызов оригинальному методу, но без контекста. Следовательно – ошибка

// Существует специальный встроенный метод функции func.call(context, …args), 
// который позволяет вызывать функцию, явно устанавливая this. func.call(context, arg1, arg2, ...)
// Он запускает функцию func, используя первый аргумент как её контекст this, а последующие – как её аргументы.

// func(1, 2, 3);
// func.call(obj, 1, 2, 3)
// Они оба вызывают func с аргументами 1, 2 и 3. 
// Единственное отличие состоит в том, что func.call ещё и устанавливает this равным obj.

function elseSayHello() {
  console.log(this.name);
}

const user = { name : "Kate" };
const admin = { name: "Sergei"};

// используем 'call' для передачи различных объектов в качестве 'this'
// elseSayHello(user); // Cannot read property 'name' of undefined
elseSayHello.call(user); // Kate
elseSayHello.call(admin);

// Используем call для вызова say с заданным контекстом и фразой:
function say(phrase) {
  console.log(`${this.name} : ${phrase}`);
}
// 'user' становится 'this', а "Hello" становится первым аргументом
say.call(user, "hello")

function cachingDecoratorThis(func) {
  let cache = new Map();

  return function(x) { // функция обертка
    if (cache.has(x)) {    // если кеш содержит такой x,
      return cache.get(x); // читаем из него результат
    }

    let result = func.call(this, x); // теперь 'this' передаётся правильно

    cache.set(x, result); // и кешируем (запоминаем) результат
    return result;
  };
}

let worker = {
  someMethod() {
    return 1;
  },

  slow(x) {
    // здесь может быть страшно тяжёлая задача для процессора
    console.log(`Else accomplishment some code... ${x}`);
    return x * this.someMethod();
  }
};

worker.slow = cachingDecoratorThis(worker.slow);
worker.slow(5); // 5
worker.slow(5); // работает, не вызывая первоначальную функцию (кешируется)

// Несколько аргументов с «func.apply»

let worker = {
  slow(min, max) {
    return min + max; // здесь может быть тяжёлая задача
  }
}

function cachingDecoratorHash(func, hash) {
  let cache = new Map();

  return function() {
  let key = hash(arguments); // вызываем hash для создания одного ключа из arguments
  // используем простую функцию «объединения», которая превращает аргументы (3, 5) в ключ "3,5".
    if (cache.has(key)) {
      return cache.get(key);
    }

    // let result = func.call(this, ...arguments); // используем call для передачи как контекста, так и всех аргументов, полученных обёрткой 
    let result = func.apply(this, arguments);

    cache.set(key, result);
    return result;
  };
}

function hash(args) {
  return args[0] + "," + args[1];
}

worker.slow = cachingDecoratorHash(worker.slow, hash);

console.log(worker.slow(3, 5)); // 8 работает
console.log(`Again :`, worker.slow(3, 5)); // аналогично (из кеша)

// func.call(context, ...args); // передаёт массив как список с оператором расширения
// func.apply(context, args);   // тот же эффект

// Оператор расширения ... позволяет передавать перебираемый объект args в виде списка в call.
// А apply принимает только псевдомассив args.
// Так что эти вызовы дополняют друг друга. 
// Для перебираемых объектов сработает call, а где мы ожидаем псевдомассив – apply.

// Передача всех аргументов вместе с контекстом другой функции называется «перенаправлением вызова» (call forwarding)
// Простейший вид такого перенаправления:
// При вызове wrapper из внешнего кода его не отличить от вызова исходной функции.
let wrapper = function() {
  return func.apply(this, arguments);
}

// Заимствование метода
// Есть простой способ использовать соединение массива:
function hash() {
  [].join.call(arguments); // Этот называется "заимствование метода".
}

/////////////////////////////////////////////////
function work(a, b) {
  return console.log(a + b);
}

function spy(func) {

  function wrapper(...args) {
    wrapper.calls.push(args);
    return func.apply(this, arguments);
  }

  wrapper.calls = [];

  return wrapper;
}

work = spy(work);

work(3, 4); // 7
work(5, 4); // 9

for (let args of work.calls) {
  console.log(`call :` , args.join()); // call : 3,4 , call : 5,4
}

///////
function delay(foo, ms) {
  return function() {
    setTimeout(() => foo.apply(this, arguments), ms);
  }
}

const f3000 = delay(alert, 3000);
const f5000 = delay(alert, 5000)
f3000("Hello after 3 second");
f5000(`Hello after 5 second`);

///////
// Вызов debounce возвращает обёртку. Возможны два состояния:

// isCooldown = false – готова к выполнению.
// isCooldown = true – ожидание окончания тайм-аута.
// В первом вызове isCoolDown = false, поэтому вызов продолжается, и состояние изменяется на true.

// Пока isCoolDown имеет значение true, все остальные вызовы игнорируются.

// Затем setTimeout устанавливает его в false после заданной задержки.
function debounce(foo, ms) {
  let isCooldown = false;

  return function() {
    if (isCooldown) {
      return;
    }
    foo.apply(this, arguments);

    isCooldown = true;

    setTimeout(() => isCooldown = false, ms);
  }
}

let func = debounce(alert, 1000);
func(1);  // выполняется немедленно
func(2);  // проигнорирован

setTimeout( () => func(3), 100); // проигнорирован (прошло только 100 мс)
setTimeout( () => func(4), 1100); // выполняется
setTimeout( () => func(5), 1500); // проигнорирован (прошло только 400 мс от последнего вызова)
setTimeout( () => func(6), 2500); // выполняется

///////
function foo(x) {
  console.log(x);
}

function throttle(func, ms) {
  let isThrottled = false,
      savedArgs,
      savedThis;

  function wrapper() {
    if (isThrottled) { // 2
      savedArgs = arguments;
      savedThis = this;
      return;
    }

    func.apply(this, arguments); // 1

    isThrottled = true;

    setTimeout(function() {
      isThrottled = false; // 3
      if (savedArgs) {
        wrapper.apply(savedThis, savedArgs);
        savedArgs = savedThis = null;
      }
    }, ms);
  }
  return wrapper;    
}
// f1000 передаёт вызовы foo максимум раз в 1000 мс
let f1000 = throttle(foo, 1000);

f1000(1); // показывает 1
f1000(2); // (ограничение, 1000 мс ещё нет)
f1000(3); // (ограничение, 1000 мс ещё нет)

// когда 1000 мс истекли ...
// ...выводим 3, промежуточное значение 2 было проигнорировано

// Вызов throttle(func, ms) возвращает wrapper.
// 1) Во время первого вызова обёртка просто вызывает func и устанавливает состояние задержки (isThrottled = true).
// 2) В этом состоянии все вызовы запоминаются в saveArgs / saveThis. Обратите внимание, что контекст и аргументы одинаково важны и должны быть запомнены. Они нам нужны для того, чтобы воспроизвести вызов позднее.
// 3) … Затем по прошествии ms миллисекунд срабатывает setTimeout. Состояние задержки сбрасывается (isThrottled = false). И если мы проигнорировали вызовы, то «обёртка» выполняется с последними запомненными аргументами и контекстом.
// На третьем шаге выполняется не func, а wrapper, потому что нам нужно не только выполнить func, но и ещё раз установить состояние задержки и таймаут для его сброса.
