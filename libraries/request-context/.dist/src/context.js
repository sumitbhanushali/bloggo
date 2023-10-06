"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.context = void 0;
const node_async_hooks_1 = require("node:async_hooks");
let currentContext;
function context() {
    if (currentContext === undefined) {
        currentContext = new node_async_hooks_1.AsyncLocalStorage();
    }
    return currentContext;
}
exports.context = context;
