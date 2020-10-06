"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _InlineInput = _interopRequireDefault(require("../../widgets/InlineInput"));

var _Base = require("../../styles/Base");

var _LaneMenu = _interopRequireDefault(require("./LaneHeader/LaneMenu"));

const LaneHeaderComponent = ({
  updateTitle,
  canAddLanes,
  onDelete,
  onDoubleClick,
  editLaneTitle,
  label,
  title,
  titleStyle,
  labelStyle,
  t,
  laneDraggable
}) => {
  return _react.default.createElement(_Base.LaneHeader, {
    onDoubleClick: onDoubleClick,
    editLaneTitle: editLaneTitle
  }, _react.default.createElement(_Base.Title, {
    draggable: laneDraggable,
    style: titleStyle
  }, editLaneTitle ? _react.default.createElement(_InlineInput.default, {
    value: title,
    border: true,
    placeholder: t('placeholder.title'),
    resize: "vertical",
    onSave: updateTitle
  }) : title), label && _react.default.createElement(_Base.RightContent, null, _react.default.createElement("span", {
    style: labelStyle
  }, label)), canAddLanes && _react.default.createElement(_LaneMenu.default, {
    t: t,
    onDelete: onDelete
  }));
};

LaneHeaderComponent.propTypes = {
  updateTitle: _propTypes.default.func,
  editLaneTitle: _propTypes.default.bool,
  canAddLanes: _propTypes.default.bool,
  laneDraggable: _propTypes.default.bool,
  label: _propTypes.default.string,
  title: _propTypes.default.string,
  onDelete: _propTypes.default.func,
  onDoubleClick: _propTypes.default.func,
  t: _propTypes.default.func.isRequired
};
LaneHeaderComponent.defaultProps = {
  updateTitle: () => {},
  editLaneTitle: false,
  canAddLanes: false
};
var _default = LaneHeaderComponent;
exports.default = _default;