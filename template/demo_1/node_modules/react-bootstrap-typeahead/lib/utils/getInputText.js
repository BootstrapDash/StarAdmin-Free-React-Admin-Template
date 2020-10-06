"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _head = _interopRequireDefault(require("lodash/head"));

var _getOptionLabel = _interopRequireDefault(require("./getOptionLabel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function getInputText(_ref) {
  var activeItem = _ref.activeItem,
      labelKey = _ref.labelKey,
      multiple = _ref.multiple,
      selected = _ref.selected,
      text = _ref.text;

  if (activeItem) {
    // Display the input value if the pagination item is active.
    return activeItem.paginationOption ? text : (0, _getOptionLabel["default"])(activeItem, labelKey);
  }

  var selectedItem = !multiple && !!selected.length && (0, _head["default"])(selected);

  if (selectedItem) {
    return (0, _getOptionLabel["default"])(selectedItem, labelKey);
  }

  return text;
}

var _default = getInputText;
exports["default"] = _default;