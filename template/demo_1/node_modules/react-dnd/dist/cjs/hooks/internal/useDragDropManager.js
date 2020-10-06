"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useDragDropManager = useDragDropManager;

var _react = require("react");

var _invariant = _interopRequireDefault(require("invariant"));

var _DndContext = require("../../common/DndContext");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * A hook to retrieve the DragDropManager from Context
 */
function useDragDropManager() {
  var _useContext = (0, _react.useContext)(_DndContext.DndContext),
      dragDropManager = _useContext.dragDropManager;

  (0, _invariant.default)(dragDropManager != null, 'Expected drag drop context');
  return dragDropManager;
}