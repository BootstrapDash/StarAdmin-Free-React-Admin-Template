"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createDragDropManager = createDragDropManager;

var _DragDropManagerImpl = _interopRequireDefault(require("./DragDropManagerImpl"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createDragDropManager(backendFactory, globalContext, backendOptions, debugMode) {
  var manager = new _DragDropManagerImpl.default(debugMode);
  var backend = backendFactory(manager, globalContext, backendOptions);
  manager.receiveBackend(backend);
  return manager;
}