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

var _reactDom = require('react-dom');

var _Pager = require('./Pager');

var _Pager2 = _interopRequireDefault(_Pager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var View = function (_Component) {
  _inherits(View, _Component);

  function View() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, View);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = View.__proto__ || Object.getPrototypeOf(View)).call.apply(_ref, [this].concat(args))), _this), _this._viewAdded = false, _this._viewInstance = null, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(View, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        view: this._viewInstance
      };
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._viewInstance = this.context.pager.addView((0, _reactDom.findDOMNode)(this));
      this._viewAdded = true;
      this.forceUpdate();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.context.pager.removeView(this._viewInstance);
    }
  }, {
    key: 'render',
    value: function render() {
      var pager = this.context.pager;
      var _pager$options = pager.options,
          viewsToShow = _pager$options.viewsToShow,
          axis = _pager$options.axis;

      var _props = this.props,
          tag = _props.tag,
          trackSize = _props.trackSize,
          restProps = _objectWithoutProperties(_props, ['tag', 'trackSize']);

      var style = _extends({}, restProps.style);

      // hide view visually until it has been added to the pager
      // this should help avoid FOUC
      if (!this._viewAdded) {
        style.visibility = 'hidden';
        style.pointerEvents = 'none';
      }

      if (this._viewInstance) {
        style = _extends({}, style, this._viewInstance.getStyles());
      }

      return (0, _react.createElement)(tag, _extends({}, restProps, { style: style }));
    }
  }]);

  return View;
}(_react.Component);

View.contextTypes = {
  pager: _propTypes2.default.instanceOf(_Pager2.default)
};
View.childContextTypes = {
  view: _propTypes2.default.any
};
View.propTypes = {
  tag: _propTypes2.default.any
};
View.defaultProps = {
  tag: 'div'
};
exports.default = View;
module.exports = exports['default'];