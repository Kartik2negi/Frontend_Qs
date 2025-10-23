// Find the factorial of given number ?

function findFactorial(num) {
    // base cond
    if (num === 1 || num === 0) {
        return 1;
    }
    return num * findFactorial(num - 1);
}

console.log(findFactorial(5))
