'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _pageResolver2 = require('./page-resolver');

var _pageResolver3 = _interopRequireDefault(_pageResolver2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint react/prop-types: 0 */
/* eslint camelcase: 0 */


exports.default = function (WrappedComponent) {
  return function (_pageResolver) {
    _inherits(PaginationHandler, _pageResolver);

    function PaginationHandler(props) {
      _classCallCheck(this, PaginationHandler);

      var _this = _possibleConstructorReturn(this, (PaginationHandler.__proto__ || Object.getPrototypeOf(PaginationHandler)).call(this, props));

      _this.handleChangePage = _this.handleChangePage.bind(_this);
      _this.handleChangeSizePerPage = _this.handleChangeSizePerPage.bind(_this);
      _this.state = _this.initialState();
      return _this;
    }

    _createClass(PaginationHandler, [{
      key: 'UNSAFE_componentWillReceiveProps',
      value: function UNSAFE_componentWillReceiveProps(nextProps) {
        var dataSize = nextProps.dataSize,
            currSizePerPage = nextProps.currSizePerPage;

        if (currSizePerPage !== this.props.currSizePerPage || dataSize !== this.props.dataSize) {
          var totalPages = this.calculateTotalPage(currSizePerPage, dataSize);
          var lastPage = this.calculateLastPage(totalPages);
          this.setState({ totalPages: totalPages, lastPage: lastPage });
        }
      }
    }, {
      key: 'handleChangeSizePerPage',
      value: function handleChangeSizePerPage(sizePerPage) {
        var _props = this.props,
            currSizePerPage = _props.currSizePerPage,
            onSizePerPageChange = _props.onSizePerPageChange;

        var selectedSize = typeof sizePerPage === 'string' ? parseInt(sizePerPage, 10) : sizePerPage;
        var currPage = this.props.currPage;

        if (selectedSize !== currSizePerPage) {
          var newTotalPages = this.calculateTotalPage(selectedSize);
          var newLastPage = this.calculateLastPage(newTotalPages);
          if (currPage > newLastPage) currPage = newLastPage;
          onSizePerPageChange(selectedSize, currPage);
        }
      }
    }, {
      key: 'handleChangePage',
      value: function handleChangePage(newPage) {
        var page = void 0;
        var _props2 = this.props,
            currPage = _props2.currPage,
            pageStartIndex = _props2.pageStartIndex,
            prePageText = _props2.prePageText,
            nextPageText = _props2.nextPageText,
            lastPageText = _props2.lastPageText,
            firstPageText = _props2.firstPageText,
            onPageChange = _props2.onPageChange;
        var lastPage = this.state.lastPage;


        if (newPage === prePageText) {
          page = this.backToPrevPage();
        } else if (newPage === nextPageText) {
          page = currPage + 1 > lastPage ? lastPage : currPage + 1;
        } else if (newPage === lastPageText) {
          page = lastPage;
        } else if (newPage === firstPageText) {
          page = pageStartIndex;
        } else {
          page = parseInt(newPage, 10);
        }
        if (page !== currPage) {
          onPageChange(page);
        }
      }
    }, {
      key: 'render',
      value: function render() {
        return _react2.default.createElement(WrappedComponent, _extends({}, this.props, {
          lastPage: this.state.lastPage,
          totalPages: this.state.totalPages,
          onPageChange: this.handleChangePage,
          onSizePerPageChange: this.handleChangeSizePerPage
        }));
      }
    }]);

    return PaginationHandler;
  }((0, _pageResolver3.default)(_react.Component));
};