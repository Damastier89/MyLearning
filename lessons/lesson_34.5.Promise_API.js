"use strict"

// Promise API
// В классе Promise есть 5 статических методов.

// Promise.all
// Допустим, нам нужно запустить множество промисов параллельно и дождаться, пока все они выполнятся.
// Например, параллельно загрузить несколько файлов и обработать результат, когда он готов.

// Метод Promise.all принимает массив промисов (может принимать любой перебираемый объект, но обычно используется массив) и возвращает новый промис.
// Новый промис завершится, когда завершится весь переданный список промисов, и его результатом будет массив их результатов.

Promise.all([
  new Promise(resolve => setTimeout(() => resolve(1), 3000)),
  new Promise(resolve => setTimeout(() => resolve(2), 2000)),
  new Promise(resolve => setTimeout(() => resolve(3), 1000)),
])
.then(resolve => console.log(resolve)); // [1, 2, 3]

// Порядок элементов массива в точности соответствует порядку исходных промисов. 
// Даже если первый промис будет выполняться дольше всех, его результат всё равно будет первым в массиве.

// Часто применяемый трюк – пропустить массив данных через map-функцию, 
// которая для каждого элемента создаст задачу-промис, и затем обернёт получившийся массив в Promise.all.

const urls = [
  'https://api.github.com/users/iliakan',
  'https://api.github.com/users/remy',
  'https://api.github.com/users/jeresig'
];

// Преобразуем каждый URL в промис, возвращённый fetch
const requests = urls.map(url => fetch(url));

// Promise.all будет ожидать выполнения всех промисов
Promise.all(requests)
  .then(responses => responses.forEach(
    response => console.log(`${response.url} : ${response.status}`)
  ));

// А вот пример побольше, с получением информации о пользователях GitHub по их логинам из массива 
// (мы могли бы получать массив товаров по их идентификаторам, логика та же)

const names = ['iliakan', 'remy', 'jeresig'];

const requestsNames = names.map(name => fetch(`https://api.github.com/users/${name}`));

Promise.all(requestsNames)
  .then(responses => {
    // все промисы успешно завершены
    for(let response of responses) {
      console.log(`${response.url} : ${response.status}`); // покажет 200 для каждой ссылки
    }
    return responses;
  })
  // преобразовать массив ответов response в response.json(),
  // чтобы прочитать содержимое каждого
  .then(
    responses => Promise.all(responses.map(res => res.json()))
  )
  // все JSON-ответы обработаны, users - массив с результатами
  .then(
    users => users.forEach(user => console.log(`${user.name}`))
  );

  // Если любой из промисов завершится с ошибкой, то промис, возвращённый Promise.all, 
  // немедленно завершается с этой ошибкой.


// Promise.allSettled

// Promise.all завершается с ошибкой, если она возникает в любом из переданных промисов. 
// Это подходит для ситуаций «всё или ничего», когда нам нужны все результаты для продолжения:

// Promise.all([
//   fetch(`/template.html`),
//   fetch(`/style.css`),
//   fetch(`data.json`),
// ])
//   .then(render); // методу render нужны результаты всех fetch

// Метод Promise.allSettled всегда ждёт завершения всех промисов. В массиве результатов будет
// {status:"fulfilled", value:результат} для успешных завершений,
// {status:"rejected", reason:ошибка} для ошибок.

const urls = [
  'https://api.github.com/users/iliakan',
  'https://api.github.com/users/remy',
  'https://no-such-url',
];

Promise.allSettled(urls.map(url => fetch(url)))
  .then(result => { // (*)
    result.forEach((result, num) => {

      if (result.status == 'fulfilled') {
        alert(`${urls[num]} : ${result.value.status}`);
      }

      if (result.status == 'rejected') {
        alert(`${urls[num]} : ${result.reason}`);
      }

    })
  });

// Массив results в строке (*) будет таким:

[
  {status: 'fulfilled', value: '...объект ответа...'},
  {status: 'fulfilled', value: '...объект ответа...'},
  {status: 'rejected', reason: '...объект ошибки...'}
]

// То есть, для каждого промиса у нас есть его статус и значение/ошибка.

// Если браузер не поддерживает Promise.allSettled, для него легко сделать полифил:
if(!Promise.allSettled) {
  Promise.allSettled = function(promises) {
    return Promise.all(promises.map(p => Promise.resolve(p).then(value => ({
      status: 'fulfilled',
      value: value
    }), error => ({
      status: 'rejected',
      reason: error
    }))));
  };
}

// В этом коде promises.map берёт аргументы, превращает их в промисы (на всякий случай) и добавляет каждому обработчик .then.

// Этот обработчик превращает успешный результат value в {state:'fulfilled', value: value}, 
// а ошибку error в {state:'rejected', reason: error}. Это как раз и есть формат результатов Promise.allSettled.

// Затем мы можем использовать Promise.allSettled, чтобы получить результаты всех промисов, 
// даже если при выполнении какого-то возникнет ошибка.


// Promise.race
// Метод очень похож на Promise.all, но ждёт только первый промис, из которого берёт результат (или ошибку).

Promise.race([
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
  new Promise((resolve, reject) => setTimeout(() => reject(new Error(`Wopsss o_O`)), 2000)),
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
])
  // .then(alert); // 1

// Быстрее всех выполнился первый промис, он и дал результат. После этого остальные промисы игнорируются.


// Promise.all(promises) – ожидает выполнения всех промисов и возвращает массив с результатами. Если любой из указанных промисов вернёт ошибку, то результатом работы Promise.all будет эта ошибка, результаты остальных промисов будут игнорироваться.
// Promise.allSettled(promises) (добавлен недавно) – ждёт, пока все промисы завершатся и возвращает их результаты в виде массива с объектами, у каждого объекта два свойства:
// state: "fulfilled", если выполнен успешно или "rejected", если ошибка,
// value – результат, если успешно или reason – ошибка, если нет.
// Promise.race(promises) – ожидает первый выполненный промис, который становится его результатом, остальные игнорируются.
// Promise.resolve(value) – возвращает успешно выполнившийся промис с результатом value.
// Promise.reject(error) – возвращает промис с ошибкой error.