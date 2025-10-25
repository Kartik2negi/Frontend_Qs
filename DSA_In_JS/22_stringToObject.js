// Write a function which converts string input into an object
//  // stringToObject("a.b.c", "someValue");
//  // output → {a: {b: {c: "someValue"}}}

function stringToObject(key, target) {
    let result = {};
    let current = result;

    let split = key.split(".");

    for (let i = 0; i < split.length; i++) {
        if (i === split.length - 1) {
            current[split[i]] = target;
        } else {
            current[split[i]] = {}; // {a : {} }
            current = current[split[i]];
        }
    }
    return result;
}

console.log(stringToObject("a.b.c", "someValue"));
