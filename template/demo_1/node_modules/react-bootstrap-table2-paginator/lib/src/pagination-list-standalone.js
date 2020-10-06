'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _paginationList = require('./pagination-list');

var _paginationList2 = _interopRequireDefault(_paginationList);

var _standaloneAdapter = require('./standalone-adapter');

var _standaloneAdapter2 = _interopRequireDefault(_standaloneAdapter);

var _paginationHandler = require('./pagination-handler');

var _paginationHandler2 = _interopRequireDefault(_paginationHandler);

var _paginationListAdapter = require('./pagination-list-adapter');

var _paginationListAdapter2 = _interopRequireDefault(_paginationListAdapter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PaginationListStandalone = function PaginationListStandalone(props) {
  return _react2.default.createElement(_paginationList2.default, props);
};

exports.default = (0, _standaloneAdapter2.default)((0, _paginationHandler2.default)((0, _paginationListAdapter2.default)(PaginationListStandalone)));