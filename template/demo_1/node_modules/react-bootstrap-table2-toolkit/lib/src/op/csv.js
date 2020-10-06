'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _exporter = require('../csv/exporter');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var csvDefaultOptions = {
  fileName: 'spreadsheet.csv',
  separator: ',',
  ignoreHeader: false,
  ignoreFooter: true,
  noAutoBOM: true,
  blobType: 'text/plain;charset=utf-8',
  exportAll: true,
  onlyExportSelection: false
};

exports.default = function (Base) {
  return function (_Base) {
    _inherits(CSVOperation, _Base);

    function CSVOperation() {
      var _ref;

      var _temp, _this, _ret;

      _classCallCheck(this, CSVOperation);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = CSVOperation.__proto__ || Object.getPrototypeOf(CSVOperation)).call.apply(_ref, [this].concat(args))), _this), _this.handleExportCSV = function (source) {
        var _this$props = _this.props,
            columns = _this$props.columns,
            exportCSV = _this$props.exportCSV,
            keyField = _this$props.keyField;

        var meta = (0, _exporter.getMetaInfo)(columns);
        var options = exportCSV === true ? csvDefaultOptions : _extends({}, csvDefaultOptions, exportCSV);

        // get data for csv export
        var data = void 0;
        if (typeof source !== 'undefined') {
          data = source;
        } else if (options.exportAll) {
          data = _this.props.data;
        } else if (options.onlyExportFiltered) {
          var payload = {};
          _this.tableExposedAPIEmitter.emit('get.filtered.rows', payload);
          data = payload.result;
        } else {
          var _payload = {};
          _this.tableExposedAPIEmitter.emit('get.table.data', _payload);
          data = _payload.result;
        }

        // filter data by row selection
        if (options.onlyExportSelection) {
          var _payload2 = {};
          _this.tableExposedAPIEmitter.emit('get.selected.rows', _payload2);
          var selections = _payload2.result;
          data = data.filter(function (row) {
            return !!selections.find(function (sel) {
              return row[keyField] === sel;
            });
          });
        }

        var content = (0, _exporter.transform)(data, meta, columns, _this._, options);
        (0, _exporter.save)(content, options);
      }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    return CSVOperation;
  }(Base);
};