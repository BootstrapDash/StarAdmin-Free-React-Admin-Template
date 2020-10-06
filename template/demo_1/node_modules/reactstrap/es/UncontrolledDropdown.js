import _objectSpread2 from "@babel/runtime/helpers/esm/objectSpread";
import _extends from "@babel/runtime/helpers/esm/extends";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dropdown from './Dropdown';
import { omit } from './utils';
var omitKeys = ['defaultOpen'];

var UncontrolledDropdown =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(UncontrolledDropdown, _Component);

  function UncontrolledDropdown(props) {
    var _this;

    _this = _Component.call(this, props) || this;
    _this.state = {
      isOpen: props.defaultOpen || false
    };
    _this.toggle = _this.toggle.bind(_assertThisInitialized(_this));
    return _this;
  }

  var _proto = UncontrolledDropdown.prototype;

  _proto.toggle = function toggle(e) {
    this.setState({
      isOpen: !this.state.isOpen
    });

    if (this.props.onToggle) {
      this.props.onToggle(e, !this.state.isOpen);
    }
  };

  _proto.render = function render() {
    return React.createElement(Dropdown, _extends({
      isOpen: this.state.isOpen,
      toggle: this.toggle
    }, omit(this.props, omitKeys)));
  };

  return UncontrolledDropdown;
}(Component);

export { UncontrolledDropdown as default };
UncontrolledDropdown.propTypes = _objectSpread2({
  defaultOpen: PropTypes.bool,
  onToggle: PropTypes.func
}, Dropdown.propTypes);