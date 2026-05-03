let arr = [1, 2, 3, 4, 2, 2];

// Solution 1
function removeDuplicate(arr) {
    let unique = [];
    
    for(let i=0; i<arr.length; i++){
        if(!unique.includes(arr[i])){
            unique.push(arr[i])
        }
    }
    return unique;
}

console.log(removeDuplicate(arr))

// Solution 2
function removeDuplicate(arr) {
    let unique = [];
    let seen = new Map();
    
    for(let i=0; i<arr.length; i++){
        if(!seen.has(arr[i])){
            unique.push(arr[i]);
            seen.set(arr[i],true)
        }
    }
    return unique;
}

console.log(removeDuplicate(arr))