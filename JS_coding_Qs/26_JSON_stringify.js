// Key Rules of JSON.stringify
// string → "value"
// number → "123"
// boolean → "true/false"
// null → "null"
// undefined, function, symbol:
// ignored in objects
// converted to null in arrays
// Objects → { "key": value }
// Arrays → [value1, value2]

function jsonStringify(value) {
    // 1. Handle null
    if (value === null) return "null";

    // 2. Handle primitives
    if (typeof value === "number" || typeof value === "boolean") {
        return String(value);
    }

    if (typeof value === "string") {
        return `"${value}"`;
    }

    // 3. Handle array
    if (Array.isArray(value)) {
        const result = value.map((item) => {
            if (
                typeof item === "undefined" ||
                typeof item === "function" ||
                typeof item === "symbol"
            ) {
                return "null";
            }
            return jsonStringify(item);
        });

        return `[${result.join(",")}]`;
    }

    // 4. Handle object
    if (typeof value === "object") {
        const keys = Object.keys(value);
        const result = [];

        for (let key of keys) {
            const val = value[key];

            // skip undefined, function, symbol
            if (
                typeof val === "undefined" ||
                typeof val === "function" ||
                typeof val === "symbol"
            ) {
                continue;
            }

            result.push(`"${key}":${jsonStringify(val)}`);
        }

        return `{${result.join(",")}}`;
    }

    // fallback
    return undefined;
}

const obj = {
    name: "Vishal",
    age: 25,
    isAdmin: false,
    address: {
        city: "Delhi",
    },
    arr: [1, undefined, 3],
};

console.log(jsonStringify(obj));

// {"name":"Vishal","age":25,"isAdmin":false,"address":{"city":"Delhi"},"arr":[1,null,3]}



// # Circular Ref 


function jsonStringify(obj, seen = new Set()) {
    // 1 null
    if (obj === null) return "null";

    // 2 primitive
    if (typeof obj === 'number' || typeof obj === 'boolean') {
        return String(obj);
    }
    if (typeof obj === 'string') {
        return `"${obj}"`;
    }

    // 3 array
    if (Array.isArray(obj)) {
        if (seen.has(obj)) {
            throw new TypeError("Converting circular structure to JSON.");
        }
        seen.add(obj);
        const result = obj.map((item) => {
            if (typeof item === 'function' || typeof item === 'undefined' || typeof item === 'symbol') {
                return "null";
            }
            return jsonStringify(item, seen);
        })
        seen.delete(obj);
        return `[${result.join(",")}]`
    }

    // 4 object
    if (typeof obj === 'object') {
        if (seen.has(obj)) {
            throw new TypeError("Converting circular structure to JSON.");
        }
        seen.add(obj);

        let keys = Object.keys(obj);
        let result = [];

        for (let key of keys) {
            let val = obj[key];
            if (typeof val === 'function' || typeof val === 'undefined' || typeof val === 'symbol') {
                continue;
            }
            result.push(`"${key}" : ${jsonStringify(val, seen)}`)
        }
        seen.delete(obj);
        return `{${result.join(",")}}`
    }
    // fallback
    return undefined;
}

// const obj = {
//     name: "Vishal",
//     age: 25,
//     isAdmin: false,
//     address: {
//         city: "Delhi",
//     },
//     arr: [1, undefined, 3],
// };

console.log(jsonStringify(obj));

const obj1 = {
    name: "Vishal",
};
obj1.details = obj1;

// JSON.stringify(obj);
console.log(jsonStringify(obj1));