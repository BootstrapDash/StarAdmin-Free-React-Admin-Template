'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _paginationTotal = require('./pagination-total');

var _paginationTotal2 = _interopRequireDefault(_paginationTotal);

var _standaloneAdapter = require('./standalone-adapter');

var _standaloneAdapter2 = _interopRequireDefault(_standaloneAdapter);

var _paginationTotalAdapter = require('./pagination-total-adapter');

var _paginationTotalAdapter2 = _interopRequireDefault(_paginationTotalAdapter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PaginationTotalStandalone = function PaginationTotalStandalone(props) {
  return _react2.default.createElement(_paginationTotal2.default, props);
};

exports.default = (0, _standaloneAdapter2.default)((0, _paginationTotalAdapter2.default)(PaginationTotalStandalone));