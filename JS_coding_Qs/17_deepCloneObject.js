// Implement polyfill for deep cloning OBject

// // Follow up: Adding a circular reference
// original.circularRef = original;

function deepClone(obj, seen = new WeakMap()) {
    // Base case 1: If obj is null or a primitive (string, number, boolean, undefined), return it directly
    if (obj === null || typeof obj !== "object") {
      return obj;
    }
  
    // Base case 2: If obj is a Date, create a new Date with the same time
    if (obj instanceof Date) {
      return new Date(obj);
    }
  
    // Base case 3: If obj is a RegExp, create a new RegExp with the same pattern and flags
    if (obj instanceof RegExp) {
      return new RegExp(obj);
    }
  
    // Handle circular references: If we've already cloned this object, return the stored clone
    if (seen.has(obj)) {
      return seen.get(obj);
    }
  
    // Create a shallow clone: If obj is an array, create []; otherwise create {}
    const clone = Array.isArray(obj) ? [] : {};
  
    // Before deep cloning properties, store this clone in the seen map
    seen.set(obj, clone);
  
    // Recursively copy each property
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) { 
        // Only copy own properties (not inherited properties)
        clone[key] = deepClone(obj[key], seen);
      }
    }
  
    // Return the fully cloned object
    return clone;
}

const original = {
    name: "Alice",
    birthDate: new Date(2000, 1, 1),
    regexTest: /abc/gi,
    hobbies: ["reading", "biking"],
};
original.circular = original; // adding circular
  
const cloned = deepClone(original);
  
console.log(cloned === original)
console.log(cloned.birthDate !== original.birthDate); // true
console.log(cloned.regexTest !== original.regexTest); // true
console.log(cloned.circular === cloned); // true
console.log(cloned.circular !== original.circular); // true
console.log(cloned.hobbies !== original.hobbies); // true (deep cloned array)