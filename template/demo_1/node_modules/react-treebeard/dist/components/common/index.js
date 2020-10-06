"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Ul = exports.Div = void 0;

var _styled = _interopRequireDefault(require("@emotion/styled"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Div = (0, _styled["default"])('div', {
  shouldForwardProp: function shouldForwardProp(prop) {
    return ['className', 'children'].indexOf(prop) !== -1;
  }
})(function (_ref) {
  var style = _ref.style;
  return style;
});
exports.Div = Div;
var Ul = (0, _styled["default"])('ul', {
  shouldForwardProp: function shouldForwardProp(prop) {
    return ['className', 'children'].indexOf(prop) !== -1;
  }
})(function (_ref2) {
  var style = _ref2.style;
  return style;
});
exports.Ul = Ul;