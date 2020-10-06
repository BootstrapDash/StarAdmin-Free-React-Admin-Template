"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var constants = _interopRequireWildcard(require("focus-lock/constants"));

var _util = require("./util");

var _medium = require("./medium");

function MoveFocusInside(_ref) {
  var isDisabled = _ref.disabled,
      className = _ref.className,
      children = _ref.children;
  var ref = React.useRef(null);
  var disabled = React.useRef(isDisabled);

  var moveFocus = function moveFocus() {
    var observed = ref.current;

    _medium.mediumEffect.useMedium(function (car) {
      if (!disabled.current && observed) {
        if (!car.focusInside(observed)) {
          car.moveFocusInside(observed, null);
        }
      }
    });
  };

  React.useEffect(function () {
    disabled.current = isDisabled;
    moveFocus();
  }, [isDisabled]);
  return React.createElement("div", (0, _extends2.default)({}, (0, _util.inlineProp)(constants.FOCUS_AUTO, !isDisabled), {
    ref: ref,
    className: className
  }), children);
}

MoveFocusInside.propTypes = process.env.NODE_ENV !== "production" ? {
  children: _propTypes.default.node.isRequired,
  disabled: _propTypes.default.bool,
  className: _propTypes.default.string
} : {};
MoveFocusInside.defaultProps = {
  disabled: false,
  className: undefined
};
var _default = MoveFocusInside;
exports.default = _default;