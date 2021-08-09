"use strict";

if (4 == 5) {
    console.log('yes');
} else {
    console.log('no');
}

/* if (numder < 49) {
    console.log('No');
} else if (numder == 50) {
    console.log('Они равны');
} else if (numder > 49) {
    console.log('Yes');
} */

/* (numder == 49) ? console.log('Они равны'): console.log('No'); */

const numder = 50;
switch (numder) {
    case 49:
        console.log('No');
        break;
    case 100:
        console.log('No');
        break;
    case 50:
        console.log('Yes');
        break;
    default:
        console.log('Не в этот раз!');
}

let question = prompt(`Какое "офециальное" название JS?`, "");

if (question == "ECMAScript") {
  alert(`Верно!`);
} else {
  alert(`Не знаете, ECMAscript!`)
}

let num = 100
let age = 20;

let result = (a + b < 4) ? "мало" : "много";

if (a + b < 4) {
  result = 'Мало';
} else {
  result = 'Много';
}

if (!age >= 14 && !age <= 90) {}
if (age <= 14 || age >= 90 ){}
for (let i = 0; i < age; i++) {
  if (!age >= 14 && !age <= 90) {
    console.log(`${i}`);
  } else {
    console.log(`Не в диапазоне`);
  }
}

let userName = prompt(`Кто там?`, "");

if (userName == "Админ") {
  let password =  prompt(`Введите пароль`, "");
    if(password == "Я главный") {
      alert(`Здравствуйте`);
    } else if (password == null || password == "") {
      alert(`Отменено`);
    } else {
      alert(`Неверный пароль`);
    }
} else if (userName == null || userName == "") {
  alert(`Отменено`);
} else {
  alert(`Я вас не знаю`);
}

let browser = prompt(``,'');

if (browser == "Edge") {
  alert(`You've got the Edge!`);
} else if (browser == 'Chrome' || 'Firefox' || 'Safari' || 'Opera') {
  alert(`Okay we support these browsers too`);
} else {
  alert(`We hope that this page looks ok!`)
};

const number = +prompt(`Введите число между 0 и 3`, '');
switch(number) {
  case 0:
    alert(`Вы ввели число 0`);
    break;
  case 1:
    alert(`Вы ввели число 1`);
    break;
  case 2:
  case 3:
    alert('Вы ввели число 2, а может и 3');
    break;
  default:
    alert(`Вы написалы х.....ю`);          
}

switch (browser) {
  case 'Edge':
    alert( "You've got the Edge!" );
    break;

  case 'Chrome':
  case 'Firefox':
  case 'Safari':
  case 'Opera':
    alert( 'Okay we support these browsers too' );
    break;

  default:
    alert( 'We hope that this page looks ok!' );
}
