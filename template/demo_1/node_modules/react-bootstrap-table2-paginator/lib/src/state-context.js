'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _events = require('events');

var _events2 = _interopRequireDefault(_events);

var _const = require('./const');

var _const2 = _interopRequireDefault(_const);

var _page = require('./page');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint react/prop-types: 0 */
/* eslint react/require-default-props: 0 */
/* eslint no-lonely-if: 0 */
/* eslint camelcase: 0 */


var StateContext = _react2.default.createContext();

var StateProvider = function (_React$Component) {
  _inherits(StateProvider, _React$Component);

  function StateProvider(props) {
    _classCallCheck(this, StateProvider);

    var _this = _possibleConstructorReturn(this, (StateProvider.__proto__ || Object.getPrototypeOf(StateProvider)).call(this, props));

    _initialiseProps.call(_this);

    _this.handleChangePage = _this.handleChangePage.bind(_this);
    _this.handleDataSizeChange = _this.handleDataSizeChange.bind(_this);
    _this.handleChangeSizePerPage = _this.handleChangeSizePerPage.bind(_this);

    var currPage = void 0;
    var currSizePerPage = void 0;
    var options = props.pagination.options;

    var sizePerPageList = options.sizePerPageList || _const2.default.SIZE_PER_PAGE_LIST;

    // initialize current page
    if (typeof options.page !== 'undefined') {
      currPage = options.page;
    } else if (typeof options.pageStartIndex !== 'undefined') {
      currPage = options.pageStartIndex;
    } else {
      currPage = _const2.default.PAGE_START_INDEX;
    }

    // initialize current sizePerPage
    if (typeof options.sizePerPage !== 'undefined') {
      currSizePerPage = options.sizePerPage;
    } else if (_typeof(sizePerPageList[0]) === 'object') {
      currSizePerPage = sizePerPageList[0].value;
    } else {
      currSizePerPage = sizePerPageList[0];
    }

    _this.currPage = currPage;
    _this.dataSize = options.totalSize;
    _this.currSizePerPage = currSizePerPage;
    _this.dataChangeListener = new _events2.default();
    _this.dataChangeListener.on('filterChanged', _this.handleDataSizeChange);
    return _this;
  }

  _createClass(StateProvider, [{
    key: 'UNSAFE_componentWillReceiveProps',
    value: function UNSAFE_componentWillReceiveProps(nextProps) {
      var custom = nextProps.pagination.options.custom;

      // user should align the page when the page is not fit to the data size when remote enable

      if (this.isRemotePagination() || custom) {
        if (typeof nextProps.pagination.options.page !== 'undefined') {
          this.currPage = nextProps.pagination.options.page;
        }
        if (typeof nextProps.pagination.options.sizePerPage !== 'undefined') {
          this.currSizePerPage = nextProps.pagination.options.sizePerPage;
        }
        if (typeof nextProps.pagination.options.totalSize !== 'undefined') {
          this.dataSize = nextProps.pagination.options.totalSize;
        }
      }
    }
  }, {
    key: 'handleDataSizeChange',
    value: function handleDataSizeChange(newDataSize) {
      var options = this.props.pagination.options;

      var pageStartIndex = typeof options.pageStartIndex === 'undefined' ? _const2.default.PAGE_START_INDEX : options.pageStartIndex;
      this.currPage = (0, _page.alignPage)(newDataSize, this.dataSize, this.currPage, this.currSizePerPage, pageStartIndex);
      this.dataSize = newDataSize;
      this.forceUpdate();
    }
  }, {
    key: 'handleChangePage',
    value: function handleChangePage(currPage) {
      var currSizePerPage = this.currSizePerPage;
      var options = this.props.pagination.options;


      if (options.onPageChange) {
        options.onPageChange(currPage, currSizePerPage);
      }

      this.currPage = currPage;

      if (this.isRemotePagination()) {
        this.getPaginationRemoteEmitter().emit('paginationChange', currPage, currSizePerPage);
        return;
      }
      this.forceUpdate();
    }
  }, {
    key: 'handleChangeSizePerPage',
    value: function handleChangeSizePerPage(currSizePerPage, currPage) {
      var options = this.props.pagination.options;


      if (options.onSizePerPageChange) {
        options.onSizePerPageChange(currSizePerPage, currPage);
      }

      this.currPage = currPage;
      this.currSizePerPage = currSizePerPage;

      if (this.isRemotePagination()) {
        this.getPaginationRemoteEmitter().emit('paginationChange', currPage, currSizePerPage);
        return;
      }
      this.forceUpdate();
    }
  }, {
    key: 'render',
    value: function render() {
      var paginationProps = this.getPaginationProps();
      var pagination = _extends({}, this.props.pagination, {
        options: paginationProps
      });

      return _react2.default.createElement(
        StateContext.Provider,
        {
          value: {
            paginationProps: paginationProps,
            paginationTableProps: {
              pagination: pagination,
              setPaginationRemoteEmitter: this.setPaginationRemoteEmitter,
              dataChangeListener: this.dataChangeListener
            }
          }
        },
        this.props.children
      );
    }
  }]);

  return StateProvider;
}(_react2.default.Component);

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.getPaginationProps = function () {
    var _props = _this2.props,
        options = _props.pagination.options,
        bootstrap4 = _props.bootstrap4,
        tableId = _props.tableId;
    var currPage = _this2.currPage,
        currSizePerPage = _this2.currSizePerPage,
        dataSize = _this2.dataSize;

    var withFirstAndLast = typeof options.withFirstAndLast === 'undefined' ? _const2.default.With_FIRST_AND_LAST : options.withFirstAndLast;
    var alwaysShowAllBtns = typeof options.alwaysShowAllBtns === 'undefined' ? _const2.default.SHOW_ALL_PAGE_BTNS : options.alwaysShowAllBtns;
    var hideSizePerPage = typeof options.hideSizePerPage === 'undefined' ? _const2.default.HIDE_SIZE_PER_PAGE : options.hideSizePerPage;
    var hidePageListOnlyOnePage = typeof options.hidePageListOnlyOnePage === 'undefined' ? _const2.default.HIDE_PAGE_LIST_ONLY_ONE_PAGE : options.hidePageListOnlyOnePage;
    var pageStartIndex = typeof options.pageStartIndex === 'undefined' ? _const2.default.PAGE_START_INDEX : options.pageStartIndex;
    return _extends({}, options, {
      bootstrap4: bootstrap4,
      tableId: tableId,
      page: currPage,
      sizePerPage: currSizePerPage,
      pageStartIndex: pageStartIndex,
      hidePageListOnlyOnePage: hidePageListOnlyOnePage,
      hideSizePerPage: hideSizePerPage,
      alwaysShowAllBtns: alwaysShowAllBtns,
      withFirstAndLast: withFirstAndLast,
      dataSize: dataSize,
      sizePerPageList: options.sizePerPageList || _const2.default.SIZE_PER_PAGE_LIST,
      paginationSize: options.paginationSize || _const2.default.PAGINATION_SIZE,
      showTotal: options.showTotal,
      pageListRenderer: options.pageListRenderer,
      pageButtonRenderer: options.pageButtonRenderer,
      sizePerPageRenderer: options.sizePerPageRenderer,
      paginationTotalRenderer: options.paginationTotalRenderer,
      sizePerPageOptionRenderer: options.sizePerPageOptionRenderer,
      firstPageText: options.firstPageText || _const2.default.FIRST_PAGE_TEXT,
      prePageText: options.prePageText || _const2.default.PRE_PAGE_TEXT,
      nextPageText: options.nextPageText || _const2.default.NEXT_PAGE_TEXT,
      lastPageText: options.lastPageText || _const2.default.LAST_PAGE_TEXT,
      prePageTitle: options.prePageTitle || _const2.default.PRE_PAGE_TITLE,
      nextPageTitle: options.nextPageTitle || _const2.default.NEXT_PAGE_TITLE,
      firstPageTitle: options.firstPageTitle || _const2.default.FIRST_PAGE_TITLE,
      lastPageTitle: options.lastPageTitle || _const2.default.LAST_PAGE_TITLE,
      onPageChange: _this2.handleChangePage,
      onSizePerPageChange: _this2.handleChangeSizePerPage
    });
  };

  this.setPaginationRemoteEmitter = function (remoteEmitter) {
    _this2.remoteEmitter = remoteEmitter;
  };

  this.getPaginationRemoteEmitter = function () {
    return _this2.remoteEmitter || _this2.props.remoteEmitter;
  };

  this.isRemotePagination = function () {
    var e = {};
    _this2.remoteEmitter.emit('isRemotePagination', e);
    return e.result;
  };
};

exports.default = function () {
  return {
    Provider: StateProvider,
    Consumer: StateContext.Consumer
  };
};