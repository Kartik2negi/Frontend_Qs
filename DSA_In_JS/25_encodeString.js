// Write a javascript program to get below output from given 
// input ?
//  I/P : abbcccddddeea
//  O/P : 1a2b3c4d2e1a

function encodeString(str) {
    let result = "";
    let count = 1;

    for (let i = 0; i < str.length; i++) {
        if (str[i] === str[i + 1]) {
            count++;
        } else {
            result += count + str[i];
            count = 1;
        }
    }
    return result;
}

const input = "abbcccddddeea";
const output = encodeString(input);
console.log(output);
// Outputs: 1a2b3c4d2e1a
