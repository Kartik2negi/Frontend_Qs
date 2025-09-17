// Debounce implementation
function debounce(fn, delay) {
    let timeout; // store the timer ID

    return function (...args) {
        const context = this;

        // Clear the previous timer if the function is called again
        clearTimeout(timeout);

        // Set a new timer to call the function after "delay"
        timeout = setTimeout(() => {
            fn.apply(context, args); // invoke fn with correct "this" and args
        }, delay);
    };
}

// Example usage
const fn = debounce((message) => {
    console.log(message);
}, 300);

// Simulate rapid function calls
fn("Hello");
fn("Hello, World!");
fn("Debounced!"); // Only this will log after 300ms

setTimeout(() => {
    fn("Debounced twice");
}, 400);
