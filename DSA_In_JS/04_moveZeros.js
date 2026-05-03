// 1st
function moveZeros(arr) {
    let insertPos = 0;

    // Move all non-zero elements to the front
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] !== 0) {
            arr[insertPos] = arr[i];
            insertPos++;
        }
    }

    // Fill the remaining positions with zeros
    while (insertPos < arr.length) {
        arr[insertPos] = 0;
        insertPos++;
    }

    return arr;
}

console.log(moveZeros([0, 1, 0, 3, 12]));
// 👉 [1, 3, 12, 0, 0]


// 2nd
function moveZeros(arr) {
  const nonZeros = arr.filter(num => num !== 0);
  const zeros = arr.filter(num => num === 0);
  return [...nonZeros, ...zeros];
}

console.log(moveZeros([0, 1, 0, 3, 12]));
// 👉 [1, 3, 12, 0, 0]
