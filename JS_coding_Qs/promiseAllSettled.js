// Polyfill of Promise.allSettled

const successTasks = [
    new Promise((resolve) => setTimeout(() => resolve('Task 1'), 1000)),
    new Promise((resolve,reject) => setTimeout(() => resolve('Task 2'), 100)),
    new Promise((resolve,reject) => setTimeout(() => reject('Task 3'), 200)),
    "Test",
    3
  ];
  
  Promise.allSettled(successTasks).then(r => console.log(r)).catch(e => console.log(e))
  
  
  function myPromiseAllSettled(tasks){
      let result = [];
      let completed = 0;
      
      return new Promise((resolve,reject) =>{
          for(let i=0; i<tasks.length; i++){
              Promise.resolve(tasks[i])
              .then((value) =>{
                  result[i] = { status: 'fulfilled', value }
              })
              .catch((reason) =>{
                  result[i] = { status: 'rejected', reason }
              })
              .finally(() => {
                  completed++;
                  
                  if(completed == tasks.length){
                      resolve(result)
                  }
              })
          }
      })
  }
  
  myPromiseAllSettled(successTasks).then(r => console.log(r)).catch(e => console.log(e))