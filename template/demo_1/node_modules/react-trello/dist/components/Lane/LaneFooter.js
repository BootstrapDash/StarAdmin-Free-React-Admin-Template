"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _Base = require("../../styles/Base");

var _Elements = require("../../styles/Elements");

var _default = ({
  onClick,
  collapsed
}) => _react.default.createElement(_Base.LaneFooter, {
  onClick: onClick
}, collapsed ? _react.default.createElement(_Elements.ExpandBtn, null) : _react.default.createElement(_Elements.CollapseBtn, null));

exports.default = _default;