// Qs - https://www.greatfrontend.com/interviews/study/blind75/questions/algo/array-find-duplicate

function findDuplicates(numbers) {
    const seen = new Set();

    for (const num of numbers) {

        if (seen.has(num)) {
            return true;
        }

        seen.add(num);
    }

    return false;
}

console.log(findDuplicates([5, 7, 1, 3]))
console.log(findDuplicates([10, 7, 0, 0, 9]))
console.log(findDuplicates([3, 2, 6, 5, 0, 3, 10, 3, 10, 5]))