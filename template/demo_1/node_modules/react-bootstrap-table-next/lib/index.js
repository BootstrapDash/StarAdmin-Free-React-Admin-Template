'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bootstrapTable = require('./src/bootstrap-table');

var _bootstrapTable2 = _interopRequireDefault(_bootstrapTable);

var _contexts = require('./src/contexts');

var _contexts2 = _interopRequireDefault(_contexts);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _contexts2.default)(_bootstrapTable2.default);