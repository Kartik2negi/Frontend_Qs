// Pipe
// Create a pipe function that takes a series of functions and executes them
// from left to right on an input value.

// Compose
// Create a compose function that takes a series of functions and executes them
// from right to left on an input value

const pipe = (...fns) => {
    return function(args){
        return fns.reduce((acc,cur) => cur(acc) ,args)
    }
};

const compose = (...fns) => {
    return function(args){
        return fns.reduceRight((acc,cur) => cur(acc) ,args)
    }
};

const add5 = (x) => x + 5;
const multiply2 = (x) => x * 2;
const subtract3 = (x) => x - 3;
const toString = (x) => `${x}`;

const result1 = pipe(add5, multiply2, subtract3)(10);// (10 + 5) * 2 - 3 = 27
console.log(result1);

const result3 = compose(add5, multiply2, subtract3)(10);// (10 - 3) * 2 + 5 = 19
console.log(result3);