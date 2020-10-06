"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createCallbackRef(callback) {
    var current = null;
    return {
        get current() {
            return current;
        },
        set current(value) {
            var last = current;
            if (last !== value) {
                current = value;
                callback(value, last);
            }
        }
    };
}
exports.createCallbackRef = createCallbackRef;
