/// MutationObserver, ResizeObserver, MutationRecord ///

// MutationObserver предоставляет возможность получать уведомления об изменении определённых DOM-элементов. 
// MutationObserver является заменой Mutation Events, определённой в спецификации DOM3 Events.

// Интерфейс ResizeObserver сообщает об изменениях в размерах Elementсодержимого или рамки поля , 
// либо ограничивающей рамки файла SVGElement.

// A MutationRecord представляет собой индивидуальную мутацию DOM. Это объект, который находится внутри массива, 
// переданного в MutationObserver функцию обратного вызова.

const box = document.querySelector('.box');

box.style.height ='300px';
box.style.width ='300px'
box.style.background ='red';

let observer = new MutationObserver(mutationRecord => {
  console.log(mutationRecord) // [MutationRecord]
});

observer.observe(box, {
  childList: true,
}); // первый аргумент за которым будем следить, второй это конфиг(какие изменения будем отслеживать)