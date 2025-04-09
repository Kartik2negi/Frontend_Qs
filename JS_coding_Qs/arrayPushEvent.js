// Attach event on push element in an array ?

let originalPush = Array.prototype.push;

Array.prototype.push = function(...args){
    let res = originalPush.apply(this,args);
    
    if(this.onPush){
        this.onPush(args)
    }
    return res;
}

Array.prototype.setPushCb = function(cb){
    if(typeof cb == 'function'){
        this.onPush = cb;
    }else{
        throw new Error('cb must be a function')
    }
}

let arr = [];

arr.setPushCb((i) => console.log(i));

arr.push(10)
arr.push(15,20)