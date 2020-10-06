"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateSourceContract = validateSourceContract;
exports.validateTargetContract = validateTargetContract;
exports.validateType = validateType;

var _invariant = _interopRequireDefault(require("invariant"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function validateSourceContract(source) {
  (0, _invariant.default)(typeof source.canDrag === 'function', 'Expected canDrag to be a function.');
  (0, _invariant.default)(typeof source.beginDrag === 'function', 'Expected beginDrag to be a function.');
  (0, _invariant.default)(typeof source.endDrag === 'function', 'Expected endDrag to be a function.');
}

function validateTargetContract(target) {
  (0, _invariant.default)(typeof target.canDrop === 'function', 'Expected canDrop to be a function.');
  (0, _invariant.default)(typeof target.hover === 'function', 'Expected hover to be a function.');
  (0, _invariant.default)(typeof target.drop === 'function', 'Expected beginDrag to be a function.');
}

function validateType(type, allowArray) {
  if (allowArray && Array.isArray(type)) {
    type.forEach(function (t) {
      return validateType(t, false);
    });
    return;
  }

  (0, _invariant.default)(typeof type === 'string' || _typeof(type) === 'symbol', allowArray ? 'Type can only be a string, a symbol, or an array of either.' : 'Type can only be a string or a symbol.');
}