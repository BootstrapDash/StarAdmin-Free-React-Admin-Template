(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else if(typeof exports === 'object')
		exports["ReactBootstrapTable2Paginator"] = factory(require("react"));
	else
		root["ReactBootstrapTable2Paginator"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_0__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 15);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

if (false) {
  var REACT_ELEMENT_TYPE = (typeof Symbol === 'function' &&
    Symbol.for &&
    Symbol.for('react.element')) ||
    0xeac7;

  var isValidElement = function(object) {
    return typeof object === 'object' &&
      object !== null &&
      object.$$typeof === REACT_ELEMENT_TYPE;
  };

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = require('./factoryWithTypeCheckers')(isValidElement, throwOnDirectAccess);
} else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = __webpack_require__(16)();
}


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  PAGINATION_SIZE: 5,
  PAGE_START_INDEX: 1,
  With_FIRST_AND_LAST: true,
  SHOW_ALL_PAGE_BTNS: false,
  SHOW_TOTAL: false,
  PAGINATION_TOTAL: null,
  FIRST_PAGE_TEXT: '<<',
  PRE_PAGE_TEXT: '<',
  NEXT_PAGE_TEXT: '>',
  LAST_PAGE_TEXT: '>>',
  NEXT_PAGE_TITLE: 'next page',
  LAST_PAGE_TITLE: 'last page',
  PRE_PAGE_TITLE: 'previous page',
  FIRST_PAGE_TITLE: 'first page',
  SIZE_PER_PAGE_LIST: [10, 25, 30, 50],
  HIDE_SIZE_PER_PAGE: false,
  HIDE_PAGE_LIST_ONLY_ONE_PAGE: false
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _const = __webpack_require__(2);

var _const2 = _interopRequireDefault(_const);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint no-mixed-operators: 0 */


exports.default = function (ExtendBase) {
  return function (_ExtendBase) {
    _inherits(PageResolver, _ExtendBase);

    function PageResolver() {
      _classCallCheck(this, PageResolver);

      return _possibleConstructorReturn(this, (PageResolver.__proto__ || Object.getPrototypeOf(PageResolver)).apply(this, arguments));
    }

    _createClass(PageResolver, [{
      key: 'backToPrevPage',
      value: function backToPrevPage() {
        var _props = this.props,
            currPage = _props.currPage,
            pageStartIndex = _props.pageStartIndex;

        return currPage - 1 < pageStartIndex ? pageStartIndex : currPage - 1;
      }
    }, {
      key: 'initialState',
      value: function initialState() {
        var totalPages = this.calculateTotalPage();
        var lastPage = this.calculateLastPage(totalPages);
        return { totalPages: totalPages, lastPage: lastPage };
      }
    }, {
      key: 'calculateTotalPage',
      value: function calculateTotalPage() {
        var sizePerPage = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props.currSizePerPage;
        var dataSize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.props.dataSize;

        return Math.ceil(dataSize / sizePerPage);
      }
    }, {
      key: 'calculateLastPage',
      value: function calculateLastPage(totalPages) {
        var pageStartIndex = this.props.pageStartIndex;

        return pageStartIndex + totalPages - 1;
      }
    }, {
      key: 'calculateFromTo',
      value: function calculateFromTo() {
        var _props2 = this.props,
            dataSize = _props2.dataSize,
            currPage = _props2.currPage,
            currSizePerPage = _props2.currSizePerPage,
            pageStartIndex = _props2.pageStartIndex;

        var offset = Math.abs(_const2.default.PAGE_START_INDEX - pageStartIndex);

        var from = (currPage - pageStartIndex) * currSizePerPage;
        from = dataSize === 0 ? 0 : from + 1;
        var to = Math.min(currSizePerPage * (currPage + offset), dataSize);
        if (to > dataSize) to = dataSize;

        return [from, to];
      }
    }, {
      key: 'calculatePages',
      value: function calculatePages(totalPages, lastPage) {
        var _props3 = this.props,
            currPage = _props3.currPage,
            paginationSize = _props3.paginationSize,
            pageStartIndex = _props3.pageStartIndex,
            withFirstAndLast = _props3.withFirstAndLast,
            firstPageText = _props3.firstPageText,
            prePageText = _props3.prePageText,
            nextPageText = _props3.nextPageText,
            lastPageText = _props3.lastPageText,
            alwaysShowAllBtns = _props3.alwaysShowAllBtns;


        var pages = [];
        var endPage = totalPages;
        if (endPage <= 0) return [];

        var startPage = Math.max(currPage - Math.floor(paginationSize / 2), pageStartIndex);
        endPage = startPage + paginationSize - 1;

        if (endPage > lastPage) {
          endPage = lastPage;
          startPage = endPage - paginationSize + 1;
        }

        if (alwaysShowAllBtns) {
          if (withFirstAndLast) {
            pages = [firstPageText, prePageText];
          } else {
            pages = [prePageText];
          }
        }

        if (startPage !== pageStartIndex && totalPages > paginationSize && withFirstAndLast && pages.length === 0) {
          pages = [firstPageText, prePageText];
        } else if (totalPages > 1 && pages.length === 0) {
          pages = [prePageText];
        }

        for (var i = startPage; i <= endPage; i += 1) {
          if (i >= pageStartIndex) pages.push(i);
        }

        if (alwaysShowAllBtns || endPage <= lastPage && pages.length > 1) {
          pages.push(nextPageText);
        }
        if (endPage !== lastPage && withFirstAndLast || withFirstAndLast && alwaysShowAllBtns) {
          pages.push(lastPageText);
        }

        // if ((endPage <= lastPage && pages.length > 1) || alwaysShowAllBtns) {
        //   pages.push(nextPageText);
        // }
        // if (endPage !== lastPage && withFirstAndLast) {
        //   pages.push(lastPageText);
        // }

        return pages;
      }
    }, {
      key: 'calculatePageStatus',
      value: function calculatePageStatus() {
        var pages = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

        var _this2 = this;

        var lastPage = arguments[1];
        var disablePageTitle = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
        var _props4 = this.props,
            currPage = _props4.currPage,
            pageStartIndex = _props4.pageStartIndex,
            firstPageText = _props4.firstPageText,
            prePageText = _props4.prePageText,
            nextPageText = _props4.nextPageText,
            lastPageText = _props4.lastPageText,
            alwaysShowAllBtns = _props4.alwaysShowAllBtns;

        var isStart = function isStart(page) {
          return currPage === pageStartIndex && (page === firstPageText || page === prePageText);
        };
        var isEnd = function isEnd(page) {
          return currPage === lastPage && (page === nextPageText || page === lastPageText);
        };

        return pages.filter(function (page) {
          if (alwaysShowAllBtns) {
            return true;
          }
          return !(isStart(page) || isEnd(page));
        }).map(function (page) {
          var title = void 0;
          var active = page === currPage;
          var disabled = isStart(page) || isEnd(page);

          if (page === nextPageText) {
            title = _this2.props.nextPageTitle;
          } else if (page === prePageText) {
            title = _this2.props.prePageTitle;
          } else if (page === firstPageText) {
            title = _this2.props.firstPageTitle;
          } else if (page === lastPageText) {
            title = _this2.props.lastPageTitle;
          } else {
            title = '' + page;
          }

          var pageResult = { page: page, active: active, disabled: disabled };
          if (!disablePageTitle) {
            pageResult.title = title;
          }
          return pageResult;
        });
      }
    }, {
      key: 'calculateSizePerPageStatus',
      value: function calculateSizePerPageStatus() {
        var sizePerPageList = this.props.sizePerPageList;

        return sizePerPageList.map(function (_sizePerPage) {
          var pageText = typeof _sizePerPage.text !== 'undefined' ? _sizePerPage.text : _sizePerPage;
          var pageNumber = typeof _sizePerPage.value !== 'undefined' ? _sizePerPage.value : _sizePerPage;
          return {
            text: '' + pageText,
            page: pageNumber
          };
        });
      }
    }]);

    return PageResolver;
  }(ExtendBase);
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
	'use strict';

	var hasOwn = {}.hasOwnProperty;

	function classNames () {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg) && arg.length) {
				var inner = classNames.apply(null, arg);
				if (inner) {
					classes.push(inner);
				}
			} else if (argType === 'object') {
				for (var key in arg) {
					if (hasOwn.call(arg, key) && arg[key]) {
						classes.push(key);
					}
				}
			}
		}

		return classes.join(' ');
	}

	if (typeof module !== 'undefined' && module.exports) {
		classNames.default = classNames;
		module.exports = classNames;
	} else if (true) {
		// register as 'classnames', consistent with npm package name
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
			return classNames;
		}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {
		window.classNames = classNames;
	}
}());


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _pageResolver2 = __webpack_require__(3);

var _pageResolver3 = _interopRequireDefault(_pageResolver2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint react/prop-types: 0 */
/* eslint camelcase: 0 */


exports.default = function (WrappedComponent) {
  return function (_pageResolver) {
    _inherits(PaginationHandler, _pageResolver);

    function PaginationHandler(props) {
      _classCallCheck(this, PaginationHandler);

      var _this = _possibleConstructorReturn(this, (PaginationHandler.__proto__ || Object.getPrototypeOf(PaginationHandler)).call(this, props));

      _this.handleChangePage = _this.handleChangePage.bind(_this);
      _this.handleChangeSizePerPage = _this.handleChangeSizePerPage.bind(_this);
      _this.state = _this.initialState();
      return _this;
    }

    _createClass(PaginationHandler, [{
      key: 'UNSAFE_componentWillReceiveProps',
      value: function UNSAFE_componentWillReceiveProps(nextProps) {
        var dataSize = nextProps.dataSize,
            currSizePerPage = nextProps.currSizePerPage;

        if (currSizePerPage !== this.props.currSizePerPage || dataSize !== this.props.dataSize) {
          var totalPages = this.calculateTotalPage(currSizePerPage, dataSize);
          var lastPage = this.calculateLastPage(totalPages);
          this.setState({ totalPages: totalPages, lastPage: lastPage });
        }
      }
    }, {
      key: 'handleChangeSizePerPage',
      value: function handleChangeSizePerPage(sizePerPage) {
        var _props = this.props,
            currSizePerPage = _props.currSizePerPage,
            onSizePerPageChange = _props.onSizePerPageChange;

        var selectedSize = typeof sizePerPage === 'string' ? parseInt(sizePerPage, 10) : sizePerPage;
        var currPage = this.props.currPage;

        if (selectedSize !== currSizePerPage) {
          var newTotalPages = this.calculateTotalPage(selectedSize);
          var newLastPage = this.calculateLastPage(newTotalPages);
          if (currPage > newLastPage) currPage = newLastPage;
          onSizePerPageChange(selectedSize, currPage);
        }
      }
    }, {
      key: 'handleChangePage',
      value: function handleChangePage(newPage) {
        var page = void 0;
        var _props2 = this.props,
            currPage = _props2.currPage,
            pageStartIndex = _props2.pageStartIndex,
            prePageText = _props2.prePageText,
            nextPageText = _props2.nextPageText,
            lastPageText = _props2.lastPageText,
            firstPageText = _props2.firstPageText,
            onPageChange = _props2.onPageChange;
        var lastPage = this.state.lastPage;


        if (newPage === prePageText) {
          page = this.backToPrevPage();
        } else if (newPage === nextPageText) {
          page = currPage + 1 > lastPage ? lastPage : currPage + 1;
        } else if (newPage === lastPageText) {
          page = lastPage;
        } else if (newPage === firstPageText) {
          page = pageStartIndex;
        } else {
          page = parseInt(newPage, 10);
        }
        if (page !== currPage) {
          onPageChange(page);
        }
      }
    }, {
      key: 'render',
      value: function render() {
        return _react2.default.createElement(WrappedComponent, _extends({}, this.props, {
          lastPage: this.state.lastPage,
          totalPages: this.state.totalPages,
          onPageChange: this.handleChangePage,
          onSizePerPageChange: this.handleChangeSizePerPage
        }));
      }
    }]);

    return PaginationHandler;
  }((0, _pageResolver3.default)(_react.Component));
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; } /* eslint react/prop-types: 0 */


exports.default = function (WrappedComponent) {
  return function (_ref) {
    var page = _ref.page,
        sizePerPage = _ref.sizePerPage,
        rest = _objectWithoutProperties(_ref, ['page', 'sizePerPage']);

    return _react2.default.createElement(WrappedComponent, _extends({}, rest, {
      currPage: page,
      currSizePerPage: sizePerPage
    }));
  };
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _events = __webpack_require__(20);

var _events2 = _interopRequireDefault(_events);

var _const = __webpack_require__(2);

var _const2 = _interopRequireDefault(_const);

var _page = __webpack_require__(8);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint react/prop-types: 0 */
/* eslint react/require-default-props: 0 */
/* eslint no-lonely-if: 0 */
/* eslint camelcase: 0 */


var StateContext = _react2.default.createContext();

var StateProvider = function (_React$Component) {
  _inherits(StateProvider, _React$Component);

  function StateProvider(props) {
    _classCallCheck(this, StateProvider);

    var _this = _possibleConstructorReturn(this, (StateProvider.__proto__ || Object.getPrototypeOf(StateProvider)).call(this, props));

    _initialiseProps.call(_this);

    _this.handleChangePage = _this.handleChangePage.bind(_this);
    _this.handleDataSizeChange = _this.handleDataSizeChange.bind(_this);
    _this.handleChangeSizePerPage = _this.handleChangeSizePerPage.bind(_this);

    var currPage = void 0;
    var currSizePerPage = void 0;
    var options = props.pagination.options;

    var sizePerPageList = options.sizePerPageList || _const2.default.SIZE_PER_PAGE_LIST;

    // initialize current page
    if (typeof options.page !== 'undefined') {
      currPage = options.page;
    } else if (typeof options.pageStartIndex !== 'undefined') {
      currPage = options.pageStartIndex;
    } else {
      currPage = _const2.default.PAGE_START_INDEX;
    }

    // initialize current sizePerPage
    if (typeof options.sizePerPage !== 'undefined') {
      currSizePerPage = options.sizePerPage;
    } else if (_typeof(sizePerPageList[0]) === 'object') {
      currSizePerPage = sizePerPageList[0].value;
    } else {
      currSizePerPage = sizePerPageList[0];
    }

    _this.currPage = currPage;
    _this.dataSize = options.totalSize;
    _this.currSizePerPage = currSizePerPage;
    _this.dataChangeListener = new _events2.default();
    _this.dataChangeListener.on('filterChanged', _this.handleDataSizeChange);
    return _this;
  }

  _createClass(StateProvider, [{
    key: 'UNSAFE_componentWillReceiveProps',
    value: function UNSAFE_componentWillReceiveProps(nextProps) {
      var custom = nextProps.pagination.options.custom;

      // user should align the page when the page is not fit to the data size when remote enable

      if (this.isRemotePagination() || custom) {
        if (typeof nextProps.pagination.options.page !== 'undefined') {
          this.currPage = nextProps.pagination.options.page;
        }
        if (typeof nextProps.pagination.options.sizePerPage !== 'undefined') {
          this.currSizePerPage = nextProps.pagination.options.sizePerPage;
        }
        if (typeof nextProps.pagination.options.totalSize !== 'undefined') {
          this.dataSize = nextProps.pagination.options.totalSize;
        }
      }
    }
  }, {
    key: 'handleDataSizeChange',
    value: function handleDataSizeChange(newDataSize) {
      var options = this.props.pagination.options;

      var pageStartIndex = typeof options.pageStartIndex === 'undefined' ? _const2.default.PAGE_START_INDEX : options.pageStartIndex;
      this.currPage = (0, _page.alignPage)(newDataSize, this.dataSize, this.currPage, this.currSizePerPage, pageStartIndex);
      this.dataSize = newDataSize;
      this.forceUpdate();
    }
  }, {
    key: 'handleChangePage',
    value: function handleChangePage(currPage) {
      var currSizePerPage = this.currSizePerPage;
      var options = this.props.pagination.options;


      if (options.onPageChange) {
        options.onPageChange(currPage, currSizePerPage);
      }

      this.currPage = currPage;

      if (this.isRemotePagination()) {
        this.getPaginationRemoteEmitter().emit('paginationChange', currPage, currSizePerPage);
        return;
      }
      this.forceUpdate();
    }
  }, {
    key: 'handleChangeSizePerPage',
    value: function handleChangeSizePerPage(currSizePerPage, currPage) {
      var options = this.props.pagination.options;


      if (options.onSizePerPageChange) {
        options.onSizePerPageChange(currSizePerPage, currPage);
      }

      this.currPage = currPage;
      this.currSizePerPage = currSizePerPage;

      if (this.isRemotePagination()) {
        this.getPaginationRemoteEmitter().emit('paginationChange', currPage, currSizePerPage);
        return;
      }
      this.forceUpdate();
    }
  }, {
    key: 'render',
    value: function render() {
      var paginationProps = this.getPaginationProps();
      var pagination = _extends({}, this.props.pagination, {
        options: paginationProps
      });

      return _react2.default.createElement(
        StateContext.Provider,
        {
          value: {
            paginationProps: paginationProps,
            paginationTableProps: {
              pagination: pagination,
              setPaginationRemoteEmitter: this.setPaginationRemoteEmitter,
              dataChangeListener: this.dataChangeListener
            }
          }
        },
        this.props.children
      );
    }
  }]);

  return StateProvider;
}(_react2.default.Component);

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.getPaginationProps = function () {
    var _props = _this2.props,
        options = _props.pagination.options,
        bootstrap4 = _props.bootstrap4,
        tableId = _props.tableId;
    var currPage = _this2.currPage,
        currSizePerPage = _this2.currSizePerPage,
        dataSize = _this2.dataSize;

    var withFirstAndLast = typeof options.withFirstAndLast === 'undefined' ? _const2.default.With_FIRST_AND_LAST : options.withFirstAndLast;
    var alwaysShowAllBtns = typeof options.alwaysShowAllBtns === 'undefined' ? _const2.default.SHOW_ALL_PAGE_BTNS : options.alwaysShowAllBtns;
    var hideSizePerPage = typeof options.hideSizePerPage === 'undefined' ? _const2.default.HIDE_SIZE_PER_PAGE : options.hideSizePerPage;
    var hidePageListOnlyOnePage = typeof options.hidePageListOnlyOnePage === 'undefined' ? _const2.default.HIDE_PAGE_LIST_ONLY_ONE_PAGE : options.hidePageListOnlyOnePage;
    var pageStartIndex = typeof options.pageStartIndex === 'undefined' ? _const2.default.PAGE_START_INDEX : options.pageStartIndex;
    return _extends({}, options, {
      bootstrap4: bootstrap4,
      tableId: tableId,
      page: currPage,
      sizePerPage: currSizePerPage,
      pageStartIndex: pageStartIndex,
      hidePageListOnlyOnePage: hidePageListOnlyOnePage,
      hideSizePerPage: hideSizePerPage,
      alwaysShowAllBtns: alwaysShowAllBtns,
      withFirstAndLast: withFirstAndLast,
      dataSize: dataSize,
      sizePerPageList: options.sizePerPageList || _const2.default.SIZE_PER_PAGE_LIST,
      paginationSize: options.paginationSize || _const2.default.PAGINATION_SIZE,
      showTotal: options.showTotal,
      pageListRenderer: options.pageListRenderer,
      pageButtonRenderer: options.pageButtonRenderer,
      sizePerPageRenderer: options.sizePerPageRenderer,
      paginationTotalRenderer: options.paginationTotalRenderer,
      sizePerPageOptionRenderer: options.sizePerPageOptionRenderer,
      firstPageText: options.firstPageText || _const2.default.FIRST_PAGE_TEXT,
      prePageText: options.prePageText || _const2.default.PRE_PAGE_TEXT,
      nextPageText: options.nextPageText || _const2.default.NEXT_PAGE_TEXT,
      lastPageText: options.lastPageText || _const2.default.LAST_PAGE_TEXT,
      prePageTitle: options.prePageTitle || _const2.default.PRE_PAGE_TITLE,
      nextPageTitle: options.nextPageTitle || _const2.default.NEXT_PAGE_TITLE,
      firstPageTitle: options.firstPageTitle || _const2.default.FIRST_PAGE_TITLE,
      lastPageTitle: options.lastPageTitle || _const2.default.LAST_PAGE_TITLE,
      onPageChange: _this2.handleChangePage,
      onSizePerPageChange: _this2.handleChangeSizePerPage
    });
  };

  this.setPaginationRemoteEmitter = function (remoteEmitter) {
    _this2.remoteEmitter = remoteEmitter;
  };

  this.getPaginationRemoteEmitter = function () {
    return _this2.remoteEmitter || _this2.props.remoteEmitter;
  };

  this.isRemotePagination = function () {
    var e = {};
    _this2.remoteEmitter.emit('isRemotePagination', e);
    return e.result;
  };
};

exports.default = function () {
  return {
    Provider: StateProvider,
    Consumer: StateContext.Consumer
  };
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getByCurrPage = exports.alignPage = undefined;

var _const = __webpack_require__(2);

var _const2 = _interopRequireDefault(_const);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getNormalizedPage = function getNormalizedPage(page, pageStartIndex) {
  var offset = Math.abs(1 - pageStartIndex);
  return page + offset;
};

var endIndex = function endIndex(page, sizePerPage, pageStartIndex) {
  return getNormalizedPage(page, pageStartIndex) * sizePerPage - 1;
};

var startIndex = function startIndex(end, sizePerPage) {
  return end - (sizePerPage - 1);
};

var alignPage = exports.alignPage = function alignPage(dataSize, prevDataSize, page, sizePerPage, pageStartIndex) {
  if (prevDataSize < dataSize) return page;
  if (page < pageStartIndex) return pageStartIndex;
  if (dataSize <= 0) return pageStartIndex;
  if (page >= Math.floor(dataSize / sizePerPage) + pageStartIndex && pageStartIndex === 1) {
    return Math.ceil(dataSize / sizePerPage);
  }
  if (page >= Math.floor(dataSize / sizePerPage) && pageStartIndex === 0) {
    var newPage = Math.ceil(dataSize / sizePerPage);
    return newPage - Math.abs(_const2.default.PAGE_START_INDEX - pageStartIndex);
  }
  return page;
};

var getByCurrPage = exports.getByCurrPage = function getByCurrPage(data, page, sizePerPage, pageStartIndex) {
  var dataSize = data.length;
  if (!dataSize) return [];

  var end = endIndex(page, sizePerPage, pageStartIndex);
  var start = startIndex(end, sizePerPage);

  var result = [];
  for (var i = start; i <= end; i += 1) {
    result.push(data[i]);
    if (i + 1 === dataSize) break;
  }
  return result;
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SizePerPageDropdownWithAdapter = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _pageResolver2 = __webpack_require__(3);

var _pageResolver3 = _interopRequireDefault(_pageResolver2);

var _sizePerPageDropdown = __webpack_require__(10);

var _sizePerPageDropdown2 = _interopRequireDefault(_sizePerPageDropdown);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint react/prop-types: 0 */


var sizePerPageDropdownAdapter = function sizePerPageDropdownAdapter(WrappedComponent) {
  return function (_pageResolver) {
    _inherits(SizePerPageDropdownAdapter, _pageResolver);

    function SizePerPageDropdownAdapter(props) {
      _classCallCheck(this, SizePerPageDropdownAdapter);

      var _this = _possibleConstructorReturn(this, (SizePerPageDropdownAdapter.__proto__ || Object.getPrototypeOf(SizePerPageDropdownAdapter)).call(this, props));

      _this.closeDropDown = _this.closeDropDown.bind(_this);
      _this.toggleDropDown = _this.toggleDropDown.bind(_this);
      _this.handleChangeSizePerPage = _this.handleChangeSizePerPage.bind(_this);
      _this.state = { dropdownOpen: false };
      return _this;
    }

    _createClass(SizePerPageDropdownAdapter, [{
      key: 'toggleDropDown',
      value: function toggleDropDown() {
        var dropdownOpen = !this.state.dropdownOpen;
        this.setState(function () {
          return { dropdownOpen: dropdownOpen };
        });
      }
    }, {
      key: 'closeDropDown',
      value: function closeDropDown() {
        this.setState(function () {
          return { dropdownOpen: false };
        });
      }
    }, {
      key: 'handleChangeSizePerPage',
      value: function handleChangeSizePerPage(sizePerPage) {
        this.props.onSizePerPageChange(sizePerPage);
        this.closeDropDown();
      }
    }, {
      key: 'render',
      value: function render() {
        var _props = this.props,
            tableId = _props.tableId,
            bootstrap4 = _props.bootstrap4,
            sizePerPageList = _props.sizePerPageList,
            currSizePerPage = _props.currSizePerPage,
            hideSizePerPage = _props.hideSizePerPage,
            sizePerPageRenderer = _props.sizePerPageRenderer,
            sizePerPageOptionRenderer = _props.sizePerPageOptionRenderer;
        var open = this.state.dropdownOpen;


        if (sizePerPageList.length > 1 && !hideSizePerPage) {
          if (sizePerPageRenderer) {
            return sizePerPageRenderer({
              options: this.calculateSizePerPageStatus(),
              currSizePerPage: '' + currSizePerPage,
              onSizePerPageChange: this.handleChangeSizePerPage
            });
          }
          return _react2.default.createElement(WrappedComponent, _extends({}, this.props, {
            currSizePerPage: '' + currSizePerPage,
            options: this.calculateSizePerPageStatus(),
            optionRenderer: sizePerPageOptionRenderer,
            onSizePerPageChange: this.handleChangeSizePerPage,
            onClick: this.toggleDropDown,
            onBlur: this.closeDropDown,
            open: open,
            tableId: tableId,
            bootstrap4: bootstrap4
          }));
        }
        return null;
      }
    }]);

    return SizePerPageDropdownAdapter;
  }((0, _pageResolver3.default)(_react.Component));
};

var SizePerPageDropdownWithAdapter = exports.SizePerPageDropdownWithAdapter = sizePerPageDropdownAdapter(_sizePerPageDropdown2.default);
exports.default = sizePerPageDropdownAdapter;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _classnames = __webpack_require__(4);

var _classnames2 = _interopRequireDefault(_classnames);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _sizePerPageOption = __webpack_require__(23);

var _sizePerPageOption2 = _interopRequireDefault(_sizePerPageOption);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sizePerPageDefaultClass = 'react-bs-table-sizePerPage-dropdown';

var SizePerPageDropDown = function SizePerPageDropDown(props) {
  var open = props.open,
      tableId = props.tableId,
      hidden = props.hidden,
      onClick = props.onClick,
      onBlur = props.onBlur,
      options = props.options,
      className = props.className,
      variation = props.variation,
      bootstrap4 = props.bootstrap4,
      btnContextual = props.btnContextual,
      optionRenderer = props.optionRenderer,
      currSizePerPage = props.currSizePerPage,
      onSizePerPageChange = props.onSizePerPageChange;


  var dropDownStyle = { visibility: hidden ? 'hidden' : 'visible' };
  var openClass = open ? 'open show' : '';
  var dropdownClasses = (0, _classnames2.default)(openClass, sizePerPageDefaultClass, variation, className);

  var id = tableId ? tableId + '-pageDropDown' : 'pageDropDown';

  return _react2.default.createElement(
    'span',
    {
      style: dropDownStyle,
      className: dropdownClasses
    },
    _react2.default.createElement(
      'button',
      {
        id: id,
        type: 'button',
        className: 'btn ' + btnContextual + ' dropdown-toggle',
        'data-toggle': 'dropdown',
        'aria-expanded': open,
        onClick: onClick,
        onBlur: onBlur
      },
      currSizePerPage,
      ' ',
      bootstrap4 ? null : _react2.default.createElement(
        'span',
        null,
        _react2.default.createElement('span', { className: 'caret' })
      )
    ),
    _react2.default.createElement(
      'ul',
      {
        className: 'dropdown-menu ' + openClass,
        role: 'menu',
        'aria-labelledby': id
      },
      options.map(function (option) {
        if (optionRenderer) {
          return optionRenderer(_extends({}, option, {
            onSizePerPageChange: onSizePerPageChange
          }));
        }
        return _react2.default.createElement(_sizePerPageOption2.default, _extends({}, option, {
          key: option.text,
          bootstrap4: bootstrap4,
          onSizePerPageChange: onSizePerPageChange
        }));
      })
    )
  );
};

SizePerPageDropDown.propTypes = {
  currSizePerPage: _propTypes2.default.string.isRequired,
  options: _propTypes2.default.array.isRequired,
  onClick: _propTypes2.default.func.isRequired,
  onBlur: _propTypes2.default.func.isRequired,
  onSizePerPageChange: _propTypes2.default.func.isRequired,
  bootstrap4: _propTypes2.default.bool,
  tableId: _propTypes2.default.string,
  open: _propTypes2.default.bool,
  hidden: _propTypes2.default.bool,
  btnContextual: _propTypes2.default.string,
  variation: _propTypes2.default.oneOf(['dropdown', 'dropup']),
  className: _propTypes2.default.string,
  optionRenderer: _propTypes2.default.func
};
SizePerPageDropDown.defaultProps = {
  open: false,
  hidden: false,
  btnContextual: 'btn-default btn-secondary',
  variation: 'dropdown',
  className: '',
  optionRenderer: null,
  bootstrap4: false,
  tableId: null
};

exports.default = SizePerPageDropDown;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PaginationListWithAdapter = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _pageResolver2 = __webpack_require__(3);

var _pageResolver3 = _interopRequireDefault(_pageResolver2);

var _paginationList = __webpack_require__(12);

var _paginationList2 = _interopRequireDefault(_paginationList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint react/prop-types: 0 */


var paginationListAdapter = function paginationListAdapter(WrappedComponent) {
  return function (_pageResolver) {
    _inherits(PaginationListAdapter, _pageResolver);

    function PaginationListAdapter() {
      _classCallCheck(this, PaginationListAdapter);

      return _possibleConstructorReturn(this, (PaginationListAdapter.__proto__ || Object.getPrototypeOf(PaginationListAdapter)).apply(this, arguments));
    }

    _createClass(PaginationListAdapter, [{
      key: 'render',
      value: function render() {
        var _props = this.props,
            lastPage = _props.lastPage,
            totalPages = _props.totalPages,
            pageButtonRenderer = _props.pageButtonRenderer,
            onPageChange = _props.onPageChange,
            disablePageTitle = _props.disablePageTitle,
            hidePageListOnlyOnePage = _props.hidePageListOnlyOnePage;

        var pages = this.calculatePageStatus(this.calculatePages(totalPages, lastPage), lastPage, disablePageTitle);
        if (totalPages === 1 && hidePageListOnlyOnePage) {
          return null;
        }
        return _react2.default.createElement(WrappedComponent, {
          pageButtonRenderer: pageButtonRenderer,
          onPageChange: onPageChange,
          pages: pages
        });
      }
    }]);

    return PaginationListAdapter;
  }((0, _pageResolver3.default)(_react.Component));
};

var PaginationListWithAdapter = exports.PaginationListWithAdapter = paginationListAdapter(_paginationList2.default);
exports.default = paginationListAdapter;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _pageButton = __webpack_require__(24);

var _pageButton2 = _interopRequireDefault(_pageButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PaginatonList = function PaginatonList(props) {
  return _react2.default.createElement(
    'ul',
    { className: 'pagination react-bootstrap-table-page-btns-ul' },
    props.pages.map(function (pageProps) {
      if (props.pageButtonRenderer) {
        return props.pageButtonRenderer(_extends({}, pageProps, {
          onPageChange: props.onPageChange
        }));
      }
      return _react2.default.createElement(_pageButton2.default, _extends({
        key: pageProps.page
      }, pageProps, {
        onPageChange: props.onPageChange
      }));
    })
  );
};

PaginatonList.propTypes = {
  pages: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    page: _propTypes2.default.oneOfType([_propTypes2.default.node, _propTypes2.default.number, _propTypes2.default.string]),
    active: _propTypes2.default.bool,
    disable: _propTypes2.default.bool,
    title: _propTypes2.default.string
  })).isRequired,
  onPageChange: _propTypes2.default.func.isRequired,
  pageButtonRenderer: _propTypes2.default.func
};

PaginatonList.defaultProps = {
  pageButtonRenderer: null
};

exports.default = PaginatonList;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PaginationTotalWithAdapter = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _pageResolver2 = __webpack_require__(3);

var _pageResolver3 = _interopRequireDefault(_pageResolver2);

var _paginationTotal = __webpack_require__(14);

var _paginationTotal2 = _interopRequireDefault(_paginationTotal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint react/prop-types: 0 */


var paginationTotalAdapter = function paginationTotalAdapter(WrappedComponent) {
  return function (_pageResolver) {
    _inherits(PaginationTotalAdapter, _pageResolver);

    function PaginationTotalAdapter() {
      _classCallCheck(this, PaginationTotalAdapter);

      return _possibleConstructorReturn(this, (PaginationTotalAdapter.__proto__ || Object.getPrototypeOf(PaginationTotalAdapter)).apply(this, arguments));
    }

    _createClass(PaginationTotalAdapter, [{
      key: 'render',
      value: function render() {
        var _calculateFromTo = this.calculateFromTo(),
            _calculateFromTo2 = _slicedToArray(_calculateFromTo, 2),
            from = _calculateFromTo2[0],
            to = _calculateFromTo2[1];

        return _react2.default.createElement(WrappedComponent, {
          from: from,
          to: to,
          dataSize: this.props.dataSize,
          paginationTotalRenderer: this.props.paginationTotalRenderer
        });
      }
    }]);

    return PaginationTotalAdapter;
  }((0, _pageResolver3.default)(_react.Component));
};

var PaginationTotalWithAdapter = exports.PaginationTotalWithAdapter = paginationTotalAdapter(_paginationTotal2.default);
exports.default = paginationTotalAdapter;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PaginationTotal = function PaginationTotal(props) {
  if (props.paginationTotalRenderer) {
    return props.paginationTotalRenderer(props.from, props.to, props.dataSize);
  }
  return _react2.default.createElement(
    'span',
    { className: 'react-bootstrap-table-pagination-total' },
    '\xA0Showing rows ',
    props.from,
    ' to\xA0',
    props.to,
    ' of\xA0',
    props.dataSize
  );
};

PaginationTotal.propTypes = {
  from: _propTypes2.default.number.isRequired,
  to: _propTypes2.default.number.isRequired,
  dataSize: _propTypes2.default.number.isRequired,
  paginationTotalRenderer: _propTypes2.default.func
};

PaginationTotal.defaultProps = {
  paginationTotalRenderer: undefined
};

exports.default = PaginationTotal;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PaginationTotalStandalone = exports.SizePerPageDropdownStandalone = exports.PaginationListStandalone = exports.PaginationProvider = undefined;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _stateContext = __webpack_require__(7);

var _stateContext2 = _interopRequireDefault(_stateContext);

var _dataContext = __webpack_require__(21);

var _dataContext2 = _interopRequireDefault(_dataContext);

var _paginationListStandalone = __webpack_require__(25);

var _paginationListStandalone2 = _interopRequireDefault(_paginationListStandalone);

var _sizePerPageDropdownStandalone = __webpack_require__(26);

var _sizePerPageDropdownStandalone2 = _interopRequireDefault(_sizePerPageDropdownStandalone);

var _paginationTotalStandalone = __webpack_require__(27);

var _paginationTotalStandalone2 = _interopRequireDefault(_paginationTotalStandalone);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return {
    createContext: _dataContext2.default,
    options: options
  };
};

var _createBaseContext = (0, _stateContext2.default)(),
    Provider = _createBaseContext.Provider,
    Consumer = _createBaseContext.Consumer;

var CustomizableProvider = function CustomizableProvider(props) {
  return _react2.default.createElement(
    Provider,
    props,
    _react2.default.createElement(
      Consumer,
      null,
      function (paginationProps) {
        return props.children(paginationProps);
      }
    )
  );
};

CustomizableProvider.propTypes = {
  children: _propTypes2.default.func.isRequired
};

var PaginationProvider = exports.PaginationProvider = CustomizableProvider;
exports.PaginationListStandalone = _paginationListStandalone2.default;
exports.SizePerPageDropdownStandalone = _sizePerPageDropdownStandalone2.default;
exports.PaginationTotalStandalone = _paginationTotalStandalone2.default;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



var emptyFunction = __webpack_require__(17);
var invariant = __webpack_require__(18);
var ReactPropTypesSecret = __webpack_require__(19);

module.exports = function() {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret) {
      // It is still safe when called from React.
      return;
    }
    invariant(
      false,
      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
      'Use PropTypes.checkPropTypes() to call them. ' +
      'Read more at http://fb.me/use-check-prop-types'
    );
  };
  shim.isRequired = shim;
  function getShim() {
    return shim;
  };
  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  var ReactPropTypes = {
    array: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,

    any: shim,
    arrayOf: getShim,
    element: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim
  };

  ReactPropTypes.checkPropTypes = emptyFunction;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

function makeEmptyFunction(arg) {
  return function () {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
var emptyFunction = function emptyFunction() {};

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function () {
  return this;
};
emptyFunction.thatReturnsArgument = function (arg) {
  return arg;
};

module.exports = emptyFunction;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var validateFormat = function validateFormat(format) {};

if (false) {
  validateFormat = function validateFormat(format) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  };
}

function invariant(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

module.exports = invariant;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;


/***/ }),
/* 20 */
/***/ (function(module, exports) {

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      } else {
        // At least give some kind of context to the user
        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
        err.context = er;
        throw err;
      }
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        args = Array.prototype.slice.call(arguments, 1);
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    args = Array.prototype.slice.call(arguments, 1);
    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else if (listeners) {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.prototype.listenerCount = function(type) {
  if (this._events) {
    var evlistener = this._events[type];

    if (isFunction(evlistener))
      return 1;
    else if (evlistener)
      return evlistener.length;
  }
  return 0;
};

EventEmitter.listenerCount = function(emitter, type) {
  return emitter.listenerCount(type);
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _const = __webpack_require__(2);

var _const2 = _interopRequireDefault(_const);

var _pagination = __webpack_require__(22);

var _pagination2 = _interopRequireDefault(_pagination);

var _page = __webpack_require__(8);

var _stateContext = __webpack_require__(7);

var _stateContext2 = _interopRequireDefault(_stateContext);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint react/prop-types: 0 */
/* eslint react/require-default-props: 0 */
/* eslint no-lonely-if: 0 */


var _createBaseContext = (0, _stateContext2.default)(),
    Provider = _createBaseContext.Provider;

var PaginationDataContext = _react2.default.createContext();

var PaginationDataProvider = function (_Provider) {
  _inherits(PaginationDataProvider, _Provider);

  function PaginationDataProvider() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, PaginationDataProvider);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = PaginationDataProvider.__proto__ || Object.getPrototypeOf(PaginationDataProvider)).call.apply(_ref, [this].concat(args))), _this), _this.isRemotePagination = function () {
      return _this.props.isRemotePagination();
    }, _this.renderDefaultPagination = function () {
      if (!_this.props.pagination.options.custom) {
        var _this$getPaginationPr = _this.getPaginationProps(),
            currPage = _this$getPaginationPr.page,
            currSizePerPage = _this$getPaginationPr.sizePerPage,
            dataSize = _this$getPaginationPr.dataSize,
            rest = _objectWithoutProperties(_this$getPaginationPr, ['page', 'sizePerPage', 'dataSize']);

        return _react2.default.createElement(_pagination2.default, _extends({}, rest, {
          key: 'pagination',
          dataSize: dataSize || _this.props.data.length,
          currPage: currPage,
          currSizePerPage: currSizePerPage
        }));
      }
      return null;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(PaginationDataProvider, [{
    key: 'UNSAFE_componentWillReceiveProps',


    // eslint-disable-next-line camelcase, react/sort-comp
    value: function UNSAFE_componentWillReceiveProps(nextProps) {
      _get(PaginationDataProvider.prototype.__proto__ || Object.getPrototypeOf(PaginationDataProvider.prototype), 'UNSAFE_componentWillReceiveProps', this).call(this, nextProps);
      var currSizePerPage = this.currSizePerPage;
      var _nextProps$pagination = nextProps.pagination.options,
          custom = _nextProps$pagination.custom,
          onPageChange = _nextProps$pagination.onPageChange;


      var pageStartIndex = typeof nextProps.pagination.options.pageStartIndex !== 'undefined' ? nextProps.pagination.options.pageStartIndex : _const2.default.PAGE_START_INDEX;

      // user should align the page when the page is not fit to the data size when remote enable
      if (!this.isRemotePagination() && !custom) {
        var newPage = (0, _page.alignPage)(nextProps.data.length, this.props.data.length, this.currPage, currSizePerPage, pageStartIndex);

        if (this.currPage !== newPage) {
          if (onPageChange) {
            onPageChange(newPage, currSizePerPage);
          }
          this.currPage = newPage;
        }
      }
      if (nextProps.onDataSizeChange && nextProps.data.length !== this.props.data.length) {
        nextProps.onDataSizeChange({ dataSize: nextProps.data.length });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var data = this.props.data;
      var options = this.props.pagination.options;
      var currPage = this.currPage,
          currSizePerPage = this.currSizePerPage;

      var pageStartIndex = typeof options.pageStartIndex === 'undefined' ? _const2.default.PAGE_START_INDEX : options.pageStartIndex;

      data = this.isRemotePagination() ? data : (0, _page.getByCurrPage)(data, currPage, currSizePerPage, pageStartIndex);

      return _react2.default.createElement(
        PaginationDataContext.Provider,
        { value: { data: data, setRemoteEmitter: this.setRemoteEmitter } },
        this.props.children,
        this.renderDefaultPagination()
      );
    }
  }]);

  return PaginationDataProvider;
}(Provider);

PaginationDataProvider.propTypes = {
  data: _propTypes2.default.array.isRequired,
  remoteEmitter: _propTypes2.default.object.isRequired,
  isRemotePagination: _propTypes2.default.func.isRequired };

exports.default = function () {
  return {
    Provider: PaginationDataProvider,
    Consumer: PaginationDataContext.Consumer
  };
};

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _classnames = __webpack_require__(4);

var _classnames2 = _interopRequireDefault(_classnames);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _pageResolver2 = __webpack_require__(3);

var _pageResolver3 = _interopRequireDefault(_pageResolver2);

var _paginationHandler = __webpack_require__(5);

var _paginationHandler2 = _interopRequireDefault(_paginationHandler);

var _sizePerPageDropdownAdapter = __webpack_require__(9);

var _paginationListAdapter = __webpack_require__(11);

var _paginationTotalAdapter = __webpack_require__(13);

var _const = __webpack_require__(2);

var _const2 = _interopRequireDefault(_const);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint react/require-default-props: 0 */
/* eslint arrow-body-style: 0 */


var Pagination = function (_pageResolver) {
  _inherits(Pagination, _pageResolver);

  function Pagination() {
    _classCallCheck(this, Pagination);

    return _possibleConstructorReturn(this, (Pagination.__proto__ || Object.getPrototypeOf(Pagination)).apply(this, arguments));
  }

  _createClass(Pagination, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          tableId = _props.tableId,
          currPage = _props.currPage,
          pageStartIndex = _props.pageStartIndex,
          showTotal = _props.showTotal,
          dataSize = _props.dataSize,
          pageListRenderer = _props.pageListRenderer,
          pageButtonRenderer = _props.pageButtonRenderer,
          paginationTotalRenderer = _props.paginationTotalRenderer,
          hidePageListOnlyOnePage = _props.hidePageListOnlyOnePage,
          totalPages = _props.totalPages,
          lastPage = _props.lastPage,
          onPageChange = _props.onPageChange,
          sizePerPageList = _props.sizePerPageList,
          currSizePerPage = _props.currSizePerPage,
          hideSizePerPage = _props.hideSizePerPage,
          sizePerPageRenderer = _props.sizePerPageRenderer,
          sizePerPageOptionRenderer = _props.sizePerPageOptionRenderer,
          onSizePerPageChange = _props.onSizePerPageChange,
          bootstrap4 = _props.bootstrap4,
          rest = _objectWithoutProperties(_props, ['tableId', 'currPage', 'pageStartIndex', 'showTotal', 'dataSize', 'pageListRenderer', 'pageButtonRenderer', 'paginationTotalRenderer', 'hidePageListOnlyOnePage', 'totalPages', 'lastPage', 'onPageChange', 'sizePerPageList', 'currSizePerPage', 'hideSizePerPage', 'sizePerPageRenderer', 'sizePerPageOptionRenderer', 'onSizePerPageChange', 'bootstrap4']);

      var pages = this.calculatePageStatus(this.calculatePages(totalPages, lastPage), lastPage);
      var pageListClass = (0, _classnames2.default)('react-bootstrap-table-pagination-list', 'col-md-6 col-xs-6 col-sm-6 col-lg-6', {
        'react-bootstrap-table-pagination-list-hidden': hidePageListOnlyOnePage && totalPages === 1
      });
      return _react2.default.createElement(
        'div',
        { className: 'row react-bootstrap-table-pagination' },
        _react2.default.createElement(
          'div',
          { className: 'col-md-6 col-xs-6 col-sm-6 col-lg-6' },
          _react2.default.createElement(_sizePerPageDropdownAdapter.SizePerPageDropdownWithAdapter, {
            bootstrap4: bootstrap4,
            tableId: tableId,
            sizePerPageList: sizePerPageList,
            currSizePerPage: currSizePerPage,
            hideSizePerPage: hideSizePerPage,
            sizePerPageRenderer: sizePerPageRenderer,
            sizePerPageOptionRenderer: sizePerPageOptionRenderer,
            onSizePerPageChange: onSizePerPageChange
          }),
          showTotal ? _react2.default.createElement(_paginationTotalAdapter.PaginationTotalWithAdapter, {
            currPage: currPage,
            currSizePerPage: currSizePerPage,
            pageStartIndex: pageStartIndex,
            dataSize: dataSize,
            paginationTotalRenderer: paginationTotalRenderer
          }) : null
        ),
        pageListRenderer ? pageListRenderer({
          pages: pages,
          onPageChange: onPageChange
        }) : _react2.default.createElement(
          'div',
          { className: pageListClass },
          _react2.default.createElement(_paginationListAdapter.PaginationListWithAdapter, _extends({}, rest, {
            currPage: currPage,
            currSizePerPage: currSizePerPage,
            pageStartIndex: pageStartIndex,
            lastPage: lastPage,
            totalPages: totalPages,
            pageButtonRenderer: pageButtonRenderer,
            onPageChange: onPageChange
          }))
        )
      );
    }
  }]);

  return Pagination;
}((0, _pageResolver3.default)(_react.Component));

Pagination.propTypes = {
  dataSize: _propTypes2.default.number.isRequired,
  sizePerPageList: _propTypes2.default.array.isRequired,
  currPage: _propTypes2.default.number.isRequired,
  currSizePerPage: _propTypes2.default.number.isRequired,
  onPageChange: _propTypes2.default.func.isRequired,
  onSizePerPageChange: _propTypes2.default.func.isRequired,
  disablePageTitle: _propTypes2.default.bool,
  pageStartIndex: _propTypes2.default.number,
  paginationSize: _propTypes2.default.number,
  showTotal: _propTypes2.default.bool,
  pageListRenderer: _propTypes2.default.func,
  pageButtonRenderer: _propTypes2.default.func,
  sizePerPageRenderer: _propTypes2.default.func,
  paginationTotalRenderer: _propTypes2.default.func,
  sizePerPageOptionRenderer: _propTypes2.default.func,
  firstPageText: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.node]),
  prePageText: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.node]),
  nextPageText: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.node]),
  lastPageText: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.node]),
  nextPageTitle: _propTypes2.default.string,
  prePageTitle: _propTypes2.default.string,
  firstPageTitle: _propTypes2.default.string,
  lastPageTitle: _propTypes2.default.string,
  withFirstAndLast: _propTypes2.default.bool,
  alwaysShowAllBtns: _propTypes2.default.bool,
  hideSizePerPage: _propTypes2.default.bool,
  hidePageListOnlyOnePage: _propTypes2.default.bool,
  bootstrap4: _propTypes2.default.bool
};

Pagination.defaultProps = {
  disablePageTitle: false,
  bootstrap4: false,
  pageStartIndex: _const2.default.PAGE_START_INDEX,
  paginationSize: _const2.default.PAGINATION_SIZE,
  withFirstAndLast: _const2.default.With_FIRST_AND_LAST,
  alwaysShowAllBtns: _const2.default.SHOW_ALL_PAGE_BTNS,
  showTotal: _const2.default.SHOW_TOTAL,
  pageListRenderer: null,
  pageButtonRenderer: null,
  sizePerPageRenderer: null,
  paginationTotalRenderer: _const2.default.PAGINATION_TOTAL,
  sizePerPageOptionRenderer: null,
  firstPageText: _const2.default.FIRST_PAGE_TEXT,
  prePageText: _const2.default.PRE_PAGE_TEXT,
  nextPageText: _const2.default.NEXT_PAGE_TEXT,
  lastPageText: _const2.default.LAST_PAGE_TEXT,
  sizePerPageList: _const2.default.SIZE_PER_PAGE_LIST,
  nextPageTitle: _const2.default.NEXT_PAGE_TITLE,
  prePageTitle: _const2.default.PRE_PAGE_TITLE,
  firstPageTitle: _const2.default.FIRST_PAGE_TITLE,
  lastPageTitle: _const2.default.LAST_PAGE_TITLE,
  hideSizePerPage: _const2.default.HIDE_SIZE_PER_PAGE,
  hidePageListOnlyOnePage: _const2.default.HIDE_PAGE_LIST_ONLY_ONE_PAGE
};

exports.default = (0, _paginationHandler2.default)(Pagination);

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint jsx-a11y/href-no-hash: 0 */
var SizePerPageOption = function SizePerPageOption(_ref) {
  var text = _ref.text,
      page = _ref.page,
      onSizePerPageChange = _ref.onSizePerPageChange,
      bootstrap4 = _ref.bootstrap4;
  return bootstrap4 ? _react2.default.createElement(
    'a',
    {
      href: '#',
      tabIndex: '-1',
      role: 'menuitem',
      className: 'dropdown-item',
      'data-page': page,
      onMouseDown: function onMouseDown(e) {
        e.preventDefault();
        onSizePerPageChange(page);
      }
    },
    text
  ) : _react2.default.createElement(
    'li',
    {
      key: text,
      role: 'presentation',
      className: 'dropdown-item'
    },
    _react2.default.createElement(
      'a',
      {
        href: '#',
        tabIndex: '-1',
        role: 'menuitem',
        'data-page': page,
        onMouseDown: function onMouseDown(e) {
          e.preventDefault();
          onSizePerPageChange(page);
        }
      },
      text
    )
  );
};

SizePerPageOption.propTypes = {
  text: _propTypes2.default.string.isRequired,
  page: _propTypes2.default.number.isRequired,
  onSizePerPageChange: _propTypes2.default.func.isRequired,
  bootstrap4: _propTypes2.default.bool
};

SizePerPageOption.defaultProps = {
  bootstrap4: false
};

exports.default = SizePerPageOption;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _classnames = __webpack_require__(4);

var _classnames2 = _interopRequireDefault(_classnames);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint react/require-default-props: 0 */
/* eslint jsx-a11y/href-no-hash: 0 */


var PageButton = function (_Component) {
  _inherits(PageButton, _Component);

  function PageButton(props) {
    _classCallCheck(this, PageButton);

    var _this = _possibleConstructorReturn(this, (PageButton.__proto__ || Object.getPrototypeOf(PageButton)).call(this, props));

    _this.handleClick = _this.handleClick.bind(_this);
    return _this;
  }

  _createClass(PageButton, [{
    key: 'handleClick',
    value: function handleClick(e) {
      e.preventDefault();
      this.props.onPageChange(this.props.page);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          page = _props.page,
          title = _props.title,
          active = _props.active,
          disabled = _props.disabled,
          className = _props.className;

      var classes = (0, _classnames2.default)({
        active: active,
        disabled: disabled,
        'page-item': true
      }, className);

      return _react2.default.createElement(
        'li',
        { className: classes, title: title },
        _react2.default.createElement(
          'a',
          { href: '#', onClick: this.handleClick, className: 'page-link' },
          page
        )
      );
    }
  }]);

  return PageButton;
}(_react.Component);

PageButton.propTypes = {
  onPageChange: _propTypes2.default.func.isRequired,
  page: _propTypes2.default.oneOfType([_propTypes2.default.node, _propTypes2.default.number, _propTypes2.default.string]).isRequired,
  active: _propTypes2.default.bool.isRequired,
  disabled: _propTypes2.default.bool.isRequired,
  className: _propTypes2.default.string,
  title: _propTypes2.default.string
};

exports.default = PageButton;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _paginationList = __webpack_require__(12);

var _paginationList2 = _interopRequireDefault(_paginationList);

var _standaloneAdapter = __webpack_require__(6);

var _standaloneAdapter2 = _interopRequireDefault(_standaloneAdapter);

var _paginationHandler = __webpack_require__(5);

var _paginationHandler2 = _interopRequireDefault(_paginationHandler);

var _paginationListAdapter = __webpack_require__(11);

var _paginationListAdapter2 = _interopRequireDefault(_paginationListAdapter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PaginationListStandalone = function PaginationListStandalone(props) {
  return _react2.default.createElement(_paginationList2.default, props);
};

exports.default = (0, _standaloneAdapter2.default)((0, _paginationHandler2.default)((0, _paginationListAdapter2.default)(PaginationListStandalone)));

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _sizePerPageDropdown = __webpack_require__(10);

var _sizePerPageDropdown2 = _interopRequireDefault(_sizePerPageDropdown);

var _standaloneAdapter = __webpack_require__(6);

var _standaloneAdapter2 = _interopRequireDefault(_standaloneAdapter);

var _paginationHandler = __webpack_require__(5);

var _paginationHandler2 = _interopRequireDefault(_paginationHandler);

var _sizePerPageDropdownAdapter = __webpack_require__(9);

var _sizePerPageDropdownAdapter2 = _interopRequireDefault(_sizePerPageDropdownAdapter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SizePerPageDropdownStandalone = function SizePerPageDropdownStandalone(props) {
  return _react2.default.createElement(_sizePerPageDropdown2.default, props);
};

exports.default = (0, _standaloneAdapter2.default)((0, _paginationHandler2.default)((0, _sizePerPageDropdownAdapter2.default)(SizePerPageDropdownStandalone)));

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _paginationTotal = __webpack_require__(14);

var _paginationTotal2 = _interopRequireDefault(_paginationTotal);

var _standaloneAdapter = __webpack_require__(6);

var _standaloneAdapter2 = _interopRequireDefault(_standaloneAdapter);

var _paginationTotalAdapter = __webpack_require__(13);

var _paginationTotalAdapter2 = _interopRequireDefault(_paginationTotalAdapter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PaginationTotalStandalone = function PaginationTotalStandalone(props) {
  return _react2.default.createElement(_paginationTotal2.default, props);
};

exports.default = (0, _standaloneAdapter2.default)((0, _paginationTotalAdapter2.default)(PaginationTotalStandalone));

/***/ })
/******/ ]);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA3ODkxMWM5Zjc0MzBmMjhkMTllZiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwge1wicm9vdFwiOlwiUmVhY3RcIixcImNvbW1vbmpzMlwiOlwicmVhY3RcIixcImNvbW1vbmpzXCI6XCJyZWFjdFwiLFwiYW1kXCI6XCJyZWFjdFwifSIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvcC10eXBlcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9wYWNrYWdlcy9yZWFjdC1ib290c3RyYXAtdGFibGUyLXBhZ2luYXRvci9zcmMvY29uc3QuanMiLCJ3ZWJwYWNrOi8vLy4vcGFja2FnZXMvcmVhY3QtYm9vdHN0cmFwLXRhYmxlMi1wYWdpbmF0b3Ivc3JjL3BhZ2UtcmVzb2x2ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NsYXNzbmFtZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vcGFja2FnZXMvcmVhY3QtYm9vdHN0cmFwLXRhYmxlMi1wYWdpbmF0b3Ivc3JjL3BhZ2luYXRpb24taGFuZGxlci5qcyIsIndlYnBhY2s6Ly8vLi9wYWNrYWdlcy9yZWFjdC1ib290c3RyYXAtdGFibGUyLXBhZ2luYXRvci9zcmMvc3RhbmRhbG9uZS1hZGFwdGVyLmpzIiwid2VicGFjazovLy8uL3BhY2thZ2VzL3JlYWN0LWJvb3RzdHJhcC10YWJsZTItcGFnaW5hdG9yL3NyYy9zdGF0ZS1jb250ZXh0LmpzIiwid2VicGFjazovLy8uL3BhY2thZ2VzL3JlYWN0LWJvb3RzdHJhcC10YWJsZTItcGFnaW5hdG9yL3NyYy9wYWdlLmpzIiwid2VicGFjazovLy8uL3BhY2thZ2VzL3JlYWN0LWJvb3RzdHJhcC10YWJsZTItcGFnaW5hdG9yL3NyYy9zaXplLXBlci1wYWdlLWRyb3Bkb3duLWFkYXB0ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vcGFja2FnZXMvcmVhY3QtYm9vdHN0cmFwLXRhYmxlMi1wYWdpbmF0b3Ivc3JjL3NpemUtcGVyLXBhZ2UtZHJvcGRvd24uanMiLCJ3ZWJwYWNrOi8vLy4vcGFja2FnZXMvcmVhY3QtYm9vdHN0cmFwLXRhYmxlMi1wYWdpbmF0b3Ivc3JjL3BhZ2luYXRpb24tbGlzdC1hZGFwdGVyLmpzIiwid2VicGFjazovLy8uL3BhY2thZ2VzL3JlYWN0LWJvb3RzdHJhcC10YWJsZTItcGFnaW5hdG9yL3NyYy9wYWdpbmF0aW9uLWxpc3QuanMiLCJ3ZWJwYWNrOi8vLy4vcGFja2FnZXMvcmVhY3QtYm9vdHN0cmFwLXRhYmxlMi1wYWdpbmF0b3Ivc3JjL3BhZ2luYXRpb24tdG90YWwtYWRhcHRlci5qcyIsIndlYnBhY2s6Ly8vLi9wYWNrYWdlcy9yZWFjdC1ib290c3RyYXAtdGFibGUyLXBhZ2luYXRvci9zcmMvcGFnaW5hdGlvbi10b3RhbC5qcyIsIndlYnBhY2s6Ly8vLi9wYWNrYWdlcy9yZWFjdC1ib290c3RyYXAtdGFibGUyLXBhZ2luYXRvci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvcC10eXBlcy9mYWN0b3J5V2l0aFRocm93aW5nU2hpbXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2ZianMvbGliL2VtcHR5RnVuY3Rpb24uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2ZianMvbGliL2ludmFyaWFudC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvcC10eXBlcy9saWIvUmVhY3RQcm9wVHlwZXNTZWNyZXQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2V2ZW50cy9ldmVudHMuanMiLCJ3ZWJwYWNrOi8vLy4vcGFja2FnZXMvcmVhY3QtYm9vdHN0cmFwLXRhYmxlMi1wYWdpbmF0b3Ivc3JjL2RhdGEtY29udGV4dC5qcyIsIndlYnBhY2s6Ly8vLi9wYWNrYWdlcy9yZWFjdC1ib290c3RyYXAtdGFibGUyLXBhZ2luYXRvci9zcmMvcGFnaW5hdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9wYWNrYWdlcy9yZWFjdC1ib290c3RyYXAtdGFibGUyLXBhZ2luYXRvci9zcmMvc2l6ZS1wZXItcGFnZS1vcHRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vcGFja2FnZXMvcmVhY3QtYm9vdHN0cmFwLXRhYmxlMi1wYWdpbmF0b3Ivc3JjL3BhZ2UtYnV0dG9uLmpzIiwid2VicGFjazovLy8uL3BhY2thZ2VzL3JlYWN0LWJvb3RzdHJhcC10YWJsZTItcGFnaW5hdG9yL3NyYy9wYWdpbmF0aW9uLWxpc3Qtc3RhbmRhbG9uZS5qcyIsIndlYnBhY2s6Ly8vLi9wYWNrYWdlcy9yZWFjdC1ib290c3RyYXAtdGFibGUyLXBhZ2luYXRvci9zcmMvc2l6ZS1wZXItcGFnZS1kcm9wZG93bi1zdGFuZGFsb25lLmpzIiwid2VicGFjazovLy8uL3BhY2thZ2VzL3JlYWN0LWJvb3RzdHJhcC10YWJsZTItcGFnaW5hdG9yL3NyYy9wYWdpbmF0aW9uLXRvdGFsLXN0YW5kYWxvbmUuanMiXSwibmFtZXMiOlsiUEFHSU5BVElPTl9TSVpFIiwiUEFHRV9TVEFSVF9JTkRFWCIsIldpdGhfRklSU1RfQU5EX0xBU1QiLCJTSE9XX0FMTF9QQUdFX0JUTlMiLCJTSE9XX1RPVEFMIiwiUEFHSU5BVElPTl9UT1RBTCIsIkZJUlNUX1BBR0VfVEVYVCIsIlBSRV9QQUdFX1RFWFQiLCJORVhUX1BBR0VfVEVYVCIsIkxBU1RfUEFHRV9URVhUIiwiTkVYVF9QQUdFX1RJVExFIiwiTEFTVF9QQUdFX1RJVExFIiwiUFJFX1BBR0VfVElUTEUiLCJGSVJTVF9QQUdFX1RJVExFIiwiU0laRV9QRVJfUEFHRV9MSVNUIiwiSElERV9TSVpFX1BFUl9QQUdFIiwiSElERV9QQUdFX0xJU1RfT05MWV9PTkVfUEFHRSIsInByb3BzIiwiY3VyclBhZ2UiLCJwYWdlU3RhcnRJbmRleCIsInRvdGFsUGFnZXMiLCJjYWxjdWxhdGVUb3RhbFBhZ2UiLCJsYXN0UGFnZSIsImNhbGN1bGF0ZUxhc3RQYWdlIiwic2l6ZVBlclBhZ2UiLCJjdXJyU2l6ZVBlclBhZ2UiLCJkYXRhU2l6ZSIsIk1hdGgiLCJjZWlsIiwib2Zmc2V0IiwiYWJzIiwiZnJvbSIsInRvIiwibWluIiwicGFnaW5hdGlvblNpemUiLCJ3aXRoRmlyc3RBbmRMYXN0IiwiZmlyc3RQYWdlVGV4dCIsInByZVBhZ2VUZXh0IiwibmV4dFBhZ2VUZXh0IiwibGFzdFBhZ2VUZXh0IiwiYWx3YXlzU2hvd0FsbEJ0bnMiLCJwYWdlcyIsImVuZFBhZ2UiLCJzdGFydFBhZ2UiLCJtYXgiLCJmbG9vciIsImxlbmd0aCIsImkiLCJwdXNoIiwiZGlzYWJsZVBhZ2VUaXRsZSIsImlzU3RhcnQiLCJwYWdlIiwiaXNFbmQiLCJmaWx0ZXIiLCJtYXAiLCJ0aXRsZSIsImFjdGl2ZSIsImRpc2FibGVkIiwibmV4dFBhZ2VUaXRsZSIsInByZVBhZ2VUaXRsZSIsImZpcnN0UGFnZVRpdGxlIiwibGFzdFBhZ2VUaXRsZSIsInBhZ2VSZXN1bHQiLCJzaXplUGVyUGFnZUxpc3QiLCJfc2l6ZVBlclBhZ2UiLCJwYWdlVGV4dCIsInRleHQiLCJwYWdlTnVtYmVyIiwidmFsdWUiLCJFeHRlbmRCYXNlIiwiaGFuZGxlQ2hhbmdlUGFnZSIsImJpbmQiLCJoYW5kbGVDaGFuZ2VTaXplUGVyUGFnZSIsInN0YXRlIiwiaW5pdGlhbFN0YXRlIiwibmV4dFByb3BzIiwic2V0U3RhdGUiLCJvblNpemVQZXJQYWdlQ2hhbmdlIiwic2VsZWN0ZWRTaXplIiwicGFyc2VJbnQiLCJuZXdUb3RhbFBhZ2VzIiwibmV3TGFzdFBhZ2UiLCJuZXdQYWdlIiwib25QYWdlQ2hhbmdlIiwiYmFja1RvUHJldlBhZ2UiLCJyZXN0IiwiU3RhdGVDb250ZXh0IiwiY3JlYXRlQ29udGV4dCIsIlN0YXRlUHJvdmlkZXIiLCJoYW5kbGVEYXRhU2l6ZUNoYW5nZSIsIm9wdGlvbnMiLCJwYWdpbmF0aW9uIiwidG90YWxTaXplIiwiZGF0YUNoYW5nZUxpc3RlbmVyIiwib24iLCJjdXN0b20iLCJpc1JlbW90ZVBhZ2luYXRpb24iLCJuZXdEYXRhU2l6ZSIsImZvcmNlVXBkYXRlIiwiZ2V0UGFnaW5hdGlvblJlbW90ZUVtaXR0ZXIiLCJlbWl0IiwicGFnaW5hdGlvblByb3BzIiwiZ2V0UGFnaW5hdGlvblByb3BzIiwicGFnaW5hdGlvblRhYmxlUHJvcHMiLCJzZXRQYWdpbmF0aW9uUmVtb3RlRW1pdHRlciIsImNoaWxkcmVuIiwiQ29tcG9uZW50IiwiYm9vdHN0cmFwNCIsInRhYmxlSWQiLCJoaWRlU2l6ZVBlclBhZ2UiLCJoaWRlUGFnZUxpc3RPbmx5T25lUGFnZSIsInNob3dUb3RhbCIsInBhZ2VMaXN0UmVuZGVyZXIiLCJwYWdlQnV0dG9uUmVuZGVyZXIiLCJzaXplUGVyUGFnZVJlbmRlcmVyIiwicGFnaW5hdGlvblRvdGFsUmVuZGVyZXIiLCJzaXplUGVyUGFnZU9wdGlvblJlbmRlcmVyIiwicmVtb3RlRW1pdHRlciIsImUiLCJyZXN1bHQiLCJQcm92aWRlciIsIkNvbnN1bWVyIiwiZ2V0Tm9ybWFsaXplZFBhZ2UiLCJlbmRJbmRleCIsInN0YXJ0SW5kZXgiLCJlbmQiLCJhbGlnblBhZ2UiLCJwcmV2RGF0YVNpemUiLCJnZXRCeUN1cnJQYWdlIiwiZGF0YSIsInN0YXJ0Iiwic2l6ZVBlclBhZ2VEcm9wZG93bkFkYXB0ZXIiLCJjbG9zZURyb3BEb3duIiwidG9nZ2xlRHJvcERvd24iLCJkcm9wZG93bk9wZW4iLCJvcGVuIiwiY2FsY3VsYXRlU2l6ZVBlclBhZ2VTdGF0dXMiLCJTaXplUGVyUGFnZURyb3Bkb3duV2l0aEFkYXB0ZXIiLCJzaXplUGVyUGFnZURlZmF1bHRDbGFzcyIsIlNpemVQZXJQYWdlRHJvcERvd24iLCJoaWRkZW4iLCJvbkNsaWNrIiwib25CbHVyIiwiY2xhc3NOYW1lIiwidmFyaWF0aW9uIiwiYnRuQ29udGV4dHVhbCIsIm9wdGlvblJlbmRlcmVyIiwiZHJvcERvd25TdHlsZSIsInZpc2liaWxpdHkiLCJvcGVuQ2xhc3MiLCJkcm9wZG93bkNsYXNzZXMiLCJpZCIsIm9wdGlvbiIsInByb3BUeXBlcyIsInN0cmluZyIsImlzUmVxdWlyZWQiLCJhcnJheSIsImZ1bmMiLCJib29sIiwib25lT2YiLCJkZWZhdWx0UHJvcHMiLCJwYWdpbmF0aW9uTGlzdEFkYXB0ZXIiLCJjYWxjdWxhdGVQYWdlU3RhdHVzIiwiY2FsY3VsYXRlUGFnZXMiLCJQYWdpbmF0aW9uTGlzdFdpdGhBZGFwdGVyIiwiUGFnaW5hdG9uTGlzdCIsInBhZ2VQcm9wcyIsImFycmF5T2YiLCJzaGFwZSIsIm9uZU9mVHlwZSIsIm5vZGUiLCJudW1iZXIiLCJkaXNhYmxlIiwicGFnaW5hdGlvblRvdGFsQWRhcHRlciIsImNhbGN1bGF0ZUZyb21UbyIsIlBhZ2luYXRpb25Ub3RhbFdpdGhBZGFwdGVyIiwiUGFnaW5hdGlvblRvdGFsIiwidW5kZWZpbmVkIiwiQ3VzdG9taXphYmxlUHJvdmlkZXIiLCJQYWdpbmF0aW9uUHJvdmlkZXIiLCJQYWdpbmF0aW9uTGlzdFN0YW5kYWxvbmUiLCJTaXplUGVyUGFnZURyb3Bkb3duU3RhbmRhbG9uZSIsIlBhZ2luYXRpb25Ub3RhbFN0YW5kYWxvbmUiLCJQYWdpbmF0aW9uRGF0YUNvbnRleHQiLCJQYWdpbmF0aW9uRGF0YVByb3ZpZGVyIiwicmVuZGVyRGVmYXVsdFBhZ2luYXRpb24iLCJvbkRhdGFTaXplQ2hhbmdlIiwic2V0UmVtb3RlRW1pdHRlciIsIm9iamVjdCIsIlBhZ2luYXRpb24iLCJwYWdlTGlzdENsYXNzIiwiU2l6ZVBlclBhZ2VPcHRpb24iLCJwcmV2ZW50RGVmYXVsdCIsIlBhZ2VCdXR0b24iLCJoYW5kbGVDbGljayIsImNsYXNzZXMiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFF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O0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQSwwQkFBMEI7QUFDMUI7QUFDQTtBQUNBOztBQUVBLDJCOzs7Ozs7O0FDcERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7Ozs7Ozs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakIsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxlQUFlLFNBQVM7QUFDeEI7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtB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VyxvQkFBVVcsTUFUQTtBQVVyQm5HLFNBQU8sb0JBQVVtRztBQVZJLENBQXZCOztrQkFhZXVDLFU7Ozs7Ozs7Ozs7Ozs7QUNwRGY7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUEsSUFBTWIsMkJBQTJCLFNBQTNCQSx3QkFBMkI7QUFBQSxTQUMvQix3REFBcUJuSyxLQUFyQixDQUQrQjtBQUFBLENBQWpDOztrQkFLQSxpQ0FBa0IsaUNBQWtCLHFDQUFzQm1LLHdCQUF0QixDQUFsQixDQUFsQixDOzs7Ozs7Ozs7Ozs7O0FDWEE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUEsSUFBTUMsZ0NBQWdDLFNBQWhDQSw2QkFBZ0M7QUFBQSxTQUNwQyw2REFBMEJwSyxLQUExQixDQURvQztBQUFBLENBQXRDOztrQkFLQSxpQ0FBa0IsaUNBQWtCLDBDQUEyQm9LLDZCQUEzQixDQUFsQixDQUFsQixDOzs7Ozs7Ozs7Ozs7O0FDWEE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBLElBQU1DLDRCQUE0QixTQUE1QkEseUJBQTRCO0FBQUEsU0FDaEMseURBQXNCckssS0FBdEIsQ0FEZ0M7QUFBQSxDQUFsQzs7a0JBS0EsaUNBQWtCLHNDQUF1QnFLLHlCQUF2QixDQUFsQixDIiwiZmlsZSI6InJlYWN0LWJvb3RzdHJhcC10YWJsZTItcGFnaW5hdG9yL2Rpc3QvcmVhY3QtYm9vdHN0cmFwLXRhYmxlMi1wYWdpbmF0b3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCJyZWFjdFwiKSk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXCJyZWFjdFwiXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJSZWFjdEJvb3RzdHJhcFRhYmxlMlBhZ2luYXRvclwiXSA9IGZhY3RvcnkocmVxdWlyZShcInJlYWN0XCIpKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJSZWFjdEJvb3RzdHJhcFRhYmxlMlBhZ2luYXRvclwiXSA9IGZhY3Rvcnkocm9vdFtcIlJlYWN0XCJdKTtcbn0pKHRoaXMsIGZ1bmN0aW9uKF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMF9fKSB7XG5yZXR1cm4gXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDE1KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA3ODkxMWM5Zjc0MzBmMjhkMTllZiIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8wX187XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwge1wicm9vdFwiOlwiUmVhY3RcIixcImNvbW1vbmpzMlwiOlwicmVhY3RcIixcImNvbW1vbmpzXCI6XCJyZWFjdFwiLFwiYW1kXCI6XCJyZWFjdFwifVxuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICovXG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIHZhciBSRUFDVF9FTEVNRU5UX1RZUEUgPSAodHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJyAmJlxuICAgIFN5bWJvbC5mb3IgJiZcbiAgICBTeW1ib2wuZm9yKCdyZWFjdC5lbGVtZW50JykpIHx8XG4gICAgMHhlYWM3O1xuXG4gIHZhciBpc1ZhbGlkRWxlbWVudCA9IGZ1bmN0aW9uKG9iamVjdCkge1xuICAgIHJldHVybiB0eXBlb2Ygb2JqZWN0ID09PSAnb2JqZWN0JyAmJlxuICAgICAgb2JqZWN0ICE9PSBudWxsICYmXG4gICAgICBvYmplY3QuJCR0eXBlb2YgPT09IFJFQUNUX0VMRU1FTlRfVFlQRTtcbiAgfTtcblxuICAvLyBCeSBleHBsaWNpdGx5IHVzaW5nIGBwcm9wLXR5cGVzYCB5b3UgYXJlIG9wdGluZyBpbnRvIG5ldyBkZXZlbG9wbWVudCBiZWhhdmlvci5cbiAgLy8gaHR0cDovL2ZiLm1lL3Byb3AtdHlwZXMtaW4tcHJvZFxuICB2YXIgdGhyb3dPbkRpcmVjdEFjY2VzcyA9IHRydWU7XG4gIG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9mYWN0b3J5V2l0aFR5cGVDaGVja2VycycpKGlzVmFsaWRFbGVtZW50LCB0aHJvd09uRGlyZWN0QWNjZXNzKTtcbn0gZWxzZSB7XG4gIC8vIEJ5IGV4cGxpY2l0bHkgdXNpbmcgYHByb3AtdHlwZXNgIHlvdSBhcmUgb3B0aW5nIGludG8gbmV3IHByb2R1Y3Rpb24gYmVoYXZpb3IuXG4gIC8vIGh0dHA6Ly9mYi5tZS9wcm9wLXR5cGVzLWluLXByb2RcbiAgbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2ZhY3RvcnlXaXRoVGhyb3dpbmdTaGltcycpKCk7XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9wcm9wLXR5cGVzL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiZXhwb3J0IGRlZmF1bHQge1xuICBQQUdJTkFUSU9OX1NJWkU6IDUsXG4gIFBBR0VfU1RBUlRfSU5ERVg6IDEsXG4gIFdpdGhfRklSU1RfQU5EX0xBU1Q6IHRydWUsXG4gIFNIT1dfQUxMX1BBR0VfQlROUzogZmFsc2UsXG4gIFNIT1dfVE9UQUw6IGZhbHNlLFxuICBQQUdJTkFUSU9OX1RPVEFMOiBudWxsLFxuICBGSVJTVF9QQUdFX1RFWFQ6ICc8PCcsXG4gIFBSRV9QQUdFX1RFWFQ6ICc8JyxcbiAgTkVYVF9QQUdFX1RFWFQ6ICc+JyxcbiAgTEFTVF9QQUdFX1RFWFQ6ICc+PicsXG4gIE5FWFRfUEFHRV9USVRMRTogJ25leHQgcGFnZScsXG4gIExBU1RfUEFHRV9USVRMRTogJ2xhc3QgcGFnZScsXG4gIFBSRV9QQUdFX1RJVExFOiAncHJldmlvdXMgcGFnZScsXG4gIEZJUlNUX1BBR0VfVElUTEU6ICdmaXJzdCBwYWdlJyxcbiAgU0laRV9QRVJfUEFHRV9MSVNUOiBbMTAsIDI1LCAzMCwgNTBdLFxuICBISURFX1NJWkVfUEVSX1BBR0U6IGZhbHNlLFxuICBISURFX1BBR0VfTElTVF9PTkxZX09ORV9QQUdFOiBmYWxzZVxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3BhY2thZ2VzL3JlYWN0LWJvb3RzdHJhcC10YWJsZTItcGFnaW5hdG9yL3NyYy9jb25zdC5qcyIsIi8qIGVzbGludCBuby1taXhlZC1vcGVyYXRvcnM6IDAgKi9cbmltcG9ydCBDb25zdCBmcm9tICcuL2NvbnN0JztcblxuZXhwb3J0IGRlZmF1bHQgRXh0ZW5kQmFzZSA9PlxuICBjbGFzcyBQYWdlUmVzb2x2ZXIgZXh0ZW5kcyBFeHRlbmRCYXNlIHtcbiAgICBiYWNrVG9QcmV2UGFnZSgpIHtcbiAgICAgIGNvbnN0IHsgY3VyclBhZ2UsIHBhZ2VTdGFydEluZGV4IH0gPSB0aGlzLnByb3BzO1xuICAgICAgcmV0dXJuIChjdXJyUGFnZSAtIDEpIDwgcGFnZVN0YXJ0SW5kZXggPyBwYWdlU3RhcnRJbmRleCA6IGN1cnJQYWdlIC0gMTtcbiAgICB9XG5cbiAgICBpbml0aWFsU3RhdGUoKSB7XG4gICAgICBjb25zdCB0b3RhbFBhZ2VzID0gdGhpcy5jYWxjdWxhdGVUb3RhbFBhZ2UoKTtcbiAgICAgIGNvbnN0IGxhc3RQYWdlID0gdGhpcy5jYWxjdWxhdGVMYXN0UGFnZSh0b3RhbFBhZ2VzKTtcbiAgICAgIHJldHVybiB7IHRvdGFsUGFnZXMsIGxhc3RQYWdlIH07XG4gICAgfVxuXG4gICAgY2FsY3VsYXRlVG90YWxQYWdlKHNpemVQZXJQYWdlID0gdGhpcy5wcm9wcy5jdXJyU2l6ZVBlclBhZ2UsIGRhdGFTaXplID0gdGhpcy5wcm9wcy5kYXRhU2l6ZSkge1xuICAgICAgcmV0dXJuIE1hdGguY2VpbChkYXRhU2l6ZSAvIHNpemVQZXJQYWdlKTtcbiAgICB9XG5cbiAgICBjYWxjdWxhdGVMYXN0UGFnZSh0b3RhbFBhZ2VzKSB7XG4gICAgICBjb25zdCB7IHBhZ2VTdGFydEluZGV4IH0gPSB0aGlzLnByb3BzO1xuICAgICAgcmV0dXJuIHBhZ2VTdGFydEluZGV4ICsgdG90YWxQYWdlcyAtIDE7XG4gICAgfVxuXG4gICAgY2FsY3VsYXRlRnJvbVRvKCkge1xuICAgICAgY29uc3Qge1xuICAgICAgICBkYXRhU2l6ZSxcbiAgICAgICAgY3VyclBhZ2UsXG4gICAgICAgIGN1cnJTaXplUGVyUGFnZSxcbiAgICAgICAgcGFnZVN0YXJ0SW5kZXhcbiAgICAgIH0gPSB0aGlzLnByb3BzO1xuICAgICAgY29uc3Qgb2Zmc2V0ID0gTWF0aC5hYnMoQ29uc3QuUEFHRV9TVEFSVF9JTkRFWCAtIHBhZ2VTdGFydEluZGV4KTtcblxuICAgICAgbGV0IGZyb20gPSAoKGN1cnJQYWdlIC0gcGFnZVN0YXJ0SW5kZXgpICogY3VyclNpemVQZXJQYWdlKTtcbiAgICAgIGZyb20gPSBkYXRhU2l6ZSA9PT0gMCA/IDAgOiBmcm9tICsgMTtcbiAgICAgIGxldCB0byA9IE1hdGgubWluKGN1cnJTaXplUGVyUGFnZSAqIChjdXJyUGFnZSArIG9mZnNldCksIGRhdGFTaXplKTtcbiAgICAgIGlmICh0byA+IGRhdGFTaXplKSB0byA9IGRhdGFTaXplO1xuXG4gICAgICByZXR1cm4gW2Zyb20sIHRvXTtcbiAgICB9XG5cbiAgICBjYWxjdWxhdGVQYWdlcyhcbiAgICAgIHRvdGFsUGFnZXMsXG4gICAgICBsYXN0UGFnZVxuICAgICkge1xuICAgICAgY29uc3Qge1xuICAgICAgICBjdXJyUGFnZSxcbiAgICAgICAgcGFnaW5hdGlvblNpemUsXG4gICAgICAgIHBhZ2VTdGFydEluZGV4LFxuICAgICAgICB3aXRoRmlyc3RBbmRMYXN0LFxuICAgICAgICBmaXJzdFBhZ2VUZXh0LFxuICAgICAgICBwcmVQYWdlVGV4dCxcbiAgICAgICAgbmV4dFBhZ2VUZXh0LFxuICAgICAgICBsYXN0UGFnZVRleHQsXG4gICAgICAgIGFsd2F5c1Nob3dBbGxCdG5zXG4gICAgICB9ID0gdGhpcy5wcm9wcztcblxuICAgICAgbGV0IHBhZ2VzID0gW107XG4gICAgICBsZXQgZW5kUGFnZSA9IHRvdGFsUGFnZXM7XG4gICAgICBpZiAoZW5kUGFnZSA8PSAwKSByZXR1cm4gW107XG5cbiAgICAgIGxldCBzdGFydFBhZ2UgPSBNYXRoLm1heChjdXJyUGFnZSAtIE1hdGguZmxvb3IocGFnaW5hdGlvblNpemUgLyAyKSwgcGFnZVN0YXJ0SW5kZXgpO1xuICAgICAgZW5kUGFnZSA9IHN0YXJ0UGFnZSArIHBhZ2luYXRpb25TaXplIC0gMTtcblxuICAgICAgaWYgKGVuZFBhZ2UgPiBsYXN0UGFnZSkge1xuICAgICAgICBlbmRQYWdlID0gbGFzdFBhZ2U7XG4gICAgICAgIHN0YXJ0UGFnZSA9IGVuZFBhZ2UgLSBwYWdpbmF0aW9uU2l6ZSArIDE7XG4gICAgICB9XG5cbiAgICAgIGlmIChhbHdheXNTaG93QWxsQnRucykge1xuICAgICAgICBpZiAod2l0aEZpcnN0QW5kTGFzdCkge1xuICAgICAgICAgIHBhZ2VzID0gW2ZpcnN0UGFnZVRleHQsIHByZVBhZ2VUZXh0XTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBwYWdlcyA9IFtwcmVQYWdlVGV4dF07XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHN0YXJ0UGFnZSAhPT0gcGFnZVN0YXJ0SW5kZXggJiZcbiAgICAgICAgdG90YWxQYWdlcyA+IHBhZ2luYXRpb25TaXplICYmXG4gICAgICAgIHdpdGhGaXJzdEFuZExhc3QgJiZcbiAgICAgICAgcGFnZXMubGVuZ3RoID09PSAwXG4gICAgICApIHtcbiAgICAgICAgcGFnZXMgPSBbZmlyc3RQYWdlVGV4dCwgcHJlUGFnZVRleHRdO1xuICAgICAgfSBlbHNlIGlmICh0b3RhbFBhZ2VzID4gMSAmJiBwYWdlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcGFnZXMgPSBbcHJlUGFnZVRleHRdO1xuICAgICAgfVxuXG4gICAgICBmb3IgKGxldCBpID0gc3RhcnRQYWdlOyBpIDw9IGVuZFBhZ2U7IGkgKz0gMSkge1xuICAgICAgICBpZiAoaSA+PSBwYWdlU3RhcnRJbmRleCkgcGFnZXMucHVzaChpKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGFsd2F5c1Nob3dBbGxCdG5zIHx8IChlbmRQYWdlIDw9IGxhc3RQYWdlICYmIHBhZ2VzLmxlbmd0aCA+IDEpKSB7XG4gICAgICAgIHBhZ2VzLnB1c2gobmV4dFBhZ2VUZXh0KTtcbiAgICAgIH1cbiAgICAgIGlmICgoZW5kUGFnZSAhPT0gbGFzdFBhZ2UgJiYgd2l0aEZpcnN0QW5kTGFzdCkgfHwgKHdpdGhGaXJzdEFuZExhc3QgJiYgYWx3YXlzU2hvd0FsbEJ0bnMpKSB7XG4gICAgICAgIHBhZ2VzLnB1c2gobGFzdFBhZ2VUZXh0KTtcbiAgICAgIH1cblxuICAgICAgLy8gaWYgKChlbmRQYWdlIDw9IGxhc3RQYWdlICYmIHBhZ2VzLmxlbmd0aCA+IDEpIHx8IGFsd2F5c1Nob3dBbGxCdG5zKSB7XG4gICAgICAvLyAgIHBhZ2VzLnB1c2gobmV4dFBhZ2VUZXh0KTtcbiAgICAgIC8vIH1cbiAgICAgIC8vIGlmIChlbmRQYWdlICE9PSBsYXN0UGFnZSAmJiB3aXRoRmlyc3RBbmRMYXN0KSB7XG4gICAgICAvLyAgIHBhZ2VzLnB1c2gobGFzdFBhZ2VUZXh0KTtcbiAgICAgIC8vIH1cblxuICAgICAgcmV0dXJuIHBhZ2VzO1xuICAgIH1cblxuICAgIGNhbGN1bGF0ZVBhZ2VTdGF0dXMocGFnZXMgPSBbXSwgbGFzdFBhZ2UsIGRpc2FibGVQYWdlVGl0bGUgPSBmYWxzZSkge1xuICAgICAgY29uc3Qge1xuICAgICAgICBjdXJyUGFnZSxcbiAgICAgICAgcGFnZVN0YXJ0SW5kZXgsXG4gICAgICAgIGZpcnN0UGFnZVRleHQsXG4gICAgICAgIHByZVBhZ2VUZXh0LFxuICAgICAgICBuZXh0UGFnZVRleHQsXG4gICAgICAgIGxhc3RQYWdlVGV4dCxcbiAgICAgICAgYWx3YXlzU2hvd0FsbEJ0bnNcbiAgICAgIH0gPSB0aGlzLnByb3BzO1xuICAgICAgY29uc3QgaXNTdGFydCA9IHBhZ2UgPT5cbiAgICAgICAgKGN1cnJQYWdlID09PSBwYWdlU3RhcnRJbmRleCAmJiAocGFnZSA9PT0gZmlyc3RQYWdlVGV4dCB8fCBwYWdlID09PSBwcmVQYWdlVGV4dCkpO1xuICAgICAgY29uc3QgaXNFbmQgPSBwYWdlID0+XG4gICAgICAgIChjdXJyUGFnZSA9PT0gbGFzdFBhZ2UgJiYgKHBhZ2UgPT09IG5leHRQYWdlVGV4dCB8fCBwYWdlID09PSBsYXN0UGFnZVRleHQpKTtcblxuICAgICAgcmV0dXJuIHBhZ2VzXG4gICAgICAgIC5maWx0ZXIoKHBhZ2UpID0+IHtcbiAgICAgICAgICBpZiAoYWx3YXlzU2hvd0FsbEJ0bnMpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gIShpc1N0YXJ0KHBhZ2UpIHx8IGlzRW5kKHBhZ2UpKTtcbiAgICAgICAgfSlcbiAgICAgICAgLm1hcCgocGFnZSkgPT4ge1xuICAgICAgICAgIGxldCB0aXRsZTtcbiAgICAgICAgICBjb25zdCBhY3RpdmUgPSBwYWdlID09PSBjdXJyUGFnZTtcbiAgICAgICAgICBjb25zdCBkaXNhYmxlZCA9IChpc1N0YXJ0KHBhZ2UpIHx8IGlzRW5kKHBhZ2UpKTtcblxuICAgICAgICAgIGlmIChwYWdlID09PSBuZXh0UGFnZVRleHQpIHtcbiAgICAgICAgICAgIHRpdGxlID0gdGhpcy5wcm9wcy5uZXh0UGFnZVRpdGxlO1xuICAgICAgICAgIH0gZWxzZSBpZiAocGFnZSA9PT0gcHJlUGFnZVRleHQpIHtcbiAgICAgICAgICAgIHRpdGxlID0gdGhpcy5wcm9wcy5wcmVQYWdlVGl0bGU7XG4gICAgICAgICAgfSBlbHNlIGlmIChwYWdlID09PSBmaXJzdFBhZ2VUZXh0KSB7XG4gICAgICAgICAgICB0aXRsZSA9IHRoaXMucHJvcHMuZmlyc3RQYWdlVGl0bGU7XG4gICAgICAgICAgfSBlbHNlIGlmIChwYWdlID09PSBsYXN0UGFnZVRleHQpIHtcbiAgICAgICAgICAgIHRpdGxlID0gdGhpcy5wcm9wcy5sYXN0UGFnZVRpdGxlO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aXRsZSA9IGAke3BhZ2V9YDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb25zdCBwYWdlUmVzdWx0ID0geyBwYWdlLCBhY3RpdmUsIGRpc2FibGVkIH07XG4gICAgICAgICAgaWYgKCFkaXNhYmxlUGFnZVRpdGxlKSB7XG4gICAgICAgICAgICBwYWdlUmVzdWx0LnRpdGxlID0gdGl0bGU7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBwYWdlUmVzdWx0O1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjYWxjdWxhdGVTaXplUGVyUGFnZVN0YXR1cygpIHtcbiAgICAgIGNvbnN0IHsgc2l6ZVBlclBhZ2VMaXN0IH0gPSB0aGlzLnByb3BzO1xuICAgICAgcmV0dXJuIHNpemVQZXJQYWdlTGlzdC5tYXAoKF9zaXplUGVyUGFnZSkgPT4ge1xuICAgICAgICBjb25zdCBwYWdlVGV4dCA9IHR5cGVvZiBfc2l6ZVBlclBhZ2UudGV4dCAhPT0gJ3VuZGVmaW5lZCcgPyBfc2l6ZVBlclBhZ2UudGV4dCA6IF9zaXplUGVyUGFnZTtcbiAgICAgICAgY29uc3QgcGFnZU51bWJlciA9IHR5cGVvZiBfc2l6ZVBlclBhZ2UudmFsdWUgIT09ICd1bmRlZmluZWQnID8gX3NpemVQZXJQYWdlLnZhbHVlIDogX3NpemVQZXJQYWdlO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHRleHQ6IGAke3BhZ2VUZXh0fWAsXG4gICAgICAgICAgcGFnZTogcGFnZU51bWJlclxuICAgICAgICB9O1xuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9wYWNrYWdlcy9yZWFjdC1ib290c3RyYXAtdGFibGUyLXBhZ2luYXRvci9zcmMvcGFnZS1yZXNvbHZlci5qcyIsIi8qIVxuICBDb3B5cmlnaHQgKGMpIDIwMTcgSmVkIFdhdHNvbi5cbiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlIChNSVQpLCBzZWVcbiAgaHR0cDovL2plZHdhdHNvbi5naXRodWIuaW8vY2xhc3NuYW1lc1xuKi9cbi8qIGdsb2JhbCBkZWZpbmUgKi9cblxuKGZ1bmN0aW9uICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBoYXNPd24gPSB7fS5oYXNPd25Qcm9wZXJ0eTtcblxuXHRmdW5jdGlvbiBjbGFzc05hbWVzICgpIHtcblx0XHR2YXIgY2xhc3NlcyA9IFtdO1xuXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBhcmcgPSBhcmd1bWVudHNbaV07XG5cdFx0XHRpZiAoIWFyZykgY29udGludWU7XG5cblx0XHRcdHZhciBhcmdUeXBlID0gdHlwZW9mIGFyZztcblxuXHRcdFx0aWYgKGFyZ1R5cGUgPT09ICdzdHJpbmcnIHx8IGFyZ1R5cGUgPT09ICdudW1iZXInKSB7XG5cdFx0XHRcdGNsYXNzZXMucHVzaChhcmcpO1xuXHRcdFx0fSBlbHNlIGlmIChBcnJheS5pc0FycmF5KGFyZykgJiYgYXJnLmxlbmd0aCkge1xuXHRcdFx0XHR2YXIgaW5uZXIgPSBjbGFzc05hbWVzLmFwcGx5KG51bGwsIGFyZyk7XG5cdFx0XHRcdGlmIChpbm5lcikge1xuXHRcdFx0XHRcdGNsYXNzZXMucHVzaChpbm5lcik7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSBpZiAoYXJnVHlwZSA9PT0gJ29iamVjdCcpIHtcblx0XHRcdFx0Zm9yICh2YXIga2V5IGluIGFyZykge1xuXHRcdFx0XHRcdGlmIChoYXNPd24uY2FsbChhcmcsIGtleSkgJiYgYXJnW2tleV0pIHtcblx0XHRcdFx0XHRcdGNsYXNzZXMucHVzaChrZXkpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBjbGFzc2VzLmpvaW4oJyAnKTtcblx0fVxuXG5cdGlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyAmJiBtb2R1bGUuZXhwb3J0cykge1xuXHRcdGNsYXNzTmFtZXMuZGVmYXVsdCA9IGNsYXNzTmFtZXM7XG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBjbGFzc05hbWVzO1xuXHR9IGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIGRlZmluZS5hbWQgPT09ICdvYmplY3QnICYmIGRlZmluZS5hbWQpIHtcblx0XHQvLyByZWdpc3RlciBhcyAnY2xhc3NuYW1lcycsIGNvbnNpc3RlbnQgd2l0aCBucG0gcGFja2FnZSBuYW1lXG5cdFx0ZGVmaW5lKCdjbGFzc25hbWVzJywgW10sIGZ1bmN0aW9uICgpIHtcblx0XHRcdHJldHVybiBjbGFzc05hbWVzO1xuXHRcdH0pO1xuXHR9IGVsc2Uge1xuXHRcdHdpbmRvdy5jbGFzc05hbWVzID0gY2xhc3NOYW1lcztcblx0fVxufSgpKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NsYXNzbmFtZXMvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvKiBlc2xpbnQgcmVhY3QvcHJvcC10eXBlczogMCAqL1xuLyogZXNsaW50IGNhbWVsY2FzZTogMCAqL1xuaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHBhZ2VSZXNvbHZlciBmcm9tICcuL3BhZ2UtcmVzb2x2ZXInO1xuXG5leHBvcnQgZGVmYXVsdCBXcmFwcGVkQ29tcG9uZW50ID0+XG4gIGNsYXNzIFBhZ2luYXRpb25IYW5kbGVyIGV4dGVuZHMgcGFnZVJlc29sdmVyKENvbXBvbmVudCkge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICBzdXBlcihwcm9wcyk7XG4gICAgICB0aGlzLmhhbmRsZUNoYW5nZVBhZ2UgPSB0aGlzLmhhbmRsZUNoYW5nZVBhZ2UuYmluZCh0aGlzKTtcbiAgICAgIHRoaXMuaGFuZGxlQ2hhbmdlU2l6ZVBlclBhZ2UgPSB0aGlzLmhhbmRsZUNoYW5nZVNpemVQZXJQYWdlLmJpbmQodGhpcyk7XG4gICAgICB0aGlzLnN0YXRlID0gdGhpcy5pbml0aWFsU3RhdGUoKTtcbiAgICB9XG5cbiAgICBVTlNBRkVfY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcbiAgICAgIGNvbnN0IHsgZGF0YVNpemUsIGN1cnJTaXplUGVyUGFnZSB9ID0gbmV4dFByb3BzO1xuICAgICAgaWYgKGN1cnJTaXplUGVyUGFnZSAhPT0gdGhpcy5wcm9wcy5jdXJyU2l6ZVBlclBhZ2UgfHwgZGF0YVNpemUgIT09IHRoaXMucHJvcHMuZGF0YVNpemUpIHtcbiAgICAgICAgY29uc3QgdG90YWxQYWdlcyA9IHRoaXMuY2FsY3VsYXRlVG90YWxQYWdlKGN1cnJTaXplUGVyUGFnZSwgZGF0YVNpemUpO1xuICAgICAgICBjb25zdCBsYXN0UGFnZSA9IHRoaXMuY2FsY3VsYXRlTGFzdFBhZ2UodG90YWxQYWdlcyk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyB0b3RhbFBhZ2VzLCBsYXN0UGFnZSB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVDaGFuZ2VTaXplUGVyUGFnZShzaXplUGVyUGFnZSkge1xuICAgICAgY29uc3QgeyBjdXJyU2l6ZVBlclBhZ2UsIG9uU2l6ZVBlclBhZ2VDaGFuZ2UgfSA9IHRoaXMucHJvcHM7XG4gICAgICBjb25zdCBzZWxlY3RlZFNpemUgPSB0eXBlb2Ygc2l6ZVBlclBhZ2UgPT09ICdzdHJpbmcnID8gcGFyc2VJbnQoc2l6ZVBlclBhZ2UsIDEwKSA6IHNpemVQZXJQYWdlO1xuICAgICAgbGV0IHsgY3VyclBhZ2UgfSA9IHRoaXMucHJvcHM7XG4gICAgICBpZiAoc2VsZWN0ZWRTaXplICE9PSBjdXJyU2l6ZVBlclBhZ2UpIHtcbiAgICAgICAgY29uc3QgbmV3VG90YWxQYWdlcyA9IHRoaXMuY2FsY3VsYXRlVG90YWxQYWdlKHNlbGVjdGVkU2l6ZSk7XG4gICAgICAgIGNvbnN0IG5ld0xhc3RQYWdlID0gdGhpcy5jYWxjdWxhdGVMYXN0UGFnZShuZXdUb3RhbFBhZ2VzKTtcbiAgICAgICAgaWYgKGN1cnJQYWdlID4gbmV3TGFzdFBhZ2UpIGN1cnJQYWdlID0gbmV3TGFzdFBhZ2U7XG4gICAgICAgIG9uU2l6ZVBlclBhZ2VDaGFuZ2Uoc2VsZWN0ZWRTaXplLCBjdXJyUGFnZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlQ2hhbmdlUGFnZShuZXdQYWdlKSB7XG4gICAgICBsZXQgcGFnZTtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgY3VyclBhZ2UsXG4gICAgICAgIHBhZ2VTdGFydEluZGV4LFxuICAgICAgICBwcmVQYWdlVGV4dCxcbiAgICAgICAgbmV4dFBhZ2VUZXh0LFxuICAgICAgICBsYXN0UGFnZVRleHQsXG4gICAgICAgIGZpcnN0UGFnZVRleHQsXG4gICAgICAgIG9uUGFnZUNoYW5nZVxuICAgICAgfSA9IHRoaXMucHJvcHM7XG4gICAgICBjb25zdCB7IGxhc3RQYWdlIH0gPSB0aGlzLnN0YXRlO1xuXG4gICAgICBpZiAobmV3UGFnZSA9PT0gcHJlUGFnZVRleHQpIHtcbiAgICAgICAgcGFnZSA9IHRoaXMuYmFja1RvUHJldlBhZ2UoKTtcbiAgICAgIH0gZWxzZSBpZiAobmV3UGFnZSA9PT0gbmV4dFBhZ2VUZXh0KSB7XG4gICAgICAgIHBhZ2UgPSAoY3VyclBhZ2UgKyAxKSA+IGxhc3RQYWdlID8gbGFzdFBhZ2UgOiBjdXJyUGFnZSArIDE7XG4gICAgICB9IGVsc2UgaWYgKG5ld1BhZ2UgPT09IGxhc3RQYWdlVGV4dCkge1xuICAgICAgICBwYWdlID0gbGFzdFBhZ2U7XG4gICAgICB9IGVsc2UgaWYgKG5ld1BhZ2UgPT09IGZpcnN0UGFnZVRleHQpIHtcbiAgICAgICAgcGFnZSA9IHBhZ2VTdGFydEluZGV4O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcGFnZSA9IHBhcnNlSW50KG5ld1BhZ2UsIDEwKTtcbiAgICAgIH1cbiAgICAgIGlmIChwYWdlICE9PSBjdXJyUGFnZSkge1xuICAgICAgICBvblBhZ2VDaGFuZ2UocGFnZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPFdyYXBwZWRDb21wb25lbnRcbiAgICAgICAgICB7IC4uLnRoaXMucHJvcHMgfVxuICAgICAgICAgIGxhc3RQYWdlPXsgdGhpcy5zdGF0ZS5sYXN0UGFnZSB9XG4gICAgICAgICAgdG90YWxQYWdlcz17IHRoaXMuc3RhdGUudG90YWxQYWdlcyB9XG4gICAgICAgICAgb25QYWdlQ2hhbmdlPXsgdGhpcy5oYW5kbGVDaGFuZ2VQYWdlIH1cbiAgICAgICAgICBvblNpemVQZXJQYWdlQ2hhbmdlPXsgdGhpcy5oYW5kbGVDaGFuZ2VTaXplUGVyUGFnZSB9XG4gICAgICAgIC8+XG4gICAgICApO1xuICAgIH1cbiAgfTtcblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcGFja2FnZXMvcmVhY3QtYm9vdHN0cmFwLXRhYmxlMi1wYWdpbmF0b3Ivc3JjL3BhZ2luYXRpb24taGFuZGxlci5qcyIsIi8qIGVzbGludCByZWFjdC9wcm9wLXR5cGVzOiAwICovXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5leHBvcnQgZGVmYXVsdCBXcmFwcGVkQ29tcG9uZW50ID0+ICh7XG4gIHBhZ2UsXG4gIHNpemVQZXJQYWdlLFxuICAuLi5yZXN0XG59KSA9PiAoXG4gIDxXcmFwcGVkQ29tcG9uZW50XG4gICAgeyAuLi5yZXN0IH1cbiAgICBjdXJyUGFnZT17IHBhZ2UgfVxuICAgIGN1cnJTaXplUGVyUGFnZT17IHNpemVQZXJQYWdlIH1cbiAgLz5cbik7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9wYWNrYWdlcy9yZWFjdC1ib290c3RyYXAtdGFibGUyLXBhZ2luYXRvci9zcmMvc3RhbmRhbG9uZS1hZGFwdGVyLmpzIiwiLyogZXNsaW50IHJlYWN0L3Byb3AtdHlwZXM6IDAgKi9cbi8qIGVzbGludCByZWFjdC9yZXF1aXJlLWRlZmF1bHQtcHJvcHM6IDAgKi9cbi8qIGVzbGludCBuby1sb25lbHktaWY6IDAgKi9cbi8qIGVzbGludCBjYW1lbGNhc2U6IDAgKi9cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgRXZlbnRFbWl0dGVyIGZyb20gJ2V2ZW50cyc7XG5pbXBvcnQgQ29uc3QgZnJvbSAnLi9jb25zdCc7XG5pbXBvcnQgeyBhbGlnblBhZ2UgfSBmcm9tICcuL3BhZ2UnO1xuXG5jb25zdCBTdGF0ZUNvbnRleHQgPSBSZWFjdC5jcmVhdGVDb250ZXh0KCk7XG5cbmNsYXNzIFN0YXRlUHJvdmlkZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLmhhbmRsZUNoYW5nZVBhZ2UgPSB0aGlzLmhhbmRsZUNoYW5nZVBhZ2UuYmluZCh0aGlzKTtcbiAgICB0aGlzLmhhbmRsZURhdGFTaXplQ2hhbmdlID0gdGhpcy5oYW5kbGVEYXRhU2l6ZUNoYW5nZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMuaGFuZGxlQ2hhbmdlU2l6ZVBlclBhZ2UgPSB0aGlzLmhhbmRsZUNoYW5nZVNpemVQZXJQYWdlLmJpbmQodGhpcyk7XG5cbiAgICBsZXQgY3VyclBhZ2U7XG4gICAgbGV0IGN1cnJTaXplUGVyUGFnZTtcbiAgICBjb25zdCB7IG9wdGlvbnMgfSA9IHByb3BzLnBhZ2luYXRpb247XG4gICAgY29uc3Qgc2l6ZVBlclBhZ2VMaXN0ID0gb3B0aW9ucy5zaXplUGVyUGFnZUxpc3QgfHwgQ29uc3QuU0laRV9QRVJfUEFHRV9MSVNUO1xuXG4gICAgLy8gaW5pdGlhbGl6ZSBjdXJyZW50IHBhZ2VcbiAgICBpZiAodHlwZW9mIG9wdGlvbnMucGFnZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGN1cnJQYWdlID0gb3B0aW9ucy5wYWdlO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIG9wdGlvbnMucGFnZVN0YXJ0SW5kZXggIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBjdXJyUGFnZSA9IG9wdGlvbnMucGFnZVN0YXJ0SW5kZXg7XG4gICAgfSBlbHNlIHtcbiAgICAgIGN1cnJQYWdlID0gQ29uc3QuUEFHRV9TVEFSVF9JTkRFWDtcbiAgICB9XG5cbiAgICAvLyBpbml0aWFsaXplIGN1cnJlbnQgc2l6ZVBlclBhZ2VcbiAgICBpZiAodHlwZW9mIG9wdGlvbnMuc2l6ZVBlclBhZ2UgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBjdXJyU2l6ZVBlclBhZ2UgPSBvcHRpb25zLnNpemVQZXJQYWdlO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIHNpemVQZXJQYWdlTGlzdFswXSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGN1cnJTaXplUGVyUGFnZSA9IHNpemVQZXJQYWdlTGlzdFswXS52YWx1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgY3VyclNpemVQZXJQYWdlID0gc2l6ZVBlclBhZ2VMaXN0WzBdO1xuICAgIH1cblxuICAgIHRoaXMuY3VyclBhZ2UgPSBjdXJyUGFnZTtcbiAgICB0aGlzLmRhdGFTaXplID0gb3B0aW9ucy50b3RhbFNpemU7XG4gICAgdGhpcy5jdXJyU2l6ZVBlclBhZ2UgPSBjdXJyU2l6ZVBlclBhZ2U7XG4gICAgdGhpcy5kYXRhQ2hhbmdlTGlzdGVuZXIgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgdGhpcy5kYXRhQ2hhbmdlTGlzdGVuZXIub24oJ2ZpbHRlckNoYW5nZWQnLCB0aGlzLmhhbmRsZURhdGFTaXplQ2hhbmdlKTtcbiAgfVxuXG4gIGdldFBhZ2luYXRpb25Qcm9wcyA9ICgpID0+IHtcbiAgICBjb25zdCB7IHBhZ2luYXRpb246IHsgb3B0aW9ucyB9LCBib290c3RyYXA0LCB0YWJsZUlkIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHsgY3VyclBhZ2UsIGN1cnJTaXplUGVyUGFnZSwgZGF0YVNpemUgfSA9IHRoaXM7XG4gICAgY29uc3Qgd2l0aEZpcnN0QW5kTGFzdCA9IHR5cGVvZiBvcHRpb25zLndpdGhGaXJzdEFuZExhc3QgPT09ICd1bmRlZmluZWQnID9cbiAgICAgIENvbnN0LldpdGhfRklSU1RfQU5EX0xBU1QgOiBvcHRpb25zLndpdGhGaXJzdEFuZExhc3Q7XG4gICAgY29uc3QgYWx3YXlzU2hvd0FsbEJ0bnMgPSB0eXBlb2Ygb3B0aW9ucy5hbHdheXNTaG93QWxsQnRucyA9PT0gJ3VuZGVmaW5lZCcgP1xuICAgICAgQ29uc3QuU0hPV19BTExfUEFHRV9CVE5TIDogb3B0aW9ucy5hbHdheXNTaG93QWxsQnRucztcbiAgICBjb25zdCBoaWRlU2l6ZVBlclBhZ2UgPSB0eXBlb2Ygb3B0aW9ucy5oaWRlU2l6ZVBlclBhZ2UgPT09ICd1bmRlZmluZWQnID9cbiAgICAgIENvbnN0LkhJREVfU0laRV9QRVJfUEFHRSA6IG9wdGlvbnMuaGlkZVNpemVQZXJQYWdlO1xuICAgIGNvbnN0IGhpZGVQYWdlTGlzdE9ubHlPbmVQYWdlID0gdHlwZW9mIG9wdGlvbnMuaGlkZVBhZ2VMaXN0T25seU9uZVBhZ2UgPT09ICd1bmRlZmluZWQnID9cbiAgICAgIENvbnN0LkhJREVfUEFHRV9MSVNUX09OTFlfT05FX1BBR0UgOiBvcHRpb25zLmhpZGVQYWdlTGlzdE9ubHlPbmVQYWdlO1xuICAgIGNvbnN0IHBhZ2VTdGFydEluZGV4ID0gdHlwZW9mIG9wdGlvbnMucGFnZVN0YXJ0SW5kZXggPT09ICd1bmRlZmluZWQnID9cbiAgICAgIENvbnN0LlBBR0VfU1RBUlRfSU5ERVggOiBvcHRpb25zLnBhZ2VTdGFydEluZGV4O1xuICAgIHJldHVybiB7XG4gICAgICAuLi5vcHRpb25zLFxuICAgICAgYm9vdHN0cmFwNCxcbiAgICAgIHRhYmxlSWQsXG4gICAgICBwYWdlOiBjdXJyUGFnZSxcbiAgICAgIHNpemVQZXJQYWdlOiBjdXJyU2l6ZVBlclBhZ2UsXG4gICAgICBwYWdlU3RhcnRJbmRleCxcbiAgICAgIGhpZGVQYWdlTGlzdE9ubHlPbmVQYWdlLFxuICAgICAgaGlkZVNpemVQZXJQYWdlLFxuICAgICAgYWx3YXlzU2hvd0FsbEJ0bnMsXG4gICAgICB3aXRoRmlyc3RBbmRMYXN0LFxuICAgICAgZGF0YVNpemUsXG4gICAgICBzaXplUGVyUGFnZUxpc3Q6IG9wdGlvbnMuc2l6ZVBlclBhZ2VMaXN0IHx8IENvbnN0LlNJWkVfUEVSX1BBR0VfTElTVCxcbiAgICAgIHBhZ2luYXRpb25TaXplOiBvcHRpb25zLnBhZ2luYXRpb25TaXplIHx8IENvbnN0LlBBR0lOQVRJT05fU0laRSxcbiAgICAgIHNob3dUb3RhbDogb3B0aW9ucy5zaG93VG90YWwsXG4gICAgICBwYWdlTGlzdFJlbmRlcmVyOiBvcHRpb25zLnBhZ2VMaXN0UmVuZGVyZXIsXG4gICAgICBwYWdlQnV0dG9uUmVuZGVyZXI6IG9wdGlvbnMucGFnZUJ1dHRvblJlbmRlcmVyLFxuICAgICAgc2l6ZVBlclBhZ2VSZW5kZXJlcjogb3B0aW9ucy5zaXplUGVyUGFnZVJlbmRlcmVyLFxuICAgICAgcGFnaW5hdGlvblRvdGFsUmVuZGVyZXI6IG9wdGlvbnMucGFnaW5hdGlvblRvdGFsUmVuZGVyZXIsXG4gICAgICBzaXplUGVyUGFnZU9wdGlvblJlbmRlcmVyOiBvcHRpb25zLnNpemVQZXJQYWdlT3B0aW9uUmVuZGVyZXIsXG4gICAgICBmaXJzdFBhZ2VUZXh0OiBvcHRpb25zLmZpcnN0UGFnZVRleHQgfHwgQ29uc3QuRklSU1RfUEFHRV9URVhULFxuICAgICAgcHJlUGFnZVRleHQ6IG9wdGlvbnMucHJlUGFnZVRleHQgfHwgQ29uc3QuUFJFX1BBR0VfVEVYVCxcbiAgICAgIG5leHRQYWdlVGV4dDogb3B0aW9ucy5uZXh0UGFnZVRleHQgfHwgQ29uc3QuTkVYVF9QQUdFX1RFWFQsXG4gICAgICBsYXN0UGFnZVRleHQ6IG9wdGlvbnMubGFzdFBhZ2VUZXh0IHx8IENvbnN0LkxBU1RfUEFHRV9URVhULFxuICAgICAgcHJlUGFnZVRpdGxlOiBvcHRpb25zLnByZVBhZ2VUaXRsZSB8fCBDb25zdC5QUkVfUEFHRV9USVRMRSxcbiAgICAgIG5leHRQYWdlVGl0bGU6IG9wdGlvbnMubmV4dFBhZ2VUaXRsZSB8fCBDb25zdC5ORVhUX1BBR0VfVElUTEUsXG4gICAgICBmaXJzdFBhZ2VUaXRsZTogb3B0aW9ucy5maXJzdFBhZ2VUaXRsZSB8fCBDb25zdC5GSVJTVF9QQUdFX1RJVExFLFxuICAgICAgbGFzdFBhZ2VUaXRsZTogb3B0aW9ucy5sYXN0UGFnZVRpdGxlIHx8IENvbnN0LkxBU1RfUEFHRV9USVRMRSxcbiAgICAgIG9uUGFnZUNoYW5nZTogdGhpcy5oYW5kbGVDaGFuZ2VQYWdlLFxuICAgICAgb25TaXplUGVyUGFnZUNoYW5nZTogdGhpcy5oYW5kbGVDaGFuZ2VTaXplUGVyUGFnZVxuICAgIH07XG4gIH1cblxuICBzZXRQYWdpbmF0aW9uUmVtb3RlRW1pdHRlciA9IChyZW1vdGVFbWl0dGVyKSA9PiB7XG4gICAgdGhpcy5yZW1vdGVFbWl0dGVyID0gcmVtb3RlRW1pdHRlcjtcbiAgfVxuXG4gIGdldFBhZ2luYXRpb25SZW1vdGVFbWl0dGVyID0gKCkgPT4gdGhpcy5yZW1vdGVFbWl0dGVyIHx8IHRoaXMucHJvcHMucmVtb3RlRW1pdHRlcjtcblxuICBVTlNBRkVfY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcbiAgICBjb25zdCB7IGN1c3RvbSB9ID0gbmV4dFByb3BzLnBhZ2luYXRpb24ub3B0aW9ucztcblxuICAgIC8vIHVzZXIgc2hvdWxkIGFsaWduIHRoZSBwYWdlIHdoZW4gdGhlIHBhZ2UgaXMgbm90IGZpdCB0byB0aGUgZGF0YSBzaXplIHdoZW4gcmVtb3RlIGVuYWJsZVxuICAgIGlmICh0aGlzLmlzUmVtb3RlUGFnaW5hdGlvbigpIHx8IGN1c3RvbSkge1xuICAgICAgaWYgKHR5cGVvZiBuZXh0UHJvcHMucGFnaW5hdGlvbi5vcHRpb25zLnBhZ2UgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHRoaXMuY3VyclBhZ2UgPSBuZXh0UHJvcHMucGFnaW5hdGlvbi5vcHRpb25zLnBhZ2U7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIG5leHRQcm9wcy5wYWdpbmF0aW9uLm9wdGlvbnMuc2l6ZVBlclBhZ2UgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHRoaXMuY3VyclNpemVQZXJQYWdlID0gbmV4dFByb3BzLnBhZ2luYXRpb24ub3B0aW9ucy5zaXplUGVyUGFnZTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgbmV4dFByb3BzLnBhZ2luYXRpb24ub3B0aW9ucy50b3RhbFNpemUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHRoaXMuZGF0YVNpemUgPSBuZXh0UHJvcHMucGFnaW5hdGlvbi5vcHRpb25zLnRvdGFsU2l6ZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBpc1JlbW90ZVBhZ2luYXRpb24gPSAoKSA9PiB7XG4gICAgY29uc3QgZSA9IHt9O1xuICAgIHRoaXMucmVtb3RlRW1pdHRlci5lbWl0KCdpc1JlbW90ZVBhZ2luYXRpb24nLCBlKTtcbiAgICByZXR1cm4gZS5yZXN1bHQ7XG4gIH07XG5cbiAgaGFuZGxlRGF0YVNpemVDaGFuZ2UobmV3RGF0YVNpemUpIHtcbiAgICBjb25zdCB7IHBhZ2luYXRpb246IHsgb3B0aW9ucyB9IH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHBhZ2VTdGFydEluZGV4ID0gdHlwZW9mIG9wdGlvbnMucGFnZVN0YXJ0SW5kZXggPT09ICd1bmRlZmluZWQnID9cbiAgICAgIENvbnN0LlBBR0VfU1RBUlRfSU5ERVggOiBvcHRpb25zLnBhZ2VTdGFydEluZGV4O1xuICAgIHRoaXMuY3VyclBhZ2UgPSBhbGlnblBhZ2UoXG4gICAgICBuZXdEYXRhU2l6ZSxcbiAgICAgIHRoaXMuZGF0YVNpemUsXG4gICAgICB0aGlzLmN1cnJQYWdlLFxuICAgICAgdGhpcy5jdXJyU2l6ZVBlclBhZ2UsXG4gICAgICBwYWdlU3RhcnRJbmRleFxuICAgICk7XG4gICAgdGhpcy5kYXRhU2l6ZSA9IG5ld0RhdGFTaXplO1xuICAgIHRoaXMuZm9yY2VVcGRhdGUoKTtcbiAgfVxuXG4gIGhhbmRsZUNoYW5nZVBhZ2UoY3VyclBhZ2UpIHtcbiAgICBjb25zdCB7IGN1cnJTaXplUGVyUGFnZSB9ID0gdGhpcztcbiAgICBjb25zdCB7IHBhZ2luYXRpb246IHsgb3B0aW9ucyB9IH0gPSB0aGlzLnByb3BzO1xuXG4gICAgaWYgKG9wdGlvbnMub25QYWdlQ2hhbmdlKSB7XG4gICAgICBvcHRpb25zLm9uUGFnZUNoYW5nZShjdXJyUGFnZSwgY3VyclNpemVQZXJQYWdlKTtcbiAgICB9XG5cbiAgICB0aGlzLmN1cnJQYWdlID0gY3VyclBhZ2U7XG5cbiAgICBpZiAodGhpcy5pc1JlbW90ZVBhZ2luYXRpb24oKSkge1xuICAgICAgdGhpcy5nZXRQYWdpbmF0aW9uUmVtb3RlRW1pdHRlcigpLmVtaXQoJ3BhZ2luYXRpb25DaGFuZ2UnLCBjdXJyUGFnZSwgY3VyclNpemVQZXJQYWdlKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5mb3JjZVVwZGF0ZSgpO1xuICB9XG5cbiAgaGFuZGxlQ2hhbmdlU2l6ZVBlclBhZ2UoY3VyclNpemVQZXJQYWdlLCBjdXJyUGFnZSkge1xuICAgIGNvbnN0IHsgcGFnaW5hdGlvbjogeyBvcHRpb25zIH0gfSA9IHRoaXMucHJvcHM7XG5cbiAgICBpZiAob3B0aW9ucy5vblNpemVQZXJQYWdlQ2hhbmdlKSB7XG4gICAgICBvcHRpb25zLm9uU2l6ZVBlclBhZ2VDaGFuZ2UoY3VyclNpemVQZXJQYWdlLCBjdXJyUGFnZSk7XG4gICAgfVxuXG4gICAgdGhpcy5jdXJyUGFnZSA9IGN1cnJQYWdlO1xuICAgIHRoaXMuY3VyclNpemVQZXJQYWdlID0gY3VyclNpemVQZXJQYWdlO1xuXG4gICAgaWYgKHRoaXMuaXNSZW1vdGVQYWdpbmF0aW9uKCkpIHtcbiAgICAgIHRoaXMuZ2V0UGFnaW5hdGlvblJlbW90ZUVtaXR0ZXIoKS5lbWl0KCdwYWdpbmF0aW9uQ2hhbmdlJywgY3VyclBhZ2UsIGN1cnJTaXplUGVyUGFnZSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuZm9yY2VVcGRhdGUoKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCBwYWdpbmF0aW9uUHJvcHMgPSB0aGlzLmdldFBhZ2luYXRpb25Qcm9wcygpO1xuICAgIGNvbnN0IHBhZ2luYXRpb24gPSB7XG4gICAgICAuLi50aGlzLnByb3BzLnBhZ2luYXRpb24sXG4gICAgICBvcHRpb25zOiBwYWdpbmF0aW9uUHJvcHNcbiAgICB9O1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxTdGF0ZUNvbnRleHQuUHJvdmlkZXJcbiAgICAgICAgdmFsdWU9eyB7XG4gICAgICAgICAgcGFnaW5hdGlvblByb3BzLFxuICAgICAgICAgIHBhZ2luYXRpb25UYWJsZVByb3BzOiB7XG4gICAgICAgICAgICBwYWdpbmF0aW9uLFxuICAgICAgICAgICAgc2V0UGFnaW5hdGlvblJlbW90ZUVtaXR0ZXI6IHRoaXMuc2V0UGFnaW5hdGlvblJlbW90ZUVtaXR0ZXIsXG4gICAgICAgICAgICBkYXRhQ2hhbmdlTGlzdGVuZXI6IHRoaXMuZGF0YUNoYW5nZUxpc3RlbmVyXG4gICAgICAgICAgfVxuICAgICAgICB9IH1cbiAgICAgID5cbiAgICAgICAgeyB0aGlzLnByb3BzLmNoaWxkcmVuIH1cbiAgICAgIDwvU3RhdGVDb250ZXh0LlByb3ZpZGVyPlxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgKCkgPT4gKHtcbiAgUHJvdmlkZXI6IFN0YXRlUHJvdmlkZXIsXG4gIENvbnN1bWVyOiBTdGF0ZUNvbnRleHQuQ29uc3VtZXJcbn0pO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcGFja2FnZXMvcmVhY3QtYm9vdHN0cmFwLXRhYmxlMi1wYWdpbmF0b3Ivc3JjL3N0YXRlLWNvbnRleHQuanMiLCJpbXBvcnQgQ29uc3QgZnJvbSAnLi9jb25zdCc7XG5cbmNvbnN0IGdldE5vcm1hbGl6ZWRQYWdlID0gKFxuICBwYWdlLFxuICBwYWdlU3RhcnRJbmRleFxuKSA9PiB7XG4gIGNvbnN0IG9mZnNldCA9IE1hdGguYWJzKDEgLSBwYWdlU3RhcnRJbmRleCk7XG4gIHJldHVybiBwYWdlICsgb2Zmc2V0O1xufTtcblxuY29uc3QgZW5kSW5kZXggPSAoXG4gIHBhZ2UsXG4gIHNpemVQZXJQYWdlLFxuICBwYWdlU3RhcnRJbmRleFxuKSA9PiAoZ2V0Tm9ybWFsaXplZFBhZ2UocGFnZSwgcGFnZVN0YXJ0SW5kZXgpICogc2l6ZVBlclBhZ2UpIC0gMTtcblxuY29uc3Qgc3RhcnRJbmRleCA9IChcbiAgZW5kLFxuICBzaXplUGVyUGFnZSxcbikgPT4gZW5kIC0gKHNpemVQZXJQYWdlIC0gMSk7XG5cbmV4cG9ydCBjb25zdCBhbGlnblBhZ2UgPSAoXG4gIGRhdGFTaXplLFxuICBwcmV2RGF0YVNpemUsXG4gIHBhZ2UsXG4gIHNpemVQZXJQYWdlLFxuICBwYWdlU3RhcnRJbmRleFxuKSA9PiB7XG4gIGlmIChwcmV2RGF0YVNpemUgPCBkYXRhU2l6ZSkgcmV0dXJuIHBhZ2U7XG4gIGlmIChwYWdlIDwgcGFnZVN0YXJ0SW5kZXgpIHJldHVybiBwYWdlU3RhcnRJbmRleDtcbiAgaWYgKGRhdGFTaXplIDw9IDApIHJldHVybiBwYWdlU3RhcnRJbmRleDtcbiAgaWYgKChwYWdlID49IChNYXRoLmZsb29yKGRhdGFTaXplIC8gc2l6ZVBlclBhZ2UpICsgcGFnZVN0YXJ0SW5kZXgpKSAmJiBwYWdlU3RhcnRJbmRleCA9PT0gMSkge1xuICAgIHJldHVybiBNYXRoLmNlaWwoZGF0YVNpemUgLyBzaXplUGVyUGFnZSk7XG4gIH1cbiAgaWYgKHBhZ2UgPj0gTWF0aC5mbG9vcihkYXRhU2l6ZSAvIHNpemVQZXJQYWdlKSAmJiBwYWdlU3RhcnRJbmRleCA9PT0gMCkge1xuICAgIGNvbnN0IG5ld1BhZ2UgPSBNYXRoLmNlaWwoZGF0YVNpemUgLyBzaXplUGVyUGFnZSk7XG4gICAgcmV0dXJuIG5ld1BhZ2UgLSBNYXRoLmFicygoQ29uc3QuUEFHRV9TVEFSVF9JTkRFWCAtIHBhZ2VTdGFydEluZGV4KSk7XG4gIH1cbiAgcmV0dXJuIHBhZ2U7XG59O1xuXG5leHBvcnQgY29uc3QgZ2V0QnlDdXJyUGFnZSA9IChcbiAgZGF0YSxcbiAgcGFnZSxcbiAgc2l6ZVBlclBhZ2UsXG4gIHBhZ2VTdGFydEluZGV4XG4pID0+IHtcbiAgY29uc3QgZGF0YVNpemUgPSBkYXRhLmxlbmd0aDtcbiAgaWYgKCFkYXRhU2l6ZSkgcmV0dXJuIFtdO1xuXG4gIGNvbnN0IGVuZCA9IGVuZEluZGV4KHBhZ2UsIHNpemVQZXJQYWdlLCBwYWdlU3RhcnRJbmRleCk7XG4gIGNvbnN0IHN0YXJ0ID0gc3RhcnRJbmRleChlbmQsIHNpemVQZXJQYWdlKTtcblxuICBjb25zdCByZXN1bHQgPSBbXTtcbiAgZm9yIChsZXQgaSA9IHN0YXJ0OyBpIDw9IGVuZDsgaSArPSAxKSB7XG4gICAgcmVzdWx0LnB1c2goZGF0YVtpXSk7XG4gICAgaWYgKGkgKyAxID09PSBkYXRhU2l6ZSkgYnJlYWs7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9wYWNrYWdlcy9yZWFjdC1ib290c3RyYXAtdGFibGUyLXBhZ2luYXRvci9zcmMvcGFnZS5qcyIsIi8qIGVzbGludCByZWFjdC9wcm9wLXR5cGVzOiAwICovXG5pbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgcGFnZVJlc29sdmVyIGZyb20gJy4vcGFnZS1yZXNvbHZlcic7XG5pbXBvcnQgU2l6ZVBlclBhZ2VEcm9wRG93biBmcm9tICcuL3NpemUtcGVyLXBhZ2UtZHJvcGRvd24nO1xuXG5jb25zdCBzaXplUGVyUGFnZURyb3Bkb3duQWRhcHRlciA9IFdyYXBwZWRDb21wb25lbnQgPT5cbiAgY2xhc3MgU2l6ZVBlclBhZ2VEcm9wZG93bkFkYXB0ZXIgZXh0ZW5kcyBwYWdlUmVzb2x2ZXIoQ29tcG9uZW50KSB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgIHN1cGVyKHByb3BzKTtcbiAgICAgIHRoaXMuY2xvc2VEcm9wRG93biA9IHRoaXMuY2xvc2VEcm9wRG93bi5iaW5kKHRoaXMpO1xuICAgICAgdGhpcy50b2dnbGVEcm9wRG93biA9IHRoaXMudG9nZ2xlRHJvcERvd24uYmluZCh0aGlzKTtcbiAgICAgIHRoaXMuaGFuZGxlQ2hhbmdlU2l6ZVBlclBhZ2UgPSB0aGlzLmhhbmRsZUNoYW5nZVNpemVQZXJQYWdlLmJpbmQodGhpcyk7XG4gICAgICB0aGlzLnN0YXRlID0geyBkcm9wZG93bk9wZW46IGZhbHNlIH07XG4gICAgfVxuXG4gICAgdG9nZ2xlRHJvcERvd24oKSB7XG4gICAgICBjb25zdCBkcm9wZG93bk9wZW4gPSAhdGhpcy5zdGF0ZS5kcm9wZG93bk9wZW47XG4gICAgICB0aGlzLnNldFN0YXRlKCgpID0+ICh7IGRyb3Bkb3duT3BlbiB9KSk7XG4gICAgfVxuXG4gICAgY2xvc2VEcm9wRG93bigpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoKCkgPT4gKHsgZHJvcGRvd25PcGVuOiBmYWxzZSB9KSk7XG4gICAgfVxuXG4gICAgaGFuZGxlQ2hhbmdlU2l6ZVBlclBhZ2Uoc2l6ZVBlclBhZ2UpIHtcbiAgICAgIHRoaXMucHJvcHMub25TaXplUGVyUGFnZUNoYW5nZShzaXplUGVyUGFnZSk7XG4gICAgICB0aGlzLmNsb3NlRHJvcERvd24oKTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICBjb25zdCB7XG4gICAgICAgIHRhYmxlSWQsXG4gICAgICAgIGJvb3RzdHJhcDQsXG4gICAgICAgIHNpemVQZXJQYWdlTGlzdCxcbiAgICAgICAgY3VyclNpemVQZXJQYWdlLFxuICAgICAgICBoaWRlU2l6ZVBlclBhZ2UsXG4gICAgICAgIHNpemVQZXJQYWdlUmVuZGVyZXIsXG4gICAgICAgIHNpemVQZXJQYWdlT3B0aW9uUmVuZGVyZXJcbiAgICAgIH0gPSB0aGlzLnByb3BzO1xuICAgICAgY29uc3QgeyBkcm9wZG93bk9wZW46IG9wZW4gfSA9IHRoaXMuc3RhdGU7XG5cbiAgICAgIGlmIChzaXplUGVyUGFnZUxpc3QubGVuZ3RoID4gMSAmJiAhaGlkZVNpemVQZXJQYWdlKSB7XG4gICAgICAgIGlmIChzaXplUGVyUGFnZVJlbmRlcmVyKSB7XG4gICAgICAgICAgcmV0dXJuIHNpemVQZXJQYWdlUmVuZGVyZXIoe1xuICAgICAgICAgICAgb3B0aW9uczogdGhpcy5jYWxjdWxhdGVTaXplUGVyUGFnZVN0YXR1cygpLFxuICAgICAgICAgICAgY3VyclNpemVQZXJQYWdlOiBgJHtjdXJyU2l6ZVBlclBhZ2V9YCxcbiAgICAgICAgICAgIG9uU2l6ZVBlclBhZ2VDaGFuZ2U6IHRoaXMuaGFuZGxlQ2hhbmdlU2l6ZVBlclBhZ2VcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgIDxXcmFwcGVkQ29tcG9uZW50XG4gICAgICAgICAgICB7IC4uLnRoaXMucHJvcHMgfVxuICAgICAgICAgICAgY3VyclNpemVQZXJQYWdlPXsgYCR7Y3VyclNpemVQZXJQYWdlfWAgfVxuICAgICAgICAgICAgb3B0aW9ucz17IHRoaXMuY2FsY3VsYXRlU2l6ZVBlclBhZ2VTdGF0dXMoKSB9XG4gICAgICAgICAgICBvcHRpb25SZW5kZXJlcj17IHNpemVQZXJQYWdlT3B0aW9uUmVuZGVyZXIgfVxuICAgICAgICAgICAgb25TaXplUGVyUGFnZUNoYW5nZT17IHRoaXMuaGFuZGxlQ2hhbmdlU2l6ZVBlclBhZ2UgfVxuICAgICAgICAgICAgb25DbGljaz17IHRoaXMudG9nZ2xlRHJvcERvd24gfVxuICAgICAgICAgICAgb25CbHVyPXsgdGhpcy5jbG9zZURyb3BEb3duIH1cbiAgICAgICAgICAgIG9wZW49eyBvcGVuIH1cbiAgICAgICAgICAgIHRhYmxlSWQ9eyB0YWJsZUlkIH1cbiAgICAgICAgICAgIGJvb3RzdHJhcDQ9eyBib290c3RyYXA0IH1cbiAgICAgICAgICAvPlxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9O1xuXG5cbmV4cG9ydCBjb25zdCBTaXplUGVyUGFnZURyb3Bkb3duV2l0aEFkYXB0ZXIgPSBzaXplUGVyUGFnZURyb3Bkb3duQWRhcHRlcihTaXplUGVyUGFnZURyb3BEb3duKTtcbmV4cG9ydCBkZWZhdWx0IHNpemVQZXJQYWdlRHJvcGRvd25BZGFwdGVyO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcGFja2FnZXMvcmVhY3QtYm9vdHN0cmFwLXRhYmxlMi1wYWdpbmF0b3Ivc3JjL3NpemUtcGVyLXBhZ2UtZHJvcGRvd24tYWRhcHRlci5qcyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgY3MgZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IFNpemVQZXJQYWdlT3B0aW9uIGZyb20gJy4vc2l6ZS1wZXItcGFnZS1vcHRpb24nO1xuXG5jb25zdCBzaXplUGVyUGFnZURlZmF1bHRDbGFzcyA9ICdyZWFjdC1icy10YWJsZS1zaXplUGVyUGFnZS1kcm9wZG93bic7XG5cbmNvbnN0IFNpemVQZXJQYWdlRHJvcERvd24gPSAocHJvcHMpID0+IHtcbiAgY29uc3Qge1xuICAgIG9wZW4sXG4gICAgdGFibGVJZCxcbiAgICBoaWRkZW4sXG4gICAgb25DbGljayxcbiAgICBvbkJsdXIsXG4gICAgb3B0aW9ucyxcbiAgICBjbGFzc05hbWUsXG4gICAgdmFyaWF0aW9uLFxuICAgIGJvb3RzdHJhcDQsXG4gICAgYnRuQ29udGV4dHVhbCxcbiAgICBvcHRpb25SZW5kZXJlcixcbiAgICBjdXJyU2l6ZVBlclBhZ2UsXG4gICAgb25TaXplUGVyUGFnZUNoYW5nZVxuICB9ID0gcHJvcHM7XG5cbiAgY29uc3QgZHJvcERvd25TdHlsZSA9IHsgdmlzaWJpbGl0eTogaGlkZGVuID8gJ2hpZGRlbicgOiAndmlzaWJsZScgfTtcbiAgY29uc3Qgb3BlbkNsYXNzID0gb3BlbiA/ICdvcGVuIHNob3cnIDogJyc7XG4gIGNvbnN0IGRyb3Bkb3duQ2xhc3NlcyA9IGNzKFxuICAgIG9wZW5DbGFzcyxcbiAgICBzaXplUGVyUGFnZURlZmF1bHRDbGFzcyxcbiAgICB2YXJpYXRpb24sXG4gICAgY2xhc3NOYW1lLFxuICApO1xuXG4gIGNvbnN0IGlkID0gdGFibGVJZCA/IGAke3RhYmxlSWR9LXBhZ2VEcm9wRG93bmAgOiAncGFnZURyb3BEb3duJztcblxuICByZXR1cm4gKFxuICAgIDxzcGFuXG4gICAgICBzdHlsZT17IGRyb3BEb3duU3R5bGUgfVxuICAgICAgY2xhc3NOYW1lPXsgZHJvcGRvd25DbGFzc2VzIH1cbiAgICA+XG4gICAgICA8YnV0dG9uXG4gICAgICAgIGlkPXsgaWQgfVxuICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgY2xhc3NOYW1lPXsgYGJ0biAke2J0bkNvbnRleHR1YWx9IGRyb3Bkb3duLXRvZ2dsZWAgfVxuICAgICAgICBkYXRhLXRvZ2dsZT1cImRyb3Bkb3duXCJcbiAgICAgICAgYXJpYS1leHBhbmRlZD17IG9wZW4gfVxuICAgICAgICBvbkNsaWNrPXsgb25DbGljayB9XG4gICAgICAgIG9uQmx1cj17IG9uQmx1ciB9XG4gICAgICA+XG4gICAgICAgIHsgY3VyclNpemVQZXJQYWdlIH1cbiAgICAgICAgeyAnICcgfVxuICAgICAgICB7XG4gICAgICAgICAgYm9vdHN0cmFwNCA/IG51bGwgOiAoXG4gICAgICAgICAgICA8c3Bhbj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiY2FyZXRcIiAvPlxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgIClcbiAgICAgICAgfVxuICAgICAgPC9idXR0b24+XG4gICAgICA8dWxcbiAgICAgICAgY2xhc3NOYW1lPXsgYGRyb3Bkb3duLW1lbnUgJHtvcGVuQ2xhc3N9YCB9XG4gICAgICAgIHJvbGU9XCJtZW51XCJcbiAgICAgICAgYXJpYS1sYWJlbGxlZGJ5PXsgaWQgfVxuICAgICAgPlxuICAgICAgICB7XG4gICAgICAgICAgb3B0aW9ucy5tYXAoKG9wdGlvbikgPT4ge1xuICAgICAgICAgICAgaWYgKG9wdGlvblJlbmRlcmVyKSB7XG4gICAgICAgICAgICAgIHJldHVybiBvcHRpb25SZW5kZXJlcih7XG4gICAgICAgICAgICAgICAgLi4ub3B0aW9uLFxuICAgICAgICAgICAgICAgIG9uU2l6ZVBlclBhZ2VDaGFuZ2VcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICA8U2l6ZVBlclBhZ2VPcHRpb25cbiAgICAgICAgICAgICAgICB7IC4uLm9wdGlvbiB9XG4gICAgICAgICAgICAgICAga2V5PXsgb3B0aW9uLnRleHQgfVxuICAgICAgICAgICAgICAgIGJvb3RzdHJhcDQ9eyBib290c3RyYXA0IH1cbiAgICAgICAgICAgICAgICBvblNpemVQZXJQYWdlQ2hhbmdlPXsgb25TaXplUGVyUGFnZUNoYW5nZSB9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICApO1xuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIDwvdWw+XG4gICAgPC9zcGFuPlxuICApO1xufTtcblxuU2l6ZVBlclBhZ2VEcm9wRG93bi5wcm9wVHlwZXMgPSB7XG4gIGN1cnJTaXplUGVyUGFnZTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICBvcHRpb25zOiBQcm9wVHlwZXMuYXJyYXkuaXNSZXF1aXJlZCxcbiAgb25DbGljazogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgb25CbHVyOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICBvblNpemVQZXJQYWdlQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICBib290c3RyYXA0OiBQcm9wVHlwZXMuYm9vbCxcbiAgdGFibGVJZDogUHJvcFR5cGVzLnN0cmluZyxcbiAgb3BlbjogUHJvcFR5cGVzLmJvb2wsXG4gIGhpZGRlbjogUHJvcFR5cGVzLmJvb2wsXG4gIGJ0bkNvbnRleHR1YWw6IFByb3BUeXBlcy5zdHJpbmcsXG4gIHZhcmlhdGlvbjogUHJvcFR5cGVzLm9uZU9mKFsnZHJvcGRvd24nLCAnZHJvcHVwJ10pLFxuICBjbGFzc05hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gIG9wdGlvblJlbmRlcmVyOiBQcm9wVHlwZXMuZnVuY1xufTtcblNpemVQZXJQYWdlRHJvcERvd24uZGVmYXVsdFByb3BzID0ge1xuICBvcGVuOiBmYWxzZSxcbiAgaGlkZGVuOiBmYWxzZSxcbiAgYnRuQ29udGV4dHVhbDogJ2J0bi1kZWZhdWx0IGJ0bi1zZWNvbmRhcnknLFxuICB2YXJpYXRpb246ICdkcm9wZG93bicsXG4gIGNsYXNzTmFtZTogJycsXG4gIG9wdGlvblJlbmRlcmVyOiBudWxsLFxuICBib290c3RyYXA0OiBmYWxzZSxcbiAgdGFibGVJZDogbnVsbFxufTtcblxuXG5leHBvcnQgZGVmYXVsdCBTaXplUGVyUGFnZURyb3BEb3duO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcGFja2FnZXMvcmVhY3QtYm9vdHN0cmFwLXRhYmxlMi1wYWdpbmF0b3Ivc3JjL3NpemUtcGVyLXBhZ2UtZHJvcGRvd24uanMiLCIvKiBlc2xpbnQgcmVhY3QvcHJvcC10eXBlczogMCAqL1xuaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHBhZ2VSZXNvbHZlciBmcm9tICcuL3BhZ2UtcmVzb2x2ZXInO1xuaW1wb3J0IFBhZ2luYXRpb25MaXN0IGZyb20gJy4vcGFnaW5hdGlvbi1saXN0JztcblxuY29uc3QgcGFnaW5hdGlvbkxpc3RBZGFwdGVyID0gV3JhcHBlZENvbXBvbmVudCA9PlxuICBjbGFzcyBQYWdpbmF0aW9uTGlzdEFkYXB0ZXIgZXh0ZW5kcyBwYWdlUmVzb2x2ZXIoQ29tcG9uZW50KSB7XG4gICAgcmVuZGVyKCkge1xuICAgICAgY29uc3Qge1xuICAgICAgICBsYXN0UGFnZSxcbiAgICAgICAgdG90YWxQYWdlcyxcbiAgICAgICAgcGFnZUJ1dHRvblJlbmRlcmVyLFxuICAgICAgICBvblBhZ2VDaGFuZ2UsXG4gICAgICAgIGRpc2FibGVQYWdlVGl0bGUsXG4gICAgICAgIGhpZGVQYWdlTGlzdE9ubHlPbmVQYWdlXG4gICAgICB9ID0gdGhpcy5wcm9wcztcbiAgICAgIGNvbnN0IHBhZ2VzID0gdGhpcy5jYWxjdWxhdGVQYWdlU3RhdHVzKFxuICAgICAgICB0aGlzLmNhbGN1bGF0ZVBhZ2VzKHRvdGFsUGFnZXMsIGxhc3RQYWdlKSxcbiAgICAgICAgbGFzdFBhZ2UsXG4gICAgICAgIGRpc2FibGVQYWdlVGl0bGVcbiAgICAgICk7XG4gICAgICBpZiAodG90YWxQYWdlcyA9PT0gMSAmJiBoaWRlUGFnZUxpc3RPbmx5T25lUGFnZSkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxXcmFwcGVkQ29tcG9uZW50XG4gICAgICAgICAgcGFnZUJ1dHRvblJlbmRlcmVyPXsgcGFnZUJ1dHRvblJlbmRlcmVyIH1cbiAgICAgICAgICBvblBhZ2VDaGFuZ2U9eyBvblBhZ2VDaGFuZ2UgfVxuICAgICAgICAgIHBhZ2VzPXsgcGFnZXMgfVxuICAgICAgICAvPlxuICAgICAgKTtcbiAgICB9XG4gIH07XG5cblxuZXhwb3J0IGNvbnN0IFBhZ2luYXRpb25MaXN0V2l0aEFkYXB0ZXIgPSBwYWdpbmF0aW9uTGlzdEFkYXB0ZXIoUGFnaW5hdGlvbkxpc3QpO1xuZXhwb3J0IGRlZmF1bHQgcGFnaW5hdGlvbkxpc3RBZGFwdGVyO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcGFja2FnZXMvcmVhY3QtYm9vdHN0cmFwLXRhYmxlMi1wYWdpbmF0b3Ivc3JjL3BhZ2luYXRpb24tbGlzdC1hZGFwdGVyLmpzIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5cbmltcG9ydCBQYWdlQnV0dG9uIGZyb20gJy4vcGFnZS1idXR0b24nO1xuXG5jb25zdCBQYWdpbmF0b25MaXN0ID0gcHJvcHMgPT4gKFxuICA8dWwgY2xhc3NOYW1lPVwicGFnaW5hdGlvbiByZWFjdC1ib290c3RyYXAtdGFibGUtcGFnZS1idG5zLXVsXCI+XG4gICAge1xuICAgICAgcHJvcHMucGFnZXMubWFwKChwYWdlUHJvcHMpID0+IHtcbiAgICAgICAgaWYgKHByb3BzLnBhZ2VCdXR0b25SZW5kZXJlcikge1xuICAgICAgICAgIHJldHVybiBwcm9wcy5wYWdlQnV0dG9uUmVuZGVyZXIoe1xuICAgICAgICAgICAgLi4ucGFnZVByb3BzLFxuICAgICAgICAgICAgb25QYWdlQ2hhbmdlOiBwcm9wcy5vblBhZ2VDaGFuZ2VcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgIDxQYWdlQnV0dG9uXG4gICAgICAgICAgICBrZXk9eyBwYWdlUHJvcHMucGFnZSB9XG4gICAgICAgICAgICB7IC4uLnBhZ2VQcm9wcyB9XG4gICAgICAgICAgICBvblBhZ2VDaGFuZ2U9eyBwcm9wcy5vblBhZ2VDaGFuZ2UgfVxuICAgICAgICAgIC8+XG4gICAgICAgICk7XG4gICAgICB9KVxuICAgIH1cbiAgPC91bD5cbik7XG5cblBhZ2luYXRvbkxpc3QucHJvcFR5cGVzID0ge1xuICBwYWdlczogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLnNoYXBlKHtcbiAgICBwYWdlOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgIFByb3BUeXBlcy5ub2RlLFxuICAgICAgUHJvcFR5cGVzLm51bWJlcixcbiAgICAgIFByb3BUeXBlcy5zdHJpbmdcbiAgICBdKSxcbiAgICBhY3RpdmU6IFByb3BUeXBlcy5ib29sLFxuICAgIGRpc2FibGU6IFByb3BUeXBlcy5ib29sLFxuICAgIHRpdGxlOiBQcm9wVHlwZXMuc3RyaW5nXG4gIH0pKS5pc1JlcXVpcmVkLFxuICBvblBhZ2VDaGFuZ2U6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIHBhZ2VCdXR0b25SZW5kZXJlcjogUHJvcFR5cGVzLmZ1bmNcbn07XG5cblBhZ2luYXRvbkxpc3QuZGVmYXVsdFByb3BzID0ge1xuICBwYWdlQnV0dG9uUmVuZGVyZXI6IG51bGxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFBhZ2luYXRvbkxpc3Q7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9wYWNrYWdlcy9yZWFjdC1ib290c3RyYXAtdGFibGUyLXBhZ2luYXRvci9zcmMvcGFnaW5hdGlvbi1saXN0LmpzIiwiLyogZXNsaW50IHJlYWN0L3Byb3AtdHlwZXM6IDAgKi9cbmltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCBwYWdlUmVzb2x2ZXIgZnJvbSAnLi9wYWdlLXJlc29sdmVyJztcbmltcG9ydCBQYWdpbmF0aW9uVG90YWwgZnJvbSAnLi9wYWdpbmF0aW9uLXRvdGFsJztcblxuY29uc3QgcGFnaW5hdGlvblRvdGFsQWRhcHRlciA9IFdyYXBwZWRDb21wb25lbnQgPT5cbiAgY2xhc3MgUGFnaW5hdGlvblRvdGFsQWRhcHRlciBleHRlbmRzIHBhZ2VSZXNvbHZlcihDb21wb25lbnQpIHtcbiAgICByZW5kZXIoKSB7XG4gICAgICBjb25zdCBbZnJvbSwgdG9dID0gdGhpcy5jYWxjdWxhdGVGcm9tVG8oKTtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxXcmFwcGVkQ29tcG9uZW50XG4gICAgICAgICAgZnJvbT17IGZyb20gfVxuICAgICAgICAgIHRvPXsgdG8gfVxuICAgICAgICAgIGRhdGFTaXplPXsgdGhpcy5wcm9wcy5kYXRhU2l6ZSB9XG4gICAgICAgICAgcGFnaW5hdGlvblRvdGFsUmVuZGVyZXI9eyB0aGlzLnByb3BzLnBhZ2luYXRpb25Ub3RhbFJlbmRlcmVyIH1cbiAgICAgICAgLz5cbiAgICAgICk7XG4gICAgfVxuICB9O1xuXG5cbmV4cG9ydCBjb25zdCBQYWdpbmF0aW9uVG90YWxXaXRoQWRhcHRlciA9IHBhZ2luYXRpb25Ub3RhbEFkYXB0ZXIoUGFnaW5hdGlvblRvdGFsKTtcbmV4cG9ydCBkZWZhdWx0IHBhZ2luYXRpb25Ub3RhbEFkYXB0ZXI7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9wYWNrYWdlcy9yZWFjdC1ib290c3RyYXAtdGFibGUyLXBhZ2luYXRvci9zcmMvcGFnaW5hdGlvbi10b3RhbC1hZGFwdGVyLmpzIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5cbmNvbnN0IFBhZ2luYXRpb25Ub3RhbCA9IChwcm9wcykgPT4ge1xuICBpZiAocHJvcHMucGFnaW5hdGlvblRvdGFsUmVuZGVyZXIpIHtcbiAgICByZXR1cm4gcHJvcHMucGFnaW5hdGlvblRvdGFsUmVuZGVyZXIocHJvcHMuZnJvbSwgcHJvcHMudG8sIHByb3BzLmRhdGFTaXplKTtcbiAgfVxuICByZXR1cm4gKFxuICAgIDxzcGFuIGNsYXNzTmFtZT1cInJlYWN0LWJvb3RzdHJhcC10YWJsZS1wYWdpbmF0aW9uLXRvdGFsXCI+XG4gICAgICAmbmJzcDtTaG93aW5nIHJvd3MgeyBwcm9wcy5mcm9tIH0gdG8mbmJzcDt7IHByb3BzLnRvIH0gb2YmbmJzcDt7IHByb3BzLmRhdGFTaXplIH1cbiAgICA8L3NwYW4+XG4gICk7XG59O1xuXG5QYWdpbmF0aW9uVG90YWwucHJvcFR5cGVzID0ge1xuICBmcm9tOiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4gIHRvOiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4gIGRhdGFTaXplOiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4gIHBhZ2luYXRpb25Ub3RhbFJlbmRlcmVyOiBQcm9wVHlwZXMuZnVuY1xufTtcblxuUGFnaW5hdGlvblRvdGFsLmRlZmF1bHRQcm9wcyA9IHtcbiAgcGFnaW5hdGlvblRvdGFsUmVuZGVyZXI6IHVuZGVmaW5lZFxufTtcblxuZXhwb3J0IGRlZmF1bHQgUGFnaW5hdGlvblRvdGFsO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcGFja2FnZXMvcmVhY3QtYm9vdHN0cmFwLXRhYmxlMi1wYWdpbmF0b3Ivc3JjL3BhZ2luYXRpb24tdG90YWwuanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBjcmVhdGVCYXNlQ29udGV4dCBmcm9tICcuL3NyYy9zdGF0ZS1jb250ZXh0JztcbmltcG9ydCBjcmVhdGVEYXRhQ29udGV4dCBmcm9tICcuL3NyYy9kYXRhLWNvbnRleHQnO1xuaW1wb3J0IFBhZ2luYXRpb25MaXN0U3RhbmRhbG9uZSBmcm9tICcuL3NyYy9wYWdpbmF0aW9uLWxpc3Qtc3RhbmRhbG9uZSc7XG5pbXBvcnQgU2l6ZVBlclBhZ2VEcm9wZG93blN0YW5kYWxvbmUgZnJvbSAnLi9zcmMvc2l6ZS1wZXItcGFnZS1kcm9wZG93bi1zdGFuZGFsb25lJztcbmltcG9ydCBQYWdpbmF0aW9uVG90YWxTdGFuZGFsb25lIGZyb20gJy4vc3JjL3BhZ2luYXRpb24tdG90YWwtc3RhbmRhbG9uZSc7XG5cbmV4cG9ydCBkZWZhdWx0IChvcHRpb25zID0ge30pID0+ICh7XG4gIGNyZWF0ZUNvbnRleHQ6IGNyZWF0ZURhdGFDb250ZXh0LFxuICBvcHRpb25zXG59KTtcblxuY29uc3QgeyBQcm92aWRlciwgQ29uc3VtZXIgfSA9IGNyZWF0ZUJhc2VDb250ZXh0KCk7XG5cbmNvbnN0IEN1c3RvbWl6YWJsZVByb3ZpZGVyID0gcHJvcHMgPT4gKFxuICA8UHJvdmlkZXIgeyAuLi5wcm9wcyB9PlxuICAgIDxDb25zdW1lcj57IHBhZ2luYXRpb25Qcm9wcyA9PiBwcm9wcy5jaGlsZHJlbihwYWdpbmF0aW9uUHJvcHMpIH08L0NvbnN1bWVyPlxuICA8L1Byb3ZpZGVyPlxuKTtcblxuQ3VzdG9taXphYmxlUHJvdmlkZXIucHJvcFR5cGVzID0ge1xuICBjaGlsZHJlbjogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZFxufTtcblxuZXhwb3J0IGNvbnN0IFBhZ2luYXRpb25Qcm92aWRlciA9IEN1c3RvbWl6YWJsZVByb3ZpZGVyO1xuZXhwb3J0IHsgUGFnaW5hdGlvbkxpc3RTdGFuZGFsb25lLCBTaXplUGVyUGFnZURyb3Bkb3duU3RhbmRhbG9uZSwgUGFnaW5hdGlvblRvdGFsU3RhbmRhbG9uZSB9O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcGFja2FnZXMvcmVhY3QtYm9vdHN0cmFwLXRhYmxlMi1wYWdpbmF0b3IvaW5kZXguanMiLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBlbXB0eUZ1bmN0aW9uID0gcmVxdWlyZSgnZmJqcy9saWIvZW1wdHlGdW5jdGlvbicpO1xudmFyIGludmFyaWFudCA9IHJlcXVpcmUoJ2ZianMvbGliL2ludmFyaWFudCcpO1xudmFyIFJlYWN0UHJvcFR5cGVzU2VjcmV0ID0gcmVxdWlyZSgnLi9saWIvUmVhY3RQcm9wVHlwZXNTZWNyZXQnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcbiAgZnVuY3Rpb24gc2hpbShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUsIHNlY3JldCkge1xuICAgIGlmIChzZWNyZXQgPT09IFJlYWN0UHJvcFR5cGVzU2VjcmV0KSB7XG4gICAgICAvLyBJdCBpcyBzdGlsbCBzYWZlIHdoZW4gY2FsbGVkIGZyb20gUmVhY3QuXG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGludmFyaWFudChcbiAgICAgIGZhbHNlLFxuICAgICAgJ0NhbGxpbmcgUHJvcFR5cGVzIHZhbGlkYXRvcnMgZGlyZWN0bHkgaXMgbm90IHN1cHBvcnRlZCBieSB0aGUgYHByb3AtdHlwZXNgIHBhY2thZ2UuICcgK1xuICAgICAgJ1VzZSBQcm9wVHlwZXMuY2hlY2tQcm9wVHlwZXMoKSB0byBjYWxsIHRoZW0uICcgK1xuICAgICAgJ1JlYWQgbW9yZSBhdCBodHRwOi8vZmIubWUvdXNlLWNoZWNrLXByb3AtdHlwZXMnXG4gICAgKTtcbiAgfTtcbiAgc2hpbS5pc1JlcXVpcmVkID0gc2hpbTtcbiAgZnVuY3Rpb24gZ2V0U2hpbSgpIHtcbiAgICByZXR1cm4gc2hpbTtcbiAgfTtcbiAgLy8gSW1wb3J0YW50IVxuICAvLyBLZWVwIHRoaXMgbGlzdCBpbiBzeW5jIHdpdGggcHJvZHVjdGlvbiB2ZXJzaW9uIGluIGAuL2ZhY3RvcnlXaXRoVHlwZUNoZWNrZXJzLmpzYC5cbiAgdmFyIFJlYWN0UHJvcFR5cGVzID0ge1xuICAgIGFycmF5OiBzaGltLFxuICAgIGJvb2w6IHNoaW0sXG4gICAgZnVuYzogc2hpbSxcbiAgICBudW1iZXI6IHNoaW0sXG4gICAgb2JqZWN0OiBzaGltLFxuICAgIHN0cmluZzogc2hpbSxcbiAgICBzeW1ib2w6IHNoaW0sXG5cbiAgICBhbnk6IHNoaW0sXG4gICAgYXJyYXlPZjogZ2V0U2hpbSxcbiAgICBlbGVtZW50OiBzaGltLFxuICAgIGluc3RhbmNlT2Y6IGdldFNoaW0sXG4gICAgbm9kZTogc2hpbSxcbiAgICBvYmplY3RPZjogZ2V0U2hpbSxcbiAgICBvbmVPZjogZ2V0U2hpbSxcbiAgICBvbmVPZlR5cGU6IGdldFNoaW0sXG4gICAgc2hhcGU6IGdldFNoaW1cbiAgfTtcblxuICBSZWFjdFByb3BUeXBlcy5jaGVja1Byb3BUeXBlcyA9IGVtcHR5RnVuY3Rpb247XG4gIFJlYWN0UHJvcFR5cGVzLlByb3BUeXBlcyA9IFJlYWN0UHJvcFR5cGVzO1xuXG4gIHJldHVybiBSZWFjdFByb3BUeXBlcztcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9wcm9wLXR5cGVzL2ZhY3RvcnlXaXRoVGhyb3dpbmdTaGltcy5qc1xuLy8gbW9kdWxlIGlkID0gMTZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJcInVzZSBzdHJpY3RcIjtcblxuLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqXG4gKiBcbiAqL1xuXG5mdW5jdGlvbiBtYWtlRW1wdHlGdW5jdGlvbihhcmcpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gYXJnO1xuICB9O1xufVxuXG4vKipcbiAqIFRoaXMgZnVuY3Rpb24gYWNjZXB0cyBhbmQgZGlzY2FyZHMgaW5wdXRzOyBpdCBoYXMgbm8gc2lkZSBlZmZlY3RzLiBUaGlzIGlzXG4gKiBwcmltYXJpbHkgdXNlZnVsIGlkaW9tYXRpY2FsbHkgZm9yIG92ZXJyaWRhYmxlIGZ1bmN0aW9uIGVuZHBvaW50cyB3aGljaFxuICogYWx3YXlzIG5lZWQgdG8gYmUgY2FsbGFibGUsIHNpbmNlIEpTIGxhY2tzIGEgbnVsbC1jYWxsIGlkaW9tIGFsYSBDb2NvYS5cbiAqL1xudmFyIGVtcHR5RnVuY3Rpb24gPSBmdW5jdGlvbiBlbXB0eUZ1bmN0aW9uKCkge307XG5cbmVtcHR5RnVuY3Rpb24udGhhdFJldHVybnMgPSBtYWtlRW1wdHlGdW5jdGlvbjtcbmVtcHR5RnVuY3Rpb24udGhhdFJldHVybnNGYWxzZSA9IG1ha2VFbXB0eUZ1bmN0aW9uKGZhbHNlKTtcbmVtcHR5RnVuY3Rpb24udGhhdFJldHVybnNUcnVlID0gbWFrZUVtcHR5RnVuY3Rpb24odHJ1ZSk7XG5lbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zTnVsbCA9IG1ha2VFbXB0eUZ1bmN0aW9uKG51bGwpO1xuZW1wdHlGdW5jdGlvbi50aGF0UmV0dXJuc1RoaXMgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB0aGlzO1xufTtcbmVtcHR5RnVuY3Rpb24udGhhdFJldHVybnNBcmd1bWVudCA9IGZ1bmN0aW9uIChhcmcpIHtcbiAgcmV0dXJuIGFyZztcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZW1wdHlGdW5jdGlvbjtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9mYmpzL2xpYi9lbXB0eUZ1bmN0aW9uLmpzXG4vLyBtb2R1bGUgaWQgPSAxN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBVc2UgaW52YXJpYW50KCkgdG8gYXNzZXJ0IHN0YXRlIHdoaWNoIHlvdXIgcHJvZ3JhbSBhc3N1bWVzIHRvIGJlIHRydWUuXG4gKlxuICogUHJvdmlkZSBzcHJpbnRmLXN0eWxlIGZvcm1hdCAob25seSAlcyBpcyBzdXBwb3J0ZWQpIGFuZCBhcmd1bWVudHNcbiAqIHRvIHByb3ZpZGUgaW5mb3JtYXRpb24gYWJvdXQgd2hhdCBicm9rZSBhbmQgd2hhdCB5b3Ugd2VyZVxuICogZXhwZWN0aW5nLlxuICpcbiAqIFRoZSBpbnZhcmlhbnQgbWVzc2FnZSB3aWxsIGJlIHN0cmlwcGVkIGluIHByb2R1Y3Rpb24sIGJ1dCB0aGUgaW52YXJpYW50XG4gKiB3aWxsIHJlbWFpbiB0byBlbnN1cmUgbG9naWMgZG9lcyBub3QgZGlmZmVyIGluIHByb2R1Y3Rpb24uXG4gKi9cblxudmFyIHZhbGlkYXRlRm9ybWF0ID0gZnVuY3Rpb24gdmFsaWRhdGVGb3JtYXQoZm9ybWF0KSB7fTtcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgdmFsaWRhdGVGb3JtYXQgPSBmdW5jdGlvbiB2YWxpZGF0ZUZvcm1hdChmb3JtYXQpIHtcbiAgICBpZiAoZm9ybWF0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignaW52YXJpYW50IHJlcXVpcmVzIGFuIGVycm9yIG1lc3NhZ2UgYXJndW1lbnQnKTtcbiAgICB9XG4gIH07XG59XG5cbmZ1bmN0aW9uIGludmFyaWFudChjb25kaXRpb24sIGZvcm1hdCwgYSwgYiwgYywgZCwgZSwgZikge1xuICB2YWxpZGF0ZUZvcm1hdChmb3JtYXQpO1xuXG4gIGlmICghY29uZGl0aW9uKSB7XG4gICAgdmFyIGVycm9yO1xuICAgIGlmIChmb3JtYXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgZXJyb3IgPSBuZXcgRXJyb3IoJ01pbmlmaWVkIGV4Y2VwdGlvbiBvY2N1cnJlZDsgdXNlIHRoZSBub24tbWluaWZpZWQgZGV2IGVudmlyb25tZW50ICcgKyAnZm9yIHRoZSBmdWxsIGVycm9yIG1lc3NhZ2UgYW5kIGFkZGl0aW9uYWwgaGVscGZ1bCB3YXJuaW5ncy4nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGFyZ3MgPSBbYSwgYiwgYywgZCwgZSwgZl07XG4gICAgICB2YXIgYXJnSW5kZXggPSAwO1xuICAgICAgZXJyb3IgPSBuZXcgRXJyb3IoZm9ybWF0LnJlcGxhY2UoLyVzL2csIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGFyZ3NbYXJnSW5kZXgrK107XG4gICAgICB9KSk7XG4gICAgICBlcnJvci5uYW1lID0gJ0ludmFyaWFudCBWaW9sYXRpb24nO1xuICAgIH1cblxuICAgIGVycm9yLmZyYW1lc1RvUG9wID0gMTsgLy8gd2UgZG9uJ3QgY2FyZSBhYm91dCBpbnZhcmlhbnQncyBvd24gZnJhbWVcbiAgICB0aHJvdyBlcnJvcjtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGludmFyaWFudDtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9mYmpzL2xpYi9pbnZhcmlhbnQuanNcbi8vIG1vZHVsZSBpZCA9IDE4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUmVhY3RQcm9wVHlwZXNTZWNyZXQgPSAnU0VDUkVUX0RPX05PVF9QQVNTX1RISVNfT1JfWU9VX1dJTExfQkVfRklSRUQnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0UHJvcFR5cGVzU2VjcmV0O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcHJvcC10eXBlcy9saWIvUmVhY3RQcm9wVHlwZXNTZWNyZXQuanNcbi8vIG1vZHVsZSBpZCA9IDE5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLy8gQ29weXJpZ2h0IEpveWVudCwgSW5jLiBhbmQgb3RoZXIgTm9kZSBjb250cmlidXRvcnMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGFcbi8vIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGVcbi8vIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZ1xuLy8gd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLFxuLy8gZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdFxuLy8gcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlXG4vLyBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuLy8gaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuLy8gT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxuLy8gTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTlxuLy8gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sXG4vLyBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1Jcbi8vIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEVcbi8vIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbmZ1bmN0aW9uIEV2ZW50RW1pdHRlcigpIHtcbiAgdGhpcy5fZXZlbnRzID0gdGhpcy5fZXZlbnRzIHx8IHt9O1xuICB0aGlzLl9tYXhMaXN0ZW5lcnMgPSB0aGlzLl9tYXhMaXN0ZW5lcnMgfHwgdW5kZWZpbmVkO1xufVxubW9kdWxlLmV4cG9ydHMgPSBFdmVudEVtaXR0ZXI7XG5cbi8vIEJhY2t3YXJkcy1jb21wYXQgd2l0aCBub2RlIDAuMTAueFxuRXZlbnRFbWl0dGVyLkV2ZW50RW1pdHRlciA9IEV2ZW50RW1pdHRlcjtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fZXZlbnRzID0gdW5kZWZpbmVkO1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fbWF4TGlzdGVuZXJzID0gdW5kZWZpbmVkO1xuXG4vLyBCeSBkZWZhdWx0IEV2ZW50RW1pdHRlcnMgd2lsbCBwcmludCBhIHdhcm5pbmcgaWYgbW9yZSB0aGFuIDEwIGxpc3RlbmVycyBhcmVcbi8vIGFkZGVkIHRvIGl0LiBUaGlzIGlzIGEgdXNlZnVsIGRlZmF1bHQgd2hpY2ggaGVscHMgZmluZGluZyBtZW1vcnkgbGVha3MuXG5FdmVudEVtaXR0ZXIuZGVmYXVsdE1heExpc3RlbmVycyA9IDEwO1xuXG4vLyBPYnZpb3VzbHkgbm90IGFsbCBFbWl0dGVycyBzaG91bGQgYmUgbGltaXRlZCB0byAxMC4gVGhpcyBmdW5jdGlvbiBhbGxvd3Ncbi8vIHRoYXQgdG8gYmUgaW5jcmVhc2VkLiBTZXQgdG8gemVybyBmb3IgdW5saW1pdGVkLlxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5zZXRNYXhMaXN0ZW5lcnMgPSBmdW5jdGlvbihuKSB7XG4gIGlmICghaXNOdW1iZXIobikgfHwgbiA8IDAgfHwgaXNOYU4obikpXG4gICAgdGhyb3cgVHlwZUVycm9yKCduIG11c3QgYmUgYSBwb3NpdGl2ZSBudW1iZXInKTtcbiAgdGhpcy5fbWF4TGlzdGVuZXJzID0gbjtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmVtaXQgPSBmdW5jdGlvbih0eXBlKSB7XG4gIHZhciBlciwgaGFuZGxlciwgbGVuLCBhcmdzLCBpLCBsaXN0ZW5lcnM7XG5cbiAgaWYgKCF0aGlzLl9ldmVudHMpXG4gICAgdGhpcy5fZXZlbnRzID0ge307XG5cbiAgLy8gSWYgdGhlcmUgaXMgbm8gJ2Vycm9yJyBldmVudCBsaXN0ZW5lciB0aGVuIHRocm93LlxuICBpZiAodHlwZSA9PT0gJ2Vycm9yJykge1xuICAgIGlmICghdGhpcy5fZXZlbnRzLmVycm9yIHx8XG4gICAgICAgIChpc09iamVjdCh0aGlzLl9ldmVudHMuZXJyb3IpICYmICF0aGlzLl9ldmVudHMuZXJyb3IubGVuZ3RoKSkge1xuICAgICAgZXIgPSBhcmd1bWVudHNbMV07XG4gICAgICBpZiAoZXIgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICB0aHJvdyBlcjsgLy8gVW5oYW5kbGVkICdlcnJvcicgZXZlbnRcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIEF0IGxlYXN0IGdpdmUgc29tZSBraW5kIG9mIGNvbnRleHQgdG8gdGhlIHVzZXJcbiAgICAgICAgdmFyIGVyciA9IG5ldyBFcnJvcignVW5jYXVnaHQsIHVuc3BlY2lmaWVkIFwiZXJyb3JcIiBldmVudC4gKCcgKyBlciArICcpJyk7XG4gICAgICAgIGVyci5jb250ZXh0ID0gZXI7XG4gICAgICAgIHRocm93IGVycjtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBoYW5kbGVyID0gdGhpcy5fZXZlbnRzW3R5cGVdO1xuXG4gIGlmIChpc1VuZGVmaW5lZChoYW5kbGVyKSlcbiAgICByZXR1cm4gZmFsc2U7XG5cbiAgaWYgKGlzRnVuY3Rpb24oaGFuZGxlcikpIHtcbiAgICBzd2l0Y2ggKGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgIC8vIGZhc3QgY2FzZXNcbiAgICAgIGNhc2UgMTpcbiAgICAgICAgaGFuZGxlci5jYWxsKHRoaXMpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMjpcbiAgICAgICAgaGFuZGxlci5jYWxsKHRoaXMsIGFyZ3VtZW50c1sxXSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAzOlxuICAgICAgICBoYW5kbGVyLmNhbGwodGhpcywgYXJndW1lbnRzWzFdLCBhcmd1bWVudHNbMl0pO1xuICAgICAgICBicmVhaztcbiAgICAgIC8vIHNsb3dlclxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG4gICAgICAgIGhhbmRsZXIuYXBwbHkodGhpcywgYXJncyk7XG4gICAgfVxuICB9IGVsc2UgaWYgKGlzT2JqZWN0KGhhbmRsZXIpKSB7XG4gICAgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG4gICAgbGlzdGVuZXJzID0gaGFuZGxlci5zbGljZSgpO1xuICAgIGxlbiA9IGxpc3RlbmVycy5sZW5ndGg7XG4gICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKVxuICAgICAgbGlzdGVuZXJzW2ldLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmFkZExpc3RlbmVyID0gZnVuY3Rpb24odHlwZSwgbGlzdGVuZXIpIHtcbiAgdmFyIG07XG5cbiAgaWYgKCFpc0Z1bmN0aW9uKGxpc3RlbmVyKSlcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ2xpc3RlbmVyIG11c3QgYmUgYSBmdW5jdGlvbicpO1xuXG4gIGlmICghdGhpcy5fZXZlbnRzKVxuICAgIHRoaXMuX2V2ZW50cyA9IHt9O1xuXG4gIC8vIFRvIGF2b2lkIHJlY3Vyc2lvbiBpbiB0aGUgY2FzZSB0aGF0IHR5cGUgPT09IFwibmV3TGlzdGVuZXJcIiEgQmVmb3JlXG4gIC8vIGFkZGluZyBpdCB0byB0aGUgbGlzdGVuZXJzLCBmaXJzdCBlbWl0IFwibmV3TGlzdGVuZXJcIi5cbiAgaWYgKHRoaXMuX2V2ZW50cy5uZXdMaXN0ZW5lcilcbiAgICB0aGlzLmVtaXQoJ25ld0xpc3RlbmVyJywgdHlwZSxcbiAgICAgICAgICAgICAgaXNGdW5jdGlvbihsaXN0ZW5lci5saXN0ZW5lcikgP1xuICAgICAgICAgICAgICBsaXN0ZW5lci5saXN0ZW5lciA6IGxpc3RlbmVyKTtcblxuICBpZiAoIXRoaXMuX2V2ZW50c1t0eXBlXSlcbiAgICAvLyBPcHRpbWl6ZSB0aGUgY2FzZSBvZiBvbmUgbGlzdGVuZXIuIERvbid0IG5lZWQgdGhlIGV4dHJhIGFycmF5IG9iamVjdC5cbiAgICB0aGlzLl9ldmVudHNbdHlwZV0gPSBsaXN0ZW5lcjtcbiAgZWxzZSBpZiAoaXNPYmplY3QodGhpcy5fZXZlbnRzW3R5cGVdKSlcbiAgICAvLyBJZiB3ZSd2ZSBhbHJlYWR5IGdvdCBhbiBhcnJheSwganVzdCBhcHBlbmQuXG4gICAgdGhpcy5fZXZlbnRzW3R5cGVdLnB1c2gobGlzdGVuZXIpO1xuICBlbHNlXG4gICAgLy8gQWRkaW5nIHRoZSBzZWNvbmQgZWxlbWVudCwgbmVlZCB0byBjaGFuZ2UgdG8gYXJyYXkuXG4gICAgdGhpcy5fZXZlbnRzW3R5cGVdID0gW3RoaXMuX2V2ZW50c1t0eXBlXSwgbGlzdGVuZXJdO1xuXG4gIC8vIENoZWNrIGZvciBsaXN0ZW5lciBsZWFrXG4gIGlmIChpc09iamVjdCh0aGlzLl9ldmVudHNbdHlwZV0pICYmICF0aGlzLl9ldmVudHNbdHlwZV0ud2FybmVkKSB7XG4gICAgaWYgKCFpc1VuZGVmaW5lZCh0aGlzLl9tYXhMaXN0ZW5lcnMpKSB7XG4gICAgICBtID0gdGhpcy5fbWF4TGlzdGVuZXJzO1xuICAgIH0gZWxzZSB7XG4gICAgICBtID0gRXZlbnRFbWl0dGVyLmRlZmF1bHRNYXhMaXN0ZW5lcnM7XG4gICAgfVxuXG4gICAgaWYgKG0gJiYgbSA+IDAgJiYgdGhpcy5fZXZlbnRzW3R5cGVdLmxlbmd0aCA+IG0pIHtcbiAgICAgIHRoaXMuX2V2ZW50c1t0eXBlXS53YXJuZWQgPSB0cnVlO1xuICAgICAgY29uc29sZS5lcnJvcignKG5vZGUpIHdhcm5pbmc6IHBvc3NpYmxlIEV2ZW50RW1pdHRlciBtZW1vcnkgJyArXG4gICAgICAgICAgICAgICAgICAgICdsZWFrIGRldGVjdGVkLiAlZCBsaXN0ZW5lcnMgYWRkZWQuICcgK1xuICAgICAgICAgICAgICAgICAgICAnVXNlIGVtaXR0ZXIuc2V0TWF4TGlzdGVuZXJzKCkgdG8gaW5jcmVhc2UgbGltaXQuJyxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZXZlbnRzW3R5cGVdLmxlbmd0aCk7XG4gICAgICBpZiAodHlwZW9mIGNvbnNvbGUudHJhY2UgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgLy8gbm90IHN1cHBvcnRlZCBpbiBJRSAxMFxuICAgICAgICBjb25zb2xlLnRyYWNlKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uID0gRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lcjtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbmNlID0gZnVuY3Rpb24odHlwZSwgbGlzdGVuZXIpIHtcbiAgaWYgKCFpc0Z1bmN0aW9uKGxpc3RlbmVyKSlcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ2xpc3RlbmVyIG11c3QgYmUgYSBmdW5jdGlvbicpO1xuXG4gIHZhciBmaXJlZCA9IGZhbHNlO1xuXG4gIGZ1bmN0aW9uIGcoKSB7XG4gICAgdGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLCBnKTtcblxuICAgIGlmICghZmlyZWQpIHtcbiAgICAgIGZpcmVkID0gdHJ1ZTtcbiAgICAgIGxpc3RlbmVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfVxuICB9XG5cbiAgZy5saXN0ZW5lciA9IGxpc3RlbmVyO1xuICB0aGlzLm9uKHR5cGUsIGcpO1xuXG4gIHJldHVybiB0aGlzO1xufTtcblxuLy8gZW1pdHMgYSAncmVtb3ZlTGlzdGVuZXInIGV2ZW50IGlmZiB0aGUgbGlzdGVuZXIgd2FzIHJlbW92ZWRcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXIgPSBmdW5jdGlvbih0eXBlLCBsaXN0ZW5lcikge1xuICB2YXIgbGlzdCwgcG9zaXRpb24sIGxlbmd0aCwgaTtcblxuICBpZiAoIWlzRnVuY3Rpb24obGlzdGVuZXIpKVxuICAgIHRocm93IFR5cGVFcnJvcignbGlzdGVuZXIgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG5cbiAgaWYgKCF0aGlzLl9ldmVudHMgfHwgIXRoaXMuX2V2ZW50c1t0eXBlXSlcbiAgICByZXR1cm4gdGhpcztcblxuICBsaXN0ID0gdGhpcy5fZXZlbnRzW3R5cGVdO1xuICBsZW5ndGggPSBsaXN0Lmxlbmd0aDtcbiAgcG9zaXRpb24gPSAtMTtcblxuICBpZiAobGlzdCA9PT0gbGlzdGVuZXIgfHxcbiAgICAgIChpc0Z1bmN0aW9uKGxpc3QubGlzdGVuZXIpICYmIGxpc3QubGlzdGVuZXIgPT09IGxpc3RlbmVyKSkge1xuICAgIGRlbGV0ZSB0aGlzLl9ldmVudHNbdHlwZV07XG4gICAgaWYgKHRoaXMuX2V2ZW50cy5yZW1vdmVMaXN0ZW5lcilcbiAgICAgIHRoaXMuZW1pdCgncmVtb3ZlTGlzdGVuZXInLCB0eXBlLCBsaXN0ZW5lcik7XG5cbiAgfSBlbHNlIGlmIChpc09iamVjdChsaXN0KSkge1xuICAgIGZvciAoaSA9IGxlbmd0aDsgaS0tID4gMDspIHtcbiAgICAgIGlmIChsaXN0W2ldID09PSBsaXN0ZW5lciB8fFxuICAgICAgICAgIChsaXN0W2ldLmxpc3RlbmVyICYmIGxpc3RbaV0ubGlzdGVuZXIgPT09IGxpc3RlbmVyKSkge1xuICAgICAgICBwb3NpdGlvbiA9IGk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChwb3NpdGlvbiA8IDApXG4gICAgICByZXR1cm4gdGhpcztcblxuICAgIGlmIChsaXN0Lmxlbmd0aCA9PT0gMSkge1xuICAgICAgbGlzdC5sZW5ndGggPSAwO1xuICAgICAgZGVsZXRlIHRoaXMuX2V2ZW50c1t0eXBlXTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGlzdC5zcGxpY2UocG9zaXRpb24sIDEpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9ldmVudHMucmVtb3ZlTGlzdGVuZXIpXG4gICAgICB0aGlzLmVtaXQoJ3JlbW92ZUxpc3RlbmVyJywgdHlwZSwgbGlzdGVuZXIpO1xuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUFsbExpc3RlbmVycyA9IGZ1bmN0aW9uKHR5cGUpIHtcbiAgdmFyIGtleSwgbGlzdGVuZXJzO1xuXG4gIGlmICghdGhpcy5fZXZlbnRzKVxuICAgIHJldHVybiB0aGlzO1xuXG4gIC8vIG5vdCBsaXN0ZW5pbmcgZm9yIHJlbW92ZUxpc3RlbmVyLCBubyBuZWVkIHRvIGVtaXRcbiAgaWYgKCF0aGlzLl9ldmVudHMucmVtb3ZlTGlzdGVuZXIpIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMClcbiAgICAgIHRoaXMuX2V2ZW50cyA9IHt9O1xuICAgIGVsc2UgaWYgKHRoaXMuX2V2ZW50c1t0eXBlXSlcbiAgICAgIGRlbGV0ZSB0aGlzLl9ldmVudHNbdHlwZV07XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvLyBlbWl0IHJlbW92ZUxpc3RlbmVyIGZvciBhbGwgbGlzdGVuZXJzIG9uIGFsbCBldmVudHNcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICBmb3IgKGtleSBpbiB0aGlzLl9ldmVudHMpIHtcbiAgICAgIGlmIChrZXkgPT09ICdyZW1vdmVMaXN0ZW5lcicpIGNvbnRpbnVlO1xuICAgICAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoa2V5KTtcbiAgICB9XG4gICAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoJ3JlbW92ZUxpc3RlbmVyJyk7XG4gICAgdGhpcy5fZXZlbnRzID0ge307XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBsaXN0ZW5lcnMgPSB0aGlzLl9ldmVudHNbdHlwZV07XG5cbiAgaWYgKGlzRnVuY3Rpb24obGlzdGVuZXJzKSkge1xuICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXJzKTtcbiAgfSBlbHNlIGlmIChsaXN0ZW5lcnMpIHtcbiAgICAvLyBMSUZPIG9yZGVyXG4gICAgd2hpbGUgKGxpc3RlbmVycy5sZW5ndGgpXG4gICAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVyc1tsaXN0ZW5lcnMubGVuZ3RoIC0gMV0pO1xuICB9XG4gIGRlbGV0ZSB0aGlzLl9ldmVudHNbdHlwZV07XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVycyA9IGZ1bmN0aW9uKHR5cGUpIHtcbiAgdmFyIHJldDtcbiAgaWYgKCF0aGlzLl9ldmVudHMgfHwgIXRoaXMuX2V2ZW50c1t0eXBlXSlcbiAgICByZXQgPSBbXTtcbiAgZWxzZSBpZiAoaXNGdW5jdGlvbih0aGlzLl9ldmVudHNbdHlwZV0pKVxuICAgIHJldCA9IFt0aGlzLl9ldmVudHNbdHlwZV1dO1xuICBlbHNlXG4gICAgcmV0ID0gdGhpcy5fZXZlbnRzW3R5cGVdLnNsaWNlKCk7XG4gIHJldHVybiByZXQ7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVyQ291bnQgPSBmdW5jdGlvbih0eXBlKSB7XG4gIGlmICh0aGlzLl9ldmVudHMpIHtcbiAgICB2YXIgZXZsaXN0ZW5lciA9IHRoaXMuX2V2ZW50c1t0eXBlXTtcblxuICAgIGlmIChpc0Z1bmN0aW9uKGV2bGlzdGVuZXIpKVxuICAgICAgcmV0dXJuIDE7XG4gICAgZWxzZSBpZiAoZXZsaXN0ZW5lcilcbiAgICAgIHJldHVybiBldmxpc3RlbmVyLmxlbmd0aDtcbiAgfVxuICByZXR1cm4gMDtcbn07XG5cbkV2ZW50RW1pdHRlci5saXN0ZW5lckNvdW50ID0gZnVuY3Rpb24oZW1pdHRlciwgdHlwZSkge1xuICByZXR1cm4gZW1pdHRlci5saXN0ZW5lckNvdW50KHR5cGUpO1xufTtcblxuZnVuY3Rpb24gaXNGdW5jdGlvbihhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdmdW5jdGlvbic7XG59XG5cbmZ1bmN0aW9uIGlzTnVtYmVyKGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ251bWJlcic7XG59XG5cbmZ1bmN0aW9uIGlzT2JqZWN0KGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ29iamVjdCcgJiYgYXJnICE9PSBudWxsO1xufVxuXG5mdW5jdGlvbiBpc1VuZGVmaW5lZChhcmcpIHtcbiAgcmV0dXJuIGFyZyA9PT0gdm9pZCAwO1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvZXZlbnRzL2V2ZW50cy5qc1xuLy8gbW9kdWxlIGlkID0gMjBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvKiBlc2xpbnQgcmVhY3QvcHJvcC10eXBlczogMCAqL1xuLyogZXNsaW50IHJlYWN0L3JlcXVpcmUtZGVmYXVsdC1wcm9wczogMCAqL1xuLyogZXNsaW50IG5vLWxvbmVseS1pZjogMCAqL1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5cbmltcG9ydCBDb25zdCBmcm9tICcuL2NvbnN0JztcbmltcG9ydCBQYWdpbmF0aW9uIGZyb20gJy4vcGFnaW5hdGlvbic7XG5pbXBvcnQgeyBnZXRCeUN1cnJQYWdlLCBhbGlnblBhZ2UgfSBmcm9tICcuL3BhZ2UnO1xuaW1wb3J0IGNyZWF0ZUJhc2VDb250ZXh0IGZyb20gJy4vc3RhdGUtY29udGV4dCc7XG5cbmNvbnN0IHsgUHJvdmlkZXIgfSA9IGNyZWF0ZUJhc2VDb250ZXh0KCk7XG5cbmNvbnN0IFBhZ2luYXRpb25EYXRhQ29udGV4dCA9IFJlYWN0LmNyZWF0ZUNvbnRleHQoKTtcblxuY2xhc3MgUGFnaW5hdGlvbkRhdGFQcm92aWRlciBleHRlbmRzIFByb3ZpZGVyIHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBkYXRhOiBQcm9wVHlwZXMuYXJyYXkuaXNSZXF1aXJlZCxcbiAgICByZW1vdGVFbWl0dGVyOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG4gICAgaXNSZW1vdGVQYWdpbmF0aW9uOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkXG4gIH1cblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY2FtZWxjYXNlLCByZWFjdC9zb3J0LWNvbXBcbiAgVU5TQUZFX2NvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XG4gICAgc3VwZXIuVU5TQUZFX2NvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKTtcbiAgICBjb25zdCB7IGN1cnJTaXplUGVyUGFnZSB9ID0gdGhpcztcbiAgICBjb25zdCB7IGN1c3RvbSwgb25QYWdlQ2hhbmdlIH0gPSBuZXh0UHJvcHMucGFnaW5hdGlvbi5vcHRpb25zO1xuXG4gICAgY29uc3QgcGFnZVN0YXJ0SW5kZXggPSB0eXBlb2YgbmV4dFByb3BzLnBhZ2luYXRpb24ub3B0aW9ucy5wYWdlU3RhcnRJbmRleCAhPT0gJ3VuZGVmaW5lZCcgP1xuICAgICAgbmV4dFByb3BzLnBhZ2luYXRpb24ub3B0aW9ucy5wYWdlU3RhcnRJbmRleCA6IENvbnN0LlBBR0VfU1RBUlRfSU5ERVg7XG5cbiAgICAvLyB1c2VyIHNob3VsZCBhbGlnbiB0aGUgcGFnZSB3aGVuIHRoZSBwYWdlIGlzIG5vdCBmaXQgdG8gdGhlIGRhdGEgc2l6ZSB3aGVuIHJlbW90ZSBlbmFibGVcbiAgICBpZiAoIXRoaXMuaXNSZW1vdGVQYWdpbmF0aW9uKCkgJiYgIWN1c3RvbSkge1xuICAgICAgY29uc3QgbmV3UGFnZSA9IGFsaWduUGFnZShcbiAgICAgICAgbmV4dFByb3BzLmRhdGEubGVuZ3RoLFxuICAgICAgICB0aGlzLnByb3BzLmRhdGEubGVuZ3RoLFxuICAgICAgICB0aGlzLmN1cnJQYWdlLFxuICAgICAgICBjdXJyU2l6ZVBlclBhZ2UsXG4gICAgICAgIHBhZ2VTdGFydEluZGV4XG4gICAgICApO1xuXG4gICAgICBpZiAodGhpcy5jdXJyUGFnZSAhPT0gbmV3UGFnZSkge1xuICAgICAgICBpZiAob25QYWdlQ2hhbmdlKSB7XG4gICAgICAgICAgb25QYWdlQ2hhbmdlKG5ld1BhZ2UsIGN1cnJTaXplUGVyUGFnZSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jdXJyUGFnZSA9IG5ld1BhZ2U7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChuZXh0UHJvcHMub25EYXRhU2l6ZUNoYW5nZSAmJiBuZXh0UHJvcHMuZGF0YS5sZW5ndGggIT09IHRoaXMucHJvcHMuZGF0YS5sZW5ndGgpIHtcbiAgICAgIG5leHRQcm9wcy5vbkRhdGFTaXplQ2hhbmdlKHsgZGF0YVNpemU6IG5leHRQcm9wcy5kYXRhLmxlbmd0aCB9KTtcbiAgICB9XG4gIH1cblxuICBpc1JlbW90ZVBhZ2luYXRpb24gPSAoKSA9PiB0aGlzLnByb3BzLmlzUmVtb3RlUGFnaW5hdGlvbigpO1xuXG4gIHJlbmRlckRlZmF1bHRQYWdpbmF0aW9uID0gKCkgPT4ge1xuICAgIGlmICghdGhpcy5wcm9wcy5wYWdpbmF0aW9uLm9wdGlvbnMuY3VzdG9tKSB7XG4gICAgICBjb25zdCB7XG4gICAgICAgIHBhZ2U6IGN1cnJQYWdlLFxuICAgICAgICBzaXplUGVyUGFnZTogY3VyclNpemVQZXJQYWdlLFxuICAgICAgICBkYXRhU2l6ZSxcbiAgICAgICAgLi4ucmVzdFxuICAgICAgfSA9IHRoaXMuZ2V0UGFnaW5hdGlvblByb3BzKCk7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8UGFnaW5hdGlvblxuICAgICAgICAgIHsgLi4ucmVzdCB9XG4gICAgICAgICAga2V5PVwicGFnaW5hdGlvblwiXG4gICAgICAgICAgZGF0YVNpemU9eyBkYXRhU2l6ZSB8fCB0aGlzLnByb3BzLmRhdGEubGVuZ3RoIH1cbiAgICAgICAgICBjdXJyUGFnZT17IGN1cnJQYWdlIH1cbiAgICAgICAgICBjdXJyU2l6ZVBlclBhZ2U9eyBjdXJyU2l6ZVBlclBhZ2UgfVxuICAgICAgICAvPlxuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgbGV0IHsgZGF0YSB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB7IHBhZ2luYXRpb246IHsgb3B0aW9ucyB9IH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHsgY3VyclBhZ2UsIGN1cnJTaXplUGVyUGFnZSB9ID0gdGhpcztcbiAgICBjb25zdCBwYWdlU3RhcnRJbmRleCA9IHR5cGVvZiBvcHRpb25zLnBhZ2VTdGFydEluZGV4ID09PSAndW5kZWZpbmVkJyA/XG4gICAgICBDb25zdC5QQUdFX1NUQVJUX0lOREVYIDogb3B0aW9ucy5wYWdlU3RhcnRJbmRleDtcblxuICAgIGRhdGEgPSB0aGlzLmlzUmVtb3RlUGFnaW5hdGlvbigpID9cbiAgICAgIGRhdGEgOlxuICAgICAgZ2V0QnlDdXJyUGFnZShcbiAgICAgICAgZGF0YSxcbiAgICAgICAgY3VyclBhZ2UsXG4gICAgICAgIGN1cnJTaXplUGVyUGFnZSxcbiAgICAgICAgcGFnZVN0YXJ0SW5kZXhcbiAgICAgICk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPFBhZ2luYXRpb25EYXRhQ29udGV4dC5Qcm92aWRlciB2YWx1ZT17IHsgZGF0YSwgc2V0UmVtb3RlRW1pdHRlcjogdGhpcy5zZXRSZW1vdGVFbWl0dGVyIH0gfT5cbiAgICAgICAgeyB0aGlzLnByb3BzLmNoaWxkcmVuIH1cbiAgICAgICAgeyB0aGlzLnJlbmRlckRlZmF1bHRQYWdpbmF0aW9uKCkgfVxuICAgICAgPC9QYWdpbmF0aW9uRGF0YUNvbnRleHQuUHJvdmlkZXI+XG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCAoKSA9PiAoe1xuICBQcm92aWRlcjogUGFnaW5hdGlvbkRhdGFQcm92aWRlcixcbiAgQ29uc3VtZXI6IFBhZ2luYXRpb25EYXRhQ29udGV4dC5Db25zdW1lclxufSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9wYWNrYWdlcy9yZWFjdC1ib290c3RyYXAtdGFibGUyLXBhZ2luYXRvci9zcmMvZGF0YS1jb250ZXh0LmpzIiwiLyogZXNsaW50IHJlYWN0L3JlcXVpcmUtZGVmYXVsdC1wcm9wczogMCAqL1xuLyogZXNsaW50IGFycm93LWJvZHktc3R5bGU6IDAgKi9cbmltcG9ydCBjcyBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHBhZ2VSZXNvbHZlciBmcm9tICcuL3BhZ2UtcmVzb2x2ZXInO1xuaW1wb3J0IHBhZ2luYXRpb25IYW5kbGVyIGZyb20gJy4vcGFnaW5hdGlvbi1oYW5kbGVyJztcbmltcG9ydCB7IFNpemVQZXJQYWdlRHJvcGRvd25XaXRoQWRhcHRlciB9IGZyb20gJy4vc2l6ZS1wZXItcGFnZS1kcm9wZG93bi1hZGFwdGVyJztcbmltcG9ydCB7IFBhZ2luYXRpb25MaXN0V2l0aEFkYXB0ZXIgfSBmcm9tICcuL3BhZ2luYXRpb24tbGlzdC1hZGFwdGVyJztcbmltcG9ydCB7IFBhZ2luYXRpb25Ub3RhbFdpdGhBZGFwdGVyIH0gZnJvbSAnLi9wYWdpbmF0aW9uLXRvdGFsLWFkYXB0ZXInO1xuaW1wb3J0IENvbnN0IGZyb20gJy4vY29uc3QnO1xuXG5jbGFzcyBQYWdpbmF0aW9uIGV4dGVuZHMgcGFnZVJlc29sdmVyKENvbXBvbmVudCkge1xuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge1xuICAgICAgdGFibGVJZCxcbiAgICAgIGN1cnJQYWdlLFxuICAgICAgcGFnZVN0YXJ0SW5kZXgsXG4gICAgICBzaG93VG90YWwsXG4gICAgICBkYXRhU2l6ZSxcbiAgICAgIHBhZ2VMaXN0UmVuZGVyZXIsXG4gICAgICBwYWdlQnV0dG9uUmVuZGVyZXIsXG4gICAgICBwYWdpbmF0aW9uVG90YWxSZW5kZXJlcixcbiAgICAgIGhpZGVQYWdlTGlzdE9ubHlPbmVQYWdlLFxuICAgICAgdG90YWxQYWdlcyxcbiAgICAgIGxhc3RQYWdlLFxuICAgICAgb25QYWdlQ2hhbmdlLFxuICAgICAgc2l6ZVBlclBhZ2VMaXN0LFxuICAgICAgY3VyclNpemVQZXJQYWdlLFxuICAgICAgaGlkZVNpemVQZXJQYWdlLFxuICAgICAgc2l6ZVBlclBhZ2VSZW5kZXJlcixcbiAgICAgIHNpemVQZXJQYWdlT3B0aW9uUmVuZGVyZXIsXG4gICAgICBvblNpemVQZXJQYWdlQ2hhbmdlLFxuICAgICAgYm9vdHN0cmFwNCxcbiAgICAgIC4uLnJlc3RcbiAgICB9ID0gdGhpcy5wcm9wcztcblxuICAgIGNvbnN0IHBhZ2VzID0gdGhpcy5jYWxjdWxhdGVQYWdlU3RhdHVzKHRoaXMuY2FsY3VsYXRlUGFnZXModG90YWxQYWdlcywgbGFzdFBhZ2UpLCBsYXN0UGFnZSk7XG4gICAgY29uc3QgcGFnZUxpc3RDbGFzcyA9IGNzKFxuICAgICAgJ3JlYWN0LWJvb3RzdHJhcC10YWJsZS1wYWdpbmF0aW9uLWxpc3QnLFxuICAgICAgJ2NvbC1tZC02IGNvbC14cy02IGNvbC1zbS02IGNvbC1sZy02Jywge1xuICAgICAgICAncmVhY3QtYm9vdHN0cmFwLXRhYmxlLXBhZ2luYXRpb24tbGlzdC1oaWRkZW4nOiAoaGlkZVBhZ2VMaXN0T25seU9uZVBhZ2UgJiYgdG90YWxQYWdlcyA9PT0gMSlcbiAgICAgIH0pO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvdyByZWFjdC1ib290c3RyYXAtdGFibGUtcGFnaW5hdGlvblwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1tZC02IGNvbC14cy02IGNvbC1zbS02IGNvbC1sZy02XCI+XG4gICAgICAgICAgPFNpemVQZXJQYWdlRHJvcGRvd25XaXRoQWRhcHRlclxuICAgICAgICAgICAgYm9vdHN0cmFwND17IGJvb3RzdHJhcDQgfVxuICAgICAgICAgICAgdGFibGVJZD17IHRhYmxlSWQgfVxuICAgICAgICAgICAgc2l6ZVBlclBhZ2VMaXN0PXsgc2l6ZVBlclBhZ2VMaXN0IH1cbiAgICAgICAgICAgIGN1cnJTaXplUGVyUGFnZT17IGN1cnJTaXplUGVyUGFnZSB9XG4gICAgICAgICAgICBoaWRlU2l6ZVBlclBhZ2U9eyBoaWRlU2l6ZVBlclBhZ2UgfVxuICAgICAgICAgICAgc2l6ZVBlclBhZ2VSZW5kZXJlcj17IHNpemVQZXJQYWdlUmVuZGVyZXIgfVxuICAgICAgICAgICAgc2l6ZVBlclBhZ2VPcHRpb25SZW5kZXJlcj17IHNpemVQZXJQYWdlT3B0aW9uUmVuZGVyZXIgfVxuICAgICAgICAgICAgb25TaXplUGVyUGFnZUNoYW5nZT17IG9uU2l6ZVBlclBhZ2VDaGFuZ2UgfVxuICAgICAgICAgIC8+XG4gICAgICAgICAge1xuICAgICAgICAgICAgc2hvd1RvdGFsID9cbiAgICAgICAgICAgICAgPFBhZ2luYXRpb25Ub3RhbFdpdGhBZGFwdGVyXG4gICAgICAgICAgICAgICAgY3VyclBhZ2U9eyBjdXJyUGFnZSB9XG4gICAgICAgICAgICAgICAgY3VyclNpemVQZXJQYWdlPXsgY3VyclNpemVQZXJQYWdlIH1cbiAgICAgICAgICAgICAgICBwYWdlU3RhcnRJbmRleD17IHBhZ2VTdGFydEluZGV4IH1cbiAgICAgICAgICAgICAgICBkYXRhU2l6ZT17IGRhdGFTaXplIH1cbiAgICAgICAgICAgICAgICBwYWdpbmF0aW9uVG90YWxSZW5kZXJlcj17IHBhZ2luYXRpb25Ub3RhbFJlbmRlcmVyIH1cbiAgICAgICAgICAgICAgLz4gOiBudWxsXG4gICAgICAgICAgfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICAge1xuICAgICAgICAgIHBhZ2VMaXN0UmVuZGVyZXIgPyBwYWdlTGlzdFJlbmRlcmVyKHtcbiAgICAgICAgICAgIHBhZ2VzLFxuICAgICAgICAgICAgb25QYWdlQ2hhbmdlXG4gICAgICAgICAgfSkgOiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17IHBhZ2VMaXN0Q2xhc3MgfT5cbiAgICAgICAgICAgICAgPFBhZ2luYXRpb25MaXN0V2l0aEFkYXB0ZXJcbiAgICAgICAgICAgICAgICB7IC4uLnJlc3QgfVxuICAgICAgICAgICAgICAgIGN1cnJQYWdlPXsgY3VyclBhZ2UgfVxuICAgICAgICAgICAgICAgIGN1cnJTaXplUGVyUGFnZT17IGN1cnJTaXplUGVyUGFnZSB9XG4gICAgICAgICAgICAgICAgcGFnZVN0YXJ0SW5kZXg9eyBwYWdlU3RhcnRJbmRleCB9XG4gICAgICAgICAgICAgICAgbGFzdFBhZ2U9eyBsYXN0UGFnZSB9XG4gICAgICAgICAgICAgICAgdG90YWxQYWdlcz17IHRvdGFsUGFnZXMgfVxuICAgICAgICAgICAgICAgIHBhZ2VCdXR0b25SZW5kZXJlcj17IHBhZ2VCdXR0b25SZW5kZXJlciB9XG4gICAgICAgICAgICAgICAgb25QYWdlQ2hhbmdlPXsgb25QYWdlQ2hhbmdlIH1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIClcbiAgICAgICAgfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5QYWdpbmF0aW9uLnByb3BUeXBlcyA9IHtcbiAgZGF0YVNpemU6IFByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcbiAgc2l6ZVBlclBhZ2VMaXN0OiBQcm9wVHlwZXMuYXJyYXkuaXNSZXF1aXJlZCxcbiAgY3VyclBhZ2U6IFByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcbiAgY3VyclNpemVQZXJQYWdlOiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4gIG9uUGFnZUNoYW5nZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgb25TaXplUGVyUGFnZUNoYW5nZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgZGlzYWJsZVBhZ2VUaXRsZTogUHJvcFR5cGVzLmJvb2wsXG4gIHBhZ2VTdGFydEluZGV4OiBQcm9wVHlwZXMubnVtYmVyLFxuICBwYWdpbmF0aW9uU2l6ZTogUHJvcFR5cGVzLm51bWJlcixcbiAgc2hvd1RvdGFsOiBQcm9wVHlwZXMuYm9vbCxcbiAgcGFnZUxpc3RSZW5kZXJlcjogUHJvcFR5cGVzLmZ1bmMsXG4gIHBhZ2VCdXR0b25SZW5kZXJlcjogUHJvcFR5cGVzLmZ1bmMsXG4gIHNpemVQZXJQYWdlUmVuZGVyZXI6IFByb3BUeXBlcy5mdW5jLFxuICBwYWdpbmF0aW9uVG90YWxSZW5kZXJlcjogUHJvcFR5cGVzLmZ1bmMsXG4gIHNpemVQZXJQYWdlT3B0aW9uUmVuZGVyZXI6IFByb3BUeXBlcy5mdW5jLFxuICBmaXJzdFBhZ2VUZXh0OiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMubm9kZV0pLFxuICBwcmVQYWdlVGV4dDogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLm5vZGVdKSxcbiAgbmV4dFBhZ2VUZXh0OiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMubm9kZV0pLFxuICBsYXN0UGFnZVRleHQ6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5ub2RlXSksXG4gIG5leHRQYWdlVGl0bGU6IFByb3BUeXBlcy5zdHJpbmcsXG4gIHByZVBhZ2VUaXRsZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgZmlyc3RQYWdlVGl0bGU6IFByb3BUeXBlcy5zdHJpbmcsXG4gIGxhc3RQYWdlVGl0bGU6IFByb3BUeXBlcy5zdHJpbmcsXG4gIHdpdGhGaXJzdEFuZExhc3Q6IFByb3BUeXBlcy5ib29sLFxuICBhbHdheXNTaG93QWxsQnRuczogUHJvcFR5cGVzLmJvb2wsXG4gIGhpZGVTaXplUGVyUGFnZTogUHJvcFR5cGVzLmJvb2wsXG4gIGhpZGVQYWdlTGlzdE9ubHlPbmVQYWdlOiBQcm9wVHlwZXMuYm9vbCxcbiAgYm9vdHN0cmFwNDogUHJvcFR5cGVzLmJvb2xcbn07XG5cblBhZ2luYXRpb24uZGVmYXVsdFByb3BzID0ge1xuICBkaXNhYmxlUGFnZVRpdGxlOiBmYWxzZSxcbiAgYm9vdHN0cmFwNDogZmFsc2UsXG4gIHBhZ2VTdGFydEluZGV4OiBDb25zdC5QQUdFX1NUQVJUX0lOREVYLFxuICBwYWdpbmF0aW9uU2l6ZTogQ29uc3QuUEFHSU5BVElPTl9TSVpFLFxuICB3aXRoRmlyc3RBbmRMYXN0OiBDb25zdC5XaXRoX0ZJUlNUX0FORF9MQVNULFxuICBhbHdheXNTaG93QWxsQnRuczogQ29uc3QuU0hPV19BTExfUEFHRV9CVE5TLFxuICBzaG93VG90YWw6IENvbnN0LlNIT1dfVE9UQUwsXG4gIHBhZ2VMaXN0UmVuZGVyZXI6IG51bGwsXG4gIHBhZ2VCdXR0b25SZW5kZXJlcjogbnVsbCxcbiAgc2l6ZVBlclBhZ2VSZW5kZXJlcjogbnVsbCxcbiAgcGFnaW5hdGlvblRvdGFsUmVuZGVyZXI6IENvbnN0LlBBR0lOQVRJT05fVE9UQUwsXG4gIHNpemVQZXJQYWdlT3B0aW9uUmVuZGVyZXI6IG51bGwsXG4gIGZpcnN0UGFnZVRleHQ6IENvbnN0LkZJUlNUX1BBR0VfVEVYVCxcbiAgcHJlUGFnZVRleHQ6IENvbnN0LlBSRV9QQUdFX1RFWFQsXG4gIG5leHRQYWdlVGV4dDogQ29uc3QuTkVYVF9QQUdFX1RFWFQsXG4gIGxhc3RQYWdlVGV4dDogQ29uc3QuTEFTVF9QQUdFX1RFWFQsXG4gIHNpemVQZXJQYWdlTGlzdDogQ29uc3QuU0laRV9QRVJfUEFHRV9MSVNULFxuICBuZXh0UGFnZVRpdGxlOiBDb25zdC5ORVhUX1BBR0VfVElUTEUsXG4gIHByZVBhZ2VUaXRsZTogQ29uc3QuUFJFX1BBR0VfVElUTEUsXG4gIGZpcnN0UGFnZVRpdGxlOiBDb25zdC5GSVJTVF9QQUdFX1RJVExFLFxuICBsYXN0UGFnZVRpdGxlOiBDb25zdC5MQVNUX1BBR0VfVElUTEUsXG4gIGhpZGVTaXplUGVyUGFnZTogQ29uc3QuSElERV9TSVpFX1BFUl9QQUdFLFxuICBoaWRlUGFnZUxpc3RPbmx5T25lUGFnZTogQ29uc3QuSElERV9QQUdFX0xJU1RfT05MWV9PTkVfUEFHRVxufTtcblxuZXhwb3J0IGRlZmF1bHQgcGFnaW5hdGlvbkhhbmRsZXIoUGFnaW5hdGlvbik7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9wYWNrYWdlcy9yZWFjdC1ib290c3RyYXAtdGFibGUyLXBhZ2luYXRvci9zcmMvcGFnaW5hdGlvbi5qcyIsIi8qIGVzbGludCBqc3gtYTExeS9ocmVmLW5vLWhhc2g6IDAgKi9cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuXG5jb25zdCBTaXplUGVyUGFnZU9wdGlvbiA9ICh7XG4gIHRleHQsXG4gIHBhZ2UsXG4gIG9uU2l6ZVBlclBhZ2VDaGFuZ2UsXG4gIGJvb3RzdHJhcDRcbn0pID0+IChib290c3RyYXA0ID8gKFxuICA8YVxuICAgIGhyZWY9XCIjXCJcbiAgICB0YWJJbmRleD1cIi0xXCJcbiAgICByb2xlPVwibWVudWl0ZW1cIlxuICAgIGNsYXNzTmFtZT1cImRyb3Bkb3duLWl0ZW1cIlxuICAgIGRhdGEtcGFnZT17IHBhZ2UgfVxuICAgIG9uTW91c2VEb3duPXsgKGUpID0+IHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIG9uU2l6ZVBlclBhZ2VDaGFuZ2UocGFnZSk7XG4gICAgfSB9XG4gID5cbiAgICB7IHRleHQgfVxuICA8L2E+XG4pIDogKFxuICA8bGlcbiAgICBrZXk9eyB0ZXh0IH1cbiAgICByb2xlPVwicHJlc2VudGF0aW9uXCJcbiAgICBjbGFzc05hbWU9XCJkcm9wZG93bi1pdGVtXCJcbiAgPlxuICAgIDxhXG4gICAgICBocmVmPVwiI1wiXG4gICAgICB0YWJJbmRleD1cIi0xXCJcbiAgICAgIHJvbGU9XCJtZW51aXRlbVwiXG4gICAgICBkYXRhLXBhZ2U9eyBwYWdlIH1cbiAgICAgIG9uTW91c2VEb3duPXsgKGUpID0+IHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBvblNpemVQZXJQYWdlQ2hhbmdlKHBhZ2UpO1xuICAgICAgfSB9XG4gICAgPlxuICAgICAgeyB0ZXh0IH1cbiAgICA8L2E+XG4gIDwvbGk+XG4pKTtcblxuU2l6ZVBlclBhZ2VPcHRpb24ucHJvcFR5cGVzID0ge1xuICB0ZXh0OiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gIHBhZ2U6IFByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcbiAgb25TaXplUGVyUGFnZUNoYW5nZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgYm9vdHN0cmFwNDogUHJvcFR5cGVzLmJvb2xcbn07XG5cblNpemVQZXJQYWdlT3B0aW9uLmRlZmF1bHRQcm9wcyA9IHtcbiAgYm9vdHN0cmFwNDogZmFsc2Vcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFNpemVQZXJQYWdlT3B0aW9uO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcGFja2FnZXMvcmVhY3QtYm9vdHN0cmFwLXRhYmxlMi1wYWdpbmF0b3Ivc3JjL3NpemUtcGVyLXBhZ2Utb3B0aW9uLmpzIiwiLyogZXNsaW50IHJlYWN0L3JlcXVpcmUtZGVmYXVsdC1wcm9wczogMCAqL1xuLyogZXNsaW50IGpzeC1hMTF5L2hyZWYtbm8taGFzaDogMCAqL1xuaW1wb3J0IGNzIGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5cbmNsYXNzIFBhZ2VCdXR0b24gZXh0ZW5kcyBDb21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLmhhbmRsZUNsaWNrID0gdGhpcy5oYW5kbGVDbGljay5iaW5kKHRoaXMpO1xuICB9XG5cbiAgaGFuZGxlQ2xpY2soZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB0aGlzLnByb3BzLm9uUGFnZUNoYW5nZSh0aGlzLnByb3BzLnBhZ2UpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIHBhZ2UsXG4gICAgICB0aXRsZSxcbiAgICAgIGFjdGl2ZSxcbiAgICAgIGRpc2FibGVkLFxuICAgICAgY2xhc3NOYW1lXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgY2xhc3NlcyA9IGNzKHtcbiAgICAgIGFjdGl2ZSxcbiAgICAgIGRpc2FibGVkLFxuICAgICAgJ3BhZ2UtaXRlbSc6IHRydWVcbiAgICB9LCBjbGFzc05hbWUpO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxsaSBjbGFzc05hbWU9eyBjbGFzc2VzIH0gdGl0bGU9eyB0aXRsZSB9PlxuICAgICAgICA8YSBocmVmPVwiI1wiIG9uQ2xpY2s9eyB0aGlzLmhhbmRsZUNsaWNrIH0gY2xhc3NOYW1lPVwicGFnZS1saW5rXCI+eyBwYWdlIH08L2E+XG4gICAgICA8L2xpPlxuICAgICk7XG4gIH1cbn1cblxuUGFnZUJ1dHRvbi5wcm9wVHlwZXMgPSB7XG4gIG9uUGFnZUNoYW5nZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgcGFnZTogUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgUHJvcFR5cGVzLm5vZGUsXG4gICAgUHJvcFR5cGVzLm51bWJlcixcbiAgICBQcm9wVHlwZXMuc3RyaW5nXG4gIF0pLmlzUmVxdWlyZWQsXG4gIGFjdGl2ZTogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgZGlzYWJsZWQ6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gIGNsYXNzTmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgdGl0bGU6IFByb3BUeXBlcy5zdHJpbmdcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFBhZ2VCdXR0b247XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9wYWNrYWdlcy9yZWFjdC1ib290c3RyYXAtdGFibGUyLXBhZ2luYXRvci9zcmMvcGFnZS1idXR0b24uanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFBhZ2luYXRpb25MaXN0IGZyb20gJy4vcGFnaW5hdGlvbi1saXN0JztcbmltcG9ydCBzdGFuZGFsb25lQWRhcHRlciBmcm9tICcuL3N0YW5kYWxvbmUtYWRhcHRlcic7XG5pbXBvcnQgUGFnaW5hdGlvbkhhbmRsZXIgZnJvbSAnLi9wYWdpbmF0aW9uLWhhbmRsZXInO1xuaW1wb3J0IHBhZ2luYXRpb25MaXN0QWRhcHRlciBmcm9tICcuL3BhZ2luYXRpb24tbGlzdC1hZGFwdGVyJztcblxuY29uc3QgUGFnaW5hdGlvbkxpc3RTdGFuZGFsb25lID0gcHJvcHMgPT4gKFxuICA8UGFnaW5hdGlvbkxpc3QgeyAuLi5wcm9wcyB9IC8+XG4pO1xuXG5leHBvcnQgZGVmYXVsdFxuc3RhbmRhbG9uZUFkYXB0ZXIoUGFnaW5hdGlvbkhhbmRsZXIocGFnaW5hdGlvbkxpc3RBZGFwdGVyKFBhZ2luYXRpb25MaXN0U3RhbmRhbG9uZSkpKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3BhY2thZ2VzL3JlYWN0LWJvb3RzdHJhcC10YWJsZTItcGFnaW5hdG9yL3NyYy9wYWdpbmF0aW9uLWxpc3Qtc3RhbmRhbG9uZS5qcyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgU2l6ZVBlclBhZ2VEcm9wZG93biBmcm9tICcuL3NpemUtcGVyLXBhZ2UtZHJvcGRvd24nO1xuaW1wb3J0IHN0YW5kYWxvbmVBZGFwdGVyIGZyb20gJy4vc3RhbmRhbG9uZS1hZGFwdGVyJztcbmltcG9ydCBwYWdpbmF0aW9uSGFuZGxlciBmcm9tICcuL3BhZ2luYXRpb24taGFuZGxlcic7XG5pbXBvcnQgc2l6ZVBlclBhZ2VEcm9wZG93bkFkYXB0ZXIgZnJvbSAnLi9zaXplLXBlci1wYWdlLWRyb3Bkb3duLWFkYXB0ZXInO1xuXG5jb25zdCBTaXplUGVyUGFnZURyb3Bkb3duU3RhbmRhbG9uZSA9IHByb3BzID0+IChcbiAgPFNpemVQZXJQYWdlRHJvcGRvd24geyAuLi5wcm9wcyB9IC8+XG4pO1xuXG5leHBvcnQgZGVmYXVsdFxuc3RhbmRhbG9uZUFkYXB0ZXIocGFnaW5hdGlvbkhhbmRsZXIoc2l6ZVBlclBhZ2VEcm9wZG93bkFkYXB0ZXIoU2l6ZVBlclBhZ2VEcm9wZG93blN0YW5kYWxvbmUpKSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9wYWNrYWdlcy9yZWFjdC1ib290c3RyYXAtdGFibGUyLXBhZ2luYXRvci9zcmMvc2l6ZS1wZXItcGFnZS1kcm9wZG93bi1zdGFuZGFsb25lLmpzIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQYWdpbmF0aW9uVG90YWwgZnJvbSAnLi9wYWdpbmF0aW9uLXRvdGFsJztcbmltcG9ydCBzdGFuZGFsb25lQWRhcHRlciBmcm9tICcuL3N0YW5kYWxvbmUtYWRhcHRlcic7XG5pbXBvcnQgcGFnaW5hdGlvblRvdGFsQWRhcHRlciBmcm9tICcuL3BhZ2luYXRpb24tdG90YWwtYWRhcHRlcic7XG5cbmNvbnN0IFBhZ2luYXRpb25Ub3RhbFN0YW5kYWxvbmUgPSBwcm9wcyA9PiAoXG4gIDxQYWdpbmF0aW9uVG90YWwgeyAuLi5wcm9wcyB9IC8+XG4pO1xuXG5leHBvcnQgZGVmYXVsdFxuc3RhbmRhbG9uZUFkYXB0ZXIocGFnaW5hdGlvblRvdGFsQWRhcHRlcihQYWdpbmF0aW9uVG90YWxTdGFuZGFsb25lKSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9wYWNrYWdlcy9yZWFjdC1ib290c3RyYXAtdGFibGUyLXBhZ2luYXRvci9zcmMvcGFnaW5hdGlvbi10b3RhbC1zdGFuZGFsb25lLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==
//# sourceMappingURL=react-bootstrap-table2-paginator.js.map