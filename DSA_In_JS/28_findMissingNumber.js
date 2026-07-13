function findMissingNumber(nums) {
    let n = nums.length;

    let expectedSum = (n * (n + 1)) / 2;
    let sum = 0;

    for (let i = 0; i < nums.length; i++) {
        sum += nums[i];
    }

    return expectedSum - sum;
}

// For debugging
console.log(findMissingNumber([3, 0, 1])); // 2

// sum n = n (n+1) / 2  =   3 (3+1) / 2 = 3*4 / 2 = 12 / 2 = 6
// 1 2 3 = 6