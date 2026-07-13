class Stack {
    constructor() {
        // Initialize your stack
        this.items = [];
    }

    push(element) {
        // Add element to the top
        this.items.push(element);
    }

    pop() {
        // Remove and return top element
        if (this.isEmpty()) {
            return null;
        }
        return this.items.pop();
    }

    peek() {
        // Return top element without removing
        if (this.isEmpty()) {
            return null;
        }
        return this.items[this.items.length - 1];
    }

    isEmpty() {
        // Check if stack is empty
        return this.items.length === 0;
    }

    size() {
        // Return number of elements
        return this.items.length;
    }

    clear() {
        // Remove all elements
        this.items = [];
    }
}

const stack = new Stack();

stack.push(10);
stack.push(20);
stack.push(30);

console.log(stack.peek());      // 30
console.log(stack.pop());       // 30
console.log(stack.peek());      // 20
console.log(stack.size());      // 2
console.log(stack.isEmpty());   // false

stack.clear();

console.log(stack.isEmpty());   // true
console.log(stack.size());      // 0
