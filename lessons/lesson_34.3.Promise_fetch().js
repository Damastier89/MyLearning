"use strict"
// Более сложный пример: fetch

// Во фронтенд-разработке промисы часто используются, чтобы делать запросы по сети

// const promise = fetch(url);

// Этот код запрашивает по сети url и возвращает промис. 
// Промис успешно выполняется и в свою очередь возвращает объект response после того, 
// как удалённый сервер присылает заголовки ответа, но до того, как весь ответ сервера полностью загружен.

// Чтобы прочитать полный ответ, надо вызвать метод response.text(): он тоже возвращает промис, 
// который выполняется, когда данные полностью загружены с удалённого сервера, и возвращает эти данные.

fetch('data/user.json')
// .then в коде ниже выполняется, когда удалённый сервер отвечает
.then(function(response) {
  // response.text() возвращает новый промис,
  // который выполняется и возвращает полный ответ сервера,
  // когда он загрузится
  return response.text();
}).then(function(text) {
  // ...и здесь содержимое полученного файла
  return text; // {"name": "Kate", "age": "38", "isAdmin": false}
});

// Есть также метод response.json(), который читает данные в формате JSON. 
// то же самое, что и раньше, только теперь response.json() читает данные в формате JSON
fetch('data/user.json')
  .then( response => response.json())
  .then( user => user); // {name: 'Kate', age: '38', isAdmin: false}


// Можно послать запрос на GitHub, чтобы загрузить данные из профиля пользователя и показать его аватар:
// Запрашиваем user.json
// fetch('data/user.json')
//   // Загружаем данные в формате json
//   .then(response => response.json())
//   // Делаем запрос к GitHub
//   .then(user => fetch(`https://api.github.com/users/${user.name}`))
//   // Загружаем ответ в формате json
//   .then(response => response.json())
//   // Показываем аватар (githubUser.avatar_url) в течение 5 секунд (возможно, с анимацией)
//   .then(githubUser => new Promise(function(resolve, reject) { // (*)
//     let img = document.createElement('img');
//     img.src = githubUser.avatar_url;
//     img.className = "promise-avatar-example";
//     document.body.append(img);

//     setTimeout(() => {
//       img.remove();
//       resolve(githubUser); // (**)
//     }, 5000);
//   }))
//   .then(githubUser => console.log(`Закончили показывать ${githubUser.name}`));

// То есть, обработчик .then в строке (*) будет возвращать new Promise, 
// который перейдёт в состояние «выполнен» только после того, 
// как в setTimeout (**) будет вызвана resolve(githubUser).

// Соответственно, следующий по цепочке .then будет ждать этого.
// Как правило, все асинхронные действия должны возвращать промис.

// Это позволяет планировать после него какие-то дополнительные действия. 
// Даже если эта возможность не нужна прямо сейчас, она может понадобиться в будущем.


// Разобьём написанный код на отдельные функции, пригодные для повторного использования:

function loadJson(url) {
  return fetch(url).then(response => response.json());
};

function loadGithubUser(name) {
  return fetch(`https://api.github.com/users/${name}`)
    .then(name => name.json());
}
function showAvatar(githubUser) {
  return new Promise(function(resolve, reject) {
    let img = document.createElement(`img`);
    img.src = githubUser.avatar_url;
    img.classList.add(`show`);
    document.body.append(img);

    setTimeout(() => {
      img.remove();
      resolve(githubUser)
    }, 3000)
  }); 
}

loadJson(`data/user.json`)
  .then(user => loadGithubUser(user.name))
  .then(showAvatar)
  .then(githubUser => console.log(`Показ аватара ${githubUser.name} завершён`))
  .catch(error => console.log(error));

loadJson(`data/users/user.json`)
  .then(user => loadGithubUser(user.name))
  .then(showAvatar)
  .then(githubUser => console.log(`Показ аватара ${githubUser.name} завершён`))
  .catch(error => console.log(error));