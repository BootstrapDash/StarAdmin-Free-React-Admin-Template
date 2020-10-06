"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = emptyLabelType;

var _warn = _interopRequireDefault(require("../utils/warn"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function emptyLabelType(props, propName, componentName) {
  var emptyLabel = props.emptyLabel;
  (0, _warn["default"])(!!emptyLabel, 'Passing a falsy `emptyLabel` value to hide the menu when the result set ' + 'is empty is deprecated. Use `renderMenu` to return `null` instead.');
}