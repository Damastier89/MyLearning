"use strict"
////////////////////////////  Date and Time ///////////////////////////
const now = new Date();
Date.parse();

console.log(now.getFullYear());
console.log(now.getMonth() + 1);
console.log(now.getDay());
console.log(now.getUTCHours());
console.log(now.getHours());

console.log(now.getTimezoneOffset());
console.log(now.getTime());

console.log(now.setHours(14));
console.log(now);

const nowDate = new Date();

const Jan01_1970 = new Date(0); // Thu Jan 01 1970 03:00:00 GMT+0300
const Jan02_1970 = new Date(24 * 3600 * 1000); // Fri Jan 02 1970 03:00:00 GMT+0300

// Датам до 1 января 1970 будут соответствовать отрицательные таймстампы, например
const Dec31_1969 = new Date(-24 * 3600 * 1000); // Wed Dec 31 1969 03:00:00 GMT+0300

const start = Date.now();
for (let i = 0; i < 100000; i++) {
  let doSomething = i * i * i;
}
const end = Date.now();
console.log(`Цикл отработал за ${end - start}`);


// Метод Date.parse(str) считывает дату из строки.
// Формат строки должен быть следующим: YYYY-MM-DDTHH:mm:ss.sssZ, где:
// YYYY-MM-DD – это дата: год-месяц-день.
// Символ "T" используется в качестве разделителя.
// HH:mm:ss.sss – время: часы, минуты, секунды и миллисекунды.
// Необязательная часть 'Z' обозначает часовой пояс в формате +-hh:mm. Если указать просто букву Z, то получим UTC+0.

//////////////////////////////////
const Feb20_2012 = new Date(2012, 1, 20, 3, 12); // Mon Feb 20 2012 03:12:00 GMT+0400

///////
function getWeekDay(date) {
	const days = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'];

	return days[date.getDay()];
}

const date = new Date(2014, 0, 3); // Fri Jan 03 2014 00:00:00 GMT+0400
getWeekDay(date); // ПТ
