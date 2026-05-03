// Write a JavaScript program to find the maximum number in an array. 

function findMax(arr) {
    if (arr.length === 0) {
        return undefined;
    }

    let maxNumber = -Infinity;

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > maxNumber) {
            maxNumber = arr[i];
        }
    }
    return maxNumber;
}

// Example usage:
const numbers = [1, 6, -33, 9, 4, 8, 2];
console.log("Maximum number is:", findMax(numbers));
