// Program to find Reverse of a string without using built-in method ?

function findReverse(str) {
    let reverseStr = '';

    for (let i = str.length - 1; i >= 0; i--) {
        reverseStr += str[i];
    }
    return reverseStr;
}

console.log(findReverse("Hello Iam Saikrishna Ui Developer"))
