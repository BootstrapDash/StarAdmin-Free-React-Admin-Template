"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classnames = _interopRequireDefault(require("classnames"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

/**
 * ClearButton
 *
 * http://getbootstrap.com/css/#helper-classes-close
 */
var ClearButton = function ClearButton(_ref) {
  var bsSize = _ref.bsSize,
      className = _ref.className,
      label = _ref.label,
      _onClick = _ref.onClick,
      props = _objectWithoutProperties(_ref, ["bsSize", "className", "label", "onClick"]);

  return _react["default"].createElement("button", _extends({}, props, {
    "aria-label": label,
    className: (0, _classnames["default"])('close', 'rbt-close', {
      'rbt-close-lg': bsSize === 'large' || bsSize === 'lg'
    }, className),
    onClick: function onClick(e) {
      e.stopPropagation();

      _onClick(e);
    },
    type: "button"
  }), _react["default"].createElement("span", {
    "aria-hidden": "true"
  }, "\xD7"), _react["default"].createElement("span", {
    className: "sr-only"
  }, label));
};

ClearButton.propTypes = {
  bsSize: _propTypes["default"].oneOf(['large', 'lg', 'small', 'sm']),
  label: _propTypes["default"].string,
  onClick: _propTypes["default"].func.isRequired
};
ClearButton.defaultProps = {
  label: 'Clear'
};
var _default = ClearButton;
exports["default"] = _default;