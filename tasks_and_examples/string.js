"use string";
function upFirstChar(str) {
  // Берем первый элемент строки str[0] и склеиваем её с остальным str.slice(1)
  let upChar = str[0].toUpperCase() + str.slice(1);
  console.log(str.slice(1)); // ergei
  return upChar;
}

console.log(upFirstChar('sergei')); // Sergei

function upFirstLetter(str) {
  // Метод split() разбивает объект String на массив строк путём разделения строки указанной подстрокой.
  const arrFromString = str.split(''); 
  console.log(arrFromString); // 'k', 'a', 't', 'e']
  arrFromString[0] = arrFromString[0].toUpperCase();
  return arrFromString.join('');
}

console.log(upFirstLetter('kate')); // Kate

// Проверяет наличие пробелов строке(Можно использовать для бисейбла кнопок и т.п.)
function isStringByOnlySpaces(str) {
    let res = true;
    str.split('').forEach(symbol => symbol === ' '  ?  null  :  res = false);
    return res;
  }

function isStringByOnlySpaces(str) {
  let res = true;
  str.replace(/^\s+/i, '').replace(/\s+$/i, '') === '' ? null : res = false;
  return res;
}  