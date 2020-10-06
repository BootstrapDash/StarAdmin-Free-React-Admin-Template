"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = defaultFilterBy;

var _isEqual = _interopRequireDefault(require("lodash/isEqual"));

var _isFunction = _interopRequireDefault(require("lodash/isFunction"));

var _isString = _interopRequireDefault(require("lodash/isString"));

var _some = _interopRequireDefault(require("lodash/some"));

var _stripDiacritics = _interopRequireDefault(require("./stripDiacritics"));

var _warn = _interopRequireDefault(require("./warn"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function isMatch(input, string, props) {
  var searchStr = input;
  var str = string;

  if (!props.caseSensitive) {
    searchStr = searchStr.toLowerCase();
    str = str.toLowerCase();
  }

  if (props.ignoreDiacritics) {
    searchStr = (0, _stripDiacritics["default"])(searchStr);
    str = (0, _stripDiacritics["default"])(str);
  }

  return str.indexOf(searchStr) !== -1;
}
/**
 * Default algorithm for filtering results.
 */


function defaultFilterBy(option, props) {
  var filterBy = props.filterBy,
      labelKey = props.labelKey,
      multiple = props.multiple,
      selected = props.selected,
      text = props.text; // Don't show selected options in the menu for the multi-select case.

  if (multiple && selected.some(function (o) {
    return (0, _isEqual["default"])(o, option);
  })) {
    return false;
  }

  var fields = filterBy.slice();

  if ((0, _isFunction["default"])(labelKey) && isMatch(text, labelKey(option), props)) {
    return true;
  }

  if ((0, _isString["default"])(labelKey)) {
    // Add the `labelKey` field to the list of fields if it isn't already there.
    if (fields.indexOf(labelKey) === -1) {
      fields.unshift(labelKey);
    }
  }

  if ((0, _isString["default"])(option)) {
    (0, _warn["default"])(fields.length <= 1, 'You cannot filter by properties when `option` is a string.');
    return isMatch(text, option, props);
  }

  return (0, _some["default"])(fields, function (field) {
    var value = option[field];

    if (!(0, _isString["default"])(value)) {
      (0, _warn["default"])(false, 'Fields passed to `filterBy` should have string values. Value will ' + 'be converted to a string; results may be unexpected.'); // Coerce to string since `toString` isn't null-safe.

      value = "".concat(value);
    }

    return isMatch(text, value, props);
  });
}