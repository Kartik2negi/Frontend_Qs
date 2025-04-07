// two sum

let nums = [2,7,11,15];
let target = 9

function twoSum(arr,t){
    let seen = new Map();
    
    for(let i=0; i< arr.length; i++){
        let comp = t - arr[i];
        
        if(seen.has(comp)){
            return [seen.get(comp), i]
        }
        seen.set(arr[i],i);
    }
}

console.log(twoSum(nums,target))