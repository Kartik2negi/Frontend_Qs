// Implement _.gropuBy from Loadsh library


// 1 - js inbuilt
const inventory = [
    { name: "asparagus", type: "vegetables", quantity: 9 },
    { name: "bananas", type: "fruit", quantity: 5 },
    { name: "goat", type: "meat", quantity: 23 },
    { name: "cherries", type: "fruit", quantity: 12 },
    { name: "fish", type: "meat", quantity: 22 },
];
  
  
Object.prototype.myGroupby = function(items,cb){
      if(typeof cb !== 'function'){
          throw new TypeError('cb must be a function')
      }
      
      return items.reduce((acc,cur) => {
         let key = String(cb(cur));
         
         if(!acc[key]){
             acc[key] = [];
         }
         
         acc[key].push(cur);
         return acc;
      },{})
}
  
let result = Object.myGroupby(inventory,(item) => {
      return item.quantity > 10 ? "sufficient" : "restock";
});

console.log(result)


// 2 - loadsh

function lodashGroupBy(array,iteratee){
      
      return array.reduce((acc,cur) => {
         let key;
         if(typeof iteratee == 'function'){
             key = iteratee(cur);
         }else if(typeof iteratee == 'string'){
             key = cur[iteratee];
         }else{
             throw new TypeError('iteratee must be a function or string')
         }
         
         key = String(key);
         
         if(!acc[key]){
             acc[key] = [];
         }
         
         acc[key].push(cur);
         return acc;
          
      },{})
      
}
  
// console.log(lodashGroupBy(["one", "two", "three"], "length"))
console.log(lodashGroupBy(inventory,(item) => item.type ));