'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.editCell = undefined;

var _utils = require('../utils');

var _utils2 = _interopRequireDefault(_utils);

var _rows = require('./rows');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var editCell = exports.editCell = function editCell(data, keyField, rowId, dataField, newValue) {
  var row = (0, _rows.getRowByRowId)(data, keyField, rowId);
  if (row) _utils2.default.set(row, dataField, newValue);
};