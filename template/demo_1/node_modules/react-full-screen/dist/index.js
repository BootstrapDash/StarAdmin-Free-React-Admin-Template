"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _fscreen = require("fscreen");

var _fscreen2 = _interopRequireDefault(_fscreen);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FullScreen = function (_Component) {
  _inherits(FullScreen, _Component);

  function FullScreen(props) {
    _classCallCheck(this, FullScreen);

    var _this = _possibleConstructorReturn(this, (FullScreen.__proto__ || Object.getPrototypeOf(FullScreen)).call(this, props));

    _this.detectFullScreen = _this.detectFullScreen.bind(_this);
    return _this;
  }

  _createClass(FullScreen, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      _fscreen2.default.addEventListener("fullscreenchange", this.detectFullScreen);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      _fscreen2.default.removeEventListener("fullscreenchange", this.detectFullScreen);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.handleProps(this.props);
    }
  }, {
    key: "handleProps",
    value: function handleProps(props) {
      var enabled = _fscreen2.default.fullscreenElement === this.node;
      if (enabled && !props.enabled) {
        this.leaveFullScreen();
      } else if (!enabled && props.enabled) {
        this.enterFullScreen();
      }
    }
  }, {
    key: "detectFullScreen",
    value: function detectFullScreen() {
      if (this.props.onChange) {
        this.props.onChange(_fscreen2.default.fullscreenElement === this.node);
      }
    }
  }, {
    key: "enterFullScreen",
    value: function enterFullScreen() {
      if (_fscreen2.default.fullscreenEnabled) {
        _fscreen2.default.requestFullscreen(this.node);
      }
    }
  }, {
    key: "leaveFullScreen",
    value: function leaveFullScreen() {
      if (_fscreen2.default.fullscreenEnabled) {
        _fscreen2.default.exitFullscreen();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var className = ["fullscreen"];
      if (this.props.enabled) {
        className.push("fullscreen-enabled");
      }

      return _react2.default.createElement(
        "div",
        {
          className: className.join(" "),
          ref: function ref(node) {
            return _this2.node = node;
          },
          style: this.props.enabled ? { height: "100%", width: "100%" } : undefined
        },
        this.props.children
      );
    }
  }]);

  return FullScreen;
}(_react.Component);

FullScreen.propTypes = {
  children: _propTypes2.default.node.isRequired,
  enabled: _propTypes2.default.bool.isRequired,
  onChange: _propTypes2.default.func
};
FullScreen.defaultProps = {
  enabled: false
};
exports.default = FullScreen;