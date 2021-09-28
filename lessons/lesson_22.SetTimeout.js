const btn = document.querySelector('.btn');

function myAnimation() {
    const elem = document.querySelector('.box');
    let positions = 0;

    const id = setInterval(frame, 20);

    function frame() {
        if (positions == 294) {
            clearInterval(id);
        } else {
            positions++;
            elem.style.top = positions + 'px';
            elem.style.left = positions + 'px';
        }
    }
}

btn.addEventListener('click', myAnimation);

//////////////////////// Планирование: setTimeout и setInterval ///////////////////////
// Мы можем вызвать функцию не в данный момент, а позже, через заданный интервал времени. 
// Это называется «планирование вызова».
// Для этого существуют два метода:
// setTimeout позволяет вызвать функцию "один" раз через определённый интервал времени.
// setInterval позволяет вызывать функцию "регулярно", повторяя вызов через определённый интервал времени.


// setTimeout
// let timerId = setTimeout(func|code, [delay], [arg1], [arg2], ...)

function sayHello() {
    console.log(`Hello world!`);
  }
  
  setTimeout(sayHello, 3000);
  
  // C аргументами
  function sayHi(phrase, who, sign) {
    console.log(`${phrase} ${who}${sign}`);
  }
  
  setTimeout(sayHi, 3500, "Hello", "Kate", "!");
  
  setTimeout(() => { console.log(`First phrase...`);}, 3700);
  
  // Отмена через clearTimeout
  let timerId = setTimeout(() => { console.log(`........`);}, 4100);
  console.log(`timerId :`, timerId); // в браузере идентификатором таймера является число
  clearTimeout(timerId);
  
  // setInterval
  // Метод setInterval имеет такой же синтаксис как setTimeout:
  // let timerId = setInterval(func|code, [delay], [arg1], [arg2], ...)
  // Функция запускается не один раз, а периодически через указанный интервал времени.
  
  // setInterval(sayHello, 2000);
  
  let timerIdClear = setInterval(() => { console.log(`Hello all`);}, 2000);
  setTimeout(() => { clearInterval(timerIdClear); console.log(`stop`);}, 5000);
  
  // Минимальная задержка вложенных таймеров в браузере
  let start = Date.now();
  let times = [];
  
  setTimeout(function run() {
    times.push(Date.now() - start); // запоминаем задержку от предыдущего вызова
  
    if (start + 100 < Date.now()) {
      console.log(`times :`, times); // показываем задержку через 100 мс
    } else {
      setTimeout(run); // если нужно ещё запланировать
    }
  });
  
  // Методы setInterval(func, delay, ...args) и setTimeout(func, delay, ...args) позволяют выполнять func регулярно или только один раз после задержки delay, заданной в мс.
  // Для отмены выполнения необходимо вызвать clearInterval/clearTimeout со значением, которое возвращают методы setInterval/setTimeout.
  // Вложенный вызов setTimeout является более гибкой альтернативой setInterval. Также он позволяет более точно задать интервал между выполнениями.
  // Планирование с нулевой задержкой setTimeout(func,0) или, что то же самое, setTimeout(func) используется для вызовов, которые должны быть исполнены как можно скорее, после завершения исполнения текущего кода.
  // Браузер ограничивает 4-мя мс минимальную задержку между пятью и более вложенными вызовами setTimeout, а также для setInterval, начиная с 5-го вызова.
  
  // Рекурсивный вызов
  let id = setTimeout(function logger() {
    console.log(`Hello World`);
    id = setTimeout(logger, 1000);
  }, 1000);
  ///////////////////////////////////////////
  function printNumbers(from, to) {
  
    // for (let i = from; i <= to; i++) {
    //   console.log(`${i}`);
    // }
  
    let current = from;
    let timerId = setInterval(function() {
      console.log(`current :`, current);
      if (current == to) {
        clearInterval(timerId);
      }
      current++;
    },1000);
  }
  // console.log(printNumbers(3, 10));
  
  ///////
  let counter = 0;
  
  setTimeout( () => {console.log(`counter :`, counter), 100});
  for (let j = 0; j < 1e8; j++) {
    counter++;
  }
  // Любой вызов setTimeout будет выполнен только после того, как текущий код завершится.