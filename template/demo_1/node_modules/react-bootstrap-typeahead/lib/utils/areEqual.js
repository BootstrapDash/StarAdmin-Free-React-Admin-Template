"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = areEqual;

var _isEqual = _interopRequireDefault(require("lodash/isEqual"));

var _getStringLabelKey = _interopRequireDefault(require("./getStringLabelKey"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Compare whether items are the same. For custom items, compare the
 * `labelKey` values since a unique id is generated each time, causing the
 * comparison to fail.
 */
function areEqual(newItem, existingItem, labelKey) {
  var stringLabelKey = (0, _getStringLabelKey["default"])(labelKey);

  if (newItem && newItem.customOption && existingItem && existingItem.customOption) {
    return newItem[stringLabelKey] === existingItem[stringLabelKey];
  }

  return (0, _isEqual["default"])(newItem, existingItem);
}