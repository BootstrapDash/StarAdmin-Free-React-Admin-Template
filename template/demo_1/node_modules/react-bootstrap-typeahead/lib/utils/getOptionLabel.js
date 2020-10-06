"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _invariant = _interopRequireDefault(require("invariant"));

var _isPlainObject = _interopRequireDefault(require("lodash/isPlainObject"));

var _getStringLabelKey = _interopRequireDefault(require("./getStringLabelKey"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Retrieves the display string from an option. Options can be the string
 * themselves, or an object with a defined display string. Anything else throws
 * an error.
 */
function getOptionLabel(option, labelKey) {
  if (option.paginationOption || option.customOption) {
    return option[(0, _getStringLabelKey["default"])(labelKey)];
  }

  var optionLabel;

  if (typeof option === 'string') {
    optionLabel = option;
  }

  if (typeof labelKey === 'function') {
    // This overwrites string options, but we assume the consumer wants to do
    // something custom if `labelKey` is a function.
    optionLabel = labelKey(option);
  } else if (typeof labelKey === 'string' && (0, _isPlainObject["default"])(option)) {
    optionLabel = option[labelKey];
  }

  !(typeof optionLabel === 'string') ? process.env.NODE_ENV !== "production" ? (0, _invariant["default"])(false, 'One or more options does not have a valid label string. Check the ' + '`labelKey` prop to ensure that it matches the correct option key and ' + 'provides a string for filtering and display.') : invariant(false) : void 0;
  return optionLabel;
}

var _default = getOptionLabel;
exports["default"] = _default;