let incr = 10,
    decr = 10;
incr++;
decr--;

console.log(incr++);
console.log(decr--);


/* Операторы ставнения > Больше | < Меньше | >= Больше или равно | <= Меньше или равно | == Не строгое равенство | === Строгое равенство | != Не строгое не равенство | !== Строгое не равенство   */

const isChecked = true,
    isClose = true;

console.log(isChecked && isClose);
console.log(2 + 2 * 2 !== "6"); // true

// ! - оператор отрицания
//* Логические операторы || - или(запинается на true) / && - и возвращает true только если оба оператора true(запинается на false)

5 > 4 // true ok 
"ананас" > "яблоко" // false not
"2" > "12" // true not
undefined == null // true ok
undefined === null // false ok
null == "\n0\n" // false not
null === +"\n0\n" // false ok