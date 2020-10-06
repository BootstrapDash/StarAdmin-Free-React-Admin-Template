'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _sizePerPageDropdown = require('./size-per-page-dropdown');

var _sizePerPageDropdown2 = _interopRequireDefault(_sizePerPageDropdown);

var _standaloneAdapter = require('./standalone-adapter');

var _standaloneAdapter2 = _interopRequireDefault(_standaloneAdapter);

var _paginationHandler = require('./pagination-handler');

var _paginationHandler2 = _interopRequireDefault(_paginationHandler);

var _sizePerPageDropdownAdapter = require('./size-per-page-dropdown-adapter');

var _sizePerPageDropdownAdapter2 = _interopRequireDefault(_sizePerPageDropdownAdapter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SizePerPageDropdownStandalone = function SizePerPageDropdownStandalone(props) {
  return _react2.default.createElement(_sizePerPageDropdown2.default, props);
};

exports.default = (0, _standaloneAdapter2.default)((0, _paginationHandler2.default)((0, _sizePerPageDropdownAdapter2.default)(SizePerPageDropdownStandalone)));