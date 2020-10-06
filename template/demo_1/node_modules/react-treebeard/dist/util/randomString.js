"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var randomString = function randomString() {
  return Math.random().toString(36).substring(7);
};

var _default = randomString;
exports["default"] = _default;