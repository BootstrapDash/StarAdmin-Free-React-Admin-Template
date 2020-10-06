"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _Base = require("../styles/Base");

var _Elements = require("../styles/Elements");

var _default = ({
  t,
  onClick
}) => _react.default.createElement(_Base.NewLaneSection, null, _react.default.createElement(_Elements.AddLaneLink, {
  t: t,
  onClick: onClick
}, t('Add another lane')));

exports.default = _default;