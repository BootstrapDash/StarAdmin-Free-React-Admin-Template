'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PaginationTotal = function PaginationTotal(props) {
  if (props.paginationTotalRenderer) {
    return props.paginationTotalRenderer(props.from, props.to, props.dataSize);
  }
  return _react2.default.createElement(
    'span',
    { className: 'react-bootstrap-table-pagination-total' },
    '\xA0Showing rows ',
    props.from,
    ' to\xA0',
    props.to,
    ' of\xA0',
    props.dataSize
  );
};

PaginationTotal.propTypes = {
  from: _propTypes2.default.number.isRequired,
  to: _propTypes2.default.number.isRequired,
  dataSize: _propTypes2.default.number.isRequired,
  paginationTotalRenderer: _propTypes2.default.func
};

PaginationTotal.defaultProps = {
  paginationTotalRenderer: undefined
};

exports.default = PaginationTotal;