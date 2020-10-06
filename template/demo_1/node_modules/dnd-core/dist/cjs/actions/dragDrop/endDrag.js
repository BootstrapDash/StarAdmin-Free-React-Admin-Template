"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createEndDrag;

var _invariant = _interopRequireDefault(require("invariant"));

var _types = require("./types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createEndDrag(manager) {
  return function endDrag() {
    var monitor = manager.getMonitor();
    var registry = manager.getRegistry();
    verifyIsDragging(monitor);
    var sourceId = monitor.getSourceId();
    var source = registry.getSource(sourceId, true);
    source.endDrag(monitor, sourceId);
    registry.unpinSource();
    return {
      type: _types.END_DRAG
    };
  };
}

function verifyIsDragging(monitor) {
  (0, _invariant.default)(monitor.isDragging(), 'Cannot call endDrag while not dragging.');
}