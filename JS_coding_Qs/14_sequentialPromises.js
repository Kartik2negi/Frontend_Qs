
// How would you implement a function to execute an array of asynchronous tasks
// sequentially, collecting both resolved values and errors?



const createAsyncTask = () => {
    const randomVal = Math.floor(Math.random() *10)
    return new Promise((resolve, reject) =>{
        setTimeout(() => {
            if(randomVal > 5) {
                resolve(randomVal)
            }else{
                reject(randomVal)
            }
        },randomVal*100)
    })
}

const tasks = [
    createAsyncTask,
    createAsyncTask,
    createAsyncTask,
    createAsyncTask,
    createAsyncTask
]

// 1st Sol
const taskRunnerItterative = async (tasks,cb) => {
    let result = [];
    let error = [];
    
    for(let task of tasks){
        try{
            let success = await task();
            result.push(success)
        }catch(e){
            error.push(e)
        }
    }
    return cb(result,error)
}

taskRunnerItterative(tasks, (result, err) => console.log(result, err));



// 2nd Sol
const taskRunnerRecursion = (tasks,cb) => {
    let result = [];
    let error = [];
    
    function helper(ptr = 0){
        //base cond
        if(ptr == tasks.length){
            return cb(result,error)
        }
        
        tasks[ptr]()
        .then(res => result.push(res))
        .catch(err => error.push(err))
        .finally(() => {
            helper(++ptr)
        })
    }
    helper()
}

taskRunnerRecursion(tasks, (result, err) => console.log(result, err));