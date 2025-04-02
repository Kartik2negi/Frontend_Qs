// How can you implement a retry mechanism for fetching data?


// mock fetch data
const fetchData = () => {
  return new Promise((resolve, reject) => {
    // Simulate a request that might fail
    const success = Math.random() > 0.5; // 50% chance of success
    console.log(success, "success")
    if (success) {
      resolve("Data fetched successfully!");
    } else {
      reject("Failed to fetch data");
    }
  });
};

retryPromise(fetchData, 3, 1000)
  .then((result) => console.log(result))
  .catch((error) => console.log(error));

// Solution

function retryPromise(fn,retry,delay){
    return new Promise((resolve,reject)=>{
        const attempt = (n) => {
            fn()
            .then(resolve)
            .catch((err) => {
                if(n<=1){
                    reject(err)
                }else{
                    setTimeout(()=>{
                        track(n-1)
                    },delay)
                }
            })
        }
        attempt(retry)
    })
}
