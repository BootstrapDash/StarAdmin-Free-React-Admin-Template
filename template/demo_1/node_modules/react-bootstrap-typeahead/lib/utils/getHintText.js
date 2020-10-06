"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _getMatchBounds = _interopRequireDefault(require("./getMatchBounds"));

var _getOptionLabel = _interopRequireDefault(require("./getOptionLabel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function getHintText(_ref) {
  var activeItem = _ref.activeItem,
      initialItem = _ref.initialItem,
      isFocused = _ref.isFocused,
      isMenuShown = _ref.isMenuShown,
      labelKey = _ref.labelKey,
      multiple = _ref.multiple,
      selected = _ref.selected,
      text = _ref.text;

  // Don't display a hint under the following conditions:
  if ( // No text entered.
  !text || // The input is not focused.
  !isFocused || // The menu is hidden.
  !isMenuShown || // No item in the menu.
  !initialItem || // The initial item is a custom option.
  initialItem.customOption || // One of the menu items is active.
  activeItem || // There's already a selection in single-select mode.
  !!selected.length && !multiple) {
    return '';
  }

  var initialItemStr = (0, _getOptionLabel["default"])(initialItem, labelKey);
  var bounds = (0, _getMatchBounds["default"])(initialItemStr.toLowerCase(), text.toLowerCase());

  if (!(bounds && bounds.start === 0)) {
    return '';
  } // Text matching is case- and accent-insensitive, so to display the hint
  // correctly, splice the input string with the hint string.


  return text + initialItemStr.slice(bounds.end, initialItemStr.length);
}

var _default = getHintText;
exports["default"] = _default;