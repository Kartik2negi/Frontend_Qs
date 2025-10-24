// Given a string, write a javascript function to count the 
// occurrences of each character in the string.

function countCharacters(str) {
    let feqCount = {};

    for (let key of str) {
        feqCount[key] = (feqCount[key] || 0) + 1;
    }
    return feqCount;
}

// Example usage:
const result = countCharacters("hello");
console.log(result);
// Output: { h: 1, e: 1, l: 2, o: 1 };
