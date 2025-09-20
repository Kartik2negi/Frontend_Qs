// ---------------- Implementation ----------------

// Custom error to indicate cancellation
class CanceledPromiseError extends Error {
    constructor() {
        super("Promise has been canceled");
        this.name = "CanceledPromiseError";
    }
}

// Add a static method to Promise
Promise.cancelable = (promise) => {
    let cancel;          // will hold the cancel function
    let hasCanceled = false; // flag to prevent double canceling

    // Create a new wrapped promise
    const wrappedPromise = new Promise((resolve, reject) => {
        // Define cancel function
        cancel = () => {
            if (!hasCanceled) {
                hasCanceled = true;
                reject(new CanceledPromiseError());
            }
        };

        // Forward the result of the original promise
        promise
            .then((value) => {
                if (!hasCanceled) resolve(value);
            })
            .catch((error) => {
                if (!hasCanceled) reject(error);
            });
    });

    // Attach cancel method
    wrappedPromise.cancel = cancel;
    return wrappedPromise;
};

// ---------------- Example / Test ----------------

// Simulated async tasks
const asyncTask1 = new Promise((resolve) => {
    setTimeout(() => {
        resolve("Task 1 completed ✅");
    }, 500);
});

const asyncTask2 = new Promise((resolve) => {
    setTimeout(() => {
        resolve("Task 2 completed ✅");
    }, 3000);
});

// Wrap the tasks with cancelable
const cancelableTask1 = Promise.cancelable(asyncTask1);
const cancelableTask2 = Promise.cancelable(asyncTask2);

// Attach handlers
cancelableTask1
    .then((result) => console.log(result))
    .catch((error) => console.error("Task1:", error.message));

cancelableTask2
    .then((result) => console.log(result))
    .catch((error) => console.error("Task2:", error.message));

// Cancel after 1 second
setTimeout(() => {
    console.log(">>> Cancelling both tasks...");
    cancelableTask1.cancel();
    cancelableTask2.cancel();
}, 1000);
