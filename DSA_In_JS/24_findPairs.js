//  Program challenge: Find the pairs from given input ?
//  input1 : [1, 2, 3, 4, 5, 6, 7, 8, 9];
//  input2 : 10;
//  output = [[4, 6], [3, 7], [2, 8], [1, 9]]

function findPairs(input1, input2) {
    let seen = new Map();
    let result = [];

    for (let i = 0; i < input1.length; i++) {
        let comp = input2 - input1[i];

        if (seen.has(input1[i])) {
            result.push([comp, input1[i]]);
        }
        seen.set(comp, true);
    }
    return result;
}


const input1 = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const input2 = 10;
const output = findPairs(input1, input2);
console.log(output);
// [[1, 9], [2, 8], [3, 7], [4, 6], [5, 5]]
