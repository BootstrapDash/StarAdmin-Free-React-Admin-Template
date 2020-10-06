'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Pager = require('./Pager');

var _Pager2 = _interopRequireDefault(_Pager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ViewPager = function (_Component) {
  _inherits(ViewPager, _Component);

  function ViewPager(props) {
    _classCallCheck(this, ViewPager);

    var _this = _possibleConstructorReturn(this, (ViewPager.__proto__ || Object.getPrototypeOf(ViewPager)).call(this, props));

    var pager = new _Pager2.default();
    var forceUpdate = function forceUpdate() {
      return _this.forceUpdate();
    };

    // re-render the whole tree to update components on certain events
    pager.on('viewChange', forceUpdate);
    pager.on('hydrated', forceUpdate);

    _this._pager = pager;
    return _this;
  }

  _createClass(ViewPager, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        pager: this._pager
      };
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      // run a hydration on the next animation frame to obtain proper targets and positioning
      requestAnimationFrame(function () {
        _this2._pager.hydrate();
      });
    }
  }, {
    key: 'getInstance',
    value: function getInstance() {
      return this._pager;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          tag = _props.tag,
          restProps = _objectWithoutProperties(_props, ['tag']);

      return (0, _react.createElement)(tag, restProps);
    }
  }]);

  return ViewPager;
}(_react.Component);

ViewPager.childContextTypes = {
  pager: _propTypes2.default.instanceOf(_Pager2.default)
};
ViewPager.propTypes = {
  tag: _propTypes2.default.string
};
ViewPager.defaultProps = {
  tag: 'div'
};
exports.default = ViewPager;
module.exports = exports['default'];