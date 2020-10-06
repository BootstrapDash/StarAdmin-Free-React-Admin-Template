"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _classnames = _interopRequireDefault(require("classnames"));

var _redux = require("redux");

var _reduxLogger = _interopRequireDefault(require("redux-logger"));

var _v = _interopRequireDefault(require("uuid/v1"));

var _BoardContainer = _interopRequireDefault(require("./BoardContainer"));

var _createTranslate = _interopRequireDefault(require("../helpers/createTranslate"));

var _BoardReducer = _interopRequireDefault(require("../reducers/BoardReducer"));

const middlewares = process.env.REDUX_LOGGING ? [_reduxLogger.default] : [];

class Board extends _react.Component {
  constructor({
    id
  }) {
    super();
    (0, _defineProperty2.default)(this, "getStore", () => {
      //When you create multiple boards, unique stores are created for isolation
      return (0, _redux.createStore)(_BoardReducer.default, (0, _redux.applyMiddleware)(...middlewares));
    });
    this.store = this.getStore();
    this.id = id || (0, _v.default)();
  }

  render() {
    const _this$props = this.props,
          id = _this$props.id,
          className = _this$props.className,
          components = _this$props.components;
    const allClassNames = (0, _classnames.default)('react-trello-board', className || '');
    return _react.default.createElement(_reactRedux.Provider, {
      store: this.store
    }, _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(components.GlobalStyle, null), _react.default.createElement(_BoardContainer.default, (0, _extends2.default)({
      id: this.id
    }, this.props, {
      className: allClassNames
    }))));
  }

}

exports.default = Board;