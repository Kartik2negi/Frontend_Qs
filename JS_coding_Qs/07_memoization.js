// Write a memoization function ?


function add(a, b) {
    return a + b;
}

function sum(obj) {
    return obj.a + obj.b + obj.c;
}

function memo(fn) {
    let cache = new Map();

    function seralize(val) {
        if (typeof val === "object" && val !== null) {
            let sortedkey = Object.keys(val).sort();
            return `{${sortedkey.map((key) => `"${key}" : ${JSON.stringify(val[key])}`).join(",")}}`
        }
        return JSON.stringify(val);
    }

    // other way 
    function seralize(val) {
        if (typeof val == 'object' && val !== null) {
            let sortedkey = Object.keys(val).sort();
            let sortedObj = {};

            for (let key of sortedkey) {
                sortedObj[key] = sortedkey[key]
            }
            return JSON.stringify(sortedObj);
        }
        return JSON.stringify(val);
    }

    //-----------------//

    return function (...args) {
        let key = args.map(seralize).join("|");
        if (cache.has(key)) {
            console.log("cache....!!");
            return cache.get(key)
        }
        let res = fn.apply(this, args);
        cache.set(key, res);
        return res;
    }
}

let res = memo(sum);
console.log(res({ a: 1, b: 2, c: 3 }))
console.log(res({ c: 3, b: 2, a: 1 }))
console.log(res({ a: 1, b: 2, c: 3 }))

let result = memo(add);

// console.log(result(2,2))
// console.log(result(3,3))
// console.log(result(2,2))