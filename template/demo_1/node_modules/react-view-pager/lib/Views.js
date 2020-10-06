'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _View = require('./View');

var _View2 = _interopRequireDefault(_View);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Views = function () {
  function Views(axis, viewsToShow, infinite) {
    _classCallCheck(this, Views);

    this.size = 0;
    this.axis = axis;
    this.viewsToShow = viewsToShow;
    this.infinite = infinite;
    this.collection = [];
  }

  _createClass(Views, [{
    key: 'setFrame',
    value: function setFrame(frame) {
      this.frame = frame;
    }
  }, {
    key: 'setTrack',
    value: function setTrack(track) {
      this.track = track;
    }
  }, {
    key: 'addView',
    value: function addView(options) {
      var lastView = this.collection[options.index - 1];
      var view = new _View2.default(_extends({
        axis: this.axis,
        track: this.track
      }, options));

      // add view to collection
      this.collection.push(view);

      // calculate the size of the slider as views are added
      this.size += view.getSize();

      // hydrate positions every time a new view is added
      this.setPositions();
    }
  }, {
    key: 'removeView',
    value: function removeView(node) {
      // subtract this view from full size
      this.size -= view.getSize();
    }
  }, {
    key: 'setPositions',
    value: function setPositions() {
      var _this = this;

      // bail if frame or track haven't been set yet
      if (!this.frame && !this.track) return;

      var frameSize = this.frame.getSize();
      var trackSize = this.getTotalSize();
      var trackPosition = this.track.getPosition();
      var startCoords = { top: 0, left: 0 };

      this.collection.reduce(function (lastView, view) {
        var lastPosition = lastView && lastView.getCoords().original || 0;
        var nextPosition = lastPosition + view.getSize() / (_this.viewsToShow || 1);
        var offsetPosition = lastPosition;

        // offset slides in the proper position when wrapping
        if (_this.infinite) {
          if (nextPosition < Math.abs(trackPosition)) {
            offsetPosition += trackSize;
          } else if (lastPosition > frameSize - trackPosition) {
            offsetPosition -= trackSize;
          }
        }

        view.setCoords({
          original: nextPosition,
          offset: {
            pixel: offsetPosition,
            percent: _this.getPercentValue(offsetPosition)
          }
        });

        return view;
      }, null);
    }
  }, {
    key: 'getTotalSize',
    value: function getTotalSize() {
      var _this2 = this;

      if (this.viewsToShow) {
        return this.frame.getSize() / this.viewsToShow * this.collection.length;
      } else {
        var _ret = function () {
          var dimension = _this2.axis === 'x' ? 'width' : 'height';
          var size = 0;

          _this2.collection.forEach(function (view) {
            size += view[dimension];
          });

          return {
            v: size
          };
        }();

        if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
      }
    }
  }, {
    key: 'getStartCoords',
    value: function getStartCoords(index) {
      var _this3 = this;

      var target = 0;
      this.collection.slice(0, index).forEach(function (view) {
        target -= view.getSize() / (_this3.viewsToShow || 1);
      });
      return target;
    }
  }, {
    key: 'getPercentValue',
    value: function getPercentValue(position) {
      return Math.round(position / this.frame.getSize() * 10000) * 0.01;
    }
  }]);

  return Views;
}();

exports.default = Views;
module.exports = exports['default'];