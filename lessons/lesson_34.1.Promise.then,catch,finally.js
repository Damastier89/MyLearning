//////////////////// Промисы /////////////////////

// 1. Есть «создающий» код, который делает что-то, что занимает время. Например, загружает данные по сети.
// 2. Есть «потребляющий» код, который хочет получить результат «создающего» кода, когда он будет готов. 
// Он может быть необходим более чем одной функции.
// 3. Promise (по англ. promise) – это специальный объект в JavaScript, который связывает «создающий» и «потребляющий» коды вместе.
// «Создающий» код может выполняться сколько потребуется, чтобы получить результат, 
// а промис делает результат доступным для кода, который подписан на него, когда результат готов.

const promise = new Promise(function(resolve, reject) {
  // функция-исполнитель (executor)
  // ...come code...
});

// Функция, переданная в конструкцию new Promise, называется исполнитель (executor). 
// Когда Promise создаётся, она запускается автоматически. 
// Она должна содержать «создающий» код, который когда-нибудь создаст результат.

// Её аргументы resolve и reject – это колбэки, которые предоставляет сам JavaScript. 
// Наш код – только внутри исполнителя.

// Когда он получает результат, сейчас или позже – не важно, он должен вызвать один из этих колбэков:
// resolve(value) — если работа завершилась успешно, с результатом value.
// reject(error) — если произошла ошибка, error – объект ошибки.

// У объекта promise, возвращаемого конструктором new Promise, есть внутренние свойства:

// state («состояние») — вначале "pending" («ожидание»), 
// потом меняется на "fulfilled" («выполнено успешно») при вызове resolve или 
// на "rejected" («выполнено с ошибкой») при вызове reject.
// result («результат») — вначале undefined, далее изменяется на value при вызове resolve(value) или 
// на error при вызове reject(error).

// Так что исполнитель по итогу переводит promise в одно из двух состояний:

// Пример успешно выполненной задачи
const promise1 = new Promise(function(resolve, reject) {
  // эта функция выполнится автоматически, при вызове new Promise
  // через 1 секунду сигнализировать, что задача выполнена с результатом "done"

  setTimeout(() => resolve(console.log("done")), 1500);
});

// new Promise(executor) 
// state: "pending" => resolve("done") => state: "fulfilled"                           
// result: undefined                      result: "done"

// Мы можем наблюдать две вещи, запустив код выше:
// Функция-исполнитель запускается сразу же при вызове new Promise.
// Исполнитель получает два аргумента: resolve и reject — это функции, 
// встроенные в JavaScript, поэтому нам не нужно их писать. 
// Нам нужно лишь позаботиться, чтобы исполнитель вызвал одну из них по готовности.

// Задача выполнена с ошибкой:
const promise2 = new Promise(function(resolve, reject) {
  // будет сообщено, что задача выполнена с ошибкой
  setTimeout(() => reject( console.log(new Error(`Whooops... o_O...`)) ), 2300);
});

// new Promise(executor)
// state: "pending" => reject(error) => state: "rejected"
// result: undefined                    result: error

// Подведём промежуточные итоги: исполнитель выполняет задачу (что-то, что обычно требует времени), 
// затем вызывает resolve или reject, чтобы изменить состояние(state) соответствующего Promise.
// Промис – и успешный, и отклонённый будем называть «завершённым», 
// в отличие от изначального промиса «в ожидании».

// Может быть что-то одно: либо результат, либо ошибка
// Исполнитель должен вызвать что-то одно: resolve или reject. 
// Состояние промиса может быть изменено только один раз.
// Все последующие вызовы resolve и reject будут проигнорированы:

let promise3 = new Promise(function(resolve, reject) {
  resolve("done");

  reject(new Error("…")); // игнорируется
  setTimeout(() => resolve("…")); // игнорируется
});

// Идея в том, что задача, выполняемая исполнителем, может иметь только один итог: результат или ошибку.
// Также заметим, что функция resolve/reject ожидает только один аргумент (или ни одного). 


// Потребители: then, catch, finally

// Объект Promise служит связующим звеном между исполнителем («создающим» кодом) и функциями-потребителями, 
// которые получат либо результат, либо ошибку. 
// Функции-потребители могут быть зарегистрированы (подписаны) с помощью методов .then, .catch и .finally.


// then - Наиболее важный и фундаментальный метод

promise.then(
  function(result) { /* обработает успешное выполнение */ },
  function(error) { /* обработает ошибку */}
);

// Первый аргумент метода .then – функция, которая выполняется, когда промис переходит в состояние «выполнен успешно», и получает результат.
// Второй аргумент .then – функция, которая выполняется, когда промис переходит в состояние «выполнен с ошибкой», и получает ошибку.

const promise4 = new Promise(function(resolve, reject) {
  setTimeout(() => resolve(`Done...`), 3000);
});

// resolve запустит первую функцию, переданную в .then
promise4.then(
  result => console.log(result), // выведет "Done.." через 3 секунды
  error => console.log(error) // не будет запущена
);

// в случае ошибки в промисе – выполнится вторая:
let promise5 = new Promise(function(resolve, reject) {
  setTimeout(() => reject(new Error(`Whooopsss... o_O.....`)), 4000);
});

promise5.then(
  result => console.log(result), // не будет запущена
  error => console.log(error), // выведет "Error: Whooopsss... o_O....." спустя 4 секунды
);

// Если мы заинтересованы только в результате успешного выполнения задачи, то в then можно передать только одну функцию.


// catch
// Если мы хотели бы только обработать ошибку, то можно использовать null в качестве первого аргумента: .then(null, errorHandlingFunction). 
// Или можно воспользоваться методом .catch(errorHandlingFunction), который сделает тоже самое:

const promise6 = new Promise(function(resolve, reject) {
  setTimeout(() => reject(new Error(`Error... o_O...`)), 4500);
});

// .catch(f) это тоже самое, что promise.then(null, f)
// promise6.catch(alert);


// // finally
// По аналогии с блоком finally из обычного try {...} catch {...}, у промисов также есть метод finally.
// Вызов .finally(f) похож на .then(f, f), в том смысле, что f выполнится в любом случае, 
// когда промис завершится: успешно или с ошибкой.

// finally хорошо подходит для очистки, например остановки индикатора загрузки, 
// его ведь нужно остановить вне зависимости от результата.

new Promise((resolve, reject) => {
  /* сделать что-то, что займёт время, и после вызвать resolve/reject */
})
  // выполнится, когда промис завершится, независимо от того, успешно или нет
  // .finally(() => остановить индикатор загрузки)
  // .then(result => показать результат, err => показать ошибку)

// Но это не совсем псевдоним then(f,f), как можно было подумать. Существует несколько важных отличий:
// Обработчик, вызываемый из finally, не имеет аргументов. В finally мы не знаем, как был завершён промис. 
// И это нормально, потому что обычно наша задача – выполнить «общие» завершающие процедуры.
// Обработчик finally «пропускает» результат или ошибку дальше, к последующим обработчикам.


// Пример: loadScript

function loadScript(src) {
  return new Promise(function(resolve, reject) {
    const script = document.createElement("script");
    script.src = src;
    
    script.onload = () => resolve(script);
    script.onerror = () => reject(new Error(`Ошибка загрузки скрипта ${src}`));

    document.head.append(script);
  })
};

const promiseLoadScript = loadScript(`https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.11/lodash.js`);

promiseLoadScript.then(
  script => console.log(`Script ${script.src} is loaded...`),
  error => console.log(`Error load ${error.message}`),
);

promiseLoadScript.then(
  script => console.log(`Ещё один обработчик... ${script.src}`),
);

// Промисы позволяют делать вещи в естественном порядке. 
// Сперва мы запускаем loadScript(script), и затем (.then) мы пишем, что делать с результатом.
// Мы можем вызывать .then у Promise столько раз, сколько захотим. 
// Каждый раз мы добавляем нового «фаната», новую функцию-подписчика в «список подписок».


//////////////////////////////////////////////////////////
function delay(ms) {
  return new Promise(function(resolve, reject) {
    setTimeout(() => resolve(`Выполнилось через ${ms} милисекунд...`), ms);
  });
};

delay(7000).then(
  result => console.log(result),
);

///////
// <!DOCTYPE html>
// <html>

// <head>
//   <meta charset="utf-8">
//   <style>
//     .message-ball {
//       font-size: 20px;
//       line-height: 200px;
//       text-align: center;
//     }
//     .circle {
//       transition-property: width, height, margin-left, margin-top;
//       transition-duration: 2s;
//       position: fixed;
//       transform: translateX(-50%) translateY(-50%);
//       background-color: red;
//       border-radius: 50%;
//     }
//   </style>
// </head>

// <body>

//   <button onclick="go()">Нажми меня</button>

//   <script>

//   function go() {
//     showCircle(150, 150, 100).then(div => {
//       div.classList.add('message-ball');
//       div.append("Hello, world!");
//     });
//   }

//   function showCircle(cx, cy, radius) {
//     let div = document.createElement('div');
//     div.style.width = 0;
//     div.style.height = 0;
//     div.style.left = cx + 'px';
//     div.style.top = cy + 'px';
//     div.className = 'circle';
//     document.body.append(div);

//     return new Promise(resolve => {
//       setTimeout(() => {
//         div.style.width = radius * 2 + 'px';
//         div.style.height = radius * 2 + 'px';

//         div.addEventListener('transitionend', function handler() {
//           div.removeEventListener('transitionend', handler);
//           resolve(div);
//         });
//       }, 0);
//     })
//   }
//   </script>


// </body>
// </html>