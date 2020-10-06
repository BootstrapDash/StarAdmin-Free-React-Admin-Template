"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _PopoverStore = require("./PopoverStore");

class PopoverWrapper extends _react.default.PureComponent {
  hidePopovers() {
    _PopoverStore.popoverStore.hide();
  }

  render() {
    return _react.default.createElement("div", (0, _extends2.default)({
      onClick: this.hidePopovers,
      onTouchEnd: this.hidePopovers
    }, this.props), this.props.children);
  }

}

exports.default = PopoverWrapper;
(0, _defineProperty2.default)(PopoverWrapper, "propTypes", {
  children: _propTypes.default.node
});
(0, _defineProperty2.default)(PopoverWrapper, "defaultProps", {
  children: []
});