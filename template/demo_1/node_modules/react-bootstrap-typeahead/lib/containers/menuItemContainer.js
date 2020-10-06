"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactDom = require("react-dom");

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

var menuItemContainer = function menuItemContainer(Component) {
  var WrappedMenuItem =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits(WrappedMenuItem, _React$Component);

    function WrappedMenuItem() {
      var _getPrototypeOf2;

      var _this;

      _classCallCheck(this, WrappedMenuItem);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(WrappedMenuItem)).call.apply(_getPrototypeOf2, [this].concat(args)));

      _defineProperty(_assertThisInitialized(_this), "_handleClick", function (e) {
        var _this$props = _this.props,
            onMenuItemClick = _this$props.onMenuItemClick,
            option = _this$props.option,
            onClick = _this$props.onClick;
        onMenuItemClick(option, e);
        onClick && onClick(e);
      });

      _defineProperty(_assertThisInitialized(_this), "_maybeUpdateItem", function () {
        var _this$props2 = _this.props,
            activeIndex = _this$props2.activeIndex,
            onActiveItemChange = _this$props2.onActiveItemChange,
            onInitialItemChange = _this$props2.onInitialItemChange,
            option = _this$props2.option,
            position = _this$props2.position;

        if (position === 0) {
          onInitialItemChange(option);
        }

        if (position === activeIndex) {
          // Ensures that if the menu items exceed the bounds of the menu, the
          // menu will scroll up or down as the user hits the arrow keys.

          /* eslint-disable-next-line react/no-find-dom-node */
          (0, _utils.scrollIntoViewIfNeeded)((0, _reactDom.findDOMNode)(_assertThisInitialized(_this)));
          onActiveItemChange(option);
        }
      });

      return _this;
    }

    _createClass(WrappedMenuItem, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        this._maybeUpdateItem();
      }
    }, {
      key: "componentDidUpdate",
      value: function componentDidUpdate(prevProps, prevState) {
        this._maybeUpdateItem();
      }
    }, {
      key: "render",
      value: function render() {
        var _this$props3 = this.props,
            activeIndex = _this$props3.activeIndex,
            isOnlyResult = _this$props3.isOnlyResult,
            label = _this$props3.label,
            onActiveItemChange = _this$props3.onActiveItemChange,
            onInitialItemChange = _this$props3.onInitialItemChange,
            onMenuItemClick = _this$props3.onMenuItemClick,
            option = _this$props3.option,
            position = _this$props3.position,
            props = _objectWithoutProperties(_this$props3, ["activeIndex", "isOnlyResult", "label", "onActiveItemChange", "onInitialItemChange", "onMenuItemClick", "option", "position"]);

        var active = isOnlyResult || activeIndex === position;
        return _react["default"].createElement(Component, _extends({}, props, {
          active: active,
          "aria-label": label,
          "aria-selected": active,
          id: (0, _utils.getMenuItemId)(position),
          onClick: this._handleClick,
          onMouseDown: _utils.preventInputBlur,
          role: "option"
        }));
      }
    }]);

    return WrappedMenuItem;
  }(_react["default"].Component);

  WrappedMenuItem.displayName = "MenuItemContainer(".concat((0, _utils.getDisplayName)(Component), ")");
  WrappedMenuItem.propTypes = {
    option: _propTypes["default"].oneOfType([_propTypes["default"].object, _propTypes["default"].string]).isRequired,
    position: _propTypes["default"].number
  };
  return (0, _TypeaheadContext.withContext)(WrappedMenuItem, ['activeIndex', 'isOnlyResult', 'onActiveItemChange', 'onInitialItemChange', 'onMenuItemClick']);
};

var _default = menuItemContainer;
exports["default"] = _default;