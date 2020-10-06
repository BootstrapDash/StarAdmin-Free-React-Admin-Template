"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Highlighter = _interopRequireDefault(require("./Highlighter.react"));

var _Menu = _interopRequireDefault(require("./Menu.react"));

var _MenuItem = _interopRequireDefault(require("./MenuItem.react"));

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

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

var TypeaheadMenu =
/*#__PURE__*/
function (_React$Component) {
  _inherits(TypeaheadMenu, _React$Component);

  function TypeaheadMenu() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, TypeaheadMenu);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(TypeaheadMenu)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "_renderMenuItem", function (option, idx) {
      var _this$props = _this.props,
          labelKey = _this$props.labelKey,
          newSelectionPrefix = _this$props.newSelectionPrefix,
          renderMenuItemChildren = _this$props.renderMenuItemChildren,
          text = _this$props.text;
      var label = (0, _utils.getOptionLabel)(option, labelKey);
      var menuItemProps = {
        disabled: option.disabled,
        key: idx,
        label: label,
        option: option,
        position: idx
      };

      if (option.customOption) {
        return _react["default"].createElement(_MenuItem["default"], _extends({}, menuItemProps, {
          className: "rbt-menu-custom-option",
          label: newSelectionPrefix + label
        }), newSelectionPrefix, _react["default"].createElement(_Highlighter["default"], {
          search: text
        }, label));
      }

      if (option.paginationOption) {
        return [_react["default"].createElement(_Menu["default"].Divider, {
          key: "pagination-item-divider"
        }), _react["default"].createElement(_MenuItem["default"], _extends({}, menuItemProps, {
          className: "rbt-menu-pagination-option",
          key: "pagination-item"
        }), label)];
      }

      return _react["default"].createElement(_MenuItem["default"], menuItemProps, renderMenuItemChildren(option, _this.props, idx));
    });

    return _this;
  }

  _createClass(TypeaheadMenu, [{
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          labelKey = _this$props2.labelKey,
          newSelectionPrefix = _this$props2.newSelectionPrefix,
          options = _this$props2.options,
          renderMenuItemChildren = _this$props2.renderMenuItemChildren,
          menuProps = _objectWithoutProperties(_this$props2, ["labelKey", "newSelectionPrefix", "options", "renderMenuItemChildren"]);

      return _react["default"].createElement(_Menu["default"], menuProps, options.map(this._renderMenuItem));
    }
  }]);

  return TypeaheadMenu;
}(_react["default"].Component);

TypeaheadMenu.propTypes = {
  /**
   * Provides the ability to specify a prefix before the user-entered text to
   * indicate that the selection will be new. No-op unless `allowNew={true}`.
   */
  newSelectionPrefix: _propTypes["default"].string,

  /**
   * Provides a hook for customized rendering of menu item contents.
   */
  renderMenuItemChildren: _propTypes["default"].func
};
TypeaheadMenu.defaultProps = {
  newSelectionPrefix: 'New selection: ',
  renderMenuItemChildren: function renderMenuItemChildren(option, props, idx) {
    return _react["default"].createElement(_Highlighter["default"], {
      search: props.text
    }, (0, _utils.getOptionLabel)(option, props.labelKey));
  }
};
var _default = TypeaheadMenu;
exports["default"] = _default;