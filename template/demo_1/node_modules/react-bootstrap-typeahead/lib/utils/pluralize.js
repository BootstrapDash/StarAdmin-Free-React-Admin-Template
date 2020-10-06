"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = pluralize;

/**
 * Basic util for pluralizing words. By default, simply adds an 's' to the word.
 * Also allows for a custom plural version.
 */
function pluralize(text, count, plural) {
  var pluralText = plural || "".concat(text, "s");
  return "".concat(count, " ").concat(count === 1 ? text : pluralText);
}