"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _asyncContainer = _interopRequireDefault(require("./containers/asyncContainer"));

var _Typeahead = _interopRequireDefault(require("./Typeahead.react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = (0, _asyncContainer["default"])(_Typeahead["default"]);

exports["default"] = _default;