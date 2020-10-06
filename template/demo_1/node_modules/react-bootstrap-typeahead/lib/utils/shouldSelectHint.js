"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = shouldSelectHint;

var _isSelectable = _interopRequireDefault(require("./isSelectable"));

var _constants = require("../constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function shouldSelectHint(e, props) {
  var hintText = props.hintText,
      selectHintOnEnter = props.selectHintOnEnter,
      value = props.value;

  if (!hintText) {
    return false;
  }

  if (e.keyCode === _constants.RIGHT) {
    // For selectable input types ("text", "search"), only select the hint if
    // it's at the end of the input value. For non-selectable types ("email",
    // "number"), always select the hint.
    return (0, _isSelectable["default"])(e.target) ? e.target.selectionStart === value.length : true;
  }

  if (e.keyCode === _constants.TAB) {
    return true;
  }

  if (e.keyCode === _constants.RETURN && selectHintOnEnter) {
    return true;
  }

  return false;
}