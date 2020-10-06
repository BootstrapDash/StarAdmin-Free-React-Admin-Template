"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.popoverStore = exports.PopoverStore = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

class PopoverStore {
  constructor() {
    (0, _defineProperty2.default)(this, "callback", null);
  }

  hide() {
    this.register(null);
  }

  register(cb) {
    if (this.callback) {
      this.callback();
    }

    this.callback = cb;
  }

  unregister(cb) {
    if (this.callback === cb) {
      this.callback = null;
    }
  }

}

exports.PopoverStore = PopoverStore;
var popoverStore = new PopoverStore();
exports.popoverStore = popoverStore;