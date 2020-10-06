'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PagerElement = function () {
  function PagerElement(_ref) {
    var node = _ref.node,
        pager = _ref.pager,
        width = _ref.width,
        height = _ref.height;

    _classCallCheck(this, PagerElement);

    this.node = node;
    this.pager = pager;
    this.x = this.y = 0;
    this.setSize(width, height);
  }

  _createClass(PagerElement, [{
    key: 'setSize',
    value: function setSize(width, height) {
      this.width = width || this.node.offsetWidth;
      this.height = height || this.node.offsetHeight;
    }
  }, {
    key: 'setPosition',
    value: function setPosition(position) {
      this[this.pager.options.axis] = position;
    }
  }, {
    key: 'getSize',
    value: function getSize(dimension) {
      if (dimension === 'width' || dimension === 'height') {
        return this[dimension];
      } else {
        var axis = this.pager.options.axis;
        return this[axis === 'x' ? 'width' : 'height'];
      }
    }
  }, {
    key: 'getPosition',
    value: function getPosition() {
      return this[this.pager.options.axis];
    }
  }]);

  return PagerElement;
}();

exports.default = PagerElement;
module.exports = exports['default'];