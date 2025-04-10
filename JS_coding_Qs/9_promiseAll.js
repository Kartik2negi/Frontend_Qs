// Promise.all polyfill

const successTasks = [
    new Promise((resolve) => setTimeout(() => resolve('Task 1'), 1000)),
    new Promise((resolve,reject) => setTimeout(() => resolve('Task 2'), 100)),
    new Promise((resolve,reject) => setTimeout(() => resolve('Task 3'), 200)),
    "Test",
    3
  ];
  
  Promise.all(successTasks).then(r => console.log(r)).catch(e => console.log(e))
  
  
  function myPromiseAll(tasks){
      let result = [];
      let completed = 0;
      
      return new Promise((resolve,reject) =>{
          for(let i=0; i<tasks.length; i++){
              Promise.resolve(tasks[i])
              .then(val => {
                  result[i] = val;
                  completed++;
              
                  // we can add this check here as well and also we can add it finally block 
                  // if(tasks.length === completed){
                  //     resolve(result)
                  // }
              })
              .catch(err =>{
                  reject(err)
              })
              .finally(() => {
                  if(tasks.length === completed){
                      resolve(result)
                  }
              })
          }
      })
  }
  
  myPromiseAll(successTasks).then(r => console.log(r)).catch(e => console.log(e))