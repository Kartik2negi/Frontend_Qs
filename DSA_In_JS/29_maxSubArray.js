// Solution (Kadane's Algorithm)
function maxSubArray(nums) {
    let currentSum = nums[0];
    let maxSum = nums[0];

    for (let i = 1; i < nums.length; i++) {
        // Either extend the previous subarray or start a new one
        currentSum = Math.max(nums[i], currentSum + nums[i]);

        // Update the maximum sum seen so far
        maxSum = Math.max(maxSum, currentSum);
    }

    return maxSum;
}

console.log(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4])); // 6

// Brute Force (for interview discussion)
function maxSubArray(nums) {
    let maxSum = -Infinity;

    for (let i = 0; i < nums.length; i++) {
        let sum = 0;

        for (let j = i; j < nums.length; j++) {
            sum += nums[j];
            maxSum = Math.max(maxSum, sum);
        }
    }

    return maxSum;
}

console.log(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4])); // 6