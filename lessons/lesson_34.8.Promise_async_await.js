"use strict"

// Async/await
// Существует специальный синтаксис для работы с промисами, который называется «async/await». 

// Асинхронные функции
async function foo() {
  return 1;
};

// У слова async один простой смысл: эта функция всегда возвращает промис. 
// Значения других типов оборачиваются в завершившийся успешно промис автоматически.

foo().then(res => console.log(`${res}`)) // 1

// Так что ключевое слово async перед функцией гарантирует, что эта функция в любом случае вернёт промис.


// Await
// Ключевое слово await заставит интерпретатор JavaScript ждать до тех пор, 
// пока промис справа от await не выполнится. 
// После чего оно вернёт его результат, и выполнение кода продолжится.

async function fooAsync() {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve(`Done...`), 3000);
  });

  const result = await promise; // будет ждать, пока промис не выполнится (*)

  return console.log(result);
}

fooAsync();

// В данном примере выполнение функции остановится на строке (*) до тех пор, пока промис не выполнится. 
// Это произойдёт через секунду после запуска функции. 
// После чего в переменную result будет записан результат выполнения промиса, 
// и браузер отобразит console.log(result) «Done...».

// Обратите внимание, хотя await и заставляет JavaScript дожидаться выполнения промиса, 
// это не отнимает ресурсов процессора. Пока промис не выполнится, 
// JS-движок может заниматься другими задачами: выполнять прочие скрипты, обрабатывать события и т.п.

// await нельзя использовать в обычных функциях

async function showAvatar() {
  // запрашиваем JSON с данными пользователя
  const respone = await fetch(`data/user.json`);
  const user = await respone.json();

  // запрашиваем информацию об этом пользователе из github
  const gitHubResponse = await fetch(`https://api.github.com/users/${user.name}`);
  const gitHubUser = await gitHubResponse.json();

  // отображаем аватар пользователя
  const img = document.createElement(`img`);
  img.src = gitHubUser.avatar_url;
  img.classList.add('exemple');
  document.body.append(img);

  // ждём 3 секунды и затем скрываем аватар
  await new Promise((resolve, reject) => {
    setTimeout(() => resolve(), 5000);
  });

  img.remove();

  return gitHubUser;
};

showAvatar();


// Обработка ошибок
// Когда промис завершается успешно, await promise возвращает результат. 
// Когда завершается с ошибкой – будет выброшено исключение. 
// Как если бы на этом месте находилось выражение throw

async function f() {
  await Promise.reject(new Error("Упс!"));
}

// Делает то же самое, что и такой:

async function f() {
  throw new Error("Упс!");
}

// Но есть отличие: на практике промис может завершиться с ошибкой не сразу, 
// а через некоторое время. В этом случае будет задержка, а затем await выбросит исключение.
// Такие ошибки можно ловить, используя try..catch, как с обычным throw:

async function func() {
  try {
    const response = await fetch(`https://no-such-url`);
    const user = await response.json();
  } catch(err) {
    // перехватит любую ошибку в блоке try: и в fetch, и в response.json
    console.log(err); // TypeError: Failed to fetch
  }
}

func();

// Если у нас нет try..catch, асинхронная функция будет возвращать завершившийся с ошибкой промис (в состоянии rejected).
// В этом случае мы можем использовать метод .catch промиса, чтобы обработать ошибку:

async function fooo() {
  let response = await fetch('http://no-such-url');
}

// fooo() вернёт промис в состоянии rejected
fooo().catch(err => console.log(err)); // TypeError: failed to fetch // (*)

// Если забыть добавить .catch, то будет сгенерирована ошибка «Uncaught promise error» 
// и информация об этом будет выведена в консоль. 
// Такие ошибки можно поймать глобальным обработчиком,


// async/await и promise.then/catch
// При работе с async/await, .then используется нечасто, так как await автоматически ожидает завершения выполнения промиса. 
// В этом случае обычно (но не всегда) гораздо удобнее перехватывать ошибки, используя try..catch, нежели чем .catch.

// Но на верхнем уровне вложенности (вне async–функций) await использовать нельзя, 
// поэтому .then/catch для обработки финального результата или ошибок – обычная практика.

// Итого
// Ключевое слово async перед объявлением функции:

// Обязывает её всегда возвращать промис.
// Позволяет использовать await в теле этой функции.
// Ключевое слово await перед промисом заставит JavaScript дождаться его выполнения, после чего:

// Если промис завершается с ошибкой, будет сгенерировано исключение, как если бы на этом месте находилось throw.
// Иначе вернётся результат промиса.
// Вместе они предоставляют отличный каркас для написания асинхронного кода. Такой код легко и писать, и читать.

// Хотя при работе с async/await можно обходиться без promise.then/catch, иногда всё-таки приходится использовать эти методы 
// (на верхнем уровне вложенности, например). 
// Также await отлично работает в сочетании с Promise.all, если необходимо выполнить несколько задач параллельно.


/////////////////////////////////////////////////////////////////
async function loadJson(url) {
  try {
    const response = await fetch(url);

    if (response.status == 200) {
      const json = await response.json();
      return json;
    }
    console.log(json);
    
  } catch(err) {
      console.log(err);
  }
};

// loadJson(no-such-user.json);

///////

class HttpError extends Error {
  constructor(response) {
    super(`${response.status} for ${response.url}`);
    this.name = HttpError;
    this.response = response;
  }
};

async function loadJson(url) {
    const response = await fetch(url);

    if (response.status == 200) {
      const json = await response.json();
      return json;
    } else {
      throw new HttpError(response);
    }
};

// Запрашивать логин, пока github не вернёт существующего пользователя.
async function demoGitHubUser() {
  // Через цикл
  let user;
  while(true) {
    const name = prompt(`Введите логин,` ``);

    try {
      user = await loadJson(`https://api.github.com/users/${name}`);
      break; // ошибок не было, выходим из цикла
    } catch(err) {
      if (err instanceof HttpError && err.response.status == 404) {
        // после alert начнётся новая итерация цикла
        console.log(`Такого пользователя не существует, пожалуйста, повторите ввод.`);
      } else {
        // неизвестная ошибка, пробрасываем её
        throw err;
      }
    }
  };

  console.log(`Полное имя ${user.name}`);
  return user;

  // Через рекурсию
  // const name = prompt(Введите голин, ``);
  // return await loadJson(https://api.github.com/users/${name})
  //   .then(user => {
  //     console.log(Полное имя ${user.name});
  //     return user;
  //   })
  //   .catch(err => {
  //     if (err instanceof HttpError && err.response.status == 404) {
  //       console.log(Такого пользователя не существует, пожалуйста, повторите ввод.);
  //       return demoGitHubUser();
  //     } else {
  //       throw err;
  //     }
  //   });
}

demoGitHubUser();
