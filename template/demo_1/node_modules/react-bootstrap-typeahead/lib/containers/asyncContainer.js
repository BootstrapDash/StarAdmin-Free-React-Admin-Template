"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _debounce = _interopRequireDefault(require("lodash/debounce"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _propTypes2 = require("../propTypes");

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var DEFAULT_DELAY_MS = 200;
/**
 * HoC that encapsulates common behavior and functionality for doing
 * asynchronous searches, including:
 *
 *  - Debouncing user input
 *  - Optional query caching
 *  - Search prompt and empty results behaviors
 */

var asyncContainer = function asyncContainer(Typeahead) {
  var WrappedTypeahead =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits(WrappedTypeahead, _React$Component);

    function WrappedTypeahead() {
      var _getPrototypeOf2;

      var _this;

      _classCallCheck(this, WrappedTypeahead);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(WrappedTypeahead)).call.apply(_getPrototypeOf2, [this].concat(args)));

      _defineProperty(_assertThisInitialized(_this), "_cache", {});

      _defineProperty(_assertThisInitialized(_this), "_query", _this.props.defaultInputValue || '');

      _defineProperty(_assertThisInitialized(_this), "_getEmptyLabel", function () {
        var _this$props = _this.props,
            emptyLabel = _this$props.emptyLabel,
            isLoading = _this$props.isLoading,
            promptText = _this$props.promptText,
            searchText = _this$props.searchText;

        if (!_this._query.length) {
          return promptText;
        }

        if (isLoading) {
          return searchText;
        }

        return emptyLabel;
      });

      _defineProperty(_assertThisInitialized(_this), "_handleInputChange", function (query, e) {
        _this.props.onInputChange && _this.props.onInputChange(query, e);

        _this._handleSearchDebounced(query);
      });

      _defineProperty(_assertThisInitialized(_this), "_handleSearch", function (query) {
        _this._query = query;
        var _this$props2 = _this.props,
            minLength = _this$props2.minLength,
            onSearch = _this$props2.onSearch,
            useCache = _this$props2.useCache;

        if (!query || minLength && query.length < minLength) {
          return;
        } // Use cached results, if applicable.


        if (useCache && _this._cache[query]) {
          // Re-render the component with the cached results.
          _this.forceUpdate();

          return;
        } // Perform the search.


        onSearch(query);
      });

      return _this;
    }

    _createClass(WrappedTypeahead, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        this._handleSearchDebounced = (0, _debounce["default"])(this._handleSearch, this.props.delay);
      }
    }, {
      key: "componentDidUpdate",
      value: function componentDidUpdate(prevProps, prevState) {
        if (prevProps.isLoading && this.props.useCache) {
          this._cache[this._query] = this.props.options;
        }
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        this._cache = {};
        this._query = '';

        this._handleSearchDebounced.cancel();
      }
    }, {
      key: "render",
      value: function render() {
        var _this2 = this;

        var _this$props3 = this.props,
            options = _this$props3.options,
            useCache = _this$props3.useCache,
            props = _objectWithoutProperties(_this$props3, ["options", "useCache"]);

        var cachedQuery = this._cache[this._query]; // Disable custom selections during a search unless `allowNew` is a
        // function.

        var allowNew = typeof props.allowNew === 'function' ? props.allowNew : props.allowNew && !props.isLoading;
        return _react["default"].createElement(Typeahead, _extends({}, props, {
          allowNew: allowNew,
          emptyLabel: this._getEmptyLabel(),
          onInputChange: this._handleInputChange,
          options: useCache && cachedQuery ? cachedQuery : options,
          ref: function ref(instance) {
            return _this2._instance = instance;
          }
        }));
      }
      /**
       * Make the component instance available.
       */

    }, {
      key: "getInstance",
      value: function getInstance() {
        return this._instance;
      }
    }]);

    return WrappedTypeahead;
  }(_react["default"].Component);

  WrappedTypeahead.displayName = "AsyncContainer(".concat((0, _utils.getDisplayName)(Typeahead), ")");
  WrappedTypeahead.propTypes = {
    /**
     * Delay, in milliseconds, before performing search.
     */
    delay: _propTypes["default"].number,

    /**
     * Whether or not a request is currently pending. Necessary for the
     * container to know when new results are available.
     */
    isLoading: _propTypes["default"].bool.isRequired,

    /**
     * Number of input characters that must be entered before showing results.
     */
    minLength: _propTypes["default"].number,

    /**
     * Callback to perform when the search is executed.
     */
    onSearch: _propTypes["default"].func.isRequired,

    /**
     * Options to be passed to the typeahead. Will typically be the query
     * results, but can also be initial default options.
     */
    options: _propTypes2.optionType,

    /**
     * Message displayed in the menu when there is no user input.
     */
    promptText: _propTypes["default"].node,

    /**
     * Message displayed in the menu while the request is pending.
     */
    searchText: _propTypes["default"].node,

    /**
     * Whether or not the component should cache query results.
     */
    useCache: _propTypes["default"].bool
  };
  WrappedTypeahead.defaultProps = {
    delay: DEFAULT_DELAY_MS,
    minLength: 2,
    options: [],
    promptText: 'Type to search...',
    searchText: 'Searching...',
    useCache: true
  };
  return WrappedTypeahead;
};

var _default = asyncContainer;
exports["default"] = _default;