const log = function (a, b, ...rest) {
    console.log(a, b, rest);
};

log('basic', 'rest', 'a', 'b', 'c');

function calcOrDuble(number, basis = 2) {
    console.log(number * basis);
}

calcOrDuble(2, 3);