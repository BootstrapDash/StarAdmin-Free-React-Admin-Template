"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _reactPopper = require("react-popper");

var _DropdownContext = require("./DropdownContext");

var _utils = require("./utils");

var _Button = _interopRequireDefault(require("./Button"));

var propTypes = {
  caret: _propTypes.default.bool,
  color: _propTypes.default.string,
  children: _propTypes.default.node,
  className: _propTypes.default.string,
  cssModule: _propTypes.default.object,
  disabled: _propTypes.default.bool,
  onClick: _propTypes.default.func,
  'aria-haspopup': _propTypes.default.bool,
  split: _propTypes.default.bool,
  tag: _utils.tagPropType,
  nav: _propTypes.default.bool
};
var defaultProps = {
  'aria-haspopup': true,
  color: 'secondary'
};

var DropdownToggle =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(DropdownToggle, _React$Component);

  function DropdownToggle(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;
    _this.onClick = _this.onClick.bind((0, _assertThisInitialized2.default)(_this));
    return _this;
  }

  var _proto = DropdownToggle.prototype;

  _proto.onClick = function onClick(e) {
    if (this.props.disabled || this.context.disabled) {
      e.preventDefault();
      return;
    }

    if (this.props.nav && !this.props.tag) {
      e.preventDefault();
    }

    if (this.props.onClick) {
      this.props.onClick(e);
    }

    this.context.toggle(e);
  };

  _proto.render = function render() {
    var _this2 = this;

    var _this$props = this.props,
        className = _this$props.className,
        color = _this$props.color,
        cssModule = _this$props.cssModule,
        caret = _this$props.caret,
        split = _this$props.split,
        nav = _this$props.nav,
        tag = _this$props.tag,
        innerRef = _this$props.innerRef,
        props = (0, _objectWithoutPropertiesLoose2.default)(_this$props, ["className", "color", "cssModule", "caret", "split", "nav", "tag", "innerRef"]);
    var ariaLabel = props['aria-label'] || 'Toggle Dropdown';
    var classes = (0, _utils.mapToCssModules)((0, _classnames.default)(className, {
      'dropdown-toggle': caret || split,
      'dropdown-toggle-split': split,
      'nav-link': nav
    }), cssModule);

    var children = props.children || _react.default.createElement("span", {
      className: "sr-only"
    }, ariaLabel);

    var Tag;

    if (nav && !tag) {
      Tag = 'a';
      props.href = '#';
    } else if (!tag) {
      Tag = _Button.default;
      props.color = color;
      props.cssModule = cssModule;
    } else {
      Tag = tag;
    }

    if (this.context.inNavbar) {
      return _react.default.createElement(Tag, (0, _extends2.default)({}, props, {
        className: classes,
        onClick: this.onClick,
        "aria-expanded": this.context.isOpen,
        children: children
      }));
    }

    return _react.default.createElement(_reactPopper.Reference, {
      innerRef: innerRef
    }, function (_ref) {
      var _ref2;

      var ref = _ref.ref;
      return _react.default.createElement(Tag, (0, _extends2.default)({}, props, (_ref2 = {}, _ref2[typeof Tag === 'string' ? 'ref' : 'innerRef'] = ref, _ref2), {
        className: classes,
        onClick: _this2.onClick,
        "aria-expanded": _this2.context.isOpen,
        children: children
      }));
    });
  };

  return DropdownToggle;
}(_react.default.Component);

DropdownToggle.propTypes = propTypes;
DropdownToggle.defaultProps = defaultProps;
DropdownToggle.contextType = _DropdownContext.DropdownContext;
var _default = DropdownToggle;
exports.default = _default;