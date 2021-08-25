"use strict"
//////////////////// Set and Map ////////////////////

// Map – это коллекция ключ/значение, как и Object. 
// Но основное отличие в том, что Map позволяет использовать ключи любого типа.

// new Map() – создаёт коллекцию.
// map.set(key, value) – записывает по ключу key значение value.
// map.get(key) – возвращает значение по ключу или undefined, если ключ key отсутствует.
// map.has(key) – возвращает true, если ключ key присутствует в коллекции, иначе false.
// map.delete(key) – удаляет элемент по ключу key.
// map.clear() – очищает коллекцию от всех элементов.
// map.size – возвращает текущее количество элементов.

const map = new Map();
map.set("1", "string");
map.set(1, "numder");
map.set(true, 25);
map.get(1); // "numder"
map.get("1"); // "string"
map.size; // 3

// Map может использовать объекты в качестве ключей.

const user = {name: "Sergei"};

const visitsCoutMap = new Map();
visitsCoutMap.set(user, 11);
visitsCoutMap.get(user); // 11

// Перебор Map()

// map.keys() – возвращает итерируемый объект по ключам,
// map.values() – возвращает итерируемый объект по значениям,
// map.entries() – возвращает итерируемый объект по парам вида [ключ, значение], этот вариант используется по умолчанию в for..of.

const recipeMap = new Map([
  ["cucumber", 350],
  ["tomato", 400],
  ["potato", 500],
]);

// перебор по ключам 
for (let vegetable of recipeMap.keys()) {
  // console.log(vegetable); // cucumber, tomato, potato
};

// перебор по значениям
for (let amount of recipeMap.values()) {
  // console.log(amount); // 350, 400, 500
};

// перебор по элементам в формате [ключ, значение]
for (let entry of recipeMap) {
  // console.log(entry); // ["cucumber", 350], ["tomato", 400], ["potato", 500]
};

recipeMap.forEach((val, key, map) => {
  // console.log(`У ключа ${key} значение ${val} в Map:"${map}"`);
});

// Можно создать Map из обычного объекта
// object.fromEntries, делает противоположное, obj из Map
const obj = {
  name: "Sergei",
  age: 32
}

const mapFromObj = new Map(Object.entries(obj));// {"name" => "Sergei"}, {"age" => 32}


// Объект Set – это особый вид коллекции: «множество» значений (без ключей), 
// где каждое значение может появляться только один раз.

// new Set(iterable) – создаёт Set, и если в качестве аргумента был предоставлен итерируемый объект (обычно это массив), то копирует его значения в новый Set.
// set.add(value) – добавляет значение (если оно уже есть, то ничего не делает), возвращает тот же объект set.
// set.delete(value) – удаляет значение, возвращает true, если value было в множестве на момент вызова, иначе false.
// set.has(value) – возвращает true, если значение присутствует в множестве, иначе false.
// set.clear() – удаляет все имеющиеся значения.
// set.size – возвращает количество элементов в множестве.

const john = { name: "John" };
const pete = { name: "Pete" };
const mary = { name: "Mary" };

const set = new Set();
set.add(john);
set.add(pete);
set.add(mary);
set.add(john); // Повторно не добавляются
set.add(john); // Повторно не добавляются
set.size // 3

// Перебор объекта Set
const setProduct = new Set(["orange", "apple", "banana"]);
setProduct.forEach(val => {
  // console.log(`${val}`); // orange, apple, banana
});

for (let product of setProduct) {
  // console.log(`${product}`); // orange, apple, banana
}

// set.values() – возвращает перебираемый объект для значений,
// set.keys() – то же самое, что и set.values(), 
// присутствует для обратной совместимости с Map,
// set.entries() – возвращает перебираемый объект для пар вида [значение, значение], 
// присутствует для обратной совместимости с Map.

//////////////////////////////////////////
const arr22 = ["HTML", "Angular", "JavaScript", "TypeScript", "HTML", "CSS", "Angular",];

function uniqueSet(arr) {
  let result = Array.from(new Set(arr));
  return result.sort();
}   

const newArr22 = uniqueSet(arr22); // ["Angular", "CSS", "HTML", "JavaScript", "TypeScript"]

///////
function aclean(arr) {
  let map = new Map();
  
  for (let word of arr) {
    // разбиваем слово на буквы, сортируем и объединяем снова в строку
    let sorted = word.toLowerCase().split("").sort().join("");
    map.set(sorted, word);
  } 
  return Array.from(map.values())
}

const arr23 = ["nap", "teachers", "cheaters", "PAN", "ear", "era", "hectares"];
const newArr23 = aclean(arr23); // ["PAN", "hectares", "era"]

///////
const mapArr = new Map();
mapArr.set("name", "Sergei");

const keys = Array.from(mapArr.keys()); // ["name"]
keys.push("more"); // ["name", "more"]


// WeakMap – это Map-подобная коллекция, позволяющая использовать в качестве ключей только объекты, 
// и автоматически удаляющая их вместе с соответствующими значениями, 
// как только они становятся недостижимыми иными путями.

// WeakSet – это Set-подобная коллекция, которая хранит только объекты и удаляет их, 
// как только они становятся недостижимыми иными путями.

// Обе этих структуры данных не поддерживают методы и свойства, 
// работающие со всем содержимым сразу или возвращающие информацию о размере коллекции. 
// Возможны только операции на отдельном элементе коллекции.

// WeakMap и WeakSet используются как вспомогательные структуры данных в дополнение к «основному» месту хранения объекта. 
// Если объект удаляется из основного хранилища и нигде не используется, 
// кроме как в качестве ключа в WeakMap или в WeakSet, то он будет удалён автоматически.