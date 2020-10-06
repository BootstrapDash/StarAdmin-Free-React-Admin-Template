"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = slideRange;
function slideRange(a, b) {
  var range = [];

  if (a === b) {
    return [a];
  }

  for (var i = a; i < b; i++) {
    range.push(i);
  }

  return range;
}
module.exports = exports["default"];