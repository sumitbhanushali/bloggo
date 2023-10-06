"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getValue = exports.reset = exports.initializeAndValidate = void 0;
const convict_1 = __importDefault(require("convict"));
let convictConfigurationProvider;
function initializeAndValidate(schema) {
    convictConfigurationProvider = (0, convict_1.default)(schema);
    convictConfigurationProvider.validate();
}
exports.initializeAndValidate = initializeAndValidate;
function reset() {
    convictConfigurationProvider = undefined;
}
exports.reset = reset;
function getValue(keyName) {
    if (convictConfigurationProvider === undefined) {
        throw new Error('Configuration has not been initialized yet');
    }
    return convictConfigurationProvider.get(keyName);
}
exports.getValue = getValue;
