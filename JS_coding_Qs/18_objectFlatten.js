// Write a function flattenObject that takes a nested object and converts it
// into a flat object,where keys represent the path to each value in the original object.
// The function should handle nested objects, arrays, and primitive types and null.


const user = {
    name: "Vishal",
    age: null,
    address: {
      primary: {
        house: "109",
        street: {
          main: "21",
          cross: null,
        },
      },
      secondary: null,
    },
    phones: [
      { type: "home", number: "1234567890" },
      { type: "work", number: null },
    ],
    preferences: null,
};
  
function flattenObject(obj,prefix='',result={}){
      
      for(let key in obj){
          if(obj.hasOwnProperty(key)){
              let newKey = prefix ? `${prefix}_${key}` : key;
              if(Array.isArray(obj[key])){
                  obj[key].forEach((el,i) => flattenObject(el, `${newKey}_${i}`,result ) )
              }else if(typeof obj[key] == 'object' && obj[key] !== null ){
                  flattenObject(obj[key],newKey,result)
              }else{
                  result[newKey] = obj[key];
              }
              
          }
      }
      return result;
}
  
  
console.log(flattenObject({user}))