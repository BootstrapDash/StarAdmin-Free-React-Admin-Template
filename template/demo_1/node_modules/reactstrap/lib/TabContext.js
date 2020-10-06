"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.TabContext = void 0;

var _react = _interopRequireDefault(require("react"));

/**
 * TabContext
 * {
 *  activeTabId: PropTypes.any
 * }
 */
var TabContext = _react.default.createContext({});

exports.TabContext = TabContext;