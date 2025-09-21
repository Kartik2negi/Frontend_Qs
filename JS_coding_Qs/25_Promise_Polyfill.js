
class MyPromise {
    constructor(executor) {
        this.state = 'pending';  // "pending" | "fulfilled" | "rejected"
        this.value = undefined;  // success value
        this.reason = undefined; // error reason

        this.onFulfilledCallback = [];
        this.onRejectedCallback = [];

        const resolve = (value) => {
            if (this.state == 'pending') {
                this.state = 'fulfilled';
                this.value = value;
                this.onFulfilledCallback.forEach((cb) => cb(this.value));
            }
        }

        const reject = (reason) => {
            if (this.state == 'pending') {
                this.state = 'rejected';
                this.reason = reason;
                this.onRejectedCallback.forEach((cb) => cb(this.reason));
            }
        }

        try {
            executor(resolve, reject);
        } catch (err) {
            reject(err);
        }
    }

    // then(onFulfilled,onRejected){
    //     if(this.state == 'fulfilled'){
    //       onFulfilled(this.value)
    //     }else if(this.state == 'rejected'){
    //         onRejected(this.value)
    //     }else{
    //         still pending, push callbacks
    //         this.onFulfilledCallback.push(onFulfilled);
    //         this.onRejectedCallback.push(onRejected);
    //     }
    // }

    // then chain
    then(onFulfilled, onRejected) {
        return new MyPromise((resolve, reject) => {
            if (this.state == 'fulfilled') {
                try {
                    let result = onFulfilled(this.value);
                    resolve(result);
                } catch (err) {
                    reject(err);
                }
            } else if (this.state == 'rejected') {
                try {
                    let result = onRejected(this.reason);
                    reject(result);
                } catch (err) {
                    reject(err);
                }
            } else {
                this.onFulfilledCallback.push((value) => {
                    try {
                        let result = onFulfilled(value);
                        resolve(result);
                    } catch (err) {
                        reject(err);
                    }
                });

                this.onRejectedCallback.push((reason) => {
                    try {
                        let result = onRejected(reason);
                        reject(result);
                    } catch (err) {
                        reject(err);
                    }
                });
            }
        })
    }
}



const p1 = new MyPromise((resolve, reject) => {
    setTimeout(() => {
        resolve("✅ Custom promise resolved after 1s");
    }, 1000);
});

p1.then(
    (value) => console.log("Success:", value),
    (err) => console.error("Error:", err)
);

const p2 = new MyPromise((resolve, reject) => {
    setTimeout(() => {
        reject("❌ Something went wrong");
    }, 1500);
});

p2.then(
    (value) => console.log("Success:", value),
    (err) => console.error("Error:", err)
);

// then chain
new MyPromise((resolve) => resolve(10))
    .then((num) => num * num)
    .then((res) => console.log(res))
