'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.save = exports.transform = exports.getMetaInfo = undefined;

var _fileSaver = require('file-saver');

var _fileSaver2 = _interopRequireDefault(_fileSaver);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getMetaInfo = exports.getMetaInfo = function getMetaInfo(columns) {
  return columns.map(function (column) {
    return {
      field: column.dataField,
      type: column.csvType || String,
      formatter: column.csvFormatter,
      formatExtraData: column.formatExtraData,
      header: column.csvText || column.text,
      export: column.csvExport === false ? false : true,
      row: Number(column.row) || 0,
      rowSpan: Number(column.rowSpan) || 1,
      colSpan: Number(column.colSpan) || 1,
      footer: column.footer,
      footerFormatter: column.footerFormatter
    };
  }).filter(function (_) {
    return _.export;
  });
}; /* eslint no-unneeded-ternary: 0 */
var transform = exports.transform = function transform(data, meta, columns, _, _ref) {
  var separator = _ref.separator,
      ignoreHeader = _ref.ignoreHeader,
      ignoreFooter = _ref.ignoreFooter;

  var visibleColumns = meta.filter(function (m) {
    return m.export;
  });
  var content = '';
  // extract csv header
  if (!ignoreHeader) {
    content += visibleColumns.map(function (m) {
      return '"' + m.header + '"';
    }).join(separator);
    content += '\n';
  }
  // extract csv body
  if (data.length === 0) return content;
  content += data.map(function (row, rowIndex) {
    return visibleColumns.map(function (m) {
      var cellContent = _.get(row, m.field);
      if (m.formatter) {
        cellContent = m.formatter(cellContent, row, rowIndex, m.formatExtraData);
      }
      if (m.type === String) {
        return '"' + ('' + cellContent).replace(/"/g, '""') + '"';
      }
      return cellContent;
    }).join(separator);
  }).join('\n');

  if (!ignoreFooter) {
    content += '\n';
    content += visibleColumns.map(function (m, i) {
      if (typeof m.footer === 'function') {
        var columnData = _.pluck(data, columns[i].dataField);
        return '"' + m.footer(columnData, columns[i], i) + '"';
      } else if (m.footerFormatter) {
        return '"' + m.footerFormatter(columns[i], i) + '"';
      }
      return '"' + m.footer + '"';
    }).join(separator);
  }
  return content;
};

var save = exports.save = function save(content, _ref2) {
  var noAutoBOM = _ref2.noAutoBOM,
      fileName = _ref2.fileName,
      blobType = _ref2.blobType;

  _fileSaver2.default.saveAs(new Blob([content], { type: blobType }), fileName, noAutoBOM);
};