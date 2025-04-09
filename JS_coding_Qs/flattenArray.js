// Write custom function for Array.flat() using both recursive and iterative
// approaches.

// const flattenRecursive = (arr) => {
// 	 //code here
// };

// const flattenIterative = (arr) => {
// 	// code here
// };



// Follow up
// // Write a function to flatten a nested array up to a given depth
// const flattenRecursiveWithDepth = (arr) => {
// 	// code here
// };


// Sol 1

function flattenRecursive(arr){
    let result = [];
    
    for(let i=0; i<arr.length; i++){
        if(Array.isArray(arr[i])){
            result.push(...flattenRecursive(arr[i]))
        }else{
            result.push(arr[i])
        }
    }
    return result;
}

console.log(flattenRecursive(arr));


// Sol 2

function flattenIterative(arr){
    let result = [];
    let stack = [...arr];
    
    while(stack.length){
        let ele = stack.pop();
        if(Array.isArray(ele)){
            stack.push(...ele)
        }else{
            result.push(ele)
        }
    }
    return result.reverse();
}

console.log(flattenIterative(arr))


// Sol 3

function flattenRecursiveWithDepth(arr,depth){
    let result = [];
    
    if(depth == 0) return arr;
    
    for(let el of arr){
        if(Array.isArray(el) && depth > 0){
            result.push(...flattenRecursiveWithDepth(el,depth-1))
        }else{
            result.push(el)
        }
    }
    return result
}

console.log(flattenRecursiveWithDepth(arr,3))