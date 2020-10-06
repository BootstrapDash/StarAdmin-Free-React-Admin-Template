'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint jsx-a11y/href-no-hash: 0 */
var SizePerPageOption = function SizePerPageOption(_ref) {
  var text = _ref.text,
      page = _ref.page,
      onSizePerPageChange = _ref.onSizePerPageChange,
      bootstrap4 = _ref.bootstrap4;
  return bootstrap4 ? _react2.default.createElement(
    'a',
    {
      href: '#',
      tabIndex: '-1',
      role: 'menuitem',
      className: 'dropdown-item',
      'data-page': page,
      onMouseDown: function onMouseDown(e) {
        e.preventDefault();
        onSizePerPageChange(page);
      }
    },
    text
  ) : _react2.default.createElement(
    'li',
    {
      key: text,
      role: 'presentation',
      className: 'dropdown-item'
    },
    _react2.default.createElement(
      'a',
      {
        href: '#',
        tabIndex: '-1',
        role: 'menuitem',
        'data-page': page,
        onMouseDown: function onMouseDown(e) {
          e.preventDefault();
          onSizePerPageChange(page);
        }
      },
      text
    )
  );
};

SizePerPageOption.propTypes = {
  text: _propTypes2.default.string.isRequired,
  page: _propTypes2.default.number.isRequired,
  onSizePerPageChange: _propTypes2.default.func.isRequired,
  bootstrap4: _propTypes2.default.bool
};

SizePerPageOption.defaultProps = {
  bootstrap4: false
};

exports.default = SizePerPageOption;