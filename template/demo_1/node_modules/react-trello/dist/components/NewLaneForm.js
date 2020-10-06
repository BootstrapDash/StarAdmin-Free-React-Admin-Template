"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Base = require("../styles/Base");

var _Elements = require("../styles/Elements");

var _NewLaneTitleEditor = _interopRequireDefault(require("../widgets/NewLaneTitleEditor"));

var _reactClickOutside = _interopRequireDefault(require("react-click-outside"));

class NewLane extends _react.Component {
  constructor(...args) {
    super(...args);
    (0, _defineProperty2.default)(this, "handleSubmit", () => {
      this.props.onAdd({
        title: this.getValue()
      });
    });
    (0, _defineProperty2.default)(this, "getValue", () => this.refInput.getValue());
    (0, _defineProperty2.default)(this, "onClickOutside", (a, b, c) => {
      if (this.getValue().length > 0) {
        this.handleSubmit();
      } else {
        this.props.onCancel();
      }
    });
  }

  render() {
    const _this$props = this.props,
          onCancel = _this$props.onCancel,
          t = _this$props.t;
    return _react.default.createElement(_reactClickOutside.default, {
      onClickOutside: this.onClickOutside
    }, _react.default.createElement(_Base.Section, null, _react.default.createElement(_Base.LaneTitle, null, _react.default.createElement(_NewLaneTitleEditor.default, {
      ref: _ref => this.refInput = _ref,
      placeholder: t('placeholder.title'),
      onCancel: this.props.onCancel,
      onSave: this.handleSubmit,
      resize: "vertical",
      border: true,
      autoFocus: true
    })), _react.default.createElement(_Base.NewLaneButtons, null, _react.default.createElement(_Elements.AddButton, {
      onClick: this.handleSubmit
    }, t('button.Add lane')), _react.default.createElement(_Elements.CancelButton, {
      onClick: onCancel
    }, t('button.Cancel')))));
  }

}

NewLane.propTypes = {
  onCancel: _propTypes.default.func.isRequired,
  onAdd: _propTypes.default.func.isRequired,
  t: _propTypes.default.func.isRequired
};
NewLane.defaultProps = {};
var _default = NewLane;
exports.default = _default;