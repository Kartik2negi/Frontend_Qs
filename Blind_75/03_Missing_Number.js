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

console.log(findMissingNumberInSequence([1,3,0]))
console.log(findMissingNumberInSequence([1]))
console.log(findMissingNumberInSequence([3,0,4,2,1]))
