/* const timerId = setTimeout(function (text) {
    console.log(text);
}, 3000, 'hello'); */



const btn = document.querySelector('.btn');
let timerIdOne;
let i = 0;

function myAnimation() {
    const elem = document.querySelector('.box');
    let pos = 0;

    const id = setInterval(frame, 20);

    function frame() {
        if (pos == 300) {
            clearInterval(id);
        } else {
            pos++;
            elem.style.top = pos + 'px';
            elem.style.left = pos + 'px';
        }
    }
}

btn.addEventListener('click', myAnimation);

/* function long() {
    if (i === 3) {
        clearTimeout(timerIdOne);
    }
    console.log('Sergei');
    i++;
}

btn.addEventListener('click', () => {
    timerIdOne = setInterval(long, 1500);
});

let id = setTimeout(function log() {
    console.log('HelloOne');
    id = setTimeout(log, 500);
}, 500); */