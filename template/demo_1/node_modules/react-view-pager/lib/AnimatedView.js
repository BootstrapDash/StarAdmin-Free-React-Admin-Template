'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _animationBus = require('animation-bus');

var _animationBus2 = _interopRequireDefault(_animationBus);

var _Pager = require('./Pager');

var _Pager2 = _interopRequireDefault(_Pager);

var _specialAssign = require('./special-assign');

var _specialAssign2 = _interopRequireDefault(_specialAssign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var checkedProps = {
  tag: _propTypes2.default.string,
  index: _propTypes2.default.number,
  animations: _propTypes2.default.array
};

var AnimatedView = function (_Component) {
  _inherits(AnimatedView, _Component);

  function AnimatedView() {
    _classCallCheck(this, AnimatedView);

    return _possibleConstructorReturn(this, (AnimatedView.__proto__ || Object.getPrototypeOf(AnimatedView)).apply(this, arguments));
  }

  _createClass(AnimatedView, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var animations = this.props.animations;


      if (animations.length) {
        this._animationBus = new _animationBus2.default({
          animations: animations,
          origin: function origin(view) {
            return view.origin;
          }
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          tag = _props.tag,
          index = _props.index,
          restProps = _objectWithoutProperties(_props, ['tag', 'index']);

      var style = _extends({}, restProps.style);

      if (this._animationBus) {
        var view = this.context.view || this.context.pager.getView(index);
        if (view) {
          style = _extends({}, restProps.style, this._animationBus.getStyles(view));
        }
      }

      return (0, _react.createElement)(tag, (0, _specialAssign2.default)({ style: style }, this.props, checkedProps));
    }
  }]);

  return AnimatedView;
}(_react.Component);

AnimatedView.contextTypes = {
  pager: _propTypes2.default.instanceOf(_Pager2.default),
  view: _propTypes2.default.any
};
AnimatedView.propTypes = checkedProps;
AnimatedView.defaultProps = {
  tag: 'div',
  animations: []
};
exports.default = AnimatedView;
module.exports = exports['default'];