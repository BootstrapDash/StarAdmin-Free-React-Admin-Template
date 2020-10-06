(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react'), require('react-dom')) :
	typeof define === 'function' && define.amd ? define(['exports', 'react', 'react-dom'], factory) :
	(global = global || self, factory(global.ReactBeautifulDnd = {}, global.React, global.ReactDOM));
}(this, function (exports, React, reactDom) { 'use strict';

	var React__default = 'default' in React ? React['default'] : React;

	function unwrapExports (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var _global = createCommonjsModule(function (module) {
	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self
	  // eslint-disable-next-line no-new-func
	  : Function('return this')();
	if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef
	});

	var _core = createCommonjsModule(function (module) {
	var core = module.exports = { version: '2.6.5' };
	if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef
	});
	var _core_1 = _core.version;

	var _aFunction = function (it) {
	  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
	  return it;
	};

	// optional / simple context binding

	var _ctx = function (fn, that, length) {
	  _aFunction(fn);
	  if (that === undefined) return fn;
	  switch (length) {
	    case 1: return function (a) {
	      return fn.call(that, a);
	    };
	    case 2: return function (a, b) {
	      return fn.call(that, a, b);
	    };
	    case 3: return function (a, b, c) {
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function (/* ...args */) {
	    return fn.apply(that, arguments);
	  };
	};

	var _isObject = function (it) {
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

	var _anObject = function (it) {
	  if (!_isObject(it)) throw TypeError(it + ' is not an object!');
	  return it;
	};

	var _fails = function (exec) {
	  try {
	    return !!exec();
	  } catch (e) {
	    return true;
	  }
	};

	// Thank's IE8 for his funny defineProperty
	var _descriptors = !_fails(function () {
	  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
	});

	var document$1 = _global.document;
	// typeof document.createElement is 'object' in old IE
	var is = _isObject(document$1) && _isObject(document$1.createElement);
	var _domCreate = function (it) {
	  return is ? document$1.createElement(it) : {};
	};

	var _ie8DomDefine = !_descriptors && !_fails(function () {
	  return Object.defineProperty(_domCreate('div'), 'a', { get: function () { return 7; } }).a != 7;
	});

	// 7.1.1 ToPrimitive(input [, PreferredType])

	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	var _toPrimitive = function (it, S) {
	  if (!_isObject(it)) return it;
	  var fn, val;
	  if (S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
	  if (typeof (fn = it.valueOf) == 'function' && !_isObject(val = fn.call(it))) return val;
	  if (!S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
	  throw TypeError("Can't convert object to primitive value");
	};

	var dP = Object.defineProperty;

	var f = _descriptors ? Object.defineProperty : function defineProperty(O, P, Attributes) {
	  _anObject(O);
	  P = _toPrimitive(P, true);
	  _anObject(Attributes);
	  if (_ie8DomDefine) try {
	    return dP(O, P, Attributes);
	  } catch (e) { /* empty */ }
	  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};

	var _objectDp = {
		f: f
	};

	var _propertyDesc = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};

	var _hide = _descriptors ? function (object, key, value) {
	  return _objectDp.f(object, key, _propertyDesc(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

	var hasOwnProperty = {}.hasOwnProperty;
	var _has = function (it, key) {
	  return hasOwnProperty.call(it, key);
	};

	var PROTOTYPE = 'prototype';

	var $export = function (type, name, source) {
	  var IS_FORCED = type & $export.F;
	  var IS_GLOBAL = type & $export.G;
	  var IS_STATIC = type & $export.S;
	  var IS_PROTO = type & $export.P;
	  var IS_BIND = type & $export.B;
	  var IS_WRAP = type & $export.W;
	  var exports = IS_GLOBAL ? _core : _core[name] || (_core[name] = {});
	  var expProto = exports[PROTOTYPE];
	  var target = IS_GLOBAL ? _global : IS_STATIC ? _global[name] : (_global[name] || {})[PROTOTYPE];
	  var key, own, out;
	  if (IS_GLOBAL) source = name;
	  for (key in source) {
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if (own && _has(exports, key)) continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? _ctx(out, _global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function (C) {
	      var F = function (a, b, c) {
	        if (this instanceof C) {
	          switch (arguments.length) {
	            case 0: return new C();
	            case 1: return new C(a);
	            case 2: return new C(a, b);
	          } return new C(a, b, c);
	        } return C.apply(this, arguments);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? _ctx(Function.call, out) : out;
	    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
	    if (IS_PROTO) {
	      (exports.virtual || (exports.virtual = {}))[key] = out;
	      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
	      if (type & $export.R && expProto && !expProto[key]) _hide(expProto, key, out);
	    }
	  }
	};
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library`
	var _export = $export;

	var toString = {}.toString;

	var _cof = function (it) {
	  return toString.call(it).slice(8, -1);
	};

	// fallback for non-array-like ES3 and non-enumerable old V8 strings

	// eslint-disable-next-line no-prototype-builtins
	var _iobject = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
	  return _cof(it) == 'String' ? it.split('') : Object(it);
	};

	// 7.2.1 RequireObjectCoercible(argument)
	var _defined = function (it) {
	  if (it == undefined) throw TypeError("Can't call method on  " + it);
	  return it;
	};

	// to indexed object, toObject with fallback for non-array-like ES3 strings


	var _toIobject = function (it) {
	  return _iobject(_defined(it));
	};

	// 7.1.4 ToInteger
	var ceil = Math.ceil;
	var floor = Math.floor;
	var _toInteger = function (it) {
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

	// 7.1.15 ToLength

	var min = Math.min;
	var _toLength = function (it) {
	  return it > 0 ? min(_toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

	var max = Math.max;
	var min$1 = Math.min;
	var _toAbsoluteIndex = function (index, length) {
	  index = _toInteger(index);
	  return index < 0 ? max(index + length, 0) : min$1(index, length);
	};

	// false -> Array#indexOf
	// true  -> Array#includes



	var _arrayIncludes = function (IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = _toIobject($this);
	    var length = _toLength(O.length);
	    var index = _toAbsoluteIndex(fromIndex, length);
	    var value;
	    // Array#includes uses SameValueZero equality algorithm
	    // eslint-disable-next-line no-self-compare
	    if (IS_INCLUDES && el != el) while (length > index) {
	      value = O[index++];
	      // eslint-disable-next-line no-self-compare
	      if (value != value) return true;
	    // Array#indexOf ignores holes, Array#includes - not
	    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
	      if (O[index] === el) return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

	var _shared = createCommonjsModule(function (module) {
	var SHARED = '__core-js_shared__';
	var store = _global[SHARED] || (_global[SHARED] = {});

	(module.exports = function (key, value) {
	  return store[key] || (store[key] = value !== undefined ? value : {});
	})('versions', []).push({
	  version: _core.version,
	  mode: 'pure',
	  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
	});
	});

	var id = 0;
	var px = Math.random();
	var _uid = function (key) {
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

	var shared = _shared('keys');

	var _sharedKey = function (key) {
	  return shared[key] || (shared[key] = _uid(key));
	};

	var arrayIndexOf = _arrayIncludes(false);
	var IE_PROTO = _sharedKey('IE_PROTO');

	var _objectKeysInternal = function (object, names) {
	  var O = _toIobject(object);
	  var i = 0;
	  var result = [];
	  var key;
	  for (key in O) if (key != IE_PROTO) _has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while (names.length > i) if (_has(O, key = names[i++])) {
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};

	// IE 8- don't enum bug keys
	var _enumBugKeys = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)



	var _objectKeys = Object.keys || function keys(O) {
	  return _objectKeysInternal(O, _enumBugKeys);
	};

	var f$1 = Object.getOwnPropertySymbols;

	var _objectGops = {
		f: f$1
	};

	var f$2 = {}.propertyIsEnumerable;

	var _objectPie = {
		f: f$2
	};

	// 7.1.13 ToObject(argument)

	var _toObject = function (it) {
	  return Object(_defined(it));
	};

	// 19.1.2.1 Object.assign(target, source, ...)





	var $assign = Object.assign;

	// should work with symbols and should have deterministic property order (V8 bug)
	var _objectAssign = !$assign || _fails(function () {
	  var A = {};
	  var B = {};
	  // eslint-disable-next-line no-undef
	  var S = Symbol();
	  var K = 'abcdefghijklmnopqrst';
	  A[S] = 7;
	  K.split('').forEach(function (k) { B[k] = k; });
	  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
	}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
	  var T = _toObject(target);
	  var aLen = arguments.length;
	  var index = 1;
	  var getSymbols = _objectGops.f;
	  var isEnum = _objectPie.f;
	  while (aLen > index) {
	    var S = _iobject(arguments[index++]);
	    var keys = getSymbols ? _objectKeys(S).concat(getSymbols(S)) : _objectKeys(S);
	    var length = keys.length;
	    var j = 0;
	    var key;
	    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
	  } return T;
	} : $assign;

	// 19.1.3.1 Object.assign(target, source)


	_export(_export.S + _export.F, 'Object', { assign: _objectAssign });

	var assign = _core.Object.assign;

	var assign$1 = assign;

	function _extends() {
	  _extends = assign$1 || function (target) {
	    for (var i = 1; i < arguments.length; i++) {
	      var source = arguments[i];

	      for (var key in source) {
	        if (Object.prototype.hasOwnProperty.call(source, key)) {
	          target[key] = source[key];
	        }
	      }
	    }

	    return target;
	  };

	  return _extends.apply(this, arguments);
	}

	function areInputsEqual(newInputs, lastInputs) {
	  if (newInputs.length !== lastInputs.length) {
	    return false;
	  }

	  for (var i = 0; i < newInputs.length; i++) {
	    if (newInputs[i] !== lastInputs[i]) {
	      return false;
	    }
	  }

	  return true;
	}

	function useMemoOne(getResult, inputs) {
	  var initial = React.useState(function () {
	    return {
	      inputs: inputs,
	      result: getResult()
	    };
	  })[0];
	  var committed = React.useRef(initial);
	  var isInputMatch = Boolean(inputs && committed.current.inputs && areInputsEqual(inputs, committed.current.inputs));
	  var cache = isInputMatch ? committed.current : {
	    inputs: inputs,
	    result: getResult()
	  };
	  React.useEffect(function () {
	    committed.current = cache;
	  }, [cache]);
	  return cache.result;
	}
	function useCallbackOne(callback, inputs) {
	  return useMemoOne(function () {
	    return callback;
	  }, inputs);
	}
	var useMemo = useMemoOne;
	var useCallback = useCallbackOne;

	var _objectDps = _descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
	  _anObject(O);
	  var keys = _objectKeys(Properties);
	  var length = keys.length;
	  var i = 0;
	  var P;
	  while (length > i) _objectDp.f(O, P = keys[i++], Properties[P]);
	  return O;
	};

	var document$2 = _global.document;
	var _html = document$2 && document$2.documentElement;

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])



	var IE_PROTO$1 = _sharedKey('IE_PROTO');
	var Empty = function () { /* empty */ };
	var PROTOTYPE$1 = 'prototype';

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function () {
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = _domCreate('iframe');
	  var i = _enumBugKeys.length;
	  var lt = '<';
	  var gt = '>';
	  var iframeDocument;
	  iframe.style.display = 'none';
	  _html.appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while (i--) delete createDict[PROTOTYPE$1][_enumBugKeys[i]];
	  return createDict();
	};

	var _objectCreate = Object.create || function create(O, Properties) {
	  var result;
	  if (O !== null) {
	    Empty[PROTOTYPE$1] = _anObject(O);
	    result = new Empty();
	    Empty[PROTOTYPE$1] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO$1] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : _objectDps(result, Properties);
	};

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	_export(_export.S, 'Object', { create: _objectCreate });

	var $Object = _core.Object;
	var create = function create(P, D) {
	  return $Object.create(P, D);
	};

	var create$1 = create;

	function _inheritsLoose(subClass, superClass) {
	  subClass.prototype = create$1(superClass.prototype);
	  subClass.prototype.constructor = subClass;
	  subClass.__proto__ = superClass;
	}

	var spacesAndTabs = /[ \t]{2,}/g;
	var lineStartWithSpaces = /^[ \t]*/gm;

	var clean = function clean(value) {
	  return value.replace(spacesAndTabs, ' ').replace(lineStartWithSpaces, '').trim();
	};

	var getDevMessage = function getDevMessage(message) {
	  return clean("\n  %creact-beautiful-dnd\n\n  %c" + clean(message) + "\n\n  %c\uD83D\uDC77\u200D This is a development only message. It will be removed in production builds.\n");
	};

	var getFormattedMessage = function getFormattedMessage(message) {
	  return [getDevMessage(message), 'color: #00C584; font-size: 1.2em; font-weight: bold;', 'line-height: 1.5', 'color: #723874;'];
	};
	var isDisabledFlag = '__react-beautiful-dnd-disable-dev-warnings';
	var warning = function warning(message) {
	  var _console;

	  if (typeof window !== 'undefined' && window[isDisabledFlag]) {
	    return;
	  }

	  (_console = console).warn.apply(_console, getFormattedMessage(message));
	};

	function printFatalError(error) {
	  var _console;

	  (_console = console).error.apply(_console, getFormattedMessage("\n        An error has occurred while a drag is occurring.\n        Any existing drag will be cancelled.\n\n        > " + error.message + "\n        "));

	  console.error('raw', error);
	}

	function shouldRecover(error) {
	  return error.message.indexOf('Invariant failed') !== -1;
	}

	var ErrorBoundary = function (_React$Component) {
	  _inheritsLoose(ErrorBoundary, _React$Component);

	  function ErrorBoundary() {
	    var _this;

	    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
	    _this.onError = void 0;

	    _this.setOnError = function (fn) {
	      _this.onError = fn;
	    };

	    _this.onFatalError = function (error) {
	      printFatalError(error);

	      if (_this.onError) {
	        _this.onError();
	      } else {
	        warning('Could not find recovering function');
	      }

	      if (shouldRecover(error)) {
	        _this.setState({});
	      }
	    };

	    return _this;
	  }

	  var _proto = ErrorBoundary.prototype;

	  _proto.componentDidMount = function componentDidMount() {
	    window.addEventListener('error', this.onFatalError);
	  };

	  _proto.componentWillUnmount = function componentWillUnmount() {
	    window.removeEventListener('error', this.onFatalError);
	  };

	  _proto.componentDidCatch = function componentDidCatch(error) {
	    this.onFatalError(error);

	    if (!shouldRecover(error)) {
	      throw error;
	    }
	  };

	  _proto.render = function render() {
	    return this.props.children(this.setOnError);
	  };

	  return ErrorBoundary;
	}(React__default.Component);

	var prefix = 'Invariant failed';
	function invariant(condition, message) {
	  if (condition) {
	    return;
	  }

	  {
	    throw new Error(prefix + ": " + (message || ''));
	  }
	}

	function symbolObservablePonyfill(root) {
		var result;
		var Symbol = root.Symbol;

		if (typeof Symbol === 'function') {
			if (Symbol.observable) {
				result = Symbol.observable;
			} else {
				result = Symbol('observable');
				Symbol.observable = result;
			}
		} else {
			result = '@@observable';
		}

		return result;
	}

	/* global window */

	var root;

	if (typeof self !== 'undefined') {
	  root = self;
	} else if (typeof window !== 'undefined') {
	  root = window;
	} else if (typeof global !== 'undefined') {
	  root = global;
	} else if (typeof module !== 'undefined') {
	  root = module;
	} else {
	  root = Function('return this')();
	}

	var result = symbolObservablePonyfill(root);

	/**
	 * These are private action types reserved by Redux.
	 * For any unknown actions, you must return the current state.
	 * If the current state is undefined, you must return the initial state.
	 * Do not reference these action types directly in your code.
	 */
	var randomString = function randomString() {
	  return Math.random().toString(36).substring(7).split('').join('.');
	};

	var ActionTypes = {
	  INIT: "@@redux/INIT" + randomString(),
	  REPLACE: "@@redux/REPLACE" + randomString(),
	  PROBE_UNKNOWN_ACTION: function PROBE_UNKNOWN_ACTION() {
	    return "@@redux/PROBE_UNKNOWN_ACTION" + randomString();
	  }
	};

	/**
	 * @param {any} obj The object to inspect.
	 * @returns {boolean} True if the argument appears to be a plain object.
	 */
	function isPlainObject(obj) {
	  if (typeof obj !== 'object' || obj === null) return false;
	  var proto = obj;

	  while (Object.getPrototypeOf(proto) !== null) {
	    proto = Object.getPrototypeOf(proto);
	  }

	  return Object.getPrototypeOf(obj) === proto;
	}

	/**
	 * Creates a Redux store that holds the state tree.
	 * The only way to change the data in the store is to call `dispatch()` on it.
	 *
	 * There should only be a single store in your app. To specify how different
	 * parts of the state tree respond to actions, you may combine several reducers
	 * into a single reducer function by using `combineReducers`.
	 *
	 * @param {Function} reducer A function that returns the next state tree, given
	 * the current state tree and the action to handle.
	 *
	 * @param {any} [preloadedState] The initial state. You may optionally specify it
	 * to hydrate the state from the server in universal apps, or to restore a
	 * previously serialized user session.
	 * If you use `combineReducers` to produce the root reducer function, this must be
	 * an object with the same shape as `combineReducers` keys.
	 *
	 * @param {Function} [enhancer] The store enhancer. You may optionally specify it
	 * to enhance the store with third-party capabilities such as middleware,
	 * time travel, persistence, etc. The only store enhancer that ships with Redux
	 * is `applyMiddleware()`.
	 *
	 * @returns {Store} A Redux store that lets you read the state, dispatch actions
	 * and subscribe to changes.
	 */

	function createStore(reducer, preloadedState, enhancer) {
	  var _ref2;

	  if (typeof preloadedState === 'function' && typeof enhancer === 'function' || typeof enhancer === 'function' && typeof arguments[3] === 'function') {
	    throw new Error('It looks like you are passing several store enhancers to ' + 'createStore(). This is not supported. Instead, compose them ' + 'together to a single function');
	  }

	  if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
	    enhancer = preloadedState;
	    preloadedState = undefined;
	  }

	  if (typeof enhancer !== 'undefined') {
	    if (typeof enhancer !== 'function') {
	      throw new Error('Expected the enhancer to be a function.');
	    }

	    return enhancer(createStore)(reducer, preloadedState);
	  }

	  if (typeof reducer !== 'function') {
	    throw new Error('Expected the reducer to be a function.');
	  }

	  var currentReducer = reducer;
	  var currentState = preloadedState;
	  var currentListeners = [];
	  var nextListeners = currentListeners;
	  var isDispatching = false;

	  function ensureCanMutateNextListeners() {
	    if (nextListeners === currentListeners) {
	      nextListeners = currentListeners.slice();
	    }
	  }
	  /**
	   * Reads the state tree managed by the store.
	   *
	   * @returns {any} The current state tree of your application.
	   */


	  function getState() {
	    if (isDispatching) {
	      throw new Error('You may not call store.getState() while the reducer is executing. ' + 'The reducer has already received the state as an argument. ' + 'Pass it down from the top reducer instead of reading it from the store.');
	    }

	    return currentState;
	  }
	  /**
	   * Adds a change listener. It will be called any time an action is dispatched,
	   * and some part of the state tree may potentially have changed. You may then
	   * call `getState()` to read the current state tree inside the callback.
	   *
	   * You may call `dispatch()` from a change listener, with the following
	   * caveats:
	   *
	   * 1. The subscriptions are snapshotted just before every `dispatch()` call.
	   * If you subscribe or unsubscribe while the listeners are being invoked, this
	   * will not have any effect on the `dispatch()` that is currently in progress.
	   * However, the next `dispatch()` call, whether nested or not, will use a more
	   * recent snapshot of the subscription list.
	   *
	   * 2. The listener should not expect to see all state changes, as the state
	   * might have been updated multiple times during a nested `dispatch()` before
	   * the listener is called. It is, however, guaranteed that all subscribers
	   * registered before the `dispatch()` started will be called with the latest
	   * state by the time it exits.
	   *
	   * @param {Function} listener A callback to be invoked on every dispatch.
	   * @returns {Function} A function to remove this change listener.
	   */


	  function subscribe(listener) {
	    if (typeof listener !== 'function') {
	      throw new Error('Expected the listener to be a function.');
	    }

	    if (isDispatching) {
	      throw new Error('You may not call store.subscribe() while the reducer is executing. ' + 'If you would like to be notified after the store has been updated, subscribe from a ' + 'component and invoke store.getState() in the callback to access the latest state. ' + 'See https://redux.js.org/api-reference/store#subscribe(listener) for more details.');
	    }

	    var isSubscribed = true;
	    ensureCanMutateNextListeners();
	    nextListeners.push(listener);
	    return function unsubscribe() {
	      if (!isSubscribed) {
	        return;
	      }

	      if (isDispatching) {
	        throw new Error('You may not unsubscribe from a store listener while the reducer is executing. ' + 'See https://redux.js.org/api-reference/store#subscribe(listener) for more details.');
	      }

	      isSubscribed = false;
	      ensureCanMutateNextListeners();
	      var index = nextListeners.indexOf(listener);
	      nextListeners.splice(index, 1);
	    };
	  }
	  /**
	   * Dispatches an action. It is the only way to trigger a state change.
	   *
	   * The `reducer` function, used to create the store, will be called with the
	   * current state tree and the given `action`. Its return value will
	   * be considered the **next** state of the tree, and the change listeners
	   * will be notified.
	   *
	   * The base implementation only supports plain object actions. If you want to
	   * dispatch a Promise, an Observable, a thunk, or something else, you need to
	   * wrap your store creating function into the corresponding middleware. For
	   * example, see the documentation for the `redux-thunk` package. Even the
	   * middleware will eventually dispatch plain object actions using this method.
	   *
	   * @param {Object} action A plain object representing “what changed”. It is
	   * a good idea to keep actions serializable so you can record and replay user
	   * sessions, or use the time travelling `redux-devtools`. An action must have
	   * a `type` property which may not be `undefined`. It is a good idea to use
	   * string constants for action types.
	   *
	   * @returns {Object} For convenience, the same action object you dispatched.
	   *
	   * Note that, if you use a custom middleware, it may wrap `dispatch()` to
	   * return something else (for example, a Promise you can await).
	   */


	  function dispatch(action) {
	    if (!isPlainObject(action)) {
	      throw new Error('Actions must be plain objects. ' + 'Use custom middleware for async actions.');
	    }

	    if (typeof action.type === 'undefined') {
	      throw new Error('Actions may not have an undefined "type" property. ' + 'Have you misspelled a constant?');
	    }

	    if (isDispatching) {
	      throw new Error('Reducers may not dispatch actions.');
	    }

	    try {
	      isDispatching = true;
	      currentState = currentReducer(currentState, action);
	    } finally {
	      isDispatching = false;
	    }

	    var listeners = currentListeners = nextListeners;

	    for (var i = 0; i < listeners.length; i++) {
	      var listener = listeners[i];
	      listener();
	    }

	    return action;
	  }
	  /**
	   * Replaces the reducer currently used by the store to calculate the state.
	   *
	   * You might need this if your app implements code splitting and you want to
	   * load some of the reducers dynamically. You might also need this if you
	   * implement a hot reloading mechanism for Redux.
	   *
	   * @param {Function} nextReducer The reducer for the store to use instead.
	   * @returns {void}
	   */


	  function replaceReducer(nextReducer) {
	    if (typeof nextReducer !== 'function') {
	      throw new Error('Expected the nextReducer to be a function.');
	    }

	    currentReducer = nextReducer;
	    dispatch({
	      type: ActionTypes.REPLACE
	    });
	  }
	  /**
	   * Interoperability point for observable/reactive libraries.
	   * @returns {observable} A minimal observable of state changes.
	   * For more information, see the observable proposal:
	   * https://github.com/tc39/proposal-observable
	   */


	  function observable() {
	    var _ref;

	    var outerSubscribe = subscribe;
	    return _ref = {
	      /**
	       * The minimal observable subscription method.
	       * @param {Object} observer Any object that can be used as an observer.
	       * The observer object should have a `next` method.
	       * @returns {subscription} An object with an `unsubscribe` method that can
	       * be used to unsubscribe the observable from the store, and prevent further
	       * emission of values from the observable.
	       */
	      subscribe: function subscribe(observer) {
	        if (typeof observer !== 'object' || observer === null) {
	          throw new TypeError('Expected the observer to be an object.');
	        }

	        function observeState() {
	          if (observer.next) {
	            observer.next(getState());
	          }
	        }

	        observeState();
	        var unsubscribe = outerSubscribe(observeState);
	        return {
	          unsubscribe: unsubscribe
	        };
	      }
	    }, _ref[result] = function () {
	      return this;
	    }, _ref;
	  } // When a store is created, an "INIT" action is dispatched so that every
	  // reducer returns their initial state. This effectively populates
	  // the initial state tree.


	  dispatch({
	    type: ActionTypes.INIT
	  });
	  return _ref2 = {
	    dispatch: dispatch,
	    subscribe: subscribe,
	    getState: getState,
	    replaceReducer: replaceReducer
	  }, _ref2[result] = observable, _ref2;
	}

	/**
	 * Prints a warning in the console if it exists.
	 *
	 * @param {String} message The warning message.
	 * @returns {void}
	 */
	function warning$1(message) {
	  /* eslint-disable no-console */
	  if (typeof console !== 'undefined' && typeof console.error === 'function') {
	    console.error(message);
	  }
	  /* eslint-enable no-console */


	  try {
	    // This error was thrown as a convenience so that if you enable
	    // "break on all exceptions" in your console,
	    // it would pause the execution at this line.
	    throw new Error(message);
	  } catch (e) {} // eslint-disable-line no-empty

	}

	function bindActionCreator(actionCreator, dispatch) {
	  return function () {
	    return dispatch(actionCreator.apply(this, arguments));
	  };
	}
	/**
	 * Turns an object whose values are action creators, into an object with the
	 * same keys, but with every function wrapped into a `dispatch` call so they
	 * may be invoked directly. This is just a convenience method, as you can call
	 * `store.dispatch(MyActionCreators.doSomething())` yourself just fine.
	 *
	 * For convenience, you can also pass a single function as the first argument,
	 * and get a function in return.
	 *
	 * @param {Function|Object} actionCreators An object whose values are action
	 * creator functions. One handy way to obtain it is to use ES6 `import * as`
	 * syntax. You may also pass a single function.
	 *
	 * @param {Function} dispatch The `dispatch` function available on your Redux
	 * store.
	 *
	 * @returns {Function|Object} The object mimicking the original object, but with
	 * every action creator wrapped into the `dispatch` call. If you passed a
	 * function as `actionCreators`, the return value will also be a single
	 * function.
	 */


	function bindActionCreators(actionCreators, dispatch) {
	  if (typeof actionCreators === 'function') {
	    return bindActionCreator(actionCreators, dispatch);
	  }

	  if (typeof actionCreators !== 'object' || actionCreators === null) {
	    throw new Error("bindActionCreators expected an object or a function, instead received " + (actionCreators === null ? 'null' : typeof actionCreators) + ". " + "Did you write \"import ActionCreators from\" instead of \"import * as ActionCreators from\"?");
	  }

	  var keys = Object.keys(actionCreators);
	  var boundActionCreators = {};

	  for (var i = 0; i < keys.length; i++) {
	    var key = keys[i];
	    var actionCreator = actionCreators[key];

	    if (typeof actionCreator === 'function') {
	      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
	    }
	  }

	  return boundActionCreators;
	}

	function _defineProperty(obj, key, value) {
	  if (key in obj) {
	    Object.defineProperty(obj, key, {
	      value: value,
	      enumerable: true,
	      configurable: true,
	      writable: true
	    });
	  } else {
	    obj[key] = value;
	  }

	  return obj;
	}

	function _objectSpread(target) {
	  for (var i = 1; i < arguments.length; i++) {
	    var source = arguments[i] != null ? arguments[i] : {};
	    var ownKeys = Object.keys(source);

	    if (typeof Object.getOwnPropertySymbols === 'function') {
	      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
	        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
	      }));
	    }

	    ownKeys.forEach(function (key) {
	      _defineProperty(target, key, source[key]);
	    });
	  }

	  return target;
	}

	/**
	 * Composes single-argument functions from right to left. The rightmost
	 * function can take multiple arguments as it provides the signature for
	 * the resulting composite function.
	 *
	 * @param {...Function} funcs The functions to compose.
	 * @returns {Function} A function obtained by composing the argument functions
	 * from right to left. For example, compose(f, g, h) is identical to doing
	 * (...args) => f(g(h(...args))).
	 */
	function compose() {
	  for (var _len = arguments.length, funcs = new Array(_len), _key = 0; _key < _len; _key++) {
	    funcs[_key] = arguments[_key];
	  }

	  if (funcs.length === 0) {
	    return function (arg) {
	      return arg;
	    };
	  }

	  if (funcs.length === 1) {
	    return funcs[0];
	  }

	  return funcs.reduce(function (a, b) {
	    return function () {
	      return a(b.apply(void 0, arguments));
	    };
	  });
	}

	/**
	 * Creates a store enhancer that applies middleware to the dispatch method
	 * of the Redux store. This is handy for a variety of tasks, such as expressing
	 * asynchronous actions in a concise manner, or logging every action payload.
	 *
	 * See `redux-thunk` package as an example of the Redux middleware.
	 *
	 * Because middleware is potentially asynchronous, this should be the first
	 * store enhancer in the composition chain.
	 *
	 * Note that each middleware will be given the `dispatch` and `getState` functions
	 * as named arguments.
	 *
	 * @param {...Function} middlewares The middleware chain to be applied.
	 * @returns {Function} A store enhancer applying the middleware.
	 */

	function applyMiddleware() {
	  for (var _len = arguments.length, middlewares = new Array(_len), _key = 0; _key < _len; _key++) {
	    middlewares[_key] = arguments[_key];
	  }

	  return function (createStore) {
	    return function () {
	      var store = createStore.apply(void 0, arguments);

	      var _dispatch = function dispatch() {
	        throw new Error("Dispatching while constructing your middleware is not allowed. " + "Other middleware would not be applied to this dispatch.");
	      };

	      var middlewareAPI = {
	        getState: store.getState,
	        dispatch: function dispatch() {
	          return _dispatch.apply(void 0, arguments);
	        }
	      };
	      var chain = middlewares.map(function (middleware) {
	        return middleware(middlewareAPI);
	      });
	      _dispatch = compose.apply(void 0, chain)(store.dispatch);
	      return _objectSpread({}, store, {
	        dispatch: _dispatch
	      });
	    };
	  };
	}

	/*
	 * This is a dummy function to check if the function name has been altered by minification.
	 * If the function has been minified and NODE_ENV !== 'production', warn the user.
	 */

	function isCrushed() {}

	if (typeof isCrushed.name === 'string' && isCrushed.name !== 'isCrushed') {
	  warning$1('You are currently using minified code outside of NODE_ENV === "production". ' + 'This means that you are running a slower development build of Redux. ' + 'You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify ' + 'or setting mode to production in webpack (https://webpack.js.org/concepts/mode/) ' + 'to ensure you have the correct code for your production build.');
	}

	function _assertThisInitialized(self) {
	  if (self === void 0) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }

	  return self;
	}

	function _inheritsLoose$1(subClass, superClass) {
	  subClass.prototype = Object.create(superClass.prototype);
	  subClass.prototype.constructor = subClass;
	  subClass.__proto__ = superClass;
	}

	var reactIs_production_min = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports,"__esModule",{value:!0});
	var b="function"===typeof Symbol&&Symbol.for,c=b?Symbol.for("react.element"):60103,d=b?Symbol.for("react.portal"):60106,e=b?Symbol.for("react.fragment"):60107,f=b?Symbol.for("react.strict_mode"):60108,g=b?Symbol.for("react.profiler"):60114,h=b?Symbol.for("react.provider"):60109,k=b?Symbol.for("react.context"):60110,l=b?Symbol.for("react.async_mode"):60111,m=b?Symbol.for("react.concurrent_mode"):60111,n=b?Symbol.for("react.forward_ref"):60112,p=b?Symbol.for("react.suspense"):60113,q=b?Symbol.for("react.memo"):
	60115,r=b?Symbol.for("react.lazy"):60116;function t(a){if("object"===typeof a&&null!==a){var u=a.$$typeof;switch(u){case c:switch(a=a.type,a){case l:case m:case e:case g:case f:case p:return a;default:switch(a=a&&a.$$typeof,a){case k:case n:case h:return a;default:return u}}case r:case q:case d:return u}}}function v(a){return t(a)===m}exports.typeOf=t;exports.AsyncMode=l;exports.ConcurrentMode=m;exports.ContextConsumer=k;exports.ContextProvider=h;exports.Element=c;exports.ForwardRef=n;
	exports.Fragment=e;exports.Lazy=r;exports.Memo=q;exports.Portal=d;exports.Profiler=g;exports.StrictMode=f;exports.Suspense=p;exports.isValidElementType=function(a){return "string"===typeof a||"function"===typeof a||a===e||a===m||a===g||a===f||a===p||"object"===typeof a&&null!==a&&(a.$$typeof===r||a.$$typeof===q||a.$$typeof===h||a.$$typeof===k||a.$$typeof===n)};exports.isAsyncMode=function(a){return v(a)||t(a)===l};exports.isConcurrentMode=v;exports.isContextConsumer=function(a){return t(a)===k};
	exports.isContextProvider=function(a){return t(a)===h};exports.isElement=function(a){return "object"===typeof a&&null!==a&&a.$$typeof===c};exports.isForwardRef=function(a){return t(a)===n};exports.isFragment=function(a){return t(a)===e};exports.isLazy=function(a){return t(a)===r};exports.isMemo=function(a){return t(a)===q};exports.isPortal=function(a){return t(a)===d};exports.isProfiler=function(a){return t(a)===g};exports.isStrictMode=function(a){return t(a)===f};
	exports.isSuspense=function(a){return t(a)===p};
	});

	unwrapExports(reactIs_production_min);
	var reactIs_production_min_1 = reactIs_production_min.typeOf;
	var reactIs_production_min_2 = reactIs_production_min.AsyncMode;
	var reactIs_production_min_3 = reactIs_production_min.ConcurrentMode;
	var reactIs_production_min_4 = reactIs_production_min.ContextConsumer;
	var reactIs_production_min_5 = reactIs_production_min.ContextProvider;
	var reactIs_production_min_6 = reactIs_production_min.Element;
	var reactIs_production_min_7 = reactIs_production_min.ForwardRef;
	var reactIs_production_min_8 = reactIs_production_min.Fragment;
	var reactIs_production_min_9 = reactIs_production_min.Lazy;
	var reactIs_production_min_10 = reactIs_production_min.Memo;
	var reactIs_production_min_11 = reactIs_production_min.Portal;
	var reactIs_production_min_12 = reactIs_production_min.Profiler;
	var reactIs_production_min_13 = reactIs_production_min.StrictMode;
	var reactIs_production_min_14 = reactIs_production_min.Suspense;
	var reactIs_production_min_15 = reactIs_production_min.isValidElementType;
	var reactIs_production_min_16 = reactIs_production_min.isAsyncMode;
	var reactIs_production_min_17 = reactIs_production_min.isConcurrentMode;
	var reactIs_production_min_18 = reactIs_production_min.isContextConsumer;
	var reactIs_production_min_19 = reactIs_production_min.isContextProvider;
	var reactIs_production_min_20 = reactIs_production_min.isElement;
	var reactIs_production_min_21 = reactIs_production_min.isForwardRef;
	var reactIs_production_min_22 = reactIs_production_min.isFragment;
	var reactIs_production_min_23 = reactIs_production_min.isLazy;
	var reactIs_production_min_24 = reactIs_production_min.isMemo;
	var reactIs_production_min_25 = reactIs_production_min.isPortal;
	var reactIs_production_min_26 = reactIs_production_min.isProfiler;
	var reactIs_production_min_27 = reactIs_production_min.isStrictMode;
	var reactIs_production_min_28 = reactIs_production_min.isSuspense;

	var reactIs_development = createCommonjsModule(function (module, exports) {



	{
	  (function() {

	Object.defineProperty(exports, '__esModule', { value: true });

	// The Symbol used to tag the ReactElement-like types. If there is no native Symbol
	// nor polyfill, then a plain number is used for performance.
	var hasSymbol = typeof Symbol === 'function' && Symbol.for;

	var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
	var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
	var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;
	var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;
	var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;
	var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;
	var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace;
	var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for('react.async_mode') : 0xeacf;
	var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for('react.concurrent_mode') : 0xeacf;
	var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
	var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for('react.suspense') : 0xead1;
	var REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;
	var REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4;

	function isValidElementType(type) {
	  return typeof type === 'string' || typeof type === 'function' ||
	  // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
	  type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || typeof type === 'object' && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE);
	}

	/**
	 * Forked from fbjs/warning:
	 * https://github.com/facebook/fbjs/blob/e66ba20ad5be433eb54423f2b097d829324d9de6/packages/fbjs/src/__forks__/warning.js
	 *
	 * Only change is we use console.warn instead of console.error,
	 * and do nothing when 'console' is not supported.
	 * This really simplifies the code.
	 * ---
	 * Similar to invariant but only logs a warning if the condition is not met.
	 * This can be used to log issues in development environments in critical
	 * paths. Removing the logging code for production environments will keep the
	 * same logic and follow the same code paths.
	 */

	var lowPriorityWarning = function () {};

	{
	  var printWarning = function (format) {
	    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	      args[_key - 1] = arguments[_key];
	    }

	    var argIndex = 0;
	    var message = 'Warning: ' + format.replace(/%s/g, function () {
	      return args[argIndex++];
	    });
	    if (typeof console !== 'undefined') {
	      console.warn(message);
	    }
	    try {
	      // --- Welcome to debugging React ---
	      // This error was thrown as a convenience so that you can use this stack
	      // to find the callsite that caused this warning to fire.
	      throw new Error(message);
	    } catch (x) {}
	  };

	  lowPriorityWarning = function (condition, format) {
	    if (format === undefined) {
	      throw new Error('`lowPriorityWarning(condition, format, ...args)` requires a warning ' + 'message argument');
	    }
	    if (!condition) {
	      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
	        args[_key2 - 2] = arguments[_key2];
	      }

	      printWarning.apply(undefined, [format].concat(args));
	    }
	  };
	}

	var lowPriorityWarning$1 = lowPriorityWarning;

	function typeOf(object) {
	  if (typeof object === 'object' && object !== null) {
	    var $$typeof = object.$$typeof;
	    switch ($$typeof) {
	      case REACT_ELEMENT_TYPE:
	        var type = object.type;

	        switch (type) {
	          case REACT_ASYNC_MODE_TYPE:
	          case REACT_CONCURRENT_MODE_TYPE:
	          case REACT_FRAGMENT_TYPE:
	          case REACT_PROFILER_TYPE:
	          case REACT_STRICT_MODE_TYPE:
	          case REACT_SUSPENSE_TYPE:
	            return type;
	          default:
	            var $$typeofType = type && type.$$typeof;

	            switch ($$typeofType) {
	              case REACT_CONTEXT_TYPE:
	              case REACT_FORWARD_REF_TYPE:
	              case REACT_PROVIDER_TYPE:
	                return $$typeofType;
	              default:
	                return $$typeof;
	            }
	        }
	      case REACT_LAZY_TYPE:
	      case REACT_MEMO_TYPE:
	      case REACT_PORTAL_TYPE:
	        return $$typeof;
	    }
	  }

	  return undefined;
	}

	// AsyncMode is deprecated along with isAsyncMode
	var AsyncMode = REACT_ASYNC_MODE_TYPE;
	var ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
	var ContextConsumer = REACT_CONTEXT_TYPE;
	var ContextProvider = REACT_PROVIDER_TYPE;
	var Element = REACT_ELEMENT_TYPE;
	var ForwardRef = REACT_FORWARD_REF_TYPE;
	var Fragment = REACT_FRAGMENT_TYPE;
	var Lazy = REACT_LAZY_TYPE;
	var Memo = REACT_MEMO_TYPE;
	var Portal = REACT_PORTAL_TYPE;
	var Profiler = REACT_PROFILER_TYPE;
	var StrictMode = REACT_STRICT_MODE_TYPE;
	var Suspense = REACT_SUSPENSE_TYPE;

	var hasWarnedAboutDeprecatedIsAsyncMode = false;

	// AsyncMode should be deprecated
	function isAsyncMode(object) {
	  {
	    if (!hasWarnedAboutDeprecatedIsAsyncMode) {
	      hasWarnedAboutDeprecatedIsAsyncMode = true;
	      lowPriorityWarning$1(false, 'The ReactIs.isAsyncMode() alias has been deprecated, ' + 'and will be removed in React 17+. Update your code to use ' + 'ReactIs.isConcurrentMode() instead. It has the exact same API.');
	    }
	  }
	  return isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;
	}
	function isConcurrentMode(object) {
	  return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
	}
	function isContextConsumer(object) {
	  return typeOf(object) === REACT_CONTEXT_TYPE;
	}
	function isContextProvider(object) {
	  return typeOf(object) === REACT_PROVIDER_TYPE;
	}
	function isElement(object) {
	  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
	}
	function isForwardRef(object) {
	  return typeOf(object) === REACT_FORWARD_REF_TYPE;
	}
	function isFragment(object) {
	  return typeOf(object) === REACT_FRAGMENT_TYPE;
	}
	function isLazy(object) {
	  return typeOf(object) === REACT_LAZY_TYPE;
	}
	function isMemo(object) {
	  return typeOf(object) === REACT_MEMO_TYPE;
	}
	function isPortal(object) {
	  return typeOf(object) === REACT_PORTAL_TYPE;
	}
	function isProfiler(object) {
	  return typeOf(object) === REACT_PROFILER_TYPE;
	}
	function isStrictMode(object) {
	  return typeOf(object) === REACT_STRICT_MODE_TYPE;
	}
	function isSuspense(object) {
	  return typeOf(object) === REACT_SUSPENSE_TYPE;
	}

	exports.typeOf = typeOf;
	exports.AsyncMode = AsyncMode;
	exports.ConcurrentMode = ConcurrentMode;
	exports.ContextConsumer = ContextConsumer;
	exports.ContextProvider = ContextProvider;
	exports.Element = Element;
	exports.ForwardRef = ForwardRef;
	exports.Fragment = Fragment;
	exports.Lazy = Lazy;
	exports.Memo = Memo;
	exports.Portal = Portal;
	exports.Profiler = Profiler;
	exports.StrictMode = StrictMode;
	exports.Suspense = Suspense;
	exports.isValidElementType = isValidElementType;
	exports.isAsyncMode = isAsyncMode;
	exports.isConcurrentMode = isConcurrentMode;
	exports.isContextConsumer = isContextConsumer;
	exports.isContextProvider = isContextProvider;
	exports.isElement = isElement;
	exports.isForwardRef = isForwardRef;
	exports.isFragment = isFragment;
	exports.isLazy = isLazy;
	exports.isMemo = isMemo;
	exports.isPortal = isPortal;
	exports.isProfiler = isProfiler;
	exports.isStrictMode = isStrictMode;
	exports.isSuspense = isSuspense;
	  })();
	}
	});

	unwrapExports(reactIs_development);
	var reactIs_development_1 = reactIs_development.typeOf;
	var reactIs_development_2 = reactIs_development.AsyncMode;
	var reactIs_development_3 = reactIs_development.ConcurrentMode;
	var reactIs_development_4 = reactIs_development.ContextConsumer;
	var reactIs_development_5 = reactIs_development.ContextProvider;
	var reactIs_development_6 = reactIs_development.Element;
	var reactIs_development_7 = reactIs_development.ForwardRef;
	var reactIs_development_8 = reactIs_development.Fragment;
	var reactIs_development_9 = reactIs_development.Lazy;
	var reactIs_development_10 = reactIs_development.Memo;
	var reactIs_development_11 = reactIs_development.Portal;
	var reactIs_development_12 = reactIs_development.Profiler;
	var reactIs_development_13 = reactIs_development.StrictMode;
	var reactIs_development_14 = reactIs_development.Suspense;
	var reactIs_development_15 = reactIs_development.isValidElementType;
	var reactIs_development_16 = reactIs_development.isAsyncMode;
	var reactIs_development_17 = reactIs_development.isConcurrentMode;
	var reactIs_development_18 = reactIs_development.isContextConsumer;
	var reactIs_development_19 = reactIs_development.isContextProvider;
	var reactIs_development_20 = reactIs_development.isElement;
	var reactIs_development_21 = reactIs_development.isForwardRef;
	var reactIs_development_22 = reactIs_development.isFragment;
	var reactIs_development_23 = reactIs_development.isLazy;
	var reactIs_development_24 = reactIs_development.isMemo;
	var reactIs_development_25 = reactIs_development.isPortal;
	var reactIs_development_26 = reactIs_development.isProfiler;
	var reactIs_development_27 = reactIs_development.isStrictMode;
	var reactIs_development_28 = reactIs_development.isSuspense;

	var reactIs = createCommonjsModule(function (module) {

	{
	  module.exports = reactIs_development;
	}
	});

	/*
	object-assign
	(c) Sindre Sorhus
	@license MIT
	*/
	/* eslint-disable no-unused-vars */
	var getOwnPropertySymbols = Object.getOwnPropertySymbols;
	var hasOwnProperty$1 = Object.prototype.hasOwnProperty;
	var propIsEnumerable = Object.prototype.propertyIsEnumerable;

	function toObject(val) {
		if (val === null || val === undefined) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}

		return Object(val);
	}

	function shouldUseNative() {
		try {
			if (!Object.assign) {
				return false;
			}

			// Detect buggy property enumeration order in older V8 versions.

			// https://bugs.chromium.org/p/v8/issues/detail?id=4118
			var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
			test1[5] = 'de';
			if (Object.getOwnPropertyNames(test1)[0] === '5') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test2 = {};
			for (var i = 0; i < 10; i++) {
				test2['_' + String.fromCharCode(i)] = i;
			}
			var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
				return test2[n];
			});
			if (order2.join('') !== '0123456789') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test3 = {};
			'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
				test3[letter] = letter;
			});
			if (Object.keys(Object.assign({}, test3)).join('') !==
					'abcdefghijklmnopqrst') {
				return false;
			}

			return true;
		} catch (err) {
			// We don't expect any of the above to throw, but better to be safe.
			return false;
		}
	}

	var objectAssign = shouldUseNative() ? Object.assign : function (target, source) {
		var from;
		var to = toObject(target);
		var symbols;

		for (var s = 1; s < arguments.length; s++) {
			from = Object(arguments[s]);

			for (var key in from) {
				if (hasOwnProperty$1.call(from, key)) {
					to[key] = from[key];
				}
			}

			if (getOwnPropertySymbols) {
				symbols = getOwnPropertySymbols(from);
				for (var i = 0; i < symbols.length; i++) {
					if (propIsEnumerable.call(from, symbols[i])) {
						to[symbols[i]] = from[symbols[i]];
					}
				}
			}
		}

		return to;
	};

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

	var ReactPropTypesSecret_1 = ReactPropTypesSecret;

	var printWarning = function() {};

	{
	  var ReactPropTypesSecret$1 = ReactPropTypesSecret_1;
	  var loggedTypeFailures = {};
	  var has = Function.call.bind(Object.prototype.hasOwnProperty);

	  printWarning = function(text) {
	    var message = 'Warning: ' + text;
	    if (typeof console !== 'undefined') {
	      console.error(message);
	    }
	    try {
	      // --- Welcome to debugging React ---
	      // This error was thrown as a convenience so that you can use this stack
	      // to find the callsite that caused this warning to fire.
	      throw new Error(message);
	    } catch (x) {}
	  };
	}

	/**
	 * Assert that the values match with the type specs.
	 * Error messages are memorized and will only be shown once.
	 *
	 * @param {object} typeSpecs Map of name to a ReactPropType
	 * @param {object} values Runtime values that need to be type-checked
	 * @param {string} location e.g. "prop", "context", "child context"
	 * @param {string} componentName Name of the component for error messages.
	 * @param {?Function} getStack Returns the component stack.
	 * @private
	 */
	function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
	  {
	    for (var typeSpecName in typeSpecs) {
	      if (has(typeSpecs, typeSpecName)) {
	        var error;
	        // Prop type validation may throw. In case they do, we don't want to
	        // fail the render phase where it didn't fail before. So we log it.
	        // After these have been cleaned up, we'll let them throw.
	        try {
	          // This is intentionally an invariant that gets caught. It's the same
	          // behavior as without this statement except with a better message.
	          if (typeof typeSpecs[typeSpecName] !== 'function') {
	            var err = Error(
	              (componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' +
	              'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.'
	            );
	            err.name = 'Invariant Violation';
	            throw err;
	          }
	          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret$1);
	        } catch (ex) {
	          error = ex;
	        }
	        if (error && !(error instanceof Error)) {
	          printWarning(
	            (componentName || 'React class') + ': type specification of ' +
	            location + ' `' + typeSpecName + '` is invalid; the type checker ' +
	            'function must return `null` or an `Error` but returned a ' + typeof error + '. ' +
	            'You may have forgotten to pass an argument to the type checker ' +
	            'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' +
	            'shape all require an argument).'
	          );
	        }
	        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
	          // Only monitor this failure once because there tends to be a lot of the
	          // same error.
	          loggedTypeFailures[error.message] = true;

	          var stack = getStack ? getStack() : '';

	          printWarning(
	            'Failed ' + location + ' type: ' + error.message + (stack != null ? stack : '')
	          );
	        }
	      }
	    }
	  }
	}

	/**
	 * Resets warning cache when testing.
	 *
	 * @private
	 */
	checkPropTypes.resetWarningCache = function() {
	  {
	    loggedTypeFailures = {};
	  }
	};

	var checkPropTypes_1 = checkPropTypes;

	var has$1 = Function.call.bind(Object.prototype.hasOwnProperty);
	var printWarning$1 = function() {};

	{
	  printWarning$1 = function(text) {
	    var message = 'Warning: ' + text;
	    if (typeof console !== 'undefined') {
	      console.error(message);
	    }
	    try {
	      // --- Welcome to debugging React ---
	      // This error was thrown as a convenience so that you can use this stack
	      // to find the callsite that caused this warning to fire.
	      throw new Error(message);
	    } catch (x) {}
	  };
	}

	function emptyFunctionThatReturnsNull() {
	  return null;
	}

	var factoryWithTypeCheckers = function(isValidElement, throwOnDirectAccess) {
	  /* global Symbol */
	  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
	  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

	  /**
	   * Returns the iterator method function contained on the iterable object.
	   *
	   * Be sure to invoke the function with the iterable as context:
	   *
	   *     var iteratorFn = getIteratorFn(myIterable);
	   *     if (iteratorFn) {
	   *       var iterator = iteratorFn.call(myIterable);
	   *       ...
	   *     }
	   *
	   * @param {?object} maybeIterable
	   * @return {?function}
	   */
	  function getIteratorFn(maybeIterable) {
	    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
	    if (typeof iteratorFn === 'function') {
	      return iteratorFn;
	    }
	  }

	  /**
	   * Collection of methods that allow declaration and validation of props that are
	   * supplied to React components. Example usage:
	   *
	   *   var Props = require('ReactPropTypes');
	   *   var MyArticle = React.createClass({
	   *     propTypes: {
	   *       // An optional string prop named "description".
	   *       description: Props.string,
	   *
	   *       // A required enum prop named "category".
	   *       category: Props.oneOf(['News','Photos']).isRequired,
	   *
	   *       // A prop named "dialog" that requires an instance of Dialog.
	   *       dialog: Props.instanceOf(Dialog).isRequired
	   *     },
	   *     render: function() { ... }
	   *   });
	   *
	   * A more formal specification of how these methods are used:
	   *
	   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
	   *   decl := ReactPropTypes.{type}(.isRequired)?
	   *
	   * Each and every declaration produces a function with the same signature. This
	   * allows the creation of custom validation functions. For example:
	   *
	   *  var MyLink = React.createClass({
	   *    propTypes: {
	   *      // An optional string or URI prop named "href".
	   *      href: function(props, propName, componentName) {
	   *        var propValue = props[propName];
	   *        if (propValue != null && typeof propValue !== 'string' &&
	   *            !(propValue instanceof URI)) {
	   *          return new Error(
	   *            'Expected a string or an URI for ' + propName + ' in ' +
	   *            componentName
	   *          );
	   *        }
	   *      }
	   *    },
	   *    render: function() {...}
	   *  });
	   *
	   * @internal
	   */

	  var ANONYMOUS = '<<anonymous>>';

	  // Important!
	  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
	  var ReactPropTypes = {
	    array: createPrimitiveTypeChecker('array'),
	    bool: createPrimitiveTypeChecker('boolean'),
	    func: createPrimitiveTypeChecker('function'),
	    number: createPrimitiveTypeChecker('number'),
	    object: createPrimitiveTypeChecker('object'),
	    string: createPrimitiveTypeChecker('string'),
	    symbol: createPrimitiveTypeChecker('symbol'),

	    any: createAnyTypeChecker(),
	    arrayOf: createArrayOfTypeChecker,
	    element: createElementTypeChecker(),
	    elementType: createElementTypeTypeChecker(),
	    instanceOf: createInstanceTypeChecker,
	    node: createNodeChecker(),
	    objectOf: createObjectOfTypeChecker,
	    oneOf: createEnumTypeChecker,
	    oneOfType: createUnionTypeChecker,
	    shape: createShapeTypeChecker,
	    exact: createStrictShapeTypeChecker,
	  };

	  /**
	   * inlined Object.is polyfill to avoid requiring consumers ship their own
	   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
	   */
	  /*eslint-disable no-self-compare*/
	  function is(x, y) {
	    // SameValue algorithm
	    if (x === y) {
	      // Steps 1-5, 7-10
	      // Steps 6.b-6.e: +0 != -0
	      return x !== 0 || 1 / x === 1 / y;
	    } else {
	      // Step 6.a: NaN == NaN
	      return x !== x && y !== y;
	    }
	  }
	  /*eslint-enable no-self-compare*/

	  /**
	   * We use an Error-like object for backward compatibility as people may call
	   * PropTypes directly and inspect their output. However, we don't use real
	   * Errors anymore. We don't inspect their stack anyway, and creating them
	   * is prohibitively expensive if they are created too often, such as what
	   * happens in oneOfType() for any type before the one that matched.
	   */
	  function PropTypeError(message) {
	    this.message = message;
	    this.stack = '';
	  }
	  // Make `instanceof Error` still work for returned errors.
	  PropTypeError.prototype = Error.prototype;

	  function createChainableTypeChecker(validate) {
	    {
	      var manualPropTypeCallCache = {};
	      var manualPropTypeWarningCount = 0;
	    }
	    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
	      componentName = componentName || ANONYMOUS;
	      propFullName = propFullName || propName;

	      if (secret !== ReactPropTypesSecret_1) {
	        if (throwOnDirectAccess) {
	          // New behavior only for users of `prop-types` package
	          var err = new Error(
	            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
	            'Use `PropTypes.checkPropTypes()` to call them. ' +
	            'Read more at http://fb.me/use-check-prop-types'
	          );
	          err.name = 'Invariant Violation';
	          throw err;
	        } else if (typeof console !== 'undefined') {
	          // Old behavior for people using React.PropTypes
	          var cacheKey = componentName + ':' + propName;
	          if (
	            !manualPropTypeCallCache[cacheKey] &&
	            // Avoid spamming the console because they are often not actionable except for lib authors
	            manualPropTypeWarningCount < 3
	          ) {
	            printWarning$1(
	              'You are manually calling a React.PropTypes validation ' +
	              'function for the `' + propFullName + '` prop on `' + componentName  + '`. This is deprecated ' +
	              'and will throw in the standalone `prop-types` package. ' +
	              'You may be seeing this warning due to a third-party PropTypes ' +
	              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.'
	            );
	            manualPropTypeCallCache[cacheKey] = true;
	            manualPropTypeWarningCount++;
	          }
	        }
	      }
	      if (props[propName] == null) {
	        if (isRequired) {
	          if (props[propName] === null) {
	            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
	          }
	          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
	        }
	        return null;
	      } else {
	        return validate(props, propName, componentName, location, propFullName);
	      }
	    }

	    var chainedCheckType = checkType.bind(null, false);
	    chainedCheckType.isRequired = checkType.bind(null, true);

	    return chainedCheckType;
	  }

	  function createPrimitiveTypeChecker(expectedType) {
	    function validate(props, propName, componentName, location, propFullName, secret) {
	      var propValue = props[propName];
	      var propType = getPropType(propValue);
	      if (propType !== expectedType) {
	        // `propValue` being instance of, say, date/regexp, pass the 'object'
	        // check, but we can offer a more precise error message here rather than
	        // 'of type `object`'.
	        var preciseType = getPreciseType(propValue);

	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createAnyTypeChecker() {
	    return createChainableTypeChecker(emptyFunctionThatReturnsNull);
	  }

	  function createArrayOfTypeChecker(typeChecker) {
	    function validate(props, propName, componentName, location, propFullName) {
	      if (typeof typeChecker !== 'function') {
	        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
	      }
	      var propValue = props[propName];
	      if (!Array.isArray(propValue)) {
	        var propType = getPropType(propValue);
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
	      }
	      for (var i = 0; i < propValue.length; i++) {
	        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret_1);
	        if (error instanceof Error) {
	          return error;
	        }
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createElementTypeChecker() {
	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];
	      if (!isValidElement(propValue)) {
	        var propType = getPropType(propValue);
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createElementTypeTypeChecker() {
	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];
	      if (!reactIs.isValidElementType(propValue)) {
	        var propType = getPropType(propValue);
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement type.'));
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createInstanceTypeChecker(expectedClass) {
	    function validate(props, propName, componentName, location, propFullName) {
	      if (!(props[propName] instanceof expectedClass)) {
	        var expectedClassName = expectedClass.name || ANONYMOUS;
	        var actualClassName = getClassName(props[propName]);
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createEnumTypeChecker(expectedValues) {
	    if (!Array.isArray(expectedValues)) {
	      {
	        if (arguments.length > 1) {
	          printWarning$1(
	            'Invalid arguments supplied to oneOf, expected an array, got ' + arguments.length + ' arguments. ' +
	            'A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z]).'
	          );
	        } else {
	          printWarning$1('Invalid argument supplied to oneOf, expected an array.');
	        }
	      }
	      return emptyFunctionThatReturnsNull;
	    }

	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];
	      for (var i = 0; i < expectedValues.length; i++) {
	        if (is(propValue, expectedValues[i])) {
	          return null;
	        }
	      }

	      var valuesString = JSON.stringify(expectedValues, function replacer(key, value) {
	        var type = getPreciseType(value);
	        if (type === 'symbol') {
	          return String(value);
	        }
	        return value;
	      });
	      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + String(propValue) + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createObjectOfTypeChecker(typeChecker) {
	    function validate(props, propName, componentName, location, propFullName) {
	      if (typeof typeChecker !== 'function') {
	        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
	      }
	      var propValue = props[propName];
	      var propType = getPropType(propValue);
	      if (propType !== 'object') {
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
	      }
	      for (var key in propValue) {
	        if (has$1(propValue, key)) {
	          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret_1);
	          if (error instanceof Error) {
	            return error;
	          }
	        }
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createUnionTypeChecker(arrayOfTypeCheckers) {
	    if (!Array.isArray(arrayOfTypeCheckers)) {
	      printWarning$1('Invalid argument supplied to oneOfType, expected an instance of array.');
	      return emptyFunctionThatReturnsNull;
	    }

	    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
	      var checker = arrayOfTypeCheckers[i];
	      if (typeof checker !== 'function') {
	        printWarning$1(
	          'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' +
	          'received ' + getPostfixForTypeWarning(checker) + ' at index ' + i + '.'
	        );
	        return emptyFunctionThatReturnsNull;
	      }
	    }

	    function validate(props, propName, componentName, location, propFullName) {
	      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
	        var checker = arrayOfTypeCheckers[i];
	        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret_1) == null) {
	          return null;
	        }
	      }

	      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createNodeChecker() {
	    function validate(props, propName, componentName, location, propFullName) {
	      if (!isNode(props[propName])) {
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createShapeTypeChecker(shapeTypes) {
	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];
	      var propType = getPropType(propValue);
	      if (propType !== 'object') {
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
	      }
	      for (var key in shapeTypes) {
	        var checker = shapeTypes[key];
	        if (!checker) {
	          continue;
	        }
	        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret_1);
	        if (error) {
	          return error;
	        }
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createStrictShapeTypeChecker(shapeTypes) {
	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];
	      var propType = getPropType(propValue);
	      if (propType !== 'object') {
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
	      }
	      // We need to check all keys in case some are required but missing from
	      // props.
	      var allKeys = objectAssign({}, props[propName], shapeTypes);
	      for (var key in allKeys) {
	        var checker = shapeTypes[key];
	        if (!checker) {
	          return new PropTypeError(
	            'Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' +
	            '\nBad object: ' + JSON.stringify(props[propName], null, '  ') +
	            '\nValid keys: ' +  JSON.stringify(Object.keys(shapeTypes), null, '  ')
	          );
	        }
	        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret_1);
	        if (error) {
	          return error;
	        }
	      }
	      return null;
	    }

	    return createChainableTypeChecker(validate);
	  }

	  function isNode(propValue) {
	    switch (typeof propValue) {
	      case 'number':
	      case 'string':
	      case 'undefined':
	        return true;
	      case 'boolean':
	        return !propValue;
	      case 'object':
	        if (Array.isArray(propValue)) {
	          return propValue.every(isNode);
	        }
	        if (propValue === null || isValidElement(propValue)) {
	          return true;
	        }

	        var iteratorFn = getIteratorFn(propValue);
	        if (iteratorFn) {
	          var iterator = iteratorFn.call(propValue);
	          var step;
	          if (iteratorFn !== propValue.entries) {
	            while (!(step = iterator.next()).done) {
	              if (!isNode(step.value)) {
	                return false;
	              }
	            }
	          } else {
	            // Iterator will provide entry [k,v] tuples rather than values.
	            while (!(step = iterator.next()).done) {
	              var entry = step.value;
	              if (entry) {
	                if (!isNode(entry[1])) {
	                  return false;
	                }
	              }
	            }
	          }
	        } else {
	          return false;
	        }

	        return true;
	      default:
	        return false;
	    }
	  }

	  function isSymbol(propType, propValue) {
	    // Native Symbol.
	    if (propType === 'symbol') {
	      return true;
	    }

	    // falsy value can't be a Symbol
	    if (!propValue) {
	      return false;
	    }

	    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
	    if (propValue['@@toStringTag'] === 'Symbol') {
	      return true;
	    }

	    // Fallback for non-spec compliant Symbols which are polyfilled.
	    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
	      return true;
	    }

	    return false;
	  }

	  // Equivalent of `typeof` but with special handling for array and regexp.
	  function getPropType(propValue) {
	    var propType = typeof propValue;
	    if (Array.isArray(propValue)) {
	      return 'array';
	    }
	    if (propValue instanceof RegExp) {
	      // Old webkits (at least until Android 4.0) return 'function' rather than
	      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
	      // passes PropTypes.object.
	      return 'object';
	    }
	    if (isSymbol(propType, propValue)) {
	      return 'symbol';
	    }
	    return propType;
	  }

	  // This handles more types than `getPropType`. Only used for error messages.
	  // See `createPrimitiveTypeChecker`.
	  function getPreciseType(propValue) {
	    if (typeof propValue === 'undefined' || propValue === null) {
	      return '' + propValue;
	    }
	    var propType = getPropType(propValue);
	    if (propType === 'object') {
	      if (propValue instanceof Date) {
	        return 'date';
	      } else if (propValue instanceof RegExp) {
	        return 'regexp';
	      }
	    }
	    return propType;
	  }

	  // Returns a string that is postfixed to a warning about an invalid type.
	  // For example, "undefined" or "of type array"
	  function getPostfixForTypeWarning(value) {
	    var type = getPreciseType(value);
	    switch (type) {
	      case 'array':
	      case 'object':
	        return 'an ' + type;
	      case 'boolean':
	      case 'date':
	      case 'regexp':
	        return 'a ' + type;
	      default:
	        return type;
	    }
	  }

	  // Returns class name of the object, if any.
	  function getClassName(propValue) {
	    if (!propValue.constructor || !propValue.constructor.name) {
	      return ANONYMOUS;
	    }
	    return propValue.constructor.name;
	  }

	  ReactPropTypes.checkPropTypes = checkPropTypes_1;
	  ReactPropTypes.resetWarningCache = checkPropTypes_1.resetWarningCache;
	  ReactPropTypes.PropTypes = ReactPropTypes;

	  return ReactPropTypes;
	};

	var propTypes = createCommonjsModule(function (module) {
	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	{
	  var ReactIs = reactIs;

	  // By explicitly using `prop-types` you are opting into new development behavior.
	  // http://fb.me/prop-types-in-prod
	  var throwOnDirectAccess = true;
	  module.exports = factoryWithTypeCheckers(ReactIs.isElement, throwOnDirectAccess);
	}
	});

	var ReactReduxContext = React__default.createContext(null);

	// Default to a dummy "batch" implementation that just runs the callback
	function defaultNoopBatch(callback) {
	  callback();
	}

	var batch = defaultNoopBatch; // Allow injecting another batching function later

	var setBatch = function setBatch(newBatch) {
	  return batch = newBatch;
	}; // Supply a getter just to skip dealing with ESM bindings

	var getBatch = function getBatch() {
	  return batch;
	};

	// well as nesting subscriptions of descendant components, so that we can ensure the
	// ancestor components re-render before descendants

	var CLEARED = null;
	var nullListeners = {
	  notify: function notify() {}
	};

	function createListenerCollection() {
	  var batch = getBatch(); // the current/next pattern is copied from redux's createStore code.
	  // TODO: refactor+expose that code to be reusable here?

	  var current = [];
	  var next = [];
	  return {
	    clear: function clear() {
	      next = CLEARED;
	      current = CLEARED;
	    },
	    notify: function notify() {
	      var listeners = current = next;
	      batch(function () {
	        for (var i = 0; i < listeners.length; i++) {
	          listeners[i]();
	        }
	      });
	    },
	    get: function get() {
	      return next;
	    },
	    subscribe: function subscribe(listener) {
	      var isSubscribed = true;
	      if (next === current) next = current.slice();
	      next.push(listener);
	      return function unsubscribe() {
	        if (!isSubscribed || current === CLEARED) return;
	        isSubscribed = false;
	        if (next === current) next = current.slice();
	        next.splice(next.indexOf(listener), 1);
	      };
	    }
	  };
	}

	var Subscription =
	/*#__PURE__*/
	function () {
	  function Subscription(store, parentSub) {
	    this.store = store;
	    this.parentSub = parentSub;
	    this.unsubscribe = null;
	    this.listeners = nullListeners;
	    this.handleChangeWrapper = this.handleChangeWrapper.bind(this);
	  }

	  var _proto = Subscription.prototype;

	  _proto.addNestedSub = function addNestedSub(listener) {
	    this.trySubscribe();
	    return this.listeners.subscribe(listener);
	  };

	  _proto.notifyNestedSubs = function notifyNestedSubs() {
	    this.listeners.notify();
	  };

	  _proto.handleChangeWrapper = function handleChangeWrapper() {
	    if (this.onStateChange) {
	      this.onStateChange();
	    }
	  };

	  _proto.isSubscribed = function isSubscribed() {
	    return Boolean(this.unsubscribe);
	  };

	  _proto.trySubscribe = function trySubscribe() {
	    if (!this.unsubscribe) {
	      this.unsubscribe = this.parentSub ? this.parentSub.addNestedSub(this.handleChangeWrapper) : this.store.subscribe(this.handleChangeWrapper);
	      this.listeners = createListenerCollection();
	    }
	  };

	  _proto.tryUnsubscribe = function tryUnsubscribe() {
	    if (this.unsubscribe) {
	      this.unsubscribe();
	      this.unsubscribe = null;
	      this.listeners.clear();
	      this.listeners = nullListeners;
	    }
	  };

	  return Subscription;
	}();

	var Provider =
	/*#__PURE__*/
	function (_Component) {
	  _inheritsLoose$1(Provider, _Component);

	  function Provider(props) {
	    var _this;

	    _this = _Component.call(this, props) || this;
	    var store = props.store;
	    _this.notifySubscribers = _this.notifySubscribers.bind(_assertThisInitialized(_this));
	    var subscription = new Subscription(store);
	    subscription.onStateChange = _this.notifySubscribers;
	    _this.state = {
	      store: store,
	      subscription: subscription
	    };
	    _this.previousState = store.getState();
	    return _this;
	  }

	  var _proto = Provider.prototype;

	  _proto.componentDidMount = function componentDidMount() {
	    this._isMounted = true;
	    this.state.subscription.trySubscribe();

	    if (this.previousState !== this.props.store.getState()) {
	      this.state.subscription.notifyNestedSubs();
	    }
	  };

	  _proto.componentWillUnmount = function componentWillUnmount() {
	    if (this.unsubscribe) this.unsubscribe();
	    this.state.subscription.tryUnsubscribe();
	    this._isMounted = false;
	  };

	  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
	    if (this.props.store !== prevProps.store) {
	      this.state.subscription.tryUnsubscribe();
	      var subscription = new Subscription(this.props.store);
	      subscription.onStateChange = this.notifySubscribers;
	      this.setState({
	        store: this.props.store,
	        subscription: subscription
	      });
	    }
	  };

	  _proto.notifySubscribers = function notifySubscribers() {
	    this.state.subscription.notifyNestedSubs();
	  };

	  _proto.render = function render() {
	    var Context = this.props.context || ReactReduxContext;
	    return React__default.createElement(Context.Provider, {
	      value: this.state
	    }, this.props.children);
	  };

	  return Provider;
	}(React.Component);

	Provider.propTypes = {
	  store: propTypes.shape({
	    subscribe: propTypes.func.isRequired,
	    dispatch: propTypes.func.isRequired,
	    getState: propTypes.func.isRequired
	  }),
	  context: propTypes.object,
	  children: propTypes.any
	};

	function _extends$1() {
	  _extends$1 = Object.assign || function (target) {
	    for (var i = 1; i < arguments.length; i++) {
	      var source = arguments[i];

	      for (var key in source) {
	        if (Object.prototype.hasOwnProperty.call(source, key)) {
	          target[key] = source[key];
	        }
	      }
	    }

	    return target;
	  };

	  return _extends$1.apply(this, arguments);
	}

	function _objectWithoutPropertiesLoose(source, excluded) {
	  if (source == null) return {};
	  var target = {};
	  var sourceKeys = Object.keys(source);
	  var key, i;

	  for (i = 0; i < sourceKeys.length; i++) {
	    key = sourceKeys[i];
	    if (excluded.indexOf(key) >= 0) continue;
	    target[key] = source[key];
	  }

	  return target;
	}

	var reactIs_production_min$1 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports,"__esModule",{value:!0});
	var b="function"===typeof Symbol&&Symbol.for,c=b?Symbol.for("react.element"):60103,d=b?Symbol.for("react.portal"):60106,e=b?Symbol.for("react.fragment"):60107,f=b?Symbol.for("react.strict_mode"):60108,g=b?Symbol.for("react.profiler"):60114,h=b?Symbol.for("react.provider"):60109,k=b?Symbol.for("react.context"):60110,l=b?Symbol.for("react.async_mode"):60111,m=b?Symbol.for("react.concurrent_mode"):60111,n=b?Symbol.for("react.forward_ref"):60112,p=b?Symbol.for("react.suspense"):60113,q=b?Symbol.for("react.memo"):
	60115,r=b?Symbol.for("react.lazy"):60116;function t(a){if("object"===typeof a&&null!==a){var u=a.$$typeof;switch(u){case c:switch(a=a.type,a){case l:case m:case e:case g:case f:case p:return a;default:switch(a=a&&a.$$typeof,a){case k:case n:case h:return a;default:return u}}case r:case q:case d:return u}}}function v(a){return t(a)===m}exports.typeOf=t;exports.AsyncMode=l;exports.ConcurrentMode=m;exports.ContextConsumer=k;exports.ContextProvider=h;exports.Element=c;exports.ForwardRef=n;
	exports.Fragment=e;exports.Lazy=r;exports.Memo=q;exports.Portal=d;exports.Profiler=g;exports.StrictMode=f;exports.Suspense=p;exports.isValidElementType=function(a){return "string"===typeof a||"function"===typeof a||a===e||a===m||a===g||a===f||a===p||"object"===typeof a&&null!==a&&(a.$$typeof===r||a.$$typeof===q||a.$$typeof===h||a.$$typeof===k||a.$$typeof===n)};exports.isAsyncMode=function(a){return v(a)||t(a)===l};exports.isConcurrentMode=v;exports.isContextConsumer=function(a){return t(a)===k};
	exports.isContextProvider=function(a){return t(a)===h};exports.isElement=function(a){return "object"===typeof a&&null!==a&&a.$$typeof===c};exports.isForwardRef=function(a){return t(a)===n};exports.isFragment=function(a){return t(a)===e};exports.isLazy=function(a){return t(a)===r};exports.isMemo=function(a){return t(a)===q};exports.isPortal=function(a){return t(a)===d};exports.isProfiler=function(a){return t(a)===g};exports.isStrictMode=function(a){return t(a)===f};
	exports.isSuspense=function(a){return t(a)===p};
	});

	unwrapExports(reactIs_production_min$1);
	var reactIs_production_min_1$1 = reactIs_production_min$1.typeOf;
	var reactIs_production_min_2$1 = reactIs_production_min$1.AsyncMode;
	var reactIs_production_min_3$1 = reactIs_production_min$1.ConcurrentMode;
	var reactIs_production_min_4$1 = reactIs_production_min$1.ContextConsumer;
	var reactIs_production_min_5$1 = reactIs_production_min$1.ContextProvider;
	var reactIs_production_min_6$1 = reactIs_production_min$1.Element;
	var reactIs_production_min_7$1 = reactIs_production_min$1.ForwardRef;
	var reactIs_production_min_8$1 = reactIs_production_min$1.Fragment;
	var reactIs_production_min_9$1 = reactIs_production_min$1.Lazy;
	var reactIs_production_min_10$1 = reactIs_production_min$1.Memo;
	var reactIs_production_min_11$1 = reactIs_production_min$1.Portal;
	var reactIs_production_min_12$1 = reactIs_production_min$1.Profiler;
	var reactIs_production_min_13$1 = reactIs_production_min$1.StrictMode;
	var reactIs_production_min_14$1 = reactIs_production_min$1.Suspense;
	var reactIs_production_min_15$1 = reactIs_production_min$1.isValidElementType;
	var reactIs_production_min_16$1 = reactIs_production_min$1.isAsyncMode;
	var reactIs_production_min_17$1 = reactIs_production_min$1.isConcurrentMode;
	var reactIs_production_min_18$1 = reactIs_production_min$1.isContextConsumer;
	var reactIs_production_min_19$1 = reactIs_production_min$1.isContextProvider;
	var reactIs_production_min_20$1 = reactIs_production_min$1.isElement;
	var reactIs_production_min_21$1 = reactIs_production_min$1.isForwardRef;
	var reactIs_production_min_22$1 = reactIs_production_min$1.isFragment;
	var reactIs_production_min_23$1 = reactIs_production_min$1.isLazy;
	var reactIs_production_min_24$1 = reactIs_production_min$1.isMemo;
	var reactIs_production_min_25$1 = reactIs_production_min$1.isPortal;
	var reactIs_production_min_26$1 = reactIs_production_min$1.isProfiler;
	var reactIs_production_min_27$1 = reactIs_production_min$1.isStrictMode;
	var reactIs_production_min_28$1 = reactIs_production_min$1.isSuspense;

	var reactIs_development$1 = createCommonjsModule(function (module, exports) {



	{
	  (function() {

	Object.defineProperty(exports, '__esModule', { value: true });

	// The Symbol used to tag the ReactElement-like types. If there is no native Symbol
	// nor polyfill, then a plain number is used for performance.
	var hasSymbol = typeof Symbol === 'function' && Symbol.for;

	var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
	var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
	var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;
	var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;
	var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;
	var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;
	var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace;
	var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for('react.async_mode') : 0xeacf;
	var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for('react.concurrent_mode') : 0xeacf;
	var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
	var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for('react.suspense') : 0xead1;
	var REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;
	var REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4;

	function isValidElementType(type) {
	  return typeof type === 'string' || typeof type === 'function' ||
	  // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
	  type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || typeof type === 'object' && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE);
	}

	/**
	 * Forked from fbjs/warning:
	 * https://github.com/facebook/fbjs/blob/e66ba20ad5be433eb54423f2b097d829324d9de6/packages/fbjs/src/__forks__/warning.js
	 *
	 * Only change is we use console.warn instead of console.error,
	 * and do nothing when 'console' is not supported.
	 * This really simplifies the code.
	 * ---
	 * Similar to invariant but only logs a warning if the condition is not met.
	 * This can be used to log issues in development environments in critical
	 * paths. Removing the logging code for production environments will keep the
	 * same logic and follow the same code paths.
	 */

	var lowPriorityWarning = function () {};

	{
	  var printWarning = function (format) {
	    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	      args[_key - 1] = arguments[_key];
	    }

	    var argIndex = 0;
	    var message = 'Warning: ' + format.replace(/%s/g, function () {
	      return args[argIndex++];
	    });
	    if (typeof console !== 'undefined') {
	      console.warn(message);
	    }
	    try {
	      // --- Welcome to debugging React ---
	      // This error was thrown as a convenience so that you can use this stack
	      // to find the callsite that caused this warning to fire.
	      throw new Error(message);
	    } catch (x) {}
	  };

	  lowPriorityWarning = function (condition, format) {
	    if (format === undefined) {
	      throw new Error('`lowPriorityWarning(condition, format, ...args)` requires a warning ' + 'message argument');
	    }
	    if (!condition) {
	      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
	        args[_key2 - 2] = arguments[_key2];
	      }

	      printWarning.apply(undefined, [format].concat(args));
	    }
	  };
	}

	var lowPriorityWarning$1 = lowPriorityWarning;

	function typeOf(object) {
	  if (typeof object === 'object' && object !== null) {
	    var $$typeof = object.$$typeof;
	    switch ($$typeof) {
	      case REACT_ELEMENT_TYPE:
	        var type = object.type;

	        switch (type) {
	          case REACT_ASYNC_MODE_TYPE:
	          case REACT_CONCURRENT_MODE_TYPE:
	          case REACT_FRAGMENT_TYPE:
	          case REACT_PROFILER_TYPE:
	          case REACT_STRICT_MODE_TYPE:
	          case REACT_SUSPENSE_TYPE:
	            return type;
	          default:
	            var $$typeofType = type && type.$$typeof;

	            switch ($$typeofType) {
	              case REACT_CONTEXT_TYPE:
	              case REACT_FORWARD_REF_TYPE:
	              case REACT_PROVIDER_TYPE:
	                return $$typeofType;
	              default:
	                return $$typeof;
	            }
	        }
	      case REACT_LAZY_TYPE:
	      case REACT_MEMO_TYPE:
	      case REACT_PORTAL_TYPE:
	        return $$typeof;
	    }
	  }

	  return undefined;
	}

	// AsyncMode is deprecated along with isAsyncMode
	var AsyncMode = REACT_ASYNC_MODE_TYPE;
	var ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
	var ContextConsumer = REACT_CONTEXT_TYPE;
	var ContextProvider = REACT_PROVIDER_TYPE;
	var Element = REACT_ELEMENT_TYPE;
	var ForwardRef = REACT_FORWARD_REF_TYPE;
	var Fragment = REACT_FRAGMENT_TYPE;
	var Lazy = REACT_LAZY_TYPE;
	var Memo = REACT_MEMO_TYPE;
	var Portal = REACT_PORTAL_TYPE;
	var Profiler = REACT_PROFILER_TYPE;
	var StrictMode = REACT_STRICT_MODE_TYPE;
	var Suspense = REACT_SUSPENSE_TYPE;

	var hasWarnedAboutDeprecatedIsAsyncMode = false;

	// AsyncMode should be deprecated
	function isAsyncMode(object) {
	  {
	    if (!hasWarnedAboutDeprecatedIsAsyncMode) {
	      hasWarnedAboutDeprecatedIsAsyncMode = true;
	      lowPriorityWarning$1(false, 'The ReactIs.isAsyncMode() alias has been deprecated, ' + 'and will be removed in React 17+. Update your code to use ' + 'ReactIs.isConcurrentMode() instead. It has the exact same API.');
	    }
	  }
	  return isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;
	}
	function isConcurrentMode(object) {
	  return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
	}
	function isContextConsumer(object) {
	  return typeOf(object) === REACT_CONTEXT_TYPE;
	}
	function isContextProvider(object) {
	  return typeOf(object) === REACT_PROVIDER_TYPE;
	}
	function isElement(object) {
	  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
	}
	function isForwardRef(object) {
	  return typeOf(object) === REACT_FORWARD_REF_TYPE;
	}
	function isFragment(object) {
	  return typeOf(object) === REACT_FRAGMENT_TYPE;
	}
	function isLazy(object) {
	  return typeOf(object) === REACT_LAZY_TYPE;
	}
	function isMemo(object) {
	  return typeOf(object) === REACT_MEMO_TYPE;
	}
	function isPortal(object) {
	  return typeOf(object) === REACT_PORTAL_TYPE;
	}
	function isProfiler(object) {
	  return typeOf(object) === REACT_PROFILER_TYPE;
	}
	function isStrictMode(object) {
	  return typeOf(object) === REACT_STRICT_MODE_TYPE;
	}
	function isSuspense(object) {
	  return typeOf(object) === REACT_SUSPENSE_TYPE;
	}

	exports.typeOf = typeOf;
	exports.AsyncMode = AsyncMode;
	exports.ConcurrentMode = ConcurrentMode;
	exports.ContextConsumer = ContextConsumer;
	exports.ContextProvider = ContextProvider;
	exports.Element = Element;
	exports.ForwardRef = ForwardRef;
	exports.Fragment = Fragment;
	exports.Lazy = Lazy;
	exports.Memo = Memo;
	exports.Portal = Portal;
	exports.Profiler = Profiler;
	exports.StrictMode = StrictMode;
	exports.Suspense = Suspense;
	exports.isValidElementType = isValidElementType;
	exports.isAsyncMode = isAsyncMode;
	exports.isConcurrentMode = isConcurrentMode;
	exports.isContextConsumer = isContextConsumer;
	exports.isContextProvider = isContextProvider;
	exports.isElement = isElement;
	exports.isForwardRef = isForwardRef;
	exports.isFragment = isFragment;
	exports.isLazy = isLazy;
	exports.isMemo = isMemo;
	exports.isPortal = isPortal;
	exports.isProfiler = isProfiler;
	exports.isStrictMode = isStrictMode;
	exports.isSuspense = isSuspense;
	  })();
	}
	});

	unwrapExports(reactIs_development$1);
	var reactIs_development_1$1 = reactIs_development$1.typeOf;
	var reactIs_development_2$1 = reactIs_development$1.AsyncMode;
	var reactIs_development_3$1 = reactIs_development$1.ConcurrentMode;
	var reactIs_development_4$1 = reactIs_development$1.ContextConsumer;
	var reactIs_development_5$1 = reactIs_development$1.ContextProvider;
	var reactIs_development_6$1 = reactIs_development$1.Element;
	var reactIs_development_7$1 = reactIs_development$1.ForwardRef;
	var reactIs_development_8$1 = reactIs_development$1.Fragment;
	var reactIs_development_9$1 = reactIs_development$1.Lazy;
	var reactIs_development_10$1 = reactIs_development$1.Memo;
	var reactIs_development_11$1 = reactIs_development$1.Portal;
	var reactIs_development_12$1 = reactIs_development$1.Profiler;
	var reactIs_development_13$1 = reactIs_development$1.StrictMode;
	var reactIs_development_14$1 = reactIs_development$1.Suspense;
	var reactIs_development_15$1 = reactIs_development$1.isValidElementType;
	var reactIs_development_16$1 = reactIs_development$1.isAsyncMode;
	var reactIs_development_17$1 = reactIs_development$1.isConcurrentMode;
	var reactIs_development_18$1 = reactIs_development$1.isContextConsumer;
	var reactIs_development_19$1 = reactIs_development$1.isContextProvider;
	var reactIs_development_20$1 = reactIs_development$1.isElement;
	var reactIs_development_21$1 = reactIs_development$1.isForwardRef;
	var reactIs_development_22$1 = reactIs_development$1.isFragment;
	var reactIs_development_23$1 = reactIs_development$1.isLazy;
	var reactIs_development_24$1 = reactIs_development$1.isMemo;
	var reactIs_development_25$1 = reactIs_development$1.isPortal;
	var reactIs_development_26$1 = reactIs_development$1.isProfiler;
	var reactIs_development_27$1 = reactIs_development$1.isStrictMode;
	var reactIs_development_28$1 = reactIs_development$1.isSuspense;

	var reactIs$1 = createCommonjsModule(function (module) {

	{
	  module.exports = reactIs_development$1;
	}
	});

	/**
	 * Copyright 2015, Yahoo! Inc.
	 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
	 */

	var REACT_STATICS = {
	    childContextTypes: true,
	    contextType: true,
	    contextTypes: true,
	    defaultProps: true,
	    displayName: true,
	    getDefaultProps: true,
	    getDerivedStateFromError: true,
	    getDerivedStateFromProps: true,
	    mixins: true,
	    propTypes: true,
	    type: true
	};

	var KNOWN_STATICS = {
	    name: true,
	    length: true,
	    prototype: true,
	    caller: true,
	    callee: true,
	    arguments: true,
	    arity: true
	};

	var FORWARD_REF_STATICS = {
	    '$$typeof': true,
	    render: true,
	    defaultProps: true,
	    displayName: true,
	    propTypes: true
	};

	var MEMO_STATICS = {
	    '$$typeof': true,
	    compare: true,
	    defaultProps: true,
	    displayName: true,
	    propTypes: true,
	    type: true
	};

	var TYPE_STATICS = {};
	TYPE_STATICS[reactIs$1.ForwardRef] = FORWARD_REF_STATICS;

	function getStatics(component) {
	    if (reactIs$1.isMemo(component)) {
	        return MEMO_STATICS;
	    }
	    return TYPE_STATICS[component['$$typeof']] || REACT_STATICS;
	}

	var defineProperty = Object.defineProperty;
	var getOwnPropertyNames = Object.getOwnPropertyNames;
	var getOwnPropertySymbols$1 = Object.getOwnPropertySymbols;
	var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
	var getPrototypeOf = Object.getPrototypeOf;
	var objectPrototype = Object.prototype;

	function hoistNonReactStatics(targetComponent, sourceComponent, blacklist) {
	    if (typeof sourceComponent !== 'string') {
	        // don't hoist over string (html) components

	        if (objectPrototype) {
	            var inheritedComponent = getPrototypeOf(sourceComponent);
	            if (inheritedComponent && inheritedComponent !== objectPrototype) {
	                hoistNonReactStatics(targetComponent, inheritedComponent, blacklist);
	            }
	        }

	        var keys = getOwnPropertyNames(sourceComponent);

	        if (getOwnPropertySymbols$1) {
	            keys = keys.concat(getOwnPropertySymbols$1(sourceComponent));
	        }

	        var targetStatics = getStatics(targetComponent);
	        var sourceStatics = getStatics(sourceComponent);

	        for (var i = 0; i < keys.length; ++i) {
	            var key = keys[i];
	            if (!KNOWN_STATICS[key] && !(blacklist && blacklist[key]) && !(sourceStatics && sourceStatics[key]) && !(targetStatics && targetStatics[key])) {
	                var descriptor = getOwnPropertyDescriptor(sourceComponent, key);
	                try {
	                    // Avoid failures from read-only properties
	                    defineProperty(targetComponent, key, descriptor);
	                } catch (e) {}
	            }
	        }

	        return targetComponent;
	    }

	    return targetComponent;
	}

	var hoistNonReactStatics_cjs = hoistNonReactStatics;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	var invariant$1 = function(condition, format, a, b, c, d, e, f) {
	  {
	    if (format === undefined) {
	      throw new Error('invariant requires an error message argument');
	    }
	  }

	  if (!condition) {
	    var error;
	    if (format === undefined) {
	      error = new Error(
	        'Minified exception occurred; use the non-minified dev environment ' +
	        'for the full error message and additional helpful warnings.'
	      );
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error(
	        format.replace(/%s/g, function() { return args[argIndex++]; })
	      );
	      error.name = 'Invariant Violation';
	    }

	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	};

	var invariant_1 = invariant$1;

	var reactIs_production_min$2 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports,"__esModule",{value:!0});
	var b="function"===typeof Symbol&&Symbol.for,c=b?Symbol.for("react.element"):60103,d=b?Symbol.for("react.portal"):60106,e=b?Symbol.for("react.fragment"):60107,f=b?Symbol.for("react.strict_mode"):60108,g=b?Symbol.for("react.profiler"):60114,h=b?Symbol.for("react.provider"):60109,k=b?Symbol.for("react.context"):60110,l=b?Symbol.for("react.async_mode"):60111,m=b?Symbol.for("react.concurrent_mode"):60111,n=b?Symbol.for("react.forward_ref"):60112,p=b?Symbol.for("react.suspense"):60113,q=b?Symbol.for("react.memo"):
	60115,r=b?Symbol.for("react.lazy"):60116;function t(a){if("object"===typeof a&&null!==a){var u=a.$$typeof;switch(u){case c:switch(a=a.type,a){case l:case m:case e:case g:case f:case p:return a;default:switch(a=a&&a.$$typeof,a){case k:case n:case h:return a;default:return u}}case r:case q:case d:return u}}}function v(a){return t(a)===m}exports.typeOf=t;exports.AsyncMode=l;exports.ConcurrentMode=m;exports.ContextConsumer=k;exports.ContextProvider=h;exports.Element=c;exports.ForwardRef=n;
	exports.Fragment=e;exports.Lazy=r;exports.Memo=q;exports.Portal=d;exports.Profiler=g;exports.StrictMode=f;exports.Suspense=p;exports.isValidElementType=function(a){return "string"===typeof a||"function"===typeof a||a===e||a===m||a===g||a===f||a===p||"object"===typeof a&&null!==a&&(a.$$typeof===r||a.$$typeof===q||a.$$typeof===h||a.$$typeof===k||a.$$typeof===n)};exports.isAsyncMode=function(a){return v(a)||t(a)===l};exports.isConcurrentMode=v;exports.isContextConsumer=function(a){return t(a)===k};
	exports.isContextProvider=function(a){return t(a)===h};exports.isElement=function(a){return "object"===typeof a&&null!==a&&a.$$typeof===c};exports.isForwardRef=function(a){return t(a)===n};exports.isFragment=function(a){return t(a)===e};exports.isLazy=function(a){return t(a)===r};exports.isMemo=function(a){return t(a)===q};exports.isPortal=function(a){return t(a)===d};exports.isProfiler=function(a){return t(a)===g};exports.isStrictMode=function(a){return t(a)===f};
	exports.isSuspense=function(a){return t(a)===p};
	});

	unwrapExports(reactIs_production_min$2);
	var reactIs_production_min_1$2 = reactIs_production_min$2.typeOf;
	var reactIs_production_min_2$2 = reactIs_production_min$2.AsyncMode;
	var reactIs_production_min_3$2 = reactIs_production_min$2.ConcurrentMode;
	var reactIs_production_min_4$2 = reactIs_production_min$2.ContextConsumer;
	var reactIs_production_min_5$2 = reactIs_production_min$2.ContextProvider;
	var reactIs_production_min_6$2 = reactIs_production_min$2.Element;
	var reactIs_production_min_7$2 = reactIs_production_min$2.ForwardRef;
	var reactIs_production_min_8$2 = reactIs_production_min$2.Fragment;
	var reactIs_production_min_9$2 = reactIs_production_min$2.Lazy;
	var reactIs_production_min_10$2 = reactIs_production_min$2.Memo;
	var reactIs_production_min_11$2 = reactIs_production_min$2.Portal;
	var reactIs_production_min_12$2 = reactIs_production_min$2.Profiler;
	var reactIs_production_min_13$2 = reactIs_production_min$2.StrictMode;
	var reactIs_production_min_14$2 = reactIs_production_min$2.Suspense;
	var reactIs_production_min_15$2 = reactIs_production_min$2.isValidElementType;
	var reactIs_production_min_16$2 = reactIs_production_min$2.isAsyncMode;
	var reactIs_production_min_17$2 = reactIs_production_min$2.isConcurrentMode;
	var reactIs_production_min_18$2 = reactIs_production_min$2.isContextConsumer;
	var reactIs_production_min_19$2 = reactIs_production_min$2.isContextProvider;
	var reactIs_production_min_20$2 = reactIs_production_min$2.isElement;
	var reactIs_production_min_21$2 = reactIs_production_min$2.isForwardRef;
	var reactIs_production_min_22$2 = reactIs_production_min$2.isFragment;
	var reactIs_production_min_23$2 = reactIs_production_min$2.isLazy;
	var reactIs_production_min_24$2 = reactIs_production_min$2.isMemo;
	var reactIs_production_min_25$2 = reactIs_production_min$2.isPortal;
	var reactIs_production_min_26$2 = reactIs_production_min$2.isProfiler;
	var reactIs_production_min_27$2 = reactIs_production_min$2.isStrictMode;
	var reactIs_production_min_28$2 = reactIs_production_min$2.isSuspense;

	var reactIs_development$2 = createCommonjsModule(function (module, exports) {



	{
	  (function() {

	Object.defineProperty(exports, '__esModule', { value: true });

	// The Symbol used to tag the ReactElement-like types. If there is no native Symbol
	// nor polyfill, then a plain number is used for performance.
	var hasSymbol = typeof Symbol === 'function' && Symbol.for;

	var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
	var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
	var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;
	var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;
	var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;
	var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;
	var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace;
	var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for('react.async_mode') : 0xeacf;
	var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for('react.concurrent_mode') : 0xeacf;
	var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
	var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for('react.suspense') : 0xead1;
	var REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;
	var REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4;

	function isValidElementType(type) {
	  return typeof type === 'string' || typeof type === 'function' ||
	  // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
	  type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || typeof type === 'object' && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE);
	}

	/**
	 * Forked from fbjs/warning:
	 * https://github.com/facebook/fbjs/blob/e66ba20ad5be433eb54423f2b097d829324d9de6/packages/fbjs/src/__forks__/warning.js
	 *
	 * Only change is we use console.warn instead of console.error,
	 * and do nothing when 'console' is not supported.
	 * This really simplifies the code.
	 * ---
	 * Similar to invariant but only logs a warning if the condition is not met.
	 * This can be used to log issues in development environments in critical
	 * paths. Removing the logging code for production environments will keep the
	 * same logic and follow the same code paths.
	 */

	var lowPriorityWarning = function () {};

	{
	  var printWarning = function (format) {
	    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	      args[_key - 1] = arguments[_key];
	    }

	    var argIndex = 0;
	    var message = 'Warning: ' + format.replace(/%s/g, function () {
	      return args[argIndex++];
	    });
	    if (typeof console !== 'undefined') {
	      console.warn(message);
	    }
	    try {
	      // --- Welcome to debugging React ---
	      // This error was thrown as a convenience so that you can use this stack
	      // to find the callsite that caused this warning to fire.
	      throw new Error(message);
	    } catch (x) {}
	  };

	  lowPriorityWarning = function (condition, format) {
	    if (format === undefined) {
	      throw new Error('`lowPriorityWarning(condition, format, ...args)` requires a warning ' + 'message argument');
	    }
	    if (!condition) {
	      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
	        args[_key2 - 2] = arguments[_key2];
	      }

	      printWarning.apply(undefined, [format].concat(args));
	    }
	  };
	}

	var lowPriorityWarning$1 = lowPriorityWarning;

	function typeOf(object) {
	  if (typeof object === 'object' && object !== null) {
	    var $$typeof = object.$$typeof;
	    switch ($$typeof) {
	      case REACT_ELEMENT_TYPE:
	        var type = object.type;

	        switch (type) {
	          case REACT_ASYNC_MODE_TYPE:
	          case REACT_CONCURRENT_MODE_TYPE:
	          case REACT_FRAGMENT_TYPE:
	          case REACT_PROFILER_TYPE:
	          case REACT_STRICT_MODE_TYPE:
	          case REACT_SUSPENSE_TYPE:
	            return type;
	          default:
	            var $$typeofType = type && type.$$typeof;

	            switch ($$typeofType) {
	              case REACT_CONTEXT_TYPE:
	              case REACT_FORWARD_REF_TYPE:
	              case REACT_PROVIDER_TYPE:
	                return $$typeofType;
	              default:
	                return $$typeof;
	            }
	        }
	      case REACT_LAZY_TYPE:
	      case REACT_MEMO_TYPE:
	      case REACT_PORTAL_TYPE:
	        return $$typeof;
	    }
	  }

	  return undefined;
	}

	// AsyncMode is deprecated along with isAsyncMode
	var AsyncMode = REACT_ASYNC_MODE_TYPE;
	var ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
	var ContextConsumer = REACT_CONTEXT_TYPE;
	var ContextProvider = REACT_PROVIDER_TYPE;
	var Element = REACT_ELEMENT_TYPE;
	var ForwardRef = REACT_FORWARD_REF_TYPE;
	var Fragment = REACT_FRAGMENT_TYPE;
	var Lazy = REACT_LAZY_TYPE;
	var Memo = REACT_MEMO_TYPE;
	var Portal = REACT_PORTAL_TYPE;
	var Profiler = REACT_PROFILER_TYPE;
	var StrictMode = REACT_STRICT_MODE_TYPE;
	var Suspense = REACT_SUSPENSE_TYPE;

	var hasWarnedAboutDeprecatedIsAsyncMode = false;

	// AsyncMode should be deprecated
	function isAsyncMode(object) {
	  {
	    if (!hasWarnedAboutDeprecatedIsAsyncMode) {
	      hasWarnedAboutDeprecatedIsAsyncMode = true;
	      lowPriorityWarning$1(false, 'The ReactIs.isAsyncMode() alias has been deprecated, ' + 'and will be removed in React 17+. Update your code to use ' + 'ReactIs.isConcurrentMode() instead. It has the exact same API.');
	    }
	  }
	  return isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;
	}
	function isConcurrentMode(object) {
	  return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
	}
	function isContextConsumer(object) {
	  return typeOf(object) === REACT_CONTEXT_TYPE;
	}
	function isContextProvider(object) {
	  return typeOf(object) === REACT_PROVIDER_TYPE;
	}
	function isElement(object) {
	  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
	}
	function isForwardRef(object) {
	  return typeOf(object) === REACT_FORWARD_REF_TYPE;
	}
	function isFragment(object) {
	  return typeOf(object) === REACT_FRAGMENT_TYPE;
	}
	function isLazy(object) {
	  return typeOf(object) === REACT_LAZY_TYPE;
	}
	function isMemo(object) {
	  return typeOf(object) === REACT_MEMO_TYPE;
	}
	function isPortal(object) {
	  return typeOf(object) === REACT_PORTAL_TYPE;
	}
	function isProfiler(object) {
	  return typeOf(object) === REACT_PROFILER_TYPE;
	}
	function isStrictMode(object) {
	  return typeOf(object) === REACT_STRICT_MODE_TYPE;
	}
	function isSuspense(object) {
	  return typeOf(object) === REACT_SUSPENSE_TYPE;
	}

	exports.typeOf = typeOf;
	exports.AsyncMode = AsyncMode;
	exports.ConcurrentMode = ConcurrentMode;
	exports.ContextConsumer = ContextConsumer;
	exports.ContextProvider = ContextProvider;
	exports.Element = Element;
	exports.ForwardRef = ForwardRef;
	exports.Fragment = Fragment;
	exports.Lazy = Lazy;
	exports.Memo = Memo;
	exports.Portal = Portal;
	exports.Profiler = Profiler;
	exports.StrictMode = StrictMode;
	exports.Suspense = Suspense;
	exports.isValidElementType = isValidElementType;
	exports.isAsyncMode = isAsyncMode;
	exports.isConcurrentMode = isConcurrentMode;
	exports.isContextConsumer = isContextConsumer;
	exports.isContextProvider = isContextProvider;
	exports.isElement = isElement;
	exports.isForwardRef = isForwardRef;
	exports.isFragment = isFragment;
	exports.isLazy = isLazy;
	exports.isMemo = isMemo;
	exports.isPortal = isPortal;
	exports.isProfiler = isProfiler;
	exports.isStrictMode = isStrictMode;
	exports.isSuspense = isSuspense;
	  })();
	}
	});

	unwrapExports(reactIs_development$2);
	var reactIs_development_1$2 = reactIs_development$2.typeOf;
	var reactIs_development_2$2 = reactIs_development$2.AsyncMode;
	var reactIs_development_3$2 = reactIs_development$2.ConcurrentMode;
	var reactIs_development_4$2 = reactIs_development$2.ContextConsumer;
	var reactIs_development_5$2 = reactIs_development$2.ContextProvider;
	var reactIs_development_6$2 = reactIs_development$2.Element;
	var reactIs_development_7$2 = reactIs_development$2.ForwardRef;
	var reactIs_development_8$2 = reactIs_development$2.Fragment;
	var reactIs_development_9$2 = reactIs_development$2.Lazy;
	var reactIs_development_10$2 = reactIs_development$2.Memo;
	var reactIs_development_11$2 = reactIs_development$2.Portal;
	var reactIs_development_12$2 = reactIs_development$2.Profiler;
	var reactIs_development_13$2 = reactIs_development$2.StrictMode;
	var reactIs_development_14$2 = reactIs_development$2.Suspense;
	var reactIs_development_15$2 = reactIs_development$2.isValidElementType;
	var reactIs_development_16$2 = reactIs_development$2.isAsyncMode;
	var reactIs_development_17$2 = reactIs_development$2.isConcurrentMode;
	var reactIs_development_18$2 = reactIs_development$2.isContextConsumer;
	var reactIs_development_19$2 = reactIs_development$2.isContextProvider;
	var reactIs_development_20$2 = reactIs_development$2.isElement;
	var reactIs_development_21$2 = reactIs_development$2.isForwardRef;
	var reactIs_development_22$2 = reactIs_development$2.isFragment;
	var reactIs_development_23$2 = reactIs_development$2.isLazy;
	var reactIs_development_24$2 = reactIs_development$2.isMemo;
	var reactIs_development_25$2 = reactIs_development$2.isPortal;
	var reactIs_development_26$2 = reactIs_development$2.isProfiler;
	var reactIs_development_27$2 = reactIs_development$2.isStrictMode;
	var reactIs_development_28$2 = reactIs_development$2.isSuspense;

	var reactIs$2 = createCommonjsModule(function (module) {

	{
	  module.exports = reactIs_development$2;
	}
	});
	var reactIs_1 = reactIs$2.isValidElementType;
	var reactIs_2 = reactIs$2.isContextConsumer;

	var EMPTY_ARRAY = [];
	var NO_SUBSCRIPTION_ARRAY = [null, null];

	var stringifyComponent = function stringifyComponent(Comp) {
	  try {
	    return JSON.stringify(Comp);
	  } catch (err) {
	    return String(Comp);
	  }
	};

	function storeStateUpdatesReducer(state, action) {
	  var updateCount = state[1];
	  return [action.payload, updateCount + 1];
	}

	var initStateUpdates = function initStateUpdates() {
	  return [null, 0];
	}; // React currently throws a warning when using useLayoutEffect on the server.
	// To get around it, we can conditionally useEffect on the server (no-op) and
	// useLayoutEffect in the browser. We need useLayoutEffect because we want
	// `connect` to perform sync updates to a ref to save the latest props after
	// a render is actually committed to the DOM.


	var useIsomorphicLayoutEffect = typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect;
	function connectAdvanced(
	/*
	  selectorFactory is a func that is responsible for returning the selector function used to
	  compute new props from state, props, and dispatch. For example:
	      export default connectAdvanced((dispatch, options) => (state, props) => ({
	      thing: state.things[props.thingId],
	      saveThing: fields => dispatch(actionCreators.saveThing(props.thingId, fields)),
	    }))(YourComponent)
	    Access to dispatch is provided to the factory so selectorFactories can bind actionCreators
	  outside of their selector as an optimization. Options passed to connectAdvanced are passed to
	  the selectorFactory, along with displayName and WrappedComponent, as the second argument.
	    Note that selectorFactory is responsible for all caching/memoization of inbound and outbound
	  props. Do not use connectAdvanced directly without memoizing results between calls to your
	  selector, otherwise the Connect component will re-render on every state or props change.
	*/
	selectorFactory, // options object:
	_ref) {
	  if (_ref === void 0) {
	    _ref = {};
	  }

	  var _ref2 = _ref,
	      _ref2$getDisplayName = _ref2.getDisplayName,
	      getDisplayName = _ref2$getDisplayName === void 0 ? function (name) {
	    return "ConnectAdvanced(" + name + ")";
	  } : _ref2$getDisplayName,
	      _ref2$methodName = _ref2.methodName,
	      methodName = _ref2$methodName === void 0 ? 'connectAdvanced' : _ref2$methodName,
	      _ref2$renderCountProp = _ref2.renderCountProp,
	      renderCountProp = _ref2$renderCountProp === void 0 ? undefined : _ref2$renderCountProp,
	      _ref2$shouldHandleSta = _ref2.shouldHandleStateChanges,
	      shouldHandleStateChanges = _ref2$shouldHandleSta === void 0 ? true : _ref2$shouldHandleSta,
	      _ref2$storeKey = _ref2.storeKey,
	      storeKey = _ref2$storeKey === void 0 ? 'store' : _ref2$storeKey,
	      _ref2$withRef = _ref2.withRef,
	      withRef = _ref2$withRef === void 0 ? false : _ref2$withRef,
	      _ref2$forwardRef = _ref2.forwardRef,
	      forwardRef = _ref2$forwardRef === void 0 ? false : _ref2$forwardRef,
	      _ref2$context = _ref2.context,
	      context = _ref2$context === void 0 ? ReactReduxContext : _ref2$context,
	      connectOptions = _objectWithoutPropertiesLoose(_ref2, ["getDisplayName", "methodName", "renderCountProp", "shouldHandleStateChanges", "storeKey", "withRef", "forwardRef", "context"]);

	  invariant_1(renderCountProp === undefined, "renderCountProp is removed. render counting is built into the latest React Dev Tools profiling extension");
	  invariant_1(!withRef, 'withRef is removed. To access the wrapped instance, use a ref on the connected component');
	  var customStoreWarningMessage = 'To use a custom Redux store for specific components, create a custom React context with ' + "React.createContext(), and pass the context object to React Redux's Provider and specific components" + ' like: <Provider context={MyContext}><ConnectedComponent context={MyContext} /></Provider>. ' + 'You may also pass a {context : MyContext} option to connect';
	  invariant_1(storeKey === 'store', 'storeKey has been removed and does not do anything. ' + customStoreWarningMessage);
	  var Context = context;
	  return function wrapWithConnect(WrappedComponent) {
	    {
	      invariant_1(reactIs_1(WrappedComponent), "You must pass a component to the function returned by " + (methodName + ". Instead received " + stringifyComponent(WrappedComponent)));
	    }

	    var wrappedComponentName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
	    var displayName = getDisplayName(wrappedComponentName);

	    var selectorFactoryOptions = _extends$1({}, connectOptions, {
	      getDisplayName: getDisplayName,
	      methodName: methodName,
	      renderCountProp: renderCountProp,
	      shouldHandleStateChanges: shouldHandleStateChanges,
	      storeKey: storeKey,
	      displayName: displayName,
	      wrappedComponentName: wrappedComponentName,
	      WrappedComponent: WrappedComponent
	    });

	    var pure = connectOptions.pure;

	    function createChildSelector(store) {
	      return selectorFactory(store.dispatch, selectorFactoryOptions);
	    } // If we aren't running in "pure" mode, we don't want to memoize values.
	    // To avoid conditionally calling hooks, we fall back to a tiny wrapper
	    // that just executes the given callback immediately.


	    var usePureOnlyMemo = pure ? React.useMemo : function (callback) {
	      return callback();
	    };

	    function ConnectFunction(props) {
	      var _useMemo = React.useMemo(function () {
	        // Distinguish between actual "data" props that were passed to the wrapper component,
	        // and values needed to control behavior (forwarded refs, alternate context instances).
	        // To maintain the wrapperProps object reference, memoize this destructuring.
	        var context = props.context,
	            forwardedRef = props.forwardedRef,
	            wrapperProps = _objectWithoutPropertiesLoose(props, ["context", "forwardedRef"]);

	        return [context, forwardedRef, wrapperProps];
	      }, [props]),
	          propsContext = _useMemo[0],
	          forwardedRef = _useMemo[1],
	          wrapperProps = _useMemo[2];

	      var ContextToUse = React.useMemo(function () {
	        // Users may optionally pass in a custom context instance to use instead of our ReactReduxContext.
	        // Memoize the check that determines which context instance we should use.
	        return propsContext && propsContext.Consumer && reactIs_2(React__default.createElement(propsContext.Consumer, null)) ? propsContext : Context;
	      }, [propsContext, Context]); // Retrieve the store and ancestor subscription via context, if available

	      var contextValue = React.useContext(ContextToUse); // The store _must_ exist as either a prop or in context

	      var didStoreComeFromProps = Boolean(props.store);
	      var didStoreComeFromContext = Boolean(contextValue) && Boolean(contextValue.store);
	      invariant_1(didStoreComeFromProps || didStoreComeFromContext, "Could not find \"store\" in the context of " + ("\"" + displayName + "\". Either wrap the root component in a <Provider>, ") + "or pass a custom React context provider to <Provider> and the corresponding " + ("React context consumer to " + displayName + " in connect options."));
	      var store = props.store || contextValue.store;
	      var childPropsSelector = React.useMemo(function () {
	        // The child props selector needs the store reference as an input.
	        // Re-create this selector whenever the store changes.
	        return createChildSelector(store);
	      }, [store]);

	      var _useMemo2 = React.useMemo(function () {
	        if (!shouldHandleStateChanges) return NO_SUBSCRIPTION_ARRAY; // This Subscription's source should match where store came from: props vs. context. A component
	        // connected to the store via props shouldn't use subscription from context, or vice versa.

	        var subscription = new Subscription(store, didStoreComeFromProps ? null : contextValue.subscription); // `notifyNestedSubs` is duplicated to handle the case where the component is unmounted in
	        // the middle of the notification loop, where `subscription` will then be null. This can
	        // probably be avoided if Subscription's listeners logic is changed to not call listeners
	        // that have been unsubscribed in the  middle of the notification loop.

	        var notifyNestedSubs = subscription.notifyNestedSubs.bind(subscription);
	        return [subscription, notifyNestedSubs];
	      }, [store, didStoreComeFromProps, contextValue]),
	          subscription = _useMemo2[0],
	          notifyNestedSubs = _useMemo2[1]; // Determine what {store, subscription} value should be put into nested context, if necessary,
	      // and memoize that value to avoid unnecessary context updates.


	      var overriddenContextValue = React.useMemo(function () {
	        if (didStoreComeFromProps) {
	          // This component is directly subscribed to a store from props.
	          // We don't want descendants reading from this store - pass down whatever
	          // the existing context value is from the nearest connected ancestor.
	          return contextValue;
	        } // Otherwise, put this component's subscription instance into context, so that
	        // connected descendants won't update until after this component is done


	        return _extends$1({}, contextValue, {
	          subscription: subscription
	        });
	      }, [didStoreComeFromProps, contextValue, subscription]); // We need to force this wrapper component to re-render whenever a Redux store update
	      // causes a change to the calculated child component props (or we caught an error in mapState)

	      var _useReducer = React.useReducer(storeStateUpdatesReducer, EMPTY_ARRAY, initStateUpdates),
	          _useReducer$ = _useReducer[0],
	          previousStateUpdateResult = _useReducer$[0],
	          forceComponentUpdateDispatch = _useReducer[1]; // Propagate any mapState/mapDispatch errors upwards


	      if (previousStateUpdateResult && previousStateUpdateResult.error) {
	        throw previousStateUpdateResult.error;
	      } // Set up refs to coordinate values between the subscription effect and the render logic


	      var lastChildProps = React.useRef();
	      var lastWrapperProps = React.useRef(wrapperProps);
	      var childPropsFromStoreUpdate = React.useRef();
	      var renderIsScheduled = React.useRef(false);
	      var actualChildProps = usePureOnlyMemo(function () {
	        // Tricky logic here:
	        // - This render may have been triggered by a Redux store update that produced new child props
	        // - However, we may have gotten new wrapper props after that
	        // If we have new child props, and the same wrapper props, we know we should use the new child props as-is.
	        // But, if we have new wrapper props, those might change the child props, so we have to recalculate things.
	        // So, we'll use the child props from store update only if the wrapper props are the same as last time.
	        if (childPropsFromStoreUpdate.current && wrapperProps === lastWrapperProps.current) {
	          return childPropsFromStoreUpdate.current;
	        } // TODO We're reading the store directly in render() here. Bad idea?
	        // This will likely cause Bad Things (TM) to happen in Concurrent Mode.
	        // Note that we do this because on renders _not_ caused by store updates, we need the latest store state
	        // to determine what the child props should be.


	        return childPropsSelector(store.getState(), wrapperProps);
	      }, [store, previousStateUpdateResult, wrapperProps]); // We need this to execute synchronously every time we re-render. However, React warns
	      // about useLayoutEffect in SSR, so we try to detect environment and fall back to
	      // just useEffect instead to avoid the warning, since neither will run anyway.

	      useIsomorphicLayoutEffect(function () {
	        // We want to capture the wrapper props and child props we used for later comparisons
	        lastWrapperProps.current = wrapperProps;
	        lastChildProps.current = actualChildProps;
	        renderIsScheduled.current = false; // If the render was from a store update, clear out that reference and cascade the subscriber update

	        if (childPropsFromStoreUpdate.current) {
	          childPropsFromStoreUpdate.current = null;
	          notifyNestedSubs();
	        }
	      }); // Our re-subscribe logic only runs when the store/subscription setup changes

	      useIsomorphicLayoutEffect(function () {
	        // If we're not subscribed to the store, nothing to do here
	        if (!shouldHandleStateChanges) return; // Capture values for checking if and when this component unmounts

	        var didUnsubscribe = false;
	        var lastThrownError = null; // We'll run this callback every time a store subscription update propagates to this component

	        var checkForUpdates = function checkForUpdates() {
	          if (didUnsubscribe) {
	            // Don't run stale listeners.
	            // Redux doesn't guarantee unsubscriptions happen until next dispatch.
	            return;
	          }

	          var latestStoreState = store.getState();
	          var newChildProps, error;

	          try {
	            // Actually run the selector with the most recent store state and wrapper props
	            // to determine what the child props should be
	            newChildProps = childPropsSelector(latestStoreState, lastWrapperProps.current);
	          } catch (e) {
	            error = e;
	            lastThrownError = e;
	          }

	          if (!error) {
	            lastThrownError = null;
	          } // If the child props haven't changed, nothing to do here - cascade the subscription update


	          if (newChildProps === lastChildProps.current) {
	            if (!renderIsScheduled.current) {
	              notifyNestedSubs();
	            }
	          } else {
	            // Save references to the new child props.  Note that we track the "child props from store update"
	            // as a ref instead of a useState/useReducer because we need a way to determine if that value has
	            // been processed.  If this went into useState/useReducer, we couldn't clear out the value without
	            // forcing another re-render, which we don't want.
	            lastChildProps.current = newChildProps;
	            childPropsFromStoreUpdate.current = newChildProps;
	            renderIsScheduled.current = true; // If the child props _did_ change (or we caught an error), this wrapper component needs to re-render

	            forceComponentUpdateDispatch({
	              type: 'STORE_UPDATED',
	              payload: {
	                latestStoreState: latestStoreState,
	                error: error
	              }
	            });
	          }
	        }; // Actually subscribe to the nearest connected ancestor (or store)


	        subscription.onStateChange = checkForUpdates;
	        subscription.trySubscribe(); // Pull data from the store after first render in case the store has
	        // changed since we began.

	        checkForUpdates();

	        var unsubscribeWrapper = function unsubscribeWrapper() {
	          didUnsubscribe = true;
	          subscription.tryUnsubscribe();

	          if (lastThrownError) {
	            // It's possible that we caught an error due to a bad mapState function, but the
	            // parent re-rendered without this component and we're about to unmount.
	            // This shouldn't happen as long as we do top-down subscriptions correctly, but
	            // if we ever do those wrong, this throw will surface the error in our tests.
	            // In that case, throw the error from here so it doesn't get lost.
	            throw lastThrownError;
	          }
	        };

	        return unsubscribeWrapper;
	      }, [store, subscription, childPropsSelector]); // Now that all that's done, we can finally try to actually render the child component.
	      // We memoize the elements for the rendered child component as an optimization.

	      var renderedWrappedComponent = React.useMemo(function () {
	        return React__default.createElement(WrappedComponent, _extends$1({}, actualChildProps, {
	          ref: forwardedRef
	        }));
	      }, [forwardedRef, WrappedComponent, actualChildProps]); // If React sees the exact same element reference as last time, it bails out of re-rendering
	      // that child, same as if it was wrapped in React.memo() or returned false from shouldComponentUpdate.

	      var renderedChild = React.useMemo(function () {
	        if (shouldHandleStateChanges) {
	          // If this component is subscribed to store updates, we need to pass its own
	          // subscription instance down to our descendants. That means rendering the same
	          // Context instance, and putting a different value into the context.
	          return React__default.createElement(ContextToUse.Provider, {
	            value: overriddenContextValue
	          }, renderedWrappedComponent);
	        }

	        return renderedWrappedComponent;
	      }, [ContextToUse, renderedWrappedComponent, overriddenContextValue]);
	      return renderedChild;
	    } // If we're in "pure" mode, ensure our wrapper component only re-renders when incoming props have changed.


	    var Connect = pure ? React__default.memo(ConnectFunction) : ConnectFunction;
	    Connect.WrappedComponent = WrappedComponent;
	    Connect.displayName = displayName;

	    if (forwardRef) {
	      var forwarded = React__default.forwardRef(function forwardConnectRef(props, ref) {
	        return React__default.createElement(Connect, _extends$1({}, props, {
	          forwardedRef: ref
	        }));
	      });
	      forwarded.displayName = displayName;
	      forwarded.WrappedComponent = WrappedComponent;
	      return hoistNonReactStatics_cjs(forwarded, WrappedComponent);
	    }

	    return hoistNonReactStatics_cjs(Connect, WrappedComponent);
	  };
	}

	var hasOwn = Object.prototype.hasOwnProperty;

	function is$1(x, y) {
	  if (x === y) {
	    return x !== 0 || y !== 0 || 1 / x === 1 / y;
	  } else {
	    return x !== x && y !== y;
	  }
	}

	function shallowEqual(objA, objB) {
	  if (is$1(objA, objB)) return true;

	  if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
	    return false;
	  }

	  var keysA = Object.keys(objA);
	  var keysB = Object.keys(objB);
	  if (keysA.length !== keysB.length) return false;

	  for (var i = 0; i < keysA.length; i++) {
	    if (!hasOwn.call(objB, keysA[i]) || !is$1(objA[keysA[i]], objB[keysA[i]])) {
	      return false;
	    }
	  }

	  return true;
	}

	/**
	 * @param {any} obj The object to inspect.
	 * @returns {boolean} True if the argument appears to be a plain object.
	 */
	function isPlainObject$1(obj) {
	  if (typeof obj !== 'object' || obj === null) return false;
	  var proto = Object.getPrototypeOf(obj);
	  if (proto === null) return true;
	  var baseProto = proto;

	  while (Object.getPrototypeOf(baseProto) !== null) {
	    baseProto = Object.getPrototypeOf(baseProto);
	  }

	  return proto === baseProto;
	}

	/**
	 * Prints a warning in the console if it exists.
	 *
	 * @param {String} message The warning message.
	 * @returns {void}
	 */
	function warning$2(message) {
	  /* eslint-disable no-console */
	  if (typeof console !== 'undefined' && typeof console.error === 'function') {
	    console.error(message);
	  }
	  /* eslint-enable no-console */


	  try {
	    // This error was thrown as a convenience so that if you enable
	    // "break on all exceptions" in your console,
	    // it would pause the execution at this line.
	    throw new Error(message);
	    /* eslint-disable no-empty */
	  } catch (e) {}
	  /* eslint-enable no-empty */

	}

	function verifyPlainObject(value, displayName, methodName) {
	  if (!isPlainObject$1(value)) {
	    warning$2(methodName + "() in " + displayName + " must return a plain object. Instead received " + value + ".");
	  }
	}

	function wrapMapToPropsConstant(getConstant) {
	  return function initConstantSelector(dispatch, options) {
	    var constant = getConstant(dispatch, options);

	    function constantSelector() {
	      return constant;
	    }

	    constantSelector.dependsOnOwnProps = false;
	    return constantSelector;
	  };
	} // dependsOnOwnProps is used by createMapToPropsProxy to determine whether to pass props as args
	// to the mapToProps function being wrapped. It is also used by makePurePropsSelector to determine
	// whether mapToProps needs to be invoked when props have changed.
	//
	// A length of one signals that mapToProps does not depend on props from the parent component.
	// A length of zero is assumed to mean mapToProps is getting args via arguments or ...args and
	// therefore not reporting its length accurately..

	function getDependsOnOwnProps(mapToProps) {
	  return mapToProps.dependsOnOwnProps !== null && mapToProps.dependsOnOwnProps !== undefined ? Boolean(mapToProps.dependsOnOwnProps) : mapToProps.length !== 1;
	} // Used by whenMapStateToPropsIsFunction and whenMapDispatchToPropsIsFunction,
	// this function wraps mapToProps in a proxy function which does several things:
	//
	//  * Detects whether the mapToProps function being called depends on props, which
	//    is used by selectorFactory to decide if it should reinvoke on props changes.
	//
	//  * On first call, handles mapToProps if returns another function, and treats that
	//    new function as the true mapToProps for subsequent calls.
	//
	//  * On first call, verifies the first result is a plain object, in order to warn
	//    the developer that their mapToProps function is not returning a valid result.
	//

	function wrapMapToPropsFunc(mapToProps, methodName) {
	  return function initProxySelector(dispatch, _ref) {
	    var displayName = _ref.displayName;

	    var proxy = function mapToPropsProxy(stateOrDispatch, ownProps) {
	      return proxy.dependsOnOwnProps ? proxy.mapToProps(stateOrDispatch, ownProps) : proxy.mapToProps(stateOrDispatch);
	    }; // allow detectFactoryAndVerify to get ownProps


	    proxy.dependsOnOwnProps = true;

	    proxy.mapToProps = function detectFactoryAndVerify(stateOrDispatch, ownProps) {
	      proxy.mapToProps = mapToProps;
	      proxy.dependsOnOwnProps = getDependsOnOwnProps(mapToProps);
	      var props = proxy(stateOrDispatch, ownProps);

	      if (typeof props === 'function') {
	        proxy.mapToProps = props;
	        proxy.dependsOnOwnProps = getDependsOnOwnProps(props);
	        props = proxy(stateOrDispatch, ownProps);
	      }

	      verifyPlainObject(props, displayName, methodName);
	      return props;
	    };

	    return proxy;
	  };
	}

	function whenMapDispatchToPropsIsFunction(mapDispatchToProps) {
	  return typeof mapDispatchToProps === 'function' ? wrapMapToPropsFunc(mapDispatchToProps, 'mapDispatchToProps') : undefined;
	}
	function whenMapDispatchToPropsIsMissing(mapDispatchToProps) {
	  return !mapDispatchToProps ? wrapMapToPropsConstant(function (dispatch) {
	    return {
	      dispatch: dispatch
	    };
	  }) : undefined;
	}
	function whenMapDispatchToPropsIsObject(mapDispatchToProps) {
	  return mapDispatchToProps && typeof mapDispatchToProps === 'object' ? wrapMapToPropsConstant(function (dispatch) {
	    return bindActionCreators(mapDispatchToProps, dispatch);
	  }) : undefined;
	}
	var defaultMapDispatchToPropsFactories = [whenMapDispatchToPropsIsFunction, whenMapDispatchToPropsIsMissing, whenMapDispatchToPropsIsObject];

	function whenMapStateToPropsIsFunction(mapStateToProps) {
	  return typeof mapStateToProps === 'function' ? wrapMapToPropsFunc(mapStateToProps, 'mapStateToProps') : undefined;
	}
	function whenMapStateToPropsIsMissing(mapStateToProps) {
	  return !mapStateToProps ? wrapMapToPropsConstant(function () {
	    return {};
	  }) : undefined;
	}
	var defaultMapStateToPropsFactories = [whenMapStateToPropsIsFunction, whenMapStateToPropsIsMissing];

	function defaultMergeProps(stateProps, dispatchProps, ownProps) {
	  return _extends$1({}, ownProps, stateProps, dispatchProps);
	}
	function wrapMergePropsFunc(mergeProps) {
	  return function initMergePropsProxy(dispatch, _ref) {
	    var displayName = _ref.displayName,
	        pure = _ref.pure,
	        areMergedPropsEqual = _ref.areMergedPropsEqual;
	    var hasRunOnce = false;
	    var mergedProps;
	    return function mergePropsProxy(stateProps, dispatchProps, ownProps) {
	      var nextMergedProps = mergeProps(stateProps, dispatchProps, ownProps);

	      if (hasRunOnce) {
	        if (!pure || !areMergedPropsEqual(nextMergedProps, mergedProps)) mergedProps = nextMergedProps;
	      } else {
	        hasRunOnce = true;
	        mergedProps = nextMergedProps;
	        verifyPlainObject(mergedProps, displayName, 'mergeProps');
	      }

	      return mergedProps;
	    };
	  };
	}
	function whenMergePropsIsFunction(mergeProps) {
	  return typeof mergeProps === 'function' ? wrapMergePropsFunc(mergeProps) : undefined;
	}
	function whenMergePropsIsOmitted(mergeProps) {
	  return !mergeProps ? function () {
	    return defaultMergeProps;
	  } : undefined;
	}
	var defaultMergePropsFactories = [whenMergePropsIsFunction, whenMergePropsIsOmitted];

	function verify(selector, methodName, displayName) {
	  if (!selector) {
	    throw new Error("Unexpected value for " + methodName + " in " + displayName + ".");
	  } else if (methodName === 'mapStateToProps' || methodName === 'mapDispatchToProps') {
	    if (!selector.hasOwnProperty('dependsOnOwnProps')) {
	      warning$2("The selector for " + methodName + " of " + displayName + " did not specify a value for dependsOnOwnProps.");
	    }
	  }
	}

	function verifySubselectors(mapStateToProps, mapDispatchToProps, mergeProps, displayName) {
	  verify(mapStateToProps, 'mapStateToProps', displayName);
	  verify(mapDispatchToProps, 'mapDispatchToProps', displayName);
	  verify(mergeProps, 'mergeProps', displayName);
	}

	function impureFinalPropsSelectorFactory(mapStateToProps, mapDispatchToProps, mergeProps, dispatch) {
	  return function impureFinalPropsSelector(state, ownProps) {
	    return mergeProps(mapStateToProps(state, ownProps), mapDispatchToProps(dispatch, ownProps), ownProps);
	  };
	}
	function pureFinalPropsSelectorFactory(mapStateToProps, mapDispatchToProps, mergeProps, dispatch, _ref) {
	  var areStatesEqual = _ref.areStatesEqual,
	      areOwnPropsEqual = _ref.areOwnPropsEqual,
	      areStatePropsEqual = _ref.areStatePropsEqual;
	  var hasRunAtLeastOnce = false;
	  var state;
	  var ownProps;
	  var stateProps;
	  var dispatchProps;
	  var mergedProps;

	  function handleFirstCall(firstState, firstOwnProps) {
	    state = firstState;
	    ownProps = firstOwnProps;
	    stateProps = mapStateToProps(state, ownProps);
	    dispatchProps = mapDispatchToProps(dispatch, ownProps);
	    mergedProps = mergeProps(stateProps, dispatchProps, ownProps);
	    hasRunAtLeastOnce = true;
	    return mergedProps;
	  }

	  function handleNewPropsAndNewState() {
	    stateProps = mapStateToProps(state, ownProps);
	    if (mapDispatchToProps.dependsOnOwnProps) dispatchProps = mapDispatchToProps(dispatch, ownProps);
	    mergedProps = mergeProps(stateProps, dispatchProps, ownProps);
	    return mergedProps;
	  }

	  function handleNewProps() {
	    if (mapStateToProps.dependsOnOwnProps) stateProps = mapStateToProps(state, ownProps);
	    if (mapDispatchToProps.dependsOnOwnProps) dispatchProps = mapDispatchToProps(dispatch, ownProps);
	    mergedProps = mergeProps(stateProps, dispatchProps, ownProps);
	    return mergedProps;
	  }

	  function handleNewState() {
	    var nextStateProps = mapStateToProps(state, ownProps);
	    var statePropsChanged = !areStatePropsEqual(nextStateProps, stateProps);
	    stateProps = nextStateProps;
	    if (statePropsChanged) mergedProps = mergeProps(stateProps, dispatchProps, ownProps);
	    return mergedProps;
	  }

	  function handleSubsequentCalls(nextState, nextOwnProps) {
	    var propsChanged = !areOwnPropsEqual(nextOwnProps, ownProps);
	    var stateChanged = !areStatesEqual(nextState, state);
	    state = nextState;
	    ownProps = nextOwnProps;
	    if (propsChanged && stateChanged) return handleNewPropsAndNewState();
	    if (propsChanged) return handleNewProps();
	    if (stateChanged) return handleNewState();
	    return mergedProps;
	  }

	  return function pureFinalPropsSelector(nextState, nextOwnProps) {
	    return hasRunAtLeastOnce ? handleSubsequentCalls(nextState, nextOwnProps) : handleFirstCall(nextState, nextOwnProps);
	  };
	} // TODO: Add more comments
	// If pure is true, the selector returned by selectorFactory will memoize its results,
	// allowing connectAdvanced's shouldComponentUpdate to return false if final
	// props have not changed. If false, the selector will always return a new
	// object and shouldComponentUpdate will always return true.

	function finalPropsSelectorFactory(dispatch, _ref2) {
	  var initMapStateToProps = _ref2.initMapStateToProps,
	      initMapDispatchToProps = _ref2.initMapDispatchToProps,
	      initMergeProps = _ref2.initMergeProps,
	      options = _objectWithoutPropertiesLoose(_ref2, ["initMapStateToProps", "initMapDispatchToProps", "initMergeProps"]);

	  var mapStateToProps = initMapStateToProps(dispatch, options);
	  var mapDispatchToProps = initMapDispatchToProps(dispatch, options);
	  var mergeProps = initMergeProps(dispatch, options);

	  {
	    verifySubselectors(mapStateToProps, mapDispatchToProps, mergeProps, options.displayName);
	  }

	  var selectorFactory = options.pure ? pureFinalPropsSelectorFactory : impureFinalPropsSelectorFactory;
	  return selectorFactory(mapStateToProps, mapDispatchToProps, mergeProps, dispatch, options);
	}

	/*
	  connect is a facade over connectAdvanced. It turns its args into a compatible
	  selectorFactory, which has the signature:

	    (dispatch, options) => (nextState, nextOwnProps) => nextFinalProps
	  
	  connect passes its args to connectAdvanced as options, which will in turn pass them to
	  selectorFactory each time a Connect component instance is instantiated or hot reloaded.

	  selectorFactory returns a final props selector from its mapStateToProps,
	  mapStateToPropsFactories, mapDispatchToProps, mapDispatchToPropsFactories, mergeProps,
	  mergePropsFactories, and pure args.

	  The resulting final props selector is called by the Connect component instance whenever
	  it receives new props or store state.
	 */

	function match(arg, factories, name) {
	  for (var i = factories.length - 1; i >= 0; i--) {
	    var result = factories[i](arg);
	    if (result) return result;
	  }

	  return function (dispatch, options) {
	    throw new Error("Invalid value of type " + typeof arg + " for " + name + " argument when connecting component " + options.wrappedComponentName + ".");
	  };
	}

	function strictEqual(a, b) {
	  return a === b;
	} // createConnect with default args builds the 'official' connect behavior. Calling it with
	// different options opens up some testing and extensibility scenarios


	function createConnect(_temp) {
	  var _ref = _temp === void 0 ? {} : _temp,
	      _ref$connectHOC = _ref.connectHOC,
	      connectHOC = _ref$connectHOC === void 0 ? connectAdvanced : _ref$connectHOC,
	      _ref$mapStateToPropsF = _ref.mapStateToPropsFactories,
	      mapStateToPropsFactories = _ref$mapStateToPropsF === void 0 ? defaultMapStateToPropsFactories : _ref$mapStateToPropsF,
	      _ref$mapDispatchToPro = _ref.mapDispatchToPropsFactories,
	      mapDispatchToPropsFactories = _ref$mapDispatchToPro === void 0 ? defaultMapDispatchToPropsFactories : _ref$mapDispatchToPro,
	      _ref$mergePropsFactor = _ref.mergePropsFactories,
	      mergePropsFactories = _ref$mergePropsFactor === void 0 ? defaultMergePropsFactories : _ref$mergePropsFactor,
	      _ref$selectorFactory = _ref.selectorFactory,
	      selectorFactory = _ref$selectorFactory === void 0 ? finalPropsSelectorFactory : _ref$selectorFactory;

	  return function connect(mapStateToProps, mapDispatchToProps, mergeProps, _ref2) {
	    if (_ref2 === void 0) {
	      _ref2 = {};
	    }

	    var _ref3 = _ref2,
	        _ref3$pure = _ref3.pure,
	        pure = _ref3$pure === void 0 ? true : _ref3$pure,
	        _ref3$areStatesEqual = _ref3.areStatesEqual,
	        areStatesEqual = _ref3$areStatesEqual === void 0 ? strictEqual : _ref3$areStatesEqual,
	        _ref3$areOwnPropsEqua = _ref3.areOwnPropsEqual,
	        areOwnPropsEqual = _ref3$areOwnPropsEqua === void 0 ? shallowEqual : _ref3$areOwnPropsEqua,
	        _ref3$areStatePropsEq = _ref3.areStatePropsEqual,
	        areStatePropsEqual = _ref3$areStatePropsEq === void 0 ? shallowEqual : _ref3$areStatePropsEq,
	        _ref3$areMergedPropsE = _ref3.areMergedPropsEqual,
	        areMergedPropsEqual = _ref3$areMergedPropsE === void 0 ? shallowEqual : _ref3$areMergedPropsE,
	        extraOptions = _objectWithoutPropertiesLoose(_ref3, ["pure", "areStatesEqual", "areOwnPropsEqual", "areStatePropsEqual", "areMergedPropsEqual"]);

	    var initMapStateToProps = match(mapStateToProps, mapStateToPropsFactories, 'mapStateToProps');
	    var initMapDispatchToProps = match(mapDispatchToProps, mapDispatchToPropsFactories, 'mapDispatchToProps');
	    var initMergeProps = match(mergeProps, mergePropsFactories, 'mergeProps');
	    return connectHOC(selectorFactory, _extends$1({
	      // used in error messages
	      methodName: 'connect',
	      // used to compute Connect's displayName from the wrapped component's displayName.
	      getDisplayName: function getDisplayName(name) {
	        return "Connect(" + name + ")";
	      },
	      // if mapStateToProps is falsy, the Connect component doesn't subscribe to store state changes
	      shouldHandleStateChanges: Boolean(mapStateToProps),
	      // passed through to selectorFactory
	      initMapStateToProps: initMapStateToProps,
	      initMapDispatchToProps: initMapDispatchToProps,
	      initMergeProps: initMergeProps,
	      pure: pure,
	      areStatesEqual: areStatesEqual,
	      areOwnPropsEqual: areOwnPropsEqual,
	      areStatePropsEqual: areStatePropsEqual,
	      areMergedPropsEqual: areMergedPropsEqual
	    }, extraOptions));
	  };
	}
	var connect = createConnect();

	/* eslint-disable import/no-unresolved */

	setBatch(reactDom.unstable_batchedUpdates);

	var origin = {
	  x: 0,
	  y: 0
	};
	var add = function add(point1, point2) {
	  return {
	    x: point1.x + point2.x,
	    y: point1.y + point2.y
	  };
	};
	var subtract = function subtract(point1, point2) {
	  return {
	    x: point1.x - point2.x,
	    y: point1.y - point2.y
	  };
	};
	var isEqual = function isEqual(point1, point2) {
	  return point1.x === point2.x && point1.y === point2.y;
	};
	var negate = function negate(point) {
	  return {
	    x: point.x !== 0 ? -point.x : 0,
	    y: point.y !== 0 ? -point.y : 0
	  };
	};
	var patch = function patch(line, value, otherValue) {
	  var _ref;

	  if (otherValue === void 0) {
	    otherValue = 0;
	  }

	  return _ref = {}, _ref[line] = value, _ref[line === 'x' ? 'y' : 'x'] = otherValue, _ref;
	};
	var distance = function distance(point1, point2) {
	  return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
	};
	var closest = function closest(target, points) {
	  return Math.min.apply(Math, points.map(function (point) {
	    return distance(target, point);
	  }));
	};
	var apply = function apply(fn) {
	  return function (point) {
	    return {
	      x: fn(point.x),
	      y: fn(point.y)
	    };
	  };
	};

	var getRect = function getRect(_ref) {
	  var top = _ref.top,
	      right = _ref.right,
	      bottom = _ref.bottom,
	      left = _ref.left;
	  var width = right - left;
	  var height = bottom - top;
	  var rect = {
	    top: top,
	    right: right,
	    bottom: bottom,
	    left: left,
	    width: width,
	    height: height,
	    x: left,
	    y: top,
	    center: {
	      x: (right + left) / 2,
	      y: (bottom + top) / 2
	    }
	  };
	  return rect;
	};
	var expand = function expand(target, expandBy) {
	  return {
	    top: target.top - expandBy.top,
	    left: target.left - expandBy.left,
	    bottom: target.bottom + expandBy.bottom,
	    right: target.right + expandBy.right
	  };
	};
	var shrink = function shrink(target, shrinkBy) {
	  return {
	    top: target.top + shrinkBy.top,
	    left: target.left + shrinkBy.left,
	    bottom: target.bottom - shrinkBy.bottom,
	    right: target.right - shrinkBy.right
	  };
	};

	var shift = function shift(target, shiftBy) {
	  return {
	    top: target.top + shiftBy.y,
	    left: target.left + shiftBy.x,
	    bottom: target.bottom + shiftBy.y,
	    right: target.right + shiftBy.x
	  };
	};

	var noSpacing = {
	  top: 0,
	  right: 0,
	  bottom: 0,
	  left: 0
	};
	var createBox = function createBox(_ref2) {
	  var borderBox = _ref2.borderBox,
	      _ref2$margin = _ref2.margin,
	      margin = _ref2$margin === void 0 ? noSpacing : _ref2$margin,
	      _ref2$border = _ref2.border,
	      border = _ref2$border === void 0 ? noSpacing : _ref2$border,
	      _ref2$padding = _ref2.padding,
	      padding = _ref2$padding === void 0 ? noSpacing : _ref2$padding;
	  var marginBox = getRect(expand(borderBox, margin));
	  var paddingBox = getRect(shrink(borderBox, border));
	  var contentBox = getRect(shrink(paddingBox, padding));
	  return {
	    marginBox: marginBox,
	    borderBox: getRect(borderBox),
	    paddingBox: paddingBox,
	    contentBox: contentBox,
	    margin: margin,
	    border: border,
	    padding: padding
	  };
	};

	var parse = function parse(raw) {
	  var value = raw.slice(0, -2);
	  var suffix = raw.slice(-2);

	  if (suffix !== 'px') {
	    return 0;
	  }

	  var result = Number(value);
	  !!isNaN(result) ? invariant(false, "Could not parse value [raw: " + raw + ", without suffix: " + value + "]") : void 0;
	  return result;
	};

	var getWindowScroll = function getWindowScroll() {
	  return {
	    x: window.pageXOffset,
	    y: window.pageYOffset
	  };
	};

	var offset = function offset(original, change) {
	  var borderBox = original.borderBox,
	      border = original.border,
	      margin = original.margin,
	      padding = original.padding;
	  var shifted = shift(borderBox, change);
	  return createBox({
	    borderBox: shifted,
	    border: border,
	    margin: margin,
	    padding: padding
	  });
	};
	var withScroll = function withScroll(original, scroll) {
	  if (scroll === void 0) {
	    scroll = getWindowScroll();
	  }

	  return offset(original, scroll);
	};
	var calculateBox = function calculateBox(borderBox, styles) {
	  var margin = {
	    top: parse(styles.marginTop),
	    right: parse(styles.marginRight),
	    bottom: parse(styles.marginBottom),
	    left: parse(styles.marginLeft)
	  };
	  var padding = {
	    top: parse(styles.paddingTop),
	    right: parse(styles.paddingRight),
	    bottom: parse(styles.paddingBottom),
	    left: parse(styles.paddingLeft)
	  };
	  var border = {
	    top: parse(styles.borderTopWidth),
	    right: parse(styles.borderRightWidth),
	    bottom: parse(styles.borderBottomWidth),
	    left: parse(styles.borderLeftWidth)
	  };
	  return createBox({
	    borderBox: borderBox,
	    margin: margin,
	    padding: padding,
	    border: border
	  });
	};
	var getBox = function getBox(el) {
	  var borderBox = el.getBoundingClientRect();
	  var styles = window.getComputedStyle(el);
	  return calculateBox(borderBox, styles);
	};

	var executeClip = (function (frame, subject) {
	  var result = getRect({
	    top: Math.max(subject.top, frame.top),
	    right: Math.min(subject.right, frame.right),
	    bottom: Math.min(subject.bottom, frame.bottom),
	    left: Math.max(subject.left, frame.left)
	  });

	  if (result.width <= 0 || result.height <= 0) {
	    return null;
	  }

	  return result;
	});

	var isEqual$1 = function isEqual(first, second) {
	  return first.top === second.top && first.right === second.right && first.bottom === second.bottom && first.left === second.left;
	};
	var offsetByPosition = function offsetByPosition(spacing, point) {
	  return {
	    top: spacing.top + point.y,
	    left: spacing.left + point.x,
	    bottom: spacing.bottom + point.y,
	    right: spacing.right + point.x
	  };
	};
	var getCorners = function getCorners(spacing) {
	  return [{
	    x: spacing.left,
	    y: spacing.top
	  }, {
	    x: spacing.right,
	    y: spacing.top
	  }, {
	    x: spacing.left,
	    y: spacing.bottom
	  }, {
	    x: spacing.right,
	    y: spacing.bottom
	  }];
	};
	var noSpacing$1 = {
	  top: 0,
	  right: 0,
	  bottom: 0,
	  left: 0
	};

	var scroll = function scroll(target, frame) {
	  if (!frame) {
	    return target;
	  }

	  return offsetByPosition(target, frame.scroll.diff.displacement);
	};

	var increase = function increase(target, axis, withPlaceholder) {
	  if (withPlaceholder && withPlaceholder.increasedBy) {
	    var _extends2;

	    return _extends({}, target, (_extends2 = {}, _extends2[axis.end] = target[axis.end] + withPlaceholder.increasedBy[axis.line], _extends2));
	  }

	  return target;
	};

	var clip = function clip(target, frame) {
	  if (frame && frame.shouldClipSubject) {
	    return executeClip(frame.pageMarginBox, target);
	  }

	  return getRect(target);
	};

	var getSubject = (function (_ref) {
	  var page = _ref.page,
	      withPlaceholder = _ref.withPlaceholder,
	      axis = _ref.axis,
	      frame = _ref.frame;
	  var scrolled = scroll(page.marginBox, frame);
	  var increased = increase(scrolled, axis, withPlaceholder);
	  var clipped = clip(increased, frame);
	  return {
	    page: page,
	    withPlaceholder: withPlaceholder,
	    active: clipped
	  };
	});

	var scrollDroppable = (function (droppable, newScroll) {
	  !droppable.frame ? invariant(false) : void 0;
	  var scrollable = droppable.frame;
	  var scrollDiff = subtract(newScroll, scrollable.scroll.initial);
	  var scrollDisplacement = negate(scrollDiff);

	  var frame = _extends({}, scrollable, {
	    scroll: {
	      initial: scrollable.scroll.initial,
	      current: newScroll,
	      diff: {
	        value: scrollDiff,
	        displacement: scrollDisplacement
	      },
	      max: scrollable.scroll.max
	    }
	  });

	  var subject = getSubject({
	    page: droppable.subject.page,
	    withPlaceholder: droppable.subject.withPlaceholder,
	    axis: droppable.axis,
	    frame: frame
	  });

	  var result = _extends({}, droppable, {
	    frame: frame,
	    subject: subject
	  });

	  return result;
	});

	var records = {};
	var isEnabled = false;

	var isTimingsEnabled = function isTimingsEnabled() {
	  return isEnabled;
	};
	var start = function start(key) {
	  {
	    if (!isTimingsEnabled()) {
	      return;
	    }

	    var now = performance.now();
	    records[key] = now;
	  }
	};
	var finish = function finish(key) {
	  {
	    if (!isTimingsEnabled()) {
	      return;
	    }

	    var now = performance.now();
	    var previous = records[key];

	    if (!previous) {
	      console.warn('cannot finish timing as no previous time found', key);
	      return;
	    }

	    var result = now - previous;
	    var rounded = result.toFixed(2);

	    var style = function () {
	      if (result < 12) {
	        return {
	          textColor: 'green',
	          symbol: '✅'
	        };
	      }

	      if (result < 40) {
	        return {
	          textColor: 'orange',
	          symbol: '⚠️'
	        };
	      }

	      return {
	        textColor: 'red',
	        symbol: '❌'
	      };
	    }();

	    console.log(style.symbol + " %cTiming %c" + rounded + " %cms %c" + key, 'color: blue; font-weight: bold;', "color: " + style.textColor + "; font-size: 1.1em;", 'color: grey;', 'color: purple; font-weight: bold;');
	  }
	};

	var whatIsDraggedOver = (function (impact) {
	  var merge = impact.merge,
	      destination = impact.destination;

	  if (destination) {
	    return destination.droppableId;
	  }

	  if (merge) {
	    return merge.combine.droppableId;
	  }

	  return null;
	});

	function areInputsEqual$1(newInputs, lastInputs) {
	  if (newInputs.length !== lastInputs.length) {
	    return false;
	  }

	  for (var i = 0; i < newInputs.length; i++) {
	    if (newInputs[i] !== lastInputs[i]) {
	      return false;
	    }
	  }

	  return true;
	}

	function index (resultFn, isEqual) {
	  if (isEqual === void 0) {
	    isEqual = areInputsEqual$1;
	  }

	  var lastThis;
	  var lastArgs = [];
	  var lastResult;
	  var calledOnce = false;

	  var result = function result() {
	    for (var _len = arguments.length, newArgs = new Array(_len), _key = 0; _key < _len; _key++) {
	      newArgs[_key] = arguments[_key];
	    }

	    if (calledOnce && lastThis === this && isEqual(newArgs, lastArgs)) {
	      return lastResult;
	    }

	    lastResult = resultFn.apply(this, newArgs);
	    calledOnce = true;
	    lastThis = this;
	    lastArgs = newArgs;
	    return lastResult;
	  };

	  return result;
	}

	var isEnum = _objectPie.f;
	var _objectToArray = function (isEntries) {
	  return function (it) {
	    var O = _toIobject(it);
	    var keys = _objectKeys(O);
	    var length = keys.length;
	    var i = 0;
	    var result = [];
	    var key;
	    while (length > i) if (isEnum.call(O, key = keys[i++])) {
	      result.push(isEntries ? [key, O[key]] : O[key]);
	    } return result;
	  };
	};

	// https://github.com/tc39/proposal-object-values-entries

	var $values = _objectToArray(false);

	_export(_export.S, 'Object', {
	  values: function values(it) {
	    return $values(it);
	  }
	});

	var values = _core.Object.values;

	var values$1 = values;

	function values$2(map) {
	  return values$1(map);
	}
	function findIndex(list, predicate) {
	  if (list.findIndex) {
	    return list.findIndex(predicate);
	  }

	  for (var i = 0; i < list.length; i++) {
	    if (predicate(list[i])) {
	      return i;
	    }
	  }

	  return -1;
	}
	function find(list, predicate) {
	  if (list.find) {
	    return list.find(predicate);
	  }

	  var index = findIndex(list, predicate);

	  if (index !== -1) {
	    return list[index];
	  }

	  return undefined;
	}

	var toDroppableMap = index(function (droppables) {
	  return droppables.reduce(function (previous, current) {
	    previous[current.descriptor.id] = current;
	    return previous;
	  }, {});
	});
	var toDraggableMap = index(function (draggables) {
	  return draggables.reduce(function (previous, current) {
	    previous[current.descriptor.id] = current;
	    return previous;
	  }, {});
	});
	var toDroppableList = index(function (droppables) {
	  return values$2(droppables);
	});
	var toDraggableList = index(function (draggables) {
	  return values$2(draggables);
	});

	var isWithin = (function (lowerBound, upperBound) {
	  return function (value) {
	    return lowerBound <= value && value <= upperBound;
	  };
	});

	var isPositionInFrame = (function (frame) {
	  var isWithinVertical = isWithin(frame.top, frame.bottom);
	  var isWithinHorizontal = isWithin(frame.left, frame.right);
	  return function (point) {
	    return isWithinVertical(point.y) && isWithinVertical(point.y) && isWithinHorizontal(point.x) && isWithinHorizontal(point.x);
	  };
	});

	var getDroppableOver = (function (_ref) {
	  var target = _ref.target,
	      droppables = _ref.droppables;
	  var maybe = find(toDroppableList(droppables), function (droppable) {
	    if (!droppable.isEnabled) {
	      return false;
	    }

	    var active = droppable.subject.active;

	    if (!active) {
	      return false;
	    }

	    return isPositionInFrame(active)(target);
	  });
	  return maybe ? maybe.descriptor.id : null;
	});

	var getDraggablesInsideDroppable = index(function (droppableId, draggables) {
	  var result = toDraggableList(draggables).filter(function (draggable) {
	    return droppableId === draggable.descriptor.droppableId;
	  }).sort(function (a, b) {
	    return a.descriptor.index - b.descriptor.index;
	  });
	  return result;
	});

	var withDroppableScroll = (function (droppable, point) {
	  var frame = droppable.frame;

	  if (!frame) {
	    return point;
	  }

	  return add(point, frame.scroll.diff.value);
	});

	var vertical = {
	  direction: 'vertical',
	  line: 'y',
	  crossAxisLine: 'x',
	  start: 'top',
	  end: 'bottom',
	  size: 'height',
	  crossAxisStart: 'left',
	  crossAxisEnd: 'right',
	  crossAxisSize: 'width'
	};
	var horizontal = {
	  direction: 'horizontal',
	  line: 'x',
	  crossAxisLine: 'y',
	  start: 'left',
	  end: 'right',
	  size: 'width',
	  crossAxisStart: 'top',
	  crossAxisEnd: 'bottom',
	  crossAxisSize: 'height'
	};

	var isUserMovingForward = (function (axis, direction) {
	  return axis === vertical ? direction.vertical === 'down' : direction.horizontal === 'right';
	});

	var didStartDisplaced = (function (draggableId, onLift) {
	  return Boolean(onLift.wasDisplaced[draggableId]);
	});

	var getCombinedItemDisplacement = (function (_ref) {
	  var displaced = _ref.displaced,
	      onLift = _ref.onLift,
	      combineWith = _ref.combineWith,
	      displacedBy = _ref.displacedBy;
	  var isDisplaced = Boolean(displaced[combineWith]);

	  if (didStartDisplaced(combineWith, onLift)) {
	    return isDisplaced ? origin : negate(displacedBy.point);
	  }

	  return isDisplaced ? displacedBy.point : origin;
	});

	var getWhenEntered = function getWhenEntered(id, current, oldMerge) {
	  if (!oldMerge) {
	    return current;
	  }

	  if (id !== oldMerge.combine.draggableId) {
	    return current;
	  }

	  return oldMerge.whenEntered;
	};

	var isCombiningWith = function isCombiningWith(_ref) {
	  var id = _ref.id,
	      currentCenter = _ref.currentCenter,
	      axis = _ref.axis,
	      borderBox = _ref.borderBox,
	      displaceBy = _ref.displaceBy,
	      currentUserDirection = _ref.currentUserDirection,
	      oldMerge = _ref.oldMerge;
	  var start = borderBox[axis.start] + displaceBy[axis.line];
	  var end = borderBox[axis.end] + displaceBy[axis.line];
	  var size = borderBox[axis.size];
	  var twoThirdsOfSize = size * 0.666;
	  var whenEntered = getWhenEntered(id, currentUserDirection, oldMerge);
	  var isMovingForward = isUserMovingForward(axis, whenEntered);
	  var targetCenter = currentCenter[axis.line];

	  if (isMovingForward) {
	    return isWithin(start, start + twoThirdsOfSize)(targetCenter);
	  }

	  return isWithin(end - twoThirdsOfSize, end)(targetCenter);
	};

	var getCombineImpact = (function (_ref2) {
	  var currentCenter = _ref2.pageBorderBoxCenterWithDroppableScrollChange,
	      previousImpact = _ref2.previousImpact,
	      destination = _ref2.destination,
	      insideDestinationWithoutDraggable = _ref2.insideDestinationWithoutDraggable,
	      userDirection = _ref2.userDirection,
	      onLift = _ref2.onLift;

	  if (!destination.isCombineEnabled) {
	    return null;
	  }

	  var axis = destination.axis;
	  var map = previousImpact.movement.map;
	  var canBeDisplacedBy = previousImpact.movement.displacedBy;
	  var oldMerge = previousImpact.merge;
	  var target = find(insideDestinationWithoutDraggable, function (child) {
	    var id = child.descriptor.id;
	    var displaceBy = getCombinedItemDisplacement({
	      displaced: map,
	      onLift: onLift,
	      combineWith: id,
	      displacedBy: canBeDisplacedBy
	    });
	    return isCombiningWith({
	      id: id,
	      currentCenter: currentCenter,
	      axis: axis,
	      borderBox: child.page.borderBox,
	      displaceBy: displaceBy,
	      currentUserDirection: userDirection,
	      oldMerge: oldMerge
	    });
	  });

	  if (!target) {
	    return null;
	  }

	  var merge = {
	    whenEntered: getWhenEntered(target.descriptor.id, userDirection, oldMerge),
	    combine: {
	      draggableId: target.descriptor.id,
	      droppableId: destination.descriptor.id
	    }
	  };

	  var withMerge = _extends({}, previousImpact, {
	    destination: null,
	    merge: merge
	  });

	  return withMerge;
	});

	var isPartiallyVisibleThroughFrame = (function (frame) {
	  var isWithinVertical = isWithin(frame.top, frame.bottom);
	  var isWithinHorizontal = isWithin(frame.left, frame.right);
	  return function (subject) {
	    var isContained = isWithinVertical(subject.top) && isWithinVertical(subject.bottom) && isWithinHorizontal(subject.left) && isWithinHorizontal(subject.right);

	    if (isContained) {
	      return true;
	    }

	    var isPartiallyVisibleVertically = isWithinVertical(subject.top) || isWithinVertical(subject.bottom);
	    var isPartiallyVisibleHorizontally = isWithinHorizontal(subject.left) || isWithinHorizontal(subject.right);
	    var isPartiallyContained = isPartiallyVisibleVertically && isPartiallyVisibleHorizontally;

	    if (isPartiallyContained) {
	      return true;
	    }

	    var isBiggerVertically = subject.top < frame.top && subject.bottom > frame.bottom;
	    var isBiggerHorizontally = subject.left < frame.left && subject.right > frame.right;
	    var isTargetBiggerThanFrame = isBiggerVertically && isBiggerHorizontally;

	    if (isTargetBiggerThanFrame) {
	      return true;
	    }

	    var isTargetBiggerOnOneAxis = isBiggerVertically && isPartiallyVisibleHorizontally || isBiggerHorizontally && isPartiallyVisibleVertically;
	    return isTargetBiggerOnOneAxis;
	  };
	});

	var isTotallyVisibleThroughFrame = (function (frame) {
	  var isWithinVertical = isWithin(frame.top, frame.bottom);
	  var isWithinHorizontal = isWithin(frame.left, frame.right);
	  return function (subject) {
	    var isContained = isWithinVertical(subject.top) && isWithinVertical(subject.bottom) && isWithinHorizontal(subject.left) && isWithinHorizontal(subject.right);
	    return isContained;
	  };
	});

	var isTotallyVisibleThroughFrameOnAxis = (function (axis) {
	  return function (frame) {
	    var isWithinVertical = isWithin(frame.top, frame.bottom);
	    var isWithinHorizontal = isWithin(frame.left, frame.right);
	    return function (subject) {
	      if (axis === vertical) {
	        return isWithinVertical(subject.top) && isWithinVertical(subject.bottom);
	      }

	      return isWithinHorizontal(subject.left) && isWithinHorizontal(subject.right);
	    };
	  };
	});

	var getDroppableDisplaced = function getDroppableDisplaced(target, destination) {
	  var displacement = destination.frame ? destination.frame.scroll.diff.displacement : origin;
	  return offsetByPosition(target, displacement);
	};

	var isVisibleInDroppable = function isVisibleInDroppable(target, destination, isVisibleThroughFrameFn) {
	  if (!destination.subject.active) {
	    return false;
	  }

	  return isVisibleThroughFrameFn(destination.subject.active)(target);
	};

	var isVisibleInViewport = function isVisibleInViewport(target, viewport, isVisibleThroughFrameFn) {
	  return isVisibleThroughFrameFn(viewport)(target);
	};

	var isVisible = function isVisible(_ref) {
	  var toBeDisplaced = _ref.target,
	      destination = _ref.destination,
	      viewport = _ref.viewport,
	      withDroppableDisplacement = _ref.withDroppableDisplacement,
	      isVisibleThroughFrameFn = _ref.isVisibleThroughFrameFn;
	  var displacedTarget = withDroppableDisplacement ? getDroppableDisplaced(toBeDisplaced, destination) : toBeDisplaced;
	  return isVisibleInDroppable(displacedTarget, destination, isVisibleThroughFrameFn) && isVisibleInViewport(displacedTarget, viewport, isVisibleThroughFrameFn);
	};

	var isPartiallyVisible = function isPartiallyVisible(args) {
	  return isVisible(_extends({}, args, {
	    isVisibleThroughFrameFn: isPartiallyVisibleThroughFrame
	  }));
	};
	var isTotallyVisible = function isTotallyVisible(args) {
	  return isVisible(_extends({}, args, {
	    isVisibleThroughFrameFn: isTotallyVisibleThroughFrame
	  }));
	};
	var isTotallyVisibleOnAxis = function isTotallyVisibleOnAxis(args) {
	  return isVisible(_extends({}, args, {
	    isVisibleThroughFrameFn: isTotallyVisibleThroughFrameOnAxis(args.destination.axis)
	  }));
	};

	var getShouldAnimate = function getShouldAnimate(forceShouldAnimate, isVisible, previous) {
	  if (typeof forceShouldAnimate === 'boolean') {
	    return forceShouldAnimate;
	  }

	  if (!isVisible) {
	    return false;
	  }

	  if (!previous) {
	    return true;
	  }

	  return previous.shouldAnimate;
	};

	var getTarget = function getTarget(draggable, onLift) {
	  var marginBox = draggable.page.marginBox;

	  if (!didStartDisplaced(draggable.descriptor.id, onLift)) {
	    return marginBox;
	  }

	  var expandBy = {
	    top: onLift.displacedBy.point.y,
	    right: 0,
	    bottom: 0,
	    left: onLift.displacedBy.point.x
	  };
	  return getRect(expand(marginBox, expandBy));
	};

	var getDisplacement = (function (_ref) {
	  var draggable = _ref.draggable,
	      destination = _ref.destination,
	      previousImpact = _ref.previousImpact,
	      viewport = _ref.viewport,
	      onLift = _ref.onLift,
	      forceShouldAnimate = _ref.forceShouldAnimate;
	  var id = draggable.descriptor.id;
	  var map = previousImpact.movement.map;
	  var target = getTarget(draggable, onLift);
	  var isVisible = isPartiallyVisible({
	    target: target,
	    destination: destination,
	    viewport: viewport,
	    withDroppableDisplacement: true
	  });
	  var shouldAnimate = getShouldAnimate(forceShouldAnimate, isVisible, map[id]);
	  var displacement = {
	    draggableId: id,
	    isVisible: isVisible,
	    shouldAnimate: shouldAnimate
	  };
	  return displacement;
	});

	var getDisplacementMap = index(function (displaced) {
	  return displaced.reduce(function (map, displacement) {
	    map[displacement.draggableId] = displacement;
	    return map;
	  }, {});
	});

	var getDisplacedBy = index(function (axis, displaceBy) {
	  var displacement = displaceBy[axis.line];
	  return {
	    value: displacement,
	    point: patch(axis.line, displacement)
	  };
	});

	var getReorderImpact = (function (_ref) {
	  var currentCenter = _ref.pageBorderBoxCenterWithDroppableScrollChange,
	      draggable = _ref.draggable,
	      destination = _ref.destination,
	      insideDestinationWithoutDraggable = _ref.insideDestinationWithoutDraggable,
	      previousImpact = _ref.previousImpact,
	      viewport = _ref.viewport,
	      userDirection = _ref.userDirection,
	      onLift = _ref.onLift;
	  var axis = destination.axis;
	  var isMovingForward = isUserMovingForward(destination.axis, userDirection);
	  var displacedBy = getDisplacedBy(destination.axis, draggable.displaceBy);
	  var targetCenter = currentCenter[axis.line];
	  var displacement = displacedBy.value;
	  var displaced = insideDestinationWithoutDraggable.filter(function (child) {
	    var borderBox = child.page.borderBox;
	    var start = borderBox[axis.start];
	    var end = borderBox[axis.end];
	    var didStartDisplaced$1 = didStartDisplaced(child.descriptor.id, onLift);

	    if (isMovingForward) {
	      if (didStartDisplaced$1) {
	        return targetCenter < start;
	      }

	      return targetCenter < start + displacement;
	    }

	    if (didStartDisplaced$1) {
	      return targetCenter <= end - displacement;
	    }

	    return targetCenter <= end;
	  }).map(function (dimension) {
	    return getDisplacement({
	      draggable: dimension,
	      destination: destination,
	      previousImpact: previousImpact,
	      viewport: viewport.frame,
	      onLift: onLift
	    });
	  });
	  var newIndex = insideDestinationWithoutDraggable.length - displaced.length;
	  var movement = {
	    displacedBy: displacedBy,
	    displaced: displaced,
	    map: getDisplacementMap(displaced)
	  };
	  var impact = {
	    movement: movement,
	    destination: {
	      droppableId: destination.descriptor.id,
	      index: newIndex
	    },
	    merge: null
	  };
	  return impact;
	});

	var noDisplacedBy = {
	  point: origin,
	  value: 0
	};
	var noMovement = {
	  displaced: [],
	  map: {},
	  displacedBy: noDisplacedBy
	};
	var noImpact = {
	  movement: noMovement,
	  destination: null,
	  merge: null
	};

	var removeDraggableFromList = index(function (remove, list) {
	  return list.filter(function (item) {
	    return item.descriptor.id !== remove.descriptor.id;
	  });
	});

	var getDragImpact = (function (_ref) {
	  var pageBorderBoxCenter = _ref.pageBorderBoxCenter,
	      draggable = _ref.draggable,
	      draggables = _ref.draggables,
	      droppables = _ref.droppables,
	      previousImpact = _ref.previousImpact,
	      viewport = _ref.viewport,
	      userDirection = _ref.userDirection,
	      onLift = _ref.onLift;
	  var destinationId = getDroppableOver({
	    target: pageBorderBoxCenter,
	    droppables: droppables
	  });

	  if (!destinationId) {
	    return noImpact;
	  }

	  var destination = droppables[destinationId];
	  var insideDestination = getDraggablesInsideDroppable(destination.descriptor.id, draggables);
	  var insideDestinationWithoutDraggable = removeDraggableFromList(draggable, insideDestination);
	  var pageBorderBoxCenterWithDroppableScrollChange = withDroppableScroll(destination, pageBorderBoxCenter);
	  var withMerge = getCombineImpact({
	    pageBorderBoxCenterWithDroppableScrollChange: pageBorderBoxCenterWithDroppableScrollChange,
	    previousImpact: previousImpact,
	    destination: destination,
	    insideDestinationWithoutDraggable: insideDestinationWithoutDraggable,
	    userDirection: userDirection,
	    onLift: onLift
	  });

	  if (withMerge) {
	    return withMerge;
	  }

	  return getReorderImpact({
	    pageBorderBoxCenterWithDroppableScrollChange: pageBorderBoxCenterWithDroppableScrollChange,
	    destination: destination,
	    draggable: draggable,
	    insideDestinationWithoutDraggable: insideDestinationWithoutDraggable,
	    previousImpact: previousImpact,
	    viewport: viewport,
	    userDirection: userDirection,
	    onLift: onLift
	  });
	});

	var getHomeLocation = (function (descriptor) {
	  return {
	    index: descriptor.index,
	    droppableId: descriptor.droppableId
	  };
	});

	var getHomeOnLift = (function (_ref) {
	  var draggable = _ref.draggable,
	      home = _ref.home,
	      draggables = _ref.draggables,
	      viewport = _ref.viewport;
	  var displacedBy = getDisplacedBy(home.axis, draggable.displaceBy);
	  var insideHome = getDraggablesInsideDroppable(home.descriptor.id, draggables);
	  var originallyDisplaced = insideHome.slice(draggable.descriptor.index + 1);
	  var wasDisplaced = originallyDisplaced.reduce(function (previous, item) {
	    previous[item.descriptor.id] = true;
	    return previous;
	  }, {});
	  var onLift = {
	    displacedBy: displacedBy,
	    wasDisplaced: wasDisplaced
	  };
	  var displaced = originallyDisplaced.map(function (dimension) {
	    return getDisplacement({
	      draggable: dimension,
	      destination: home,
	      previousImpact: noImpact,
	      viewport: viewport.frame,
	      forceShouldAnimate: false,
	      onLift: onLift
	    });
	  });
	  var movement = {
	    displaced: displaced,
	    map: getDisplacementMap(displaced),
	    displacedBy: displacedBy
	  };
	  var impact = {
	    movement: movement,
	    destination: getHomeLocation(draggable.descriptor),
	    merge: null
	  };
	  return {
	    impact: impact,
	    onLift: onLift
	  };
	});

	var getDragPositions = (function (_ref) {
	  var oldInitial = _ref.initial,
	      oldCurrent = _ref.current,
	      oldClientBorderBoxCenter = _ref.oldClientBorderBoxCenter,
	      newClientBorderBoxCenter = _ref.newClientBorderBoxCenter,
	      viewport = _ref.viewport;
	  var shift = subtract(newClientBorderBoxCenter, oldClientBorderBoxCenter);

	  var initial = function () {
	    var client = {
	      selection: add(oldInitial.client.selection, shift),
	      borderBoxCenter: newClientBorderBoxCenter,
	      offset: origin
	    };
	    var page = {
	      selection: add(client.selection, viewport.scroll.initial),
	      borderBoxCenter: add(client.selection, viewport.scroll.initial)
	    };
	    return {
	      client: client,
	      page: page
	    };
	  }();

	  var current = function () {
	    var reverse = negate(shift);
	    var offset = add(oldCurrent.client.offset, reverse);
	    var client = {
	      selection: add(initial.client.selection, offset),
	      borderBoxCenter: add(initial.client.borderBoxCenter, offset),
	      offset: offset
	    };
	    var page = {
	      selection: add(client.selection, viewport.scroll.current),
	      borderBoxCenter: add(client.borderBoxCenter, viewport.scroll.current)
	    };
	    !isEqual(oldCurrent.client.borderBoxCenter, client.borderBoxCenter) ? invariant(false, "\n        Incorrect new client center position.\n        Expected (" + oldCurrent.client.borderBoxCenter.x + ", " + oldCurrent.client.borderBoxCenter.y + ")\n        to equal (" + client.borderBoxCenter.x + ", " + client.borderBoxCenter.y + ")\n      ") : void 0;
	    return {
	      client: client,
	      page: page
	    };
	  }();

	  return {
	    current: current,
	    initial: initial
	  };
	});

	var offsetDraggable = (function (_ref) {
	  var draggable = _ref.draggable,
	      offset$1 = _ref.offset,
	      initialWindowScroll = _ref.initialWindowScroll;
	  var client = offset(draggable.client, offset$1);
	  var page = withScroll(client, initialWindowScroll);

	  var moved = _extends({}, draggable, {
	    placeholder: _extends({}, draggable.placeholder, {
	      client: client
	    }),
	    client: client,
	    page: page
	  });

	  return moved;
	});

	var adjustExistingForAdditionsAndRemovals = (function (_ref) {
	  var existing = _ref.existing,
	      droppables = _ref.droppables,
	      addedDraggables = _ref.additions,
	      removedDraggables = _ref.removals,
	      viewport = _ref.viewport;
	  var shifted = {};
	  toDroppableList(droppables).forEach(function (droppable) {
	    var axis = droppable.axis;
	    var original = getDraggablesInsideDroppable(droppable.descriptor.id, existing);
	    var toShift = {};

	    var addShift = function addShift(id, shift) {
	      var previous = toShift[id];

	      if (!previous) {
	        toShift[id] = shift;
	        return;
	      }

	      toShift[id] = {
	        indexChange: previous.indexChange + shift.indexChange,
	        offset: add(previous.offset, shift.offset)
	      };
	    };

	    var removals = toDraggableMap(removedDraggables.map(function (id) {
	      var item = existing[id];
	      !item ? invariant(false, "Could not find removed draggable \"" + id + "\"") : void 0;
	      return item;
	    }).filter(function (draggable) {
	      return draggable.descriptor.droppableId === droppable.descriptor.id;
	    }));
	    var withRemovals = original.filter(function (item, index) {
	      var isBeingRemoved = Boolean(removals[item.descriptor.id]);

	      if (!isBeingRemoved) {
	        return true;
	      }

	      var offset = negate(patch(axis.line, item.displaceBy[axis.line]));
	      original.slice(index).forEach(function (sibling) {
	        if (removals[sibling.descriptor.id]) {
	          return;
	        }

	        addShift(sibling.descriptor.id, {
	          indexChange: -1,
	          offset: offset
	        });
	      });
	      return false;
	    });
	    var additions = addedDraggables.filter(function (draggable) {
	      return draggable.descriptor.droppableId === droppable.descriptor.id;
	    });
	    var withAdditions = withRemovals.slice(0);
	    additions.forEach(function (item) {
	      withAdditions.splice(item.descriptor.index, 0, item);
	    });
	    var additionMap = toDraggableMap(additions);
	    withAdditions.forEach(function (item, index) {
	      var wasAdded = Boolean(additionMap[item.descriptor.id]);

	      if (!wasAdded) {
	        return;
	      }

	      var offset = patch(axis.line, item.client.marginBox[axis.size]);
	      withAdditions.slice(index).forEach(function (sibling) {
	        if (additionMap[sibling.descriptor.id]) {
	          return;
	        }

	        addShift(sibling.descriptor.id, {
	          indexChange: 1,
	          offset: offset
	        });
	      });
	    });
	    withAdditions.forEach(function (item) {
	      if (additionMap[item.descriptor.id]) {
	        return;
	      }

	      var shift = toShift[item.descriptor.id];

	      if (!shift) {
	        return;
	      }

	      var moved = offsetDraggable({
	        draggable: item,
	        offset: shift.offset,
	        initialWindowScroll: viewport.scroll.initial
	      });
	      var index = item.descriptor.index + shift.indexChange;

	      var updated = _extends({}, moved, {
	        descriptor: _extends({}, item.descriptor, {
	          index: index
	        })
	      });

	      shifted[moved.descriptor.id] = updated;
	    });
	  });

	  var map = _extends({}, existing, shifted);

	  return map;
	});

	var adjustAdditionsForScrollChanges = (function (_ref) {
	  var additions = _ref.additions,
	      updatedDroppables = _ref.updatedDroppables,
	      viewport = _ref.viewport;
	  var windowScrollChange = viewport.scroll.diff.value;
	  return additions.map(function (draggable) {
	    var droppableId = draggable.descriptor.droppableId;
	    var modified = updatedDroppables[droppableId];
	    var frame = modified.frame;
	    !frame ? invariant(false) : void 0;
	    var droppableScrollChange = frame.scroll.diff.value;
	    var totalChange = add(windowScrollChange, droppableScrollChange);
	    var moved = offsetDraggable({
	      draggable: draggable,
	      offset: totalChange,
	      initialWindowScroll: viewport.scroll.initial
	    });
	    return moved;
	  });
	});

	var adjustAdditionsForCollapsedHome = (function (_ref) {
	  var additions = _ref.additions,
	      dragging = _ref.dragging,
	      home = _ref.home,
	      viewport = _ref.viewport;
	  var displacedBy = getDisplacedBy(home.axis, dragging.displaceBy);
	  return additions.map(function (draggable) {
	    if (draggable.descriptor.droppableId !== home.descriptor.id) {
	      return draggable;
	    }

	    if (draggable.descriptor.index < dragging.descriptor.index) {
	      return draggable;
	    }

	    return offsetDraggable({
	      draggable: draggable,
	      offset: displacedBy.point,
	      initialWindowScroll: viewport.scroll.initial
	    });
	  });
	});

	var updateDraggables = (function (_ref) {
	  var updatedDroppables = _ref.updatedDroppables,
	      criticalId = _ref.criticalId,
	      unmodifiedExisting = _ref.existing,
	      unmodifiedAdditions = _ref.additions,
	      removals = _ref.removals,
	      viewport = _ref.viewport;
	  var existing = adjustExistingForAdditionsAndRemovals({
	    droppables: updatedDroppables,
	    existing: unmodifiedExisting,
	    additions: unmodifiedAdditions,
	    removals: removals,
	    viewport: viewport
	  });
	  var dragging = existing[criticalId];
	  var home = updatedDroppables[dragging.descriptor.droppableId];
	  var scrolledAdditions = adjustAdditionsForScrollChanges({
	    additions: unmodifiedAdditions,
	    updatedDroppables: updatedDroppables,
	    viewport: viewport
	  });
	  var additions = adjustAdditionsForCollapsedHome({
	    additions: scrolledAdditions,
	    dragging: dragging,
	    home: home,
	    viewport: viewport
	  });

	  var map = _extends({}, existing, toDraggableMap(additions));

	  removals.forEach(function (id) {
	    delete map[id];
	  });
	  return map;
	});

	var getMaxScroll = (function (_ref) {
	  var scrollHeight = _ref.scrollHeight,
	      scrollWidth = _ref.scrollWidth,
	      height = _ref.height,
	      width = _ref.width;
	  var maxScroll = subtract({
	    x: scrollWidth,
	    y: scrollHeight
	  }, {
	    x: width,
	    y: height
	  });
	  var adjustedMaxScroll = {
	    x: Math.max(0, maxScroll.x),
	    y: Math.max(0, maxScroll.y)
	  };
	  return adjustedMaxScroll;
	});

	var getDroppableDimension = (function (_ref) {
	  var descriptor = _ref.descriptor,
	      isEnabled = _ref.isEnabled,
	      isCombineEnabled = _ref.isCombineEnabled,
	      isFixedOnPage = _ref.isFixedOnPage,
	      direction = _ref.direction,
	      client = _ref.client,
	      page = _ref.page,
	      closest = _ref.closest;

	  var frame = function () {
	    if (!closest) {
	      return null;
	    }

	    var scrollSize = closest.scrollSize,
	        frameClient = closest.client;
	    var maxScroll = getMaxScroll({
	      scrollHeight: scrollSize.scrollHeight,
	      scrollWidth: scrollSize.scrollWidth,
	      height: frameClient.paddingBox.height,
	      width: frameClient.paddingBox.width
	    });
	    return {
	      pageMarginBox: closest.page.marginBox,
	      frameClient: frameClient,
	      scrollSize: scrollSize,
	      shouldClipSubject: closest.shouldClipSubject,
	      scroll: {
	        initial: closest.scroll,
	        current: closest.scroll,
	        max: maxScroll,
	        diff: {
	          value: origin,
	          displacement: origin
	        }
	      }
	    };
	  }();

	  var axis = direction === 'vertical' ? vertical : horizontal;
	  var subject = getSubject({
	    page: page,
	    withPlaceholder: null,
	    axis: axis,
	    frame: frame
	  });
	  var dimension = {
	    descriptor: descriptor,
	    isCombineEnabled: isCombineEnabled,
	    isFixedOnPage: isFixedOnPage,
	    axis: axis,
	    isEnabled: isEnabled,
	    client: client,
	    page: page,
	    frame: frame,
	    subject: subject
	  };
	  return dimension;
	});

	var isHomeOf = (function (draggable, destination) {
	  return draggable.descriptor.droppableId === destination.descriptor.id;
	});

	var getRequiredGrowthForPlaceholder = function getRequiredGrowthForPlaceholder(droppable, placeholderSize, draggables) {
	  var axis = droppable.axis;
	  var availableSpace = droppable.subject.page.contentBox[axis.size];
	  var insideDroppable = getDraggablesInsideDroppable(droppable.descriptor.id, draggables);
	  var spaceUsed = insideDroppable.reduce(function (sum, dimension) {
	    return sum + dimension.client.marginBox[axis.size];
	  }, 0);
	  var requiredSpace = spaceUsed + placeholderSize[axis.line];
	  var needsToGrowBy = requiredSpace - availableSpace;

	  if (needsToGrowBy <= 0) {
	    return null;
	  }

	  return patch(axis.line, needsToGrowBy);
	};

	var withMaxScroll = function withMaxScroll(frame, max) {
	  return _extends({}, frame, {
	    scroll: _extends({}, frame.scroll, {
	      max: max
	    })
	  });
	};

	var addPlaceholder = function addPlaceholder(droppable, draggable, draggables) {
	  var frame = droppable.frame;
	  !!isHomeOf(draggable, droppable) ? invariant(false, 'Should not add placeholder space to home list') : void 0;
	  !!droppable.subject.withPlaceholder ? invariant(false, 'Cannot add placeholder size to a subject when it already has one') : void 0;
	  var placeholderSize = getDisplacedBy(droppable.axis, draggable.displaceBy).point;
	  var requiredGrowth = getRequiredGrowthForPlaceholder(droppable, placeholderSize, draggables);
	  var added = {
	    placeholderSize: placeholderSize,
	    increasedBy: requiredGrowth,
	    oldFrameMaxScroll: droppable.frame ? droppable.frame.scroll.max : null
	  };

	  if (!frame) {
	    var _subject = getSubject({
	      page: droppable.subject.page,
	      withPlaceholder: added,
	      axis: droppable.axis,
	      frame: droppable.frame
	    });

	    return _extends({}, droppable, {
	      subject: _subject
	    });
	  }

	  var maxScroll = requiredGrowth ? add(frame.scroll.max, requiredGrowth) : frame.scroll.max;
	  var newFrame = withMaxScroll(frame, maxScroll);
	  var subject = getSubject({
	    page: droppable.subject.page,
	    withPlaceholder: added,
	    axis: droppable.axis,
	    frame: newFrame
	  });
	  return _extends({}, droppable, {
	    subject: subject,
	    frame: newFrame
	  });
	};
	var removePlaceholder = function removePlaceholder(droppable) {
	  var added = droppable.subject.withPlaceholder;
	  !added ? invariant(false, 'Cannot remove placeholder form subject when there was none') : void 0;
	  var frame = droppable.frame;

	  if (!frame) {
	    var _subject2 = getSubject({
	      page: droppable.subject.page,
	      axis: droppable.axis,
	      frame: null,
	      withPlaceholder: null
	    });

	    return _extends({}, droppable, {
	      subject: _subject2
	    });
	  }

	  var oldMaxScroll = added.oldFrameMaxScroll;
	  !oldMaxScroll ? invariant(false, 'Expected droppable with frame to have old max frame scroll when removing placeholder') : void 0;
	  var newFrame = withMaxScroll(frame, oldMaxScroll);
	  var subject = getSubject({
	    page: droppable.subject.page,
	    axis: droppable.axis,
	    frame: newFrame,
	    withPlaceholder: null
	  });
	  return _extends({}, droppable, {
	    subject: subject,
	    frame: newFrame
	  });
	};

	var getFrame = (function (droppable) {
	  var frame = droppable.frame;
	  !frame ? invariant(false, 'Expected Droppable to have a frame') : void 0;
	  return frame;
	});

	var throwIfSpacingChange = function throwIfSpacingChange(old, fresh) {
	  {
	    var getMessage = function getMessage(spacingType) {
	      return "Cannot change the " + spacingType + " of a Droppable during a drag";
	    };

	    !isEqual$1(old.margin, fresh.margin) ? invariant(false, getMessage('margin')) : void 0;
	    !isEqual$1(old.border, fresh.border) ? invariant(false, getMessage('border')) : void 0;
	    !isEqual$1(old.padding, fresh.padding) ? invariant(false, getMessage('padding')) : void 0;
	  }
	};

	var adjustBorderBoxSize = function adjustBorderBoxSize(axis, old, fresh) {
	  return {
	    top: old.top,
	    left: old.left,
	    right: old.left + fresh.width,
	    bottom: old.top + fresh.height
	  };
	};

	var updateDroppables = (function (_ref) {
	  var modified = _ref.modified,
	      existing = _ref.existing,
	      viewport = _ref.viewport;

	  if (!modified.length) {
	    return existing;
	  }

	  var adjusted = modified.map(function (provided) {
	    var raw = existing[provided.descriptor.id];
	    !raw ? invariant(false, 'Could not locate droppable in existing droppables') : void 0;
	    var hasPlaceholder = Boolean(raw.subject.withPlaceholder);
	    var dimension = hasPlaceholder ? removePlaceholder(raw) : raw;
	    var oldClient = dimension.client;
	    var newClient = provided.client;
	    var oldScrollable = getFrame(dimension);
	    var newScrollable = getFrame(provided);

	    {
	      throwIfSpacingChange(dimension.client, provided.client);
	      throwIfSpacingChange(oldScrollable.frameClient, newScrollable.frameClient);
	      var isFrameEqual = oldScrollable.frameClient.borderBox.height === newScrollable.frameClient.borderBox.height && oldScrollable.frameClient.borderBox.width === newScrollable.frameClient.borderBox.width;
	      !isFrameEqual ? invariant(false, 'The width and height of your Droppable scroll container cannot change when adding or removing Draggables during a drag') : void 0;
	    }

	    var client = createBox({
	      borderBox: adjustBorderBoxSize(dimension.axis, oldClient.borderBox, newClient.borderBox),
	      margin: oldClient.margin,
	      border: oldClient.border,
	      padding: oldClient.padding
	    });
	    var closest = {
	      client: oldScrollable.frameClient,
	      page: withScroll(oldScrollable.frameClient, viewport.scroll.initial),
	      shouldClipSubject: oldScrollable.shouldClipSubject,
	      scrollSize: newScrollable.scrollSize,
	      scroll: oldScrollable.scroll.initial
	    };
	    var withSizeChanged = getDroppableDimension({
	      descriptor: provided.descriptor,
	      isEnabled: provided.isEnabled,
	      isCombineEnabled: provided.isCombineEnabled,
	      isFixedOnPage: provided.isFixedOnPage,
	      direction: provided.axis.direction,
	      client: client,
	      page: withScroll(client, viewport.scroll.initial),
	      closest: closest
	    });
	    var scrolled = scrollDroppable(withSizeChanged, newScrollable.scroll.current);
	    return scrolled;
	  });

	  var result = _extends({}, existing, toDroppableMap(adjusted));

	  return result;
	});

	var withNoAnimatedDisplacement = (function (impact) {
	  var displaced = impact.movement.displaced;

	  if (!displaced.length) {
	    return impact;
	  }

	  var withoutAnimation = displaced.map(function (displacement) {
	    if (!displacement.isVisible) {
	      return displacement;
	    }

	    if (!displacement.shouldAnimate) {
	      return displacement;
	    }

	    return _extends({}, displacement, {
	      shouldAnimate: false
	    });
	  });

	  var result = _extends({}, impact, {
	    movement: _extends({}, impact.movement, {
	      displaced: withoutAnimation,
	      map: getDisplacementMap(withoutAnimation)
	    })
	  });

	  return result;
	});

	var patchDroppableMap = (function (droppables, updated) {
	  var _extends2;

	  return _extends({}, droppables, (_extends2 = {}, _extends2[updated.descriptor.id] = updated, _extends2));
	});

	var clearUnusedPlaceholder = function clearUnusedPlaceholder(_ref) {
	  var previousImpact = _ref.previousImpact,
	      impact = _ref.impact,
	      droppables = _ref.droppables;
	  var last = whatIsDraggedOver(previousImpact);
	  var now = whatIsDraggedOver(impact);

	  if (!last) {
	    return droppables;
	  }

	  if (last === now) {
	    return droppables;
	  }

	  var lastDroppable = droppables[last];

	  if (!lastDroppable.subject.withPlaceholder) {
	    return droppables;
	  }

	  var updated = removePlaceholder(lastDroppable);
	  return patchDroppableMap(droppables, updated);
	};

	var recomputePlaceholders = (function (_ref2) {
	  var draggable = _ref2.draggable,
	      draggables = _ref2.draggables,
	      droppables = _ref2.droppables,
	      previousImpact = _ref2.previousImpact,
	      impact = _ref2.impact;
	  var cleaned = clearUnusedPlaceholder({
	    previousImpact: previousImpact,
	    impact: impact,
	    droppables: droppables
	  });
	  var isOver = whatIsDraggedOver(impact);

	  if (!isOver) {
	    return cleaned;
	  }

	  var droppable = droppables[isOver];

	  if (isHomeOf(draggable, droppable)) {
	    return cleaned;
	  }

	  if (droppable.subject.withPlaceholder) {
	    return cleaned;
	  }

	  var patched = addPlaceholder(droppable, draggable, draggables);
	  return patchDroppableMap(cleaned, patched);
	});

	var timingsKey = 'Processing dynamic changes';
	var publishWhileDragging = (function (_ref) {
	  var _extends2, _extends3;

	  var state = _ref.state,
	      published = _ref.published;
	  start(timingsKey);
	  var updatedDroppables = updateDroppables({
	    modified: published.modified,
	    existing: state.dimensions.droppables,
	    viewport: state.viewport
	  });
	  var draggables = updateDraggables({
	    updatedDroppables: updatedDroppables,
	    criticalId: state.critical.draggable.id,
	    existing: state.dimensions.draggables,
	    additions: published.additions,
	    removals: published.removals,
	    viewport: state.viewport
	  });
	  var critical = {
	    draggable: draggables[state.critical.draggable.id].descriptor,
	    droppable: updatedDroppables[state.critical.droppable.id].descriptor
	  };
	  var original = state.dimensions.draggables[critical.draggable.id];
	  var updated = draggables[critical.draggable.id];
	  var droppables = recomputePlaceholders({
	    draggable: updated,
	    draggables: draggables,
	    droppables: updatedDroppables,
	    previousImpact: state.impact,
	    impact: state.impact
	  });
	  var dimensions = {
	    draggables: draggables,
	    droppables: droppables
	  };

	  var _getDragPositions = getDragPositions({
	    initial: state.initial,
	    current: state.current,
	    oldClientBorderBoxCenter: original.client.borderBox.center,
	    newClientBorderBoxCenter: updated.client.borderBox.center,
	    viewport: state.viewport
	  }),
	      initial = _getDragPositions.initial,
	      current = _getDragPositions.current;

	  var _getHomeOnLift = getHomeOnLift({
	    draggable: updated,
	    home: dimensions.droppables[critical.droppable.id],
	    draggables: dimensions.draggables,
	    viewport: state.viewport
	  }),
	      homeImpact = _getHomeOnLift.impact,
	      onLift = _getHomeOnLift.onLift;

	  var impact = withNoAnimatedDisplacement(getDragImpact({
	    pageBorderBoxCenter: current.page.borderBoxCenter,
	    draggable: updated,
	    draggables: dimensions.draggables,
	    droppables: dimensions.droppables,
	    previousImpact: homeImpact,
	    viewport: state.viewport,
	    userDirection: state.userDirection,
	    onLift: onLift
	  }));
	  var isOrphaned = Boolean(state.movementMode === 'SNAP' && !whatIsDraggedOver(impact));
	  !!isOrphaned ? invariant(false, 'Dragging item no longer has a valid merge/destination after a dynamic update. This is not supported') : void 0;
	  finish(timingsKey);

	  var draggingState = _extends({
	    phase: 'DRAGGING'
	  }, state, (_extends2 = {}, _extends2["phase"] = 'DRAGGING', _extends2.critical = critical, _extends2.current = current, _extends2.initial = initial, _extends2.impact = impact, _extends2.dimensions = dimensions, _extends2.onLift = onLift, _extends2.onLiftImpact = homeImpact, _extends2.forceShouldAnimate = false, _extends2));

	  if (state.phase === 'COLLECTING') {
	    return draggingState;
	  }

	  var dropPending = _extends({
	    phase: 'DROP_PENDING'
	  }, draggingState, (_extends3 = {}, _extends3["phase"] = 'DROP_PENDING', _extends3.reason = state.reason, _extends3.isWaiting = false, _extends3));

	  return dropPending;
	});

	var forward = {
	  vertical: 'down',
	  horizontal: 'right'
	};
	var backward = {
	  vertical: 'up',
	  horizontal: 'left'
	};

	var moveToNextCombine = (function (_ref) {
	  var isMovingForward = _ref.isMovingForward,
	      isInHomeList = _ref.isInHomeList,
	      draggable = _ref.draggable,
	      destination = _ref.destination,
	      originalInsideDestination = _ref.insideDestination,
	      previousImpact = _ref.previousImpact;

	  if (!destination.isCombineEnabled) {
	    return null;
	  }

	  if (previousImpact.merge) {
	    return null;
	  }

	  var location = previousImpact.destination;
	  !location ? invariant(false, 'Need a previous location to move from into a combine') : void 0;
	  var currentIndex = location.index;

	  var currentInsideDestination = function () {
	    var shallow = originalInsideDestination.slice();

	    if (isInHomeList) {
	      shallow.splice(draggable.descriptor.index, 1);
	    }

	    shallow.splice(location.index, 0, draggable);
	    return shallow;
	  }();

	  var targetIndex = isMovingForward ? currentIndex + 1 : currentIndex - 1;

	  if (targetIndex < 0) {
	    return null;
	  }

	  if (targetIndex > currentInsideDestination.length - 1) {
	    return null;
	  }

	  var target = currentInsideDestination[targetIndex];
	  !(target !== draggable) ? invariant(false, 'Cannot combine with self') : void 0;
	  var merge = {
	    whenEntered: isMovingForward ? forward : backward,
	    combine: {
	      draggableId: target.descriptor.id,
	      droppableId: destination.descriptor.id
	    }
	  };
	  var impact = {
	    movement: previousImpact.movement,
	    destination: null,
	    merge: merge
	  };
	  return impact;
	});

	var addClosest = function addClosest(add, displaced) {
	  var added = {
	    draggableId: add.descriptor.id,
	    isVisible: true,
	    shouldAnimate: true
	  };
	  return [added].concat(displaced);
	};
	var removeClosest = function removeClosest(displaced) {
	  return displaced.slice(1);
	};

	var fromReorder = (function (_ref) {
	  var isMovingForward = _ref.isMovingForward,
	      isInHomeList = _ref.isInHomeList,
	      draggable = _ref.draggable,
	      initialInside = _ref.insideDestination,
	      location = _ref.location;
	  var insideDestination = initialInside.slice();
	  var currentIndex = location.index;
	  var isInForeignList = !isInHomeList;

	  if (isInForeignList) {
	    insideDestination.splice(location.index, 0, draggable);
	  }

	  var proposedIndex = isMovingForward ? currentIndex + 1 : currentIndex - 1;

	  if (proposedIndex < 0) {
	    return null;
	  }

	  if (proposedIndex > insideDestination.length - 1) {
	    return null;
	  }

	  return {
	    proposedIndex: proposedIndex,
	    modifyDisplacement: true
	  };
	});

	var fromCombine = (function (_ref) {
	  var isMovingForward = _ref.isMovingForward,
	      destination = _ref.destination,
	      previousImpact = _ref.previousImpact,
	      draggables = _ref.draggables,
	      merge = _ref.merge,
	      onLift = _ref.onLift;

	  if (!destination.isCombineEnabled) {
	    return null;
	  }

	  var movement = previousImpact.movement;
	  var combineId = merge.combine.draggableId;
	  var combine = draggables[combineId];
	  var combineIndex = combine.descriptor.index;
	  var wasDisplacedAtStart = didStartDisplaced(combineId, onLift);

	  if (wasDisplacedAtStart) {
	    var hasDisplacedFromStart = !movement.map[combineId];

	    if (hasDisplacedFromStart) {
	      if (isMovingForward) {
	        return {
	          proposedIndex: combineIndex,
	          modifyDisplacement: false
	        };
	      }

	      return {
	        proposedIndex: combineIndex - 1,
	        modifyDisplacement: true
	      };
	    }

	    if (isMovingForward) {
	      return {
	        proposedIndex: combineIndex,
	        modifyDisplacement: true
	      };
	    }

	    return {
	      proposedIndex: combineIndex - 1,
	      modifyDisplacement: false
	    };
	  }

	  var isDisplaced = Boolean(movement.map[combineId]);

	  if (isDisplaced) {
	    if (isMovingForward) {
	      return {
	        proposedIndex: combineIndex + 1,
	        modifyDisplacement: true
	      };
	    }

	    return {
	      proposedIndex: combineIndex,
	      modifyDisplacement: false
	    };
	  }

	  if (isMovingForward) {
	    return {
	      proposedIndex: combineIndex + 1,
	      modifyDisplacement: false
	    };
	  }

	  return {
	    proposedIndex: combineIndex,
	    modifyDisplacement: true
	  };
	});

	var moveToNextIndex = (function (_ref) {
	  var isMovingForward = _ref.isMovingForward,
	      isInHomeList = _ref.isInHomeList,
	      draggable = _ref.draggable,
	      draggables = _ref.draggables,
	      destination = _ref.destination,
	      insideDestination = _ref.insideDestination,
	      previousImpact = _ref.previousImpact,
	      onLift = _ref.onLift;

	  var instruction = function () {
	    if (previousImpact.destination) {
	      return fromReorder({
	        isMovingForward: isMovingForward,
	        isInHomeList: isInHomeList,
	        draggable: draggable,
	        location: previousImpact.destination,
	        insideDestination: insideDestination
	      });
	    }

	    if (previousImpact.merge) {
	      return fromCombine({
	        isMovingForward: isMovingForward,
	        destination: destination,
	        previousImpact: previousImpact,
	        draggables: draggables,
	        merge: previousImpact.merge,
	        onLift: onLift
	      });
	    }
	    return null;
	  }();

	  if (instruction == null) {
	    return null;
	  }

	  var proposedIndex = instruction.proposedIndex,
	      modifyDisplacement = instruction.modifyDisplacement;
	  var displacedBy = getDisplacedBy(destination.axis, draggable.displaceBy);

	  var displaced = function () {
	    var lastDisplaced = previousImpact.movement.displaced;

	    if (!modifyDisplacement) {
	      return lastDisplaced;
	    }

	    if (isMovingForward) {
	      return removeClosest(lastDisplaced);
	    }

	    var withoutDraggable = removeDraggableFromList(draggable, insideDestination);
	    var atProposedIndex = withoutDraggable[proposedIndex];
	    return addClosest(atProposedIndex, lastDisplaced);
	  }();

	  return {
	    movement: {
	      displacedBy: displacedBy,
	      displaced: displaced,
	      map: getDisplacementMap(displaced)
	    },
	    destination: {
	      droppableId: destination.descriptor.id,
	      index: proposedIndex
	    },
	    merge: null
	  };
	});

	var whenCombining = (function (_ref) {
	  var combine = _ref.combine,
	      onLift = _ref.onLift,
	      movement = _ref.movement,
	      draggables = _ref.draggables;
	  var combineWith = combine.draggableId;
	  var center = draggables[combineWith].page.borderBox.center;
	  var displaceBy = getCombinedItemDisplacement({
	    displaced: movement.map,
	    onLift: onLift,
	    combineWith: combineWith,
	    displacedBy: movement.displacedBy
	  });
	  return add(center, displaceBy);
	});

	var distanceFromStartToBorderBoxCenter = function distanceFromStartToBorderBoxCenter(axis, box) {
	  return box.margin[axis.start] + box.borderBox[axis.size] / 2;
	};

	var distanceFromEndToBorderBoxCenter = function distanceFromEndToBorderBoxCenter(axis, box) {
	  return box.margin[axis.end] + box.borderBox[axis.size] / 2;
	};

	var getCrossAxisBorderBoxCenter = function getCrossAxisBorderBoxCenter(axis, target, isMoving) {
	  return target[axis.crossAxisStart] + isMoving.margin[axis.crossAxisStart] + isMoving.borderBox[axis.crossAxisSize] / 2;
	};

	var goAfter = function goAfter(_ref) {
	  var axis = _ref.axis,
	      moveRelativeTo = _ref.moveRelativeTo,
	      isMoving = _ref.isMoving;
	  return patch(axis.line, moveRelativeTo.marginBox[axis.end] + distanceFromStartToBorderBoxCenter(axis, isMoving), getCrossAxisBorderBoxCenter(axis, moveRelativeTo.marginBox, isMoving));
	};
	var goBefore = function goBefore(_ref2) {
	  var axis = _ref2.axis,
	      moveRelativeTo = _ref2.moveRelativeTo,
	      isMoving = _ref2.isMoving;
	  return patch(axis.line, moveRelativeTo.marginBox[axis.start] - distanceFromEndToBorderBoxCenter(axis, isMoving), getCrossAxisBorderBoxCenter(axis, moveRelativeTo.marginBox, isMoving));
	};
	var goIntoStart = function goIntoStart(_ref3) {
	  var axis = _ref3.axis,
	      moveInto = _ref3.moveInto,
	      isMoving = _ref3.isMoving;
	  return patch(axis.line, moveInto.contentBox[axis.start] + distanceFromStartToBorderBoxCenter(axis, isMoving), getCrossAxisBorderBoxCenter(axis, moveInto.contentBox, isMoving));
	};

	var whenReordering = (function (_ref) {
	  var movement = _ref.movement,
	      draggable = _ref.draggable,
	      draggables = _ref.draggables,
	      droppable = _ref.droppable,
	      onLift = _ref.onLift;
	  var insideDestination = getDraggablesInsideDroppable(droppable.descriptor.id, draggables);
	  var draggablePage = draggable.page;
	  var axis = droppable.axis;

	  if (!insideDestination.length) {
	    return goIntoStart({
	      axis: axis,
	      moveInto: droppable.page,
	      isMoving: draggablePage
	    });
	  }

	  var displaced = movement.displaced,
	      displacedBy = movement.displacedBy;

	  if (displaced.length) {
	    var closestAfter = draggables[displaced[0].draggableId];

	    if (didStartDisplaced(closestAfter.descriptor.id, onLift)) {
	      return goBefore({
	        axis: axis,
	        moveRelativeTo: closestAfter.page,
	        isMoving: draggablePage
	      });
	    }

	    var withDisplacement = offset(closestAfter.page, displacedBy.point);
	    return goBefore({
	      axis: axis,
	      moveRelativeTo: withDisplacement,
	      isMoving: draggablePage
	    });
	  }

	  var last = insideDestination[insideDestination.length - 1];

	  if (last.descriptor.id === draggable.descriptor.id) {
	    return draggablePage.borderBox.center;
	  }

	  if (didStartDisplaced(last.descriptor.id, onLift)) {
	    var page = offset(last.page, negate(onLift.displacedBy.point));
	    return goAfter({
	      axis: axis,
	      moveRelativeTo: page,
	      isMoving: draggablePage
	    });
	  }

	  return goAfter({
	    axis: axis,
	    moveRelativeTo: last.page,
	    isMoving: draggablePage
	  });
	});

	var withDroppableDisplacement = (function (droppable, point) {
	  var frame = droppable.frame;

	  if (!frame) {
	    return point;
	  }

	  return add(point, frame.scroll.diff.displacement);
	});

	var getResultWithoutDroppableDisplacement = function getResultWithoutDroppableDisplacement(_ref) {
	  var impact = _ref.impact,
	      draggable = _ref.draggable,
	      droppable = _ref.droppable,
	      draggables = _ref.draggables,
	      onLift = _ref.onLift;
	  var merge = impact.merge;
	  var destination = impact.destination;
	  var original = draggable.page.borderBox.center;

	  if (!droppable) {
	    return original;
	  }

	  if (destination) {
	    return whenReordering({
	      movement: impact.movement,
	      draggable: draggable,
	      draggables: draggables,
	      droppable: droppable,
	      onLift: onLift
	    });
	  }

	  if (merge) {
	    return whenCombining({
	      movement: impact.movement,
	      combine: merge.combine,
	      draggables: draggables,
	      onLift: onLift
	    });
	  }

	  return original;
	};

	var getPageBorderBoxCenterFromImpact = (function (args) {
	  var withoutDisplacement = getResultWithoutDroppableDisplacement(args);
	  var droppable = args.droppable;
	  var withDisplacement = droppable ? withDroppableDisplacement(droppable, withoutDisplacement) : withoutDisplacement;
	  return withDisplacement;
	});

	var scrollViewport = (function (viewport, newScroll) {
	  var diff = subtract(newScroll, viewport.scroll.initial);
	  var displacement = negate(diff);
	  var frame = getRect({
	    top: newScroll.y,
	    bottom: newScroll.y + viewport.frame.height,
	    left: newScroll.x,
	    right: newScroll.x + viewport.frame.width
	  });
	  var updated = {
	    frame: frame,
	    scroll: {
	      initial: viewport.scroll.initial,
	      max: viewport.scroll.max,
	      current: newScroll,
	      diff: {
	        value: diff,
	        displacement: displacement
	      }
	    }
	  };
	  return updated;
	});

	var withNewDisplacement = (function (impact, displaced) {
	  return _extends({}, impact, {
	    movement: _extends({}, impact.movement, {
	      displaced: displaced,
	      map: getDisplacementMap(displaced)
	    })
	  });
	});

	var speculativelyIncrease = (function (_ref) {
	  var impact = _ref.impact,
	      viewport = _ref.viewport,
	      destination = _ref.destination,
	      draggables = _ref.draggables,
	      maxScrollChange = _ref.maxScrollChange,
	      onLift = _ref.onLift;
	  var displaced = impact.movement.displaced;
	  var scrolledViewport = scrollViewport(viewport, add(viewport.scroll.current, maxScrollChange));
	  var scrolledDroppable = destination.frame ? scrollDroppable(destination, add(destination.frame.scroll.current, maxScrollChange)) : destination;
	  var updated = displaced.map(function (entry) {
	    if (entry.isVisible) {
	      return entry;
	    }

	    var draggable = draggables[entry.draggableId];
	    var withScrolledViewport = getDisplacement({
	      draggable: draggable,
	      destination: destination,
	      previousImpact: impact,
	      viewport: scrolledViewport.frame,
	      onLift: onLift,
	      forceShouldAnimate: false
	    });

	    if (withScrolledViewport.isVisible) {
	      return withScrolledViewport;
	    }

	    var withScrolledDroppable = getDisplacement({
	      draggable: draggable,
	      destination: scrolledDroppable,
	      previousImpact: impact,
	      viewport: viewport.frame,
	      onLift: onLift,
	      forceShouldAnimate: false
	    });

	    if (withScrolledDroppable.isVisible) {
	      return withScrolledDroppable;
	    }

	    return entry;
	  });
	  return withNewDisplacement(impact, updated);
	});

	var withViewportDisplacement = (function (viewport, point) {
	  return add(viewport.scroll.diff.displacement, point);
	});

	var getClientFromPageBorderBoxCenter = (function (_ref) {
	  var pageBorderBoxCenter = _ref.pageBorderBoxCenter,
	      draggable = _ref.draggable,
	      viewport = _ref.viewport;
	  var withoutPageScrollChange = withViewportDisplacement(viewport, pageBorderBoxCenter);
	  var offset = subtract(withoutPageScrollChange, draggable.page.borderBox.center);
	  return add(draggable.client.borderBox.center, offset);
	});

	var isTotallyVisibleInNewLocation = (function (_ref) {
	  var draggable = _ref.draggable,
	      destination = _ref.destination,
	      newPageBorderBoxCenter = _ref.newPageBorderBoxCenter,
	      viewport = _ref.viewport,
	      withDroppableDisplacement = _ref.withDroppableDisplacement,
	      _ref$onlyOnMainAxis = _ref.onlyOnMainAxis,
	      onlyOnMainAxis = _ref$onlyOnMainAxis === void 0 ? false : _ref$onlyOnMainAxis;
	  var changeNeeded = subtract(newPageBorderBoxCenter, draggable.page.borderBox.center);
	  var shifted = offsetByPosition(draggable.page.borderBox, changeNeeded);
	  var args = {
	    target: shifted,
	    destination: destination,
	    withDroppableDisplacement: withDroppableDisplacement,
	    viewport: viewport
	  };
	  return onlyOnMainAxis ? isTotallyVisibleOnAxis(args) : isTotallyVisible(args);
	});

	var moveToNextPlace = (function (_ref) {
	  var isMovingForward = _ref.isMovingForward,
	      draggable = _ref.draggable,
	      destination = _ref.destination,
	      draggables = _ref.draggables,
	      previousImpact = _ref.previousImpact,
	      viewport = _ref.viewport,
	      previousPageBorderBoxCenter = _ref.previousPageBorderBoxCenter,
	      previousClientSelection = _ref.previousClientSelection,
	      onLift = _ref.onLift;

	  if (!destination.isEnabled) {
	    return null;
	  }

	  var insideDestination = getDraggablesInsideDroppable(destination.descriptor.id, draggables);
	  var isInHomeList = isHomeOf(draggable, destination);
	  var impact = moveToNextCombine({
	    isInHomeList: isInHomeList,
	    isMovingForward: isMovingForward,
	    draggable: draggable,
	    destination: destination,
	    insideDestination: insideDestination,
	    previousImpact: previousImpact
	  }) || moveToNextIndex({
	    isMovingForward: isMovingForward,
	    isInHomeList: isInHomeList,
	    draggable: draggable,
	    draggables: draggables,
	    destination: destination,
	    insideDestination: insideDestination,
	    previousImpact: previousImpact,
	    onLift: onLift
	  });

	  if (!impact) {
	    return null;
	  }

	  var pageBorderBoxCenter = getPageBorderBoxCenterFromImpact({
	    impact: impact,
	    draggable: draggable,
	    droppable: destination,
	    draggables: draggables,
	    onLift: onLift
	  });
	  var isVisibleInNewLocation = isTotallyVisibleInNewLocation({
	    draggable: draggable,
	    destination: destination,
	    newPageBorderBoxCenter: pageBorderBoxCenter,
	    viewport: viewport.frame,
	    withDroppableDisplacement: false,
	    onlyOnMainAxis: true
	  });

	  if (isVisibleInNewLocation) {
	    var clientSelection = getClientFromPageBorderBoxCenter({
	      pageBorderBoxCenter: pageBorderBoxCenter,
	      draggable: draggable,
	      viewport: viewport
	    });
	    return {
	      clientSelection: clientSelection,
	      impact: impact,
	      scrollJumpRequest: null
	    };
	  }

	  var distance = subtract(pageBorderBoxCenter, previousPageBorderBoxCenter);
	  var cautious = speculativelyIncrease({
	    impact: impact,
	    viewport: viewport,
	    destination: destination,
	    draggables: draggables,
	    maxScrollChange: distance,
	    onLift: onLift
	  });
	  return {
	    clientSelection: previousClientSelection,
	    impact: cautious,
	    scrollJumpRequest: distance
	  };
	});

	var getKnownActive = function getKnownActive(droppable) {
	  var rect = droppable.subject.active;
	  !rect ? invariant(false, 'Cannot get clipped area from droppable') : void 0;
	  return rect;
	};

	var getBestCrossAxisDroppable = (function (_ref) {
	  var isMovingForward = _ref.isMovingForward,
	      pageBorderBoxCenter = _ref.pageBorderBoxCenter,
	      source = _ref.source,
	      droppables = _ref.droppables,
	      viewport = _ref.viewport;
	  var active = source.subject.active;

	  if (!active) {
	    return null;
	  }

	  var axis = source.axis;
	  var isBetweenSourceClipped = isWithin(active[axis.start], active[axis.end]);
	  var candidates = toDroppableList(droppables).filter(function (droppable) {
	    return droppable !== source;
	  }).filter(function (droppable) {
	    return droppable.isEnabled;
	  }).filter(function (droppable) {
	    return Boolean(droppable.subject.active);
	  }).filter(function (droppable) {
	    return isPartiallyVisibleThroughFrame(viewport.frame)(getKnownActive(droppable));
	  }).filter(function (droppable) {
	    var activeOfTarget = getKnownActive(droppable);

	    if (isMovingForward) {
	      return active[axis.crossAxisEnd] < activeOfTarget[axis.crossAxisEnd];
	    }

	    return activeOfTarget[axis.crossAxisStart] < active[axis.crossAxisStart];
	  }).filter(function (droppable) {
	    var activeOfTarget = getKnownActive(droppable);
	    var isBetweenDestinationClipped = isWithin(activeOfTarget[axis.start], activeOfTarget[axis.end]);
	    return isBetweenSourceClipped(activeOfTarget[axis.start]) || isBetweenSourceClipped(activeOfTarget[axis.end]) || isBetweenDestinationClipped(active[axis.start]) || isBetweenDestinationClipped(active[axis.end]);
	  }).sort(function (a, b) {
	    var first = getKnownActive(a)[axis.crossAxisStart];
	    var second = getKnownActive(b)[axis.crossAxisStart];

	    if (isMovingForward) {
	      return first - second;
	    }

	    return second - first;
	  }).filter(function (droppable, index, array) {
	    return getKnownActive(droppable)[axis.crossAxisStart] === getKnownActive(array[0])[axis.crossAxisStart];
	  });

	  if (!candidates.length) {
	    return null;
	  }

	  if (candidates.length === 1) {
	    return candidates[0];
	  }

	  var contains = candidates.filter(function (droppable) {
	    var isWithinDroppable = isWithin(getKnownActive(droppable)[axis.start], getKnownActive(droppable)[axis.end]);
	    return isWithinDroppable(pageBorderBoxCenter[axis.line]);
	  });

	  if (contains.length === 1) {
	    return contains[0];
	  }

	  if (contains.length > 1) {
	    return contains.sort(function (a, b) {
	      return getKnownActive(a)[axis.start] - getKnownActive(b)[axis.start];
	    })[0];
	  }

	  return candidates.sort(function (a, b) {
	    var first = closest(pageBorderBoxCenter, getCorners(getKnownActive(a)));
	    var second = closest(pageBorderBoxCenter, getCorners(getKnownActive(b)));

	    if (first !== second) {
	      return first - second;
	    }

	    return getKnownActive(a)[axis.start] - getKnownActive(b)[axis.start];
	  })[0];
	});

	var getCurrentPageBorderBoxCenter = function getCurrentPageBorderBoxCenter(draggable, onLift) {
	  var original = draggable.page.borderBox.center;
	  return didStartDisplaced(draggable.descriptor.id, onLift) ? subtract(original, onLift.displacedBy.point) : original;
	};
	var getCurrentPageBorderBox = function getCurrentPageBorderBox(draggable, onLift) {
	  var original = draggable.page.borderBox;
	  return didStartDisplaced(draggable.descriptor.id, onLift) ? offsetByPosition(original, negate(onLift.displacedBy.point)) : original;
	};

	var getClosestDraggable = (function (_ref) {
	  var pageBorderBoxCenter = _ref.pageBorderBoxCenter,
	      viewport = _ref.viewport,
	      destination = _ref.destination,
	      insideDestination = _ref.insideDestination,
	      onLift = _ref.onLift;
	  var sorted = insideDestination.filter(function (draggable) {
	    return isTotallyVisible({
	      target: getCurrentPageBorderBox(draggable, onLift),
	      destination: destination,
	      viewport: viewport.frame,
	      withDroppableDisplacement: true
	    });
	  }).sort(function (a, b) {
	    var distanceToA = distance(pageBorderBoxCenter, withDroppableDisplacement(destination, getCurrentPageBorderBoxCenter(a, onLift)));
	    var distanceToB = distance(pageBorderBoxCenter, withDroppableDisplacement(destination, getCurrentPageBorderBoxCenter(b, onLift)));

	    if (distanceToA < distanceToB) {
	      return -1;
	    }

	    if (distanceToB < distanceToA) {
	      return 1;
	    }

	    return a.descriptor.index - b.descriptor.index;
	  });
	  return sorted[0] || null;
	});

	var moveToNewDroppable = (function (_ref) {
	  var previousPageBorderBoxCenter = _ref.previousPageBorderBoxCenter,
	      moveRelativeTo = _ref.moveRelativeTo,
	      insideDestination = _ref.insideDestination,
	      draggable = _ref.draggable,
	      draggables = _ref.draggables,
	      destination = _ref.destination,
	      previousImpact = _ref.previousImpact,
	      viewport = _ref.viewport,
	      onLift = _ref.onLift;

	  if (!moveRelativeTo) {
	    if (insideDestination.length) {
	      return null;
	    }

	    var proposed = {
	      movement: noMovement,
	      destination: {
	        droppableId: destination.descriptor.id,
	        index: 0
	      },
	      merge: null
	    };
	    var proposedPageBorderBoxCenter = getPageBorderBoxCenterFromImpact({
	      impact: proposed,
	      draggable: draggable,
	      droppable: destination,
	      draggables: draggables,
	      onLift: onLift
	    });
	    var withPlaceholder = isHomeOf(draggable, destination) ? destination : addPlaceholder(destination, draggable, draggables);
	    var isVisibleInNewLocation = isTotallyVisibleInNewLocation({
	      draggable: draggable,
	      destination: withPlaceholder,
	      newPageBorderBoxCenter: proposedPageBorderBoxCenter,
	      viewport: viewport.frame,
	      withDroppableDisplacement: false,
	      onlyOnMainAxis: true
	    });
	    return isVisibleInNewLocation ? proposed : null;
	  }

	  var isGoingBeforeTarget = Boolean(previousPageBorderBoxCenter[destination.axis.line] < moveRelativeTo.page.borderBox.center[destination.axis.line]);
	  var targetIndex = insideDestination.indexOf(moveRelativeTo);
	  !(targetIndex !== -1) ? invariant(false, 'Cannot find target in list') : void 0;

	  var proposedIndex = function () {
	    if (moveRelativeTo.descriptor.id === draggable.descriptor.id) {
	      return targetIndex;
	    }

	    if (isGoingBeforeTarget) {
	      return targetIndex;
	    }

	    return targetIndex + 1;
	  }();

	  var displaced = removeDraggableFromList(draggable, insideDestination).slice(proposedIndex).map(function (dimension) {
	    return getDisplacement({
	      draggable: dimension,
	      destination: destination,
	      viewport: viewport.frame,
	      previousImpact: previousImpact,
	      onLift: onLift
	    });
	  });
	  var displacedBy = getDisplacedBy(destination.axis, draggable.displaceBy);
	  var impact = {
	    movement: {
	      displacedBy: displacedBy,
	      displaced: displaced,
	      map: getDisplacementMap(displaced)
	    },
	    destination: {
	      droppableId: destination.descriptor.id,
	      index: proposedIndex
	    },
	    merge: null
	  };
	  return impact;
	});

	var moveCrossAxis = (function (_ref) {
	  var isMovingForward = _ref.isMovingForward,
	      previousPageBorderBoxCenter = _ref.previousPageBorderBoxCenter,
	      draggable = _ref.draggable,
	      isOver = _ref.isOver,
	      draggables = _ref.draggables,
	      droppables = _ref.droppables,
	      previousImpact = _ref.previousImpact,
	      viewport = _ref.viewport,
	      onLift = _ref.onLift;
	  var destination = getBestCrossAxisDroppable({
	    isMovingForward: isMovingForward,
	    pageBorderBoxCenter: previousPageBorderBoxCenter,
	    source: isOver,
	    droppables: droppables,
	    viewport: viewport
	  });

	  if (!destination) {
	    return null;
	  }

	  var insideDestination = getDraggablesInsideDroppable(destination.descriptor.id, draggables);
	  var moveRelativeTo = getClosestDraggable({
	    pageBorderBoxCenter: previousPageBorderBoxCenter,
	    viewport: viewport,
	    destination: destination,
	    insideDestination: insideDestination,
	    onLift: onLift
	  });
	  var impact = moveToNewDroppable({
	    previousPageBorderBoxCenter: previousPageBorderBoxCenter,
	    destination: destination,
	    draggable: draggable,
	    draggables: draggables,
	    moveRelativeTo: moveRelativeTo,
	    insideDestination: insideDestination,
	    previousImpact: previousImpact,
	    viewport: viewport,
	    onLift: onLift
	  });

	  if (!impact) {
	    return null;
	  }

	  var pageBorderBoxCenter = getPageBorderBoxCenterFromImpact({
	    impact: impact,
	    draggable: draggable,
	    droppable: destination,
	    draggables: draggables,
	    onLift: onLift
	  });
	  var clientSelection = getClientFromPageBorderBoxCenter({
	    pageBorderBoxCenter: pageBorderBoxCenter,
	    draggable: draggable,
	    viewport: viewport
	  });
	  return {
	    clientSelection: clientSelection,
	    impact: impact,
	    scrollJumpRequest: null
	  };
	});

	var getDroppableOver$1 = function getDroppableOver(impact, droppables) {
	  var id = whatIsDraggedOver(impact);
	  return id ? droppables[id] : null;
	};

	var moveInDirection = (function (_ref) {
	  var state = _ref.state,
	      type = _ref.type;
	  var isActuallyOver = getDroppableOver$1(state.impact, state.dimensions.droppables);
	  var isMainAxisMovementAllowed = Boolean(isActuallyOver);
	  var home = state.dimensions.droppables[state.critical.droppable.id];
	  var isOver = isActuallyOver || home;
	  var direction = isOver.axis.direction;
	  var isMovingOnMainAxis = direction === 'vertical' && (type === 'MOVE_UP' || type === 'MOVE_DOWN') || direction === 'horizontal' && (type === 'MOVE_LEFT' || type === 'MOVE_RIGHT');

	  if (isMovingOnMainAxis && !isMainAxisMovementAllowed) {
	    return null;
	  }

	  var isMovingForward = type === 'MOVE_DOWN' || type === 'MOVE_RIGHT';
	  var draggable = state.dimensions.draggables[state.critical.draggable.id];
	  var previousPageBorderBoxCenter = state.current.page.borderBoxCenter;
	  var _state$dimensions = state.dimensions,
	      draggables = _state$dimensions.draggables,
	      droppables = _state$dimensions.droppables;
	  return isMovingOnMainAxis ? moveToNextPlace({
	    isMovingForward: isMovingForward,
	    previousPageBorderBoxCenter: previousPageBorderBoxCenter,
	    draggable: draggable,
	    destination: isOver,
	    draggables: draggables,
	    viewport: state.viewport,
	    previousClientSelection: state.current.client.selection,
	    previousImpact: state.impact,
	    onLift: state.onLift
	  }) : moveCrossAxis({
	    isMovingForward: isMovingForward,
	    previousPageBorderBoxCenter: previousPageBorderBoxCenter,
	    draggable: draggable,
	    isOver: isOver,
	    draggables: draggables,
	    droppables: droppables,
	    previousImpact: state.impact,
	    viewport: state.viewport,
	    onLift: state.onLift
	  });
	});

	function isMovementAllowed(state) {
	  return state.phase === 'DRAGGING' || state.phase === 'COLLECTING';
	}

	var getVertical = function getVertical(previous, diff) {
	  if (diff === 0) {
	    return previous;
	  }

	  return diff > 0 ? 'down' : 'up';
	};

	var getHorizontal = function getHorizontal(previous, diff) {
	  if (diff === 0) {
	    return previous;
	  }

	  return diff > 0 ? 'right' : 'left';
	};

	var getUserDirection = (function (previous, oldPageBorderBoxCenter, newPageBorderBoxCenter) {
	  var diff = subtract(newPageBorderBoxCenter, oldPageBorderBoxCenter);
	  return {
	    horizontal: getHorizontal(previous.horizontal, diff.x),
	    vertical: getVertical(previous.vertical, diff.y)
	  };
	});

	var update = (function (_ref) {
	  var state = _ref.state,
	      forcedClientSelection = _ref.clientSelection,
	      forcedDimensions = _ref.dimensions,
	      forcedViewport = _ref.viewport,
	      forcedImpact = _ref.impact,
	      scrollJumpRequest = _ref.scrollJumpRequest;
	  var viewport = forcedViewport || state.viewport;
	  var currentWindowScroll = viewport.scroll.current;
	  var dimensions = forcedDimensions || state.dimensions;
	  var clientSelection = forcedClientSelection || state.current.client.selection;
	  var offset = subtract(clientSelection, state.initial.client.selection);
	  var client = {
	    offset: offset,
	    selection: clientSelection,
	    borderBoxCenter: add(state.initial.client.borderBoxCenter, offset)
	  };
	  var page = {
	    selection: add(client.selection, currentWindowScroll),
	    borderBoxCenter: add(client.borderBoxCenter, currentWindowScroll)
	  };
	  var current = {
	    client: client,
	    page: page
	  };
	  var userDirection = getUserDirection(state.userDirection, state.current.page.borderBoxCenter, current.page.borderBoxCenter);

	  if (state.phase === 'COLLECTING') {
	    return _extends({
	      phase: 'COLLECTING'
	    }, state, {
	      dimensions: dimensions,
	      viewport: viewport,
	      current: current,
	      userDirection: userDirection
	    });
	  }

	  var draggable = dimensions.draggables[state.critical.draggable.id];
	  var newImpact = forcedImpact || getDragImpact({
	    pageBorderBoxCenter: page.borderBoxCenter,
	    draggable: draggable,
	    draggables: dimensions.draggables,
	    droppables: dimensions.droppables,
	    previousImpact: state.impact,
	    viewport: viewport,
	    userDirection: userDirection,
	    onLift: state.onLift
	  });
	  var withUpdatedPlaceholders = recomputePlaceholders({
	    draggable: draggable,
	    impact: newImpact,
	    previousImpact: state.impact,
	    draggables: dimensions.draggables,
	    droppables: dimensions.droppables
	  });

	  var result = _extends({}, state, {
	    current: current,
	    userDirection: userDirection,
	    dimensions: {
	      draggables: dimensions.draggables,
	      droppables: withUpdatedPlaceholders
	    },
	    impact: newImpact,
	    viewport: viewport,
	    scrollJumpRequest: scrollJumpRequest || null,
	    forceShouldAnimate: scrollJumpRequest ? false : null
	  });

	  return result;
	});

	var recompute = (function (_ref) {
	  var impact = _ref.impact,
	      viewport = _ref.viewport,
	      destination = _ref.destination,
	      draggables = _ref.draggables,
	      onLift = _ref.onLift,
	      forceShouldAnimate = _ref.forceShouldAnimate;
	  var updated = impact.movement.displaced.map(function (entry) {
	    return getDisplacement({
	      draggable: draggables[entry.draggableId],
	      destination: destination,
	      previousImpact: impact,
	      viewport: viewport.frame,
	      onLift: onLift,
	      forceShouldAnimate: forceShouldAnimate
	    });
	  });
	  return withNewDisplacement(impact, updated);
	});

	var getClientBorderBoxCenter = (function (_ref) {
	  var impact = _ref.impact,
	      draggable = _ref.draggable,
	      droppable = _ref.droppable,
	      draggables = _ref.draggables,
	      viewport = _ref.viewport,
	      onLift = _ref.onLift;
	  var pageBorderBoxCenter = getPageBorderBoxCenterFromImpact({
	    impact: impact,
	    draggable: draggable,
	    draggables: draggables,
	    droppable: droppable,
	    onLift: onLift
	  });
	  return getClientFromPageBorderBoxCenter({
	    pageBorderBoxCenter: pageBorderBoxCenter,
	    draggable: draggable,
	    viewport: viewport
	  });
	});

	var refreshSnap = (function (_ref) {
	  var state = _ref.state,
	      forcedDimensions = _ref.dimensions,
	      forcedViewport = _ref.viewport;
	  !(state.movementMode === 'SNAP') ? invariant(false) : void 0;
	  var needsVisibilityCheck = state.impact;
	  var viewport = forcedViewport || state.viewport;
	  var dimensions = forcedDimensions || state.dimensions;
	  var draggables = dimensions.draggables,
	      droppables = dimensions.droppables;
	  var draggable = draggables[state.critical.draggable.id];
	  var isOver = whatIsDraggedOver(needsVisibilityCheck);
	  !isOver ? invariant(false, 'Must be over a destination in SNAP movement mode') : void 0;
	  var destination = droppables[isOver];
	  var impact = recompute({
	    impact: needsVisibilityCheck,
	    viewport: viewport,
	    destination: destination,
	    draggables: draggables,
	    onLift: state.onLift
	  });
	  var clientSelection = getClientBorderBoxCenter({
	    impact: impact,
	    draggable: draggable,
	    droppable: destination,
	    draggables: draggables,
	    viewport: viewport,
	    onLift: state.onLift
	  });
	  return update({
	    impact: impact,
	    clientSelection: clientSelection,
	    state: state,
	    dimensions: dimensions,
	    viewport: viewport
	  });
	});

	var patchDimensionMap = (function (dimensions, updated) {
	  return {
	    draggables: dimensions.draggables,
	    droppables: patchDroppableMap(dimensions.droppables, updated)
	  };
	});

	var isSnapping = function isSnapping(state) {
	  return state.movementMode === 'SNAP';
	};

	var postDroppableChange = function postDroppableChange(state, updated, isEnabledChanging) {
	  var dimensions = patchDimensionMap(state.dimensions, updated);

	  if (!isSnapping(state) || isEnabledChanging) {
	    return update({
	      state: state,
	      dimensions: dimensions
	    });
	  }

	  return refreshSnap({
	    state: state,
	    dimensions: dimensions
	  });
	};

	var idle = {
	  phase: 'IDLE',
	  completed: null,
	  shouldFlush: false
	};
	var reducer = (function (state, action) {
	  if (state === void 0) {
	    state = idle;
	  }

	  if (action.type === 'CLEAN') {
	    return _extends({}, idle, {
	      shouldFlush: action.payload.shouldFlush
	    });
	  }

	  if (action.type === 'INITIAL_PUBLISH') {
	    !(state.phase === 'IDLE') ? invariant(false, 'INITIAL_PUBLISH must come after a IDLE phase') : void 0;
	    var _action$payload = action.payload,
	        critical = _action$payload.critical,
	        clientSelection = _action$payload.clientSelection,
	        viewport = _action$payload.viewport,
	        dimensions = _action$payload.dimensions,
	        movementMode = _action$payload.movementMode;
	    var draggable = dimensions.draggables[critical.draggable.id];
	    var home = dimensions.droppables[critical.droppable.id];
	    var client = {
	      selection: clientSelection,
	      borderBoxCenter: draggable.client.borderBox.center,
	      offset: origin
	    };
	    var initial = {
	      client: client,
	      page: {
	        selection: add(client.selection, viewport.scroll.initial),
	        borderBoxCenter: add(client.selection, viewport.scroll.initial)
	      }
	    };
	    var isWindowScrollAllowed = toDroppableList(dimensions.droppables).every(function (item) {
	      return !item.isFixedOnPage;
	    });

	    var _getHomeOnLift = getHomeOnLift({
	      draggable: draggable,
	      home: home,
	      draggables: dimensions.draggables,
	      viewport: viewport
	    }),
	        impact = _getHomeOnLift.impact,
	        onLift = _getHomeOnLift.onLift;

	    var result = {
	      phase: 'DRAGGING',
	      isDragging: true,
	      critical: critical,
	      movementMode: movementMode,
	      dimensions: dimensions,
	      initial: initial,
	      current: initial,
	      isWindowScrollAllowed: isWindowScrollAllowed,
	      impact: impact,
	      onLift: onLift,
	      onLiftImpact: impact,
	      viewport: viewport,
	      userDirection: forward,
	      scrollJumpRequest: null,
	      forceShouldAnimate: null
	    };
	    return result;
	  }

	  if (action.type === 'COLLECTION_STARTING') {
	    var _extends2;

	    if (state.phase === 'COLLECTING' || state.phase === 'DROP_PENDING') {
	      return state;
	    }

	    !(state.phase === 'DRAGGING') ? invariant(false, "Collection cannot start from phase " + state.phase) : void 0;

	    var _result = _extends({
	      phase: 'COLLECTING'
	    }, state, (_extends2 = {}, _extends2["phase"] = 'COLLECTING', _extends2));

	    return _result;
	  }

	  if (action.type === 'PUBLISH_WHILE_DRAGGING') {
	    !(state.phase === 'COLLECTING' || state.phase === 'DROP_PENDING') ? invariant(false, "Unexpected " + action.type + " received in phase " + state.phase) : void 0;
	    return publishWhileDragging({
	      state: state,
	      published: action.payload
	    });
	  }

	  if (action.type === 'MOVE') {
	    if (state.phase === 'DROP_PENDING') {
	      return state;
	    }

	    !isMovementAllowed(state) ? invariant(false, action.type + " not permitted in phase " + state.phase) : void 0;
	    var _clientSelection = action.payload.client;

	    if (isEqual(_clientSelection, state.current.client.selection)) {
	      return state;
	    }

	    return update({
	      state: state,
	      clientSelection: _clientSelection,
	      impact: isSnapping(state) ? state.impact : null
	    });
	  }

	  if (action.type === 'UPDATE_DROPPABLE_SCROLL') {
	    if (state.phase === 'DROP_PENDING') {
	      return state;
	    }

	    if (state.phase === 'COLLECTING') {
	      return state;
	    }

	    !isMovementAllowed(state) ? invariant(false, action.type + " not permitted in phase " + state.phase) : void 0;
	    var _action$payload2 = action.payload,
	        id = _action$payload2.id,
	        offset = _action$payload2.offset;
	    var target = state.dimensions.droppables[id];

	    if (!target) {
	      return state;
	    }

	    var scrolled = scrollDroppable(target, offset);
	    return postDroppableChange(state, scrolled, false);
	  }

	  if (action.type === 'UPDATE_DROPPABLE_IS_ENABLED') {
	    if (state.phase === 'DROP_PENDING') {
	      return state;
	    }

	    !isMovementAllowed(state) ? invariant(false, "Attempting to move in an unsupported phase " + state.phase) : void 0;
	    var _action$payload3 = action.payload,
	        _id = _action$payload3.id,
	        isEnabled = _action$payload3.isEnabled;
	    var _target = state.dimensions.droppables[_id];
	    !_target ? invariant(false, "Cannot find Droppable[id: " + _id + "] to toggle its enabled state") : void 0;
	    !(_target.isEnabled !== isEnabled) ? invariant(false, "Trying to set droppable isEnabled to " + String(isEnabled) + "\n      but it is already " + String(_target.isEnabled)) : void 0;

	    var updated = _extends({}, _target, {
	      isEnabled: isEnabled
	    });

	    return postDroppableChange(state, updated, true);
	  }

	  if (action.type === 'UPDATE_DROPPABLE_IS_COMBINE_ENABLED') {
	    if (state.phase === 'DROP_PENDING') {
	      return state;
	    }

	    !isMovementAllowed(state) ? invariant(false, "Attempting to move in an unsupported phase " + state.phase) : void 0;
	    var _action$payload4 = action.payload,
	        _id2 = _action$payload4.id,
	        isCombineEnabled = _action$payload4.isCombineEnabled;
	    var _target2 = state.dimensions.droppables[_id2];
	    !_target2 ? invariant(false, "Cannot find Droppable[id: " + _id2 + "] to toggle its isCombineEnabled state") : void 0;
	    !(_target2.isCombineEnabled !== isCombineEnabled) ? invariant(false, "Trying to set droppable isCombineEnabled to " + String(isCombineEnabled) + "\n      but it is already " + String(_target2.isCombineEnabled)) : void 0;

	    var _updated = _extends({}, _target2, {
	      isCombineEnabled: isCombineEnabled
	    });

	    return postDroppableChange(state, _updated, true);
	  }

	  if (action.type === 'MOVE_BY_WINDOW_SCROLL') {
	    if (state.phase === 'DROP_PENDING' || state.phase === 'DROP_ANIMATING') {
	      return state;
	    }

	    !isMovementAllowed(state) ? invariant(false, "Cannot move by window in phase " + state.phase) : void 0;
	    !state.isWindowScrollAllowed ? invariant(false, 'Window scrolling is currently not supported for fixed lists. Aborting drag') : void 0;
	    var newScroll = action.payload.newScroll;

	    if (isEqual(state.viewport.scroll.current, newScroll)) {
	      return state;
	    }

	    var _viewport = scrollViewport(state.viewport, newScroll);

	    if (isSnapping(state)) {
	      return refreshSnap({
	        state: state,
	        viewport: _viewport
	      });
	    }

	    return update({
	      state: state,
	      viewport: _viewport
	    });
	  }

	  if (action.type === 'UPDATE_VIEWPORT_MAX_SCROLL') {
	    if (!isMovementAllowed(state)) {
	      return state;
	    }

	    var maxScroll = action.payload.maxScroll;

	    if (isEqual(maxScroll, state.viewport.scroll.max)) {
	      return state;
	    }

	    var withMaxScroll = _extends({}, state.viewport, {
	      scroll: _extends({}, state.viewport.scroll, {
	        max: maxScroll
	      })
	    });

	    return _extends({
	      phase: 'DRAGGING'
	    }, state, {
	      viewport: withMaxScroll
	    });
	  }

	  if (action.type === 'MOVE_UP' || action.type === 'MOVE_DOWN' || action.type === 'MOVE_LEFT' || action.type === 'MOVE_RIGHT') {
	    if (state.phase === 'COLLECTING' || state.phase === 'DROP_PENDING') {
	      return state;
	    }

	    !(state.phase === 'DRAGGING') ? invariant(false, action.type + " received while not in DRAGGING phase") : void 0;

	    var _result2 = moveInDirection({
	      state: state,
	      type: action.type
	    });

	    if (!_result2) {
	      return state;
	    }

	    return update({
	      state: state,
	      impact: _result2.impact,
	      clientSelection: _result2.clientSelection,
	      scrollJumpRequest: _result2.scrollJumpRequest
	    });
	  }

	  if (action.type === 'DROP_PENDING') {
	    var _extends3;

	    var reason = action.payload.reason;
	    !(state.phase === 'COLLECTING') ? invariant(false, 'Can only move into the DROP_PENDING phase from the COLLECTING phase') : void 0;

	    var newState = _extends({
	      phase: 'DROP_PENDING'
	    }, state, (_extends3 = {}, _extends3["phase"] = 'DROP_PENDING', _extends3.isWaiting = true, _extends3.reason = reason, _extends3));

	    return newState;
	  }

	  if (action.type === 'DROP_ANIMATE') {
	    var _action$payload5 = action.payload,
	        completed = _action$payload5.completed,
	        dropDuration = _action$payload5.dropDuration,
	        newHomeClientOffset = _action$payload5.newHomeClientOffset;
	    !(state.phase === 'DRAGGING' || state.phase === 'DROP_PENDING') ? invariant(false, "Cannot animate drop from phase " + state.phase) : void 0;
	    var _result3 = {
	      phase: 'DROP_ANIMATING',
	      dimensions: state.dimensions,
	      completed: completed,
	      dropDuration: dropDuration,
	      newHomeClientOffset: newHomeClientOffset
	    };
	    return _result3;
	  }

	  if (action.type === 'DROP_COMPLETE') {
	    var _action$payload6 = action.payload,
	        _completed = _action$payload6.completed,
	        shouldFlush = _action$payload6.shouldFlush;
	    return {
	      phase: 'IDLE',
	      completed: _completed,
	      shouldFlush: shouldFlush
	    };
	  }

	  return state;
	});

	var lift = function lift(args) {
	  return {
	    type: 'LIFT',
	    payload: args
	  };
	};
	var initialPublish = function initialPublish(args) {
	  return {
	    type: 'INITIAL_PUBLISH',
	    payload: args
	  };
	};
	var publishWhileDragging$1 = function publishWhileDragging(args) {
	  return {
	    type: 'PUBLISH_WHILE_DRAGGING',
	    payload: args
	  };
	};
	var collectionStarting = function collectionStarting() {
	  return {
	    type: 'COLLECTION_STARTING',
	    payload: null
	  };
	};
	var updateDroppableScroll = function updateDroppableScroll(args) {
	  return {
	    type: 'UPDATE_DROPPABLE_SCROLL',
	    payload: args
	  };
	};
	var updateDroppableIsEnabled = function updateDroppableIsEnabled(args) {
	  return {
	    type: 'UPDATE_DROPPABLE_IS_ENABLED',
	    payload: args
	  };
	};
	var updateDroppableIsCombineEnabled = function updateDroppableIsCombineEnabled(args) {
	  return {
	    type: 'UPDATE_DROPPABLE_IS_COMBINE_ENABLED',
	    payload: args
	  };
	};
	var move = function move(args) {
	  return {
	    type: 'MOVE',
	    payload: args
	  };
	};
	var moveByWindowScroll = function moveByWindowScroll(args) {
	  return {
	    type: 'MOVE_BY_WINDOW_SCROLL',
	    payload: args
	  };
	};
	var updateViewportMaxScroll = function updateViewportMaxScroll(args) {
	  return {
	    type: 'UPDATE_VIEWPORT_MAX_SCROLL',
	    payload: args
	  };
	};
	var moveUp = function moveUp() {
	  return {
	    type: 'MOVE_UP',
	    payload: null
	  };
	};
	var moveDown = function moveDown() {
	  return {
	    type: 'MOVE_DOWN',
	    payload: null
	  };
	};
	var moveRight = function moveRight() {
	  return {
	    type: 'MOVE_RIGHT',
	    payload: null
	  };
	};
	var moveLeft = function moveLeft() {
	  return {
	    type: 'MOVE_LEFT',
	    payload: null
	  };
	};
	var clean$1 = function clean(args) {
	  if (args === void 0) {
	    args = {
	      shouldFlush: false
	    };
	  }

	  return {
	    type: 'CLEAN',
	    payload: args
	  };
	};
	var animateDrop = function animateDrop(args) {
	  return {
	    type: 'DROP_ANIMATE',
	    payload: args
	  };
	};
	var completeDrop = function completeDrop(args) {
	  return {
	    type: 'DROP_COMPLETE',
	    payload: args
	  };
	};
	var drop = function drop(args) {
	  return {
	    type: 'DROP',
	    payload: args
	  };
	};
	var dropPending = function dropPending(args) {
	  return {
	    type: 'DROP_PENDING',
	    payload: args
	  };
	};
	var dropAnimationFinished = function dropAnimationFinished() {
	  return {
	    type: 'DROP_ANIMATION_FINISHED',
	    payload: null
	  };
	};

	var lift$1 = (function (marshal) {
	  return function (_ref) {
	    var getState = _ref.getState,
	        dispatch = _ref.dispatch;
	    return function (next) {
	      return function (action) {
	        if (action.type !== 'LIFT') {
	          next(action);
	          return;
	        }

	        var _action$payload = action.payload,
	            id = _action$payload.id,
	            clientSelection = _action$payload.clientSelection,
	            movementMode = _action$payload.movementMode;
	        var initial = getState();

	        if (initial.phase === 'DROP_ANIMATING') {
	          dispatch(completeDrop({
	            completed: initial.completed,
	            shouldFlush: true
	          }));
	        }

	        !(getState().phase === 'IDLE') ? invariant(false, 'Incorrect phase to start a drag') : void 0;
	        var scrollOptions = {
	          shouldPublishImmediately: movementMode === 'SNAP'
	        };
	        var request = {
	          draggableId: id,
	          scrollOptions: scrollOptions
	        };

	        var _marshal$startPublish = marshal.startPublishing(request),
	            critical = _marshal$startPublish.critical,
	            dimensions = _marshal$startPublish.dimensions,
	            viewport = _marshal$startPublish.viewport;

	        dispatch(initialPublish({
	          critical: critical,
	          dimensions: dimensions,
	          clientSelection: clientSelection,
	          movementMode: movementMode,
	          viewport: viewport
	        }));
	      };
	    };
	  };
	});

	var style = (function (marshal) {
	  return function () {
	    return function (next) {
	      return function (action) {
	        if (action.type === 'INITIAL_PUBLISH') {
	          marshal.dragging();
	        }

	        if (action.type === 'DROP_ANIMATE') {
	          marshal.dropping(action.payload.completed.result.reason);
	        }

	        if (action.type === 'CLEAN' || action.type === 'DROP_COMPLETE') {
	          marshal.resting();
	        }

	        next(action);
	      };
	    };
	  };
	});

	var curves = {
	  outOfTheWay: 'cubic-bezier(0.2, 0, 0, 1)',
	  drop: 'cubic-bezier(.2,1,.1,1)'
	};
	var combine = {
	  opacity: {
	    drop: 0,
	    combining: 0.7
	  },
	  scale: {
	    drop: 0.75
	  }
	};
	var timings = {
	  outOfTheWay: 0.2,
	  minDropTime: 0.33,
	  maxDropTime: 0.55
	};
	var outOfTheWayTiming = timings.outOfTheWay + "s " + curves.outOfTheWay;
	var transitions = {
	  fluid: "opacity " + outOfTheWayTiming,
	  snap: "transform " + outOfTheWayTiming + ", opacity " + outOfTheWayTiming,
	  drop: function drop(duration) {
	    var timing = duration + "s " + curves.drop;
	    return "transform " + timing + ", opacity " + timing;
	  },
	  outOfTheWay: "transform " + outOfTheWayTiming,
	  placeholder: "height " + outOfTheWayTiming + ", width " + outOfTheWayTiming + ", margin " + outOfTheWayTiming
	};

	var moveTo = function moveTo(offset) {
	  return isEqual(offset, origin) ? null : "translate(" + offset.x + "px, " + offset.y + "px)";
	};

	var transforms = {
	  moveTo: moveTo,
	  drop: function drop(offset, isCombining) {
	    var translate = moveTo(offset);

	    if (!translate) {
	      return null;
	    }

	    if (!isCombining) {
	      return translate;
	    }

	    return translate + " scale(" + combine.scale.drop + ")";
	  }
	};

	var minDropTime = timings.minDropTime,
	    maxDropTime = timings.maxDropTime;
	var dropTimeRange = maxDropTime - minDropTime;
	var maxDropTimeAtDistance = 1500;
	var cancelDropModifier = 0.6;
	var getDropDuration = (function (_ref) {
	  var current = _ref.current,
	      destination = _ref.destination,
	      reason = _ref.reason;
	  var distance$1 = distance(current, destination);

	  if (distance$1 <= 0) {
	    return minDropTime;
	  }

	  if (distance$1 >= maxDropTimeAtDistance) {
	    return maxDropTime;
	  }

	  var percentage = distance$1 / maxDropTimeAtDistance;
	  var duration = minDropTime + dropTimeRange * percentage;
	  var withDuration = reason === 'CANCEL' ? duration * cancelDropModifier : duration;
	  return Number(withDuration.toFixed(2));
	});

	var getNewHomeClientOffset = (function (_ref) {
	  var impact = _ref.impact,
	      draggable = _ref.draggable,
	      dimensions = _ref.dimensions,
	      viewport = _ref.viewport,
	      onLift = _ref.onLift;
	  var draggables = dimensions.draggables,
	      droppables = dimensions.droppables;
	  var droppableId = whatIsDraggedOver(impact);
	  var destination = droppableId ? droppables[droppableId] : null;
	  var home = droppables[draggable.descriptor.droppableId];
	  var newClientCenter = getClientBorderBoxCenter({
	    impact: impact,
	    draggable: draggable,
	    draggables: draggables,
	    onLift: onLift,
	    droppable: destination || home,
	    viewport: viewport
	  });
	  var offset = subtract(newClientCenter, draggable.client.borderBox.center);
	  var merge = impact.merge;

	  if (merge && didStartDisplaced(merge.combine.draggableId, onLift)) {
	    return subtract(offset, onLift.displacedBy.point);
	  }

	  return offset;
	});

	var getDropImpact = (function (_ref) {
	  var reason = _ref.reason,
	      lastImpact = _ref.lastImpact,
	      home = _ref.home,
	      viewport = _ref.viewport,
	      draggables = _ref.draggables,
	      onLiftImpact = _ref.onLiftImpact,
	      onLift = _ref.onLift;
	  var didDropInsideDroppable = reason === 'DROP' && Boolean(whatIsDraggedOver(lastImpact));

	  if (!didDropInsideDroppable) {
	    var impact = recompute({
	      impact: onLiftImpact,
	      destination: home,
	      viewport: viewport,
	      draggables: draggables,
	      onLift: onLift,
	      forceShouldAnimate: true
	    });
	    return {
	      impact: impact,
	      didDropInsideDroppable: didDropInsideDroppable
	    };
	  }

	  if (lastImpact.destination) {
	    return {
	      impact: lastImpact,
	      didDropInsideDroppable: didDropInsideDroppable
	    };
	  }

	  var withoutMovement = _extends({}, lastImpact, {
	    movement: noMovement
	  });

	  return {
	    impact: withoutMovement,
	    didDropInsideDroppable: didDropInsideDroppable
	  };
	});

	var drop$1 = (function (_ref) {
	  var getState = _ref.getState,
	      dispatch = _ref.dispatch;
	  return function (next) {
	    return function (action) {
	      if (action.type !== 'DROP') {
	        next(action);
	        return;
	      }

	      var state = getState();
	      var reason = action.payload.reason;

	      if (state.phase === 'COLLECTING') {
	        dispatch(dropPending({
	          reason: reason
	        }));
	        return;
	      }

	      if (state.phase === 'IDLE') {
	        return;
	      }

	      var isWaitingForDrop = state.phase === 'DROP_PENDING' && state.isWaiting;
	      !!isWaitingForDrop ? invariant(false, 'A DROP action occurred while DROP_PENDING and still waiting') : void 0;
	      !(state.phase === 'DRAGGING' || state.phase === 'DROP_PENDING') ? invariant(false, "Cannot drop in phase: " + state.phase) : void 0;
	      var critical = state.critical;
	      var dimensions = state.dimensions;

	      var _getDropImpact = getDropImpact({
	        reason: reason,
	        lastImpact: state.impact,
	        onLift: state.onLift,
	        onLiftImpact: state.onLiftImpact,
	        home: state.dimensions.droppables[state.critical.droppable.id],
	        viewport: state.viewport,
	        draggables: state.dimensions.draggables
	      }),
	          impact = _getDropImpact.impact,
	          didDropInsideDroppable = _getDropImpact.didDropInsideDroppable;

	      var draggable = dimensions.draggables[state.critical.draggable.id];
	      var destination = didDropInsideDroppable ? impact.destination : null;
	      var combine = didDropInsideDroppable && impact.merge ? impact.merge.combine : null;
	      var source = {
	        index: critical.draggable.index,
	        droppableId: critical.droppable.id
	      };
	      var result = {
	        draggableId: draggable.descriptor.id,
	        type: draggable.descriptor.type,
	        source: source,
	        reason: reason,
	        mode: state.movementMode,
	        destination: destination,
	        combine: combine
	      };
	      var newHomeClientOffset = getNewHomeClientOffset({
	        impact: impact,
	        draggable: draggable,
	        dimensions: dimensions,
	        viewport: state.viewport,
	        onLift: state.onLift
	      });
	      var completed = {
	        critical: state.critical,
	        result: result,
	        impact: impact
	      };
	      var isAnimationRequired = !isEqual(state.current.client.offset, newHomeClientOffset) || Boolean(result.combine);

	      if (!isAnimationRequired) {
	        dispatch(completeDrop({
	          completed: completed,
	          shouldFlush: false
	        }));
	        return;
	      }

	      var dropDuration = getDropDuration({
	        current: state.current.client.offset,
	        destination: newHomeClientOffset,
	        reason: reason
	      });
	      var args = {
	        newHomeClientOffset: newHomeClientOffset,
	        dropDuration: dropDuration,
	        completed: completed
	      };
	      dispatch(animateDrop(args));
	    };
	  };
	});

	var position = function position(index) {
	  return index + 1;
	};

	var onDragStart = function onDragStart(start) {
	  return "\n  You have lifted an item in position " + position(start.source.index) + ".\n  Use the arrow keys to move, space bar to drop, and escape to cancel.\n";
	};

	var withLocation = function withLocation(source, destination) {
	  var isInHomeList = source.droppableId === destination.droppableId;
	  var startPosition = position(source.index);
	  var endPosition = position(destination.index);

	  if (isInHomeList) {
	    return "\n      You have moved the item from position " + startPosition + "\n      to position " + endPosition + "\n    ";
	  }

	  return "\n    You have moved the item from position " + startPosition + "\n    in list " + source.droppableId + "\n    to list " + destination.droppableId + "\n    in position " + endPosition + "\n  ";
	};

	var withCombine = function withCombine(id, source, combine) {
	  var inHomeList = source.droppableId === combine.droppableId;

	  if (inHomeList) {
	    return "\n      The item " + id + "\n      has been combined with " + combine.draggableId;
	  }

	  return "\n      The item " + id + "\n      in list " + source.droppableId + "\n      has been combined with " + combine.draggableId + "\n      in list " + combine.droppableId + "\n    ";
	};

	var onDragUpdate = function onDragUpdate(update) {
	  var location = update.destination;

	  if (location) {
	    return withLocation(update.source, location);
	  }

	  var combine = update.combine;

	  if (combine) {
	    return withCombine(update.draggableId, update.source, combine);
	  }

	  return 'You are over an area that cannot be dropped on';
	};

	var returnedToStart = function returnedToStart(source) {
	  return "\n  The item has returned to its starting position\n  of " + position(source.index) + "\n";
	};

	var onDragEnd = function onDragEnd(result) {
	  if (result.reason === 'CANCEL') {
	    return "\n      Movement cancelled.\n      " + returnedToStart(result.source) + "\n    ";
	  }

	  var location = result.destination;
	  var combine = result.combine;

	  if (location) {
	    return "\n      You have dropped the item.\n      " + withLocation(result.source, location) + "\n    ";
	  }

	  if (combine) {
	    return "\n      You have dropped the item.\n      " + withCombine(result.draggableId, result.source, combine) + "\n    ";
	  }

	  return "\n    The item has been dropped while not over a drop area.\n    " + returnedToStart(result.source) + "\n  ";
	};

	var preset = {
	  onDragStart: onDragStart,
	  onDragUpdate: onDragUpdate,
	  onDragEnd: onDragEnd
	};

	var getExpiringAnnounce = (function (announce) {
	  var wasCalled = false;
	  var isExpired = false;
	  var timeoutId = setTimeout(function () {
	    isExpired = true;
	  });

	  var result = function result(message) {
	    if (wasCalled) {
	      warning('Announcement already made. Not making a second announcement');
	      return;
	    }

	    if (isExpired) {
	      warning("\n        Announcements cannot be made asynchronously.\n        Default message has already been announced.\n      ");
	      return;
	    }

	    wasCalled = true;
	    announce(message);
	    clearTimeout(timeoutId);
	  };

	  result.wasCalled = function () {
	    return wasCalled;
	  };

	  return result;
	});

	var getAsyncMarshal = (function () {
	  var entries = [];

	  var execute = function execute(timerId) {
	    var index = findIndex(entries, function (item) {
	      return item.timerId === timerId;
	    });
	    !(index !== -1) ? invariant(false, 'Could not find timer') : void 0;

	    var _entries$splice = entries.splice(index, 1),
	        entry = _entries$splice[0];

	    entry.callback();
	  };

	  var add = function add(fn) {
	    var timerId = setTimeout(function () {
	      return execute(timerId);
	    });
	    var entry = {
	      timerId: timerId,
	      callback: fn
	    };
	    entries.push(entry);
	  };

	  var flush = function flush() {
	    if (!entries.length) {
	      return;
	    }

	    var shallow = [].concat(entries);
	    entries.length = 0;
	    shallow.forEach(function (entry) {
	      clearTimeout(entry.timerId);
	      entry.callback();
	    });
	  };

	  return {
	    add: add,
	    flush: flush
	  };
	});

	var areLocationsEqual = function areLocationsEqual(first, second) {
	  if (first == null && second == null) {
	    return true;
	  }

	  if (first == null || second == null) {
	    return false;
	  }

	  return first.droppableId === second.droppableId && first.index === second.index;
	};
	var isCombineEqual = function isCombineEqual(first, second) {
	  if (first == null && second == null) {
	    return true;
	  }

	  if (first == null || second == null) {
	    return false;
	  }

	  return first.draggableId === second.draggableId && first.droppableId === second.droppableId;
	};
	var isCriticalEqual = function isCriticalEqual(first, second) {
	  if (first === second) {
	    return true;
	  }

	  var isDraggableEqual = first.draggable.id === second.draggable.id && first.draggable.droppableId === second.draggable.droppableId && first.draggable.type === second.draggable.type && first.draggable.index === second.draggable.index;
	  var isDroppableEqual = first.droppable.id === second.droppable.id && first.droppable.type === second.droppable.type;
	  return isDraggableEqual && isDroppableEqual;
	};

	var withTimings = function withTimings(key, fn) {
	  start(key);
	  fn();
	  finish(key);
	};

	var getDragStart = function getDragStart(critical, mode) {
	  return {
	    draggableId: critical.draggable.id,
	    type: critical.droppable.type,
	    source: {
	      droppableId: critical.droppable.id,
	      index: critical.draggable.index
	    },
	    mode: mode
	  };
	};

	var execute = function execute(responder, data, announce, getDefaultMessage) {
	  if (!responder) {
	    announce(getDefaultMessage(data));
	    return;
	  }

	  var willExpire = getExpiringAnnounce(announce);
	  var provided = {
	    announce: willExpire
	  };
	  responder(data, provided);

	  if (!willExpire.wasCalled()) {
	    announce(getDefaultMessage(data));
	  }
	};

	var getPublisher = (function (getResponders, announce) {
	  var asyncMarshal = getAsyncMarshal();
	  var dragging = null;

	  var beforeStart = function beforeStart(critical, mode) {
	    !!dragging ? invariant(false, 'Cannot fire onBeforeDragStart as a drag start has already been published') : void 0;
	    withTimings('onBeforeDragStart', function () {
	      var fn = getResponders().onBeforeDragStart;

	      if (fn) {
	        fn(getDragStart(critical, mode));
	      }
	    });
	  };

	  var start = function start(critical, mode) {
	    !!dragging ? invariant(false, 'Cannot fire onBeforeDragStart as a drag start has already been published') : void 0;
	    var data = getDragStart(critical, mode);
	    dragging = {
	      mode: mode,
	      lastCritical: critical,
	      lastLocation: data.source,
	      lastCombine: null
	    };
	    asyncMarshal.add(function () {
	      withTimings('onDragStart', function () {
	        return execute(getResponders().onDragStart, data, announce, preset.onDragStart);
	      });
	    });
	  };

	  var update = function update(critical, impact) {
	    var location = impact.destination;
	    var combine = impact.merge ? impact.merge.combine : null;
	    !dragging ? invariant(false, 'Cannot fire onDragMove when onDragStart has not been called') : void 0;
	    var hasCriticalChanged = !isCriticalEqual(critical, dragging.lastCritical);

	    if (hasCriticalChanged) {
	      dragging.lastCritical = critical;
	    }

	    var hasLocationChanged = !areLocationsEqual(dragging.lastLocation, location);

	    if (hasLocationChanged) {
	      dragging.lastLocation = location;
	    }

	    var hasGroupingChanged = !isCombineEqual(dragging.lastCombine, combine);

	    if (hasGroupingChanged) {
	      dragging.lastCombine = combine;
	    }

	    if (!hasCriticalChanged && !hasLocationChanged && !hasGroupingChanged) {
	      return;
	    }

	    var data = _extends({}, getDragStart(critical, dragging.mode), {
	      combine: combine,
	      destination: location
	    });

	    asyncMarshal.add(function () {
	      withTimings('onDragUpdate', function () {
	        return execute(getResponders().onDragUpdate, data, announce, preset.onDragUpdate);
	      });
	    });
	  };

	  var flush = function flush() {
	    !dragging ? invariant(false, 'Can only flush responders while dragging') : void 0;
	    asyncMarshal.flush();
	  };

	  var drop = function drop(result) {
	    !dragging ? invariant(false, 'Cannot fire onDragEnd when there is no matching onDragStart') : void 0;
	    dragging = null;
	    withTimings('onDragEnd', function () {
	      return execute(getResponders().onDragEnd, result, announce, preset.onDragEnd);
	    });
	  };

	  var abort = function abort() {
	    if (!dragging) {
	      return;
	    }

	    var result = _extends({}, getDragStart(dragging.lastCritical, dragging.mode), {
	      combine: null,
	      destination: null,
	      reason: 'CANCEL'
	    });

	    drop(result);
	  };

	  return {
	    beforeStart: beforeStart,
	    start: start,
	    update: update,
	    flush: flush,
	    drop: drop,
	    abort: abort
	  };
	});

	var responders = (function (getResponders, announce) {
	  var publisher = getPublisher(getResponders, announce);
	  return function (store) {
	    return function (next) {
	      return function (action) {
	        if (action.type === 'INITIAL_PUBLISH') {
	          var critical = action.payload.critical;
	          publisher.beforeStart(critical, action.payload.movementMode);
	          next(action);
	          publisher.start(critical, action.payload.movementMode);
	          return;
	        }

	        if (action.type === 'DROP_COMPLETE') {
	          var result = action.payload.completed.result;
	          publisher.flush();
	          next(action);
	          publisher.drop(result);
	          return;
	        }

	        next(action);

	        if (action.type === 'CLEAN') {
	          publisher.abort();
	          return;
	        }

	        var state = store.getState();

	        if (state.phase === 'DRAGGING') {
	          publisher.update(state.critical, state.impact);
	        }
	      };
	    };
	  };
	});

	var dropAnimationFinish = (function (store) {
	  return function (next) {
	    return function (action) {
	      if (action.type !== 'DROP_ANIMATION_FINISHED') {
	        next(action);
	        return;
	      }

	      var state = store.getState();
	      !(state.phase === 'DROP_ANIMATING') ? invariant(false, 'Cannot finish a drop animating when no drop is occurring') : void 0;
	      store.dispatch(completeDrop({
	        completed: state.completed,
	        shouldFlush: false
	      }));
	    };
	  };
	});

	var dimensionMarshalStopper = (function (marshal) {
	  return function () {
	    return function (next) {
	      return function (action) {
	        if (action.type === 'DROP_COMPLETE' || action.type === 'CLEAN' || action.type === 'DROP_ANIMATE') {
	          marshal.stopPublishing();
	        }

	        next(action);
	      };
	    };
	  };
	});

	var shouldEnd = function shouldEnd(action) {
	  return action.type === 'DROP_COMPLETE' || action.type === 'DROP_ANIMATE' || action.type === 'CLEAN';
	};

	var shouldCancelPending = function shouldCancelPending(action) {
	  return action.type === 'COLLECTION_STARTING';
	};

	var autoScroll = (function (autoScroller) {
	  return function (store) {
	    return function (next) {
	      return function (action) {
	        if (shouldEnd(action)) {
	          autoScroller.stop();
	          next(action);
	          return;
	        }

	        if (shouldCancelPending(action)) {
	          autoScroller.cancelPending();
	          next(action);
	          return;
	        }

	        if (action.type === 'INITIAL_PUBLISH') {
	          next(action);
	          var state = store.getState();
	          !(state.phase === 'DRAGGING') ? invariant(false, 'Expected phase to be DRAGGING after INITIAL_PUBLISH') : void 0;
	          autoScroller.start(state);
	          return;
	        }

	        next(action);
	        autoScroller.scroll(store.getState());
	      };
	    };
	  };
	});

	var pendingDrop = (function (store) {
	  return function (next) {
	    return function (action) {
	      next(action);

	      if (action.type !== 'PUBLISH_WHILE_DRAGGING') {
	        return;
	      }

	      var postActionState = store.getState();

	      if (postActionState.phase !== 'DROP_PENDING') {
	        return;
	      }

	      if (postActionState.isWaiting) {
	        return;
	      }

	      store.dispatch(drop({
	        reason: postActionState.reason
	      }));
	    };
	  };
	});

	var composeEnhancers = typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;
	var createStore$1 = (function (_ref) {
	  var dimensionMarshal = _ref.dimensionMarshal,
	      styleMarshal = _ref.styleMarshal,
	      getResponders = _ref.getResponders,
	      announce = _ref.announce,
	      autoScroller = _ref.autoScroller;
	  return createStore(reducer, composeEnhancers(applyMiddleware(style(styleMarshal), dimensionMarshalStopper(dimensionMarshal), lift$1(dimensionMarshal), drop$1, dropAnimationFinish, pendingDrop, autoScroll(autoScroller), responders(getResponders, announce))));
	});

	// most Object methods by ES6 should accept primitives



	var _objectSap = function (KEY, exec) {
	  var fn = (_core.Object || {})[KEY] || Object[KEY];
	  var exp = {};
	  exp[KEY] = exec(fn);
	  _export(_export.S + _export.F * _fails(function () { fn(1); }), 'Object', exp);
	};

	// 19.1.2.14 Object.keys(O)



	_objectSap('keys', function () {
	  return function keys(it) {
	    return _objectKeys(_toObject(it));
	  };
	});

	var keys = _core.Object.keys;

	var keys$1 = keys;

	var clean$2 = function clean() {
	  return {
	    additions: {},
	    removals: {},
	    modified: {}
	  };
	};

	var timingKey = 'Publish collection from DOM';
	var createPublisher = (function (_ref) {
	  var getEntries = _ref.getEntries,
	      callbacks = _ref.callbacks;

	  var advancedUsageWarning = function () {

	    var hasAnnounced = false;
	    return function () {
	      if (hasAnnounced) {
	        return;
	      }

	      hasAnnounced = true;
	      warning("\n        Advanced usage warning: you are adding or removing a dimension during a drag\n        This an advanced feature.\n\n        More information: https://github.com/atlassian/react-beautiful-dnd/blob/master/docs/guides/changes-while-dragging.md\n      ");
	    };
	  }();

	  var staging = clean$2();
	  var frameId = null;

	  var collect = function collect() {
	    advancedUsageWarning();

	    if (frameId) {
	      return;
	    }

	    frameId = requestAnimationFrame(function () {
	      frameId = null;
	      callbacks.collectionStarting();
	      var critical = callbacks.getCritical();
	      start(timingKey);
	      var entries = getEntries();
	      var _staging = staging,
	          additions = _staging.additions,
	          removals = _staging.removals,
	          modified = _staging.modified;

	      var added = keys$1(additions).map(function (id) {
	        return entries.draggables[id].getDimension(origin);
	      }).sort(function (a, b) {
	        return a.descriptor.index - b.descriptor.index;
	      });

	      var updated = keys$1(modified).map(function (id) {
	        var entry = entries.droppables[id];
	        !entry ? invariant(false, 'Cannot find dynamically added droppable in cache') : void 0;
	        var isHome = entry.descriptor.id === critical.droppable.id;
	        var options = {
	          withoutPlaceholder: !isHome
	        };
	        return entry.callbacks.recollect(options);
	      });

	      var result = {
	        additions: added,
	        removals: keys$1(removals),
	        modified: updated
	      };
	      staging = clean$2();
	      finish(timingKey);
	      callbacks.publish(result);
	    });
	  };

	  var add = function add(descriptor) {
	    staging.additions[descriptor.id] = descriptor;
	    staging.modified[descriptor.droppableId] = true;

	    if (staging.removals[descriptor.id]) {
	      delete staging.removals[descriptor.id];
	    }

	    collect();
	  };

	  var remove = function remove(descriptor) {
	    staging.removals[descriptor.id] = descriptor;
	    staging.modified[descriptor.droppableId] = true;

	    if (staging.additions[descriptor.id]) {
	      delete staging.additions[descriptor.id];
	    }

	    collect();
	  };

	  var stop = function stop() {
	    if (!frameId) {
	      return;
	    }

	    cancelAnimationFrame(frameId);
	    frameId = null;
	    staging = clean$2();
	  };

	  return {
	    add: add,
	    remove: remove,
	    stop: stop
	  };
	});

	var getWindowScroll$1 = (function () {
	  return {
	    x: window.pageXOffset,
	    y: window.pageYOffset
	  };
	});

	var getDocumentElement = (function () {
	  var doc = document.documentElement;
	  !doc ? invariant(false, 'Cannot find document.documentElement') : void 0;
	  return doc;
	});

	var getMaxWindowScroll = (function () {
	  var doc = getDocumentElement();
	  var maxScroll = getMaxScroll({
	    scrollHeight: doc.scrollHeight,
	    scrollWidth: doc.scrollWidth,
	    width: doc.clientWidth,
	    height: doc.clientHeight
	  });
	  return maxScroll;
	});

	var getViewport = (function () {
	  var scroll = getWindowScroll$1();
	  var maxScroll = getMaxWindowScroll();
	  var top = scroll.y;
	  var left = scroll.x;
	  var doc = getDocumentElement();
	  var width = doc.clientWidth;
	  var height = doc.clientHeight;
	  var right = left + width;
	  var bottom = top + height;
	  var frame = getRect({
	    top: top,
	    left: left,
	    right: right,
	    bottom: bottom
	  });
	  var viewport = {
	    frame: frame,
	    scroll: {
	      initial: scroll,
	      current: scroll,
	      max: maxScroll,
	      diff: {
	        value: origin,
	        displacement: origin
	      }
	    }
	  };
	  return viewport;
	});

	var getInitialPublish = (function (_ref) {
	  var critical = _ref.critical,
	      scrollOptions = _ref.scrollOptions,
	      entries = _ref.entries;
	  var timingKey = 'Initial collection from DOM';
	  start(timingKey);
	  var viewport = getViewport();
	  var windowScroll = viewport.scroll.current;
	  var home = critical.droppable;
	  var droppables = values$2(entries.droppables).filter(function (entry) {
	    return entry.descriptor.type === home.type;
	  }).map(function (entry) {
	    return entry.callbacks.getDimensionAndWatchScroll(windowScroll, scrollOptions);
	  });
	  var draggables = values$2(entries.draggables).filter(function (entry) {
	    return entry.descriptor.type === critical.draggable.type;
	  }).map(function (entry) {
	    return entry.getDimension(windowScroll);
	  });
	  var dimensions = {
	    draggables: toDraggableMap(draggables),
	    droppables: toDroppableMap(droppables)
	  };
	  finish(timingKey);
	  var result = {
	    dimensions: dimensions,
	    critical: critical,
	    viewport: viewport
	  };
	  return result;
	});

	var throwIfAddOrRemoveOfWrongType = function throwIfAddOrRemoveOfWrongType(collection, descriptor) {
	  !(collection.critical.draggable.type === descriptor.type) ? invariant(false, "We have detected that you have added a Draggable during a drag.\n      This is not of the same type as the dragging item\n\n      Dragging type: " + collection.critical.draggable.type + ".\n      Added type: " + descriptor.type + "\n\n      We are not allowing this as you can run into problems if your change\n      has shifted the positioning of other Droppables, or has changed the size of the page") : void 0;
	};

	var createDimensionMarshal = (function (callbacks) {
	  var entries = {
	    droppables: {},
	    draggables: {}
	  };
	  var collection = null;
	  var publisher = createPublisher({
	    callbacks: {
	      publish: callbacks.publishWhileDragging,
	      collectionStarting: callbacks.collectionStarting,
	      getCritical: function getCritical() {
	        !collection ? invariant(false, 'Cannot get critical when there is no collection') : void 0;
	        return collection.critical;
	      }
	    },
	    getEntries: function getEntries() {
	      return entries;
	    }
	  });

	  var registerDraggable = function registerDraggable(descriptor, getDimension) {
	    var entry = {
	      descriptor: descriptor,
	      getDimension: getDimension
	    };
	    entries.draggables[descriptor.id] = entry;

	    if (!collection) {
	      return;
	    }

	    throwIfAddOrRemoveOfWrongType(collection, descriptor);
	    publisher.add(descriptor);
	  };

	  var updateDraggable = function updateDraggable(published, descriptor, getDimension) {
	    var existing = entries.draggables[published.id];
	    !existing ? invariant(false, 'Cannot update draggable registration as no published registration was found') : void 0;

	    if (existing.descriptor === published) {
	      delete entries.draggables[published.id];
	    } else {
	      warning("\n        Detected incorrect usage of 'key' on '<Draggable draggableId=\"" + published.id + "\"$ />\n\n        Your 'key' should be:\n        - Unique for each Draggable in a list\n        - Not be based on the index of the Draggable\n\n        Usually you want your 'key' to just be the 'draggableId'\n\n        More information: https://github.com/atlassian/react-beautiful-dnd/blob/master/docs/api/draggable.md#keys-for-a-list-of-draggable-\n      ");
	    }

	    var entry = {
	      descriptor: descriptor,
	      getDimension: getDimension
	    };
	    entries.draggables[descriptor.id] = entry;
	  };

	  var unregisterDraggable = function unregisterDraggable(descriptor) {
	    var entry = entries.draggables[descriptor.id];
	    !entry ? invariant(false, "Cannot unregister Draggable with id:\n      " + descriptor.id + " as it is not registered") : void 0;

	    if (entry.descriptor !== descriptor) {
	      return;
	    }

	    delete entries.draggables[descriptor.id];

	    if (!collection) {
	      return;
	    }

	    !(collection.critical.draggable.id !== descriptor.id) ? invariant(false, 'Cannot remove the dragging item during a drag') : void 0;
	    throwIfAddOrRemoveOfWrongType(collection, descriptor);
	    publisher.remove(descriptor);
	  };

	  var registerDroppable = function registerDroppable(descriptor, droppableCallbacks) {
	    var id = descriptor.id;
	    entries.droppables[id] = {
	      descriptor: descriptor,
	      callbacks: droppableCallbacks
	    };
	    !!collection ? invariant(false, 'Cannot add a Droppable during a drag') : void 0;
	  };

	  var unregisterDroppable = function unregisterDroppable(descriptor) {
	    var entry = entries.droppables[descriptor.id];
	    !entry ? invariant(false, "Cannot unregister Droppable with id " + descriptor.id + " as as it is not registered") : void 0;

	    if (entry.descriptor !== descriptor) {
	      return;
	    }

	    delete entries.droppables[descriptor.id];
	    !!collection ? invariant(false, 'Cannot add a Droppable during a drag') : void 0;
	  };

	  var updateDroppableIsEnabled = function updateDroppableIsEnabled(id, isEnabled) {
	    !entries.droppables[id] ? invariant(false, "Cannot update is enabled flag of Droppable " + id + " as it is not registered") : void 0;

	    if (!collection) {
	      return;
	    }

	    callbacks.updateDroppableIsEnabled({
	      id: id,
	      isEnabled: isEnabled
	    });
	  };

	  var updateDroppableIsCombineEnabled = function updateDroppableIsCombineEnabled(id, isCombineEnabled) {
	    !entries.droppables[id] ? invariant(false, "Cannot update isCombineEnabled flag of Droppable " + id + " as it is not registered") : void 0;

	    if (!collection) {
	      return;
	    }

	    callbacks.updateDroppableIsCombineEnabled({
	      id: id,
	      isCombineEnabled: isCombineEnabled
	    });
	  };

	  var updateDroppableScroll = function updateDroppableScroll(id, newScroll) {
	    !entries.droppables[id] ? invariant(false, "Cannot update the scroll on Droppable " + id + " as it is not registered") : void 0;

	    if (!collection) {
	      return;
	    }

	    callbacks.updateDroppableScroll({
	      id: id,
	      offset: newScroll
	    });
	  };

	  var scrollDroppable = function scrollDroppable(id, change) {
	    var entry = entries.droppables[id];
	    !entry ? invariant(false, "Cannot scroll Droppable " + id + " as it is not registered") : void 0;

	    if (!collection) {
	      return;
	    }

	    entry.callbacks.scroll(change);
	  };

	  var stopPublishing = function stopPublishing() {
	    if (!collection) {
	      return;
	    }

	    publisher.stop();
	    var home = collection.critical.droppable;
	    values$2(entries.droppables).filter(function (entry) {
	      return entry.descriptor.type === home.type;
	    }).forEach(function (entry) {
	      return entry.callbacks.dragStopped();
	    });
	    collection = null;
	  };

	  var startPublishing = function startPublishing(request) {
	    !!collection ? invariant(false, 'Cannot start capturing critical dimensions as there is already a collection') : void 0;
	    var entry = entries.draggables[request.draggableId];
	    !entry ? invariant(false, 'Cannot find critical draggable entry') : void 0;
	    var home = entries.droppables[entry.descriptor.droppableId];
	    !home ? invariant(false, 'Cannot find critical droppable entry') : void 0;
	    var critical = {
	      draggable: entry.descriptor,
	      droppable: home.descriptor
	    };
	    collection = {
	      critical: critical
	    };
	    return getInitialPublish({
	      critical: critical,
	      entries: entries,
	      scrollOptions: request.scrollOptions
	    });
	  };

	  var marshal = {
	    registerDraggable: registerDraggable,
	    updateDraggable: updateDraggable,
	    unregisterDraggable: unregisterDraggable,
	    registerDroppable: registerDroppable,
	    unregisterDroppable: unregisterDroppable,
	    updateDroppableIsEnabled: updateDroppableIsEnabled,
	    updateDroppableIsCombineEnabled: updateDroppableIsCombineEnabled,
	    scrollDroppable: scrollDroppable,
	    updateDroppableScroll: updateDroppableScroll,
	    startPublishing: startPublishing,
	    stopPublishing: stopPublishing
	  };
	  return marshal;
	});

	var canStartDrag = (function (state, id) {
	  if (state.phase === 'IDLE') {
	    return true;
	  }

	  if (state.phase !== 'DROP_ANIMATING') {
	    return false;
	  }

	  if (state.completed.result.draggableId === id) {
	    return false;
	  }

	  return state.completed.result.reason === 'DROP';
	});

	var scrollWindow = (function (change) {
	  window.scrollBy(change.x, change.y);
	});

	// 20.3.3.1 / 15.9.4.4 Date.now()


	_export(_export.S, 'Date', { now: function () { return new Date().getTime(); } });

	var now = _core.Date.now;

	var now$1 = now;

	var index$1 = (function (fn) {
	  var lastArgs = [];
	  var frameId = null;

	  var wrapperFn = function wrapperFn() {
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    lastArgs = args;

	    if (frameId) {
	      return;
	    }

	    frameId = requestAnimationFrame(function () {
	      frameId = null;
	      fn.apply(undefined, lastArgs);
	    });
	  };

	  wrapperFn.cancel = function () {
	    if (!frameId) {
	      return;
	    }

	    cancelAnimationFrame(frameId);
	    frameId = null;
	  };

	  var resultFn = wrapperFn;

	  return resultFn;
	});

	var getScrollableDroppables = index(function (droppables) {
	  return toDroppableList(droppables).filter(function (droppable) {
	    if (!droppable.isEnabled) {
	      return false;
	    }

	    if (!droppable.frame) {
	      return false;
	    }

	    return true;
	  });
	});

	var getScrollableDroppableOver = function getScrollableDroppableOver(target, droppables) {
	  var maybe = find(getScrollableDroppables(droppables), function (droppable) {
	    !droppable.frame ? invariant(false, 'Invalid result') : void 0;
	    return isPositionInFrame(droppable.frame.pageMarginBox)(target);
	  });
	  return maybe;
	};

	var getBestScrollableDroppable = (function (_ref) {
	  var center = _ref.center,
	      destination = _ref.destination,
	      droppables = _ref.droppables;

	  if (destination) {
	    var _dimension = droppables[destination];

	    if (!_dimension.frame) {
	      return null;
	    }

	    return _dimension;
	  }

	  var dimension = getScrollableDroppableOver(center, droppables);
	  return dimension;
	});

	var config = {
	  startFromPercentage: 0.25,
	  maxScrollAtPercentage: 0.05,
	  maxPixelScroll: 28,
	  ease: function ease(percentage) {
	    return Math.pow(percentage, 2);
	  },
	  durationDampening: {
	    stopDampeningAt: 1200,
	    accelerateAt: 360
	  }
	};

	var getDistanceThresholds = (function (container, axis) {
	  var startScrollingFrom = container[axis.size] * config.startFromPercentage;
	  var maxScrollValueAt = container[axis.size] * config.maxScrollAtPercentage;
	  var thresholds = {
	    startScrollingFrom: startScrollingFrom,
	    maxScrollValueAt: maxScrollValueAt
	  };
	  return thresholds;
	});

	var getPercentage = (function (_ref) {
	  var startOfRange = _ref.startOfRange,
	      endOfRange = _ref.endOfRange,
	      current = _ref.current;
	  var range = endOfRange - startOfRange;

	  if (range === 0) {
	    warning("\n      Detected distance range of 0 in the fluid auto scroller\n      This is unexpected and would cause a divide by 0 issue.\n      Not allowing an auto scroll\n    ");
	    return 0;
	  }

	  var currentInRange = current - startOfRange;
	  var percentage = currentInRange / range;
	  return percentage;
	});

	var minScroll = 1;

	var getValueFromDistance = (function (distanceToEdge, thresholds) {
	  if (distanceToEdge > thresholds.startScrollingFrom) {
	    return 0;
	  }

	  if (distanceToEdge <= thresholds.maxScrollValueAt) {
	    return config.maxPixelScroll;
	  }

	  if (distanceToEdge === thresholds.startScrollingFrom) {
	    return minScroll;
	  }

	  var percentageFromMaxScrollValueAt = getPercentage({
	    startOfRange: thresholds.maxScrollValueAt,
	    endOfRange: thresholds.startScrollingFrom,
	    current: distanceToEdge
	  });
	  var percentageFromStartScrollingFrom = 1 - percentageFromMaxScrollValueAt;
	  var scroll = config.maxPixelScroll * config.ease(percentageFromStartScrollingFrom);
	  return Math.ceil(scroll);
	});

	var accelerateAt = config.durationDampening.accelerateAt;
	var stopAt = config.durationDampening.stopDampeningAt;
	var dampenValueByTime = (function (proposedScroll, dragStartTime) {
	  var startOfRange = dragStartTime;
	  var endOfRange = stopAt;

	  var now = now$1();

	  var runTime = now - startOfRange;

	  if (runTime >= stopAt) {
	    return proposedScroll;
	  }

	  if (runTime < accelerateAt) {
	    return minScroll;
	  }

	  var betweenAccelerateAtAndStopAtPercentage = getPercentage({
	    startOfRange: accelerateAt,
	    endOfRange: endOfRange,
	    current: runTime
	  });
	  var scroll = proposedScroll * config.ease(betweenAccelerateAtAndStopAtPercentage);
	  return Math.ceil(scroll);
	});

	var getValue = (function (_ref) {
	  var distanceToEdge = _ref.distanceToEdge,
	      thresholds = _ref.thresholds,
	      dragStartTime = _ref.dragStartTime,
	      shouldUseTimeDampening = _ref.shouldUseTimeDampening;
	  var scroll = getValueFromDistance(distanceToEdge, thresholds);

	  if (scroll === 0) {
	    return 0;
	  }

	  if (!shouldUseTimeDampening) {
	    return scroll;
	  }

	  return Math.max(dampenValueByTime(scroll, dragStartTime), minScroll);
	});

	var getScrollOnAxis = (function (_ref) {
	  var container = _ref.container,
	      distanceToEdges = _ref.distanceToEdges,
	      dragStartTime = _ref.dragStartTime,
	      axis = _ref.axis,
	      shouldUseTimeDampening = _ref.shouldUseTimeDampening;
	  var thresholds = getDistanceThresholds(container, axis);
	  var isCloserToEnd = distanceToEdges[axis.end] < distanceToEdges[axis.start];

	  if (isCloserToEnd) {
	    return getValue({
	      distanceToEdge: distanceToEdges[axis.end],
	      thresholds: thresholds,
	      dragStartTime: dragStartTime,
	      shouldUseTimeDampening: shouldUseTimeDampening
	    });
	  }

	  return -1 * getValue({
	    distanceToEdge: distanceToEdges[axis.start],
	    thresholds: thresholds,
	    dragStartTime: dragStartTime,
	    shouldUseTimeDampening: shouldUseTimeDampening
	  });
	});

	var adjustForSizeLimits = (function (_ref) {
	  var container = _ref.container,
	      subject = _ref.subject,
	      proposedScroll = _ref.proposedScroll;
	  var isTooBigVertically = subject.height > container.height;
	  var isTooBigHorizontally = subject.width > container.width;

	  if (!isTooBigHorizontally && !isTooBigVertically) {
	    return proposedScroll;
	  }

	  if (isTooBigHorizontally && isTooBigVertically) {
	    return null;
	  }

	  return {
	    x: isTooBigHorizontally ? 0 : proposedScroll.x,
	    y: isTooBigVertically ? 0 : proposedScroll.y
	  };
	});

	var clean$3 = apply(function (value) {
	  return value === 0 ? 0 : value;
	});
	var getScroll = (function (_ref) {
	  var dragStartTime = _ref.dragStartTime,
	      container = _ref.container,
	      subject = _ref.subject,
	      center = _ref.center,
	      shouldUseTimeDampening = _ref.shouldUseTimeDampening;
	  var distanceToEdges = {
	    top: center.y - container.top,
	    right: container.right - center.x,
	    bottom: container.bottom - center.y,
	    left: center.x - container.left
	  };
	  var y = getScrollOnAxis({
	    container: container,
	    distanceToEdges: distanceToEdges,
	    dragStartTime: dragStartTime,
	    axis: vertical,
	    shouldUseTimeDampening: shouldUseTimeDampening
	  });
	  var x = getScrollOnAxis({
	    container: container,
	    distanceToEdges: distanceToEdges,
	    dragStartTime: dragStartTime,
	    axis: horizontal,
	    shouldUseTimeDampening: shouldUseTimeDampening
	  });
	  var required = clean$3({
	    x: x,
	    y: y
	  });

	  if (isEqual(required, origin)) {
	    return null;
	  }

	  var limited = adjustForSizeLimits({
	    container: container,
	    subject: subject,
	    proposedScroll: required
	  });

	  if (!limited) {
	    return null;
	  }

	  return isEqual(limited, origin) ? null : limited;
	});

	var smallestSigned = apply(function (value) {
	  if (value === 0) {
	    return 0;
	  }

	  return value > 0 ? 1 : -1;
	});
	var getOverlap = function () {
	  var getRemainder = function getRemainder(target, max) {
	    if (target < 0) {
	      return target;
	    }

	    if (target > max) {
	      return target - max;
	    }

	    return 0;
	  };

	  return function (_ref) {
	    var current = _ref.current,
	        max = _ref.max,
	        change = _ref.change;
	    var targetScroll = add(current, change);
	    var overlap = {
	      x: getRemainder(targetScroll.x, max.x),
	      y: getRemainder(targetScroll.y, max.y)
	    };

	    if (isEqual(overlap, origin)) {
	      return null;
	    }

	    return overlap;
	  };
	}();
	var canPartiallyScroll = function canPartiallyScroll(_ref2) {
	  var rawMax = _ref2.max,
	      current = _ref2.current,
	      change = _ref2.change;
	  var max = {
	    x: Math.max(current.x, rawMax.x),
	    y: Math.max(current.y, rawMax.y)
	  };
	  var smallestChange = smallestSigned(change);
	  var overlap = getOverlap({
	    max: max,
	    current: current,
	    change: smallestChange
	  });

	  if (!overlap) {
	    return true;
	  }

	  if (smallestChange.x !== 0 && overlap.x === 0) {
	    return true;
	  }

	  if (smallestChange.y !== 0 && overlap.y === 0) {
	    return true;
	  }

	  return false;
	};
	var canScrollWindow = function canScrollWindow(viewport, change) {
	  return canPartiallyScroll({
	    current: viewport.scroll.current,
	    max: viewport.scroll.max,
	    change: change
	  });
	};
	var getWindowOverlap = function getWindowOverlap(viewport, change) {
	  if (!canScrollWindow(viewport, change)) {
	    return null;
	  }

	  var max = viewport.scroll.max;
	  var current = viewport.scroll.current;
	  return getOverlap({
	    current: current,
	    max: max,
	    change: change
	  });
	};
	var canScrollDroppable = function canScrollDroppable(droppable, change) {
	  var frame = droppable.frame;

	  if (!frame) {
	    return false;
	  }

	  return canPartiallyScroll({
	    current: frame.scroll.current,
	    max: frame.scroll.max,
	    change: change
	  });
	};
	var getDroppableOverlap = function getDroppableOverlap(droppable, change) {
	  var frame = droppable.frame;

	  if (!frame) {
	    return null;
	  }

	  if (!canScrollDroppable(droppable, change)) {
	    return null;
	  }

	  return getOverlap({
	    current: frame.scroll.current,
	    max: frame.scroll.max,
	    change: change
	  });
	};

	var getWindowScrollChange = (function (_ref) {
	  var viewport = _ref.viewport,
	      subject = _ref.subject,
	      center = _ref.center,
	      dragStartTime = _ref.dragStartTime,
	      shouldUseTimeDampening = _ref.shouldUseTimeDampening;
	  var scroll = getScroll({
	    dragStartTime: dragStartTime,
	    container: viewport.frame,
	    subject: subject,
	    center: center,
	    shouldUseTimeDampening: shouldUseTimeDampening
	  });
	  return scroll && canScrollWindow(viewport, scroll) ? scroll : null;
	});

	var getDroppableScrollChange = (function (_ref) {
	  var droppable = _ref.droppable,
	      subject = _ref.subject,
	      center = _ref.center,
	      dragStartTime = _ref.dragStartTime,
	      shouldUseTimeDampening = _ref.shouldUseTimeDampening;
	  var frame = droppable.frame;

	  if (!frame) {
	    return null;
	  }

	  var scroll = getScroll({
	    dragStartTime: dragStartTime,
	    container: frame.pageMarginBox,
	    subject: subject,
	    center: center,
	    shouldUseTimeDampening: shouldUseTimeDampening
	  });
	  return scroll && canScrollDroppable(droppable, scroll) ? scroll : null;
	});

	var scroll$1 = (function (_ref) {
	  var state = _ref.state,
	      dragStartTime = _ref.dragStartTime,
	      shouldUseTimeDampening = _ref.shouldUseTimeDampening,
	      scrollWindow = _ref.scrollWindow,
	      scrollDroppable = _ref.scrollDroppable;
	  var center = state.current.page.borderBoxCenter;
	  var draggable = state.dimensions.draggables[state.critical.draggable.id];
	  var subject = draggable.page.marginBox;

	  if (state.isWindowScrollAllowed) {
	    var viewport = state.viewport;

	    var _change = getWindowScrollChange({
	      dragStartTime: dragStartTime,
	      viewport: viewport,
	      subject: subject,
	      center: center,
	      shouldUseTimeDampening: shouldUseTimeDampening
	    });

	    if (_change) {
	      scrollWindow(_change);
	      return;
	    }
	  }

	  var droppable = getBestScrollableDroppable({
	    center: center,
	    destination: whatIsDraggedOver(state.impact),
	    droppables: state.dimensions.droppables
	  });

	  if (!droppable) {
	    return;
	  }

	  var change = getDroppableScrollChange({
	    dragStartTime: dragStartTime,
	    droppable: droppable,
	    subject: subject,
	    center: center,
	    shouldUseTimeDampening: shouldUseTimeDampening
	  });

	  if (change) {
	    scrollDroppable(droppable.descriptor.id, change);
	  }
	});

	var createFluidScroller = (function (_ref) {
	  var scrollWindow = _ref.scrollWindow,
	      scrollDroppable = _ref.scrollDroppable;
	  var scheduleWindowScroll = index$1(scrollWindow);
	  var scheduleDroppableScroll = index$1(scrollDroppable);
	  var dragging = null;

	  var tryScroll = function tryScroll(state) {
	    !dragging ? invariant(false, 'Cannot fluid scroll if not dragging') : void 0;
	    var _dragging = dragging,
	        shouldUseTimeDampening = _dragging.shouldUseTimeDampening,
	        dragStartTime = _dragging.dragStartTime;
	    scroll$1({
	      state: state,
	      scrollWindow: scheduleWindowScroll,
	      scrollDroppable: scheduleDroppableScroll,
	      dragStartTime: dragStartTime,
	      shouldUseTimeDampening: shouldUseTimeDampening
	    });
	  };

	  var cancelPending = function cancelPending() {
	    !dragging ? invariant(false, 'Cannot cancel pending fluid scroll when not started') : void 0;
	    scheduleWindowScroll.cancel();
	    scheduleDroppableScroll.cancel();
	  };

	  var start$1 = function start$1(state) {
	    start('starting fluid scroller');
	    !!dragging ? invariant(false, 'Cannot start auto scrolling when already started') : void 0;

	    var dragStartTime = now$1();

	    var wasScrollNeeded = false;

	    var fakeScrollCallback = function fakeScrollCallback() {
	      wasScrollNeeded = true;
	    };

	    scroll$1({
	      state: state,
	      dragStartTime: 0,
	      shouldUseTimeDampening: false,
	      scrollWindow: fakeScrollCallback,
	      scrollDroppable: fakeScrollCallback
	    });
	    dragging = {
	      dragStartTime: dragStartTime,
	      shouldUseTimeDampening: wasScrollNeeded
	    };
	    finish('starting fluid scroller');

	    if (wasScrollNeeded) {
	      tryScroll(state);
	    }
	  };

	  var stop = function stop() {
	    if (!dragging) {
	      return;
	    }

	    cancelPending();
	    dragging = null;
	  };

	  return {
	    start: start$1,
	    stop: stop,
	    cancelPending: cancelPending,
	    scroll: tryScroll
	  };
	});

	var createJumpScroller = (function (_ref) {
	  var move = _ref.move,
	      scrollDroppable = _ref.scrollDroppable,
	      scrollWindow = _ref.scrollWindow;

	  var moveByOffset = function moveByOffset(state, offset) {
	    var client = add(state.current.client.selection, offset);
	    move({
	      client: client
	    });
	  };

	  var scrollDroppableAsMuchAsItCan = function scrollDroppableAsMuchAsItCan(droppable, change) {
	    if (!canScrollDroppable(droppable, change)) {
	      return change;
	    }

	    var overlap = getDroppableOverlap(droppable, change);

	    if (!overlap) {
	      scrollDroppable(droppable.descriptor.id, change);
	      return null;
	    }

	    var whatTheDroppableCanScroll = subtract(change, overlap);
	    scrollDroppable(droppable.descriptor.id, whatTheDroppableCanScroll);
	    var remainder = subtract(change, whatTheDroppableCanScroll);
	    return remainder;
	  };

	  var scrollWindowAsMuchAsItCan = function scrollWindowAsMuchAsItCan(isWindowScrollAllowed, viewport, change) {
	    if (!isWindowScrollAllowed) {
	      return change;
	    }

	    if (!canScrollWindow(viewport, change)) {
	      return change;
	    }

	    var overlap = getWindowOverlap(viewport, change);

	    if (!overlap) {
	      scrollWindow(change);
	      return null;
	    }

	    var whatTheWindowCanScroll = subtract(change, overlap);
	    scrollWindow(whatTheWindowCanScroll);
	    var remainder = subtract(change, whatTheWindowCanScroll);
	    return remainder;
	  };

	  var jumpScroller = function jumpScroller(state) {
	    var request = state.scrollJumpRequest;

	    if (!request) {
	      return;
	    }

	    var destination = whatIsDraggedOver(state.impact);
	    !destination ? invariant(false, 'Cannot perform a jump scroll when there is no destination') : void 0;
	    var droppableRemainder = scrollDroppableAsMuchAsItCan(state.dimensions.droppables[destination], request);

	    if (!droppableRemainder) {
	      return;
	    }

	    var viewport = state.viewport;
	    var windowRemainder = scrollWindowAsMuchAsItCan(state.isWindowScrollAllowed, viewport, droppableRemainder);

	    if (!windowRemainder) {
	      return;
	    }

	    moveByOffset(state, windowRemainder);
	  };

	  return jumpScroller;
	});

	var createAutoScroller = (function (_ref) {
	  var scrollDroppable = _ref.scrollDroppable,
	      scrollWindow = _ref.scrollWindow,
	      move = _ref.move;
	  var fluidScroller = createFluidScroller({
	    scrollWindow: scrollWindow,
	    scrollDroppable: scrollDroppable
	  });
	  var jumpScroll = createJumpScroller({
	    move: move,
	    scrollWindow: scrollWindow,
	    scrollDroppable: scrollDroppable
	  });

	  var scroll = function scroll(state) {
	    if (state.phase !== 'DRAGGING') {
	      return;
	    }

	    if (state.movementMode === 'FLUID') {
	      fluidScroller.scroll(state);
	      return;
	    }

	    if (!state.scrollJumpRequest) {
	      return;
	    }

	    jumpScroll(state);
	  };

	  var scroller = {
	    scroll: scroll,
	    cancelPending: fluidScroller.cancelPending,
	    start: fluidScroller.start,
	    stop: fluidScroller.stop
	  };
	  return scroller;
	});

	var prefix$1 = 'data-react-beautiful-dnd';
	var dragHandle = prefix$1 + "-drag-handle";
	var draggable = prefix$1 + "-draggable";
	var droppable = prefix$1 + "-droppable";

	var makeGetSelector = function makeGetSelector(context) {
	  return function (attribute) {
	    return "[" + attribute + "=\"" + context + "\"]";
	  };
	};

	var getStyles = function getStyles(rules, property) {
	  return rules.map(function (rule) {
	    var value = rule.styles[property];

	    if (!value) {
	      return '';
	    }

	    return rule.selector + " { " + value + " }";
	  }).join(' ');
	};

	var noPointerEvents = 'pointer-events: none;';
	var getStyles$1 = (function (uniqueContext) {
	  var getSelector = makeGetSelector(uniqueContext);

	  var dragHandle$1 = function () {
	    var grabCursor = "\n      cursor: -webkit-grab;\n      cursor: grab;\n    ";
	    return {
	      selector: getSelector(dragHandle),
	      styles: {
	        always: "\n          -webkit-touch-callout: none;\n          -webkit-tap-highlight-color: rgba(0,0,0,0);\n          touch-action: manipulation;\n        ",
	        resting: grabCursor,
	        dragging: noPointerEvents,
	        dropAnimating: grabCursor
	      }
	    };
	  }();

	  var draggable$1 = function () {
	    var transition = "\n      transition: " + transitions.outOfTheWay + ";\n    ";
	    return {
	      selector: getSelector(draggable),
	      styles: {
	        dragging: transition,
	        dropAnimating: transition,
	        userCancel: transition
	      }
	    };
	  }();

	  var droppable$1 = {
	    selector: getSelector(droppable),
	    styles: {
	      always: "overflow-anchor: none;"
	    }
	  };
	  var body = {
	    selector: 'body',
	    styles: {
	      dragging: "\n        cursor: grabbing;\n        cursor: -webkit-grabbing;\n        user-select: none;\n        -webkit-user-select: none;\n        -moz-user-select: none;\n        -ms-user-select: none;\n        overflow-anchor: none;\n      "
	    }
	  };
	  var rules = [draggable$1, dragHandle$1, droppable$1, body];
	  return {
	    always: getStyles(rules, 'always'),
	    resting: getStyles(rules, 'resting'),
	    dragging: getStyles(rules, 'dragging'),
	    dropAnimating: getStyles(rules, 'dropAnimating'),
	    userCancel: getStyles(rules, 'userCancel')
	  };
	});

	var useIsomorphicLayoutEffect$1 = typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect;

	var getHead = function getHead() {
	  var head = document.querySelector('head');
	  !head ? invariant(false, 'Cannot find the head to append a style to') : void 0;
	  return head;
	};

	var createStyleEl = function createStyleEl() {
	  var el = document.createElement('style');
	  el.type = 'text/css';
	  return el;
	};

	function useStyleMarshal(uniqueId) {
	  var uniqueContext = useMemo(function () {
	    return "" + uniqueId;
	  }, [uniqueId]);
	  var styles = useMemo(function () {
	    return getStyles$1(uniqueContext);
	  }, [uniqueContext]);
	  var alwaysRef = React.useRef(null);
	  var dynamicRef = React.useRef(null);
	  var setDynamicStyle = useCallback(index(function (proposed) {
	    var el = dynamicRef.current;
	    !el ? invariant(false, 'Cannot set dynamic style element if it is not set') : void 0;
	    el.textContent = proposed;
	  }), []);
	  var setAlwaysStyle = useCallback(function (proposed) {
	    var el = alwaysRef.current;
	    !el ? invariant(false, 'Cannot set dynamic style element if it is not set') : void 0;
	    el.textContent = proposed;
	  }, []);
	  useIsomorphicLayoutEffect$1(function () {
	    !(!alwaysRef.current && !dynamicRef.current) ? invariant(false, 'style elements already mounted') : void 0;
	    var always = createStyleEl();
	    var dynamic = createStyleEl();
	    alwaysRef.current = always;
	    dynamicRef.current = dynamic;
	    always.setAttribute(prefix$1 + "-always", uniqueContext);
	    dynamic.setAttribute(prefix$1 + "-dynamic", uniqueContext);
	    getHead().appendChild(always);
	    getHead().appendChild(dynamic);
	    setAlwaysStyle(styles.always);
	    setDynamicStyle(styles.resting);
	    return function () {
	      var remove = function remove(ref) {
	        var current = ref.current;
	        !current ? invariant(false, 'Cannot unmount ref as it is not set') : void 0;
	        getHead().removeChild(current);
	        ref.current = null;
	      };

	      remove(alwaysRef);
	      remove(dynamicRef);
	    };
	  }, [setAlwaysStyle, setDynamicStyle, styles.always, styles.resting, uniqueContext]);
	  var dragging = useCallback(function () {
	    return setDynamicStyle(styles.dragging);
	  }, [setDynamicStyle, styles.dragging]);
	  var dropping = useCallback(function (reason) {
	    if (reason === 'DROP') {
	      setDynamicStyle(styles.dropAnimating);
	      return;
	    }

	    setDynamicStyle(styles.userCancel);
	  }, [setDynamicStyle, styles.dropAnimating, styles.userCancel]);
	  var resting = useCallback(function () {
	    if (!dynamicRef.current) {
	      return;
	    }

	    setDynamicStyle(styles.resting);
	  }, [setDynamicStyle, styles.resting]);
	  var marshal = useMemo(function () {
	    return {
	      dragging: dragging,
	      dropping: dropping,
	      resting: resting,
	      styleContext: uniqueContext
	    };
	  }, [dragging, dropping, resting, uniqueContext]);
	  return marshal;
	}

	var StoreContext = React__default.createContext(null);

	var getBodyElement = (function () {
	  var body = document.body;
	  !body ? invariant(false, 'Cannot find document.body') : void 0;
	  return body;
	});

	var visuallyHidden = {
	  position: 'absolute',
	  width: '1px',
	  height: '1px',
	  margin: '-1px',
	  border: '0',
	  padding: '0',
	  overflow: 'hidden',
	  clip: 'rect(0 0 0 0)',
	  'clip-path': 'inset(100%)'
	};
	var getId = function getId(uniqueId) {
	  return "react-beautiful-dnd-announcement-" + uniqueId;
	};
	function useAnnouncer(uniqueId) {
	  var id = useMemo(function () {
	    return getId(uniqueId);
	  }, [uniqueId]);
	  var ref = React.useRef(null);
	  React.useEffect(function () {
	    !!ref.current ? invariant(false, 'Announcement node already mounted') : void 0;
	    var el = document.createElement('div');
	    ref.current = el;
	    el.id = id;
	    el.setAttribute('aria-live', 'assertive');
	    el.setAttribute('role', 'log');
	    el.setAttribute('aria-atomic', 'true');

	    assign$1(el.style, visuallyHidden);

	    getBodyElement().appendChild(el);
	    return function () {
	      var toBeRemoved = ref.current;
	      !toBeRemoved ? invariant(false, 'Cannot unmount announcement node') : void 0;
	      getBodyElement().removeChild(toBeRemoved);
	      ref.current = null;
	    };
	  }, [id]);
	  var announce = useCallback(function (message) {
	    var el = ref.current;

	    if (el) {
	      el.textContent = message;
	      return;
	    }

	    warning("\n      A screen reader message was trying to be announced but it was unable to do so.\n      This can occur if you unmount your <DragDropContext /> in your onDragEnd.\n      Consider calling provided.announce() before the unmount so that the instruction will\n      not be lost for users relying on a screen reader.\n\n      Message not passed to screen reader:\n\n      \"" + message + "\"\n    ");
	  }, []);
	  return announce;
	}

	var AppContext = React__default.createContext(null);

	var peerDependencies = {
		react: "^16.8.5"
	};

	var semver = /(\d+)\.(\d+)\.(\d+)/;

	var getVersion = function getVersion(value) {
	  var result = semver.exec(value);
	  !(result != null) ? invariant(false, "Unable to parse React version " + value) : void 0;
	  var major = Number(result[1]);
	  var minor = Number(result[2]);
	  var patch = Number(result[3]);
	  return {
	    major: major,
	    minor: minor,
	    patch: patch,
	    raw: value
	  };
	};

	var isSatisfied = function isSatisfied(expected, actual) {
	  if (actual.major > expected.major) {
	    return true;
	  }

	  if (actual.major < expected.major) {
	    return false;
	  }

	  if (actual.minor > expected.minor) {
	    return true;
	  }

	  if (actual.minor < expected.minor) {
	    return false;
	  }

	  return actual.patch >= expected.patch;
	};

	var checkReactVersion = (function (peerDepValue, actualValue) {
	  var peerDep = getVersion(peerDepValue);
	  var actual = getVersion(actualValue);

	  if (isSatisfied(peerDep, actual)) {
	    return;
	  }

	  warning("\n    React version: [" + actual.raw + "]\n    does not satisfy expected peer dependency version: [" + peerDep.raw + "]\n\n    This can result in run time bugs, and even fatal crashes\n  ");
	});

	var suffix = "\n  We expect a html5 doctype: <!doctype html>\n  This is to ensure consistent browser layout and measurement\n\n  More information: https://github.com/atlassian/react-beautiful-dnd/blob/master/docs/guides/doctype.md\n";
	var checkDoctype = (function (doc) {
	  var doctype = doc.doctype;

	  if (!doctype) {
	    warning("\n      No <!doctype html> found.\n\n      " + suffix + "\n    ");
	    return;
	  }

	  if (doctype.name.toLowerCase() !== 'html') {
	    warning("\n      Unexpected <!doctype> found: (" + doctype.name + ")\n\n      " + suffix + "\n    ");
	  }

	  if (doctype.publicId !== '') {
	    warning("\n      Unexpected <!doctype> publicId found: (" + doctype.publicId + ")\n      A html5 doctype does not have a publicId\n\n      " + suffix + "\n    ");
	  }
	});

	function useStartupValidation() {
	  React.useEffect(function () {

	    checkReactVersion(peerDependencies.react, React__default.version);
	    checkDoctype(document);
	  }, []);
	}

	function usePrevious(current) {
	  var ref = React.useRef(current);
	  React.useEffect(function () {
	    ref.current = current;
	  });
	  return ref;
	}

	var createResponders = function createResponders(props) {
	  return {
	    onBeforeDragStart: props.onBeforeDragStart,
	    onDragStart: props.onDragStart,
	    onDragEnd: props.onDragEnd,
	    onDragUpdate: props.onDragUpdate
	  };
	};

	function getStore(lazyRef) {
	  !lazyRef.current ? invariant(false, 'Could not find store from lazy ref') : void 0;
	  return lazyRef.current;
	}

	function App(props) {
	  var uniqueId = props.uniqueId,
	      setOnError = props.setOnError;
	  var lazyStoreRef = React.useRef(null);
	  useStartupValidation();
	  var lastPropsRef = usePrevious(props);
	  var getResponders = useCallback(function () {
	    return createResponders(lastPropsRef.current);
	  }, [lastPropsRef]);
	  var announce = useAnnouncer(uniqueId);
	  var styleMarshal = useStyleMarshal(uniqueId);
	  var lazyDispatch = useCallback(function (action) {
	    getStore(lazyStoreRef).dispatch(action);
	  }, []);
	  var callbacks = useMemo(function () {
	    return bindActionCreators({
	      publishWhileDragging: publishWhileDragging$1,
	      updateDroppableScroll: updateDroppableScroll,
	      updateDroppableIsEnabled: updateDroppableIsEnabled,
	      updateDroppableIsCombineEnabled: updateDroppableIsCombineEnabled,
	      collectionStarting: collectionStarting
	    }, lazyDispatch);
	  }, [lazyDispatch]);
	  var dimensionMarshal = useMemo(function () {
	    return createDimensionMarshal(callbacks);
	  }, [callbacks]);
	  var autoScroller = useMemo(function () {
	    return createAutoScroller(_extends({
	      scrollWindow: scrollWindow,
	      scrollDroppable: dimensionMarshal.scrollDroppable
	    }, bindActionCreators({
	      move: move
	    }, lazyDispatch)));
	  }, [dimensionMarshal.scrollDroppable, lazyDispatch]);
	  var store = useMemo(function () {
	    return createStore$1({
	      dimensionMarshal: dimensionMarshal,
	      styleMarshal: styleMarshal,
	      announce: announce,
	      autoScroller: autoScroller,
	      getResponders: getResponders
	    });
	  }, [announce, autoScroller, dimensionMarshal, getResponders, styleMarshal]);

	  {
	    if (lazyStoreRef.current && lazyStoreRef.current !== store) {
	      warning('unexpected store change');
	    }
	  }

	  lazyStoreRef.current = store;
	  var tryResetStore = useCallback(function () {
	    var current = getStore(lazyStoreRef);
	    var state = current.getState();

	    if (state.phase !== 'IDLE') {
	      current.dispatch(clean$1({
	        shouldFlush: true
	      }));
	    }
	  }, []);
	  setOnError(tryResetStore);
	  var getCanLift = useCallback(function (id) {
	    return canStartDrag(getStore(lazyStoreRef).getState(), id);
	  }, []);
	  var getIsMovementAllowed = useCallback(function () {
	    return isMovementAllowed(getStore(lazyStoreRef).getState());
	  }, []);
	  var appContext = useMemo(function () {
	    return {
	      marshal: dimensionMarshal,
	      style: styleMarshal.styleContext,
	      canLift: getCanLift,
	      isMovementAllowed: getIsMovementAllowed
	    };
	  }, [dimensionMarshal, getCanLift, getIsMovementAllowed, styleMarshal.styleContext]);
	  React.useEffect(function () {
	    return tryResetStore;
	  }, [tryResetStore]);
	  return React__default.createElement(AppContext.Provider, {
	    value: appContext
	  }, React__default.createElement(Provider, {
	    context: StoreContext,
	    store: store
	  }, props.children));
	}

	var instanceCount = 0;
	function resetServerContext() {
	  instanceCount = 0;
	}
	function DragDropContext(props) {
	  var uniqueId = useMemo(function () {
	    return instanceCount++;
	  }, []);
	  return React__default.createElement(ErrorBoundary, null, function (setOnError) {
	    return React__default.createElement(App, _extends({
	      setOnError: setOnError,
	      uniqueId: uniqueId
	    }, props), props.children);
	  });
	}

	var isEqual$2 = function isEqual(base) {
	  return function (value) {
	    return base === value;
	  };
	};

	var isScroll = isEqual$2('scroll');
	var isAuto = isEqual$2('auto');
	var isVisible$1 = isEqual$2('visible');

	var isEither = function isEither(overflow, fn) {
	  return fn(overflow.overflowX) || fn(overflow.overflowY);
	};

	var isBoth = function isBoth(overflow, fn) {
	  return fn(overflow.overflowX) && fn(overflow.overflowY);
	};

	var isElementScrollable = function isElementScrollable(el) {
	  var style = window.getComputedStyle(el);
	  var overflow = {
	    overflowX: style.overflowX,
	    overflowY: style.overflowY
	  };
	  return isEither(overflow, isScroll) || isEither(overflow, isAuto);
	};

	var isBodyScrollable = function isBodyScrollable() {

	  var body = getBodyElement();
	  var html = document.documentElement;
	  !html ? invariant(false) : void 0;

	  if (!isElementScrollable(body)) {
	    return false;
	  }

	  var htmlStyle = window.getComputedStyle(html);
	  var htmlOverflow = {
	    overflowX: htmlStyle.overflowX,
	    overflowY: htmlStyle.overflowY
	  };

	  if (isBoth(htmlOverflow, isVisible$1)) {
	    return false;
	  }

	  warning("\n    We have detected that your <body> element might be a scroll container.\n    We have found no reliable way of detecting whether the <body> element is a scroll container.\n    Under most circumstances a <body> scroll bar will be on the <html> element (document.documentElement)\n\n    Because we cannot determine if the <body> is a scroll container, and generally it is not one,\n    we will be treating the <body> as *not* a scroll container\n\n    More information: https://github.com/atlassian/react-beautiful-dnd/blob/master/docs/guides/how-we-detect-scroll-containers.md\n  ");
	  return false;
	};

	var getClosestScrollable = function getClosestScrollable(el) {
	  if (el == null) {
	    return null;
	  }

	  if (el === document.body) {
	    return isBodyScrollable() ? el : null;
	  }

	  if (el === document.documentElement) {
	    return null;
	  }

	  if (!isElementScrollable(el)) {
	    return getClosestScrollable(el.parentElement);
	  }

	  return el;
	};

	var checkForNestedScrollContainers = (function (scrollable) {
	  if (!scrollable) {
	    return;
	  }

	  var anotherScrollParent = getClosestScrollable(scrollable.parentElement);

	  if (!anotherScrollParent) {
	    return;
	  }

	  warning("\n    Droppable: unsupported nested scroll container detected.\n    A Droppable can only have one scroll parent (which can be itself)\n    Nested scroll containers are currently not supported.\n\n    We hope to support nested scroll containers soon: https://github.com/atlassian/react-beautiful-dnd/issues/131\n  ");
	});

	var getScroll$1 = (function (el) {
	  return {
	    x: el.scrollLeft,
	    y: el.scrollTop
	  };
	});

	var getIsFixed = function getIsFixed(el) {
	  if (!el) {
	    return false;
	  }

	  var style = window.getComputedStyle(el);

	  if (style.position === 'fixed') {
	    return true;
	  }

	  return getIsFixed(el.parentElement);
	};

	var getEnv = (function (start) {
	  var closestScrollable = getClosestScrollable(start);
	  var isFixedOnPage = getIsFixed(start);
	  return {
	    closestScrollable: closestScrollable,
	    isFixedOnPage: isFixedOnPage
	  };
	});

	var getClient = function getClient(targetRef, closestScrollable) {
	  var base = getBox(targetRef);

	  if (!closestScrollable) {
	    return base;
	  }

	  if (targetRef !== closestScrollable) {
	    return base;
	  }

	  var top = base.paddingBox.top - closestScrollable.scrollTop;
	  var left = base.paddingBox.left - closestScrollable.scrollLeft;
	  var bottom = top + closestScrollable.scrollHeight;
	  var right = left + closestScrollable.scrollWidth;
	  var paddingBox = {
	    top: top,
	    right: right,
	    bottom: bottom,
	    left: left
	  };
	  var borderBox = expand(paddingBox, base.border);
	  var client = createBox({
	    borderBox: borderBox,
	    margin: base.margin,
	    border: base.border,
	    padding: base.padding
	  });
	  return client;
	};

	var getDimension = (function (_ref) {
	  var ref = _ref.ref,
	      descriptor = _ref.descriptor,
	      env = _ref.env,
	      windowScroll = _ref.windowScroll,
	      direction = _ref.direction,
	      isDropDisabled = _ref.isDropDisabled,
	      isCombineEnabled = _ref.isCombineEnabled,
	      shouldClipSubject = _ref.shouldClipSubject;
	  var closestScrollable = env.closestScrollable;
	  var client = getClient(ref, closestScrollable);
	  var page = withScroll(client, windowScroll);

	  var closest = function () {
	    if (!closestScrollable) {
	      return null;
	    }

	    var frameClient = getBox(closestScrollable);
	    var scrollSize = {
	      scrollHeight: closestScrollable.scrollHeight,
	      scrollWidth: closestScrollable.scrollWidth
	    };
	    return {
	      client: frameClient,
	      page: withScroll(frameClient, windowScroll),
	      scroll: getScroll$1(closestScrollable),
	      scrollSize: scrollSize,
	      shouldClipSubject: shouldClipSubject
	    };
	  }();

	  var dimension = getDroppableDimension({
	    descriptor: descriptor,
	    isEnabled: !isDropDisabled,
	    isCombineEnabled: isCombineEnabled,
	    isFixedOnPage: env.isFixedOnPage,
	    direction: direction,
	    client: client,
	    page: page,
	    closest: closest
	  });
	  return dimension;
	});

	function withoutPlaceholder(placeholder, fn) {
	  if (!placeholder) {
	    return fn();
	  }

	  var last = placeholder.style.display;
	  placeholder.style.display = 'none';
	  var result = fn();
	  placeholder.style.display = last;
	  return result;
	}

	var immediate = {
	  passive: false
	};
	var delayed = {
	  passive: true
	};
	var getListenerOptions = (function (options) {
	  return options.shouldPublishImmediately ? immediate : delayed;
	});

	function useRequiredContext(Context) {
	  var result = React.useContext(Context);
	  !result ? invariant(false, 'Could not find required context') : void 0;
	  return result;
	}

	var getClosestScrollableFromDrag = function getClosestScrollableFromDrag(dragging) {
	  return dragging && dragging.env.closestScrollable || null;
	};

	function useDroppableDimensionPublisher(args) {
	  var whileDraggingRef = React.useRef(null);
	  var appContext = useRequiredContext(AppContext);
	  var marshal = appContext.marshal;
	  var previousRef = usePrevious(args);
	  var descriptor = useMemo(function () {
	    return {
	      id: args.droppableId,
	      type: args.type
	    };
	  }, [args.droppableId, args.type]);
	  var publishedDescriptorRef = React.useRef(descriptor);
	  var memoizedUpdateScroll = useMemo(function () {
	    return index(function (x, y) {
	      !whileDraggingRef.current ? invariant(false, 'Can only update scroll when dragging') : void 0;
	      var scroll = {
	        x: x,
	        y: y
	      };
	      marshal.updateDroppableScroll(descriptor.id, scroll);
	    });
	  }, [descriptor.id, marshal]);
	  var getClosestScroll = useCallback(function () {
	    var dragging = whileDraggingRef.current;

	    if (!dragging || !dragging.env.closestScrollable) {
	      return origin;
	    }

	    return getScroll$1(dragging.env.closestScrollable);
	  }, []);
	  var updateScroll = useCallback(function () {
	    var scroll = getClosestScroll();
	    memoizedUpdateScroll(scroll.x, scroll.y);
	  }, [getClosestScroll, memoizedUpdateScroll]);
	  var scheduleScrollUpdate = useMemo(function () {
	    return index$1(updateScroll);
	  }, [updateScroll]);
	  var onClosestScroll = useCallback(function () {
	    var dragging = whileDraggingRef.current;
	    var closest = getClosestScrollableFromDrag(dragging);
	    !(dragging && closest) ? invariant(false, 'Could not find scroll options while scrolling') : void 0;
	    var options = dragging.scrollOptions;

	    if (options.shouldPublishImmediately) {
	      updateScroll();
	      return;
	    }

	    scheduleScrollUpdate();
	  }, [scheduleScrollUpdate, updateScroll]);
	  var getDimensionAndWatchScroll = useCallback(function (windowScroll, options) {
	    !!whileDraggingRef.current ? invariant(false, 'Cannot collect a droppable while a drag is occurring') : void 0;
	    var previous = previousRef.current;
	    var ref = previous.getDroppableRef();
	    !ref ? invariant(false, 'Cannot collect without a droppable ref') : void 0;
	    var env = getEnv(ref);
	    var dragging = {
	      ref: ref,
	      descriptor: descriptor,
	      env: env,
	      scrollOptions: options
	    };
	    whileDraggingRef.current = dragging;
	    var dimension = getDimension({
	      ref: ref,
	      descriptor: descriptor,
	      env: env,
	      windowScroll: windowScroll,
	      direction: previous.direction,
	      isDropDisabled: previous.isDropDisabled,
	      isCombineEnabled: previous.isCombineEnabled,
	      shouldClipSubject: !previous.ignoreContainerClipping
	    });

	    if (env.closestScrollable) {
	      env.closestScrollable.addEventListener('scroll', onClosestScroll, getListenerOptions(dragging.scrollOptions));

	      {
	        checkForNestedScrollContainers(env.closestScrollable);
	      }
	    }

	    return dimension;
	  }, [descriptor, onClosestScroll, previousRef]);
	  var recollect = useCallback(function (options) {
	    var dragging = whileDraggingRef.current;
	    var closest = getClosestScrollableFromDrag(dragging);
	    !(dragging && closest) ? invariant(false, 'Can only recollect Droppable client for Droppables that have a scroll container') : void 0;
	    var previous = previousRef.current;

	    var execute = function execute() {
	      return getDimension({
	        ref: dragging.ref,
	        descriptor: dragging.descriptor,
	        env: dragging.env,
	        windowScroll: origin,
	        direction: previous.direction,
	        isDropDisabled: previous.isDropDisabled,
	        isCombineEnabled: previous.isCombineEnabled,
	        shouldClipSubject: !previous.ignoreContainerClipping
	      });
	    };

	    if (!options.withoutPlaceholder) {
	      return execute();
	    }

	    return withoutPlaceholder(previous.getPlaceholderRef(), execute);
	  }, [previousRef]);
	  var dragStopped = useCallback(function () {
	    var dragging = whileDraggingRef.current;
	    !dragging ? invariant(false, 'Cannot stop drag when no active drag') : void 0;
	    var closest = getClosestScrollableFromDrag(dragging);
	    whileDraggingRef.current = null;

	    if (!closest) {
	      return;
	    }

	    scheduleScrollUpdate.cancel();
	    closest.removeEventListener('scroll', onClosestScroll, getListenerOptions(dragging.scrollOptions));
	  }, [onClosestScroll, scheduleScrollUpdate]);
	  var scroll = useCallback(function (change) {
	    var dragging = whileDraggingRef.current;
	    !dragging ? invariant(false, 'Cannot scroll when there is no drag') : void 0;
	    var closest = getClosestScrollableFromDrag(dragging);
	    !closest ? invariant(false, 'Cannot scroll a droppable with no closest scrollable') : void 0;
	    closest.scrollTop += change.y;
	    closest.scrollLeft += change.x;
	  }, []);
	  var callbacks = useMemo(function () {
	    return {
	      getDimensionAndWatchScroll: getDimensionAndWatchScroll,
	      recollect: recollect,
	      dragStopped: dragStopped,
	      scroll: scroll
	    };
	  }, [dragStopped, getDimensionAndWatchScroll, recollect, scroll]);
	  useIsomorphicLayoutEffect$1(function () {
	    publishedDescriptorRef.current = descriptor;
	    marshal.registerDroppable(descriptor, callbacks);
	    return function () {
	      if (whileDraggingRef.current) {
	        warning('Unsupported: changing the droppableId or type of a Droppable during a drag');
	        dragStopped();
	      }

	      marshal.unregisterDroppable(descriptor);
	    };
	  }, [callbacks, descriptor, dragStopped, marshal]);
	  useIsomorphicLayoutEffect$1(function () {
	    if (!whileDraggingRef.current) {
	      return;
	    }

	    marshal.updateDroppableIsEnabled(publishedDescriptorRef.current.id, !args.isDropDisabled);
	  }, [args.isDropDisabled, marshal]);
	  useIsomorphicLayoutEffect$1(function () {
	    if (!whileDraggingRef.current) {
	      return;
	    }

	    marshal.updateDroppableIsCombineEnabled(publishedDescriptorRef.current.id, args.isCombineEnabled);
	  }, [args.isCombineEnabled, marshal]);
	}

	function noop() {}

	var empty = {
	  width: 0,
	  height: 0,
	  margin: noSpacing$1
	};

	var getSize = function getSize(_ref) {
	  var isAnimatingOpenOnMount = _ref.isAnimatingOpenOnMount,
	      placeholder = _ref.placeholder,
	      animate = _ref.animate;

	  if (isAnimatingOpenOnMount) {
	    return empty;
	  }

	  if (animate === 'close') {
	    return empty;
	  }

	  return {
	    height: placeholder.client.borderBox.height,
	    width: placeholder.client.borderBox.width,
	    margin: placeholder.client.margin
	  };
	};

	var getStyle = function getStyle(_ref2) {
	  var isAnimatingOpenOnMount = _ref2.isAnimatingOpenOnMount,
	      placeholder = _ref2.placeholder,
	      animate = _ref2.animate;
	  var size = getSize({
	    isAnimatingOpenOnMount: isAnimatingOpenOnMount,
	    placeholder: placeholder,
	    animate: animate
	  });
	  return {
	    display: placeholder.display,
	    boxSizing: 'border-box',
	    width: size.width,
	    height: size.height,
	    marginTop: size.margin.top,
	    marginRight: size.margin.right,
	    marginBottom: size.margin.bottom,
	    marginLeft: size.margin.left,
	    flexShrink: '0',
	    flexGrow: '0',
	    pointerEvents: 'none',
	    transition: transitions.placeholder
	  };
	};

	function Placeholder(props) {
	  var animateOpenTimerRef = React.useRef(null);
	  var tryClearAnimateOpenTimer = useCallback(function () {
	    if (!animateOpenTimerRef.current) {
	      return;
	    }

	    clearTimeout(animateOpenTimerRef.current);
	    animateOpenTimerRef.current = null;
	  }, []);
	  var animate = props.animate,
	      onTransitionEnd = props.onTransitionEnd,
	      onClose = props.onClose,
	      styleContext = props.styleContext;

	  var _useState = React.useState(props.animate === 'open'),
	      isAnimatingOpenOnMount = _useState[0],
	      setIsAnimatingOpenOnMount = _useState[1];

	  React.useEffect(function () {
	    if (!isAnimatingOpenOnMount) {
	      return noop;
	    }

	    if (animate !== 'open') {
	      tryClearAnimateOpenTimer();
	      setIsAnimatingOpenOnMount(false);
	      return noop;
	    }

	    if (animateOpenTimerRef.current) {
	      return noop;
	    }

	    animateOpenTimerRef.current = setTimeout(function () {
	      animateOpenTimerRef.current = null;
	      setIsAnimatingOpenOnMount(false);
	    });
	    return tryClearAnimateOpenTimer;
	  }, [animate, isAnimatingOpenOnMount, tryClearAnimateOpenTimer]);
	  var onSizeChangeEnd = useCallback(function (event) {
	    if (event.propertyName !== 'height') {
	      return;
	    }

	    onTransitionEnd();

	    if (animate === 'close') {
	      onClose();
	    }
	  }, [animate, onClose, onTransitionEnd]);
	  var style = getStyle({
	    isAnimatingOpenOnMount: isAnimatingOpenOnMount,
	    animate: props.animate,
	    placeholder: props.placeholder
	  });
	  return React__default.createElement(props.placeholder.tagName, {
	    style: style,
	    'data-react-beautiful-dnd-placeholder': styleContext,
	    onTransitionEnd: onSizeChangeEnd,
	    ref: props.innerRef
	  });
	}

	var Placeholder$1 = React__default.memo(Placeholder);

	var DroppableContext = React__default.createContext(null);

	var getWindowFromEl = (function (el) {
	  return el && el.ownerDocument ? el.ownerDocument.defaultView : window;
	});

	function isHtmlElement(el) {
	  return el instanceof getWindowFromEl(el).HTMLElement;
	}

	function checkIsValidInnerRef(el) {
	  !(el && isHtmlElement(el)) ? invariant(false, "\n    provided.innerRef has not been provided with a HTMLElement.\n\n    You can find a guide on using the innerRef callback functions at:\n    https://github.com/atlassian/react-beautiful-dnd/blob/master/docs/guides/using-inner-ref.md\n  ") : void 0;
	}

	function checkOwnProps(props) {
	  !props.droppableId ? invariant(false, 'A Droppable requires a droppableId prop') : void 0;
	  !(typeof props.isDropDisabled === 'boolean') ? invariant(false, 'isDropDisabled must be a boolean') : void 0;
	  !(typeof props.isCombineEnabled === 'boolean') ? invariant(false, 'isCombineEnabled must be a boolean') : void 0;
	  !(typeof props.ignoreContainerClipping === 'boolean') ? invariant(false, 'ignoreContainerClipping must be a boolean') : void 0;
	}

	function checkPlaceholderRef(props, placeholderEl) {
	  if (!props.placeholder) {
	    return;
	  }

	  if (placeholderEl) {
	    return;
	  }

	  warning("\n    Droppable setup issue [droppableId: \"" + props.droppableId + "\"]:\n    DroppableProvided > placeholder could not be found.\n\n    Please be sure to add the {provided.placeholder} React Node as a child of your Droppable.\n    More information: https://github.com/atlassian/react-beautiful-dnd/blob/master/docs/api/droppable.md\n  ");
	}

	function useValidation(_ref) {
	  var props = _ref.props,
	      getDroppableRef = _ref.getDroppableRef,
	      getPlaceholderRef = _ref.getPlaceholderRef;
	  React.useEffect(function () {
	    {
	      checkOwnProps(props);
	      checkIsValidInnerRef(getDroppableRef());
	      checkPlaceholderRef(props, getPlaceholderRef());
	    }
	  });
	}

	var AnimateInOut = function (_React$PureComponent) {
	  _inheritsLoose(AnimateInOut, _React$PureComponent);

	  function AnimateInOut() {
	    var _this;

	    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    _this = _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args)) || this;
	    _this.state = {
	      isVisible: Boolean(_this.props.on),
	      data: _this.props.on,
	      animate: _this.props.shouldAnimate && _this.props.on ? 'open' : 'none'
	    };

	    _this.onClose = function () {
	      if (_this.state.animate !== 'close') {
	        return;
	      }

	      _this.setState({
	        isVisible: false
	      });
	    };

	    return _this;
	  }

	  AnimateInOut.getDerivedStateFromProps = function getDerivedStateFromProps(props, state) {
	    if (!props.shouldAnimate) {
	      return {
	        isVisible: Boolean(props.on),
	        data: props.on,
	        animate: 'none'
	      };
	    }

	    if (props.on) {
	      return {
	        isVisible: true,
	        data: props.on,
	        animate: 'open'
	      };
	    }

	    if (state.isVisible) {
	      return {
	        isVisible: true,
	        data: state.data,
	        animate: 'close'
	      };
	    }

	    return {
	      isVisible: false,
	      animate: 'close',
	      data: null
	    };
	  };

	  var _proto = AnimateInOut.prototype;

	  _proto.render = function render() {
	    if (!this.state.isVisible) {
	      return null;
	    }

	    var provided = {
	      onClose: this.onClose,
	      data: this.state.data,
	      animate: this.state.animate
	    };
	    return this.props.children(provided);
	  };

	  return AnimateInOut;
	}(React__default.PureComponent);

	function Droppable(props) {
	  var appContext = React.useContext(AppContext);
	  !appContext ? invariant(false, 'Could not find app context') : void 0;
	  var styleContext = appContext.style,
	      isMovementAllowed = appContext.isMovementAllowed;
	  var droppableRef = React.useRef(null);
	  var placeholderRef = React.useRef(null);
	  var children = props.children,
	      droppableId = props.droppableId,
	      type = props.type,
	      direction = props.direction,
	      ignoreContainerClipping = props.ignoreContainerClipping,
	      isDropDisabled = props.isDropDisabled,
	      isCombineEnabled = props.isCombineEnabled,
	      snapshot = props.snapshot,
	      updateViewportMaxScroll = props.updateViewportMaxScroll;
	  var getDroppableRef = useCallback(function () {
	    return droppableRef.current;
	  }, []);
	  var getPlaceholderRef = useCallback(function () {
	    return placeholderRef.current;
	  }, []);
	  var setDroppableRef = useCallback(function (value) {
	    droppableRef.current = value;
	  }, []);
	  var setPlaceholderRef = useCallback(function (value) {
	    placeholderRef.current = value;
	  }, []);
	  var onPlaceholderTransitionEnd = useCallback(function () {
	    if (isMovementAllowed()) {
	      updateViewportMaxScroll({
	        maxScroll: getMaxWindowScroll()
	      });
	    }
	  }, [isMovementAllowed, updateViewportMaxScroll]);
	  useDroppableDimensionPublisher({
	    droppableId: droppableId,
	    type: type,
	    direction: direction,
	    isDropDisabled: isDropDisabled,
	    isCombineEnabled: isCombineEnabled,
	    ignoreContainerClipping: ignoreContainerClipping,
	    getDroppableRef: getDroppableRef,
	    getPlaceholderRef: getPlaceholderRef
	  });
	  var placeholder = React__default.createElement(AnimateInOut, {
	    on: props.placeholder,
	    shouldAnimate: props.shouldAnimatePlaceholder
	  }, function (_ref) {
	    var onClose = _ref.onClose,
	        data = _ref.data,
	        animate = _ref.animate;
	    return React__default.createElement(Placeholder$1, {
	      placeholder: data,
	      onClose: onClose,
	      innerRef: setPlaceholderRef,
	      animate: animate,
	      styleContext: styleContext,
	      onTransitionEnd: onPlaceholderTransitionEnd
	    });
	  });
	  var provided = useMemo(function () {
	    return {
	      innerRef: setDroppableRef,
	      placeholder: placeholder,
	      droppableProps: {
	        'data-react-beautiful-dnd-droppable': styleContext
	      }
	    };
	  }, [placeholder, setDroppableRef, styleContext]);
	  var droppableContext = useMemo(function () {
	    return {
	      droppableId: droppableId,
	      type: type
	    };
	  }, [droppableId, type]);
	  useValidation({
	    props: props,
	    getDroppableRef: function getDroppableRef() {
	      return droppableRef.current;
	    },
	    getPlaceholderRef: function getPlaceholderRef() {
	      return placeholderRef.current;
	    }
	  });
	  return React__default.createElement(DroppableContext.Provider, {
	    value: droppableContext
	  }, children(provided, snapshot));
	}

	var isStrictEqual = (function (a, b) {
	  return a === b;
	});

	var whatIsDraggedOverFromResult = (function (result) {
	  var combine = result.combine,
	      destination = result.destination;

	  if (destination) {
	    return destination.droppableId;
	  }

	  if (combine) {
	    return combine.droppableId;
	  }

	  return null;
	});

	var isMatchingType = function isMatchingType(type, critical) {
	  return type === critical.droppable.type;
	};

	var getDraggable = function getDraggable(critical, dimensions) {
	  return dimensions.draggables[critical.draggable.id];
	};

	var makeMapStateToProps = function makeMapStateToProps() {
	  var idle = {
	    placeholder: null,
	    shouldAnimatePlaceholder: true,
	    snapshot: {
	      isDraggingOver: false,
	      draggingOverWith: null,
	      draggingFromThisWith: null
	    }
	  };

	  var idleWithoutAnimation = _extends({}, idle, {
	    shouldAnimatePlaceholder: false
	  });

	  var getMapProps = index(function (id, isDraggingOver, dragging, snapshot) {
	    var isHome = dragging.descriptor.droppableId === id;

	    if (isHome) {
	      return {
	        placeholder: dragging.placeholder,
	        shouldAnimatePlaceholder: false,
	        snapshot: snapshot
	      };
	    }

	    if (!isDraggingOver) {
	      return idle;
	    }

	    return {
	      placeholder: dragging.placeholder,
	      shouldAnimatePlaceholder: true,
	      snapshot: snapshot
	    };
	  });
	  var getSnapshot = index(function (id, isDraggingOver, dragging) {
	    var draggableId = dragging.descriptor.id;
	    var isHome = dragging.descriptor.droppableId === id;
	    var draggingOverWith = isDraggingOver ? draggableId : null;
	    var draggingFromThisWith = isHome ? draggableId : null;
	    return {
	      isDraggingOver: isDraggingOver,
	      draggingOverWith: draggingOverWith,
	      draggingFromThisWith: draggingFromThisWith
	    };
	  });

	  var selector = function selector(state, ownProps) {
	    var id = ownProps.droppableId;
	    var type = ownProps.type;

	    if (state.isDragging) {
	      var critical = state.critical;

	      if (!isMatchingType(type, critical)) {
	        return idle;
	      }

	      var dragging = getDraggable(critical, state.dimensions);
	      var isDraggingOver = whatIsDraggedOver(state.impact) === id;
	      var snapshot = getSnapshot(id, isDraggingOver, dragging);
	      return getMapProps(id, isDraggingOver, dragging, snapshot);
	    }

	    if (state.phase === 'DROP_ANIMATING') {
	      var completed = state.completed;

	      if (!isMatchingType(type, completed.critical)) {
	        return idle;
	      }

	      var _dragging = getDraggable(completed.critical, state.dimensions);

	      var _snapshot = getSnapshot(id, whatIsDraggedOverFromResult(completed.result) === id, _dragging);

	      return getMapProps(id, whatIsDraggedOver(completed.impact) === id, _dragging, _snapshot);
	    }

	    if (state.phase === 'IDLE' && !state.completed && state.shouldFlush) {
	      return idleWithoutAnimation;
	    }

	    if (state.phase === 'IDLE' && state.completed) {
	      var _completed = state.completed;

	      if (!isMatchingType(type, _completed.critical)) {
	        return idle;
	      }

	      var wasOver = whatIsDraggedOver(_completed.impact) === id;
	      var wasCombining = Boolean(_completed.impact.merge);

	      if (state.shouldFlush) {
	        return idleWithoutAnimation;
	      }

	      if (wasOver) {
	        return wasCombining ? idle : idleWithoutAnimation;
	      }

	      return idle;
	    }

	    return idle;
	  };

	  return selector;
	};
	var mapDispatchToProps = {
	  updateViewportMaxScroll: updateViewportMaxScroll
	};
	var defaultProps = {
	  type: 'DEFAULT',
	  direction: 'vertical',
	  isDropDisabled: false,
	  isCombineEnabled: false,
	  ignoreContainerClipping: false
	};
	var ConnectedDroppable = connect(makeMapStateToProps, mapDispatchToProps, null, {
	  context: StoreContext,
	  pure: true,
	  areStatePropsEqual: isStrictEqual
	})(Droppable);
	ConnectedDroppable.defaultProps = defaultProps;

	var zIndexOptions = {
	  dragging: 5000,
	  dropAnimating: 4500
	};

	var getDraggingTransition = function getDraggingTransition(shouldAnimateDragMovement, dropping) {
	  if (dropping) {
	    return transitions.drop(dropping.duration);
	  }

	  if (shouldAnimateDragMovement) {
	    return transitions.snap;
	  }

	  return transitions.fluid;
	};

	var getDraggingOpacity = function getDraggingOpacity(isCombining, isDropAnimating) {
	  if (!isCombining) {
	    return null;
	  }

	  return isDropAnimating ? combine.opacity.drop : combine.opacity.combining;
	};

	var getShouldDraggingAnimate = function getShouldDraggingAnimate(dragging) {
	  if (dragging.forceShouldAnimate != null) {
	    return dragging.forceShouldAnimate;
	  }

	  return dragging.mode === 'SNAP';
	};

	function getDraggingStyle(dragging) {
	  var dimension = dragging.dimension;
	  var box = dimension.client;
	  var offset = dragging.offset,
	      combineWith = dragging.combineWith,
	      dropping = dragging.dropping;
	  var isCombining = Boolean(combineWith);
	  var shouldAnimate = getShouldDraggingAnimate(dragging);
	  var isDropAnimating = Boolean(dropping);
	  var transform = isDropAnimating ? transforms.drop(offset, isCombining) : transforms.moveTo(offset);
	  var style = {
	    position: 'fixed',
	    top: box.marginBox.top,
	    left: box.marginBox.left,
	    boxSizing: 'border-box',
	    width: box.borderBox.width,
	    height: box.borderBox.height,
	    transition: getDraggingTransition(shouldAnimate, dropping),
	    transform: transform,
	    opacity: getDraggingOpacity(isCombining, isDropAnimating),
	    zIndex: isDropAnimating ? zIndexOptions.dropAnimating : zIndexOptions.dragging,
	    pointerEvents: 'none'
	  };
	  return style;
	}

	function getSecondaryStyle(secondary) {
	  return {
	    transform: transforms.moveTo(secondary.offset),
	    transition: secondary.shouldAnimateDisplacement ? null : 'none'
	  };
	}

	function getStyle$1(mapped) {
	  return mapped.type === 'DRAGGING' ? getDraggingStyle(mapped) : getSecondaryStyle(mapped);
	}

	var createEventMarshal = (function () {
	  var isMouseDownHandled = false;

	  var handle = function handle() {
	    !!isMouseDownHandled ? invariant(false, 'Cannot handle mouse down as it is already handled') : void 0;
	    isMouseDownHandled = true;
	  };

	  var isHandled = function isHandled() {
	    return isMouseDownHandled;
	  };

	  var reset = function reset() {
	    isMouseDownHandled = false;
	  };

	  return {
	    handle: handle,
	    isHandled: isHandled,
	    reset: reset
	  };
	});

	var getOptions = function getOptions(shared, fromBinding) {
	  return _extends({}, shared, fromBinding);
	};

	var bindEvents = function bindEvents(el, bindings, sharedOptions) {
	  bindings.forEach(function (binding) {
	    var options = getOptions(sharedOptions, binding.options);
	    el.addEventListener(binding.eventName, binding.fn, options);
	  });
	};
	var unbindEvents = function unbindEvents(el, bindings, sharedOptions) {
	  bindings.forEach(function (binding) {
	    var options = getOptions(sharedOptions, binding.options);
	    el.removeEventListener(binding.eventName, binding.fn, options);
	  });
	};

	var createScheduler = (function (callbacks) {
	  var memoizedMove = index(function (x, y) {
	    var point = {
	      x: x,
	      y: y
	    };
	    callbacks.onMove(point);
	  });
	  var move = index$1(function (point) {
	    return memoizedMove(point.x, point.y);
	  });
	  var moveUp = index$1(callbacks.onMoveUp);
	  var moveDown = index$1(callbacks.onMoveDown);
	  var moveRight = index$1(callbacks.onMoveRight);
	  var moveLeft = index$1(callbacks.onMoveLeft);
	  var windowScrollMove = index$1(callbacks.onWindowScroll);

	  var cancel = function cancel() {
	    move.cancel();
	    moveUp.cancel();
	    moveDown.cancel();
	    moveRight.cancel();
	    moveLeft.cancel();
	    windowScrollMove.cancel();
	  };

	  return {
	    move: move,
	    moveUp: moveUp,
	    moveDown: moveDown,
	    moveRight: moveRight,
	    moveLeft: moveLeft,
	    windowScrollMove: windowScrollMove,
	    cancel: cancel
	  };
	});

	var tab = 9;
	var enter = 13;
	var escape = 27;
	var space = 32;
	var pageUp = 33;
	var pageDown = 34;
	var end = 35;
	var home = 36;
	var arrowLeft = 37;
	var arrowUp = 38;
	var arrowRight = 39;
	var arrowDown = 40;

	var supportedEventName = function () {
	  var base = 'visibilitychange';

	  if (typeof document === 'undefined') {
	    return base;
	  }

	  var candidates = [base, "ms" + base, "webkit" + base, "moz" + base, "o" + base];
	  var supported = find(candidates, function (eventName) {
	    return "on" + eventName in document;
	  });
	  return supported || base;
	}();

	var sharedOptions = {
	  capture: true
	};
	var createPostDragEventPreventer = (function (getWindow) {
	  var isBound = false;

	  var bind = function bind() {
	    if (isBound) {
	      return;
	    }

	    isBound = true;
	    bindEvents(getWindow(), pointerEvents, sharedOptions);
	  };

	  var unbind = function unbind() {
	    if (!isBound) {
	      return;
	    }

	    isBound = false;
	    unbindEvents(getWindow(), pointerEvents, sharedOptions);
	  };

	  var pointerEvents = [{
	    eventName: 'click',
	    fn: function fn(event) {
	      event.preventDefault();
	      unbind();
	    }
	  }, {
	    eventName: 'mousedown',
	    fn: unbind
	  }, {
	    eventName: 'touchstart',
	    fn: unbind
	  }];

	  var preventNext = function preventNext() {
	    if (isBound) {
	      unbind();
	    }

	    bind();
	  };

	  var preventer = {
	    preventNext: preventNext,
	    abort: unbind
	  };
	  return preventer;
	});

	var sloppyClickThreshold = 5;
	var isSloppyClickThresholdExceeded = (function (original, current) {
	  return Math.abs(current.x - original.x) >= sloppyClickThreshold || Math.abs(current.y - original.y) >= sloppyClickThreshold;
	});

	var _preventedKeys;
	var preventedKeys = (_preventedKeys = {}, _preventedKeys[enter] = true, _preventedKeys[tab] = true, _preventedKeys);
	var preventStandardKeyEvents = (function (event) {
	  if (preventedKeys[event.keyCode]) {
	    event.preventDefault();
	  }
	});

	var primaryButton = 0;

	var noop$1 = function noop() {};

	var mouseDownMarshal = createEventMarshal();
	function useMouseSensor(args) {
	  var canStartCapturing = args.canStartCapturing,
	      getWindow = args.getWindow,
	      callbacks = args.callbacks,
	      onCaptureStart = args.onCaptureStart,
	      onCaptureEnd = args.onCaptureEnd;
	  var pendingRef = React.useRef(null);
	  var isDraggingRef = React.useRef(false);
	  var unbindWindowEventsRef = React.useRef(noop$1);
	  var getIsCapturing = useCallback(function () {
	    return Boolean(pendingRef.current || isDraggingRef.current);
	  }, []);
	  var schedule = useMemo(function () {
	    !!getIsCapturing() ? invariant(false, 'Should not recreate scheduler while capturing') : void 0;
	    return createScheduler(callbacks);
	  }, [callbacks, getIsCapturing]);
	  var postDragEventPreventer = useMemo(function () {
	    return createPostDragEventPreventer(getWindow);
	  }, [getWindow]);
	  var stop = useCallback(function () {
	    if (!getIsCapturing()) {
	      return;
	    }

	    schedule.cancel();
	    unbindWindowEventsRef.current();
	    var shouldBlockClick = isDraggingRef.current;
	    mouseDownMarshal.reset();

	    if (shouldBlockClick) {
	      postDragEventPreventer.preventNext();
	    }

	    pendingRef.current = null;
	    isDraggingRef.current = false;
	    onCaptureEnd();
	  }, [getIsCapturing, onCaptureEnd, postDragEventPreventer, schedule]);
	  var cancel = useCallback(function () {
	    var wasDragging = isDraggingRef.current;
	    stop();

	    if (wasDragging) {
	      callbacks.onCancel();
	    }
	  }, [callbacks, stop]);
	  var startDragging = useCallback(function () {
	    !!isDraggingRef.current ? invariant(false, 'Cannot start a drag while dragging') : void 0;
	    var pending = pendingRef.current;
	    !pending ? invariant(false, 'Cannot start a drag without a pending drag') : void 0;
	    pendingRef.current = null;
	    isDraggingRef.current = true;
	    callbacks.onLift({
	      clientSelection: pending,
	      movementMode: 'FLUID'
	    });
	  }, [callbacks]);
	  var windowBindings = useMemo(function () {
	    !!getIsCapturing() ? invariant(false, 'Should not recreate window bindings while capturing') : void 0;
	    var bindings = [{
	      eventName: 'mousemove',
	      fn: function fn(event) {
	        var button = event.button,
	            clientX = event.clientX,
	            clientY = event.clientY;

	        if (button !== primaryButton) {
	          return;
	        }

	        var point = {
	          x: clientX,
	          y: clientY
	        };

	        if (isDraggingRef.current) {
	          event.preventDefault();
	          schedule.move(point);
	          return;
	        }

	        var pending = pendingRef.current;

	        if (!pending) {
	          stop();
	          invariant(false, 'Expected there to be an active or pending drag when window mousemove event is received');
	        }

	        if (!isSloppyClickThresholdExceeded(pending, point)) {
	          return;
	        }

	        event.preventDefault();
	        startDragging();
	      }
	    }, {
	      eventName: 'mouseup',
	      fn: function fn(event) {
	        var wasDragging = isDraggingRef.current;
	        stop();

	        if (wasDragging) {
	          event.preventDefault();
	          callbacks.onDrop();
	        }
	      }
	    }, {
	      eventName: 'mousedown',
	      fn: function fn(event) {
	        if (isDraggingRef.current) {
	          event.preventDefault();
	        }

	        cancel();
	      }
	    }, {
	      eventName: 'keydown',
	      fn: function fn(event) {
	        if (pendingRef.current) {
	          stop();
	          return;
	        }

	        if (event.keyCode === escape) {
	          event.preventDefault();
	          cancel();
	          return;
	        }

	        preventStandardKeyEvents(event);
	      }
	    }, {
	      eventName: 'resize',
	      fn: cancel
	    }, {
	      eventName: 'scroll',
	      options: {
	        passive: true,
	        capture: false
	      },
	      fn: function fn(event) {
	        if (event.currentTarget !== getWindow()) {
	          return;
	        }

	        if (pendingRef.current) {
	          stop();
	          return;
	        }

	        schedule.windowScrollMove();
	      }
	    }, {
	      eventName: 'webkitmouseforcedown',
	      fn: function fn() {
	        cancel();
	      }
	    }, {
	      eventName: supportedEventName,
	      fn: cancel
	    }];
	    return bindings;
	  }, [getIsCapturing, cancel, startDragging, schedule, stop, callbacks, getWindow]);
	  var bindWindowEvents = useCallback(function () {
	    var win = getWindow();
	    var options = {
	      capture: true
	    };

	    unbindWindowEventsRef.current = function () {
	      return unbindEvents(win, windowBindings, options);
	    };

	    bindEvents(win, windowBindings, options);
	  }, [getWindow, windowBindings]);
	  var startPendingDrag = useCallback(function (point) {
	    !!pendingRef.current ? invariant(false, 'Expected there to be no pending drag') : void 0;
	    pendingRef.current = point;
	    onCaptureStart(stop);
	    bindWindowEvents();
	  }, [bindWindowEvents, onCaptureStart, stop]);
	  var onMouseDown = useCallback(function (event) {
	    if (mouseDownMarshal.isHandled()) {
	      return;
	    }

	    !!getIsCapturing() ? invariant(false, 'Should not be able to perform a mouse down while a drag or pending drag is occurring') : void 0;

	    if (!canStartCapturing(event)) {
	      return;
	    }

	    if (event.button !== primaryButton) {
	      return;
	    }

	    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) {
	      return;
	    }

	    mouseDownMarshal.handle();
	    event.preventDefault();
	    var point = {
	      x: event.clientX,
	      y: event.clientY
	    };
	    startPendingDrag(point);
	  }, [canStartCapturing, getIsCapturing, startPendingDrag]);
	  return onMouseDown;
	}

	function isElement(el) {
	  return el instanceof getWindowFromEl(el).Element;
	}

	var interactiveTagNames = {
	  input: true,
	  button: true,
	  textarea: true,
	  select: true,
	  option: true,
	  optgroup: true,
	  video: true,
	  audio: true
	};

	var isAnInteractiveElement = function isAnInteractiveElement(parent, current) {
	  if (current == null) {
	    return false;
	  }

	  var hasAnInteractiveTag = Boolean(interactiveTagNames[current.tagName.toLowerCase()]);

	  if (hasAnInteractiveTag) {
	    return true;
	  }

	  var attribute = current.getAttribute('contenteditable');

	  if (attribute === 'true' || attribute === '') {
	    return true;
	  }

	  if (current === parent) {
	    return false;
	  }

	  return isAnInteractiveElement(parent, current.parentElement);
	};

	var shouldAllowDraggingFromTarget = (function (event, canDragInteractiveElements) {
	  if (canDragInteractiveElements) {
	    return true;
	  }

	  var target = event.target,
	      currentTarget = event.currentTarget;

	  if (!isElement(target) || !isElement(currentTarget)) {
	    return true;
	  }

	  return !isAnInteractiveElement(currentTarget, target);
	});

	var getBorderBoxCenterPosition = (function (el) {
	  return getRect(el.getBoundingClientRect()).center;
	});

	var _scrollJumpKeys;
	var scrollJumpKeys = (_scrollJumpKeys = {}, _scrollJumpKeys[pageDown] = true, _scrollJumpKeys[pageUp] = true, _scrollJumpKeys[home] = true, _scrollJumpKeys[end] = true, _scrollJumpKeys);

	function noop$2() {}

	function useKeyboardSensor(args) {
	  var canStartCapturing = args.canStartCapturing,
	      getWindow = args.getWindow,
	      callbacks = args.callbacks,
	      onCaptureStart = args.onCaptureStart,
	      onCaptureEnd = args.onCaptureEnd,
	      getDraggableRef = args.getDraggableRef;
	  var isDraggingRef = React.useRef(false);
	  var unbindWindowEventsRef = React.useRef(noop$2);
	  var getIsDragging = useCallback(function () {
	    return isDraggingRef.current;
	  }, []);
	  var schedule = useMemo(function () {
	    !!getIsDragging() ? invariant(false, 'Should not recreate scheduler while capturing') : void 0;
	    return createScheduler(callbacks);
	  }, [callbacks, getIsDragging]);
	  var stop = useCallback(function () {
	    if (!getIsDragging()) {
	      return;
	    }

	    schedule.cancel();
	    unbindWindowEventsRef.current();
	    isDraggingRef.current = false;
	    onCaptureEnd();
	  }, [getIsDragging, onCaptureEnd, schedule]);
	  var cancel = useCallback(function () {
	    var wasDragging = isDraggingRef.current;
	    stop();

	    if (wasDragging) {
	      callbacks.onCancel();
	    }
	  }, [callbacks, stop]);
	  var windowBindings = useMemo(function () {
	    !!getIsDragging() ? invariant(false, 'Should not recreate window bindings when dragging') : void 0;
	    return [{
	      eventName: 'mousedown',
	      fn: cancel
	    }, {
	      eventName: 'mouseup',
	      fn: cancel
	    }, {
	      eventName: 'click',
	      fn: cancel
	    }, {
	      eventName: 'touchstart',
	      fn: cancel
	    }, {
	      eventName: 'resize',
	      fn: cancel
	    }, {
	      eventName: 'wheel',
	      fn: cancel,
	      options: {
	        passive: true
	      }
	    }, {
	      eventName: 'scroll',
	      options: {
	        capture: false
	      },
	      fn: function fn(event) {
	        if (event.currentTarget !== getWindow()) {
	          return;
	        }

	        callbacks.onWindowScroll();
	      }
	    }, {
	      eventName: supportedEventName,
	      fn: cancel
	    }];
	  }, [callbacks, cancel, getIsDragging, getWindow]);
	  var bindWindowEvents = useCallback(function () {
	    var win = getWindow();
	    var options = {
	      capture: true
	    };

	    unbindWindowEventsRef.current = function () {
	      return unbindEvents(win, windowBindings, options);
	    };

	    bindEvents(win, windowBindings, options);
	  }, [getWindow, windowBindings]);
	  var startDragging = useCallback(function () {
	    !!isDraggingRef.current ? invariant(false, 'Cannot start a drag while dragging') : void 0;
	    var ref = getDraggableRef();
	    !ref ? invariant(false, 'Cannot start a keyboard drag without a draggable ref') : void 0;
	    isDraggingRef.current = true;
	    onCaptureStart(stop);
	    bindWindowEvents();
	    var center = getBorderBoxCenterPosition(ref);
	    callbacks.onLift({
	      clientSelection: center,
	      movementMode: 'SNAP'
	    });
	  }, [bindWindowEvents, callbacks, getDraggableRef, onCaptureStart, stop]);
	  var onKeyDown = useCallback(function (event) {
	    if (!getIsDragging()) {
	      if (event.defaultPrevented) {
	        return;
	      }

	      if (!canStartCapturing(event)) {
	        return;
	      }

	      if (event.keyCode !== space) {
	        return;
	      }

	      event.preventDefault();
	      startDragging();
	      return;
	    }

	    if (event.keyCode === escape) {
	      event.preventDefault();
	      cancel();
	      return;
	    }

	    if (event.keyCode === space) {
	      event.preventDefault();
	      stop();
	      callbacks.onDrop();
	      return;
	    }

	    if (event.keyCode === arrowDown) {
	      event.preventDefault();
	      schedule.moveDown();
	      return;
	    }

	    if (event.keyCode === arrowUp) {
	      event.preventDefault();
	      schedule.moveUp();
	      return;
	    }

	    if (event.keyCode === arrowRight) {
	      event.preventDefault();
	      schedule.moveRight();
	      return;
	    }

	    if (event.keyCode === arrowLeft) {
	      event.preventDefault();
	      schedule.moveLeft();
	      return;
	    }

	    if (scrollJumpKeys[event.keyCode]) {
	      event.preventDefault();
	      return;
	    }

	    preventStandardKeyEvents(event);
	  }, [callbacks, canStartCapturing, cancel, getIsDragging, schedule, startDragging, stop]);
	  return onKeyDown;
	}

	var timeForLongPress = 120;
	var forcePressThreshold = 0.15;
	var touchStartMarshal = createEventMarshal();

	var noop$3 = function noop() {};

	function useTouchSensor(args) {
	  var callbacks = args.callbacks,
	      getWindow = args.getWindow,
	      canStartCapturing = args.canStartCapturing,
	      getShouldRespectForcePress = args.getShouldRespectForcePress,
	      onCaptureStart = args.onCaptureStart,
	      onCaptureEnd = args.onCaptureEnd;
	  var pendingRef = React.useRef(null);
	  var isDraggingRef = React.useRef(false);
	  var hasMovedRef = React.useRef(false);
	  var unbindWindowEventsRef = React.useRef(noop$3);
	  var getIsCapturing = useCallback(function () {
	    return Boolean(pendingRef.current || isDraggingRef.current);
	  }, []);
	  var postDragClickPreventer = useMemo(function () {
	    return createPostDragEventPreventer(getWindow);
	  }, [getWindow]);
	  var schedule = useMemo(function () {
	    !!getIsCapturing() ? invariant(false, 'Should not recreate scheduler while capturing') : void 0;
	    return createScheduler(callbacks);
	  }, [callbacks, getIsCapturing]);
	  var stop = useCallback(function () {
	    if (!getIsCapturing()) {
	      return;
	    }

	    schedule.cancel();
	    unbindWindowEventsRef.current();
	    touchStartMarshal.reset();
	    hasMovedRef.current = false;
	    onCaptureEnd();

	    if (isDraggingRef.current) {
	      postDragClickPreventer.preventNext();
	      isDraggingRef.current = false;
	      return;
	    }

	    var pending = pendingRef.current;
	    !pending ? invariant(false, 'Expected a pending drag') : void 0;
	    clearTimeout(pending.longPressTimerId);
	    pendingRef.current = null;
	  }, [getIsCapturing, onCaptureEnd, postDragClickPreventer, schedule]);
	  var cancel = useCallback(function () {
	    var wasDragging = isDraggingRef.current;
	    stop();

	    if (wasDragging) {
	      callbacks.onCancel();
	    }
	  }, [callbacks, stop]);
	  var windowBindings = useMemo(function () {
	    !!getIsCapturing() ? invariant(false, 'Should not recreate window bindings while capturing') : void 0;
	    var bindings = [{
	      eventName: 'touchmove',
	      options: {
	        passive: false,
	        capture: false
	      },
	      fn: function fn(event) {
	        if (!isDraggingRef.current) {
	          stop();
	          return;
	        }

	        if (!hasMovedRef.current) {
	          hasMovedRef.current = true;
	        }

	        var touch = event.touches[0];

	        if (!touch) {
	          return;
	        }

	        var point = {
	          x: touch.clientX,
	          y: touch.clientY
	        };
	        event.preventDefault();
	        schedule.move(point);
	      }
	    }, {
	      eventName: 'touchend',
	      fn: function fn(event) {
	        if (!isDraggingRef.current) {
	          stop();
	          return;
	        }

	        event.preventDefault();
	        stop();
	        callbacks.onDrop();
	      }
	    }, {
	      eventName: 'touchcancel',
	      fn: function fn(event) {
	        if (!isDraggingRef.current) {
	          stop();
	          return;
	        }

	        event.preventDefault();
	        cancel();
	      }
	    }, {
	      eventName: 'touchstart',
	      fn: cancel
	    }, {
	      eventName: 'orientationchange',
	      fn: cancel
	    }, {
	      eventName: 'resize',
	      fn: cancel
	    }, {
	      eventName: 'scroll',
	      options: {
	        passive: true,
	        capture: false
	      },
	      fn: function fn() {
	        if (pendingRef.current) {
	          stop();
	          return;
	        }

	        schedule.windowScrollMove();
	      }
	    }, {
	      eventName: 'contextmenu',
	      fn: function fn(event) {
	        event.preventDefault();
	      }
	    }, {
	      eventName: 'keydown',
	      fn: function fn(event) {
	        if (!isDraggingRef.current) {
	          cancel();
	          return;
	        }

	        if (event.keyCode === escape) {
	          event.preventDefault();
	        }

	        cancel();
	      }
	    }, {
	      eventName: 'touchforcechange',
	      fn: function fn(event) {
	        var touch = event.touches[0];
	        var isForcePress = touch.force >= forcePressThreshold;

	        if (!isForcePress) {
	          return;
	        }

	        var shouldRespect = getShouldRespectForcePress();

	        if (pendingRef.current) {
	          if (shouldRespect) {
	            cancel();
	          }

	          return;
	        }

	        if (shouldRespect) {
	          if (hasMovedRef.current) {
	            event.preventDefault();
	            return;
	          }

	          cancel();
	          return;
	        }

	        event.preventDefault();
	      }
	    }, {
	      eventName: supportedEventName,
	      fn: cancel
	    }];
	    return bindings;
	  }, [callbacks, cancel, getIsCapturing, getShouldRespectForcePress, schedule, stop]);
	  var bindWindowEvents = useCallback(function () {
	    var win = getWindow();
	    var options = {
	      capture: true
	    };

	    unbindWindowEventsRef.current = function () {
	      return unbindEvents(win, windowBindings, options);
	    };

	    bindEvents(win, windowBindings, options);
	  }, [getWindow, windowBindings]);
	  var startDragging = useCallback(function () {
	    var pending = pendingRef.current;
	    !pending ? invariant(false, 'Cannot start a drag without a pending drag') : void 0;
	    isDraggingRef.current = true;
	    pendingRef.current = null;
	    hasMovedRef.current = false;
	    callbacks.onLift({
	      clientSelection: pending.point,
	      movementMode: 'FLUID'
	    });
	  }, [callbacks]);
	  var startPendingDrag = useCallback(function (event) {
	    !!pendingRef.current ? invariant(false, 'Expected there to be no pending drag') : void 0;
	    var touch = event.touches[0];
	    var clientX = touch.clientX,
	        clientY = touch.clientY;
	    var point = {
	      x: clientX,
	      y: clientY
	    };
	    var longPressTimerId = setTimeout(startDragging, timeForLongPress);
	    var pending = {
	      point: point,
	      longPressTimerId: longPressTimerId
	    };
	    pendingRef.current = pending;
	    onCaptureStart(stop);
	    bindWindowEvents();
	  }, [bindWindowEvents, onCaptureStart, startDragging, stop]);

	  var onTouchStart = function onTouchStart(event) {
	    if (touchStartMarshal.isHandled()) {
	      return;
	    }

	    !!getIsCapturing() ? invariant(false, 'Should not be able to perform a touch start while a drag or pending drag is occurring') : void 0;

	    if (!canStartCapturing(event)) {
	      return;
	    }

	    touchStartMarshal.handle();
	    startPendingDrag(event);
	  };

	  useIsomorphicLayoutEffect$1(function webkitHack() {
	    var unbind = bindEvents(window, [{
	      eventName: 'touchmove',
	      fn: noop$3,
	      options: {
	        capture: false,
	        passive: false
	      }
	    }]);
	    return unbind;
	  }, []);
	  return onTouchStart;
	}

	function isSvgElement(el) {
	  return Boolean(getWindowFromEl(el).SVGElement) && el instanceof getWindowFromEl(el).SVGElement;
	}

	var selector = "[" + dragHandle + "]";

	var throwIfSVG = function throwIfSVG(el) {
	  !!isSvgElement(el) ? invariant(false, "A drag handle cannot be an SVGElement: it has inconsistent focus support.\n\n    More information: https://github.com/atlassian/react-beautiful-dnd/blob/master/docs/guides/dragging-svgs.md") : void 0;
	};

	var getDragHandleRef = function getDragHandleRef(draggableRef) {
	  if (draggableRef.hasAttribute(dragHandle)) {
	    throwIfSVG(draggableRef);
	    return draggableRef;
	  }

	  var el = draggableRef.querySelector(selector);
	  throwIfSVG(draggableRef);
	  !el ? invariant(false, "\n      Cannot find drag handle element inside of Draggable.\n      Please be sure to apply the {...provided.dragHandleProps} to your Draggable\n\n      More information: https://github.com/atlassian/react-beautiful-dnd/blob/master/docs/api/draggable.md\n    ") : void 0;
	  !isHtmlElement(el) ? invariant(false, 'A drag handle must be a HTMLElement') : void 0;
	  return el;
	};

	function useValidation$1(_ref) {
	  var isEnabled = _ref.isEnabled,
	      getDraggableRef = _ref.getDraggableRef;
	  React.useEffect(function () {
	    {
	      if (!isEnabled) {
	        return;
	      }

	      var draggableRef = getDraggableRef();
	      !draggableRef ? invariant(false, 'Drag handle was unable to find draggable ref') : void 0;
	      getDragHandleRef(draggableRef);
	    }
	  }, [getDraggableRef, isEnabled]);
	}

	var retainingFocusFor = null;
	var listenerOptions = {
	  capture: true
	};

	var clearRetentionOnFocusChange = function () {
	  var isBound = false;

	  var bind = function bind() {
	    if (isBound) {
	      return;
	    }

	    isBound = true;
	    window.addEventListener('focus', onWindowFocusChange, listenerOptions);
	  };

	  var unbind = function unbind() {
	    if (!isBound) {
	      return;
	    }

	    isBound = false;
	    window.removeEventListener('focus', onWindowFocusChange, listenerOptions);
	  };

	  var onWindowFocusChange = function onWindowFocusChange() {
	    unbind();
	    retainingFocusFor = null;
	  };

	  var result = function result() {
	    return bind();
	  };

	  result.cancel = function () {
	    return unbind();
	  };

	  return result;
	}();

	var retain = function retain(id) {
	  retainingFocusFor = id;
	  clearRetentionOnFocusChange();
	};

	var tryRestoreFocus = function tryRestoreFocus(id, draggableRef) {
	  if (!retainingFocusFor) {
	    return;
	  }

	  if (id !== retainingFocusFor) {
	    return;
	  }

	  retainingFocusFor = null;
	  clearRetentionOnFocusChange.cancel();
	  var dragHandleRef = getDragHandleRef(draggableRef);

	  if (!dragHandleRef) {
	    warning('Could not find drag handle in the DOM to focus on it');
	    return;
	  }

	  dragHandleRef.focus();
	};

	var retainer = {
	  retain: retain,
	  tryRestoreFocus: tryRestoreFocus
	};

	function noop$4() {}

	function useFocusRetainer(args) {
	  var isFocusedRef = React.useRef(false);
	  var lastArgsRef = usePrevious(args);
	  var getDraggableRef = args.getDraggableRef;
	  var onFocus = useCallback(function () {
	    isFocusedRef.current = true;
	  }, []);
	  var onBlur = useCallback(function () {
	    isFocusedRef.current = false;
	  }, []);
	  useIsomorphicLayoutEffect$1(function () {
	    var first = lastArgsRef.current;

	    if (!first.isEnabled) {
	      return noop$4;
	    }

	    var draggable = getDraggableRef();
	    !draggable ? invariant(false, 'Drag handle could not obtain draggable ref') : void 0;
	    var dragHandle = getDragHandleRef(draggable);
	    retainer.tryRestoreFocus(first.draggableId, dragHandle);
	    return function () {
	      var last = lastArgsRef.current;

	      var shouldRetainFocus = function () {
	        if (!last.isEnabled) {
	          return false;
	        }

	        if (!isFocusedRef.current) {
	          return false;
	        }

	        return last.isDragging || last.isDropAnimating;
	      }();

	      if (shouldRetainFocus) {
	        retainer.retain(last.draggableId);
	      }
	    };
	  }, [getDraggableRef, lastArgsRef]);
	  var lastDraggableRef = React.useRef(null);
	  useIsomorphicLayoutEffect$1(function () {
	    if (!lastDraggableRef.current) {
	      return;
	    }

	    var draggableRef = getDraggableRef();

	    if (!draggableRef) {
	      return;
	    }

	    if (draggableRef === lastDraggableRef.current) {
	      return;
	    }

	    if (isFocusedRef.current && lastArgsRef.current.isEnabled) {
	      getDragHandleRef(draggableRef).focus();
	    }
	  });
	  useIsomorphicLayoutEffect$1(function () {
	    lastDraggableRef.current = getDraggableRef();
	  });
	  return {
	    onBlur: onBlur,
	    onFocus: onFocus
	  };
	}

	function preventHtml5Dnd(event) {
	  event.preventDefault();
	}

	function useDragHandle(args) {
	  var capturingRef = React.useRef(null);
	  var onCaptureStart = useCallback(function (abort) {
	    !!capturingRef.current ? invariant(false, 'Cannot start capturing while something else is') : void 0;
	    capturingRef.current = {
	      abort: abort
	    };
	  }, []);
	  var onCaptureEnd = useCallback(function () {
	    !capturingRef.current ? invariant(false, 'Cannot stop capturing while nothing is capturing') : void 0;
	    capturingRef.current = null;
	  }, []);
	  var abortCapture = useCallback(function () {
	    !capturingRef.current ? invariant(false, 'Cannot abort capture when there is none') : void 0;
	    capturingRef.current.abort();
	  }, []);

	  var _useRequiredContext = useRequiredContext(AppContext),
	      canLift = _useRequiredContext.canLift,
	      styleContext = _useRequiredContext.style;

	  var isDragging = args.isDragging,
	      isEnabled = args.isEnabled,
	      draggableId = args.draggableId,
	      callbacks = args.callbacks,
	      getDraggableRef = args.getDraggableRef,
	      getShouldRespectForcePress = args.getShouldRespectForcePress,
	      canDragInteractiveElements = args.canDragInteractiveElements;
	  var lastArgsRef = usePrevious(args);
	  useValidation$1({
	    isEnabled: isEnabled,
	    getDraggableRef: getDraggableRef
	  });
	  var getWindow = useCallback(function () {
	    return getWindowFromEl(getDraggableRef());
	  }, [getDraggableRef]);
	  var canStartCapturing = useCallback(function (event) {
	    if (!isEnabled) {
	      return false;
	    }

	    if (capturingRef.current) {
	      return false;
	    }

	    if (!canLift(draggableId)) {
	      return false;
	    }

	    return shouldAllowDraggingFromTarget(event, canDragInteractiveElements);
	  }, [canDragInteractiveElements, canLift, draggableId, isEnabled]);

	  var _useFocusRetainer = useFocusRetainer(args),
	      onBlur = _useFocusRetainer.onBlur,
	      onFocus = _useFocusRetainer.onFocus;

	  var mouseArgs = useMemo(function () {
	    return {
	      callbacks: callbacks,
	      getDraggableRef: getDraggableRef,
	      getWindow: getWindow,
	      canStartCapturing: canStartCapturing,
	      onCaptureStart: onCaptureStart,
	      onCaptureEnd: onCaptureEnd,
	      getShouldRespectForcePress: getShouldRespectForcePress
	    };
	  }, [callbacks, getDraggableRef, getWindow, canStartCapturing, onCaptureStart, onCaptureEnd, getShouldRespectForcePress]);
	  var onMouseDown = useMouseSensor(mouseArgs);
	  var keyboardArgs = useMemo(function () {
	    return {
	      callbacks: callbacks,
	      getDraggableRef: getDraggableRef,
	      getWindow: getWindow,
	      canStartCapturing: canStartCapturing,
	      onCaptureStart: onCaptureStart,
	      onCaptureEnd: onCaptureEnd
	    };
	  }, [callbacks, canStartCapturing, getDraggableRef, getWindow, onCaptureEnd, onCaptureStart]);
	  var onKeyDown = useKeyboardSensor(keyboardArgs);
	  var touchArgs = useMemo(function () {
	    return {
	      callbacks: callbacks,
	      getDraggableRef: getDraggableRef,
	      getWindow: getWindow,
	      canStartCapturing: canStartCapturing,
	      getShouldRespectForcePress: getShouldRespectForcePress,
	      onCaptureStart: onCaptureStart,
	      onCaptureEnd: onCaptureEnd
	    };
	  }, [callbacks, getDraggableRef, getWindow, canStartCapturing, getShouldRespectForcePress, onCaptureStart, onCaptureEnd]);
	  var onTouchStart = useTouchSensor(touchArgs);
	  useIsomorphicLayoutEffect$1(function () {
	    return function () {
	      if (!capturingRef.current) {
	        return;
	      }

	      abortCapture();

	      if (lastArgsRef.current.isDragging) {
	        lastArgsRef.current.callbacks.onCancel();
	      }
	    };
	  }, []);

	  if (!isEnabled && capturingRef.current) {
	    abortCapture();

	    if (lastArgsRef.current.isDragging) {
	      warning('You have disabled dragging on a Draggable while it was dragging. The drag has been cancelled');
	      callbacks.onCancel();
	    }
	  }

	  useIsomorphicLayoutEffect$1(function () {
	    if (!isDragging && capturingRef.current) {
	      abortCapture();
	    }
	  }, [abortCapture, isDragging]);
	  var props = useMemo(function () {
	    if (!isEnabled) {
	      return null;
	    }

	    return {
	      onMouseDown: onMouseDown,
	      onKeyDown: onKeyDown,
	      onTouchStart: onTouchStart,
	      onFocus: onFocus,
	      onBlur: onBlur,
	      tabIndex: 0,
	      'data-react-beautiful-dnd-drag-handle': styleContext,
	      'aria-roledescription': 'Draggable item. Press space bar to lift',
	      draggable: false,
	      onDragStart: preventHtml5Dnd
	    };
	  }, [isEnabled, onBlur, onFocus, onKeyDown, onMouseDown, onTouchStart, styleContext]);
	  return props;
	}

	function getDimension$1(descriptor, el, windowScroll) {
	  if (windowScroll === void 0) {
	    windowScroll = origin;
	  }

	  var computedStyles = window.getComputedStyle(el);
	  var borderBox = el.getBoundingClientRect();
	  var client = calculateBox(borderBox, computedStyles);
	  var page = withScroll(client, windowScroll);
	  var placeholder = {
	    client: client,
	    tagName: el.tagName.toLowerCase(),
	    display: computedStyles.display
	  };
	  var displaceBy = {
	    x: client.marginBox.width,
	    y: client.marginBox.height
	  };
	  var dimension = {
	    descriptor: descriptor,
	    placeholder: placeholder,
	    displaceBy: displaceBy,
	    client: client,
	    page: page
	  };
	  return dimension;
	}

	function useDraggableDimensionPublisher(args) {
	  var draggableId = args.draggableId,
	      index = args.index,
	      getDraggableRef = args.getDraggableRef;
	  var appContext = useRequiredContext(AppContext);
	  var marshal = appContext.marshal;
	  var droppableContext = useRequiredContext(DroppableContext);
	  var droppableId = droppableContext.droppableId,
	      type = droppableContext.type;
	  var descriptor = useMemo(function () {
	    var result = {
	      id: draggableId,
	      droppableId: droppableId,
	      type: type,
	      index: index
	    };
	    return result;
	  }, [draggableId, droppableId, index, type]);
	  var publishedDescriptorRef = React.useRef(descriptor);
	  var makeDimension = useCallback(function (windowScroll) {
	    var latest = publishedDescriptorRef.current;
	    var el = getDraggableRef();
	    !el ? invariant(false, 'Cannot get dimension when no ref is set') : void 0;
	    return getDimension$1(latest, el, windowScroll);
	  }, [getDraggableRef]);
	  useIsomorphicLayoutEffect$1(function () {
	    marshal.registerDraggable(publishedDescriptorRef.current, makeDimension);
	    return function () {
	      return marshal.unregisterDraggable(publishedDescriptorRef.current);
	    };
	  }, [makeDimension, marshal]);
	  useIsomorphicLayoutEffect$1(function () {
	    if (publishedDescriptorRef.current === descriptor) {
	      return;
	    }

	    var previous = publishedDescriptorRef.current;
	    publishedDescriptorRef.current = descriptor;
	    marshal.updateDraggable(previous, descriptor, makeDimension);
	  }, [descriptor, makeDimension, marshal]);
	}

	// 20.1.2.3 Number.isInteger(number)

	var floor$1 = Math.floor;
	var _isInteger = function isInteger(it) {
	  return !_isObject(it) && isFinite(it) && floor$1(it) === it;
	};

	// 20.1.2.3 Number.isInteger(number)


	_export(_export.S, 'Number', { isInteger: _isInteger });

	var isInteger = _core.Number.isInteger;

	var isInteger$1 = isInteger;

	function checkOwnProps$1(props) {
	  !isInteger$1(props.index) ? invariant(false, 'Draggable requires an integer index prop') : void 0;
	  !props.draggableId ? invariant(false, 'Draggable requires a draggableId') : void 0;
	  !(typeof props.isDragDisabled === 'boolean') ? invariant(false, 'isDragDisabled must be a boolean') : void 0;
	}

	function checkForOutdatedProps(props) {
	  if (Object.prototype.hasOwnProperty.call(props, 'shouldRespectForceTouch')) {
	    warning('shouldRespectForceTouch has been renamed to shouldRespectForcePress');
	  }
	}

	function useValidation$2(props, getRef) {
	  React.useEffect(function () {
	    {
	      checkOwnProps$1(props);
	      checkForOutdatedProps(props);
	      checkIsValidInnerRef(getRef());
	    }
	  });
	}

	function Draggable(props) {
	  var ref = React.useRef(null);
	  var setRef = useCallback(function (el) {
	    ref.current = el;
	  }, []);
	  var getRef = useCallback(function () {
	    return ref.current;
	  }, []);
	  var appContext = useRequiredContext(AppContext);
	  useValidation$2(props, getRef);
	  var children = props.children,
	      draggableId = props.draggableId,
	      isDragDisabled = props.isDragDisabled,
	      shouldRespectForcePress = props.shouldRespectForcePress,
	      canDragInteractiveElements = props.disableInteractiveElementBlocking,
	      index = props.index,
	      mapped = props.mapped,
	      moveUpAction = props.moveUp,
	      moveAction = props.move,
	      dropAction = props.drop,
	      moveDownAction = props.moveDown,
	      moveRightAction = props.moveRight,
	      moveLeftAction = props.moveLeft,
	      moveByWindowScrollAction = props.moveByWindowScroll,
	      liftAction = props.lift,
	      dropAnimationFinishedAction = props.dropAnimationFinished;
	  var forPublisher = useMemo(function () {
	    return {
	      draggableId: draggableId,
	      index: index,
	      getDraggableRef: getRef
	    };
	  }, [draggableId, getRef, index]);
	  useDraggableDimensionPublisher(forPublisher);
	  var onLift = useCallback(function (options) {
	    start('LIFT');
	    var el = ref.current;
	    !el ? invariant(false) : void 0;
	    !!isDragDisabled ? invariant(false, 'Cannot lift a Draggable when it is disabled') : void 0;
	    var clientSelection = options.clientSelection,
	        movementMode = options.movementMode;
	    liftAction({
	      id: draggableId,
	      clientSelection: clientSelection,
	      movementMode: movementMode
	    });
	    finish('LIFT');
	  }, [draggableId, isDragDisabled, liftAction]);
	  var getShouldRespectForcePress = useCallback(function () {
	    return shouldRespectForcePress;
	  }, [shouldRespectForcePress]);
	  var callbacks = useMemo(function () {
	    return {
	      onLift: onLift,
	      onMove: function onMove(clientSelection) {
	        return moveAction({
	          client: clientSelection
	        });
	      },
	      onDrop: function onDrop() {
	        return dropAction({
	          reason: 'DROP'
	        });
	      },
	      onCancel: function onCancel() {
	        return dropAction({
	          reason: 'CANCEL'
	        });
	      },
	      onMoveUp: moveUpAction,
	      onMoveDown: moveDownAction,
	      onMoveRight: moveRightAction,
	      onMoveLeft: moveLeftAction,
	      onWindowScroll: function onWindowScroll() {
	        return moveByWindowScrollAction({
	          newScroll: getWindowScroll$1()
	        });
	      }
	    };
	  }, [dropAction, moveAction, moveByWindowScrollAction, moveDownAction, moveLeftAction, moveRightAction, moveUpAction, onLift]);
	  var isDragging = mapped.type === 'DRAGGING';
	  var isDropAnimating = mapped.type === 'DRAGGING' && Boolean(mapped.dropping);
	  var dragHandleArgs = useMemo(function () {
	    return {
	      draggableId: draggableId,
	      isDragging: isDragging,
	      isDropAnimating: isDropAnimating,
	      isEnabled: !isDragDisabled,
	      callbacks: callbacks,
	      getDraggableRef: getRef,
	      canDragInteractiveElements: canDragInteractiveElements,
	      getShouldRespectForcePress: getShouldRespectForcePress
	    };
	  }, [callbacks, canDragInteractiveElements, draggableId, getRef, getShouldRespectForcePress, isDragDisabled, isDragging, isDropAnimating]);
	  var dragHandleProps = useDragHandle(dragHandleArgs);
	  var onMoveEnd = useCallback(function (event) {
	    if (mapped.type !== 'DRAGGING') {
	      return;
	    }

	    if (!mapped.dropping) {
	      return;
	    }

	    if (event.propertyName !== 'transform') {
	      return;
	    }

	    dropAnimationFinishedAction();
	  }, [dropAnimationFinishedAction, mapped]);
	  var provided = useMemo(function () {
	    var style = getStyle$1(mapped);
	    var onTransitionEnd = mapped.type === 'DRAGGING' && mapped.dropping ? onMoveEnd : null;
	    var result = {
	      innerRef: setRef,
	      draggableProps: {
	        'data-react-beautiful-dnd-draggable': appContext.style,
	        style: style,
	        onTransitionEnd: onTransitionEnd
	      },
	      dragHandleProps: dragHandleProps
	    };
	    return result;
	  }, [appContext.style, dragHandleProps, mapped, onMoveEnd, setRef]);
	  return children(provided, mapped.snapshot);
	}

	var getCombineWithFromResult = function getCombineWithFromResult(result) {
	  return result.combine ? result.combine.draggableId : null;
	};

	var getCombineWithFromImpact = function getCombineWithFromImpact(impact) {
	  return impact.merge ? impact.merge.combine.draggableId : null;
	};

	var makeMapStateToProps$1 = function makeMapStateToProps() {
	  var getDraggingSnapshot = index(function (mode, draggingOver, combineWith, dropping) {
	    return {
	      isDragging: true,
	      isDropAnimating: Boolean(dropping),
	      dropAnimation: dropping,
	      mode: mode,
	      draggingOver: draggingOver,
	      combineWith: combineWith,
	      combineTargetFor: null
	    };
	  });
	  var getSecondarySnapshot = index(function (combineTargetFor) {
	    return {
	      isDragging: false,
	      isDropAnimating: false,
	      dropAnimation: null,
	      mode: null,
	      draggingOver: null,
	      combineTargetFor: combineTargetFor,
	      combineWith: null
	    };
	  });
	  var defaultMapProps = {
	    mapped: {
	      type: 'SECONDARY',
	      offset: origin,
	      combineTargetFor: null,
	      shouldAnimateDisplacement: true,
	      snapshot: getSecondarySnapshot(null)
	    }
	  };
	  var memoizedOffset = index(function (x, y) {
	    return {
	      x: x,
	      y: y
	    };
	  });
	  var getDraggingProps = index(function (offset, mode, dimension, draggingOver, combineWith, forceShouldAnimate) {
	    return {
	      mapped: {
	        type: 'DRAGGING',
	        dropping: null,
	        draggingOver: draggingOver,
	        combineWith: combineWith,
	        mode: mode,
	        offset: offset,
	        dimension: dimension,
	        forceShouldAnimate: forceShouldAnimate,
	        snapshot: getDraggingSnapshot(mode, draggingOver, combineWith, null)
	      }
	    };
	  });
	  var getSecondaryProps = index(function (offset, combineTargetFor, shouldAnimateDisplacement) {
	    if (combineTargetFor === void 0) {
	      combineTargetFor = null;
	    }

	    return {
	      mapped: {
	        type: 'SECONDARY',
	        offset: offset,
	        combineTargetFor: combineTargetFor,
	        shouldAnimateDisplacement: shouldAnimateDisplacement,
	        snapshot: getSecondarySnapshot(combineTargetFor)
	      }
	    };
	  });

	  var getSecondaryMovement = function getSecondaryMovement(ownId, draggingId, impact) {
	    var map = impact.movement.map;
	    var displacement = map[ownId];
	    var movement = impact.movement;
	    var merge = impact.merge;
	    var isCombinedWith = Boolean(merge && merge.combine.draggableId === ownId);
	    var displacedBy = movement.displacedBy.point;
	    var offset = memoizedOffset(displacedBy.x, displacedBy.y);

	    if (isCombinedWith) {
	      return getSecondaryProps(displacement ? offset : origin, draggingId, displacement ? displacement.shouldAnimate : true);
	    }

	    if (!displacement) {
	      return null;
	    }

	    if (!displacement.isVisible) {
	      return null;
	    }

	    return getSecondaryProps(offset, null, displacement.shouldAnimate);
	  };

	  var draggingSelector = function draggingSelector(state, ownProps) {
	    if (state.isDragging) {
	      if (state.critical.draggable.id !== ownProps.draggableId) {
	        return null;
	      }

	      var offset = state.current.client.offset;
	      var dimension = state.dimensions.draggables[ownProps.draggableId];
	      var mode = state.movementMode;
	      var draggingOver = whatIsDraggedOver(state.impact);
	      var combineWith = getCombineWithFromImpact(state.impact);
	      var forceShouldAnimate = state.forceShouldAnimate;
	      return getDraggingProps(memoizedOffset(offset.x, offset.y), mode, dimension, draggingOver, combineWith, forceShouldAnimate);
	    }

	    if (state.phase === 'DROP_ANIMATING') {
	      var completed = state.completed;

	      if (completed.result.draggableId !== ownProps.draggableId) {
	        return null;
	      }

	      var _dimension = state.dimensions.draggables[ownProps.draggableId];
	      var result = completed.result;
	      var _mode = result.mode;

	      var _draggingOver = whatIsDraggedOverFromResult(result);

	      var _combineWith = getCombineWithFromResult(result);

	      var duration = state.dropDuration;
	      var dropping = {
	        duration: duration,
	        curve: curves.drop,
	        moveTo: state.newHomeClientOffset,
	        opacity: _combineWith ? combine.opacity.drop : null,
	        scale: _combineWith ? combine.scale.drop : null
	      };
	      return {
	        mapped: {
	          type: 'DRAGGING',
	          offset: state.newHomeClientOffset,
	          dimension: _dimension,
	          dropping: dropping,
	          draggingOver: _draggingOver,
	          combineWith: _combineWith,
	          mode: _mode,
	          forceShouldAnimate: null,
	          snapshot: getDraggingSnapshot(_mode, _draggingOver, _combineWith, dropping)
	        }
	      };
	    }

	    return null;
	  };

	  var secondarySelector = function secondarySelector(state, ownProps) {
	    if (state.isDragging) {
	      if (state.critical.draggable.id === ownProps.draggableId) {
	        return null;
	      }

	      return getSecondaryMovement(ownProps.draggableId, state.critical.draggable.id, state.impact);
	    }

	    if (state.phase === 'DROP_ANIMATING') {
	      var completed = state.completed;

	      if (completed.result.draggableId === ownProps.draggableId) {
	        return null;
	      }

	      return getSecondaryMovement(ownProps.draggableId, completed.result.draggableId, completed.impact);
	    }

	    return null;
	  };

	  var selector = function selector(state, ownProps) {
	    return draggingSelector(state, ownProps) || secondarySelector(state, ownProps) || defaultMapProps;
	  };

	  return selector;
	};
	var mapDispatchToProps$1 = {
	  lift: lift,
	  move: move,
	  moveUp: moveUp,
	  moveDown: moveDown,
	  moveLeft: moveLeft,
	  moveRight: moveRight,
	  moveByWindowScroll: moveByWindowScroll,
	  drop: drop,
	  dropAnimationFinished: dropAnimationFinished
	};
	var defaultProps$1 = {
	  isDragDisabled: false,
	  disableInteractiveElementBlocking: false,
	  shouldRespectForcePress: false
	};
	var ConnectedDraggable = connect(makeMapStateToProps$1, mapDispatchToProps$1, null, {
	  context: StoreContext,
	  pure: true,
	  areStatePropsEqual: isStrictEqual
	})(Draggable);
	ConnectedDraggable.defaultProps = defaultProps$1;

	exports.DragDropContext = DragDropContext;
	exports.Draggable = ConnectedDraggable;
	exports.Droppable = ConnectedDroppable;
	exports.resetServerContext = resetServerContext;

	Object.defineProperty(exports, '__esModule', { value: true });

}));
