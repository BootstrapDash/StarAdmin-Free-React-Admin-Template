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

class NewLaneTitleEditor extends _react.default.Component {
  constructor(...args) {
    super(...args);
    (0, _defineProperty2.default)(this, "onKeyDown", e => {
      if (e.keyCode == 13) {
        this.refInput.blur();
        this.props.onSave();
        e.preventDefault();
      }

      if (e.keyCode == 27) {
        this.cancel();
        e.preventDefault();
      }

      if (e.keyCode == 9) {
        if (this.getValue().length == 0) {
          this.cancel();
        } else {
          this.props.onSave();
        }

        e.preventDefault();
      }
    });
    (0, _defineProperty2.default)(this, "cancel", () => {
      this.setValue('');
      this.props.onCancel();
      this.refInput.blur();
    });
    (0, _defineProperty2.default)(this, "getValue", () => this.refInput.value);
    (0, _defineProperty2.default)(this, "setValue", value => this.refInput.value = value);
    (0, _defineProperty2.default)(this, "saveValue", () => {
      if (this.getValue() != this.props.value) {
        this.props.onSave(this.getValue());
      }
    });
    (0, _defineProperty2.default)(this, "focus", () => this.refInput.focus());
    (0, _defineProperty2.default)(this, "setRef", ref => {
      this.refInput = ref;

      if (this.props.resize != 'none') {
        (0, _autosize.default)(this.refInput);
      }
    });
  }

  render() {
    const _this$props = this.props,
          autoFocus = _this$props.autoFocus,
          resize = _this$props.resize,
          border = _this$props.border,
          autoResize = _this$props.autoResize,
          value = _this$props.value,
          placeholder = _this$props.placeholder;
    return _react.default.createElement(_Base.InlineInput, {
      style: {
        resize: resize
      },
      ref: this.setRef,
      border: border,
      onKeyDown: this.onKeyDown,
      placeholder: value.length == 0 ? undefined : placeholder,
      defaultValue: value,
      rows: 3,
      autoResize: autoResize,
      autoFocus: autoFocus
    });
  }

}

NewLaneTitleEditor.propTypes = {
  onSave: _propTypes.default.func,
  onCancel: _propTypes.default.func,
  border: _propTypes.default.bool,
  placeholder: _propTypes.default.string,
  value: _propTypes.default.string,
  autoFocus: _propTypes.default.bool,
  autoResize: _propTypes.default.bool,
  resize: _propTypes.default.oneOf(['none', 'vertical', 'horizontal'])
};
NewLaneTitleEditor.defaultProps = {
  inputRef: () => {},
  onSave: () => {},
  onCancel: () => {},
  placeholder: '',
  value: '',
  border: false,
  autoFocus: false,
  autoResize: false,
  resize: 'none'
};
var _default = NewLaneTitleEditor;
exports.default = _default;