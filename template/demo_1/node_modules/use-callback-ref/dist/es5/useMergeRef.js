"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var useRef_1 = require("./useRef");
var assignRef_1 = require("./assignRef");
function useMergeRefs(refs, defaultValue) {
    return useRef_1.useCallbackRef(defaultValue, function (newValue) {
        return refs.forEach(function (ref) { return assignRef_1.assignRef(ref, newValue); });
    });
}
exports.useMergeRefs = useMergeRefs;
