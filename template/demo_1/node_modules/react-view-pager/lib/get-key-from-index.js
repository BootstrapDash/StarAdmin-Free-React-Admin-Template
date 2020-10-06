'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getKeyfromIndex;

var _react = require('react');

function getKeyfromIndex(index, children) {
  var key = null;

  _react.Children.forEach(children, function (child, _index) {
    if (index === _index) {
      key = child.key;
      return;
    }
  });

  return key;
}
module.exports = exports['default'];