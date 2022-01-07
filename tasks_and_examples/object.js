"use strict";
// Разница в том, что через Object.keys будут получены итерируемые свойства а,
// через Object.getOwnPropertyNames все свойства.

console.log(Object.keys(user)); // ['name', 'age', 'isAdmin'] 
console.log(Object.getOwnPropertyNames(user)); // ['name', 'age', 'isAdmin']

console.log(Object.keys(first)); // ['0', '1', '2', '3', '4']
console.log(Object.getOwnPropertyNames(first)); // ['0', '1', '2', '3', '4', 'length']

