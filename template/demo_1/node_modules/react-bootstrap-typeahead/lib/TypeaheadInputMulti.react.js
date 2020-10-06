"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _AutosizeInput = _interopRequireDefault(require("./AutosizeInput.react"));

var _Token = _interopRequireDefault(require("./Token.react"));

var _utils = require("./utils");

var _hintContainer = _interopRequireDefault(require("./containers/hintContainer"));

var _inputContainer = _interopRequireDefault(require("./containers/inputContainer"));

var _constants = require("./constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var HintedAutosizeInput = (0, _hintContainer["default"])(_AutosizeInput["default"]);

var TypeaheadInputMulti =
/*#__PURE__*/
function (_React$Component) {
  _inherits(TypeaheadInputMulti, _React$Component);

  function TypeaheadInputMulti() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, TypeaheadInputMulti);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(TypeaheadInputMulti)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "_renderToken", function (option, idx) {
      var _this$props = _this.props,
          _onRemove = _this$props.onRemove,
          renderToken = _this$props.renderToken;

      var props = _objectSpread({}, _this.props, {
        onRemove: function onRemove() {
          return _onRemove(option);
        }
      });

      return renderToken(option, props, idx);
    });

    _defineProperty(_assertThisInitialized(_this), "_handleContainerClickOrFocus", function (e) {
      // Don't focus the input if it's disabled.
      if (_this.props.disabled) {
        e.target.blur();
        return;
      } // Move cursor to the end if the user clicks outside the actual input.


      var inputNode = _this._input;

      if (e.target !== inputNode && (0, _utils.isSelectable)(inputNode)) {
        inputNode.selectionStart = inputNode.value.length;
      }

      inputNode.focus();
    });

    _defineProperty(_assertThisInitialized(_this), "_handleKeyDown", function (e) {
      var _this$props2 = _this.props,
          onKeyDown = _this$props2.onKeyDown,
          selected = _this$props2.selected,
          value = _this$props2.value;

      switch (e.keyCode) {
        case _constants.BACKSPACE:
          if (e.target === _this._input && selected.length && !value) {
            // Prevent browser from going back.
            e.preventDefault(); // If the input is selected and there is no text, focus the last
            // token when the user hits backspace.

            var children = _this._wrapper.children;
            var lastToken = children[children.length - 2];
            lastToken && lastToken.focus();
          }

          break;

        default:
          break;
      }

      onKeyDown(e);
    });

    return _this;
  }

  _createClass(TypeaheadInputMulti, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props3 = this.props,
          className = _this$props3.className,
          inputClassName = _this$props3.inputClassName,
          labelKey = _this$props3.labelKey,
          onRemove = _this$props3.onRemove,
          renderToken = _this$props3.renderToken,
          selected = _this$props3.selected,
          props = _objectWithoutProperties(_this$props3, ["className", "inputClassName", "labelKey", "onRemove", "renderToken", "selected"]);

      return (
        /* eslint-disable jsx-a11y/no-static-element-interactions */

        /* eslint-disable jsx-a11y/click-events-have-key-events */
        _react["default"].createElement("div", {
          className: (0, _classnames["default"])('form-control', 'rbt-input-multi', className),
          disabled: props.disabled,
          onClick: this._handleContainerClickOrFocus,
          onFocus: this._handleContainerClickOrFocus,
          tabIndex: -1
        }, _react["default"].createElement("div", {
          className: "rbt-input-wrapper",
          ref: function ref(el) {
            return _this2._wrapper = el;
          }
        }, selected.map(this._renderToken), _react["default"].createElement(HintedAutosizeInput, _extends({}, props, {
          inputClassName: (0, _classnames["default"])('rbt-input-main', inputClassName),
          inputRef: function inputRef(input) {
            _this2._input = input;

            _this2.props.inputRef(input);
          },
          inputStyle: {
            backgroundColor: 'transparent',
            border: 0,
            boxShadow: 'none',
            cursor: 'inherit',
            outline: 'none',
            padding: 0
          },
          onKeyDown: this._handleKeyDown,
          style: {
            position: 'relative',
            zIndex: 1
          }
        }))))
        /* eslint-enable jsx-a11y/no-static-element-interactions */

        /* eslint-enable jsx-a11y/click-events-have-key-events */

      );
    }
  }]);

  return TypeaheadInputMulti;
}(_react["default"].Component);

TypeaheadInputMulti.propTypes = {
  /**
   * Provides a hook for customized rendering of tokens when multiple
   * selections are enabled.
   */
  renderToken: _propTypes["default"].func
};
TypeaheadInputMulti.defaultProps = {
  renderToken: function renderToken(option, props, idx) {
    return _react["default"].createElement(_Token["default"], {
      disabled: props.disabled,
      key: idx,
      onRemove: props.onRemove,
      tabIndex: props.tabIndex
    }, (0, _utils.getOptionLabel)(option, props.labelKey));
  }
};

var _default = (0, _inputContainer["default"])(TypeaheadInputMulti);

exports["default"] = _default;