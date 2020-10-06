"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = isShown;

function isShown(results, props) {
  var emptyLabel = props.emptyLabel,
      open = props.open,
      minLength = props.minLength,
      showMenu = props.showMenu,
      text = props.text; // If menu visibility is controlled via props, that value takes precedence.

  if (open || open === false) {
    return open;
  }

  if (!showMenu) {
    return false;
  }

  if (text.length < minLength) {
    return false;
  }

  return !!(results.length || emptyLabel);
}