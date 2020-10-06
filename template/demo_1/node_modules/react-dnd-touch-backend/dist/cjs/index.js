"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _TouchBackend = _interopRequireDefault(require("./TouchBackend"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createTouchBackendFactory = function createTouchBackendFactory(manager, context) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return new _TouchBackend.default(manager, context, options);
};

var _default = createTouchBackendFactory;
exports.default = _default;