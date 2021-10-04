//////////////////// Обработка ошибок, "try..catch" ///////////////////

try {
  // код...
} catch (err) {
  // обработка ошибки
};

// Работает она так:

// Сначала выполняется код внутри блока try {...}.
// Если в нём нет ошибок, то блок catch(err) игнорируется: выполнение доходит до конца try и потом далее, полностью пропуская catch.
// Если же в нём возникает ошибка, то выполнение try прерывается, 
// и поток управления переходит в начало catch(err). Переменная err (можно использовать любое имя) 
// содержит объект ошибки с подробной информацией о произошедшем.

// Без ошибки
try {
  console.log(`Начало блока try...`);
  console.log(`Конец блока try...`);
} catch {
  console.log(`Catch игнорируется, ошибок нет...`);
};

// С ошибкой
try {
  console.log(`Начало блока try...`);

  dfdfdfdf; // ошибка, переменная не определена!

  console.log(`Конец блока try (никогда не выполнится)...`);
} catch {
  console.log(`Catch... Возникла ошибка!`);
};

// ошибки называют «ошибками во время выполнения», а иногда «исключениями».

// try..catch работает синхронно.
// Исключение, которое произойдёт в коде, 
// запланированном «на будущее», например в setTimeout, try..catch не поймает.

try {
  setTimeout(function() {
    // noSuchVariable; // скрипт упадёт тут
  }, 1000);
} catch (e) {
  console.log( "не сработает" );
}

// Чтобы поймать исключение внутри запланированной функции, 
// try..catch должен находиться внутри самой этой функции:

setTimeout(function() {
  try {
    noSuchVariable; // try..catch обрабатывает ошибку!
  } catch {
    console.log( "ошибка поймана!" );
  }
}, 1000);

try {
  lalala; // ошибка, переменная не определена!
} catch(err) {
  console.log(err.name); // ReferenceError
  console.log(err.message); // lalala is not defined
  console.log(err.stack); // ReferenceError: lalala is not defined at (...стек вызовов)

  // Можем также просто вывести ошибку целиком
  // Ошибка приводится к строке вида "name: message"
  console.log(err); // ReferenceError: lalala is not defined
}


// Использование «try…catch»

const json = `{"name": "Kate", "age": "38"}`; // данные с сервера
const user = JSON.parse(json); // преобразовали текстовое представление в JS-объект

// теперь user - объект со свойствами из строки
user; // {name: 'Kate', age: '38'}

// Если json некорректен, JSON.parse генерирует ошибку, то есть скрипт «падает».

const badJson = `{ некорректный JSON}`;

try {

  const user = JSON.parse(badJson); // <-- тут возникает ошибка...
  console.log(user); // не сработает

} catch(error) {
  // ...выполнение прыгает сюда
  console.log(`Извините, в данных ошибка, мы попробуем получить их ещё раз...`);
  console.log(error.name); // SyntaxError
  console.log(error.massage);
}


// Для того, чтобы унифицировать обработку ошибок, воспользуемся оператором throw.
// Оператор throw генерирует ошибку.

const error = new Error(`Ого, ошибка! о_О`);
console.log(error.name); // Error
console.log(error.message); // Ого, ошибка! о_О

try {
  JSON.parse(`{ bad json o_O}`)
} catch(err) {
  console.log(err.name); // SyntaxError
  console.log(err.message); // Unexpected token b in JSON at position 2
}

const serverJson = `{"age": "25"}`; // данные неполны

try {

  const user = JSON.parse(serverJson); // <-- выполнится без ошибок
  if (!user.name) {
    throw new Error(`Данные неполны: нет имени o_O`); // (*)
  }

  console.log(user.name);

} catch(err) {

  console.log(`JSON Error : ${err.message}`); // JSON Error : Данные неполны: нет имени o_O

}

// В строке (*) оператор throw генерирует ошибку SyntaxError с сообщением message. 
// Точно такого же вида, как генерирует сам JavaScript. 
// Выполнение блока try немедленно останавливается, и поток управления прыгает в catch.

// Теперь блок catch становится единственным местом для обработки всех ошибок: 
// и для JSON.parse и для других случаев.


// Проброс исключения

// Есть простое правило:
// Блок catch должен обрабатывать только те ошибки, которые ему известны, и «пробрасывать» все остальные.

// Техника «проброс исключения» выглядит так:
// Блок catch получает все ошибки.
// В блоке catch(err) {...} мы анализируем объект ошибки err.
// Если мы не знаем как её обработать, тогда делаем throw err.

let json = '{ "age": 30 }'; // данные неполны
try {

  let user = JSON.parse(json);

  if (!user.name) {
    throw new SyntaxError("Данные неполны: нет имени");
  }

  blabla(); // неожиданная ошибка

  console.log( user.name );

} catch(e) {

  if (e.name == "SyntaxError") {
    console.log( "JSON Error: " + e.message );
  } else {
    throw e; // проброс (*)
  }
}

// Ошибка в строке (*) из блока catch «выпадает наружу» 
// и может быть поймана другой внешней конструкцией try..catch (если есть), или «убьёт» скрипт.


// try…catch…finally

// Конструкция try..catch может содержать ещё одну секцию: finally.
// Если секция есть, то она выполняется в любом случае:
// после try, если не было ошибок,
// после catch, если ошибки были.

try {
  // ... пробуем выполнить код...
} catch(e) {
  // ... обрабатываем ошибки ...
} finally {
  // ... выполняем всегда ...
}