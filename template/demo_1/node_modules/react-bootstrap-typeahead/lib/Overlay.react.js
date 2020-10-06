"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _noop = _interopRequireDefault(require("lodash/noop"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _componentOrElement = _interopRequireDefault(require("prop-types-extra/lib/componentOrElement"));

var _Portal = _interopRequireDefault(require("react-overlays/lib/Portal"));

var _Popper = _interopRequireDefault(require("react-popper/lib/cjs/Popper"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var BODY_CLASS = 'rbt-body-container';

function getModifiers(_ref) {
  var align = _ref.align,
      flip = _ref.flip;
  return {
    computeStyles: {
      enabled: true,
      fn: function fn(data) {
        // Use the following condition instead of `align === 'justify'` since
        // it allows the component to fall back to justifying the menu width
        // even when `align` is undefined.
        if (align !== 'right' && align !== 'left') {
          // Set the popper width to match the target width.

          /* eslint-disable-next-line no-param-reassign */
          data.styles.width = data.offsets.reference.width;
        }

        return data;
      }
    },
    flip: {
      enabled: flip
    },
    preventOverflow: {
      escapeWithReference: true
    }
  };
}

function isBody(container) {
  return container === document.body;
}
/**
 * Custom `Overlay` component, since the version in `react-overlays` doesn't
 * work for our needs. Specifically, the `Position` component doesn't provide
 * the customized placement we need.
 */


var Overlay =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Overlay, _React$Component);

  function Overlay() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Overlay);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Overlay)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "_update", function () {
      var _container$classList;

      var _this$props = _this.props,
          className = _this$props.className,
          container = _this$props.container,
          show = _this$props.show;

      if (!(show && isBody(container))) {
        return;
      } // Set a classname on the body for scoping purposes.


      container.classList.add(BODY_CLASS);
      !!className && (_container$classList = container.classList).add.apply(_container$classList, _toConsumableArray(className.split(' ')));
    });

    return _this;
  }

  _createClass(Overlay, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this._update();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      var _this$props2 = this.props,
          onMenuHide = _this$props2.onMenuHide,
          onMenuShow = _this$props2.onMenuShow,
          onMenuToggle = _this$props2.onMenuToggle,
          show = _this$props2.show;

      if (show !== prevProps.show) {
        show ? onMenuShow() : onMenuHide();
        onMenuToggle(show);
      } // Remove scoping classes if menu isn't being appended to document body.


      var className = prevProps.className,
          container = prevProps.container;

      if (isBody(container) && !isBody(this.props.container)) {
        var _container$classList2;

        container.classList.remove(BODY_CLASS);
        !!className && (_container$classList2 = container.classList).remove.apply(_container$classList2, _toConsumableArray(className.split(' ')));
      }

      this._update();
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props3 = this.props,
          align = _this$props3.align,
          children = _this$props3.children,
          container = _this$props3.container,
          dropup = _this$props3.dropup,
          referenceElement = _this$props3.referenceElement,
          show = _this$props3.show;

      if (!(show && _react.Children.count(children))) {
        return null;
      }

      var child = _react.Children.only(children);

      var xPlacement = align === 'right' ? 'end' : 'start';
      var yPlacement = dropup ? 'top' : 'bottom';
      return _react["default"].createElement(_Portal["default"], {
        container: container
      }, _react["default"].createElement(_Popper["default"], {
        modifiers: getModifiers(this.props),
        placement: "".concat(yPlacement, "-").concat(xPlacement),
        referenceElement: referenceElement
      }, function (_ref2) {
        var ref = _ref2.ref,
            props = _objectWithoutProperties(_ref2, ["ref"]);

        return (0, _react.cloneElement)(child, _objectSpread({}, child.props, {}, props, {
          innerRef: ref,
          inputHeight: referenceElement ? referenceElement.offsetHeight : 0
        }));
      }));
    }
  }]);

  return Overlay;
}(_react["default"].Component);

Overlay.propTypes = {
  children: _propTypes["default"].element,
  container: _componentOrElement["default"].isRequired,
  onMenuHide: _propTypes["default"].func,
  onMenuShow: _propTypes["default"].func,
  onMenuToggle: _propTypes["default"].func,
  referenceElement: _componentOrElement["default"],
  show: _propTypes["default"].bool
};
Overlay.defaultProps = {
  onMenuHide: _noop["default"],
  onMenuShow: _noop["default"],
  onMenuToggle: _noop["default"],
  show: false
};
var _default = Overlay;
exports["default"] = _default;