'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getIndex;

var _react = require('react');

function getIndex(key, children) {
  var index = null;

  _react.Children.forEach(children, function (child, _index) {
    if (child.key === key || _index === key) {
      index = _index;
      return;
    }
  });

  return index;
}
module.exports = exports['default'];