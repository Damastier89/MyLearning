"use strict"

const rub = document.querySelector("#rub");
const usd = document.querySelector("#usd");

usd.addEventListener('input', () => {
  const request = new XMLHttpRequest();

  // methods XMLHttpRequest()
  request.open("GET", "data/current.json"); // принемает настройки для запроса
  request.setRequestHeader("Content-type", "application/json; charset=utf-8")// что именно мы отправляем (заголовки)
  request.send();

  request.addEventListener('load', () => {
    if (request.status === 200) {
      const data = JSON.parse(request.response);
      rub.value = (data.current.usd * +usd.value).toFixed(2);
    } else {
      rub.value = "Что-то пошло не так o_O"
    }

  }); // отслеживает статус завпроса в текущий момент


  // properties XMLHttpRequest()
  
});