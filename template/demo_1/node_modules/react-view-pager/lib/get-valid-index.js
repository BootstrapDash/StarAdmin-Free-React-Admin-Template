"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getValidIndex;

function getValidIndex(n, m) {
  return n < 0 ? (n % m + m) % m : n % m;
}

module.exports = exports["default"];