"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _AutosizeInput = _interopRequireDefault(require("../AutosizeInput.react"));

var _TypeaheadContext = require("../TypeaheadContext");

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// IE doesn't seem to get the composite computed value (eg: 'padding',
// 'borderStyle', etc.), so generate these from the individual values.
function interpolateStyle(styles, attr) {
  var subattr = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

  // Title-case the sub-attribute.
  if (subattr) {
    /* eslint-disable-next-line no-param-reassign */
    subattr = subattr.replace(subattr[0], subattr[0].toUpperCase());
  }

  return ['Top', 'Right', 'Bottom', 'Left'].map(function (dir) {
    return styles[attr + dir + subattr];
  }).join(' ');
}

function copyStyles(inputNode, hintNode) {
  var inputStyle = window.getComputedStyle(inputNode);
  /* eslint-disable no-param-reassign */

  hintNode.style.borderStyle = interpolateStyle(inputStyle, 'border', 'style');
  hintNode.style.borderWidth = interpolateStyle(inputStyle, 'border', 'width');
  hintNode.style.fontSize = inputStyle.fontSize;
  hintNode.style.lineHeight = inputStyle.lineHeight;
  hintNode.style.margin = interpolateStyle(inputStyle, 'margin');
  hintNode.style.padding = interpolateStyle(inputStyle, 'padding');
  /* eslint-enable no-param-reassign */
}

function hintContainer(Input) {
  var HintedInput =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits(HintedInput, _React$Component);

    function HintedInput() {
      var _getPrototypeOf2;

      var _this;

      _classCallCheck(this, HintedInput);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(HintedInput)).call.apply(_getPrototypeOf2, [this].concat(args)));

      _defineProperty(_assertThisInitialized(_this), "_handleKeyDown", function (e) {
        var _this$props = _this.props,
            initialItem = _this$props.initialItem,
            onAdd = _this$props.onAdd,
            onKeyDown = _this$props.onKeyDown;

        if ((0, _utils.shouldSelectHint)(e, _this.props)) {
          e.preventDefault(); // Prevent input from blurring on TAB.

          onAdd(initialItem);
        }

        onKeyDown(e);
      });

      return _this;
    }

    _createClass(HintedInput, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        copyStyles(this._input, this._hint);
      }
    }, {
      key: "componentDidUpdate",
      value: function componentDidUpdate() {
        copyStyles(this._input, this._hint);
      }
    }, {
      key: "render",
      value: function render() {
        var _this2 = this;

        var _this$props2 = this.props,
            hintText = _this$props2.hintText,
            initialItem = _this$props2.initialItem,
            _inputRef = _this$props2.inputRef,
            onAdd = _this$props2.onAdd,
            selectHintOnEnter = _this$props2.selectHintOnEnter,
            props = _objectWithoutProperties(_this$props2, ["hintText", "initialItem", "inputRef", "onAdd", "selectHintOnEnter"]);

        return _react["default"].createElement("div", {
          className: "rbt-input-hint-container",
          style: {
            position: 'relative'
          }
        }, _react["default"].createElement(Input, _extends({}, props, {
          inputRef: function inputRef(input) {
            _this2._input = input;

            _inputRef(input);
          },
          onKeyDown: this._handleKeyDown
        })), _react["default"].createElement(_AutosizeInput["default"], {
          "aria-hidden": true,
          className: "rbt-input-hint",
          inputRef: function inputRef(hint) {
            return _this2._hint = hint;
          },
          inputStyle: {
            backgroundColor: 'transparent',
            borderColor: 'transparent',
            boxShadow: 'none',
            color: 'rgba(0, 0, 0, 0.35)'
          },
          readOnly: true,
          style: {
            left: 0,
            pointerEvents: 'none',
            position: 'absolute',
            top: 0
          },
          tabIndex: -1,
          value: hintText
        }));
      }
    }]);

    return HintedInput;
  }(_react["default"].Component);

  HintedInput.displayName = "HintContainer(".concat((0, _utils.getDisplayName)(Input), ")");
  return (0, _TypeaheadContext.withContext)(HintedInput, ['hintText', 'initialItem', 'onAdd', 'selectHintOnEnter']);
}

var _default = hintContainer;
exports["default"] = _default;