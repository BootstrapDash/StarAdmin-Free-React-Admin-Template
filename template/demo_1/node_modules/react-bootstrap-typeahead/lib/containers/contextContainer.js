"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _pick = _interopRequireDefault(require("lodash/pick"));

var _react = _interopRequireDefault(require("react"));

var _TypeaheadContext = _interopRequireDefault(require("../TypeaheadContext"));

var _utils = require("../utils");

var _constants = require("../constants");

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

function contextContainer(Typeahead) {
  var WrappedTypeahead =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits(WrappedTypeahead, _React$Component);

    function WrappedTypeahead() {
      var _getPrototypeOf2;

      var _this;

      _classCallCheck(this, WrappedTypeahead);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(WrappedTypeahead)).call.apply(_getPrototypeOf2, [this].concat(args)));

      _defineProperty(_assertThisInitialized(_this), "_handleKeyDown", function (e) {
        var _this$props = _this.props,
            initialItem = _this$props.initialItem,
            onKeyDown = _this$props.onKeyDown,
            onAdd = _this$props.onAdd;

        switch (e.keyCode) {
          case _constants.RETURN:
            if ((0, _utils.getIsOnlyResult)(_this.props) && initialItem) {
              onAdd(initialItem);
            }

            break;

          default:
            break;
        }

        onKeyDown(e);
      });

      return _this;
    }

    _createClass(WrappedTypeahead, [{
      key: "componentDidUpdate",
      value: function componentDidUpdate(prevProps, prevState) {
        var _this$props2 = this.props,
            allowNew = _this$props2.allowNew,
            onInitialItemChange = _this$props2.onInitialItemChange,
            results = _this$props2.results; // Clear the initial item when there are no results.

        if (!(allowNew || results.length)) {
          onInitialItemChange(null);
        }
      }
    }, {
      key: "render",
      value: function render() {
        var contextValues = (0, _pick["default"])(this.props, ['activeIndex', 'initialItem', 'onActiveItemChange', 'onAdd', 'onInitialItemChange', 'onMenuItemClick', 'selectHintOnEnter']);
        return _react["default"].createElement(_TypeaheadContext["default"].Provider, {
          value: _objectSpread({}, contextValues, {
            hintText: (0, _utils.getHintText)(this.props),
            isOnlyResult: (0, _utils.getIsOnlyResult)(this.props)
          })
        }, _react["default"].createElement(Typeahead, _extends({}, this.props, {
          onKeyDown: this._handleKeyDown
        })));
      }
    }]);

    return WrappedTypeahead;
  }(_react["default"].Component);

  return WrappedTypeahead;
}

var _default = contextContainer;
exports["default"] = _default;