"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class storageHelper {
    constructor() {
        this.add = (key, item) => this.storeSupport && localStorage.setItem(key, item);
        this.get = (key) => { return this.storeSupport ? localStorage.getItem(key) : null; };
        this.remove = (key) => this.storeSupport && localStorage.removeItem(key);
        this.storeSupport = typeof window['localStorage'] != "undefined" && window['localStorage'] != null;
    }
}
exports.storageHelper = storageHelper;
//# sourceMappingURL=storage.js.map