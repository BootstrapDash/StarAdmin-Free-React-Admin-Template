"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OptionsReader = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var OptionsReader =
/*#__PURE__*/
function () {
  function OptionsReader(incoming, context) {
    var _this = this;

    _classCallCheck(this, OptionsReader);

    this.enableTouchEvents = true;
    this.enableMouseEvents = false;
    this.enableKeyboardEvents = false;
    this.ignoreContextMenu = false;
    this.enableHoverOutsideTarget = false;
    this.touchSlop = 0;
    this.scrollAngleRanges = undefined;
    this.context = context;
    this.delayTouchStart = incoming.delayTouchStart || incoming.delay || 0;
    this.delayMouseStart = incoming.delayMouseStart || incoming.delay || 0;
    Object.keys(incoming).forEach(function (key) {
      if (incoming[key] != null) {
        ;
        _this[key] = incoming[key];
      }
    });
  }

  _createClass(OptionsReader, [{
    key: "window",
    get: function get() {
      if (this.context && this.context.window) {
        return this.context.window;
      } else if (typeof window !== 'undefined') {
        return window;
      }

      return undefined;
    }
  }, {
    key: "document",
    get: function get() {
      if (this.window) {
        return this.window.document;
      }

      return undefined;
    }
  }]);

  return OptionsReader;
}();

exports.OptionsReader = OptionsReader;