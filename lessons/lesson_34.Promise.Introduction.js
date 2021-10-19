/////////////////// Промисы, async/await ///////////////////
 /////////////////// Введение: колбэки ///////////////////

// Многие действия в JavaScript асинхронные.

function loadScript(src) {
  const script = document.createElement("script");
  script.src = src;
  document.head.append(script);
};
// загрузит и выполнит скрипт из...
loadScript('/tests.js')
// код, написанный после вызова функции loadScript,
// не будет дожидаться полной загрузки скрипта
// ...

// Такие функции называют «асинхронными», потому что действие (загрузка скрипта) будет завершено не сейчас, а потом.
// Если после вызова loadScript(…) есть какой-то код, то он не будет ждать, пока скрипт загрузится.

// Действительно, ведь у браузера не было времени загрузить скрипт. 
// Сейчас функция loadScript никак не позволяет отследить момент загрузки. 
// Скрипт загружается, а потом выполняется. Но нам нужно точно знать, когда это произойдёт, 
// чтобы использовать функции и переменные из этого скрипта.

// Давайте передадим функцию callback вторым аргументом в loadScript, 
// чтобы вызвать её, когда скрипт загрузится:

function loadScripts(src, callback) {
  const script = document.createElement("script");
  script.src = src;
  script.onload = () => callback(script);
  document.head.append(script);
};

// Теперь, если мы хотим вызвать функцию из скрипта, нужно делать это в колбэке:
loadScripts('https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.2.0/lodash.js', function(script) {
  // эта функция вызовется после того, когда загрузится скрипт
  console.log(`Здорово, скрипт ${script.src} загрузился`);
  console.log( _ ); // функция, объявленная в загруженном скрипте
});

// Такое написание называют асинхронным программированием с использованием колбэков. 
// В функции, которые выполняют какие-либо асинхронные операции, передаётся аргумент 
// callback — функция, которая будет вызвана по завершению асинхронного действия.


// Колбэк в колбэке
// Вызвать loadScript ещё раз уже внутри колбэка.

loadScripts(`https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.2.0/lodash.js`, function(script) {
  console.log(`Здорово, первый ${script.src} загрузился`);
    loadScripts(`https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.2.0/lodash.js`, function(script) {
      console.log(`Здорово, второй ${script.src} загрузился`);
  });
});
// Когда внешняя функция loadScript выполнится, вызовется та, что внутри колбэка.
// Каждое новое действие мы вынуждены вызывать внутри колбэка. 
// Этот вариант подойдёт, когда у нас одно-два действия, но для большего количества уже не удобно.


// Перехват ошибок

function improvedLoadScript(src, callback) {
  const script = document.createElement("script");
  script.src = src;
  script.onload = () => callback(null, script);
  script.onerror = () => callback(new Error(`Не удалось загрузить скрипт ${src}`))
  document.head.append(script);
};

improvedLoadScript(`https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.2.0/lodash.js`, function(error, script) {
  if (error) {
    // обрабатываем ошибку
    console.log(`Скрипт ${script.src} не загрузился...`);
  } else {
    console.log(`Скрипт ${script.src} работает...`);
  }
});
// Правила таковы:
// Первый аргумент функции callback зарезервирован для ошибки. В этом случае вызов выглядит вот так: callback(err).
// Второй и последующие аргументы — для результатов выполнения. В этом случае вызов выглядит вот так: callback(null, result1, result2…).
// Одна и та же функция callback используется и для информирования об ошибке, и для передачи результатов.


// Адская пирамида вызовов
improvedLoadScript('1.js', function(error, script) {

  if (error) {
    handleError(error);
  } else {
    // ...
    improvedLoadScript('2.js', function(error, script) {
      if (error) {
        handleError(error);
      } else {
        // ...
        improvedLoadScript('3.js', function(error, script) {
          if (error) {
            handleError(error);
          } else {
            // ...и так далее, пока все скрипты не будут загружены (*)
          }
        });

      }
    })
  }
});

// Мы можем попытаться решить эту проблему, изолируя каждое действие в отдельную функцию, вот так:
improvedLoadScript('1.js', step1);

function step1(error, script) {
  if (error) {
    handleError(error);
  } else {
    // ...
    improvedLoadScript('2.js', step2);
  }
}

function step2(error, script) {
  if (error) {
    handleError(error);
  } else {
    // ...
    improvedLoadScript('3.js', step3);
  }
}

function step3(error, script) {
  if (error) {
    handleError(error);
  } else {
    // ...и так далее, пока все скрипты не будут загружены (*)
  }
};


/////////////////////////////////////////////////////////////////////////////
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

//   <button onclick="go()">Click me</button>

//   <script>

//   function go() {
//     showCircle(150, 150, 100, div => {
//       div.classList.add('message-ball');
//       div.append("Hello, world!");
//     });
//   }

//   function showCircle(cx, cy, radius, callback) {
//     let div = document.createElement('div');
//     div.style.width = 0;
//     div.style.height = 0;
//     div.style.left = cx + 'px';
//     div.style.top = cy + 'px';
//     div.className = 'circle';
//     document.body.append(div);

//     setTimeout(() => {
//       div.style.width = radius * 2 + 'px';
//       div.style.height = radius * 2 + 'px';

//       div.addEventListener('transitionend', function handler() {
//         div.removeEventListener('transitionend', handler);
//         callback(div);
//       });
//     });
//   }
//   </script>


// // </body>
// // </html>

// console.log(`Loading data...`);

// setTimeout(() => {
//   console.log(`Update data...`);

//   const product = {
//     name: 'Samsung',
//     type: 'TV',
//     id: 1,
//   };

//   setTimeout(() => {
//     product.price = 200;
//     console.log(product);
//   }, 2000);

// }, 3000);

///////
console.log(`Loading data...`);

const product = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log(`Datas are preparation...`); 
    const productName = {
      name: 'Samsung',
      type: 'TV',
      id: 1,
    };
    if (productName) {
      resolve(productName);
    } else {
      reject(new Error(console.log(`Whooops o_O`)))
    }
    
  }, 2000);
}).then(
    productName => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log(`Datas are recevid and processed...`);
          productName.status = 'order';
          console.log(productName);
          resolve(productName);
        }, 2000);
      })
    }
  ).then(
    productName => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log(`Datas are recevid and processed...`);
          productName.isVip = true;
          resolve(productName);
        }, 2000)
      })
    }
  ).then(
    productName => {
      console.log(productName);
    }
  );


