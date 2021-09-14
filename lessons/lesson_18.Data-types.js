console.log(document.head);
console.log(document.body.childNodes); // узлы , дети body
console.log(document.body.firstChild); // первая нода
console.log(document.body.lastChild); // последняя нода
console.log(document.body.firstElementChild); // первый элемент
console.log(document.body.lastElementChild); // последний элемент

console.log(document.querySelector('#current').parentNode.parentNode); // получить узел родителя, родителя
console.log(document.querySelector('#current').parentElement); // получить элемент родителя

// data-атрибут. data - произвольное название
console.log(document.querySelector('[data-current="3"]').nextSibling); // получить node
console.log(document.querySelector('[data-current="3"]').nextElementSibling); // получить элемент

// аналог childNodes
for (let node of document.body.childNodes) {
    if (node.nodeName == '#text') { // node.nodeName - имя ноды
        continue;
    }
    console.log(node);
}