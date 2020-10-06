"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = TabPane;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _TabContext = require("./TabContext");

var _utils = require("./utils");

var propTypes = {
  tag: _utils.tagPropType,
  className: _propTypes.default.string,
  cssModule: _propTypes.default.object,
  tabId: _propTypes.default.any
};
var defaultProps = {
  tag: 'div'
};

function TabPane(props) {
  var className = props.className,
      cssModule = props.cssModule,
      tabId = props.tabId,
      Tag = props.tag,
      attributes = (0, _objectWithoutPropertiesLoose2.default)(props, ["className", "cssModule", "tabId", "tag"]);

  var getClasses = function getClasses(activeTabId) {
    return (0, _utils.mapToCssModules)((0, _classnames.default)('tab-pane', className, {
      active: tabId === activeTabId
    }), cssModule);
  };

  return _react.default.createElement(_TabContext.TabContext.Consumer, null, function (_ref) {
    var activeTabId = _ref.activeTabId;
    return _react.default.createElement(Tag, (0, _extends2.default)({}, attributes, {
      className: getClasses(activeTabId)
    }));
  });
}

TabPane.propTypes = propTypes;
TabPane.defaultProps = defaultProps;