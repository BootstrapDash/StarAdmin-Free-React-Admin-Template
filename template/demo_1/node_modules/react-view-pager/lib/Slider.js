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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var modulo = function modulo(num, max) {
  return (num % max + max) % max;
};

// react-view-pager
// const Slider = ({ slides }) => (
//   <Frame>
//     { ({ position, isSliding, isSwiping }) =>
//       <Motion style={{ value: isSwiping ? position : spring(position) }}>
//         { value =>
//           <Track position={value}> // overrides internal position
//             {slides} // that position would set proper wrapper values
//           </Track>
//         }
//       </Motion>
//     }
//   </Frame>
// )

var ALIGN_OFFSETS = {
  left: 0,
  center: 0.5,
  right: 1
};

var ElementSize = function () {
  function ElementSize(_ref) {
    var node = _ref.node,
        axis = _ref.axis,
        width = _ref.width,
        height = _ref.height;

    _classCallCheck(this, ElementSize);

    this.node = node;
    this.axis = axis;
    this.setSize(width, height);
  }

  _createClass(ElementSize, [{
    key: 'setSize',
    value: function setSize(width, height) {
      this.width = width || this.node.offsetWidth;
      this.height = height || this.node.offsetHeight;
    }
  }, {
    key: 'getSize',
    value: function getSize(dimension) {
      if (dimension === 'width' || dimension === 'height') {
        return this[dimension];
      } else {
        return this[this.axis === 'x' ? 'width' : 'height'];
      }
    }
  }]);

  return ElementSize;
}();

var View = function (_ElementSize) {
  _inherits(View, _ElementSize);

  function View(options) {
    _classCallCheck(this, View);

    var _this = _possibleConstructorReturn(this, (View.__proto__ || Object.getPrototypeOf(View)).call(this, options));

    _this.top = _this.left = {
      original: 0,
      offset: {
        pixel: 0,
        percent: 0
      }
    };
    return _this;
  }

  _createClass(View, [{
    key: 'setCoords',
    value: function setCoords(position) {
      this[this.axis === 'y' ? 'top' : 'left'] = position;
    }
  }, {
    key: 'getCoords',
    value: function getCoords() {
      return this[this.axis === 'y' ? 'top' : 'left'];
    }
  }]);

  return View;
}(ElementSize);

var Views = function () {
  function Views(axis, viewsToShow, infinite) {
    _classCallCheck(this, Views);

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
    value: function addView(node) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var view = new View(_extends({
        node: node,
        axis: this.axis,
        track: this.track
      }, options));

      this.collection.push(view);

      // hydrate positions every time a new view is added
      this.setPositions();
    }
  }, {
    key: 'setPositions',
    value: function setPositions() {
      var _this2 = this;

      // bail if frame or track haven't been set yet
      if (!this.frame && !this.track) return;

      var frameSize = this.frame.getSize();
      var trackSize = this.getTotalSize();
      var trackPosition = this.track.getPosition();
      var startCoords = { top: 0, left: 0 };

      this.collection.reduce(function (lastView, view) {
        var lastPosition = lastView && lastView.getCoords().original || 0;
        var nextPosition = lastPosition + view.getSize() / (_this2.viewsToShow || 1);
        var offsetPosition = lastPosition;

        // offset slides in the proper position when wrapping
        if (_this2.infinite) {
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
            percent: _this2.getPercentValue(offsetPosition)
          }
        });

        return view;
      }, null);
    }
  }, {
    key: 'getTotalSize',
    value: function getTotalSize() {
      var _this3 = this;

      if (this.viewsToShow) {
        return this.frame.getSize() / this.viewsToShow * this.collection.length;
      } else {
        var _ret = function () {
          var dimension = _this3.axis === 'x' ? 'width' : 'height';
          var size = 0;

          _this3.collection.forEach(function (view) {
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
      var _this4 = this;

      var size = 0;
      this.collection.slice(0, index).forEach(function (view) {
        size -= view.getSize() / (_this4.viewsToShow || 1);
      });
      return size;
    }
  }, {
    key: 'getPercentValue',
    value: function getPercentValue(position) {
      return Math.round(position / this.frame.getSize() * 10000) * 0.01;
    }
  }]);

  return Views;
}();

var Track = function (_ElementSize2) {
  _inherits(Track, _ElementSize2);

  function Track(options) {
    _classCallCheck(this, Track);

    var _this5 = _possibleConstructorReturn(this, (Track.__proto__ || Object.getPrototypeOf(Track)).call(this, options));

    _this5.x = _this5.y = 0;
    return _this5;
  }

  _createClass(Track, [{
    key: 'setPosition',
    value: function setPosition(position) {
      this[this.axis] = position;
    }
  }, {
    key: 'getPosition',
    value: function getPosition() {
      return this[this.axis];
    }
  }]);

  return Track;
}(ElementSize);

var Frame = function (_ElementSize3) {
  _inherits(Frame, _ElementSize3);

  function Frame(options) {
    _classCallCheck(this, Frame);

    var _this6 = _possibleConstructorReturn(this, (Frame.__proto__ || Object.getPrototypeOf(Frame)).call(this, options));

    _this6.x = _this6.y = 0;
    return _this6;
  }

  _createClass(Frame, [{
    key: 'setPosition',
    value: function setPosition(position) {
      this[this.axis] = position;
    }
  }, {
    key: 'getPosition',
    value: function getPosition() {
      return this[this.axis];
    }
  }]);

  return Frame;
}(ElementSize);

///////////////////////////////////////////////////////////
// START REACT
///////////////////////////////////////////////////////////

function getTouchEvent(e) {
  return e.touches && e.touches[0] || e;
}

function clamp(val, min, max) {
  return Math.min(Math.max(min, val), max);
}

var ViewPage = function (_Component) {
  _inherits(ViewPage, _Component);

  function ViewPage() {
    _classCallCheck(this, ViewPage);

    return _possibleConstructorReturn(this, (ViewPage.__proto__ || Object.getPrototypeOf(ViewPage)).apply(this, arguments));
  }

  _createClass(ViewPage, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.props.onMount((0, _reactDom.findDOMNode)(this));
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          view = _props.view,
          viewsToShow = _props.viewsToShow,
          axis = _props.axis,
          children = _props.children;

      var child = _react.Children.only(children);
      var style = _extends({}, child.props.style, {
        top: (view.top && view.top.offset.percent) + '%' || 0 + '%',
        left: (view.left && view.left.offset.percent) + '%' || 0 + '%'
      });

      if (viewsToShow) {
        style[axis === 'x' ? 'width' : 'height'] = 100 / viewsToShow + '%';
      }

      return (0, _react.cloneElement)(child, { ref: this._handleNode, style: style });
    }
  }]);

  return ViewPage;
}(_react.Component);

var ViewPager = function (_Component2) {
  _inherits(ViewPager, _Component2);

  function ViewPager(props) {
    _classCallCheck(this, ViewPager);

    var _this8 = _possibleConstructorReturn(this, (ViewPager.__proto__ || Object.getPrototypeOf(ViewPager)).call(this, props));

    _this8.slide = function (direction) {
      var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _this8.state.currentView;
      var _this8$props = _this8.props,
          children = _this8$props.children,
          viewsToMove = _this8$props.viewsToMove,
          infinite = _this8$props.infinite;

      var newIndex = index + direction * viewsToMove;
      var currentView = infinite ? modulo(newIndex, _this8._viewCount - 1) : clamp(newIndex, 0, _this8._viewCount - 1);

      _this8.setState({ currentView: currentView }, function () {
        _this8.props.onChange(currentView);
      });
    };

    _this8._handleViewMount = function (node) {
      _this8._views.addView(node);
      _this8.forceUpdate();
    };

    _this8._onSwipeStart = function (e) {
      var _getTouchEvent = getTouchEvent(e),
          pageX = _getTouchEvent.pageX,
          pageY = _getTouchEvent.pageY;

      // we're now swiping


      _this8._isSwiping = true;

      // store the initial starting coordinates
      _this8._startTrack = _this8._track.getPosition() - _this8._getAlignOffset();
      _this8._startSwipe = {
        x: pageX,
        y: pageY
      };

      // determine if a flick or not
      _this8._isFlick = true;

      setTimeout(function () {
        _this8._isFlick = false;
      }, _this8.props.flickTimeout);
    };

    _this8._onSwipeMove = function (e) {
      // bail if we aren't swiping
      if (!_this8._isSwiping) return;

      var _this8$props2 = _this8.props,
          swipeThreshold = _this8$props2.swipeThreshold,
          axis = _this8$props2.axis,
          viewsToMove = _this8$props2.viewsToMove;

      var _getTouchEvent2 = getTouchEvent(e),
          pageX = _getTouchEvent2.pageX,
          pageY = _getTouchEvent2.pageY;

      // determine how much we have moved


      _this8._swipeDiff = {
        x: _this8._startSwipe.x - pageX,
        y: _this8._startSwipe.y - pageY
      };

      if (_this8._isSwipe(swipeThreshold)) {
        e.preventDefault();
        e.stopPropagation();

        // let swipDiff = this._swipeDiff[axis] * edgeFriction
        var swipDiff = _this8._swipeDiff[axis];
        var newTrackPosition = (_this8._startTrack - swipDiff) * viewsToMove;

        // console.log(this._getOutsideTrackBounds(newTrackPosition))
        // don't allow swiping if we are containing slides
        // this logic will make sure the track position stays within the bounds of the frame
        // all while allowing to swipe past
        // if it goes past the bounds we will activate the edgeFriction
        // if (Math.abs(newTrackPosition) > this._track.getSize() - this._frame.getSize()) {
        //
        // } else if () {
        //
        // }


        // make sure we stay within the defined threshold
        // newTrackPosition = clamp(val, min, max)
        _this8._setTrackPosition(newTrackPosition);
      }
    };

    _this8._onSwipeEnd = function () {
      var _this8$props3 = _this8.props,
          swipeThreshold = _this8$props3.swipeThreshold,
          axis = _this8$props3.axis;

      var currentViewSize = _this8._getCurrentViewSize();
      var threshold = _this8._isFlick ? swipeThreshold : currentViewSize * swipeThreshold;

      // if (this._isSwipe(threshold)) {
      //   (this._swipeDiff[axis] < 0) ? this.prev() : this.next()
      // }

      _this8._isSwiping = false;
    };

    _this8._onSwipePast = function () {
      // perform a swipe end if we swiped past the component
      if (_this8._isSwiping) {
        _this8._onSwipeEnd();
      }
    };

    _this8._views = new Views(props.axis, props.viewsToShow, props.infinite);
    _this8._viewCount = _react.Children.count(props.children);

    // swiping
    _this8._startSwipe = {};
    _this8._swipeDiff = {};
    _this8._isSwiping = false;
    _this8._isFlick = false;

    _this8.state = {
      currentTrackPosition: 0,
      currentView: props.currentView
    };
    return _this8;
  }

  _createClass(ViewPager, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props2 = this.props,
          autoSize = _props2.autoSize,
          axis = _props2.axis;


      this._frame = new Frame({
        node: this._frameNode,
        width: autoSize && this._getCurrentViewSize('width'),
        height: autoSize && this._getCurrentViewSize('height'),
        axis: axis
      });

      this._track = new Track({
        node: this._trackNode,
        axis: axis
      });

      // set frame and track for views to access
      this._views.setFrame(this._frame);
      this._views.setTrack(this._track);

      // set positions so we can get a total width
      this._views.setPositions();

      // set track width to the size of views
      var totalViewSize = this._views.getTotalSize();
      this._track.setSize(totalViewSize, totalViewSize);

      // finally, set the initial track position
      this._setTrackPosition(this._getStartCoords());
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(_ref2) {
      var currentView = _ref2.currentView;

      // update state with new index if necessary
      if ((typeof currentView === 'undefined' ? 'undefined' : _typeof(currentView)) !== undefined && this.props.currentView !== currentView) {
        this.setState({ currentView: currentView });
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(lastProps, lastState) {
      // reposition slider if index has changed
      if (this.state.currentView !== lastState.currentView) {
        this._setTrackPosition(this._getStartCoords());
      }

      // update frame size to match new view size
      if (this.props.autoSize) {
        var width = this._getCurrentViewSize('width');
        var height = this._getCurrentViewSize('height');

        // update frame size
        this._frame.setSize(width, height);

        // update view positions
        this._views.setPositions();
      }
    }
  }, {
    key: 'prev',
    value: function prev() {
      this.slide(-1);
    }
  }, {
    key: 'next',
    value: function next() {
      this.slide(1);
    }
  }, {
    key: '_getStartCoords',
    value: function _getStartCoords() {
      var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.state.currentView;

      return this._views.getStartCoords(index);
    }
  }, {
    key: '_getCurrentViewSize',
    value: function _getCurrentViewSize(dimension) {
      var currentView = this._views.collection[this.state.currentView];
      return currentView && currentView.getSize(dimension) || 0;
    }
  }, {
    key: '_getAlignOffset',
    value: function _getAlignOffset() {
      var _props3 = this.props,
          align = _props3.align,
          viewsToShow = _props3.viewsToShow;

      var frameSize = this._frame.getSize();
      var currentViewSize = this._getCurrentViewSize();
      var alignMultiplier = isNaN(align) ? ALIGN_OFFSETS[align] : align;
      return (frameSize - currentViewSize / (viewsToShow || 1)) * alignMultiplier;
    }
  }, {
    key: '_setTrackPosition',
    value: function _setTrackPosition(position) {
      var _props4 = this.props,
          infinite = _props4.infinite,
          contain = _props4.contain;

      var frameSize = this._frame.getSize();
      var trackSize = this._track.getSize();

      // wrapping
      if (infinite) {
        position = modulo(position, trackSize) - trackSize;
      }

      // alignment
      position += this._getAlignOffset();

      // clamp value if we want to contain the position
      if (contain) {
        position = clamp(position, -(trackSize - frameSize), 0);
      }

      // set new track position
      this._track.setPosition(position);

      // update view positions
      this._views.setPositions();

      // update state
      this.setState({
        currentTrackPosition: position
      });
    }
  }, {
    key: '_isSwipe',
    value: function _isSwipe(threshold) {
      var axis = this.props.axis;
      var _swipeDiff = this._swipeDiff,
          x = _swipeDiff.x,
          y = _swipeDiff.y;

      return axis === 'x' ? Math.abs(x) > Math.max(threshold, Math.abs(y)) : Math.abs(x) < Math.max(threshold, Math.abs(y));
    }
  }, {
    key: '_getOutsideTrackBounds',
    value: function _getOutsideTrackBounds(trackPosition) {
      return {
        first: trackPosition > 0,
        last: Math.abs(trackPosition) > this._track.getSize() - this._frame.getSize()
      };
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
    key: '_getPositionValue',
    value: function _getPositionValue(position) {
      var frameSize = this._frame && this._frame.getSize() || 0;
      return Math.round(position / frameSize * 10000) * 0.01;
    }
  }, {
    key: '_getTransformValue',
    value: function _getTransformValue(trackPosition) {
      var axis = this.props.axis;

      var position = { x: 0, y: 0 };
      position[axis] = trackPosition || 0;
      return 'translate3d(' + position.x + '%, ' + position.y + '%, 0)';
    }
  }, {
    key: 'render',
    value: function render() {
      var _this9 = this;

      var _props5 = this.props,
          autoSize = _props5.autoSize,
          viewsToShow = _props5.viewsToShow,
          axis = _props5.axis,
          children = _props5.children;

      var trackPosition = this._getPositionValue(this.state.currentTrackPosition);
      var frameStyles = {};

      if (autoSize) {
        frameStyles.width = this._getCurrentViewSize('width') || 'auto';
        frameStyles.height = this._getCurrentViewSize('height') || 'auto';
      }

      return _react2.default.createElement(
        'div',
        _extends({
          ref: function ref(c) {
            return _this9._frameNode = (0, _reactDom.findDOMNode)(c);
          },
          className: 'frame',
          style: frameStyles
        }, this._getSwipeEvents()),
        _react2.default.createElement(
          'div',
          {
            ref: function ref(c) {
              return _this9._trackNode = (0, _reactDom.findDOMNode)(c);
            },
            className: 'track',
            style: {
              transform: this._getTransformValue(trackPosition)
            }
          },
          _react.Children.map(children, function (child, index) {
            return _react2.default.createElement(ViewPage, {
              view: _this9._views.collection[index] || {},
              viewsToShow: viewsToShow,
              axis: axis,
              onMount: _this9._handleViewMount,
              children: child
            });
          })
        )
      );
    }
  }]);

  return ViewPager;
}(_react.Component);

ViewPager.propTypes = {
  currentView: _react.PropTypes.any,
  viewsToShow: _react.PropTypes.number,
  viewsToMove: _react.PropTypes.number,
  infinite: _react.PropTypes.bool,
  instant: _react.PropTypes.bool,
  axis: _react.PropTypes.oneOf(['x', 'y']),
  align: _react.PropTypes.oneOf(['left', 'center', 'right', _react.PropTypes.number]),
  autoSize: _react.PropTypes.bool,
  swipe: _react.PropTypes.oneOf([true, false, 'mouse', 'touch']),
  swipeThreshold: _react.PropTypes.number, // to advance slides, the user must swipe a length of (1/touchThreshold) * the width of the slider
  flickTimeout: _react.PropTypes.number,
  contain: _react.PropTypes.bool,
  // lazyLoad: PropTypes.bool,
  // rtl: PropTypes.bool,
  // springConfig: React.PropTypes.objectOf(React.PropTypes.number),
  beforeAnimation: _react.PropTypes.func,
  afterAnimation: _react.PropTypes.func
};
ViewPager.defaultProps = {
  currentView: 0,
  viewsToShow: 0,
  viewsToMove: 1,
  infinite: true,
  instant: false,
  axis: 'x',
  align: 'left',
  autoSize: false,
  contain: false, // don't allow slider to show empty cells
  swipe: true,
  swipeThreshold: 0.5,
  flickTimeout: 300,
  edgeFriction: 0, // the amount the slider can swipe past on the ends if infinite is false
  // lazyLoad: false, // lazyily load components as they enter
  // rtl: false, // right to left
  // springConfig: presets.gentle,
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
exports.default = ViewPager;
module.exports = exports['default'];