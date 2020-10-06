"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.modulo = modulo;
exports.clamp = clamp;
exports.sum = sum;
exports.max = max;
exports.range = range;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function modulo(val, max) {
  return (val % max + max) % max;
}

function clamp(val, min, max) {
  return Math.min(Math.max(min, val), max);
}

function sum(arr) {
  return arr.reduce(function (a, b) {
    return a + b;
  }, 0);
}

function max(arr) {
  return Math.max.apply(null, arr);
}

function range(start, end, max) {
  return [].concat(_toConsumableArray(Array(1 + end - start))).map(function (val) {
    return max ? modulo(start + val, max) : start + val;
  });
}