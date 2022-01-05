"use strict";

const bookPrice = {};

bookPrice.apple = 1.67;
bookPrice.milk = 2.36;
bookPrice.avocado = 1.97;

console.log(bookPrice); // { apple: 1.67, milk: 2.36, avocado: 1.97 }
console.log(bookPrice.avocado); // 1.97

///// Проверка голосов //////

const voted = {};

function checkVoted(name) {
  if (voted[name]) {
    console.log(`Вышвырни их вон!`);
  } else {
    voted[name] = true;
    console.log(`Пусть они проголосуют!`);
  }
}
console.log(voted); // {Kate: true, Sergei: true} 
console.log(`Kate`, checkVoted(`Kate`)); // Пусть они проголосуют!
console.log(`Kate`, checkVoted(`Kate`)); // Вышвырни их вон!
console.log(`Sergei`, checkVoted(`Sergei`)); // Пусть они проголосуют!