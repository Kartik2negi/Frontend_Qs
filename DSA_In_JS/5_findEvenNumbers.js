// Write a JavaScript function that takes an array of numbers 
// and returns a new array with only the even numbers.

function findEvenNumbers(arr) {
    let result = [];

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] % 2 === 0) {
            result.push(arr[i]);
        }
    }
    return result;
}

// Example usage:
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, -8, 19, 9, 10];
console.log("Even numbers:", findEvenNumbers(numbers));
