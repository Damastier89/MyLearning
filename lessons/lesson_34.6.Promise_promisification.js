"use strict"

// Промисификация
// Промисификация – это длинное слово для простого преобразования. 
// Мы берём функцию, которая принимает колбэк и меняем её, чтобы она вместо этого возвращала промис.

// Такие преобразования часто необходимы в реальной жизни, 
// так как многие функции и библиотеки основаны на колбэках, а использование промисов более удобно, 
// поэтому есть смысл «промисифицировать» их.

function loadScript(src, callback) {
  let script = document.createElement('script');
  script.src = src;

  script.onload = () => callback(null, script);
  script.onerror = () => callback(new Error(`Ошибка загрузки скрипта ${src}`));

  document.head.append(script);
}
// использование:
// loadScript('path/script.js', (err, script) => {...})

// Новая функция loadScriptPromise(src) будет делать то же самое, 
// но будет принимать только src (не callback) и возвращать промис.

let loadScriptPromise = function(src) {
  return new Promise((resolve, reject) => {
    loadScript(src, (err, script) => {
      if (err) {
        reject(err)
      } else {
        resolve(script);
      }
    });
  })
}
// использование:
// loadScriptPromise('path/script.js').then(...)

// Теперь loadScriptPromise хорошо вписывается в код, основанный на промисах.
// Как видно, она передаёт всю работу исходной функции loadScript, предоставляя ей колбэк, 
// по вызову которого происходит resolve/reject промиса.
// На практике нам, скорее всего, понадобится промисифицировать не одну функцию, 
// поэтому имеет смысл сделать для этого специальную «функцию-помощник».
// Мы назовём её promisify(f) – она принимает функцию для промисификации f и возвращает функцию-обёртку.
// Эта функция-обёртка делает то же самое, что и код выше: возвращает промис и передаёт вызов оригинальной f, отслеживая результат в своём колбэке:

function promisify(foo) {
  return function(...args) { // возвращает функцию-обёртку
    return new Promise((resolve, reject) => {
      function callback(err, result) { // наш специальный колбэк для foo
        if (err) {
          return reject(err);
        } else {
          resolve(result);
        }
      }

      args.push(callback); // добавляем колбэк в конец аргументов foo

      foo.call(this, ...args) // вызываем оригинальную функцию
    });
  };
};

// использование: 
const loadScriptsPromise = promisify(loadScript);
loadScriptPromise().then();

// Здесь мы предполагаем, что исходная функция ожидает колбэк с двумя аргументами (err, result). 
// Это то, с чем мы чаще всего сталкиваемся. 
// Тогда наш колбэк – в правильном формате, и promisify отлично работает для такого случая.


// Но что, если исходная f ожидает колбэк с большим количеством аргументов callback(err, res1, res2, ...)?
// Ниже описана улучшенная функция promisify: при вызове promisify(f, true) результатом промиса будет массив результатов [res1, res2, ...]:

// promisify(f, true), чтобы получить массив результатов
function promisifyUpLevel(foo, manyArgs = false) {
  return function(...args) {
    return new Promise((resolve, reject) => {
      function callback(err, ...results) { // наш специальный колбэк для foo
        if (err) {
          return reject(err);
        } else {
          // делаем resolve для всех results колбэка, если задано manyArgs
          resolve(manyArgs ? resolts : resolts[0]);
        }
      };

      args.push(callback);

      foo.call(this, ...args);
    })
  };
};


// использование:
f = promisify(f, true);
f().then(arrayOfResults => {}, err => {});

// Промисификация – это отличный подход, особенно, если вы будете использовать async/await

// Помните, промис может иметь только один результат, но колбэк технически может вызываться сколько угодно раз.

// Поэтому промисификация используется для функций, которые вызывают колбэк только один раз. 
// Последующие вызовы колбэка будут проигнорированы.