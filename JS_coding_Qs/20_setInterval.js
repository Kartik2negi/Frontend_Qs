(function () {
    let intervalId = 0;
    let intervalMap = {};

    function mySetInterval(cb, delay, ...args) {
        let id = ++intervalId;

        function repeat() {
            intervalMap[id] = setTimeout(() => {
                cb(...args)
                if (intervalMap[id]) {
                    repeat();
                }
            }, delay)
        }
        repeat();
        return id;
    }

    function myClearInterval(id) {
        if (intervalMap[id]) {
            clearTimeout(intervalMap[id]);
            delete intervalMap[id];
        }
    }

    window.mySetInterval = mySetInterval;
    window.myClearInterval = myClearInterval;
})()

let count = 0;

let ids = mySetInterval(() => {
    console.log("tick", ++count);
    if (count === 5) {
        myClearInterval(ids);
        console.log("stopped...!!")
    }
}, 1000)