"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _head = _interopRequireDefault(require("lodash/head"));

var _isEqual = _interopRequireDefault(require("lodash/isEqual"));

var _noop = _interopRequireDefault(require("lodash/noop"));

var _uniqueId = _interopRequireDefault(require("lodash/uniqueId"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _deprecated = _interopRequireDefault(require("prop-types-extra/lib/deprecated"));

var _react = _interopRequireDefault(require("react"));

var _RootCloseWrapper = _interopRequireDefault(require("react-overlays/lib/RootCloseWrapper"));

var _contextContainer = _interopRequireDefault(require("./contextContainer"));

var _propTypes2 = require("../propTypes");

var _utils = require("../utils");

var _constants = require("../constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function genId() {
  var prefix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return prefix + Math.random().toString(36).substr(2, 12);
}

function isBodyMenuClick(e, props) {
  if (!props.bodyContainer && !props.positionFixed) {
    return false;
  }

  var target = e.target;

  while (target && target !== document.body) {
    if (target.className && typeof target.className === 'string' && target.className.indexOf('rbt-menu') > -1) {
      return true;
    }

    target = target.parentNode;
  }

  return false;
}

function getInitialState(props) {
  var defaultInputValue = props.defaultInputValue,
      defaultOpen = props.defaultOpen,
      defaultSelected = props.defaultSelected,
      maxResults = props.maxResults,
      multiple = props.multiple;
  var selected = props.selected ? props.selected.slice() : defaultSelected.slice();
  var text = defaultInputValue;

  if (!multiple && selected.length) {
    // Set the text if an initial selection is passed in.
    text = (0, _utils.getOptionLabel)((0, _head["default"])(selected), props.labelKey);

    if (selected.length > 1) {
      // Limit to 1 selection in single-select mode.
      selected = selected.slice(0, 1);
    }
  }

  return {
    activeIndex: -1,
    activeItem: null,
    initialItem: null,
    isFocused: false,
    selected: selected,
    showMenu: defaultOpen,
    shownResults: maxResults,
    text: text
  };
}

function skipDisabledOptions(results, activeIndex, keyCode) {
  var newActiveIndex = activeIndex;

  while (results[newActiveIndex] && results[newActiveIndex].disabled) {
    newActiveIndex += keyCode === _constants.UP ? -1 : 1;
  }

  return newActiveIndex;
}

function typeaheadContainer(Component) {
  var Typeahead = (0, _contextContainer["default"])(Component);

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

      _defineProperty(_assertThisInitialized(_this), "state", getInitialState(_this.props));

      _defineProperty(_assertThisInitialized(_this), "_menuId", genId('rbt-menu-'));

      _defineProperty(_assertThisInitialized(_this), "blur", function () {
        _this.getInput().blur();

        _this._hideMenu();
      });

      _defineProperty(_assertThisInitialized(_this), "clear", function () {
        _this.setState(function (state, props) {
          return _objectSpread({}, getInitialState(props), {
            isFocused: state.isFocused,
            selected: [],
            text: ''
          });
        });
      });

      _defineProperty(_assertThisInitialized(_this), "focus", function () {
        _this.getInput().focus();
      });

      _defineProperty(_assertThisInitialized(_this), "getInput", function () {
        return _this._input;
      });

      _defineProperty(_assertThisInitialized(_this), "getInstance", function () {
        return _assertThisInitialized(_this);
      });

      _defineProperty(_assertThisInitialized(_this), "_handleActiveIndexChange", function (activeIndex) {
        var newState = {
          activeIndex: activeIndex
        };

        if (activeIndex === -1) {
          // Reset the active item if there is no active index.
          newState.activeItem = null;
        }

        _this.setState(newState);
      });

      _defineProperty(_assertThisInitialized(_this), "_handleActiveItemChange", function (activeItem) {
        // Don't update the active item if it hasn't changed.
        if (!(0, _utils.areEqual)(activeItem, _this.state.activeItem, _this.props.labelKey)) {
          _this.setState({
            activeItem: activeItem
          });
        }
      });

      _defineProperty(_assertThisInitialized(_this), "_handleBlur", function (e) {
        e.persist();

        _this.setState({
          isFocused: false
        }, function () {
          return _this.props.onBlur(e);
        });
      });

      _defineProperty(_assertThisInitialized(_this), "_handleClear", function () {
        _this.clear();

        _this._updateSelected([]);
      });

      _defineProperty(_assertThisInitialized(_this), "_handleFocus", function (e) {
        e.persist();

        _this.setState({
          isFocused: true,
          showMenu: true
        }, function () {
          return _this.props.onFocus(e);
        });
      });

      _defineProperty(_assertThisInitialized(_this), "_handleInitialItemChange", function (initialItem) {
        // Don't update the initial item if it hasn't changed.
        if (!(0, _utils.areEqual)(initialItem, _this.state.initialItem, _this.props.labelKey)) {
          _this.setState({
            initialItem: initialItem
          });
        }
      });

      _defineProperty(_assertThisInitialized(_this), "_handleInputChange", function (e) {
        e.persist();
        var text = e.target.value;

        var _getInitialState = getInitialState(_this.props),
            activeIndex = _getInitialState.activeIndex,
            activeItem = _getInitialState.activeItem,
            shownResults = _getInitialState.shownResults;

        var _this$props = _this.props,
            multiple = _this$props.multiple,
            onInputChange = _this$props.onInputChange;

        _this.setState({
          activeIndex: activeIndex,
          activeItem: activeItem,
          showMenu: true,
          shownResults: shownResults,
          text: text
        }, function () {
          return onInputChange(text, e);
        }); // Clear any selections if text is entered in single-select mode.


        if (_this.state.selected.length && !multiple) {
          _this._updateSelected([]);
        }
      });

      _defineProperty(_assertThisInitialized(_this), "_handleKeyDown", function (e, results, isMenuShown) {
        var activeItem = _this.state.activeItem;
        var activeIndex = _this.state.activeIndex;

        switch (e.keyCode) {
          case _constants.UP:
          case _constants.DOWN:
            if (!isMenuShown) {
              _this._showMenu();

              break;
            } // Prevents input cursor from going to the beginning when pressing up.


            e.preventDefault(); // Increment or decrement index based on user keystroke.

            activeIndex += e.keyCode === _constants.UP ? -1 : 1; // Skip over any disabled options.

            activeIndex = skipDisabledOptions(results, activeIndex, e.keyCode); // If we've reached the end, go back to the beginning or vice-versa.

            if (activeIndex === results.length) {
              activeIndex = -1;
            } else if (activeIndex === -2) {
              activeIndex = results.length - 1; // Skip over any disabled options.

              activeIndex = skipDisabledOptions(results, activeIndex, e.keyCode);
            }

            _this._handleActiveIndexChange(activeIndex);

            break;

          case _constants.ESC:
            isMenuShown && _this._hideMenu();
            break;

          case _constants.RETURN:
            if (!isMenuShown) {
              break;
            } // Prevent form submission while menu is open.


            e.preventDefault();
            activeItem && _this._handleMenuItemSelect(activeItem, e);
            break;

          case _constants.RIGHT:
          case _constants.TAB:
            if (!isMenuShown) {
              break;
            }

            if (activeItem && !activeItem.paginationOption) {
              // Prevent blurring when selecting the active item.
              e.keyCode === _constants.TAB && e.preventDefault();

              _this._handleSelectionAdd(activeItem);

              break;
            }

            if (e.keyCode === _constants.TAB) {
              _this._hideMenu();
            }

            break;

          default:
            break;
        }

        _this.props.onKeyDown(e);
      });

      _defineProperty(_assertThisInitialized(_this), "_handleMenuItemSelect", function (option, e) {
        if (option.paginationOption) {
          _this._handlePaginate(e);
        } else {
          _this._handleSelectionAdd(option);
        }
      });

      _defineProperty(_assertThisInitialized(_this), "_handlePaginate", function (e) {
        e.persist();

        _this.setState(function (_ref, _ref2) {
          var shownResults = _ref.shownResults;
          var maxResults = _ref2.maxResults;
          return {
            shownResults: shownResults + maxResults
          };
        }, function () {
          return _this.props.onPaginate(e, _this.state.shownResults);
        });
      });

      _defineProperty(_assertThisInitialized(_this), "_handleSelectionAdd", function (selection) {
        var _this$props2 = _this.props,
            multiple = _this$props2.multiple,
            labelKey = _this$props2.labelKey;
        var selected;
        var text;

        if (multiple) {
          // If multiple selections are allowed, add the new selection to the
          // existing selections.
          selected = _this.state.selected.concat(selection);
          text = '';
        } else {
          // If only a single selection is allowed, replace the existing selection
          // with the new one.
          selected = [selection];
          text = (0, _utils.getOptionLabel)(selection, labelKey);
        }

        _this._hideMenu();

        _this.setState({
          initialItem: selection,
          text: text
        }); // Text must be updated before the selection to fix #211.
        // TODO: Find a more robust way of solving the issue.


        _this._updateSelected(selected);
      });

      _defineProperty(_assertThisInitialized(_this), "_handleSelectionRemove", function (selection) {
        var selected = _this.state.selected.filter(function (option) {
          return !(0, _isEqual["default"])(option, selection);
        }); // Make sure the input stays focused after the item is removed.


        _this.focus();

        _this._hideMenu();

        _this._updateSelected(selected);
      });

      _defineProperty(_assertThisInitialized(_this), "_handleRootClose", function (e) {
        if (isBodyMenuClick(e, _this.props) || !_this.state.showMenu) {
          return;
        }

        _this._hideMenu();
      });

      _defineProperty(_assertThisInitialized(_this), "_hideMenu", function () {
        var _getInitialState2 = getInitialState(_this.props),
            activeIndex = _getInitialState2.activeIndex,
            activeItem = _getInitialState2.activeItem,
            shownResults = _getInitialState2.shownResults;

        _this.setState({
          activeIndex: activeIndex,
          activeItem: activeItem,
          showMenu: false,
          shownResults: shownResults
        });
      });

      _defineProperty(_assertThisInitialized(_this), "_showMenu", function () {
        _this.setState({
          showMenu: true
        });
      });

      _defineProperty(_assertThisInitialized(_this), "_updateSelected", function (selected) {
        _this.setState({
          selected: selected
        }, function () {
          _this.props.onChange && _this.props.onChange(selected);
        });
      });

      return _this;
    }

    _createClass(WrappedTypeahead, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        this.props.autoFocus && this.focus();
      }
    }, {
      key: "componentWillReceiveProps",
      value: function componentWillReceiveProps(nextProps) {
        var labelKey = nextProps.labelKey,
            multiple = nextProps.multiple,
            selected = nextProps.selected; // If new selections are passed via props, treat as a controlled input.

        if (selected && !(0, _isEqual["default"])(selected, this.state.selected)) {
          this.setState({
            selected: selected
          });

          if (multiple) {
            return;
          }

          this.setState({
            text: selected.length ? (0, _utils.getOptionLabel)((0, _head["default"])(selected), labelKey) : ''
          });
        } // Truncate selections when in single-select mode.


        var newSelected = selected || this.state.selected;

        if (!multiple && newSelected.length > 1) {
          newSelected = newSelected.slice(0, 1);
          this.setState({
            selected: newSelected,
            text: (0, _utils.getOptionLabel)((0, _head["default"])(newSelected), labelKey)
          });
          return;
        }

        if (multiple !== this.props.multiple) {
          this.setState({
            text: ''
          });
        }
      }
    }, {
      key: "render",
      value: function render() {
        var _this2 = this;

        var mergedPropsAndState = _objectSpread({}, this.props, {}, this.state);

        var filterBy = mergedPropsAndState.filterBy,
            labelKey = mergedPropsAndState.labelKey,
            minLength = mergedPropsAndState.minLength,
            options = mergedPropsAndState.options,
            paginate = mergedPropsAndState.paginate,
            paginationText = mergedPropsAndState.paginationText,
            shownResults = mergedPropsAndState.shownResults,
            text = mergedPropsAndState.text;
        var results = [];

        if (text.length >= minLength) {
          var cb = Array.isArray(filterBy) ? _utils.defaultFilterBy : filterBy;
          results = options.filter(function (option) {
            return cb(option, mergedPropsAndState);
          });
        } // This must come before results are truncated.


        var shouldPaginate = paginate && results.length > shownResults; // Truncate results if necessary.

        results = (0, _utils.getTruncatedOptions)(results, shownResults); // Add the custom option if necessary.

        if ((0, _utils.addCustomOption)(results, mergedPropsAndState)) {
          results.push(_defineProperty({
            customOption: true,
            id: (0, _uniqueId["default"])('new-id-')
          }, (0, _utils.getStringLabelKey)(labelKey), text));
        } // Add the pagination item if necessary.


        if (shouldPaginate) {
          var _results$push2;

          results.push((_results$push2 = {}, _defineProperty(_results$push2, (0, _utils.getStringLabelKey)(labelKey), paginationText), _defineProperty(_results$push2, "paginationOption", true), _results$push2));
        } // This must come after checks for the custom option and pagination.


        var isMenuShown = (0, _utils.isShown)(results, mergedPropsAndState);
        return _react["default"].createElement(_RootCloseWrapper["default"], {
          disabled: this.props.open,
          onRootClose: this._handleRootClose
        }, _react["default"].createElement(Typeahead, _extends({}, mergedPropsAndState, {
          bodyContainer: this.props.positionFixed || this.props.bodyContainer,
          inputRef: function inputRef(input) {
            return _this2._input = input;
          },
          isMenuShown: isMenuShown,
          menuId: this.props.id || this.props.menuId || this._menuId,
          onActiveItemChange: this._handleActiveItemChange,
          onAdd: this._handleSelectionAdd,
          onBlur: this._handleBlur,
          onChange: this._handleInputChange,
          onClear: this._handleClear,
          onFocus: this._handleFocus,
          onInitialItemChange: this._handleInitialItemChange,
          onKeyDown: function onKeyDown(e) {
            return _this2._handleKeyDown(e, results, isMenuShown);
          },
          onMenuItemClick: this._handleMenuItemSelect,
          onRemove: this._handleSelectionRemove,
          results: results
        })));
      }
    }]);

    return WrappedTypeahead;
  }(_react["default"].Component);

  WrappedTypeahead.displayName = "TypeaheadContainer(".concat((0, _utils.getDisplayName)(Typeahead), ")");
  WrappedTypeahead.propTypes = {
    /**
     * For localized accessibility: Should return a string indicating the number
     * of results for screen readers. Receives the current results.
     */
    a11yNumResults: _propTypes["default"].func,

    /**
     * For localized accessibility: Should return a string indicating the number
     * of selections for screen readers. Receives the current selections.
     */
    a11yNumSelected: _propTypes["default"].func,

    /**
     * Specify menu alignment. The default value is `justify`, which makes the
     * menu as wide as the input and truncates long values. Specifying `left`
     * or `right` will align the menu to that side and the width will be
     * determined by the length of menu item values.
     */
    align: _propTypes["default"].oneOf(['justify', 'left', 'right']),

    /**
     * Allows the creation of new selections on the fly. Note that any new items
     * will be added to the list of selections, but not the list of original
     * options unless handled as such by `Typeahead`'s parent.
     *
     * If a function is specified, it will be used to determine whether a custom
     * option should be included. The return value should be true or false.
     */
    allowNew: _propTypes["default"].oneOfType([_propTypes["default"].bool, _propTypes["default"].func]),

    /**
     * Autofocus the input when the component initially mounts.
     */
    autoFocus: _propTypes["default"].bool,

    /**
     * Whether to render the menu inline or attach to `document.body`.
     */
    bodyContainer: (0, _deprecated["default"])(_propTypes["default"].bool, 'Use `positionFixed` instead'),

    /**
     * Whether or not filtering should be case-sensitive.
     */
    caseSensitive: (0, _propTypes2.checkPropType)(_propTypes["default"].bool, _propTypes2.caseSensitiveType),

    /**
     * Displays a button to clear the input when there are selections.
     */
    clearButton: _propTypes["default"].bool,

    /**
     * The initial value displayed in the text input.
     */
    defaultInputValue: (0, _propTypes2.checkPropType)(_propTypes["default"].string, _propTypes2.defaultInputValueType),

    /**
     * Whether or not the menu is displayed upon initial render.
     */
    defaultOpen: _propTypes["default"].bool,

    /**
     * Specify any pre-selected options. Use only if you want the component to
     * be uncontrolled.
     */
    defaultSelected: _propTypes2.optionType,

    /**
     * Whether to disable the component.
     */
    disabled: _propTypes["default"].bool,

    /**
     * Specify whether the menu should appear above the input.
     */
    dropup: _propTypes["default"].bool,

    /**
     * Message to display in the menu if there are no valid results.
     */
    emptyLabel: (0, _propTypes2.checkPropType)(_propTypes["default"].node, _propTypes2.emptyLabelType),

    /**
     * Either an array of fields in `option` to search, or a custom filtering
     * callback.
     */
    filterBy: _propTypes["default"].oneOfType([_propTypes["default"].arrayOf(_propTypes["default"].string.isRequired), _propTypes["default"].func]),

    /**
     * Whether or not to automatically adjust the position of the menu when it
     * reaches the viewport boundaries.
     */
    flip: _propTypes["default"].bool,

    /**
     * Highlights the menu item if there is only one result and allows selecting
     * that item by hitting enter. Does not work with `allowNew`.
     */
    highlightOnlyResult: (0, _propTypes2.checkPropType)(_propTypes["default"].bool, _propTypes2.highlightOnlyResultType),

    /**
     * An html id attribute, required for assistive technologies such as screen
     * readers.
     */
    id: (0, _propTypes2.checkPropType)(_propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string]), _propTypes2.idType),

    /**
     * Whether the filter should ignore accents and other diacritical marks.
     */
    ignoreDiacritics: (0, _propTypes2.checkPropType)(_propTypes["default"].bool, _propTypes2.ignoreDiacriticsType),

    /**
     * Props to be applied directly to the input. `onBlur`, `onChange`,
     * `onFocus`, and `onKeyDown` are ignored.
     */
    inputProps: (0, _propTypes2.checkPropType)(_propTypes["default"].object, _propTypes2.inputPropsType),

    /**
     * Bootstrap 4 only. Adds the `is-invalid` classname to the `form-control`.
     */
    isInvalid: _propTypes["default"].bool,

    /**
     * Indicate whether an asynchronous data fetch is happening.
     */
    isLoading: _propTypes["default"].bool,

    /**
     * Bootstrap 4 only. Adds the `is-valid` classname to the `form-control`.
     */
    isValid: _propTypes["default"].bool,

    /**
     * Specify the option key to use for display or a function returning the
     * display string. By default, the selector will use the `label` key.
     */
    labelKey: (0, _propTypes2.checkPropType)(_propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].func]), _propTypes2.labelKeyType),

    /**
     * Maximum number of results to display by default. Mostly done for
     * performance reasons so as not to render too many DOM nodes in the case of
     * large data sets.
     */
    maxResults: _propTypes["default"].number,

    /**
     * Id applied to the top-level menu element. Required for accessibility.
     */
    menuId: (0, _propTypes2.checkPropType)(_propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string]), _propTypes2.idType),

    /**
     * Number of input characters that must be entered before showing results.
     */
    minLength: _propTypes["default"].number,

    /**
     * Whether or not multiple selections are allowed.
     */
    multiple: _propTypes["default"].bool,

    /**
     * Invoked when the input is blurred. Receives an event.
     */
    onBlur: _propTypes["default"].func,

    /**
     * Invoked whenever items are added or removed. Receives an array of the
     * selected options.
     */
    onChange: _propTypes["default"].func,

    /**
     * Invoked when the input is focused. Receives an event.
     */
    onFocus: _propTypes["default"].func,

    /**
     * Invoked when the input value changes. Receives the string value of the
     * input.
     */
    onInputChange: _propTypes["default"].func,

    /**
     * Invoked when a key is pressed. Receives an event.
     */
    onKeyDown: _propTypes["default"].func,

    /**
     * Invoked when the menu is hidden.
     */
    onMenuHide: (0, _deprecated["default"])(_propTypes["default"].func, 'Use `onMenuToggle` instead'),

    /**
     * Invoked when the menu is shown.
     */
    onMenuShow: (0, _deprecated["default"])(_propTypes["default"].func, 'Use `onMenuToggle` instead'),

    /**
     * Invoked when menu visibility changes.
     */
    onMenuToggle: _propTypes["default"].func,

    /**
     * Invoked when the pagination menu item is clicked. Receives an event.
     */
    onPaginate: _propTypes["default"].func,

    /**
     * Whether or not the menu should be displayed. `undefined` allows the
     * component to control visibility, while `true` and `false` show and hide
     * the menu, respectively.
     */
    open: _propTypes["default"].bool,

    /**
     * Full set of options, including pre-selected options. Must either be an
     * array of objects (recommended) or strings.
     */
    options: _propTypes2.optionType.isRequired,

    /**
     * Give user the ability to display additional results if the number of
     * results exceeds `maxResults`.
     */
    paginate: _propTypes["default"].bool,

    /**
     * Prompt displayed when large data sets are paginated.
     */
    paginationText: _propTypes["default"].string,

    /**
     * Placeholder text for the input.
     */
    placeholder: _propTypes["default"].string,

    /**
     * Callback for custom menu rendering.
     */
    renderMenu: _propTypes["default"].func,

    /**
     * The selected option(s) displayed in the input. Use this prop if you want
     * to control the component via its parent.
     */
    selected: (0, _propTypes2.checkPropType)(_propTypes2.optionType, _propTypes2.selectedType),

    /**
     * Allows selecting the hinted result by pressing enter.
     */
    selectHintOnEnter: _propTypes["default"].bool
  };
  WrappedTypeahead.defaultProps = {
    a11yNumResults: function a11yNumResults(results) {
      var resultString = (0, _utils.pluralize)('result', results.length);
      return "".concat(resultString, ". Use up and down arrow keys to navigate.");
    },
    a11yNumSelected: function a11yNumSelected(selected) {
      return (0, _utils.pluralize)('selection', selected.length);
    },
    align: 'justify',
    allowNew: false,
    autoFocus: false,
    caseSensitive: false,
    clearButton: false,
    defaultInputValue: '',
    defaultOpen: false,
    defaultSelected: [],
    disabled: false,
    dropup: false,
    emptyLabel: 'No matches found.',
    filterBy: [],
    flip: false,
    highlightOnlyResult: false,
    ignoreDiacritics: true,
    inputProps: {},
    isInvalid: false,
    isLoading: false,
    isValid: false,
    labelKey: _constants.DEFAULT_LABELKEY,
    maxResults: 100,
    minLength: 0,
    multiple: false,
    onBlur: _noop["default"],
    onFocus: _noop["default"],
    onInputChange: _noop["default"],
    onKeyDown: _noop["default"],
    onPaginate: _noop["default"],
    paginate: true,
    paginationText: 'Display additional results...',
    placeholder: '',
    selectHintOnEnter: false
  };
  return WrappedTypeahead;
}

var _default = typeaheadContainer;
exports["default"] = _default;