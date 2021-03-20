const now = new Date();
Date.parse();

/* console.log(now.getFullYear());
console.log(now.getMonth() + 1);
console.log(now.getDay());
console.log(now.getUTCHours());
console.log(now.getHours()); */

/* console.log(now.getTimezoneOffset());
console.log(now.getTime()); */

/* console.log(now.setHours(14));
console.log(now); */

let start = new Date();

for (let i = 0; i < 100000; i++) {
    let some = i ** 3;
}

/* let end = new Date();

alert(`Цикл отработал за ${end - start} милисекунд`); */

let string = 'JavaScript is the best lenguage in the world. Let`s learn JavaScript together!';
console.log(string.replace('JavaScript', 'java'));
/* console.log(string.replaceAll('JavaScript', 'c++')); */