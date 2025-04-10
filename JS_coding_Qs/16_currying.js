

// Sol 1
// Basic currying

function curry(a){
    return function(b){
        if(b== undefined){
           return a; 
        }
        return curry(a+b)
    }
}

console.log(curry(1)(2)(3)())


// Sol 2

// Asked in Birdeye

function sum(...args1){
    
    let sumOfArgs1 = args1.reduce((acc,cur) => acc+cur,0)
    
    return function(...args2){
        
        if(args2.length == 0) {
            return sumOfArgs1;
        }
        
        let sumOfArgs2 = args2.reduce((acc,cur) => acc+cur,0)
        
        return sum(sumOfArgs1,  sumOfArgs2)

        // Note - remove sumOfArgs2
        // return sum(sumOfArgs1,...args2)
        
    }
    
}

console.log(sum(1)(2, 3)(4, 5, 6)())
 
console.log(sum(1, 5, 8)(2, 3)(4, 5, 6)(5, 5)())

// optimize sol

function sum(...args1){
    
    let total = args1.reduce((acc,cur) => acc+cur,0);
    
    function inner(...args2){
        if(args2.length == 0){
            return total;
        }
        
        total += args2.reduce((acc,cur) => acc+cur,0);
        
        return inner;
        
    }
    
    return inner;
    
}

console.log(sum(1)(2, 3)(4, 5, 6)())
 
console.log(sum(1, 5, 8)(2, 3)(4, 5, 6)(5, 5)())


// How would you implement a function for infinite currying that accumulates 
// values passed in successive calls and returns the result when called without 
// arguments? 

// function currying(fn) {
// 		//code here
// }

// curry(1)(2)(3)(4)()




// // Follow up Question

// // Implement a currying function that allows partial application of arguments
// // for a given multi-parameter function?

// function currying(fn) {
// 	//code here
// }

// curriedMultiply(1)(2)(3)(4)
// curriedMultiply(1, 2)(3, 4)
// curriedMultiply(1)(2, 3)(4)

function currying(fn){
    
    return function curried(...args1){
        if(args1.length >= fn.length){
            return fn(...args1)
        }else{
            return function(...args2){
                return curried(...args1,...args2)
            }
        }
    }
    
}

function multiply(a, b, c, d) {
    return a * b * c * d;
}

const curriedMultiply = currying(multiply);

console.log(curriedMultiply(1)(2)(3)(4));    
console.log(curriedMultiply(1, 2)(3, 4));    
console.log(curriedMultiply(1)(2, 3)(4));   