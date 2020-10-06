"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = caseSensitiveType;

var _warn = _interopRequireDefault(require("../utils/warn"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function caseSensitiveType(props, propName, componentName) {
  var caseSensitive = props.caseSensitive,
      filterBy = props.filterBy;
  (0, _warn["default"])(!caseSensitive || typeof filterBy !== 'function', 'Your `filterBy` function will override the `caseSensitive` prop.');
}