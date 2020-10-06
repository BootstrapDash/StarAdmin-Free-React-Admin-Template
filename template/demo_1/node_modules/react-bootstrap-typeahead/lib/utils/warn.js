"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = warn;
exports.resetWarned = resetWarned;

var _warning = _interopRequireDefault(require("warning"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * This code is copied from: https://github.com/ReactTraining/react-router/blob/master/modules/routerWarning.js
 */
var warned = {};

function warn(falseToWarn, message) {
  // Only issue deprecation warnings once.
  if (!falseToWarn && message.indexOf('deprecated') !== -1) {
    if (warned[message]) {
      return;
    }

    warned[message] = true;
  }

  for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  _warning["default"].apply(void 0, [falseToWarn, "[react-bootstrap-typeahead] ".concat(message)].concat(args));
}

function resetWarned() {
  warned = {};
}