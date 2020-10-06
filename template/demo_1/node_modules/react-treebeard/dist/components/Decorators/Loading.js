"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styled = _interopRequireDefault(require("@emotion/styled"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Loading = (0, _styled["default"])(function (_ref) {
  var className = _ref.className;
  return _react["default"].createElement("div", {
    className: className
  }, "loading...");
})(function (_ref2) {
  var style = _ref2.style;
  return style;
});
Loading.propTypes = {
  style: _propTypes["default"].object
};
var _default = Loading;
exports["default"] = _default;