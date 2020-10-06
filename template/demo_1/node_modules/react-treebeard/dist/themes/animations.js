"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  toggle: function toggle(_ref) {
    var toggled = _ref.node.toggled;
    var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 300;
    return {
      animation: {
        rotateZ: toggled ? 90 : 0
      },
      duration: duration
    };
  },
  drawer: function drawer() {
    return (
      /* props */
      {
        enter: {
          animation: 'slideDown',
          duration: 300
        },
        leave: {
          animation: 'slideUp',
          duration: 300
        }
      }
    );
  }
};
exports["default"] = _default;