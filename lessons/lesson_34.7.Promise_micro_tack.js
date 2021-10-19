"use strict"

// Микрозадачи
// Обработчики промисов .then/.catch/.finally всегда асинхронны.

// Даже когда промис сразу же выполнен, код в строках ниже .then/.catch/.finally будет запущен до этих обработчиков.

const promise = Promise.resolve();
promise.then(res => console.log(`${res} Promise done`));
console.log(`Code done`); // Выполница первым, затем "Promise done"


// Очередь микрозадач

// Асинхронные задачи требуют правильного управления. 
// Для этого стандарт предусматривает внутреннюю очередь PromiseJobs, более известную как «очередь микрозадач (microtask queue)» (термин V8).

// Как сказано в спецификации:

// Очередь определяется как первым-пришёл-первым-ушёл (FIFO): задачи, попавшие в очередь первыми, выполняются тоже первыми.
// Выполнение задачи происходит только в том случае, если ничего больше не запущено.

// Или, проще говоря, когда промис выполнен, его обработчики .then/catch/finally попадают в очередь. 
// Они пока не выполняются. Движок JavaScript берёт задачу из очереди и выполняет её, когда он освободится от выполнения текущего кода.
// Вот почему сообщение «Code done» в примере выше будет показано первым.

// Обработчики промисов всегда проходят через эту внутреннюю очередь.
// Если есть цепочка с несколькими .then/catch/finally, то каждый из них выполняется асинхронно. 
// То есть сначала ставится в очередь, а потом выполняется, 
// когда выполнение текущего кода завершено и добавленные ранее в очередь обработчики выполнены.
// Но что если порядок имеет значение для нас? Как мы можем вывести код выполнен после промис выполнен?

// Легко, используя .then:

Promise.resolve()
  .then( () => console.log(`Promise done`))
  .then( () => console.log(`Code done`));

// Теперь порядок стал таким, как было задумано.


// Необработанные ошибки
// "Необработанная ошибка" возникает в случае, если ошибка промиса не обрабатывается в конце очереди микрозадач.
// Обычно, если мы ожидаем ошибку, мы добавляем .catch в конец цепочки промисов, чтобы обработать её:

const promise = Promise.reject(new Error(`Ошибка в промисе... o_O `));
// promise.catch( () => console.log(`Поймана!`));

// не запустится, ошибка обработана
// window.addEventListener('unhandledrejection', event => {
//   console.log(event.reason); // `Поймана!`
// });

// …Но если мы забудем добавить .catch, то, когда очередь микрозадач опустеет, движок сгенерирует событие:
// window.addEventListener('unhandledrejection', event => console.log(event.reason));

// А что, если мы поймаем ошибку, но позже? Вот так:

setTimeout(() => {
  promise.catch( () => console.log(`Поймана!`), 1111);
});
window.addEventListener('unhandledrejection', event => console.log(event.reason));

// Теперь, при запуске, мы сначала увидим «Ошибка в промисе!», а затем «поймана».

// Если бы мы не знали про очередь микрозадач, то могли бы удивиться: «Почему сработал обработчик unhandledrejection? Мы же поймали ошибку!».
// Но теперь мы понимаем, что событие unhandledrejection возникает, когда очередь микрозадач завершена: 
// движок проверяет все промисы и, если какой-либо из них в состоянии «rejected», то генерируется это событие.
// В примере выше .catch, добавленный в setTimeout, также срабатывает, но позже, 
// уже после возникновения unhandledrejection, так что это ни на что не влияет.

// Итого

// Обработка промисов всегда асинхронная, т.к. все действия промисов проходят через внутреннюю очередь «promise jobs», 
// так называемую «очередь микрозадач (microtask queue)» (термин v8).

// Таким образом, обработчики .then/catch/finally вызываются после выполнения текущего кода.
// Если нам нужно гарантировать выполнение какого-то кода после .then/catch/finally, 
// то лучше всего добавить его вызов в цепочку .then.

// В большинстве движков JavaScript, включая браузеры и Node.js, 
// микрозадачи тесно связаны с так называемым «событийным циклом» и «макрозадачами».