import React from 'react';
import PropTypes from 'prop-types';
import { popoverStore } from './PopoverStore';

export default class PopoverWrapper extends React.PureComponent {
  static propTypes = {
    children: PropTypes.node,
  };

  static defaultProps = {
    children: [],
  };

  hidePopovers() {
    popoverStore.hide();
  }

  render() {
    return (
      <div onClick={this.hidePopovers} onTouchEnd={this.hidePopovers} {...this.props}>
        {this.props.children}
      </div>
    );
  }
}
