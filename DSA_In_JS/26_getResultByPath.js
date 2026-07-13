
function getResultByPath(path, obj) {
    let str = '';
    let keys = [];

    for (let ch of path) {
        if (ch === '.' || ch === '[' || ch === ']') {
            if (str) {
                keys.push(str);
                str = '';
            }
        } else {
            str += ch;
        }
    }

    if (str) keys.push(str);

    let current = obj;

    for (let key of keys) {
        if (current == undefined) return undefined;
        current = current[key];
    }
    return current;
}

// const path = "data.results.status";
// const obj = {
//   data: {
//     results:
//     {
//       status: "completed",
//       error: "",
//     }
//   },
// }
// console.log(getResultByPath(path,obj))

const path = "data.results[1].status[0].type";

const obj = {
    data: {
        results: [
            {
                status: "completed",
                error: "",
            },
            {
                status: [
                    { type: "done" },
                    { type: "start" },
                ],
            },
        ],
    },
};

console.log(getResultByPath(path, obj));