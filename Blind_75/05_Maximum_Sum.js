// Qs - https://www.greatfrontend.com/interviews/study/blind75/questions/algo/array-maximum-sum-contiguous


// Pattern
// Kadane’s Algorithm
// Dynamic Programming

// Key Insight
// Negative running sum cannot help future subarray
// Reset when starting new subarray gives better result

// Approach
// Track:
// currentSum
// maxSum

// At every element:
// either start new subarray
// or continue previous subarray

// Update global maximum

// Important Line
// currentSum = Math.max(num, currentSum + num);
// Decide:
// start fresh
// or continue previous subarray

// Time Complexity
// O(n)

// Space Complexity
// O(1)

function maxSumSubArray(arr) {
    let currentSum = arr[0];
    let result = arr[0];

    for (let i = 1; i < arr.length; i++) {
        let num = arr[i];

        currentSum = Math.max(num, currentSum + num);
        result = Math.max(result, currentSum);
    }
    return result;
}

console.log(maxSumSubArray([-1, 5, -3, 9, -11]))
console.log(maxSumSubArray([9]))
console.log(maxSumSubArray([1, 2, 3, 4]))