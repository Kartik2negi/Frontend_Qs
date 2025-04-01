// Polyfill of Promise.race

const successTasks = [
    new Promise((resolve,reject) => setTimeout(() => reject('Task 1'), 1000)),
    new Promise((resolve,reject) => setTimeout(() => resolve('Task 2'), 400)),
    new Promise((resolve,reject) => setTimeout(() => reject('Task 3'), 200)),
  ];
  
  Promise.race(successTasks).then(r => console.log(r)).catch(e => console.log(e))
  
  
  function myPromiseRace(tasks){
      
      return new Promise((resolve,reject) =>{
          for(let i=0; i<tasks.length; i++){
              Promise.resolve(tasks[i])
              .then(resolve) // Resolve as soon as the first promise resolves
              .catch(reject) // Reject as soon as the first promise rejects
          }
      })
  }
  
  myPromiseRace(successTasks).then(r => console.log(r)).catch(e => console.log(e))
