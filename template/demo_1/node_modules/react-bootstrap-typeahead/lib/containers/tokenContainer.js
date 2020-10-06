"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _RootCloseWrapper = _interopRequireDefault(require("react-overlays/lib/RootCloseWrapper"));

var _utils = require("../utils");

var _constants = require("../constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Higher-order component that encapsulates Token behaviors, allowing them to
 * be easily re-used.
 */
var tokenContainer = function tokenContainer(Component) {
  var WrappedComponent =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits(WrappedComponent, _React$Component);

    function WrappedComponent() {
      var _getPrototypeOf2;

      var _this;

      _classCallCheck(this, WrappedComponent);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(WrappedComponent)).call.apply(_getPrototypeOf2, [this].concat(args)));

      _defineProperty(_assertThisInitialized(_this), "state", {
        active: false
      });

      _defineProperty(_assertThisInitialized(_this), "_handleBlur", function (e) {
        _this.setState({
          active: false
        });
      });

      _defineProperty(_assertThisInitialized(_this), "_handleKeyDown", function (e) {
        switch (e.keyCode) {
          case _constants.BACKSPACE:
            if (_this.state.active) {
              // Prevent backspace keypress from triggering the browser "back"
              // action.
              e.preventDefault();

              _this.props.onRemove();
            }

            break;

          default:
            break;
        }
      });

      _defineProperty(_assertThisInitialized(_this), "_handleActive", function (e) {
        e.stopPropagation();

        _this.setState({
          active: true
        });
      });

      return _this;
    }

    _createClass(WrappedComponent, [{
      key: "render",
      value: function render() {
        return _react["default"].createElement(_RootCloseWrapper["default"], {
          onRootClose: this._handleBlur
        }, _react["default"].createElement(Component, _extends({}, this.props, this.state, {
          onBlur: this._handleBlur,
          onClick: this._handleActive,
          onFocus: this._handleActive,
          onKeyDown: this._handleKeyDown
        })));
      }
    }]);

    return WrappedComponent;
  }(_react["default"].Component);

  WrappedComponent.displayName = "TokenContainer(".concat((0, _utils.getDisplayName)(Component), ")");
  return WrappedComponent;
};

var _default = tokenContainer;
exports["default"] = _default;