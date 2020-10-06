'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _statelessOp = require('./statelessOp');

var _statelessOp2 = _interopRequireDefault(_statelessOp);

var _context = require('./src/search/context');

var _context2 = _interopRequireDefault(_context);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint no-param-reassign: 0 */

var ToolkitContext = _react2.default.createContext();

var ToolkitProvider = function (_statelessDecorator) {
  _inherits(ToolkitProvider, _statelessDecorator);

  function ToolkitProvider(props) {
    _classCallCheck(this, ToolkitProvider);

    var _this = _possibleConstructorReturn(this, (ToolkitProvider.__proto__ || Object.getPrototypeOf(ToolkitProvider)).call(this, props));

    var state = {};
    _this._ = null;
    _this.onClear = _this.onClear.bind(_this);
    _this.onSearch = _this.onSearch.bind(_this);
    _this.onColumnToggle = _this.onColumnToggle.bind(_this);
    _this.setDependencyModules = _this.setDependencyModules.bind(_this);

    if (props.columnToggle) {
      state.columnToggle = props.columns.reduce(function (obj, column) {
        obj[column.dataField] = !column.hidden;
        return obj;
      }, {});
    }
    state.searchText = _typeof(props.search) === 'object' ? props.search.defaultSearch || '' : '';
    _this.state = state;
    return _this;
  }

  // eslint-disable-next-line camelcase


  _createClass(ToolkitProvider, [{
    key: 'UNSAFE_componentWillReceiveProps',
    value: function UNSAFE_componentWillReceiveProps(nextProps) {
      var columnToggle = this.state.columnToggle;
      if (nextProps.columnToggle) {
        columnToggle = nextProps.columns.reduce(function (obj, column) {
          obj[column.dataField] = !column.hidden;
          return obj;
        }, {});
      } else {
        columnToggle = null;
      }
      this.setState(_extends({}, this.state, {
        columnToggle: columnToggle
      }));
    }
  }, {
    key: 'onSearch',
    value: function onSearch(searchText) {
      if (searchText !== this.state.searchText) {
        this.setState({ searchText: searchText });
      }
    }
  }, {
    key: 'onClear',
    value: function onClear() {
      this.setState({ searchText: '' });
    }
  }, {
    key: 'onColumnToggle',
    value: function onColumnToggle(dataField) {
      var columnToggle = this.state.columnToggle;

      columnToggle[dataField] = !columnToggle[dataField];
      this.setState(_extends({}, this.state, {
        columnToggle: columnToggle
      }));
    }
    /**
     * 
     * @param {*} _ 
     * this function will be called only one time when table render
     * react-bootstrap-table-next/src/context/index.js will call this cb for passing the _ module
     * Please consider to extract a common module to handle _ module.
     * this is just a quick fix
     */

  }, {
    key: 'setDependencyModules',
    value: function setDependencyModules(_) {
      this._ = _;
    }
  }, {
    key: 'render',
    value: function render() {
      var baseProps = {
        keyField: this.props.keyField,
        columns: this.props.columns,
        data: this.props.data,
        bootstrap4: this.props.bootstrap4,
        setDependencyModules: this.setDependencyModules,
        registerExposedAPI: this.registerExposedAPI
      };
      if (this.props.search) {
        baseProps.search = {
          searchContext: (0, _context2.default)(this.props.search),
          searchText: this.state.searchText
        };
      }
      if (this.props.columnToggle) {
        baseProps.columnToggle = {
          toggles: this.state.columnToggle
        };
      }
      return _react2.default.createElement(
        ToolkitContext.Provider,
        { value: {
            searchProps: {
              searchText: this.state.searchText,
              onSearch: this.onSearch,
              onClear: this.onClear
            },
            csvProps: {
              onExport: this.handleExportCSV
            },
            columnToggleProps: {
              columns: this.props.columns,
              toggles: this.state.columnToggle,
              onColumnToggle: this.onColumnToggle
            },
            baseProps: baseProps
          }
        },
        this.props.children
      );
    }
  }]);

  return ToolkitProvider;
}((0, _statelessOp2.default)(_react2.default.Component));

ToolkitProvider.propTypes = {
  keyField: _propTypes2.default.string.isRequired,
  data: _propTypes2.default.array.isRequired,
  columns: _propTypes2.default.array.isRequired,
  children: _propTypes2.default.node.isRequired,
  bootstrap4: _propTypes2.default.bool,
  search: _propTypes2.default.oneOfType([_propTypes2.default.bool, _propTypes2.default.shape({
    defaultSearch: _propTypes2.default.string,
    searchFormatted: _propTypes2.default.bool
  })]),
  exportCSV: _propTypes2.default.oneOfType([_propTypes2.default.bool, _propTypes2.default.shape({
    fileName: _propTypes2.default.string,
    separator: _propTypes2.default.string,
    ignoreHeader: _propTypes2.default.bool,
    ignoreFooter: _propTypes2.default.bool,
    noAutoBOM: _propTypes2.default.bool,
    blobType: _propTypes2.default.string,
    exportAll: _propTypes2.default.bool,
    onlyExportFiltered: _propTypes2.default.bool,
    onlyExportSelection: _propTypes2.default.bool
  })])
};
ToolkitProvider.defaultProps = {
  search: false,
  exportCSV: false,
  bootstrap4: false
};
exports.default = {
  Provider: ToolkitProvider,
  Consumer: ToolkitContext.Consumer
};