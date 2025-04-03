
let user = {
    name : 'Peter Parker',
    age : 25
}

function getUserData(city){
    return `Hi, I am ${this.name} and ${this.age}. I live in ${city}.`
}

// call polyfill

Function.prototype.myCall = function(obj,...args){
    // Ensure arguments are correct
    if(typeof this !== 'function'){
        throw new TypeError('myCall must be called on a function')
    }
    
    let sym = Symbol();
    obj[sym] = this;
    
    let res = obj[sym](...args);
    delete obj[sym];
    return res;
}

let res1 = getUserData.myCall(user,'UK');
console.log(res1)

// apply polyfill

Function.prototype.myApply = function(obj,...args){
    // Ensure arguments are correct
    if(typeof this !== 'function'){
        return new TypeError('myApply must be called on a function')
    }
    let sym = Symbol();
    obj[sym] = this;
    
    let ans = obj[sym](...args[0]);
    delete obj[sym];
    return ans;
}

let res2 = getUserData.myApply(user,['UK','PK']);
console.log(res2)


// bind polyfill

Function.prototype.myBind = function(obj,...args){
    // Ensure arguments are correct
    if(typeof this !== 'function'){
        return new TypeError('myBind must be called on a function')
    }

    let fn = this;
    
    return function(...args2){
        return fn.apply(obj,[...args,...args2])
    }
}

let res3 = getUserData.myBind(user,'UK');
console.log(res3('PK'))
