'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = withTouchListeners;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _exenv = require('exenv');

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function withTouchListeners(WrappedComponent) {
  return function (_PureComponent) {
    _inherits(TouchProvider, _PureComponent);

    function TouchProvider() {
      var _ref;

      var _temp, _this, _ret;

      _classCallCheck(this, TouchProvider);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = TouchProvider.__proto__ || Object.getPrototypeOf(TouchProvider)).call.apply(_ref, [this].concat(args))), _this), _this.listenerOptions = {
        capture: false,
        passive: false
      }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(TouchProvider, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        if (!_exenv.canUseDOM) return;

        var touchScrollTarget = this.props.touchScrollTarget;

        var target = document.body;

        // account for touch devices
        if (target && (0, _utils.isTouchDevice)()) {
          // Mobile Safari ignores { overflow: hidden } declaration on the body.
          target.addEventListener('touchmove', _utils.preventTouchMove, this.listenerOptions);

          // Allow scroll on provided target
          if (touchScrollTarget) {
            touchScrollTarget.addEventListener('touchstart', _utils.preventInertiaScroll, this.listenerOptions);
            touchScrollTarget.addEventListener('touchmove', _utils.allowTouchMove, this.listenerOptions);
          }
        }
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        if (!_exenv.canUseDOM) return;

        var touchScrollTarget = this.props.touchScrollTarget;

        var target = document.body;

        // remove touch listeners
        if (target && (0, _utils.isTouchDevice)()) {
          target.removeEventListener('touchmove', _utils.preventTouchMove, this.listenerOptions);

          if (touchScrollTarget) {
            touchScrollTarget.removeEventListener('touchstart', _utils.preventInertiaScroll, this.listenerOptions);
            touchScrollTarget.removeEventListener('touchmove', _utils.allowTouchMove, this.listenerOptions);
          }
        }
      }
    }, {
      key: 'render',
      value: function render() {
        return _react2.default.createElement(WrappedComponent, this.props);
      }
    }]);

    return TouchProvider;
  }(_react.PureComponent);
}