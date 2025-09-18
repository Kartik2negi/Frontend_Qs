function throttle(fn, delay) {
    let lastExecuted = 0;

    return function (...args) {
        const now = Date.now();

        if (now - lastExecuted >= delay) {
            fn.apply(this, args);
            lastExecuted = now;
        }
    };
}

const log = throttle((msg) => {
    console.log(msg, Date.now());
}, 2000);

// Simulate rapid calls
log("Call 1"); // runs immediately
log("Call 2"); // throttled (ignored)
log("Call 3"); // throttled (ignored)

setTimeout(() => log("Call 4"), 1000); // ignored (within 2s window)
setTimeout(() => log("Call 5"), 2500); // runs (after 2.5s)
setTimeout(() => log("Call 6"), 2700); // ignored (within 2s of last run)
setTimeout(() => log("Call 7"), 5000); // runs (after 5s)
