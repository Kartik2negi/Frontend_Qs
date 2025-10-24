// Write logic to get unique objects from below array ?

//  I/P : [{name: "sai"},{name:"Nang"},{name: "sai"},{name:"Nang"},{name: 
// "111111"}];

// O/P : [{name: "sai"},{name:"Nang"}{name: "111111"}

function getUniqueArr(arr) {
    let result = [];
    let seen = new Map();

    for (let i = 0; i < arr.length; i++) {
        if (!seen.has(arr[i].name)) {
            result.push(arr[i]);
            seen.set(arr[i].name, true);
        }
    }
    return result;
}

let arr = [{ name: "sai" }, { name: "Nang" }, { name: "sai" }, { name: "Nang" }, { name: "111111" }];
console.log(getUniqueArr(arr));
