"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _DeleteButton = _interopRequireDefault(require("./DeleteButton"));

var _EditableLabel = _interopRequireDefault(require("./EditableLabel"));

var _InlineInput = _interopRequireDefault(require("./InlineInput"));

var _default = {
  DeleteButton: _DeleteButton.default,
  EditableLabel: _EditableLabel.default,
  InlineInput: _InlineInput.default
};
exports.default = _default;