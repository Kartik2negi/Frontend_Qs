// How to check whether a string is palindrome or not ?

function checkPallindrome(str) {
    let len = str.length;

    for (let i = 0; i < len / 2; i++) {
        if (str[i] !== str[len - i - 1]) {
            return `Not a pallindrome.`
        }
    }
    return `It's a pallindrome.`;
}

console.log(checkPallindrome("madam"));
