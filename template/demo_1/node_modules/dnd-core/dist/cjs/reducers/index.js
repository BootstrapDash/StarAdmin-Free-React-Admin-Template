"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = reduce;

var _dragOffset = _interopRequireDefault(require("./dragOffset"));

var _dragOperation = _interopRequireDefault(require("./dragOperation"));

var _refCount = _interopRequireDefault(require("./refCount"));

var _dirtyHandlerIds = _interopRequireDefault(require("./dirtyHandlerIds"));

var _stateId = _interopRequireDefault(require("./stateId"));

var _js_utils = require("../utils/js_utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function reduce() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 ? arguments[1] : undefined;
  return {
    dirtyHandlerIds: (0, _dirtyHandlerIds.default)(state.dirtyHandlerIds, {
      type: action.type,
      payload: _objectSpread({}, action.payload, {
        prevTargetIds: (0, _js_utils.get)(state, 'dragOperation.targetIds', [])
      })
    }),
    dragOffset: (0, _dragOffset.default)(state.dragOffset, action),
    refCount: (0, _refCount.default)(state.refCount, action),
    dragOperation: (0, _dragOperation.default)(state.dragOperation, action),
    stateId: (0, _stateId.default)(state.stateId)
  };
}