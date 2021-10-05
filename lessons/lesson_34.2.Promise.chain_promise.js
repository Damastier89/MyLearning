// Цепочка промисов
new Promise(function(resolve, reject) {
  setTimeout(() => resolve(1), 2000) // (*)
}).then(
  function(result) {
    console.log(result); // 1
    return result * 2; 
  }
).then(
  function(result) {
    console.log(result); // 2
    return result * 2; 
  }
).then(
  function(result) {
    console.log(result); // 4
    return result * 2; 
  }
).then(
  function(result) {
    console.log(result); // 8
    return result;
  }
);

// Идея состоит в том, что результат первого промиса передаётся по цепочке обработчиков .then.
// Всё это работает, потому что вызов promise.then тоже возвращает промис, так что мы можем вызвать на нём следующий .then.

// Классическая ошибка новичков: технически возможно добавить много обработчиков .then к единственному промису. Но это не цепочка.

// let promise6 = new Promise(function(resolve, reject) {
//   setTimeout(() => resolve(1), 1000);
// });

// promise6.then(function(result) {
//   alert(result); // 1
//   return result * 2;
// });

// promise6.then(function(result) {
//   alert(result); // 1
//   return result * 2;
// });

// promise6.then(function(result) {
//   alert(result); // 1
//   return result * 2;
// });

// Мы добавили несколько обработчиков к одному промису. 
// Они не передают друг другу результаты своего выполнения, а действуют независимо.


// Возвращаем промисы
// Обработчик handler, переданный в .then(handler), может вернуть промис.
// В этом случае дальнейшие обработчики ожидают, пока он выполнится, и затем получают его результат.
new Promise(function(resolve, reject) {
  setTimeout(() => resolve(1), 2000);
}).then(
  function(result) {
    console.log(result); // 1
    return new Promise(function(resolve, reject) {
      setTimeout(() => resolve( result * 2 ), 2000);
    });
  },
).then(
  function(result) {
    console.log(result); // 2
    return new Promise(function(resolve, reject) {
      setTimeout(() => resolve( result * 2 ), 2000);
    });
  }
).then(
  function(result) {
    console.log(result); // 4
    return new Promise(function(resolve, reject) {
      setTimeout(() => resolve( result * 2), 2000);
    });
  }
).then(
  function(result) {
    console.log(result); // 8
  }
);


// Пример: loadScript
function loadScript(src) {
  return new Promise(function(resolve, reject) {
    const script = document.createElement("script");
    script.src = src;
    
    script.onload = () => resolve(script);
    script.onerror = () => reject(new Error(`Ошибка загрузки скрипта : ${src}`));

    document.head.append(script);
  })
};

loadScript("/article/promise-chaining/one.js")
  .then(script => loadScript("/article/promise-chaining/two.js"))
  .then(script => loadScript("/article/promise-chaining/three.js"))
  .then(script => {
    // скрипты загружены, мы можем использовать объявленные в них функции
    // эта функция имеет доступ к переменным script1, script2 и script3
    one();
    two();
    three();
  });

// Здесь каждый вызов loadScript возвращает промис, и следующий обработчик в .then срабатывает, 
// только когда этот промис завершается. Затем инициируется загрузка следующего скрипта и так далее. 
// Таким образом, скрипты загружаются один за другим.