// Given two strings. Find if one string can be formed by 
// rearranging the letters of other string.  (Effecient)

// Inputs and outputs: 
// "aaz","zza" => false

function isStringCreated(str1,str2){
    if(str1.length !== str2.length) {
        return false;
    }
    
    let feq = {};
    
    for(let key of str1){
        feq[key] = (feq[key] || 0) + 1;
    }
    
    for(let key of str2){
        if(feq[key]){
            feq[key] = feq[key] - 1;
        }else{
            return false;
        }
    }
    return true;
}

console.log(isStringCreated("anagram","nanramg"));
