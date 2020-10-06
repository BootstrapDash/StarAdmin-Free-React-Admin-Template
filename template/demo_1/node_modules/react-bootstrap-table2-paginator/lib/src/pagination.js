'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _pageResolver2 = require('./page-resolver');

var _pageResolver3 = _interopRequireDefault(_pageResolver2);

var _paginationHandler = require('./pagination-handler');

var _paginationHandler2 = _interopRequireDefault(_paginationHandler);

var _sizePerPageDropdownAdapter = require('./size-per-page-dropdown-adapter');

var _paginationListAdapter = require('./pagination-list-adapter');

var _paginationTotalAdapter = require('./pagination-total-adapter');

var _const = require('./const');

var _const2 = _interopRequireDefault(_const);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint react/require-default-props: 0 */
/* eslint arrow-body-style: 0 */


var Pagination = function (_pageResolver) {
  _inherits(Pagination, _pageResolver);

  function Pagination() {
    _classCallCheck(this, Pagination);

    return _possibleConstructorReturn(this, (Pagination.__proto__ || Object.getPrototypeOf(Pagination)).apply(this, arguments));
  }

  _createClass(Pagination, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          tableId = _props.tableId,
          currPage = _props.currPage,
          pageStartIndex = _props.pageStartIndex,
          showTotal = _props.showTotal,
          dataSize = _props.dataSize,
          pageListRenderer = _props.pageListRenderer,
          pageButtonRenderer = _props.pageButtonRenderer,
          paginationTotalRenderer = _props.paginationTotalRenderer,
          hidePageListOnlyOnePage = _props.hidePageListOnlyOnePage,
          totalPages = _props.totalPages,
          lastPage = _props.lastPage,
          onPageChange = _props.onPageChange,
          sizePerPageList = _props.sizePerPageList,
          currSizePerPage = _props.currSizePerPage,
          hideSizePerPage = _props.hideSizePerPage,
          sizePerPageRenderer = _props.sizePerPageRenderer,
          sizePerPageOptionRenderer = _props.sizePerPageOptionRenderer,
          onSizePerPageChange = _props.onSizePerPageChange,
          bootstrap4 = _props.bootstrap4,
          rest = _objectWithoutProperties(_props, ['tableId', 'currPage', 'pageStartIndex', 'showTotal', 'dataSize', 'pageListRenderer', 'pageButtonRenderer', 'paginationTotalRenderer', 'hidePageListOnlyOnePage', 'totalPages', 'lastPage', 'onPageChange', 'sizePerPageList', 'currSizePerPage', 'hideSizePerPage', 'sizePerPageRenderer', 'sizePerPageOptionRenderer', 'onSizePerPageChange', 'bootstrap4']);

      var pages = this.calculatePageStatus(this.calculatePages(totalPages, lastPage), lastPage);
      var pageListClass = (0, _classnames2.default)('react-bootstrap-table-pagination-list', 'col-md-6 col-xs-6 col-sm-6 col-lg-6', {
        'react-bootstrap-table-pagination-list-hidden': hidePageListOnlyOnePage && totalPages === 1
      });
      return _react2.default.createElement(
        'div',
        { className: 'row react-bootstrap-table-pagination' },
        _react2.default.createElement(
          'div',
          { className: 'col-md-6 col-xs-6 col-sm-6 col-lg-6' },
          _react2.default.createElement(_sizePerPageDropdownAdapter.SizePerPageDropdownWithAdapter, {
            bootstrap4: bootstrap4,
            tableId: tableId,
            sizePerPageList: sizePerPageList,
            currSizePerPage: currSizePerPage,
            hideSizePerPage: hideSizePerPage,
            sizePerPageRenderer: sizePerPageRenderer,
            sizePerPageOptionRenderer: sizePerPageOptionRenderer,
            onSizePerPageChange: onSizePerPageChange
          }),
          showTotal ? _react2.default.createElement(_paginationTotalAdapter.PaginationTotalWithAdapter, {
            currPage: currPage,
            currSizePerPage: currSizePerPage,
            pageStartIndex: pageStartIndex,
            dataSize: dataSize,
            paginationTotalRenderer: paginationTotalRenderer
          }) : null
        ),
        pageListRenderer ? pageListRenderer({
          pages: pages,
          onPageChange: onPageChange
        }) : _react2.default.createElement(
          'div',
          { className: pageListClass },
          _react2.default.createElement(_paginationListAdapter.PaginationListWithAdapter, _extends({}, rest, {
            currPage: currPage,
            currSizePerPage: currSizePerPage,
            pageStartIndex: pageStartIndex,
            lastPage: lastPage,
            totalPages: totalPages,
            pageButtonRenderer: pageButtonRenderer,
            onPageChange: onPageChange
          }))
        )
      );
    }
  }]);

  return Pagination;
}((0, _pageResolver3.default)(_react.Component));

Pagination.propTypes = {
  dataSize: _propTypes2.default.number.isRequired,
  sizePerPageList: _propTypes2.default.array.isRequired,
  currPage: _propTypes2.default.number.isRequired,
  currSizePerPage: _propTypes2.default.number.isRequired,
  onPageChange: _propTypes2.default.func.isRequired,
  onSizePerPageChange: _propTypes2.default.func.isRequired,
  disablePageTitle: _propTypes2.default.bool,
  pageStartIndex: _propTypes2.default.number,
  paginationSize: _propTypes2.default.number,
  showTotal: _propTypes2.default.bool,
  pageListRenderer: _propTypes2.default.func,
  pageButtonRenderer: _propTypes2.default.func,
  sizePerPageRenderer: _propTypes2.default.func,
  paginationTotalRenderer: _propTypes2.default.func,
  sizePerPageOptionRenderer: _propTypes2.default.func,
  firstPageText: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.node]),
  prePageText: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.node]),
  nextPageText: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.node]),
  lastPageText: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.node]),
  nextPageTitle: _propTypes2.default.string,
  prePageTitle: _propTypes2.default.string,
  firstPageTitle: _propTypes2.default.string,
  lastPageTitle: _propTypes2.default.string,
  withFirstAndLast: _propTypes2.default.bool,
  alwaysShowAllBtns: _propTypes2.default.bool,
  hideSizePerPage: _propTypes2.default.bool,
  hidePageListOnlyOnePage: _propTypes2.default.bool,
  bootstrap4: _propTypes2.default.bool
};

Pagination.defaultProps = {
  disablePageTitle: false,
  bootstrap4: false,
  pageStartIndex: _const2.default.PAGE_START_INDEX,
  paginationSize: _const2.default.PAGINATION_SIZE,
  withFirstAndLast: _const2.default.With_FIRST_AND_LAST,
  alwaysShowAllBtns: _const2.default.SHOW_ALL_PAGE_BTNS,
  showTotal: _const2.default.SHOW_TOTAL,
  pageListRenderer: null,
  pageButtonRenderer: null,
  sizePerPageRenderer: null,
  paginationTotalRenderer: _const2.default.PAGINATION_TOTAL,
  sizePerPageOptionRenderer: null,
  firstPageText: _const2.default.FIRST_PAGE_TEXT,
  prePageText: _const2.default.PRE_PAGE_TEXT,
  nextPageText: _const2.default.NEXT_PAGE_TEXT,
  lastPageText: _const2.default.LAST_PAGE_TEXT,
  sizePerPageList: _const2.default.SIZE_PER_PAGE_LIST,
  nextPageTitle: _const2.default.NEXT_PAGE_TITLE,
  prePageTitle: _const2.default.PRE_PAGE_TITLE,
  firstPageTitle: _const2.default.FIRST_PAGE_TITLE,
  lastPageTitle: _const2.default.LAST_PAGE_TITLE,
  hideSizePerPage: _const2.default.HIDE_SIZE_PER_PAGE,
  hidePageListOnlyOnePage: _const2.default.HIDE_PAGE_LIST_ONLY_ONE_PAGE
};

exports.default = (0, _paginationHandler2.default)(Pagination);