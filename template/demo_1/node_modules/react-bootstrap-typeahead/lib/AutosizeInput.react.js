"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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

var SIZER_STYLE = {
  height: 0,
  left: 0,
  overflow: 'scroll',
  position: 'absolute',
  top: 0,
  visibility: 'hidden',
  whiteSpace: 'pre'
};
var INPUT_PROPS_BLACKLIST = ['inputClassName', 'inputRef', 'inputStyle'];
var MIN_WIDTH = 1;

var cleanInputProps = function cleanInputProps(inputProps) {
  var cleanProps = {};
  Object.keys(inputProps).forEach(function (key) {
    if (INPUT_PROPS_BLACKLIST.indexOf(key) === -1) {
      cleanProps[key] = inputProps[key];
    }
  });
  return cleanProps;
};

var copyStyles = function copyStyles(styles, node) {
  /* eslint-disable no-param-reassign */
  node.style.fontSize = styles.fontSize;
  node.style.fontFamily = styles.fontFamily;
  node.style.fontWeight = styles.fontWeight;
  node.style.fontStyle = styles.fontStyle;
  node.style.letterSpacing = styles.letterSpacing;
  node.style.textTransform = styles.textTransform;
  /* eslint-enable no-param-reassign */
};

var AutosizeInput =
/*#__PURE__*/
function (_React$Component) {
  _inherits(AutosizeInput, _React$Component);

  function AutosizeInput() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, AutosizeInput);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(AutosizeInput)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      inputWidth: MIN_WIDTH
    });

    _defineProperty(_assertThisInitialized(_this), "_copyInputStyles", function () {
      var inputStyles = _this._input && window.getComputedStyle && window.getComputedStyle(_this._input);

      if (!inputStyles) {
        return;
      }

      copyStyles(inputStyles, _this._sizer);

      if (_this._placeHolderSizer) {
        copyStyles(inputStyles, _this._placeHolderSizer);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "_updateInputWidth", function () {
      if (!_this._sizer || _this._sizer.scrollWidth === undefined) {
        return;
      }

      _this._copyInputStyles();

      var placeholderWidth = _this._placeHolderSizer && _this._placeHolderSizer.scrollWidth || MIN_WIDTH;
      var inputWidth = Math.max(_this._sizer.scrollWidth, placeholderWidth) + 2;

      if (inputWidth !== _this.state.inputWidth) {
        _this.setState({
          inputWidth: inputWidth
        });
      }
    });

    return _this;
  }

  _createClass(AutosizeInput, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this._updateInputWidth();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      this._updateInputWidth();
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          className = _this$props.className,
          defaultValue = _this$props.defaultValue,
          placeholder = _this$props.placeholder,
          value = _this$props.value;

      var wrapperStyle = _objectSpread({}, this.props.style);

      if (!wrapperStyle.display) {
        wrapperStyle.display = 'inline-block';
      }

      var inputProps = cleanInputProps(_objectSpread({}, this.props, {
        className: this.props.inputClassName,
        style: _objectSpread({}, this.props.inputStyle, {
          boxSizing: 'content-box',
          width: "".concat(this.state.inputWidth, "px")
        })
      }));
      return _react["default"].createElement("div", {
        className: className,
        style: wrapperStyle
      }, _react["default"].createElement("input", _extends({}, inputProps, {
        ref: function ref(el) {
          _this2._input = el;

          if (typeof _this2.props.inputRef === 'function') {
            _this2.props.inputRef(el);
          }
        }
      })), _react["default"].createElement("div", {
        ref: function ref(el) {
          return _this2._sizer = el;
        },
        style: SIZER_STYLE
      }, defaultValue || value || ''), placeholder ? _react["default"].createElement("div", {
        ref: function ref(el) {
          return _this2._placeHolderSizer = el;
        },
        style: SIZER_STYLE
      }, placeholder) : null);
    }
  }]);

  return AutosizeInput;
}(_react["default"].Component);

AutosizeInput.propTypes = {
  /**
   * ClassName for the input element.
   */
  inputClassName: _propTypes["default"].string,

  /**
   * Ref callback for the input element.
   */
  inputRef: _propTypes["default"].func,

  /**
   * CSS styles for the input element.
   */

  /* eslint-disable-next-line react/forbid-prop-types */
  inputStyle: _propTypes["default"].object
};
var _default = AutosizeInput;
exports["default"] = _default;