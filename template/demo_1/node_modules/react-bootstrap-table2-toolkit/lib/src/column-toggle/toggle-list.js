'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ToggleList = function ToggleList(_ref) {
  var columns = _ref.columns,
      onColumnToggle = _ref.onColumnToggle,
      toggles = _ref.toggles,
      contextual = _ref.contextual,
      className = _ref.className,
      btnClassName = _ref.btnClassName;
  return _react2.default.createElement(
    'div',
    { className: 'btn-group btn-group-toggle ' + className, 'data-toggle': 'buttons' },
    columns.map(function (column) {
      return _extends({}, column, {
        toggle: toggles[column.dataField]
      });
    }).map(function (column) {
      return _react2.default.createElement(
        'button',
        {
          type: 'button',
          key: column.dataField,
          className: btnClassName + ' btn btn-' + contextual + ' ' + (column.toggle ? 'active' : ''),
          'data-toggle': 'button',
          'aria-pressed': column.toggle ? 'true' : 'false',
          onClick: function onClick() {
            return onColumnToggle(column.dataField);
          }
        },
        column.text
      );
    })
  );
};

ToggleList.propTypes = {
  columns: _propTypes2.default.array.isRequired,
  toggles: _propTypes2.default.object.isRequired,
  onColumnToggle: _propTypes2.default.func.isRequired,
  btnClassName: _propTypes2.default.string,
  className: _propTypes2.default.string,
  contextual: _propTypes2.default.string
};

ToggleList.defaultProps = {
  btnClassName: '',
  className: '',
  contextual: 'primary'
};

exports.default = ToggleList;