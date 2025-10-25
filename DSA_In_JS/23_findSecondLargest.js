//  Find the 2nd largest element from a given array ? 
// [100,20,112,22]

function findSecondLargest(arr) {
    if (arr.length < 2) {
        throw new Error(`Array must contain
         at least two elements.`);
    }
    
    let largest = -Infinity;
    let second = -Infinity;

    for (let i = 0; i < arr.length; i++) {

        if (arr[i] > largest) {
            second = largest;
            largest = arr[i];
        } else if (arr[i] < largest && arr[i] > second) {
            second = arr[i];
        }
    }
    return second;
}

console.log(findSecondLargest([100, 20, 112, 110, 22]));
