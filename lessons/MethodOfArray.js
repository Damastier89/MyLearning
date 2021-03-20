/////////////////////////////////////////////////////// copy array

const arr = ["Sergey", "Olga", "Irina", "Svetlana", "Anastasia"];

console.log(arr);

const arrUsers = arr.slice();
arrUsers.push("Elena");
console.log(arrUsers);

const arrUsersOne = arr.slice(1, 4);
console.log(arrUsersOne);

//const arrUsersTwo = arr.splice(2, 0, "Victor", 2000); !не работает!
//console.log(arrUsersTwo);

console.log(arr);

let index = [];
for (let i = 0; i < arr.length; i++) {
    index.push(arr[i].toUpperCase());
}

index.push("Viktoria");
console.log(index);

let newIndexTwo = [];
for (let i = 0; i < arr.length; i++) {
    newIndexTwo[i] = arr[i];
}
newIndexTwo.push("Ivan");
console.log(newIndexTwo);

const newIndexThree = [...arr, "Anna", 123];
newIndexThree.push("Max");
//console.log(newIndexThree);

/////////////////////////////////////////////////////////// copy obj

const obj = {
    firstName: 'Sergey',
    lastName: 'Lantcev',
    age: 31,
    city: "Kaluga",
    isAdmin: false
}

let {
    age,
    city
} = obj; // диструктуризация

city = 'Moscow';
console.log(city);

console.log(obj);

function copyObj(mainObj) {
    let objCopy = {};
    for (let key in mainObj) {
        objCopy[key] = mainObj[key];

    }
    return objCopy;
}

let newObj = copyObj(obj);

newObj.genus = 'human';

console.log(newObj);
console.log(obj);

//////////////////////////////////////////////////////// Замыкание

function getUrl(url) {
    let domen = ".com";
    return function () {
        return `https://${url}${domen}`;
    };
}

let google = getUrl("google");
console.log(google());
let amazon = getUrl("amazon");
console.log(amazon());

/////////////////////////////////////////////////////// Method array

const people = [{
        name: 'Sergei',
        age: 25,
        budget: 5000
    },
    {
        name: 'Sergei',
        age: 31,
        budget: 15300
    },
    {
        name: 'Irina',
        age: 32,
        budget: 4300
    },
    {
        name: 'Elena',
        age: 19,
        budget: 6700
    },
    {
        name: 'Roman',
        age: 32,
        budget: 5700
    },
    {
        name: 'Anna',
        age: 27,
        budget: 8700
    },
    {
        name: 'Ivan',
        age: 18,
        budget: 3000
    },
];

//console.log(people);

let peopleOne = [];
for (let i = 0; i < people.length; i++) {
    peopleOne.push(people[i]);
}

peopleOne.push({
    name: 'Olga',
    age: 28,
    budget: 9400
}, {
    name: 'Anastasia ',
    age: 23,
    budget: 4000
})
//console.log(peopleOne);

let person = [];
for (person of people) {
    person = people;
} // не копирует

person.push({
    name: 'Svetlana',
    age: 34,
    budget: 9400
});
//console.log(person);

// ForEach
//people.forEach(person => {
//	person.city = 'kaluga';
//});
//console.log(people);

// Map
// можно создавать новые массивы и заносить их в новые переменные, служит для преобразования текушего массива в новый.

const newPeople = people.map(person => {
    return `${person.name}: ${person.budget}`;
});

newPeople.push({
    name: 'Roman',
    age: 23,
    budget: 4000
});
//console.log(newPeople);


// Filter
// Служит для фильтрации исходного массива по определенным условиям.
// по сути нужно чтобы callback вернул true или false. true записывается в новый массив.

const adults = [];
for (let i = 0; i < people.length; i++) {
    if (people[i].age > 21) {
        adults.push(people[i]);
    }
}

//console.log(adults);

const adulstAll = people.filter(person => person.age < 21);
//console.log(adulstAll);

// Reduce
// Служит для получния финального значения совершив итерацию по какому-то массиву.

//let peopleBuget = 0;
//for (let i = 0; i < people.length; i++) {
//	peopleBuget += people[i].budget;
//}

// Reduce принемает 2 параметра
//1) первый аргумент callback - Функция, выполняющаяся для каждого элемента массива, принимает два аргумента:
// 1.1 первый аргумент это (total) 
// 1.2 второй аргумент это итерируемый элемент у массива (person)
//2) второй аргумент reduce это начальное значение(значение по умолчанию) которое будет присвоено total
// На каждой итерации мы изменяем total добавляя и обновляя его значение.

const amount = people.reduce((total, person) => {
    return total += person.budget;
}, 0);

//console.log(amount);

//Find 
//Метод find() возвращает значение первого найденного в массиве элемента, которое удовлетворяет условию переданному в callback функции. В противном случае возвращается undefined.
const findName = person.find(person => person.name === 'Sergei');
//console.log(findName);

//FindIndex
const findIndex = person.findIndex(person => person.name === 'Sergei');
//console.log(findIndex);


// Отфильтровать пользователей и найти общий бюджет отфильтрованных пользователей.
const personAmount = people
    .filter(person => person.budget < 7000)
    .reduce((total, person) => total + person.budget, 0);

//console.log(personAmount);

////////////////////////////JS_2021_NEW//////////////////////////////////
const string = 'JavaScript is the best language in the world. Let`s learn JavaScript together';

//console.log(string.replace("JavaScript", "Java"));
//console.log(string.replaceAll("JavaScript", "Java"));

// Promise

function createPromise(value, delay, error) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            error ? reject(error) : resolve(value);
        }, delay)
    })
}

const p1 = createPromise(1, 250);
const p2 = createPromise(2, 700, 'Unknow error');
const p3 = createPromise(3, 350, 'Some costume error');

async function start() {
    try {
        const res = await Promise.any([p2, p3]); /// any ждет пока хотя бы один из промисов выполнится и возвращает его.
        res
    } catch (e) {
        //console.log(e);
        //console.log(e.errors);
    }

}

start();

// Private methods

class Person {
    birthYear = 1989;

    // private method #
    get# age() {
        return this.#getYear() - this.birthYear;
    }

    logAge() {
        console.log(this.#age)
    }

    # getYear() {
        return new Date().getFullYear();
    }
}

let personOne = new Person()
//console.log(personOne.logAge())
//console.log(personOne.#getYear());