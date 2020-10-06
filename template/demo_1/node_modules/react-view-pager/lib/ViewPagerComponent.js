'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactMotion = require('react-motion');

var _PagerElement = require('./PagerElement');

var _PagerElement2 = _interopRequireDefault(_PagerElement);

var _getIndex = require('./get-index');

var _getIndex2 = _interopRequireDefault(_getIndex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TRANSFORM = require('get-prefix')('transform');

function modulo(val, max) {
  return (val % max + max) % max;
}

function clamp(val, min, max) {
  return Math.min(Math.max(min, val), max);
}

function getTouchEvent(e) {
  return e.touches && e.touches[0] || e;
}

var Pager = function () {
  function Pager() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Pager);

    this.views = [];
    this.currentIndex = 0;
    this.currentView = null;
    this.trackPosition = 0;
    this.isSwiping = false;

    this.options = _extends({
      axis: 'x',
      align: 0,
      contain: false,
      infinite: false,
      viewsToMove: 1
    }, options);
  }

  _createClass(Pager, [{
    key: 'addFrame',
    value: function addFrame(node) {
      this.frame = new _PagerElement2.default({ node: node, pager: this });
    }
  }, {
    key: 'addTrack',
    value: function addTrack(node) {
      this.track = new _PagerElement2.default({ node: node, pager: this });
    }
  }, {
    key: 'addView',
    value: function addView(node) {
      var align = this.options.align;

      var index = this.views.length;
      var view = new _PagerElement2.default({
        node: node,
        pager: this
      });

      // add view to collection
      // allow option to prepend, insert, or append
      this.views.push(view);

      // set target position
      var target = this.getStartCoords(index);

      if (align) {
        target += this.getAlignOffset(view);
      }

      view.target = target;

      // set this as the first view if there isn't one
      if (!this.currentView) {
        this.currentView = view;
      }

      // with each view added we need to re-calculate positions
      this.positionViews();

      return view;
    }
  }, {
    key: 'prev',
    value: function prev() {
      this.setCurrentView(-1);
    }
  }, {
    key: 'next',
    value: function next() {
      this.setCurrentView(1);
    }
  }, {
    key: 'setPositionValue',
    value: function setPositionValue() {
      var trackPosition = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.currentView ? this.currentView.target : 0;
      var _options = this.options,
          infinite = _options.infinite,
          contain = _options.contain;

      var trackSize = this.getTrackSize();

      if (infinite && !this.isSwiping) {
        // we offset by a track multiplier so infinite animation works as expected
        trackPosition -= (Math.floor(this.currentIndex / this.views.length) || 0) * trackSize;
      }

      if (contain && !this.isSwiping) {
        trackPosition = clamp(trackPosition, this.frame.getSize() - trackSize, 0);
      }

      this.trackPosition = trackPosition;
    }
  }, {
    key: 'setCurrentView',
    value: function setCurrentView(direction) {
      var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.currentIndex;
      var _options2 = this.options,
          viewsToMove = _options2.viewsToMove,
          infinite = _options2.infinite,
          onChange = _options2.onChange;

      var newIndex = index + direction * viewsToMove;
      var currentIndex = infinite ? newIndex : clamp(newIndex, 0, this.views.length - 1);

      this.currentIndex = currentIndex;
      this.currentView = this.getView(currentIndex);
      this.setPositionValue();
    }
  }, {
    key: 'resetViews',
    value: function resetViews() {
      // reset back to a normal index
      this.setCurrentView(0, modulo(this.currentIndex, this.views.length));
    }
  }, {
    key: 'getTransformValue',
    value: function getTransformValue() {
      var trackPosition = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.trackPosition;
      var _options3 = this.options,
          infinite = _options3.infinite,
          contain = _options3.contain;

      var position = { x: 0, y: 0 };

      if (infinite) {
        trackPosition = this.getWrappedTrackValue(trackPosition);
      }

      position[this.options.axis] = trackPosition;

      return 'translate3d(' + position.x + 'px, ' + position.y + 'px, 0)';
    }
  }, {
    key: 'getWrappedTrackValue',
    value: function getWrappedTrackValue(position) {
      var trackSize = this.getTrackSize();
      return modulo(position, -trackSize) || 0;
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
  }, {
    key: 'getFrameAutoSize',
    value: function getFrameAutoSize() {
      var _options4 = this.options,
          viewsToShow = _options4.viewsToShow,
          axis = _options4.axis;

      var maxHeight = 0;
      var maxWidth = 0;

      if (viewsToShow !== 'auto') {
        this.views.slice(this.currentIndex, this.currentIndex + viewsToShow).forEach(function (view) {
          var width = view.getSize('width');
          var height = view.getSize('height');
          if (axis === 'x') {
            maxWidth += width;
            if (height > maxHeight) {
              maxHeight = height;
            }
          } else {
            maxHeight += height;
            if (width > maxWidth) {
              maxWidth = width;
            }
          }
        });
      } else {
        maxWidth = this.currentView.getSize('width');
        maxHeight = this.currentView.getSize('height');
      }

      return {
        width: maxWidth,
        height: maxHeight
      };
    }
  }, {
    key: 'getTrackSize',
    value: function getTrackSize() {
      var size = 0;
      this.views.forEach(function (view) {
        size += view.getSize();
      });
      return size;
    }

    // how much to offset the view considering the align option

  }, {
    key: 'getAlignOffset',
    value: function getAlignOffset(view) {
      var frameSize = this.frame.getSize();
      var viewSize = view.getSize();
      return (frameSize - viewSize) * this.options.align;
    }
  }, {
    key: 'getView',
    value: function getView(index) {
      return this.views[modulo(index, this.views.length)];
    }
  }, {
    key: 'positionViews',
    value: function positionViews() {
      var trackPosition = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var _options5 = this.options,
          infinite = _options5.infinite,
          align = _options5.align;

      var frameSize = this.frame.getSize();
      var trackSize = this.getTrackSize();

      trackPosition = modulo(trackPosition, -trackSize);

      this.views.reduce(function (lastPosition, view, index) {
        var viewSize = view.getSize();
        var nextPosition = lastPosition + viewSize;
        var position = lastPosition;

        if (infinite) {
          // shift views around so they are always visible in frame
          if (nextPosition + viewSize * align < Math.abs(trackPosition)) {
            position += trackSize;
          } else if (lastPosition > frameSize - trackPosition) {
            position -= trackSize;
          }
        }

        view.setPosition(position);

        return nextPosition;
      }, 0);
    }
  }]);

  return Pager;
}();

var Frame = function (_Component) {
  _inherits(Frame, _Component);

  function Frame() {
    _classCallCheck(this, Frame);

    return _possibleConstructorReturn(this, (Frame.__proto__ || Object.getPrototypeOf(Frame)).apply(this, arguments));
  }

  _createClass(Frame, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.context.viewPager.addFrame((0, _reactDom.findDOMNode)(this));
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

  return Frame;
}(_react.Component);

Frame.defaultProps = {
  tag: 'div'
};
Frame.contextTypes = {
  viewPager: _react.PropTypes.instanceOf(Pager)
};

var Track = function (_Component2) {
  _inherits(Track, _Component2);

  function Track() {
    _classCallCheck(this, Track);

    return _possibleConstructorReturn(this, (Track.__proto__ || Object.getPrototypeOf(Track)).apply(this, arguments));
  }

  _createClass(Track, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.context.viewPager.addTrack((0, _reactDom.findDOMNode)(this));
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(_ref) {
      var position = _ref.position;

      // update view positions with current position tween
      // this method can get called thousands of times, let's make sure to optimize as much as we can
      this.context.viewPager.positionViews(position);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          tag = _props2.tag,
          position = _props2.position,
          restProps = _objectWithoutProperties(_props2, ['tag', 'position']);

      var style = _extends({}, restProps.style, {
        transform: this.context.viewPager.getTransformValue(position)
      });

      return (0, _react.createElement)(tag, _extends({}, restProps, { style: style }));
    }
  }]);

  return Track;
}(_react.Component);

Track.defaultProps = {
  tag: 'div'
};
Track.contextTypes = {
  viewPager: _react.PropTypes.instanceOf(Pager)
};

var View = function (_Component3) {
  _inherits(View, _Component3);

  function View() {
    var _ref2;

    var _temp, _this3, _ret;

    _classCallCheck(this, View);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this3 = _possibleConstructorReturn(this, (_ref2 = View.__proto__ || Object.getPrototypeOf(View)).call.apply(_ref2, [this].concat(args))), _this3), _this3.state = {
      viewInstance: null
    }, _temp), _possibleConstructorReturn(_this3, _ret);
  }

  _createClass(View, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.setState({
        viewInstance: this.context.viewPager.addView((0, _reactDom.findDOMNode)(this))
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _context$viewPager$op = this.context.viewPager.options,
          viewsToShow = _context$viewPager$op.viewsToShow,
          axis = _context$viewPager$op.axis;

      var _props3 = this.props,
          children = _props3.children,
          restProps = _objectWithoutProperties(_props3, ['children']);

      var viewInstance = this.state.viewInstance;

      var child = _react.Children.only(children);
      var style = _extends({}, child.props.style);

      if (viewsToShow !== 'auto') {
        style[axis === 'x' ? 'width' : 'height'] = this.context.viewPager.frame.getSize() / viewsToShow;
      }

      if (viewInstance) {
        style[axis === 'y' ? 'top' : 'left'] = viewInstance.getPosition();
      }

      return (0, _react.cloneElement)(child, _extends({}, restProps, { style: style }));
    }
  }]);

  return View;
}(_react.Component);

View.contextTypes = {
  viewPager: _react.PropTypes.instanceOf(Pager)
};

var ViewPager = function (_Component4) {
  _inherits(ViewPager, _Component4);

  function ViewPager(props) {
    _classCallCheck(this, ViewPager);

    var _this4 = _possibleConstructorReturn(this, (ViewPager.__proto__ || Object.getPrototypeOf(ViewPager)).call(this, props));

    _this4._onSwipeStart = function (e) {
      var _getTouchEvent = getTouchEvent(e),
          pageX = _getTouchEvent.pageX,
          pageY = _getTouchEvent.pageY;

      // we're now swiping


      _this4._viewPager.isSwiping = true;

      // store the initial starting coordinates
      _this4._startTrack = _this4._currentTween;
      _this4._startSwipe = {
        x: pageX,
        y: pageY
      };

      // determine if a flick or not
      _this4._isFlick = true;

      setTimeout(function () {
        _this4._isFlick = false;
      }, _this4.props.flickTimeout);
    };

    _this4._onSwipeMove = function (e) {
      // bail if we aren't swiping
      if (!_this4._viewPager.isSwiping) return;

      var _this4$props = _this4.props,
          swipeThreshold = _this4$props.swipeThreshold,
          axis = _this4$props.axis;

      var _getTouchEvent2 = getTouchEvent(e),
          pageX = _getTouchEvent2.pageX,
          pageY = _getTouchEvent2.pageY;

      // determine how much we have moved


      _this4._swipeDiff = {
        x: _this4._startSwipe.x - pageX,
        y: _this4._startSwipe.y - pageY
      };

      if (_this4._isSwipe(swipeThreshold)) {
        e.preventDefault();
        e.stopPropagation();

        var swipeDiff = _this4._swipeDiff[axis];
        var trackPosition = _this4._startTrack - swipeDiff;

        _this4._viewPager.setPositionValue(trackPosition);

        _this4.setState({
          instant: true
        });
      }
    };

    _this4._onSwipeEnd = function () {
      var _this4$props2 = _this4.props,
          swipeThreshold = _this4$props2.swipeThreshold,
          viewsToMove = _this4$props2.viewsToMove,
          axis = _this4$props2.axis,
          infinite = _this4$props2.infinite;
      var _this4$_viewPager = _this4._viewPager,
          frame = _this4$_viewPager.frame,
          currentView = _this4$_viewPager.currentView,
          trackPosition = _this4$_viewPager.trackPosition;

      var threshold = _this4._isFlick ? swipeThreshold : currentView.getSize() * viewsToMove * swipeThreshold;

      _this4._viewPager.isSwiping = false;

      _this4.setState({
        instant: true
      }, function () {
        if (_this4._isSwipe(threshold)) {
          _this4._swipeDiff[axis] < 0 ? _this4.prev() : _this4.next();
        } else {
          _this4._viewPager.setPositionValue();
        }
        _this4.setState({ instant: false });
      });
    };

    _this4._onSwipePast = function () {
      // perform a swipe end if we swiped past the component
      if (_this4._viewPager.isSwiping) {
        _this4._onSwipeEnd();
      }
    };

    _this4._handleOnRest = function () {
      var _this4$props3 = _this4.props,
          infinite = _this4$props3.infinite,
          children = _this4$props3.children;


      if (infinite && !_this4.state.instant) {
        // reset back to a normal index
        _this4._viewPager.resetViews();

        // set instant flag so we can prime track for next move
        _this4.setState({ instant: true }, function () {
          _this4.setState({ instant: false });
        });
      }
    };

    _this4._viewPager = new Pager(props);
    _this4._currentTween = 0;

    // swiping
    _this4._startSwipe = {};
    _this4._swipeDiff = {};
    _this4._isFlick = false;

    _this4.state = {
      currentView: (0, _getIndex2.default)(props.currentView, props.children),
      frameSize: {},
      instant: false,
      isMounted: false
    };
    return _this4;
  }

  _createClass(ViewPager, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        viewPager: this._viewPager
      };
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this5 = this;

      // we need to mount the frame and track before we can gather the proper info
      // for views, we use this flag to determine when we can mount the views
      this.setState({ isMounted: true }, function () {
        _this5._setFrameAutoSize();
        _this5._viewPager.setPositionValue();

        // now the pager is ready, animate to whatever value instantly
        _this5.setState({ instant: true }, function () {
          _this5.props.onReady();
          _this5.setState({ instant: false });
        });
      });
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(_ref3) {
      var currentView = _ref3.currentView,
          children = _ref3.children,
          instant = _ref3.instant;

      // update state with new index if necessary
      if ((typeof currentView === 'undefined' ? 'undefined' : _typeof(currentView)) !== undefined && this.props.currentView !== currentView) {
        var newIndex = (0, _getIndex2.default)(currentView, children);

        // set the new view index
        this._viewPager.setCurrentView(0, newIndex);

        // store it so we can compare it later
        this.setState({
          currentView: newIndex
        });
      }

      // update instant state from props
      if (this.props.instant !== instant) {
        this.setState({
          instant: instant
        });
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(lastProps, lastState) {
      if (this.state.currentView !== lastState.currentView) {
        // update frame size to match new view size
        this._setFrameAutoSize();
      }
    }
  }, {
    key: '_setFrameAutoSize',
    value: function _setFrameAutoSize() {
      if (!this.props.autoSize) return;
      this.setState({
        frameSize: this._viewPager.getFrameAutoSize()
      });
    }
  }, {
    key: 'prev',
    value: function prev() {
      this._viewPager.prev();
      this.setState({
        currentView: this._viewPager.currentIndex
      });
    }
  }, {
    key: 'next',
    value: function next() {
      this._viewPager.next();
      this.setState({
        currentView: this._viewPager.currentIndex
      });
    }
  }, {
    key: '_isSwipe',
    value: function _isSwipe(threshold) {
      var _swipeDiff = this._swipeDiff,
          x = _swipeDiff.x,
          y = _swipeDiff.y;

      return this.props.axis === 'x' ? Math.abs(x) > Math.max(threshold, Math.abs(y)) : Math.abs(x) < Math.max(threshold, Math.abs(y));
    }
  }, {
    key: '_getSwipeEvents',
    value: function _getSwipeEvents() {
      var swipe = this.props.swipe;

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
  }, {
    key: '_getMotionStyle',
    value: function _getMotionStyle() {
      var val = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var springConfig = this.props.springConfig;
      var instant = this.state.instant;

      return this._viewPager.isSwiping || instant ? val : (0, _reactMotion.spring)(val, springConfig);
    }
  }, {
    key: '_getFrameStyle',
    value: function _getFrameStyle() {
      var frameSize = this.state.frameSize;

      return {
        width: this._getMotionStyle(frameSize.width),
        height: this._getMotionStyle(frameSize.height)
      };
    }
  }, {
    key: '_getTrackStyle',
    value: function _getTrackStyle() {
      return {
        trackPosition: this._getMotionStyle(this._viewPager.trackPosition)
      };
    }
  }, {
    key: '_renderViews',
    value: function _renderViews() {
      return this.state.isMounted && _react.Children.map(this.props.children, function (child, index) {
        return _react2.default.createElement(View, { children: child });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this6 = this;

      return _react2.default.createElement(
        _reactMotion.Motion,
        { style: this._getFrameStyle() },
        function (frameStyles) {
          return _react2.default.createElement(
            Frame,
            _extends({
              className: 'frame',
              style: {
                width: frameStyles.width ? frameStyles.width : null,
                height: frameStyles.height ? frameStyles.height : null
              }
            }, _this6._getSwipeEvents()),
            _react2.default.createElement(
              _reactMotion.Motion,
              {
                style: _this6._getTrackStyle(),
                onRest: _this6._handleOnRest
              },
              function (_ref4) {
                var trackPosition = _ref4.trackPosition;

                _this6._currentTween = trackPosition;

                if (!_this6.state.instant) {
                  _this6._startTrack = _this6._currentTween;
                }

                return _react2.default.createElement(
                  Track,
                  {
                    position: trackPosition,
                    className: 'track'
                  },
                  _this6._renderViews()
                );
              }
            )
          );
        }
      );
    }
  }]);

  return ViewPager;
}(_react.Component);

ViewPager.propTypes = {
  currentView: _react.PropTypes.any,
  viewsToShow: _react.PropTypes.any,
  viewsToMove: _react.PropTypes.number,
  align: _react.PropTypes.number,
  contain: _react.PropTypes.bool,
  axis: _react.PropTypes.oneOf(['x', 'y']),
  autoSize: _react.PropTypes.bool,
  infinite: _react.PropTypes.bool,
  instant: _react.PropTypes.bool,
  swipe: _react.PropTypes.oneOf([true, false, 'mouse', 'touch']),
  swipeThreshold: _react.PropTypes.number, // to advance slides, the user must swipe a length of (1/touchThreshold) * the width of the slider
  flickTimeout: _react.PropTypes.number,
  // rightToLeft: PropTypes.bool,
  // lazyLoad: PropTypes.bool, // lazyily load components as they enter
  springConfig: _react2.default.PropTypes.objectOf(_react2.default.PropTypes.number),
  onReady: _react.PropTypes.func
};
ViewPager.defaultProps = {
  currentView: 0,
  viewsToShow: 'auto',
  viewsToMove: 1,
  align: 0,
  contain: false,
  axis: 'x',
  autoSize: false,
  infinite: false,
  instant: false,
  swipe: true,
  swipeThreshold: 0.5,
  flickTimeout: 300,
  rightToLeft: false,
  lazyLoad: false,
  springConfig: _reactMotion.presets.noWobble,
  onReady: function onReady() {
    return null;
  },
  onChange: function onChange() {
    return null;
  },
  beforeAnimation: function beforeAnimation() {
    return null;
  },
  afterAnimation: function afterAnimation() {
    return null;
  }
};
ViewPager.childContextTypes = {
  viewPager: _react.PropTypes.instanceOf(Pager)
};
exports.default = ViewPager;
module.exports = exports['default'];