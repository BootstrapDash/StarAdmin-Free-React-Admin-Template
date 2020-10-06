"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useDrop = useDrop;

var _react = require("react");

var _invariant = _interopRequireDefault(require("invariant"));

var _useMonitorOutput = require("./internal/useMonitorOutput");

var _useIsomorphicLayoutEffect = require("./internal/useIsomorphicLayoutEffect");

var _drop = require("./internal/drop");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * useDropTarget Hook
 * @param spec The drop target specification
 */
function useDrop(spec) {
  var specRef = (0, _react.useRef)(spec);
  specRef.current = spec;
  (0, _invariant.default)(spec.accept != null, 'accept must be defined');

  var _useDropTargetMonitor = (0, _drop.useDropTargetMonitor)(),
      _useDropTargetMonitor2 = _slicedToArray(_useDropTargetMonitor, 2),
      monitor = _useDropTargetMonitor2[0],
      connector = _useDropTargetMonitor2[1];

  (0, _drop.useDropHandler)(specRef, monitor, connector);
  var result = (0, _useMonitorOutput.useMonitorOutput)(monitor, specRef.current.collect || function () {
    return {};
  }, function () {
    return connector.reconnect();
  });
  var connectDropTarget = (0, _react.useMemo)(function () {
    return connector.hooks.dropTarget();
  }, [connector]);
  (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(function () {
    connector.dropTargetOptions = spec.options || null;
    connector.reconnect();
  }, [spec.options]);
  return [result, connectDropTarget];
}