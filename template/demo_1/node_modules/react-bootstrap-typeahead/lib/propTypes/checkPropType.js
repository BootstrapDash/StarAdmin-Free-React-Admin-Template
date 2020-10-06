"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = checkPropType;

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Allows additional warnings or messaging related to prop validation.
 */
function checkPropType(validator, callback) {
  return function (props, propName, componentName) {
    _propTypes["default"].checkPropTypes(_defineProperty({}, propName, validator), props, 'prop', componentName);

    typeof callback === 'function' && callback(props, propName, componentName);
  };
}