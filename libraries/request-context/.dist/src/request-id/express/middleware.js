"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addRequestId = void 0;
const constant_1 = require("../constant");
const context_1 = require("../../context");
function addRequestId(req, res, next) {
    let requestId = req.headers[constant_1.REQUEST_ID_HEADER];
    if (!requestId) {
        requestId = (0, constant_1.generateRequestId)();
        req.headers[constant_1.REQUEST_ID_HEADER] = requestId;
    }
    res.setHeader(constant_1.REQUEST_ID_HEADER, requestId);
    const currentContext = (0, context_1.context)().getStore();
    if (currentContext) {
        currentContext.requestId = requestId;
        next();
        return;
    }
    (0, context_1.context)().run({ requestId }, next);
}
exports.addRequestId = addRequestId;
