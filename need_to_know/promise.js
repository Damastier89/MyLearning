// Promise
console.log(`Клиент: хочу получить список пользователей`)

const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log(`Сервер: запрашивает список пользователей в БД`);
    console.log(`...`)
    resolve()
  }, 3000);
})

promise.then(() => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const users = [
        {uid: 'id_1', name: 'Sergei'},
        {uid: 'id_2', name: 'Maxim'}
      ];
      reject(`БД не смогла получить список пользователей`)
      console.log(`БД: формирую список пользователей`, users)
      console.log(`...`);
      resolve(users);
    }, 1500)
  })
})
.then((dbUsers) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(`Сервер: трансформирует данные для клиента`);
      console.log(`...`);
      const users = dbUsers.map( user => {
        return {
          id: user.uid,
          firstName: user.name,
          timestamp: Date.now()
        }
      })
      resolve(users)
    }, 1500)
  })
})
.then((users) => {
  setTimeout(() => {
    console.log(`Клиент: получил данные и отобразил их`, users);
  }, 3000)
})
.catch(error => {
  console.error(error);
})
.finally(() => {
  console.log(`Finally`);
})