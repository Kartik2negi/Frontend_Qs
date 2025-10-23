// Program to find longest word in a given sentence ?

function findLongestWord(str) {

    let splitWord = str.split(" ");
    let longestWord = "";

    for (let i = 0; i < splitWord.length; i++) {
        if (splitWord[i].length > longestWord.length) {
            longestWord = splitWord[i];
        }
    }
    return longestWord;
}

console.log(findLongestWord("Hi Iam Saikrishna Iam a UI Developer"));
