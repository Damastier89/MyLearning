"use strict";

//////////////////////// Рекурсия и стек /////////////////////////

// Рекурсия – это приём программирования, полезный в ситуациях, 
// когда задача может быть естественно разделена на несколько аналогичных, 
// но более простых задач. 
// Или когда задача может быть упрощена до несложных действий плюс простой вариант той же задачи. 
// Или, как мы скоро увидим, для работы с определёнными структурами данных.

// В процессе выполнения задачи в теле функции могут быть вызваны другие функции для выполнения подзадач. 
// Частный случай подвызова – когда функция вызывает сама себя. Это как раз и называется рекурсией.

// Рекурсия – это термин в программировании, означающий вызов функцией самой себя. 
// Рекурсивные функции могут быть использованы для элегантного решения определённых задач.

// Когда функция вызывает саму себя, это называется шагом рекурсии. 
// База рекурсии – это такие аргументы функции, которые делают задачу настолько простой, 
// что решение не требует дальнейших вложенных вызовов.

// Рекурсивно определяемая структура данных – это структура данных, 
// которая может быть определена с использованием самой себя.

// Итеративный способ: цикл for:
function pow(x, n) {
  let result = 1;

  for (let i = 0; i < n; i++) {
    result *= x;
  }

  return result;
}

pow(2 , 3); // 8

// Рекурсивный способ: упрощение задачи и вызов функцией самой себя:
function powRec(x, n) {
  return (n == 1) ? x : (x * powRec(x, n - 1));
}

powRec(2, 3); // 8

// Контекст выполнения – специальная внутренняя структура данных, 
// которая содержит информацию о вызове функции. 
// Она включает в себя конкретное место в коде, на котором находится интерпретатор, 
// локальные переменные функции, 
// значение this (мы не используем его в данном примере) и прочую служебную информацию.

// Обратим внимание на требования к памяти!!! 
// Рекурсия приводит к хранению всех данных для неоконченных внешних вызовов в стеке, 
// и в данном случае это приводит к тому, что возведение в степень n хранит в памяти n различных контекстов.

// Рекурсивные обходы

let companyOne = {
  sales: [{
    name: 'John',
    salary: 1000
  }, {
    name: 'Alice',
    salary: 600
  }],

  development: {
    sites: [{
      name: 'Peter',
      salary: 2000
    }, {
      name: 'Alex',
      salary: 1800
    }],

    internals: [{
      name: 'Jack',
      salary: 1300
    }]
  }
};

// Функция для подсчёта суммы зарплат
// На каждой итерации заходим в объект и ищем там массив и к масиву применяем reduce 
function sumSalaries(departament) {
  if (Array.isArray(departament)) {
    return departament.reduce((result , currentArray) => result + currentArray.salary, 0);
  } else {
    let sum = 0;
    for (let subdep of Object.values(departament)) {
      console.log(subdep);
      sum += sumSalaries(subdep);
    }
    return sum;
  }
}

// Связанный список

let list = { value: 1};
list.next = { value: 2};
list.next.next = { value: 3};
list.next.next.next = { value: 4 , next: null};

// И, конечно, мы можем вставить или удалить элементы из любого места.
// Например, для добавления нового элемента нам нужно обновить первый элемент списка:
list = { value: "new item", next: list};

// Чтобы удалить элемент из середины списка, нужно изменить значение next предыдущего элемента:
list.next = list.next.next;


////////////////////////////////////////////////////////
// Вычислить сумму чисел до данного
// Решение с помощью цикла:
function sumToOne(n) {
  let sum = 0;
  for (let i = 0; i <= n; i++) {
    sum += i;
  }
  return sum;
}

sumToOne(100); // 5050

// Решение через рекурсию:
function sumToTwo(n) {
  if (n == 1) { 
    return 1;
  } else {
    return n + sumToTwo(n - 1);
  }
}

sumToTwo(100); // 5050

// Решение по формуле: n * (n + 1) / 2
function sumToThree(n) {
  return  n * (n + 1) / 2;
}

sumToThree(100); // 5050

///////
function factorial(n) {
  return ( n != 1) ? n * factorial(n - 1) : 1;
}

factorial(5); // 120

///////
// Последовательность чисел Фибоначчи определяется формулой Fn = Fn-1 + Fn-2. То есть, 
// следующее число получается как сумма двух предыдущих.
// Первые два числа равны 1, затем 2(1+1), затем 3(1+2), 5(2+3) и так далее: 1, 1, 2, 3, 5, 8, 13, 21....
function fibanachi(n) {
  let a = 1;
  let b = 1;
  // Цикл начинается с i = 3, потому что первое и второе значения последовательности заданы a = 1, b = 1.
  for (let i = 3; i <= n; i++) {
    let c = a + b;
    a = b;
    b = c;
  }
  return b;
}

fibanachi(7); // 13

///////
let lists = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: {
        value: 4,
        next: null
      }
    }
  }
};
// Решение с использованием цикла
function printList(list) {
  let temporary = list;

  while(temporary) {
    // console.log(temporary.value);
    temporary = temporary.next;
  }
}

printList(lists) // 1, 2, 3, 4

// Решение через рекурсию
function printListRec(list) {

  // console.log(list.value); // выводим текущий элемент

  if (list.next) {
    printListRec(list.next); // делаем то же самое для остальной части списка
  }

}

printListRec(lists); // 1, 2, 3, 4

let students = {
  js: [
    {
      name: 'Kate',
      progress: 100
    },
    {
      name: 'Sergei',
      progress: 60
    }
  ],
  typeScript: {
    basic: [
      {
        name: 'Ann',
        progress: 20
      },
      {
        name: 'Sam',
        progress: 18
      }
    ],
    pro: [
      {
        name: 'Peter',
        progress: 10
      }
    ],
    semi: {
      students: [
        {
          name: 'Boris',
          progress: 100
        }
      ]
    }
  }
};

function getAllProgressByIteration(data) {
  let totalProgress = 0;
  let students = 0;

  for (let course of Object.values(data)) {
    if (Array.isArray(course)) {
      students += course.length;

      for (let i of course) {
        totalProgress += i.progress;
      }

    } else {
      for (let subCourse of Object.values(course)) {
        students += subCourse.length;

        for (let i of subCourse) {
          totalProgress += i.progress;
        }

      }
    }

  }

  console.log(totalProgress, totalProgress);
  console.log(students, students);

  return totalProgress / students;
}

console.log(getAllProgressByIteration(students)); // 74


function getAllProgressByRecursion(data) {
  if (Array.isArray(data)) {
    let total = 0;

    for (let i of data) {
      total += i.progress;
    }

    return [total, data.length];
  } else {
    let total = [0, 0];

    for(let subData of Object.values(data)) {
      const subDataArray = getAllProgressByRecursion(subData);
      total[0] += subDataArray[0];
      total[1] += subDataArray[1];
    }

    return total;
  }
}

const result = getAllProgressByRecursion(students);
const allResult = result[0] / result[1];

console.log(allResult); // 74


function factorial(n) {
  if (typeof(n) !== 'number' || !Number.isInteger(n)) {
      return "Ошибка, проверьте данные";
  }

  if (n >= 1) {
      return n * factorial(n - 1);
  } else {
      return 1;
  }

  // Более короткий вариант, который вы можете встретить
  // Но не учитывает отрицательные значения
  return n ? n * factorial(n - 1) : 1;
}

factorial(5)