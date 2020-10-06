"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _utils = require("./utils");

var propTypes = {
  tag: _utils.tagPropType,
  icon: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.node]),
  wrapTag: _utils.tagPropType,
  toggle: _propTypes.default.func,
  className: _propTypes.default.string,
  cssModule: _propTypes.default.object,
  children: _propTypes.default.node,
  closeAriaLabel: _propTypes.default.string,
  charCode: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),
  close: _propTypes.default.object
};
var defaultProps = {
  tag: 'strong',
  wrapTag: 'div',
  tagClassName: 'mr-auto',
  closeAriaLabel: 'Close',
  charCode: 215
};

var ToastHeader = function ToastHeader(props) {
  var closeButton;
  var icon;
  var className = props.className,
      cssModule = props.cssModule,
      children = props.children,
      toggle = props.toggle,
      Tag = props.tag,
      WrapTag = props.wrapTag,
      closeAriaLabel = props.closeAriaLabel,
      charCode = props.charCode,
      close = props.close,
      tagClassName = props.tagClassName,
      iconProp = props.icon,
      attributes = (0, _objectWithoutPropertiesLoose2.default)(props, ["className", "cssModule", "children", "toggle", "tag", "wrapTag", "closeAriaLabel", "charCode", "close", "tagClassName", "icon"]);
  var classes = (0, _utils.mapToCssModules)((0, _classnames.default)(className, 'toast-header'), cssModule);

  if (!close && toggle) {
    var closeIcon = typeof charCode === 'number' ? String.fromCharCode(charCode) : charCode;
    closeButton = _react.default.createElement("button", {
      type: "button",
      onClick: toggle,
      className: (0, _utils.mapToCssModules)('close', cssModule),
      "aria-label": closeAriaLabel
    }, _react.default.createElement("span", {
      "aria-hidden": "true"
    }, closeIcon));
  }

  if (typeof iconProp === "string") {
    icon = _react.default.createElement("svg", {
      className: (0, _utils.mapToCssModules)("rounded text-" + iconProp),
      width: "20",
      height: "20",
      xmlns: "http://www.w3.org/2000/svg",
      preserveAspectRatio: "xMidYMid slice",
      focusable: "false",
      role: "img"
    }, _react.default.createElement("rect", {
      fill: "currentColor",
      width: "100%",
      height: "100%"
    }));
  } else if (iconProp) {
    icon = iconProp;
  }

  return _react.default.createElement(WrapTag, (0, _extends2.default)({}, attributes, {
    className: classes
  }), icon, _react.default.createElement(Tag, {
    className: (0, _utils.mapToCssModules)((0, _classnames.default)(tagClassName, {
      "ml-2": icon != null
    }), cssModule)
  }, children), close || closeButton);
};

ToastHeader.propTypes = propTypes;
ToastHeader.defaultProps = defaultProps;
var _default = ToastHeader;
exports.default = _default;