"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DEFAULT_LABELKEY = exports.DOWN = exports.RIGHT = exports.UP = exports.LEFT = exports.SPACE = exports.ESC = exports.RETURN = exports.TAB = exports.BACKSPACE = void 0;

/**
 * Common (non-printable) keycodes for `keydown` and `keyup` events. Note that
 * `keypress` handles things differently and may not return the same values.
 */
var BACKSPACE = 8;
exports.BACKSPACE = BACKSPACE;
var TAB = 9;
exports.TAB = TAB;
var RETURN = 13;
exports.RETURN = RETURN;
var ESC = 27;
exports.ESC = ESC;
var SPACE = 32;
exports.SPACE = SPACE;
var LEFT = 37;
exports.LEFT = LEFT;
var UP = 38;
exports.UP = UP;
var RIGHT = 39;
exports.RIGHT = RIGHT;
var DOWN = 40;
exports.DOWN = DOWN;
var DEFAULT_LABELKEY = 'label';
exports.DEFAULT_LABELKEY = DEFAULT_LABELKEY;