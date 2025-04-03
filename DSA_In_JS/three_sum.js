
let nums = [-1,0,1,2,-1,-4];
// Output: [[-1,-1,2],[-1,0,1]]


// Sol 1
function sum3(arr){
    let result = [];
    let unique = new Set();
    
    for(let i=0; i<arr.length-2; i++){
        for(let j=i+1; j<arr.length-1; j++){
            for(let k=j+1; k<arr.length; k++){
                if(arr[i]+arr[j]+arr[k] == 0){
                    let triplet = [arr[i],arr[j],arr[k]].sort((a,b) => a-b);
                    let key = triplet.join(',');
                    if(!unique.has(key)){
                        unique.add(key);
                        result.push([arr[i],arr[j],arr[k]])
                    }
                }
            }
        }
    }
    return result;
}

// console.log(sum3(nums))

// Sol 2
function sum3(arr){
    arr.sort((a,b) => a-b);
    
    let result = [];
    
    for(let i=0; i<arr.length-2; i++){
        // skip duplicate
        if(i>0 && arr[i] == arr[i-1]) continue;
        
        let left = i + 1;
        let right = arr.length - 1;
        
        while(left < right){
            let sum = arr[i] + arr[left] + arr[right];
            
            if(sum == 0){
                result.push([arr[i],arr[left],arr[right]]);
                
                // skip duplicate
                while(left < right && arr[left] == arr[left+1]) left++;
                while(left < right && arr[right] == arr[right-1]) right--;
                
                left++;
                right--;
                
            }else if(sum < 0){
                left++;
            }else{
                right--;
            }
        }
    }
    return result;
}

console.log(sum3(nums))