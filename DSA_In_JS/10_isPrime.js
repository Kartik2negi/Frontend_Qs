// Write a JavaScript function to check if a given number is prime.

function isPrime(num) {
    if (num <= 1) {
        return false;
    }

    // Loop up to the square root of the number
    for (let i = 2; i < Math.sqrt(num); i++) {
        if (num % i === 0) {
            return false;
        }
    }
    return true;
}

console.log(isPrime(17));
