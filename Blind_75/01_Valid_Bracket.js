// Qs - https://www.greatfrontend.com/interviews/study/blind75/questions/algo/array-balanced-brackets

// Pattern
// Stack (LIFO)

// Approach
// Push opening brackets into stack
// For closing bracket:
//   pop from stack
//   check matching pair
// Return true if stack is empty at end

// Key Insight
// Last opened bracket must close first
// Stack helps maintain correct order

// Time Complexity
// O(n)

// Space Complexity
// O(n)

// Edge Cases
// Empty string
// Single opening bracket
// Incorrect nesting like ([)]


// Solution 1

function isBalancedBrackets(str) {
    let stack = [];

    let map = {
        ')': '(',
        '}': '{',
        ']': '[',
    }

    for (let char of str) {
        if (char === '(' || char === '{' || char === '[') {
            stack.push(char);
        } else {
            let top = stack.pop();

            if (top !== map[char]) {
                return false;
            }
        }
    }
    return stack.length === 0;
}

console.log(isBalancedBrackets('([]){}'))
console.log(isBalancedBrackets('([)]'))

// Solution 2


function isBalancedBrackets(str) {
    let stack = [];

    let map = {
        ')': '(',
        '}': '{',
        ']': '[',
    }

    for (let char of str) {
        if (map[char]) {

            if (stack.pop() !== map[char]) {
                return false;
            }

        } else {
            stack.push(char);
        }
    }
    return stack.length === 0;
}

console.log(isBalancedBrackets('([]){}'))
console.log(isBalancedBrackets('([)]'))