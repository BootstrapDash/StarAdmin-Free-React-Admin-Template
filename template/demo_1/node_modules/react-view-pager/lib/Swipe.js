'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function getTouchEvent(e) {
  return e.touches && e.touches[0] || e;
}

var Swipe = function () {
  function Swipe(pager) {
    var _this = this;

    _classCallCheck(this, Swipe);

    this._onSwipeStart = function (e) {
      var _getTouchEvent = getTouchEvent(e),
          pageX = _getTouchEvent.pageX,
          pageY = _getTouchEvent.pageY;

      // we're now swiping


      _this.pager.isSwiping = true;

      // store the initial starting coordinates
      _this._swipeStart = {
        x: pageX,
        y: pageY

        // reset swipeDiff
      };_this._swipeDiff = {
        x: 0,
        y: 0

        // determine if a flick or not
      };_this._isFlick = true;

      setTimeout(function () {
        _this._isFlick = false;
      }, _this.pager.options.flickTimeout);

      _this.pager.emit('swipeStart');
    };

    this._onSwipeMove = function (e) {
      // bail if we aren't swiping
      if (!_this.pager.isSwiping) return;

      var _pager$options = _this.pager.options,
          swipeThreshold = _pager$options.swipeThreshold,
          axis = _pager$options.axis;

      var _getTouchEvent2 = getTouchEvent(e),
          pageX = _getTouchEvent2.pageX,
          pageY = _getTouchEvent2.pageY;

      // grab the current position of the track before


      if (!_this._trackStart) {
        _this._trackStart = _this.pager.currentTween;
      }

      // determine how much we have moved
      _this._swipeDiff = {
        x: _this._swipeStart.x - pageX,
        y: _this._swipeStart.y - pageY
      };

      if (_this._isSwipe(swipeThreshold)) {
        e.preventDefault();
        e.stopPropagation();

        var swipeDiff = _this._swipeDiff[axis];
        var trackPosition = _this._trackStart - swipeDiff;

        _this.pager.setPositionValue(trackPosition);

        _this.pager.emit('swipeMove');
      }
    };

    this._onSwipeEnd = function () {
      var _pager$options2 = _this.pager.options,
          swipeThreshold = _pager$options2.swipeThreshold,
          viewsToMove = _pager$options2.viewsToMove,
          axis = _pager$options2.axis,
          infinite = _pager$options2.infinite;

      var threshold = _this._isFlick ? swipeThreshold : _this.pager.currentView.getSize() * viewsToMove * swipeThreshold;

      // we've stopped swiping
      _this.pager.isSwiping = false;

      // reset start track so we can grab it again on the next swipe
      _this._trackStart = false;

      // don't move anything if there hasn't been an attempted swipe
      if (_this._swipeDiff.x || _this._swipeDiff.y) {
        // determine if we've passed the defined threshold
        if (_this._isSwipe(threshold)) {
          if (_this._swipeDiff[axis] < 0) {
            _this.pager.prev();
          } else {
            _this.pager.next();
          }
        }
        // if we didn't, reset back to original view
        else {
            _this.pager.setPositionValue();
          }
      }

      _this.pager.emit('swipeEnd');
    };

    this._onSwipePast = function () {
      // perform a swipe end if we swiped past the component
      if (_this.pager.isSwiping) {
        _this._onSwipeEnd();
      }
    };

    this.pager = pager;
    this._trackStart = false;
    this._swipeStart = this._swipeDiff = {
      x: 0,
      y: 0
    };
  }

  _createClass(Swipe, [{
    key: '_isSwipe',
    value: function _isSwipe(threshold) {
      var _swipeDiff = this._swipeDiff,
          x = _swipeDiff.x,
          y = _swipeDiff.y;

      return this.pager.options.axis === 'x' ? Math.abs(x) > Math.max(threshold, Math.abs(y)) : Math.abs(x) < Math.max(threshold, Math.abs(y));
    }
  }, {
    key: 'getEvents',
    value: function getEvents() {
      var swipe = this.pager.options.swipe;

      var swipeEvents = {};

      if (swipe === true || swipe === 'mouse') {
        swipeEvents.onMouseDown = this._onSwipeStart;
        swipeEvents.onMouseMove = this._onSwipeMove;
        swipeEvents.onMouseUp = this._onSwipeEnd;
        swipeEvents.onMouseLeave = this._onSwipePast;
      }

      if (swipe === true || swipe === 'touch') {
        swipeEvents.onTouchStart = this._onSwipeStart;
        swipeEvents.onTouchMove = this._onSwipeMove;
        swipeEvents.onTouchEnd = this._onSwipeEnd;
      }

      return swipeEvents;
    }
  }]);

  return Swipe;
}();

exports.default = Swipe;
module.exports = exports['default'];