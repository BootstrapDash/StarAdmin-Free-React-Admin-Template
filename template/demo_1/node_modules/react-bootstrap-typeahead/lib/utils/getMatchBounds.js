"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getMatchBounds;

var _escapeStringRegexp = _interopRequireDefault(require("escape-string-regexp"));

var _stripDiacritics = _interopRequireDefault(require("./stripDiacritics"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var CASE_INSENSITIVE = 'i';
var COMBINING_MARKS = /[\u0300-\u036F]/;

function getMatchBounds(subject, str) {
  var search = new RegExp((0, _escapeStringRegexp["default"])((0, _stripDiacritics["default"])(str)), CASE_INSENSITIVE);
  var matches = search.exec((0, _stripDiacritics["default"])(subject));

  if (!matches) {
    return null;
  }

  var start = matches.index;
  var matchLength = matches[0].length; // Account for combining marks, which changes the indices.

  if (COMBINING_MARKS.test(subject)) {
    // Starting at the beginning of the subject string, check for the number of
    // combining marks and increment the start index whenever one is found.
    for (var ii = 0; ii <= start; ii++) {
      if (COMBINING_MARKS.test(subject[ii])) {
        start += 1;
      }
    } // Similarly, increment the length of the match string if it contains a
    // combining mark.


    for (var _ii = start; _ii <= start + matchLength; _ii++) {
      if (COMBINING_MARKS.test(subject[_ii])) {
        matchLength += 1;
      }
    }
  }

  return {
    end: start + matchLength,
    start: start
  };
}