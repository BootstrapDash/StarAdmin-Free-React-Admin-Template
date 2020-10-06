'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ClearButton = function ClearButton(_ref) {
  var onClear = _ref.onClear,
      text = _ref.text,
      className = _ref.className;
  return _react2.default.createElement(
    'button',
    { className: 'btn btn-default ' + className, onClick: onClear },
    text
  );
};

ClearButton.propTypes = {
  onClear: _propTypes2.default.func.isRequired,
  className: _propTypes2.default.string,
  text: _propTypes2.default.string
};

ClearButton.defaultProps = {
  text: 'Clear',
  className: ''
};

exports.default = ClearButton;