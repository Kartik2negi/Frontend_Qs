(function () {
    let timer = 0;
    let timermap = {};

    function mySetTimeout(cb, delay, ...args) {
        let id = ++timer;
        let start = Date.now();

        let intervalId = setInterval(() => {
            if (Date.now() - start >= delay) {
                cb(...args);
                clearInterval(intervalId);
                delete timermap[id];
            }
        }, 1)

        timermap[id] = intervalId;
        return id;
    }

    function myClearTimeout(id) {
        if (timermap[id]) {
            clearInterval(timermap[id]);
            delete timermap[id];
        }
    }

    window.mySetTimeout = mySetTimeout;
    window.myClearTimeout = myClearTimeout;

    // ✅ Works in Node.js and browsers
    // globalThis.mySetTimeout = mySetTimeout;
    // globalThis.myClearTimeout = myClearTimeout;

})()

let taskId = mySetTimeout(() => {
    console.log("Hi.........!!!")
}, 1000)