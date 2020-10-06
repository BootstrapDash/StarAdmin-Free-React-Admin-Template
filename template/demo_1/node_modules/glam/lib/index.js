'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = glam;
exports.hydrate = hydrate;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _Glam = require('./Glam');

var _Glam2 = _interopRequireDefault(_Glam);

var _parse = require('./parse');

var _parse2 = _interopRequireDefault(_parse);

var _generate = require('./generate');

var _generate2 = _interopRequireDefault(_generate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var isBrowser = typeof window !== 'undefined';

var isHydrating = false;

var nullClass = (0, _parse2.default)({}).className;

// @theme
var Styled = function (_React$Component) {
  _inherits(Styled, _React$Component);

  function Styled() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Styled);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Styled.__proto__ || Object.getPrototypeOf(Styled)).call.apply(_ref, [this].concat(args))), _this), _this.glam = _this.context.glam || new _Glam2.default(isBrowser ? { document: document } : undefined), _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Styled, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        glam: this.glam
      };
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.flush) {
        this.flush();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var css = this.props.css;

      // check parse cache
      // else

      var ast = (0, _parse2.default)(css);

      var cls = ast.className === nullClass ? '' : ast.className;

      var element = this.props.render(cls);

      if (!isBrowser || isBrowser && isHydrating) {
        if (this.glam.isTagged(ast.className)) {
          return element;
        }
        this.glam.tag(ast.className);

        this.flush = function () {
          return _this2.glam.insert(ast);
        }; // you already have this content via `$([data-glam='${cls}'])`
        var generated = (0, _generate2.default)(ast).join('');

        return generated ? _react.Children.toArray([_react2.default.createElement('style', { dangerouslySetInnerHTML: { __html: generated } }), element]) : element;
      }
      this.glam.insert(ast);
      return element;
    }
  }]);

  return Styled;
}(_react2.default.Component);

Styled.displayName = 'css';
Styled.contextTypes = {
  glam: _propTypes2.default.object
};
Styled.childContextTypes = {
  glam: _propTypes2.default.object
};
function glam(Type, props) {
  for (var _len2 = arguments.length, children = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
    children[_key2 - 2] = arguments[_key2];
  }

  var _ref2 = props || {},
      css = _ref2.css,
      className = _ref2.className,
      rest = _objectWithoutProperties(_ref2, ['css', 'className']);
  // clean css ?


  if (css) {
    return _react2.default.createElement(Styled, {
      css: css,
      render: function render(cls) {
        var applyClass = className ? cls ? className + ' ' + cls : className : cls;
        return _react.createElement.apply(undefined, [Type, applyClass ? _extends({}, rest, { className: applyClass }) : rest].concat(children));
      }
    });
  } else {
    return _react.createElement.apply(undefined, [Type, props].concat(children));
  }
}

function hydrate(element, dom, callback) {
  isHydrating = true;
  (0, _reactDom.hydrate)(element, dom, function () {
    isHydrating = false;
    callback && callback();
  });
}