"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useDropTargetMonitor = useDropTargetMonitor;
exports.useDropHandler = useDropHandler;

var _react = require("react");

var _registration = require("../../common/registration");

var _useDragDropManager = require("./useDragDropManager");

var _TargetConnector = require("../../common/TargetConnector");

var _DropTargetMonitorImpl = require("../../common/DropTargetMonitorImpl");

var _useIsomorphicLayoutEffect = require("./useIsomorphicLayoutEffect");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function useDropTargetMonitor() {
  var manager = (0, _useDragDropManager.useDragDropManager)();
  var monitor = (0, _react.useMemo)(function () {
    return new _DropTargetMonitorImpl.DropTargetMonitorImpl(manager);
  }, [manager]);
  var connector = (0, _react.useMemo)(function () {
    return new _TargetConnector.TargetConnector(manager.getBackend());
  }, [manager]);
  return [monitor, connector];
}

function useDropHandler(spec, monitor, connector) {
  var manager = (0, _useDragDropManager.useDragDropManager)();
  var handler = (0, _react.useMemo)(function () {
    return {
      canDrop: function canDrop() {
        var canDrop = spec.current.canDrop;
        return canDrop ? canDrop(monitor.getItem(), monitor) : true;
      },
      hover: function hover() {
        var hover = spec.current.hover;

        if (hover) {
          hover(monitor.getItem(), monitor);
        }
      },
      drop: function drop() {
        var drop = spec.current.drop;

        if (drop) {
          return drop(monitor.getItem(), monitor);
        }
      }
    };
  }, [monitor]);
  (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(function registerHandler() {
    var _registerTarget = (0, _registration.registerTarget)(spec.current.accept, handler, manager),
        _registerTarget2 = _slicedToArray(_registerTarget, 2),
        handlerId = _registerTarget2[0],
        unregister = _registerTarget2[1];

    monitor.receiveHandlerId(handlerId);
    connector.receiveHandlerId(handlerId);
    return unregister;
  }, [monitor, connector]);
}