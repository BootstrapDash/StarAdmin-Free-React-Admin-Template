"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = ignoreDiacriticsType;

var _warn = _interopRequireDefault(require("../utils/warn"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ignoreDiacriticsType(props, propName, componentName) {
  var filterBy = props.filterBy,
      ignoreDiacritics = props.ignoreDiacritics;
  (0, _warn["default"])(ignoreDiacritics || typeof filterBy !== 'function', 'Your `filterBy` function will override the `ignoreDiacritics` prop.');
}