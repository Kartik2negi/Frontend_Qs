// Polyfill of Arrays method

// 1 - Map

Array.prototype.myMap = function(cb){
    if(typeof cb !== 'function'){
        throw new TypeError(cb + ' is not a function');
    }
    let result = [];
    
    for(let i=0; i<this.length; i++){
        result.push(cb(this[i],i,this))
    }
    return result;
}

let arr = [1,2,3,4,5];

let multiplyByTwo = arr.myMap(item => item*2);
console.log(multiplyByTwo)


// 2 - Filter

Array.prototype.myFilter = function(callback){
    if(typeof callback !== 'function'){
        throw new TypeError(callback + 'is not a function');
    }
    let result = [];
    
    for(let i=0; i<this.length; i++){
        if(callback(this[i],i,this)){
            result.push(this[i]);
        }
    }
    return result;
}

let filterGreaterThanTwo = arr.myFilter(item => item > 2);
console.log(filterGreaterThanTwo);


// 3 - Reduce

Array.prototype.myReduce = function(cb,initVal){
    if(typeof cb !== 'function'){
        throw new TypeError(cb + ' is not a function')
    }
    let acc = initVal == 'undefined' ? this[0] : initVal;
    let startInd = initVal == 'undefined' ? 1 : 0;
    
    for(let i=startInd; i<this.length; i++){
        acc = cb(acc,this[i],i,this)
    }
    return acc;
}

let sumAll = arr.myReduce((acc,cur) => acc+cur, 0)
console.log(sumAll)


// 4 - Every

Array.prototype.myEvery = function(cb){
    if(typeof cb !== 'function'){
        throw new TypeError(cb + ' is not a function');
    }
    
    for(let i=0; i<this.length; i++){
        if(!cb(this[i],i,this)){
            return false;
        }
    }
    return true;
}

let res = arr.myEvery(i => i>0);
console.log(res)