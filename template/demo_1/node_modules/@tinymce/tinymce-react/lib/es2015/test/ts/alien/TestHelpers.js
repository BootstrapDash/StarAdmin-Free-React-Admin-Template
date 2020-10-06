var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { Chain, Assertions } from '@ephox/agar';
import { Cell, Obj } from '@ephox/katamari';
var EventStore = function () {
    var state = Cell({});
    var createHandler = function (name) {
        return function (event, editor) {
            var _a;
            var oldState = state.get();
            var eventHandlerState = Obj.get(oldState, name)
                .getOr([])
                .concat([{ editorEvent: event, editor: editor }]);
            state.set(__assign(__assign({}, oldState), (_a = {}, _a[name] = eventHandlerState, _a)));
        };
    };
    var cEach = function (name, assertState) {
        return Chain.fromChains([
            Chain.op(function () {
                Assertions.assertEq('State from "' + name + '" handler should exist', true, name in state.get());
                assertState(state.get()[name]);
            })
        ]);
    };
    var cClearState = Chain.op(function () {
        state.set({});
    });
    return {
        cEach: cEach,
        createHandler: createHandler,
        cClearState: cClearState
    };
};
export { EventStore };
