"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _common = require("../common");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Loading = function Loading(_ref) {
  var style = _ref.style,
      decorators = _ref.decorators;
  return _react["default"].createElement(_common.Ul, {
    style: style.subtree
  }, _react["default"].createElement("li", null, _react["default"].createElement(decorators.Loading, {
    style: style.loading
  })));
};

Loading.propTypes = {
  decorators: _propTypes["default"].object.isRequired,
  style: _propTypes["default"].object.isRequired
};
var _default = Loading;
exports["default"] = _default;