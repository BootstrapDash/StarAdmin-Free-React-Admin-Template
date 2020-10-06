"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useDragLayer = useDragLayer;

var _react = require("react");

var _useDragDropManager = require("./internal/useDragDropManager");

var _useCollector3 = require("./internal/useCollector");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * useDragLayer Hook
 * @param collector The property collector
 */
function useDragLayer(collect) {
  var dragDropManager = (0, _useDragDropManager.useDragDropManager)();
  var monitor = dragDropManager.getMonitor();

  var _useCollector = (0, _useCollector3.useCollector)(monitor, collect),
      _useCollector2 = _slicedToArray(_useCollector, 2),
      collected = _useCollector2[0],
      updateCollected = _useCollector2[1];

  (0, _react.useEffect)(function () {
    return monitor.subscribeToOffsetChange(updateCollected);
  });
  (0, _react.useEffect)(function () {
    return monitor.subscribeToStateChange(updateCollected);
  });
  return collected;
}