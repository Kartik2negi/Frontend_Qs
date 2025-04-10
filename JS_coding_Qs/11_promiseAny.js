// Polyfill of Promise.any


const successTasks = [
    new Promise((resolve,reject) => setTimeout(() => reject('Task 1'), 1000)),
    new Promise((resolve,reject) => setTimeout(() => resolve('Task 2'), 400)),
    new Promise((resolve,reject) => setTimeout(() => reject('Task 3'), 200)),
  ];
  
  Promise.any(successTasks).then(r => console.log({r})).catch(e => console.log(e))
  
  
  function myPromiseAny(tasks){
      let error = [];
      let errorCount = 0;
      
      return new Promise((resolve,reject) =>{
          
          // Reject immediately if input is empty
          if(tasks.length === 0){
              reject(new AggregateError([],'All promises were rejected'))
          }
          
          for(let i=0; i<tasks.length; i++){
              Promise.resolve(tasks[i])
              .then(resolve)
              .catch(err => {
                  error[i] = err;
                  errorCount++;
                  
                  // Reject if all promises are rejected
                  if(errorCount == tasks.length) {
                      reject(new AggregateError(error,'All promises were rejected'))
                  }
              })
          }
      })
  }
  
  myPromiseAny(successTasks).then(r => console.log(r)).catch(e => console.log(e))