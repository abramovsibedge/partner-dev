"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Signal {
    constructor(name) {
        this.index = 0;
        this.subscribers = {};
        Signal.signals[name] = this;
        return this;
    }
    static attach(name, callback) {
        Signal.signals[name].index++;
        Signal.signals[name].subscribers[Signal.signals[name].index] = callback;
        return Signal.signals[name].index;
    }
    static detach(name, id) {
        if (Signal.signals[name].subscribers[id]) {
            delete Signal.signals[name].subscribers[id];
        }
    }
    static dispatch(name, params) {
        for (let k in Signal.signals[name].subscribers) {
            Signal.signals[name].subscribers[k](params);
        }
    }
}
Signal.signals = {};
exports.default = Signal;
//# sourceMappingURL=Signal.js.map