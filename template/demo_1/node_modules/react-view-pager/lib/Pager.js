'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _mitt = require('mitt');

var _mitt2 = _interopRequireDefault(_mitt);

var _tabbable = require('tabbable');

var _tabbable2 = _interopRequireDefault(_tabbable);

var _animationBus = require('animation-bus');

var _animationBus2 = _interopRequireDefault(_animationBus);

var _resizeObserverPolyfill = require('resize-observer-polyfill');

var _resizeObserverPolyfill2 = _interopRequireDefault(_resizeObserverPolyfill);

var _PagerElement3 = require('./PagerElement');

var _PagerElement4 = _interopRequireDefault(_PagerElement3);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TRANSFORM = require('get-prefix')('transform');
var isWindowDefined = typeof window !== 'undefined';

var Track = function (_PagerElement) {
  _inherits(Track, _PagerElement);

  function Track() {
    _classCallCheck(this, Track);

    return _possibleConstructorReturn(this, (Track.__proto__ || Object.getPrototypeOf(Track)).apply(this, arguments));
  }

  _createClass(Track, [{
    key: 'getStyles',
    value: function getStyles(trackPosition) {
      var _pager$getPositionVal = this.pager.getPositionValue(trackPosition),
          x = _pager$getPositionVal.x,
          y = _pager$getPositionVal.y;

      var trackSize = this.pager.getTrackSize();
      var style = _defineProperty({}, TRANSFORM, 'translate3d(' + x + 'px, ' + y + 'px, 0)');

      if (trackSize) {
        var _pager$options = this.pager.options,
            axis = _pager$options.axis,
            viewsToShow = _pager$options.viewsToShow;

        var dimension = axis === 'x' ? 'width' : 'height';

        style[dimension] = viewsToShow === 'auto' ? trackSize : this.pager.views.length / viewsToShow * 100 + '%';
      }

      return style;
    }
  }]);

  return Track;
}(_PagerElement4.default);

var View = function (_PagerElement2) {
  _inherits(View, _PagerElement2);

  function View(_ref) {
    var index = _ref.index,
        restOptions = _objectWithoutProperties(_ref, ['index']);

    _classCallCheck(this, View);

    var _this2 = _possibleConstructorReturn(this, (View.__proto__ || Object.getPrototypeOf(View)).call(this, restOptions));

    _this2.index = index;
    _this2.inBounds = true;
    _this2.tabbableChildren = [];
    _this2.setCurrent(false);
    _this2.setVisible(false);
    _this2.setTarget();
    _this2.setOrigin();

    // TODO: look into getting rid of setTimeout
    // not sure the reason for needing setTimeout in order to get proper children,
    // might be due to something in React that we're not doing at the right time
    setTimeout(function () {
      _this2.tabbableChildren = (0, _tabbable2.default)(_this2.node);
      _this2.setTabbableChildren();
    });
    return _this2;
  }

  _createClass(View, [{
    key: 'setCurrent',
    value: function setCurrent(isCurrent) {
      this.isCurrent = isCurrent;
    }
  }, {
    key: 'setVisible',
    value: function setVisible(isVisible) {
      this.isVisible = isVisible;
      this.setTabbableChildren();
    }
  }, {
    key: 'setTabbableChildren',
    value: function setTabbableChildren() {
      // only allow tabbing in current slides
      for (var i = 0; i < this.tabbableChildren.length; i++) {
        this.tabbableChildren[i].tabIndex = this.isCurrent ? 0 : -1;
      }
    }
  }, {
    key: 'setTarget',
    value: function setTarget() {
      var _pager$options2 = this.pager.options,
          align = _pager$options2.align,
          viewsToShow = _pager$options2.viewsToShow;

      var target = this.pager.getStartCoords(this.index);

      if (align) {
        target += this.pager.getAlignOffset(this);
      }

      this.target = target;
    }
  }, {
    key: 'setOrigin',
    value: function setOrigin() {
      var trackPosition = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.pager.trackPosition;

      this.origin = this.target - trackPosition;
    }
  }, {
    key: 'getStyles',
    value: function getStyles() {
      var _pager$options3 = this.pager.options,
          axis = _pager$options3.axis,
          viewsToShow = _pager$options3.viewsToShow,
          infinite = _pager$options3.infinite;

      var style = {};

      // we need to position views inline when using the x axis
      if (axis === 'x') {
        style.display = 'inline-block';
        style.verticalAlign = 'top';
      }

      // set width or height on view when viewsToShow is not auto
      if (viewsToShow !== 'auto') {
        style[axis === 'x' ? 'width' : 'height'] = 100 / this.pager.views.length + '%';
      }

      // make sure view stays in frame when using infinite option
      if (infinite && !this.inBounds) {
        style.position = 'relative';
        style[axis === 'y' ? 'top' : 'left'] = this.getPosition();
      }

      // finally, apply any animations
      return _extends({}, style, this.pager.animationBus.getStyles(this));
    }
  }]);

  return View;
}(_PagerElement4.default);

var defaultOptions = {
  viewsToShow: 1,
  viewsToMove: 1,
  align: 0,
  contain: false,
  axis: 'x',
  autoSize: false,
  animations: [],
  infinite: false,
  instant: false,
  swipe: true,
  swipeThreshold: 0.5,
  flickTimeout: 300,
  accessibility: true
};

var Pager = function () {
  function Pager() {
    var _this3 = this;

    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Pager);

    this.hydrate = function () {
      _this3.frame.setSize();
      _this3.track.setSize();
      _this3.views.forEach(function (view) {
        view.setSize();
        view.setTarget();
      });
      _this3.setPositionValue();
      _this3.setViewStyles();
      _this3.emit('hydrated');
    };

    var emitter = (0, _mitt2.default)();

    this.on = emitter.on;
    this.emit = emitter.emit;
    this.off = emitter.off;

    this.views = [];
    this.currentIndex = 0;
    this.currentView = null;
    this.currentTween = 0;
    this.trackPosition = 0;
    this.isSwiping = false;

    this.options = _extends({}, defaultOptions, options);

    this.animationBus = new _animationBus2.default({
      animations: this.options.animations,
      origin: function origin(view) {
        return view.origin;
      }
    });

    if (isWindowDefined) {
      this.resizeObserver = new _resizeObserverPolyfill2.default(function () {
        _this3.hydrate();
      });
    }
  }

  _createClass(Pager, [{
    key: 'setOptions',
    value: function setOptions(options) {
      var lastOptions = this.options;

      // spread new options over the old ones
      this.options = _extends({}, this.options, options);

      // merge animations into animation bus
      this.animationBus.animations = this.options.animations;

      // fire a viewChange event with the new indicies if viewsToShow has changed
      if (lastOptions.viewsToShow !== this.options.viewsToShow) {
        this.emit('viewChange', this.getCurrentIndicies());
      }
    }
  }, {
    key: 'addFrame',
    value: function addFrame(node) {
      this.frame = new _PagerElement4.default({
        node: node,
        pager: this
      });
    }
  }, {
    key: 'addTrack',
    value: function addTrack(node) {
      this.track = new Track({
        node: node,
        pager: this
      });
    }
  }, {
    key: 'addView',
    value: function addView(node) {
      var index = this.views.length;
      var view = new View({
        node: node,
        index: index,
        pager: this
      });

      // add view to collection
      this.views.push(view);

      // set this as the first view if there isn't one yet
      if (!this.currentView) {
        this.setCurrentView({
          index: index,
          suppressEvent: true
        });
      }

      // listen for width and height changes
      if (isWindowDefined) {
        this.resizeObserver.observe(node);
      }

      // fire an event
      this.emit('viewAdded');

      return view;
    }
  }, {
    key: 'removeView',
    value: function removeView(view) {
      // filter out view
      this.views = this.views.filter(function (_view) {
        return view !== _view;
      });

      // stop observing node
      if (isWindowDefined) {
        this.resizeObserver.disconnect(view.node);
      }

      // fire an event
      this.emit('viewRemoved');
    }
  }, {
    key: 'prev',
    value: function prev() {
      this.setCurrentView({ direction: -1 });
    }
  }, {
    key: 'next',
    value: function next() {
      this.setCurrentView({ direction: 1 });
    }
  }, {
    key: 'setCurrentView',
    value: function setCurrentView(_ref2) {
      var _ref2$direction = _ref2.direction,
          direction = _ref2$direction === undefined ? 0 : _ref2$direction,
          _ref2$index = _ref2.index,
          index = _ref2$index === undefined ? this.currentIndex : _ref2$index,
          _ref2$suppressEvent = _ref2.suppressEvent,
          suppressEvent = _ref2$suppressEvent === undefined ? false : _ref2$suppressEvent;
      var _options = this.options,
          viewsToMove = _options.viewsToMove,
          infinite = _options.infinite;

      var newIndex = index + direction * viewsToMove;

      var previousIndex = this.currentIndex;
      var currentIndex = infinite ? newIndex : (0, _utils.clamp)(newIndex, 0, this.views.length - 1);

      var previousView = this.getView(previousIndex);
      var currentView = this.getView(currentIndex);

      // set current index and view
      this.currentIndex = currentIndex;
      this.currentView = currentView;

      // swap current view flags
      previousView.setCurrent(false);
      currentView.setCurrent(true);

      var rangeStart = currentIndex;
      var rangeEnd = currentIndex + viewsToMove - 1;
      var viewRange = (0, _utils.range)(rangeStart, rangeEnd, this.views.length);

      // set flags for which views are currently showing
      this.views.forEach(function (view, index) {
        view.setVisible(index === currentIndex);
      });

      // set the track position to the new view
      this.setPositionValue();

      if (!suppressEvent) {
        this.emit('viewChange', this.getCurrentIndicies());
      }
    }
  }, {
    key: 'setPositionValue',
    value: function setPositionValue() {
      var trackPosition = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.currentView ? this.currentView.target : 0;

      if (!this.isSwiping) {
        var _options2 = this.options,
            viewsToShow = _options2.viewsToShow,
            autoSize = _options2.autoSize,
            infinite = _options2.infinite,
            contain = _options2.contain;

        var trackSize = this.getTrackSize();

        if (infinite) {
          // we offset by a track multiplier so infinite animation can take advantage of
          // physics by animating to a large value, the final value provided in getTransformValue
          // will return the proper wrapped value
          trackPosition -= (Math.floor(this.currentIndex / this.views.length) || 0) * trackSize;
        }

        if (contain) {
          var trackEndOffset = viewsToShow === 'auto' && autoSize || viewsToShow <= 1 ? 0 : this.getFrameSize({ autoSize: false });
          trackPosition = (0, _utils.clamp)(trackPosition, trackEndOffset - trackSize, 0);
        }
      }

      this.trackPosition = trackPosition;
    }
  }, {
    key: 'setViewStyles',
    value: function setViewStyles() {
      var trackPosition = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var _options3 = this.options,
          infinite = _options3.infinite,
          align = _options3.align;

      var frameSize = this.getFrameSize();
      var trackSize = this.getTrackSize();
      var wrappedtrackPosition = (0, _utils.modulo)(trackPosition, -trackSize);

      this.views.reduce(function (lastPosition, view, index) {
        var viewSize = view.getSize();
        var nextPosition = lastPosition + viewSize;
        var position = lastPosition;

        if (nextPosition + viewSize * align < Math.abs(wrappedtrackPosition)) {
          // shift views around so they are always visible in frame
          if (infinite) {
            position += trackSize - lastPosition;
          }
          view.inBounds = false;
        } else {
          view.inBounds = true;
        }

        view.setPosition(position);
        view.setOrigin(trackPosition);

        return nextPosition;
      }, 0);
    }
  }, {
    key: 'getNumericViewsToShow',
    value: function getNumericViewsToShow() {
      return isNaN(this.options.viewsToShow) ? 1 : this.options.viewsToShow;
    }
  }, {
    key: 'getMaxDimensions',
    value: function getMaxDimensions(indices) {
      var _this4 = this;

      var axis = this.options.axis;

      var widths = [];
      var heights = [];

      indices.forEach(function (index) {
        var view = isNaN(index) ? index : _this4.getView(index);
        widths.push(view.getSize('width'));
        heights.push(view.getSize('height'));
      });

      return {
        width: axis === 'x' ? (0, _utils.sum)(widths) : (0, _utils.max)(widths),
        height: axis === 'y' ? (0, _utils.sum)(heights) : (0, _utils.max)(heights)
      };
    }
  }, {
    key: 'getCurrentIndicies',
    value: function getCurrentIndicies() {
      var _options4 = this.options,
          infinite = _options4.infinite,
          contain = _options4.contain;

      var currentViews = [];
      var viewsToShow = isNaN(this.options.viewsToShow) ? 1 : this.options.viewsToShow;
      var minIndex = this.currentIndex;
      var maxIndex = this.currentIndex + (viewsToShow - 1);

      if (contain) {
        // if containing, we need to clamp the start and end indexes so we only return what's in view
        minIndex = (0, _utils.clamp)(minIndex, 0, this.views.length - viewsToShow);
        maxIndex = (0, _utils.clamp)(maxIndex, 0, this.views.length - 1);
        for (var i = minIndex; i <= maxIndex; i++) {
          currentViews.push(i);
        }
      } else {
        for (var _i = minIndex; _i <= maxIndex; _i++) {
          currentViews.push(infinite ? (0, _utils.modulo)(_i, this.views.length) : (0, _utils.clamp)(_i, 0, this.views.length - 1));
        }
      }

      return currentViews;
    }
  }, {
    key: 'getFrameSize',
    value: function getFrameSize() {
      var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref3$autoSize = _ref3.autoSize,
          autoSize = _ref3$autoSize === undefined ? this.options.autoSize : _ref3$autoSize,
          _ref3$fullSize = _ref3.fullSize,
          fullSize = _ref3$fullSize === undefined ? false : _ref3$fullSize;

      var dimensions = {
        width: 0,
        height: 0
      };

      if (this.views.length) {
        if (autoSize) {
          var currentViews = this.getCurrentIndicies();
          dimensions = this.getMaxDimensions(currentViews);
        } else if (this.frame) {
          dimensions = {
            width: this.frame.getSize('width'),
            height: this.frame.getSize('height')
          };
        }
      }

      if (fullSize) {
        return dimensions;
      } else {
        return dimensions[this.options.axis === 'x' ? 'width' : 'height'];
      }
    }
  }, {
    key: 'getTrackSize',
    value: function getTrackSize() {
      var includeLastSlide = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      var lastIndex = includeLastSlide ? this.views.length : this.views.length - 1;
      var size = 0;
      this.views.slice(0, lastIndex).forEach(function (view) {
        size += view.getSize();
      });
      return size;
    }
  }, {
    key: 'getView',
    value: function getView(index) {
      return this.views[(0, _utils.modulo)(index, this.views.length)];
    }

    // where the view should start

  }, {
    key: 'getStartCoords',
    value: function getStartCoords(index) {
      var target = 0;
      this.views.slice(0, index).forEach(function (view) {
        target -= view.getSize();
      });
      return target;
    }

    // how much to offset the view defined by the align option

  }, {
    key: 'getAlignOffset',
    value: function getAlignOffset(view) {
      var frameSize = this.getFrameSize({ autoSize: false });
      var viewSize = view.getSize();
      return (frameSize - viewSize) * this.options.align;
    }
  }, {
    key: 'getPositionValue',
    value: function getPositionValue() {
      var trackPosition = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.trackPosition;
      var _options5 = this.options,
          infinite = _options5.infinite,
          contain = _options5.contain;

      var position = { x: 0, y: 0

        // store the current animated value so we can reference it later
      };this.currentTween = trackPosition;

      // wrap the track position if this is an infinite track
      if (infinite) {
        var trackSize = this.getTrackSize();
        trackPosition = (0, _utils.modulo)(trackPosition, -trackSize) || 0;
      }

      // emit a "scroll" event so we can do things based on the progress of the track
      this.emit('scroll', {
        progress: trackPosition / this.getTrackSize(false),
        position: trackPosition
      });

      // set the proper transform axis based on our options
      position[this.options.axis] = trackPosition;

      return position;
    }
  }, {
    key: 'resetViewIndex',
    value: function resetViewIndex() {
      // reset back to a normal index
      this.setCurrentView({
        index: (0, _utils.modulo)(this.currentIndex, this.views.length),
        suppressEvent: true
      });
    }
  }]);

  return Pager;
}();

exports.default = Pager;
module.exports = exports['default'];