import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { popoverStore } from './PopoverStore';
import {
  PopoverContainer as PopoverContainerDefault,
  PopoverTrigger as PopoverTriggerDefault,
  PopoverContent as PopoverContentDefault
} from './styles';

export default class Popover extends React.PureComponent {
  static propTypes = {
    children: PropTypes.node,
    trigger: PropTypes.any.isRequired,
    position: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
    onShow: PropTypes.func,
    onHide: PropTypes.func,
    PopoverContainer: PropTypes.elementType,
    PopoverTrigger: PropTypes.elementType,
    PopoverContent: PropTypes.elementType,
  };

  static defaultProps = {
    children: [],
    position: 'top',
    onShow: undefined,
    onHide: undefined,
    PopoverContainer: PopoverContainerDefault,
    PopoverTrigger: PopoverTriggerDefault,
    PopoverContent: PopoverContentDefault
  };

  state = {
    isPopoverShown: false,
  };

  componentWillUnmount = () => {
    popoverStore.unregister(this.hide);
  };

  show = (e) => {
    popoverStore.register(this.hide);
    this.setState({ isPopoverShown: true });
    if (this.props.onShow) {
      this.props.onShow(e);
    }
  };

  hide = (e) => {
    this.setState({ isPopoverShown: false });
    if (this.props.onHide) {
      this.props.onHide(e);
    }
  };

  toggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (this.state.isPopoverShown) {
      this.hide(e);
      popoverStore.unregister(this.hide);
    } else {
      this.show(e);
    }
  };

  render() {
    const { position, trigger, PopoverContent, PopoverTrigger, PopoverContainer } = this.props;
    const { isPopoverShown } = this.state;
    return (
      <PopoverContainer position={position} active={isPopoverShown}>
        <PopoverTrigger href='' onClick={this.toggle}>{trigger}</PopoverTrigger>
        <PopoverContent position={position} active={isPopoverShown}>{this.props.children}</PopoverContent>
      </PopoverContainer>
    );
  }
}
