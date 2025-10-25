// Write a javascript function that reverses the order of words
// in a sentence without using the built-in reverse() method.

function reverseWords(str) {
    let reverseword = "";
    let word = "";

    for (let i = 0; i < str.length; i++) {
        if (str[i] !== " ") {
            word += str[i];
        } else {
            reverseword = word + " " + reverseword;
            word = "";
        }
    }
    reverseword = word + " " + reverseword;
    return reverseword.trim();
}

// Example usage
console.log(reverseWords("ChatGPT is awesome "));
//"awesome is ChatGPT"
