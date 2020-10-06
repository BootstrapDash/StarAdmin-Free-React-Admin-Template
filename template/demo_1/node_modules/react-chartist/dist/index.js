'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ChartistGraph = function (_Component) {
  _inherits(ChartistGraph, _Component);

  function ChartistGraph() {
    _classCallCheck(this, ChartistGraph);

    return _possibleConstructorReturn(this, (ChartistGraph.__proto__ || Object.getPrototypeOf(ChartistGraph)).apply(this, arguments));
  }

  _createClass(ChartistGraph, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
      this.updateChart(newProps);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.chartist) {
        try {
          this.chartist.detach();
        } catch (err) {
          throw new Error('Internal chartist error', err);
        }
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.updateChart(this.props);
    }
  }, {
    key: 'updateChart',
    value: function updateChart(config) {
      var Chartist = require('chartist');

      var type = config.type,
          data = config.data;

      var options = config.options || {};
      var responsiveOptions = config.responsiveOptions || [];
      var event = void 0;

      if (this.chartist) {
        this.chartist.update(data, options, responsiveOptions);
      } else {
        this.chartist = new Chartist[type](this.chart, data, options, responsiveOptions);

        if (config.listener) {
          for (event in config.listener) {
            if (config.listener.hasOwnProperty(event)) {
              this.chartist.on(event, config.listener[event]);
            }
          }
        }
      }

      return this.chartist;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          className = _props.className,
          style = _props.style,
          children = _props.children,
          data = _props.data,
          type = _props.type;

      var childrenWithProps = children && _react.Children.map(children, function (child) {
        return (0, _react.cloneElement)(child, {
          type: type,
          data: data
        });
      });
      return _react2.default.createElement(
        'div',
        { className: 'ct-chart ' + (className || ''), ref: function ref(_ref) {
            return _this2.chart = _ref;
          }, style: style },
        childrenWithProps
      );
    }
  }]);

  return ChartistGraph;
}(_react.Component);

ChartistGraph.propTypes = {
  type: _propTypes2.default.oneOf(['Line', 'Bar', 'Pie']).isRequired,
  data: _propTypes2.default.object.isRequired,
  className: _propTypes2.default.string,
  options: _propTypes2.default.object,
  responsiveOptions: _propTypes2.default.array,
  style: _propTypes2.default.object
};

exports.default = ChartistGraph;
