'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PaginationTotalWithAdapter = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _pageResolver2 = require('./page-resolver');

var _pageResolver3 = _interopRequireDefault(_pageResolver2);

var _paginationTotal = require('./pagination-total');

var _paginationTotal2 = _interopRequireDefault(_paginationTotal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint react/prop-types: 0 */


var paginationTotalAdapter = function paginationTotalAdapter(WrappedComponent) {
  return function (_pageResolver) {
    _inherits(PaginationTotalAdapter, _pageResolver);

    function PaginationTotalAdapter() {
      _classCallCheck(this, PaginationTotalAdapter);

      return _possibleConstructorReturn(this, (PaginationTotalAdapter.__proto__ || Object.getPrototypeOf(PaginationTotalAdapter)).apply(this, arguments));
    }

    _createClass(PaginationTotalAdapter, [{
      key: 'render',
      value: function render() {
        var _calculateFromTo = this.calculateFromTo(),
            _calculateFromTo2 = _slicedToArray(_calculateFromTo, 2),
            from = _calculateFromTo2[0],
            to = _calculateFromTo2[1];

        return _react2.default.createElement(WrappedComponent, {
          from: from,
          to: to,
          dataSize: this.props.dataSize,
          paginationTotalRenderer: this.props.paginationTotalRenderer
        });
      }
    }]);

    return PaginationTotalAdapter;
  }((0, _pageResolver3.default)(_react.Component));
};

var PaginationTotalWithAdapter = exports.PaginationTotalWithAdapter = paginationTotalAdapter(_paginationTotal2.default);
exports.default = paginationTotalAdapter;