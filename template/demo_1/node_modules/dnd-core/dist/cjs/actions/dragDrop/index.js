"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {};
exports.default = createDragDropActions;

var _beginDrag = _interopRequireDefault(require("./beginDrag"));

var _publishDragSource = _interopRequireDefault(require("./publishDragSource"));

var _hover = _interopRequireDefault(require("./hover"));

var _drop = _interopRequireDefault(require("./drop"));

var _endDrag = _interopRequireDefault(require("./endDrag"));

var _types = require("./types");

Object.keys(_types).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _types[key];
    }
  });
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createDragDropActions(manager) {
  return {
    beginDrag: (0, _beginDrag.default)(manager),
    publishDragSource: (0, _publishDragSource.default)(manager),
    hover: (0, _hover.default)(manager),
    drop: (0, _drop.default)(manager),
    endDrag: (0, _endDrag.default)(manager)
  };
}