// Create a function which will accepts two arrays arr1 and 
// arr2. The function should return true if every value in arr1 has 
// its corresponding value squared in array2. The frequency of 
// values must be same. (Effecient)

//  Inputs and outputs:
//  =============
//  [1,2,3] , [4,1,9] ==> true
//  [1,2,3] , [1,9] ==> false
//  [1,2,1] , [4,4,1] ==> false (must be same frequency)


function isSameFrequency(arr1, arr2) {
    if (arr1.length !== arr2.length) {
        return false;
    }

    let f1 = {};

    for (let key of arr1) {
        f1[key] = (f1[key] || 0) + 1;
    }

    let f2 = {};

    for (let key of arr2) {
        f2[key] = (f2[key] || 0) + 1;
    }

    for (let key in f1) {
        if (!f2[key * key]) {
            return false;
        }
        if (f1[key] !== f2[key * key]) {
            return false;
        }
    }
    return true;
}

console.log(isSameFrequency([1, 2, 5], [25, 4, 1]));
