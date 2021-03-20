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