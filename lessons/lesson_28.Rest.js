const log = function (a, b, ...rest) {
    console.log(a, b, rest);
};

log('basic', 'rest', 'a', 'b', 'c');