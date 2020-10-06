'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getIndexFromKey;

var _react = require('react');

function getIndexFromKey(key, children) {
  var index = null;

  _react.Children.forEach(children, function (child, _index) {
    if (child.key === key) {
      index = _index;
      return;
    }
  });

  return index;
}
module.exports = exports['default'];