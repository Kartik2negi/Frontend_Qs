function capitalizeWords(s) {
    let word = s.split(' ');

    for (let i = 0; i < word.length; i++) {
        word[i] = word[i].charAt(0).toUpperCase() + word[i].slice(1);
    }
    return word.join(' ');
}

console.log(capitalizeWords("hello world"));