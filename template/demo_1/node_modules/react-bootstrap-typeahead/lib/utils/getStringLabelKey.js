"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getStringLabelKey;

var _constants = require("../constants");

function getStringLabelKey(labelKey) {
  return typeof labelKey === 'string' ? labelKey : _constants.DEFAULT_LABELKEY;
}