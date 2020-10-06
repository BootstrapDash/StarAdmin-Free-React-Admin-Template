"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Base = require("../styles/Base");

var _autosize = _interopRequireDefault(require("autosize"));

class InlineInputController extends _react.default.Component {
  constructor(...args) {
    super(...args);
    (0, _defineProperty2.default)(this, "onFocus", e => e.target.select());
    (0, _defineProperty2.default)(this, "onMouseDown", e => {
      if (document.activeElement != e.target) {
        e.preventDefault();
        this.refInput.focus();
      }
    });
    (0, _defineProperty2.default)(this, "onBlur", () => {
      this.updateValue();
    });
    (0, _defineProperty2.default)(this, "onKeyDown", e => {
      if (e.keyCode == 13) {
        this.refInput.blur();
        e.preventDefault();
      }

      if (e.keyCode == 27) {
        this.setValue(this.props.value);
        this.refInput.blur();
        e.preventDefault();
      }

      if (e.keyCode == 9) {
        if (this.getValue().length == 0) {
          this.props.onCancel();
        }

        this.refInput.blur();
        e.preventDefault();
      }
    });
    (0, _defineProperty2.default)(this, "getValue", () => this.refInput.value);
    (0, _defineProperty2.default)(this, "setValue", value => this.refInput.value = value);
    (0, _defineProperty2.default)(this, "updateValue", () => {
      if (this.getValue() != this.props.value) {
        this.props.onSave(this.getValue());
      }
    });
    (0, _defineProperty2.default)(this, "setRef", ref => {
      this.refInput = ref;

      if (this.props.resize != 'none') {
        (0, _autosize.default)(this.refInput);
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setValue(nextProps.value);
  }

  render() {
    const _this$props = this.props,
          autoFocus = _this$props.autoFocus,
          border = _this$props.border,
          value = _this$props.value,
          placeholder = _this$props.placeholder;
    return _react.default.createElement(_Base.InlineInput, {
      ref: this.setRef,
      border: border,
      onMouseDown: this.onMouseDown,
      onFocus: this.onFocus,
      onBlur: this.onBlur,
      onKeyDown: this.onKeyDown,
      placeholder: value.length == 0 ? undefined : placeholder,
      defaultValue: value,
      autoComplete: "off",
      autoCorrect: "off",
      autoCapitalize: "off",
      spellCheck: "false",
      dataGramm: "false",
      rows: 1,
      autoFocus: autoFocus
    });
  }

}

InlineInputController.propTypes = {
  onSave: _propTypes.default.func,
  border: _propTypes.default.bool,
  placeholder: _propTypes.default.string,
  value: _propTypes.default.string,
  autoFocus: _propTypes.default.bool,
  resize: _propTypes.default.oneOf(['none', 'vertical', 'horizontal'])
};
InlineInputController.defaultProps = {
  onSave: () => {},
  placeholder: '',
  value: '',
  border: false,
  autoFocus: false,
  resize: 'none'
};
var _default = InlineInputController;
exports.default = _default;