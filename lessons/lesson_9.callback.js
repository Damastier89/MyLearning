"use strict";

function first() {
    // do something
    setTimeout(function () {
        console.log(1);
    }, 500);
}

function second() {
    console.log(2);
}

first();
second();



function learnJS(lang, callback) {
    console.log(`I am learn: ${lang}`);
    callback();
}

function done() {
    console.log('I am finished this class!');
}
learnJS('JavaScript', done);