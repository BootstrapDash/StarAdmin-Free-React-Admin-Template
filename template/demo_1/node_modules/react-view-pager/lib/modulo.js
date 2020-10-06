"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = modulo;
function modulo(val, max) {
  return (val % max + max) % max;
}
module.exports = exports["default"];