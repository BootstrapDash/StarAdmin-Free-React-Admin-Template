"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = selectedType;

var _warn = _interopRequireDefault(require("../utils/warn"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function selectedType(props, propName, componentName) {
  var onChange = props.onChange,
      selected = props.selected;
  (0, _warn["default"])(!selected || selected && typeof onChange === 'function', 'You provided a `selected` prop without an `onChange` handler. If you ' + 'want the typeahead to be uncontrolled, use `defaultSelected`. ' + 'Otherwise, set `onChange`.');
}