"use strict";

/* let a = 5,
    b = a;

b = b + 5;

console.log(a);
console.log(b);

const obj = {
    a: 5,
    b: 1
};

const copy = obj;

copy.a = 10;

console.log(obj);
console.log(copy); */

function copyObj(mainObj) {
	let objCopy = {};

	let key;
	for (key in mainObj) {
		objCopy[key] = mainObj[key]; // пройдется по переданному обьекту и передаст скопированные свойства в новый обьект
	}
	return objCopy;
}

const numbers = {
	a: 1,
	b: 2,
	c: {
		d: 3,
		e: 4
	}
};

/* let newObj = copyObj(numbers);
newObj.a = 20;
newObj.c.d = 10;
console.log(newObj);
console.log(numbers); */

const add = {
	d: 15,
	e: 10
};
console.log(add);
console.log(Object.assign(numbers, add));

const newAdd = Object.assign({}, add);
newAdd.d = 20;
console.log(newAdd);

const oldArray = ['a', 'b', 'c'];
const newArray = oldArray.slice();

console.log(oldArray);
newArray.push('d');
console.log(newArray);

const video = ['youtube', 'rutube', 'vk'],
      blogs = ['wordpress', 'blogger', 'livejournal'],
      internet = [...video, ...blogs, 'facebook'];

console.log(internet);

function log(a, b, c) {
	console.log(a);
	console.log(b);
	console.log(c);
}

const num = [1, 4, 6];
log(...num);

const array = ['a', 'b'];
const newArrray = [...array];
newArrray.push('c');
console.log(array);
console.log(newArrray);

const q = {
	one: 1,
	two: 2
};

const newObj = {
	...q
};
newObj.three = 3;
console.log(q);
console.log(newObj);