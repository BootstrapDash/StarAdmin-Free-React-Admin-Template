"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _head = _interopRequireDefault(require("lodash/head"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function getIsOnlyResult(_ref) {
  var allowNew = _ref.allowNew,
      highlightOnlyResult = _ref.highlightOnlyResult,
      results = _ref.results;

  if (!highlightOnlyResult || allowNew) {
    return false;
  }

  return results.length === 1 && !(0, _head["default"])(results).disabled;
}

var _default = getIsOnlyResult;
exports["default"] = _default;