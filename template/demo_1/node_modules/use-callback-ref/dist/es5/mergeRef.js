"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var createRef_1 = require("./createRef");
var assignRef_1 = require("./assignRef");
function mergeRefs(refs) {
    return createRef_1.createCallbackRef(function (newValue) {
        return refs.forEach(function (ref) { return assignRef_1.assignRef(ref, newValue); });
    });
}
exports.mergeRefs = mergeRefs;
