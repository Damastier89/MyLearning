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

// Проверяет наличие пробелов строке(Можно использовать для дисейбла кнопок и т.п.)
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

function kebab(str) {
  return str.replace(/\b([A-Z][a-z]*)+\b/g, n => n.replace(/([A-Z])/g, '-$1').replace(/^-/, '').toLowerCase());
};
kebab('KebabCase noKebabCase No_Kebab_Case And FuckDonaldTrump!!'); // kebab-case noKebabCase No_Kebab_Case and fuck-donald-trump!!

function camelize(str) {
  let stepOne = str.split("_"); // разбивает str на массив
  let stepTwo = stepOne.map((word, index) => {  // Переводит в верхний регистр первые буквы всех элементом массива за исключением первого
    return index == 0 ? word : word[0].toUpperCase() + word.slice(1)
  });
  let result = stepTwo.join("");
  return result;
}
const result = camelize("list_style_imag") // listStyleImag
console.log(result)

const someString = 'This is some strange string';

// Развернуть строку
function reverse(str) {
  if (typeof(str) !== 'string') {
    return `Аргумент : '${str}', не является  строкой!`;
  }
  const result = str.split('').reverse().join('');
  return result;
}

console.log(reverse(someString));

// Вернет колличество символов в строке(страницы книги)
function amountOfPages(summary) {
  let allPage = '';
  let n = 0;

  for (let i = 1; i <= summary; i++) {
    allPage += i;

    if (allPage.length === summary) {
      n = i;
      break;
    }

  }
  console.log(`allPage`, allPage); // 1234567891011121314151617
  return n;
}

console.log(amountOfPages(25));