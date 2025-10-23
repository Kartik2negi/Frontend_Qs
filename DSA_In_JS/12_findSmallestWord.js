// Find the smallest word in a given sentence ?

function findSmallestWord(str) {
    let splitWord = str.split(" ");
    let smallWord = splitWord[0];

    for (let i = 1; i < splitWord.length; i++) {
        if (smallWord.length > splitWord[i].length) {
            smallWord = splitWord[i];
        }
    }
    return smallWord;
}

console.log(findSmallestWord("Find the smallest word"));