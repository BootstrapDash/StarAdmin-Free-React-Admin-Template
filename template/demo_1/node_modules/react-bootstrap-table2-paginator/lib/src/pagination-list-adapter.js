'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PaginationListWithAdapter = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _pageResolver2 = require('./page-resolver');

var _pageResolver3 = _interopRequireDefault(_pageResolver2);

var _paginationList = require('./pagination-list');

var _paginationList2 = _interopRequireDefault(_paginationList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint react/prop-types: 0 */


var paginationListAdapter = function paginationListAdapter(WrappedComponent) {
  return function (_pageResolver) {
    _inherits(PaginationListAdapter, _pageResolver);

    function PaginationListAdapter() {
      _classCallCheck(this, PaginationListAdapter);

      return _possibleConstructorReturn(this, (PaginationListAdapter.__proto__ || Object.getPrototypeOf(PaginationListAdapter)).apply(this, arguments));
    }

    _createClass(PaginationListAdapter, [{
      key: 'render',
      value: function render() {
        var _props = this.props,
            lastPage = _props.lastPage,
            totalPages = _props.totalPages,
            pageButtonRenderer = _props.pageButtonRenderer,
            onPageChange = _props.onPageChange,
            disablePageTitle = _props.disablePageTitle,
            hidePageListOnlyOnePage = _props.hidePageListOnlyOnePage;

        var pages = this.calculatePageStatus(this.calculatePages(totalPages, lastPage), lastPage, disablePageTitle);
        if (totalPages === 1 && hidePageListOnlyOnePage) {
          return null;
        }
        return _react2.default.createElement(WrappedComponent, {
          pageButtonRenderer: pageButtonRenderer,
          onPageChange: onPageChange,
          pages: pages
        });
      }
    }]);

    return PaginationListAdapter;
  }((0, _pageResolver3.default)(_react.Component));
};

var PaginationListWithAdapter = exports.PaginationListWithAdapter = paginationListAdapter(_paginationList2.default);
exports.default = paginationListAdapter;