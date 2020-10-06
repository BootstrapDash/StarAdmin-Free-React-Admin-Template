'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PaginationTotalStandalone = exports.SizePerPageDropdownStandalone = exports.PaginationListStandalone = exports.PaginationProvider = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _stateContext = require('./src/state-context');

var _stateContext2 = _interopRequireDefault(_stateContext);

var _dataContext = require('./src/data-context');

var _dataContext2 = _interopRequireDefault(_dataContext);

var _paginationListStandalone = require('./src/pagination-list-standalone');

var _paginationListStandalone2 = _interopRequireDefault(_paginationListStandalone);

var _sizePerPageDropdownStandalone = require('./src/size-per-page-dropdown-standalone');

var _sizePerPageDropdownStandalone2 = _interopRequireDefault(_sizePerPageDropdownStandalone);

var _paginationTotalStandalone = require('./src/pagination-total-standalone');

var _paginationTotalStandalone2 = _interopRequireDefault(_paginationTotalStandalone);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return {
    createContext: _dataContext2.default,
    options: options
  };
};

var _createBaseContext = (0, _stateContext2.default)(),
    Provider = _createBaseContext.Provider,
    Consumer = _createBaseContext.Consumer;

var CustomizableProvider = function CustomizableProvider(props) {
  return _react2.default.createElement(
    Provider,
    props,
    _react2.default.createElement(
      Consumer,
      null,
      function (paginationProps) {
        return props.children(paginationProps);
      }
    )
  );
};

CustomizableProvider.propTypes = {
  children: _propTypes2.default.func.isRequired
};

var PaginationProvider = exports.PaginationProvider = CustomizableProvider;
exports.PaginationListStandalone = _paginationListStandalone2.default;
exports.SizePerPageDropdownStandalone = _sizePerPageDropdownStandalone2.default;
exports.PaginationTotalStandalone = _paginationTotalStandalone2.default;