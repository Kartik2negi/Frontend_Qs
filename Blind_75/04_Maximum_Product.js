// Qs - https://www.greatfrontend.com/interviews/study/blind75/questions/algo/array-maximum-product-contiguous

// Pattern
// Dynamic Programming / Kadane Variant

// Key Insight
// Negative numbers can flip minimum product into maximum product
// Need to track both current max and current min

// Approach

// Track:
// currentMax
// currentMin
// result

// If current number is negative:
// swap currentMax and currentMin

// Update:
// currentMax
// currentMin

// Update global result

// Important Line
// [currentMax, currentMin] = [currentMin, currentMax];
// Negative number reverses max/min behavior

// Time Complexity
// O(n)

// Space Complexity
// O(1)

function maxProductSubArray(arr) {
    let currentMax = arr[0];
    let currentMin = arr[0];
    let result = arr[0];

    for (let i = 1; i < arr.length; i++) {

        let num = arr[i];

        if (num < 0) {
            [currentMax, currentMin] = [currentMin, currentMax];
        }

        currentMax = Math.max(num, currentMax * num);
        currentMin = Math.min(num, currentMin * num);

        result = Math.max(result, currentMax);

    }
    return result;
}

console.log(maxProductSubArray([1, 2, -3, 5, 1]))
console.log(maxProductSubArray([9]))
console.log(maxProductSubArray([1, 2, 0, -1, 8, -4]))
