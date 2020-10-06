'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _PropToggle = require('./PropToggle');

var _PropToggle2 = _interopRequireDefault(_PropToggle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var LifeCycleProvider = function LifeCycleProvider(_ref) {
  var isActive = _ref.isActive,
      props = _objectWithoutProperties(_ref, ['isActive']);

  return isActive ? _react2.default.createElement(_PropToggle2.default, props) : null;
};

LifeCycleProvider.defaultProps = _PropToggle.defaultProps;

exports.default = LifeCycleProvider;