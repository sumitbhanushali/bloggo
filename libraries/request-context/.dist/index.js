"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addRequestIdExpressMiddleware = exports.context = void 0;
var context_1 = require("./src/context");
Object.defineProperty(exports, "context", { enumerable: true, get: function () { return context_1.context; } });
var middleware_1 = require("./src/request-id/express/middleware");
Object.defineProperty(exports, "addRequestIdExpressMiddleware", { enumerable: true, get: function () { return middleware_1.addRequestId; } });
