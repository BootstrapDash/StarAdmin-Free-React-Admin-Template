"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _objectSpread5 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _classnames = _interopRequireDefault(require("classnames"));

var _reactPopper = require("react-popper");

var _utils = require("./utils");

var _Fade = _interopRequireDefault(require("./Fade"));

function noop() {}

var propTypes = {
  children: _propTypes.default.node.isRequired,
  popperClassName: _propTypes.default.string,
  placement: _propTypes.default.string,
  placementPrefix: _propTypes.default.string,
  arrowClassName: _propTypes.default.string,
  hideArrow: _propTypes.default.bool,
  tag: _utils.tagPropType,
  isOpen: _propTypes.default.bool.isRequired,
  cssModule: _propTypes.default.object,
  offset: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),
  fallbackPlacement: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.array]),
  flip: _propTypes.default.bool,
  container: _utils.targetPropType,
  target: _utils.targetPropType.isRequired,
  modifiers: _propTypes.default.object,
  boundariesElement: _propTypes.default.oneOfType([_propTypes.default.string, _utils.DOMElement]),
  onClosed: _propTypes.default.func,
  fade: _propTypes.default.bool,
  transition: _propTypes.default.shape(_Fade.default.propTypes)
};
var defaultProps = {
  boundariesElement: 'scrollParent',
  placement: 'auto',
  hideArrow: false,
  isOpen: false,
  offset: 0,
  fallbackPlacement: 'flip',
  flip: true,
  container: 'body',
  modifiers: {},
  onClosed: noop,
  fade: true,
  transition: (0, _objectSpread5.default)({}, _Fade.default.defaultProps)
};

var PopperContent =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(PopperContent, _React$Component);

  function PopperContent(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;
    _this.setTargetNode = _this.setTargetNode.bind((0, _assertThisInitialized2.default)(_this));
    _this.getTargetNode = _this.getTargetNode.bind((0, _assertThisInitialized2.default)(_this));
    _this.getRef = _this.getRef.bind((0, _assertThisInitialized2.default)(_this));
    _this.onClosed = _this.onClosed.bind((0, _assertThisInitialized2.default)(_this));
    _this.state = {
      isOpen: props.isOpen
    };
    return _this;
  }

  PopperContent.getDerivedStateFromProps = function getDerivedStateFromProps(props, state) {
    if (props.isOpen && !state.isOpen) {
      return {
        isOpen: props.isOpen
      };
    } else return null;
  };

  var _proto = PopperContent.prototype;

  _proto.componentDidUpdate = function componentDidUpdate() {
    if (this._element && this._element.childNodes && this._element.childNodes[0] && this._element.childNodes[0].focus) {
      this._element.childNodes[0].focus();
    }
  };

  _proto.setTargetNode = function setTargetNode(node) {
    this.targetNode = typeof node === 'string' ? (0, _utils.getTarget)(node) : node;
  };

  _proto.getTargetNode = function getTargetNode() {
    return this.targetNode;
  };

  _proto.getContainerNode = function getContainerNode() {
    return (0, _utils.getTarget)(this.props.container);
  };

  _proto.getRef = function getRef(ref) {
    this._element = ref;
  };

  _proto.onClosed = function onClosed() {
    this.props.onClosed();
    this.setState({
      isOpen: false
    });
  };

  _proto.renderChildren = function renderChildren() {
    var _this$props = this.props,
        cssModule = _this$props.cssModule,
        children = _this$props.children,
        isOpen = _this$props.isOpen,
        flip = _this$props.flip,
        target = _this$props.target,
        offset = _this$props.offset,
        fallbackPlacement = _this$props.fallbackPlacement,
        placementPrefix = _this$props.placementPrefix,
        _arrowClassName = _this$props.arrowClassName,
        hideArrow = _this$props.hideArrow,
        _popperClassName = _this$props.popperClassName,
        tag = _this$props.tag,
        container = _this$props.container,
        modifiers = _this$props.modifiers,
        boundariesElement = _this$props.boundariesElement,
        onClosed = _this$props.onClosed,
        fade = _this$props.fade,
        transition = _this$props.transition,
        placement = _this$props.placement,
        attrs = (0, _objectWithoutPropertiesLoose2.default)(_this$props, ["cssModule", "children", "isOpen", "flip", "target", "offset", "fallbackPlacement", "placementPrefix", "arrowClassName", "hideArrow", "popperClassName", "tag", "container", "modifiers", "boundariesElement", "onClosed", "fade", "transition", "placement"]);
    var arrowClassName = (0, _utils.mapToCssModules)((0, _classnames.default)('arrow', _arrowClassName), cssModule);
    var popperClassName = (0, _utils.mapToCssModules)((0, _classnames.default)(_popperClassName, placementPrefix ? placementPrefix + "-auto" : ''), this.props.cssModule);
    var extendedModifiers = (0, _objectSpread5.default)({
      offset: {
        offset: offset
      },
      flip: {
        enabled: flip,
        behavior: fallbackPlacement
      },
      preventOverflow: {
        boundariesElement: boundariesElement
      }
    }, modifiers);
    var popperTransition = (0, _objectSpread5.default)({}, _Fade.default.defaultProps, {}, transition, {
      baseClass: fade ? transition.baseClass : '',
      timeout: fade ? transition.timeout : 0
    });
    return _react.default.createElement(_Fade.default, (0, _extends2.default)({}, popperTransition, attrs, {
      in: isOpen,
      onExited: this.onClosed,
      tag: tag
    }), _react.default.createElement(_reactPopper.Popper, {
      referenceElement: this.targetNode,
      modifiers: extendedModifiers,
      placement: placement
    }, function (_ref) {
      var ref = _ref.ref,
          style = _ref.style,
          placement = _ref.placement,
          arrowProps = _ref.arrowProps;
      return _react.default.createElement("div", {
        ref: ref,
        style: style,
        className: popperClassName,
        "x-placement": placement
      }, children, !hideArrow && _react.default.createElement("span", {
        ref: arrowProps.ref,
        className: arrowClassName,
        style: arrowProps.style
      }));
    }));
  };

  _proto.render = function render() {
    this.setTargetNode(this.props.target);

    if (this.state.isOpen) {
      return this.props.container === 'inline' ? this.renderChildren() : _reactDom.default.createPortal(_react.default.createElement("div", {
        ref: this.getRef
      }, this.renderChildren()), this.getContainerNode());
    }

    return null;
  };

  return PopperContent;
}(_react.default.Component);

PopperContent.propTypes = propTypes;
PopperContent.defaultProps = defaultProps;
var _default = PopperContent;
exports.default = _default;