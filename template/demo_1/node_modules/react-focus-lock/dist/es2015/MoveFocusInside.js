import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import PropTypes from 'prop-types';
import * as constants from 'focus-lock/constants';
import { inlineProp } from './util';
import { mediumEffect } from './medium';

function MoveFocusInside(_ref) {
  var isDisabled = _ref.disabled,
      className = _ref.className,
      children = _ref.children;
  var ref = React.useRef(null);
  var disabled = React.useRef(isDisabled);

  var moveFocus = function moveFocus() {
    var observed = ref.current;
    mediumEffect.useMedium(function (car) {
      if (!disabled.current && observed) {
        if (!car.focusInside(observed)) {
          car.moveFocusInside(observed, null);
        }
      }
    });
  };

  React.useEffect(function () {
    disabled.current = isDisabled;
    moveFocus();
  }, [isDisabled]);
  return React.createElement("div", _extends({}, inlineProp(constants.FOCUS_AUTO, !isDisabled), {
    ref: ref,
    className: className
  }), children);
}

MoveFocusInside.propTypes = process.env.NODE_ENV !== "production" ? {
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  className: PropTypes.string
} : {};
MoveFocusInside.defaultProps = {
  disabled: false,
  className: undefined
};
export default MoveFocusInside;