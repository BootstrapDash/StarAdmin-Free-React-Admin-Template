"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classnames = _interopRequireDefault(require("classnames"));

var _pick = _interopRequireDefault(require("lodash/pick"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _reactDom = require("react-dom");

var _ClearButton = _interopRequireDefault(require("./ClearButton.react"));

var _Loader = _interopRequireDefault(require("./Loader.react"));

var _Overlay = _interopRequireDefault(require("./Overlay.react"));

var _TypeaheadInputMulti = _interopRequireDefault(require("./TypeaheadInputMulti.react"));

var _TypeaheadInputSingle = _interopRequireDefault(require("./TypeaheadInputSingle.react"));

var _TypeaheadMenu = _interopRequireDefault(require("./TypeaheadMenu.react"));

var _typeaheadContainer = _interopRequireDefault(require("./containers/typeaheadContainer"));

var _utils = require("./utils");

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

var Typeahead =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Typeahead, _React$Component);

  function Typeahead() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Typeahead);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Typeahead)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "_renderInput", function (inputProps) {
      var Input = inputProps.multiple ? _TypeaheadInputMulti["default"] : _TypeaheadInputSingle["default"];
      return _react["default"].createElement(Input, inputProps);
    });

    _defineProperty(_assertThisInitialized(_this), "_renderAux", function () {
      var _this$props = _this.props,
          bsSize = _this$props.bsSize,
          clearButton = _this$props.clearButton,
          disabled = _this$props.disabled,
          isLoading = _this$props.isLoading,
          onClear = _this$props.onClear,
          selected = _this$props.selected;
      var content;

      if (isLoading) {
        content = _react["default"].createElement(_Loader["default"], {
          bsSize: bsSize
        });
      } else if (clearButton && !disabled && selected.length) {
        content = _react["default"].createElement(_ClearButton["default"], {
          bsSize: bsSize,
          onClick: onClear,
          onFocus: function onFocus(e) {
            // Prevent the main input from auto-focusing again.
            e.stopPropagation();
          },
          onMouseDown: _utils.preventInputBlur
        });
      }

      return content ? _react["default"].createElement("div", {
        className: (0, _classnames["default"])('rbt-aux', {
          'rbt-aux-lg': bsSize === 'large' || bsSize === 'lg'
        })
      }, content) : null;
    });

    return _this;
  }

  _createClass(Typeahead, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props2 = this.props,
          bodyContainer = _this$props2.bodyContainer,
          children = _this$props2.children,
          className = _this$props2.className,
          isMenuShown = _this$props2.isMenuShown,
          menuId = _this$props2.menuId,
          renderMenu = _this$props2.renderMenu,
          results = _this$props2.results;
      var inputProps = (0, _pick["default"])(this.props, ['activeIndex', 'activeItem', 'bsSize', 'disabled', 'inputProps', 'inputRef', 'isFocused', 'isInvalid', 'isMenuShown', 'isValid', 'labelKey', 'menuId', 'multiple', 'onBlur', 'onChange', 'onFocus', 'onKeyDown', 'onRemove', 'placeholder', 'renderToken', 'selected', 'text']);
      var overlayProps = (0, _pick["default"])(this.props, ['align', 'className', 'dropup', 'flip', 'onMenuHide', 'onMenuShow', 'onMenuToggle']);
      var menuProps = (0, _pick["default"])(this.props, ['emptyLabel', 'labelKey', 'maxHeight', 'newSelectionPrefix', 'renderMenuItemChildren', 'text']);

      var auxContent = this._renderAux();

      return _react["default"].createElement("div", {
        className: (0, _classnames["default"])('rbt', 'clearfix', 'open', {
          'has-aux': !!auxContent
        }, className),
        style: {
          position: 'relative'
        },
        tabIndex: -1
      }, this._renderInput(_objectSpread({}, inputProps, {
        // Use `findDOMNode` here since it's easier and less fragile than
        // forwarding refs down to the input's container.
        // TODO: Consider using `forwardRef` when React 16.3 usage is higher.

        /* eslint-disable-next-line react/no-find-dom-node */
        ref: function ref(node) {
          return _this2._inputContainer = (0, _reactDom.findDOMNode)(node);
        }
      })), typeof children === 'function' ? children(this.props) : children, auxContent, _react["default"].createElement(_Overlay["default"], _extends({}, overlayProps, {
        container: bodyContainer ? document.body : this,
        referenceElement: this._inputContainer,
        show: isMenuShown
      }), renderMenu(results, _objectSpread({}, menuProps, {
        id: menuId
      }))), _react["default"].createElement("div", {
        "aria-atomic": true,
        "aria-live": "polite",
        className: "sr-only rbt-sr-status",
        role: "status"
      }, (0, _utils.getAccessibilityStatus)(this.props)));
    }
  }]);

  return Typeahead;
}(_react["default"].Component);

Typeahead.propTypes = {
  renderMenu: _propTypes["default"].func
};
Typeahead.defaultProps = {
  renderMenu: function renderMenu(results, menuProps) {
    return _react["default"].createElement(_TypeaheadMenu["default"], _extends({}, menuProps, {
      options: results
    }));
  }
};

var _default = (0, _typeaheadContainer["default"])(Typeahead);

exports["default"] = _default;