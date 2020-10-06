"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Stripped-down version of https://github.com/helior/react-highlighter
 *
 * Results are already filtered by the time the component is used internally so
 * we can safely ignore case and diacritical marks for the purposes of matching.
 */
var Highlighter =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Highlighter, _React$Component);

  function Highlighter() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Highlighter);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Highlighter)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "_count", 0);

    return _this;
  }

  _createClass(Highlighter, [{
    key: "render",
    value: function render() {
      var children = this.props.search ? this._renderHighlightedChildren() : this.props.children;
      return _react["default"].createElement("span", null, children);
    }
  }, {
    key: "_renderHighlightedChildren",
    value: function _renderHighlightedChildren() {
      var children = [];
      var remaining = this.props.children;

      while (remaining) {
        var bounds = (0, _utils.getMatchBounds)(remaining, this.props.search);

        if (!bounds) {
          this._count += 1;
          children.push(_react["default"].createElement("span", {
            key: this._count
          }, remaining));
          return children;
        } // Capture the string that leads up to a match...


        var nonMatch = remaining.slice(0, bounds.start);

        if (nonMatch) {
          this._count += 1;
          children.push(_react["default"].createElement("span", {
            key: this._count
          }, nonMatch));
        } // Now, capture the matching string...


        var match = remaining.slice(bounds.start, bounds.end);

        if (match) {
          this._count += 1;
          children.push(_react["default"].createElement("mark", {
            className: "rbt-highlight-text",
            key: this._count
          }, match));
        } // And if there's anything left over, continue the loop.


        remaining = remaining.slice(bounds.end);
      }

      return children;
    }
  }]);

  return Highlighter;
}(_react["default"].Component);

Highlighter.propTypes = {
  children: _propTypes["default"].string.isRequired,
  search: _propTypes["default"].string.isRequired
};
var _default = Highlighter;
exports["default"] = _default;