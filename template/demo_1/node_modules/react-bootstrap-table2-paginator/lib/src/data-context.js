'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _const = require('./const');

var _const2 = _interopRequireDefault(_const);

var _pagination = require('./pagination');

var _pagination2 = _interopRequireDefault(_pagination);

var _page = require('./page');

var _stateContext = require('./state-context');

var _stateContext2 = _interopRequireDefault(_stateContext);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint react/prop-types: 0 */
/* eslint react/require-default-props: 0 */
/* eslint no-lonely-if: 0 */


var _createBaseContext = (0, _stateContext2.default)(),
    Provider = _createBaseContext.Provider;

var PaginationDataContext = _react2.default.createContext();

var PaginationDataProvider = function (_Provider) {
  _inherits(PaginationDataProvider, _Provider);

  function PaginationDataProvider() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, PaginationDataProvider);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = PaginationDataProvider.__proto__ || Object.getPrototypeOf(PaginationDataProvider)).call.apply(_ref, [this].concat(args))), _this), _this.isRemotePagination = function () {
      return _this.props.isRemotePagination();
    }, _this.renderDefaultPagination = function () {
      if (!_this.props.pagination.options.custom) {
        var _this$getPaginationPr = _this.getPaginationProps(),
            currPage = _this$getPaginationPr.page,
            currSizePerPage = _this$getPaginationPr.sizePerPage,
            dataSize = _this$getPaginationPr.dataSize,
            rest = _objectWithoutProperties(_this$getPaginationPr, ['page', 'sizePerPage', 'dataSize']);

        return _react2.default.createElement(_pagination2.default, _extends({}, rest, {
          key: 'pagination',
          dataSize: dataSize || _this.props.data.length,
          currPage: currPage,
          currSizePerPage: currSizePerPage
        }));
      }
      return null;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(PaginationDataProvider, [{
    key: 'UNSAFE_componentWillReceiveProps',


    // eslint-disable-next-line camelcase, react/sort-comp
    value: function UNSAFE_componentWillReceiveProps(nextProps) {
      _get(PaginationDataProvider.prototype.__proto__ || Object.getPrototypeOf(PaginationDataProvider.prototype), 'UNSAFE_componentWillReceiveProps', this).call(this, nextProps);
      var currSizePerPage = this.currSizePerPage;
      var _nextProps$pagination = nextProps.pagination.options,
          custom = _nextProps$pagination.custom,
          onPageChange = _nextProps$pagination.onPageChange;


      var pageStartIndex = typeof nextProps.pagination.options.pageStartIndex !== 'undefined' ? nextProps.pagination.options.pageStartIndex : _const2.default.PAGE_START_INDEX;

      // user should align the page when the page is not fit to the data size when remote enable
      if (!this.isRemotePagination() && !custom) {
        var newPage = (0, _page.alignPage)(nextProps.data.length, this.props.data.length, this.currPage, currSizePerPage, pageStartIndex);

        if (this.currPage !== newPage) {
          if (onPageChange) {
            onPageChange(newPage, currSizePerPage);
          }
          this.currPage = newPage;
        }
      }
      if (nextProps.onDataSizeChange && nextProps.data.length !== this.props.data.length) {
        nextProps.onDataSizeChange({ dataSize: nextProps.data.length });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var data = this.props.data;
      var options = this.props.pagination.options;
      var currPage = this.currPage,
          currSizePerPage = this.currSizePerPage;

      var pageStartIndex = typeof options.pageStartIndex === 'undefined' ? _const2.default.PAGE_START_INDEX : options.pageStartIndex;

      data = this.isRemotePagination() ? data : (0, _page.getByCurrPage)(data, currPage, currSizePerPage, pageStartIndex);

      return _react2.default.createElement(
        PaginationDataContext.Provider,
        { value: { data: data, setRemoteEmitter: this.setRemoteEmitter } },
        this.props.children,
        this.renderDefaultPagination()
      );
    }
  }]);

  return PaginationDataProvider;
}(Provider);

PaginationDataProvider.propTypes = {
  data: _propTypes2.default.array.isRequired,
  remoteEmitter: _propTypes2.default.object.isRequired,
  isRemotePagination: _propTypes2.default.func.isRequired };

exports.default = function () {
  return {
    Provider: PaginationDataProvider,
    Consumer: PaginationDataContext.Consumer
  };
};