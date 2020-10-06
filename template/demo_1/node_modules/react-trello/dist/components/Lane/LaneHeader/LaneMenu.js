"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactPopopo = require("react-popopo");

var _Base = require("../../../styles/Base");

var _Elements = require("../../../styles/Elements");

const TEST = _propTypes.default.elementType;

const LaneMenu = ({
  t,
  onDelete
}) => _react.default.createElement(_reactPopopo.Popover, {
  position: "bottom",
  PopoverContainer: _Base.CustomPopoverContainer,
  PopoverContent: _Base.CustomPopoverContent,
  trigger: _react.default.createElement(_Elements.MenuButton, null, "\u22EE")
}, _react.default.createElement(_Elements.LaneMenuHeader, null, _react.default.createElement(_Elements.LaneMenuTitle, null, t('Lane actions')), _react.default.createElement(_Elements.DeleteWrapper, null, _react.default.createElement(_Elements.GenDelButton, null, "\u2716"))), _react.default.createElement(_Elements.LaneMenuContent, null, _react.default.createElement(_Elements.LaneMenuItem, {
  onClick: onDelete
}, t('Delete lane'))));

var _default = LaneMenu;
exports.default = _default;