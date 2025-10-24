// Write a JavaScript function that returns the Fibonacci sequence up to a given number of terms.

function fibonacciSequence(num) {
    // base cond
    if (num <= 0) {
        return []
    } else if (num === 1) {
        return [0]
    }

    let result = [0, 1];

    for (let i = 2; i < num; i++) {
        let sum = result[i - 1] + result[i - 2];
        result.push(sum);
    }
    return result;
}

// Example usage:
const numTerms = 10;
const fibonacciSeries = fibonacciSequence(numTerms);
console.log(fibonacciSeries);
// Output: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
