"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _utils = require("./utils");

var propTypes = {
  className: _propTypes.default.string,
  id: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]).isRequired,
  label: _propTypes.default.node,
  valid: _propTypes.default.bool,
  invalid: _propTypes.default.bool,
  bsSize: _propTypes.default.string,
  htmlFor: _propTypes.default.string,
  cssModule: _propTypes.default.object,
  onChange: _propTypes.default.func,
  children: _propTypes.default.oneOfType([_propTypes.default.node, _propTypes.default.array, _propTypes.default.func]),
  innerRef: _propTypes.default.oneOfType([_propTypes.default.object, _propTypes.default.string, _propTypes.default.func])
};

var CustomFileInput =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(CustomFileInput, _React$Component);

  function CustomFileInput(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;
    _this.state = {
      files: null
    };
    _this.onChange = _this.onChange.bind((0, _assertThisInitialized2.default)(_this));
    return _this;
  }

  var _proto = CustomFileInput.prototype;

  _proto.onChange = function onChange(e) {
    var input = e.target;
    var onChange = this.props.onChange;
    var files = this.getSelectedFiles(input);

    if (typeof onChange === 'function') {
      onChange.apply(void 0, arguments);
    }

    this.setState({
      files: files
    });
  };

  _proto.getSelectedFiles = function getSelectedFiles(input) {
    var multiple = this.props.multiple;

    if (multiple && input.files) {
      var files = [].slice.call(input.files);
      return files.map(function (file) {
        return file.name;
      }).join(', ');
    }

    if (input.value.indexOf('fakepath') !== -1) {
      var parts = input.value.split('\\');
      return parts[parts.length - 1];
    }

    return input.value;
  };

  _proto.render = function render() {
    var _this$props = this.props,
        className = _this$props.className,
        label = _this$props.label,
        valid = _this$props.valid,
        invalid = _this$props.invalid,
        cssModule = _this$props.cssModule,
        children = _this$props.children,
        bsSize = _this$props.bsSize,
        innerRef = _this$props.innerRef,
        htmlFor = _this$props.htmlFor,
        type = _this$props.type,
        onChange = _this$props.onChange,
        dataBrowse = _this$props.dataBrowse,
        attributes = (0, _objectWithoutPropertiesLoose2.default)(_this$props, ["className", "label", "valid", "invalid", "cssModule", "children", "bsSize", "innerRef", "htmlFor", "type", "onChange", "dataBrowse"]);
    var customClass = (0, _utils.mapToCssModules)((0, _classnames.default)(className, "custom-file"), cssModule);
    var validationClassNames = (0, _utils.mapToCssModules)((0, _classnames.default)(invalid && 'is-invalid', valid && 'is-valid'), cssModule);
    var labelHtmlFor = htmlFor || attributes.id;
    var files = this.state.files;
    return _react.default.createElement("div", {
      className: customClass
    }, _react.default.createElement("input", (0, _extends2.default)({
      type: "file"
    }, attributes, {
      ref: innerRef,
      className: (0, _classnames.default)(validationClassNames, (0, _utils.mapToCssModules)('custom-file-input', cssModule)),
      onChange: this.onChange
    })), _react.default.createElement("label", {
      className: (0, _utils.mapToCssModules)('custom-file-label', cssModule),
      htmlFor: labelHtmlFor,
      "data-browse": dataBrowse
    }, files || label || 'Choose file'), children);
  };

  return CustomFileInput;
}(_react.default.Component);

CustomFileInput.propTypes = propTypes;
var _default = CustomFileInput;
exports.default = _default;