// Find the max count of consecutive 1ʼs in an array

function findConsecutive(arr) {
    let currentConsCount = 0;
    let maxCount = 0;

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === 1) {
            currentConsCount++;
            maxCount = Math.max(currentConsCount, maxCount);
        } else {
            currentConsCount = 0;
        }
    }
    return maxCount;
}


console.log(findConsecutive([1, 1, 9, 1, 9, 19, 7, 1, 1, 1, 2, 5, 1]));