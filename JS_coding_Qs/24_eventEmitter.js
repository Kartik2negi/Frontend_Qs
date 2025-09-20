// ---------------- EventEmitter Implementation ----------------
class EventEmitter {
    constructor() {
        this._eventSubscriptions = new Map();
    }

    // Subscribe to an event
    subscribe(eventName, callback) {
        if (typeof callback !== "function") {
            throw new TypeError("Callback should be a function");
        }

        // If event doesn't exist, initialize a new Map
        if (!this._eventSubscriptions.has(eventName)) {
            this._eventSubscriptions.set(eventName, new Map());
        }

        const subscriptionId = Symbol(); // unique identifier
        const subscriptions = this._eventSubscriptions.get(eventName);

        subscriptions.set(subscriptionId, callback);

        // Return unsubscribe handle
        return {
            remove: () => {
                if (!subscriptions.has(subscriptionId)) {
                    throw new Error("Subscription has already removed");
                }
                subscriptions.delete(subscriptionId);
            },
        };
    }

    // Emit an event
    emit(eventName, ...args) {
        const subscriptions = this._eventSubscriptions.get(eventName);
        if (!subscriptions) {
            throw new Error("No event found");
        }

        subscriptions.forEach((callback) => callback(...args));
    }
}

// ---------------- Example Usage ----------------
const emitter = new EventEmitter();

// Subscribe
const subscription1 = emitter.subscribe("modify", (link) => {
    console.log(`Listener1 Modified: ${link}`);
});

const subscription2 = emitter.subscribe("modify", (link) => {
    console.log(`Listener2 Modified: ${link}`);
});

// Emit event (both listeners will fire)
emitter.emit("modify", "test@gmail.com");

// Remove one listener
subscription1.remove();

// Emit again (only Listener2 will fire)
emitter.emit("modify", "example@gmail.com");

// Try emitting a non-existing event
try {
    emitter.emit("noEventFound", "random@gmail.com");
} catch (err) {
    console.error("Error:", err.message);
}
