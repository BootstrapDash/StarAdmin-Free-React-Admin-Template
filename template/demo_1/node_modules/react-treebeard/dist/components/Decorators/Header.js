"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _common = require("../common");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Header = function Header(_ref) {
  var node = _ref.node,
      style = _ref.style;
  return _react["default"].createElement(_common.Div, {
    style: style.base
  }, _react["default"].createElement(_common.Div, {
    style: style.title
  }, node.name));
};

Header.propTypes = {
  style: _propTypes["default"].object,
  node: _propTypes["default"].object.isRequired
};
var _default = Header;
exports["default"] = _default;