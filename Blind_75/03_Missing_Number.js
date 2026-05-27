// Qs - https://www.greatfrontend.com/interviews/study/blind75/questions/algo/array-find-missing-number-in-sequence

// Pattern
// Math / Sum Formula

// Approach
// Calculate expected sum from 0 → n
// Calculate actual array sum
// Return difference

// Key Insight
// Missing number creates difference between expected and actual sum

// Formula
// n(n+1) / 2

// Time Complexity
// O(n)

// Space Complexity
// O(1)

// Alternative Approach
// XOR method
// Avoids sum calculation
// Also works in O(n) time and O(1) space


// Solution 1

function findMissingNumberInSequence(numbers) {
    const n = numbers.length;

    const expectedSum = (n * (n + 1)) / 2;

    let actualSum = 0;

    for (const num of numbers) {
        actualSum += num;
    }

    return expectedSum - actualSum;
}

console.log(findMissingNumberInSequence([1, 3, 0]))
console.log(findMissingNumberInSequence([1]))
console.log(findMissingNumberInSequence([3, 0, 4, 2, 1]))


// Solution 2

// ## XOR Solution — Notes

// ### Pattern
// * Bit Manipulation (XOR)

// ### XOR Properties
// a ^ a = 0
// a ^ 0 = a

// * Same numbers cancel each other
// * Order does not matter in XOR


// ### Approach
// 1. XOR all numbers from `0 → n`
// 2. XOR all array elements
// 3. Matching numbers cancel out
// 4. Remaining value is missing number

// ### Key Insight
// * Every duplicate pair becomes `0`
// * Only missing number remains at end

// ### Important Line
// xor ^= i;

// Equivalent to:
// xor = xor ^ i;

// ### Example
// 0 ^ 1 ^ 2 ^ 3 ^ 3 ^ 0 ^ 1

// After cancellation:
// 2

// ### Time Complexity
// O(n)

// ### Space Complexity
// O(1)


function findMissingNumberInSequence(numbers) {

    const n = numbers.length;

    let xor = 0;

    // XOR all numbers from 0 → n
    for (let i = 0; i <= n; i++) {
        xor ^= i;
    }
    console.log(xor)
    // XOR array elements
    for (const num of numbers) {
        xor ^= num;
    }

    return xor;
}

console.log(findMissingNumberInSequence([1, 3, 0]))
// console.log(findMissingNumberInSequence([1]))
// console.log(findMissingNumberInSequence([3,0,4,2,1]))
