"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = inputPropsType;

var _isPlainObject = _interopRequireDefault(require("lodash/isPlainObject"));

var _warn = _interopRequireDefault(require("../utils/warn"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var BLACKLIST = [{
  alt: 'onBlur',
  prop: 'onBlur'
}, {
  alt: 'onInputChange',
  prop: 'onChange'
}, {
  alt: 'onFocus',
  prop: 'onFocus'
}, {
  alt: 'onKeyDown',
  prop: 'onKeyDown'
}];

function inputPropsType(props, propName, componentName) {
  var inputProps = props.inputProps;

  if (!(inputProps && (0, _isPlainObject["default"])(inputProps))) {
    return;
  } // Blacklisted properties.


  BLACKLIST.forEach(function (_ref) {
    var alt = _ref.alt,
        prop = _ref.prop;
    var msg = alt ? " Use the top-level `".concat(alt, "` prop instead.") : null;
    (0, _warn["default"])(!inputProps[prop], "The `".concat(prop, "` property of `inputProps` will be ignored.").concat(msg));
  });
}