"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classnames = _interopRequireDefault(require("classnames"));

var _react = _interopRequireDefault(require("react"));

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function inputContainer(Input) {
  var WrappedInput =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits(WrappedInput, _React$Component);

    function WrappedInput() {
      _classCallCheck(this, WrappedInput);

      return _possibleConstructorReturn(this, _getPrototypeOf(WrappedInput).apply(this, arguments));
    }

    _createClass(WrappedInput, [{
      key: "render",
      value: function render() {
        var _cx;

        var _this$props = this.props,
            activeIndex = _this$props.activeIndex,
            bsSize = _this$props.bsSize,
            disabled = _this$props.disabled,
            inputRef = _this$props.inputRef,
            isFocused = _this$props.isFocused,
            isInvalid = _this$props.isInvalid,
            isMenuShown = _this$props.isMenuShown,
            isValid = _this$props.isValid,
            labelKey = _this$props.labelKey,
            menuId = _this$props.menuId,
            multiple = _this$props.multiple,
            onBlur = _this$props.onBlur,
            onChange = _this$props.onChange,
            onFocus = _this$props.onFocus,
            onKeyDown = _this$props.onKeyDown,
            onRemove = _this$props.onRemove,
            placeholder = _this$props.placeholder,
            renderToken = _this$props.renderToken,
            selected = _this$props.selected;
        var _this$props$inputProp = this.props.inputProps,
            autoComplete = _this$props$inputProp.autoComplete,
            type = _this$props$inputProp.type; // Add a11y-related props.

        var inputProps = _objectSpread({}, this.props.inputProps, {
          'aria-activedescendant': activeIndex >= 0 ? (0, _utils.getMenuItemId)(activeIndex) : undefined,
          'aria-autocomplete': multiple ? 'list' : 'both',
          'aria-expanded': isMenuShown,
          'aria-haspopup': 'listbox',
          'aria-owns': isMenuShown ? menuId : undefined,
          autoComplete: autoComplete || 'nope',
          disabled: disabled,
          inputRef: inputRef,
          onBlur: onBlur,
          onChange: onChange,
          // Re-open the menu, eg: if it's closed via ESC.
          onClick: onFocus,
          onFocus: onFocus,
          onKeyDown: onKeyDown,
          placeholder: selected.length ? null : placeholder,
          // Comboboxes are single-select by definition:
          // https://www.w3.org/TR/wai-aria-practices-1.1/#combobox
          role: 'combobox',
          type: type || 'text',
          value: (0, _utils.getInputText)(this.props)
        });

        var className = inputProps.className || '';

        if (multiple) {
          inputProps = _objectSpread({}, inputProps, {
            'aria-expanded': undefined,
            inputClassName: className,
            labelKey: labelKey,
            onRemove: onRemove,
            renderToken: renderToken,
            role: undefined,
            selected: selected
          });
        }

        return _react["default"].createElement(Input, _extends({}, inputProps, {
          className: (0, _classnames["default"])('rbt-input', (_cx = {}, _defineProperty(_cx, className, !multiple), _defineProperty(_cx, "focus", isFocused), _defineProperty(_cx, 'input-lg form-control-lg', bsSize === 'large' || bsSize === 'lg'), _defineProperty(_cx, 'input-sm form-control-sm', bsSize === 'small' || bsSize === 'sm'), _defineProperty(_cx, 'is-invalid', isInvalid), _defineProperty(_cx, 'is-valid', isValid), _cx))
        }));
      }
    }]);

    return WrappedInput;
  }(_react["default"].Component);

  WrappedInput.displayName = "InputContainer(".concat((0, _utils.getDisplayName)(Input), ")");
  return WrappedInput;
}

var _default = inputContainer;
exports["default"] = _default;