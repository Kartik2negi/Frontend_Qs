let arr = [4,1,3,9,8,7,6];

// Quick Sort
function sort(arr){
    if(arr.length<=1) return arr;
    
    let pivot = arr[arr.length-1];
    let left=[];
    let right=[];
    
    for(let i=0; i<arr.length-1;i++){
        if(arr[i]<pivot){
            left.push(arr[i])
        }else{
            right.push(arr[i])
        }
    }
    return [...sort(left),pivot,...sort(right)]
}

console.log(sort(arr))

// Polyfill of sort

// Sol 1
Array.prototype.mySort = function(){
    if(this.length<=1) return this;
    
    let pivot = this[this.length-1];
    let left=[];
    let right=[];
    
    for(let i=0; i<this.length-1;i++){
        if(this[i]<pivot){
            left.push(this[i])
        }else{
            right.push(this[i])
        }
    }
    return [...left.mySort(), pivot, ...right.mySort()]
}

console.log(arr.mySort())


// Sol 2
Array.prototype.mySort = function(compareFn){
    
    compareFn = compareFn || function(a,b){
        a = String(a);
        b = String(b);
        if(a<b) return -1;
        if(a>b) return 1;
        return 0;
    }
    
    const quickSort = (arr) => {
        // base cond
        if(arr.length<=1) return arr;
        
        let pivot = arr[arr.length - 1];
        let left = [];
        let right = [];
        
        for(let i=0; i<arr.length-1; i++){
            if(compareFn(arr[i],pivot) < 0){
                left.push(arr[i])
            }else{
                right.push(arr[i])
            }
        }
        return [...quickSort(left), pivot, ...quickSort(right)]
    }
    
    let sorted = quickSort(this);
    
    for(let i=0; i< this.length; i++){
        this[i] = sorted[i]
    }
    return this;
}

console.log(arr.mySort((a,b) => a-b))