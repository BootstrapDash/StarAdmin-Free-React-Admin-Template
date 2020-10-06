"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var useRef_1 = require("./useRef");
var assignRef_1 = require("./assignRef");
function useTransformRef(ref, transformer) {
    return useRef_1.useCallbackRef(undefined, function (value) {
        return assignRef_1.assignRef(ref, transformer(value));
    });
}
exports.useTransformRef = useTransformRef;
