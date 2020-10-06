import { isTouchEvent } from './predicates';
var ELEMENT_NODE = 1;
export function getNodeClientOffset(node) {
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
export function getEventClientTouchOffset(e) {
  if (e.targetTouches.length === 1) {
    return getEventClientOffset(e.targetTouches[0]);
  }
}
export function getEventClientOffset(e) {
  if (isTouchEvent(e)) {
    return getEventClientTouchOffset(e);
  } else {
    return {
      x: e.clientX,
      y: e.clientY
    };
  }
}