"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = idType;

var _warn = _interopRequireDefault(require("../utils/warn"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function idType(props, propName, componentName) {
  var id = props.id,
      menuId = props.menuId;
  (0, _warn["default"])(menuId == null, 'The `menuId` prop is deprecated. Use `id` instead.');
  (0, _warn["default"])(id != null, 'The `id` prop will be required in future versions to make the component ' + 'accessible for users of assistive technologies such as screen readers.');
}