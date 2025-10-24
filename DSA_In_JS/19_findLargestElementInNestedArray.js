// Write a JavaScript program to find the largest element in a 
// nested array.

function findLargestElement(array){
    let maxElement = -Infinity;
    
    const traverse = (arr) => {
        
        for(let i=0; i<arr.length; i++){
            if(Array.isArray(arr[i])){
                traverse(arr[i]);
            }else{
                maxElement = Math.max(maxElement, arr[i]);
                
                // without in-built method
                // if(arr[i] > maxElement) {
                //     maxElement = arr[i];
                // }
            }
        }
    }
    
    traverse(array);
    
    return maxElement;
    
}

// Example usage:
const array = [[3, 4, 58],[709, 8, 9, [10, 11]], [111, 2]];
console.log("Largest element:", findLargestElement(array));
