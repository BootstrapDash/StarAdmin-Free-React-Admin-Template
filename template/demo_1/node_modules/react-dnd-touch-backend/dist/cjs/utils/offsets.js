"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getNodeClientOffset = getNodeClientOffset;
exports.getEventClientTouchOffset = getEventClientTouchOffset;
exports.getEventClientOffset = getEventClientOffset;

var _predicates = require("./predicates");

var ELEMENT_NODE = 1;

function getNodeClientOffset(node) {
  var el = node.nodeType === ELEMENT_NODE ? node : node.parentElement;

  if (!el) {
    return undefined;
  }

  var _el$getBoundingClient = el.getBoundingClientRect(),
      top = _el$getBoundingClient.top,
      left = _el$getBoundingClient.left;

  return {
    x: left,
    y: top
  };
}

function getEventClientTouchOffset(e) {
  if (e.targetTouches.length === 1) {
    return getEventClientOffset(e.targetTouches[0]);
  }
}

function getEventClientOffset(e) {
  if ((0, _predicates.isTouchEvent)(e)) {
    return getEventClientTouchOffset(e);
  } else {
    return {
      x: e.clientX,
      y: e.clientY
    };
  }
}