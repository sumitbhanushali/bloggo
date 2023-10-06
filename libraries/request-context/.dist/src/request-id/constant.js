"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRequestId = exports.REQUEST_ID_HEADER = void 0;
const crypto_1 = require("crypto");
exports.REQUEST_ID_HEADER = 'x-request-id';
function generateRequestId() {
    return (0, crypto_1.randomUUID)();
}
exports.generateRequestId = generateRequestId;
