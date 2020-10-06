(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.ReactDnDHTML5Backend = {}));
}(this, (function (exports) { 'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
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

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(Object(source), true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  // cheap lodash replacements
  function memoize(fn) {
    var result = null;

    var memoized = function memoized() {
      if (result == null) {
        result = fn();
      }

      return result;
    };

    return memoized;
  }
  /**
   * drop-in replacement for _.without
   */

  function without(items, item) {
    return items.filter(function (i) {
      return i !== item;
    });
  }
  function union(itemsA, itemsB) {
    var set = new Set();

    var insertItem = function insertItem(item) {
      return set.add(item);
    };

    itemsA.forEach(insertItem);
    itemsB.forEach(insertItem);
    var result = [];
    set.forEach(function (key) {
      return result.push(key);
    });
    return result;
  }

  var EnterLeaveCounter =
  /*#__PURE__*/
  function () {
    function EnterLeaveCounter(isNodeInDocument) {
      _classCallCheck(this, EnterLeaveCounter);

      this.entered = [];
      this.isNodeInDocument = isNodeInDocument;
    }

    _createClass(EnterLeaveCounter, [{
      key: "enter",
      value: function enter(enteringNode) {
        var _this = this;

        var previousLength = this.entered.length;

        var isNodeEntered = function isNodeEntered(node) {
          return _this.isNodeInDocument(node) && (!node.contains || node.contains(enteringNode));
        };

        this.entered = union(this.entered.filter(isNodeEntered), [enteringNode]);
        return previousLength === 0 && this.entered.length > 0;
      }
    }, {
      key: "leave",
      value: function leave(leavingNode) {
        var previousLength = this.entered.length;
        this.entered = without(this.entered.filter(this.isNodeInDocument), leavingNode);
        return previousLength > 0 && this.entered.length === 0;
      }
    }, {
      key: "reset",
      value: function reset() {
        this.entered = [];
      }
    }]);

    return EnterLeaveCounter;
  }();

  var isFirefox = memoize(function () {
    return /firefox/i.test(navigator.userAgent);
  });
  var isSafari = memoize(function () {
    return Boolean(window.safari);
  });

  var MonotonicInterpolant =
  /*#__PURE__*/
  function () {
    function MonotonicInterpolant(xs, ys) {
      _classCallCheck(this, MonotonicInterpolant);

      var length = xs.length; // Rearrange xs and ys so that xs is sorted

      var indexes = [];

      for (var i = 0; i < length; i++) {
        indexes.push(i);
      }

      indexes.sort(function (a, b) {
        return xs[a] < xs[b] ? -1 : 1;
      }); // Get consecutive differences and slopes
      var dxs = [];
      var ms = [];
      var dx;
      var dy;

      for (var _i = 0; _i < length - 1; _i++) {
        dx = xs[_i + 1] - xs[_i];
        dy = ys[_i + 1] - ys[_i];
        dxs.push(dx);
        ms.push(dy / dx);
      } // Get degree-1 coefficients


      var c1s = [ms[0]];

      for (var _i2 = 0; _i2 < dxs.length - 1; _i2++) {
        var m2 = ms[_i2];
        var mNext = ms[_i2 + 1];

        if (m2 * mNext <= 0) {
          c1s.push(0);
        } else {
          dx = dxs[_i2];
          var dxNext = dxs[_i2 + 1];
          var common = dx + dxNext;
          c1s.push(3 * common / ((common + dxNext) / m2 + (common + dx) / mNext));
        }
      }

      c1s.push(ms[ms.length - 1]); // Get degree-2 and degree-3 coefficients

      var c2s = [];
      var c3s = [];
      var m;

      for (var _i3 = 0; _i3 < c1s.length - 1; _i3++) {
        m = ms[_i3];
        var c1 = c1s[_i3];
        var invDx = 1 / dxs[_i3];

        var _common = c1 + c1s[_i3 + 1] - m - m;

        c2s.push((m - c1 - _common) * invDx);
        c3s.push(_common * invDx * invDx);
      }

      this.xs = xs;
      this.ys = ys;
      this.c1s = c1s;
      this.c2s = c2s;
      this.c3s = c3s;
    }

    _createClass(MonotonicInterpolant, [{
      key: "interpolate",
      value: function interpolate(x) {
        var xs = this.xs,
            ys = this.ys,
            c1s = this.c1s,
            c2s = this.c2s,
            c3s = this.c3s; // The rightmost point in the dataset should give an exact result

        var i = xs.length - 1;

        if (x === xs[i]) {
          return ys[i];
        } // Search for the interval x is in, returning the corresponding y if x is one of the original xs


        var low = 0;
        var high = c3s.length - 1;
        var mid;

        while (low <= high) {
          mid = Math.floor(0.5 * (low + high));
          var xHere = xs[mid];

          if (xHere < x) {
            low = mid + 1;
          } else if (xHere > x) {
            high = mid - 1;
          } else {
            return ys[mid];
          }
        }

        i = Math.max(0, high); // Interpolate

        var diff = x - xs[i];
        var diffSq = diff * diff;
        return ys[i] + c1s[i] * diff + c2s[i] * diffSq + c3s[i] * diff * diffSq;
      }
    }]);

    return MonotonicInterpolant;
  }();

  var ELEMENT_NODE = 1;
  function getNodeClientOffset(node) {
    var el = node.nodeType === ELEMENT_NODE ? node : node.parentElement;

    if (!el) {
      return null;
    }

    var _el$getBoundingClient = el.getBoundingClientRect(),
        top = _el$getBoundingClient.top,
        left = _el$getBoundingClient.left;

    return {
      x: left,
      y: top
    };
  }
  function getEventClientOffset(e) {
    return {
      x: e.clientX,
      y: e.clientY
    };
  }

  function isImageNode(node) {
    return node.nodeName === 'IMG' && (isFirefox() || !document.documentElement.contains(node));
  }

  function getDragPreviewSize(isImage, dragPreview, sourceWidth, sourceHeight) {
    var dragPreviewWidth = isImage ? dragPreview.width : sourceWidth;
    var dragPreviewHeight = isImage ? dragPreview.height : sourceHeight; // Work around @2x coordinate discrepancies in browsers

    if (isSafari() && isImage) {
      dragPreviewHeight /= window.devicePixelRatio;
      dragPreviewWidth /= window.devicePixelRatio;
    }

    return {
      dragPreviewWidth: dragPreviewWidth,
      dragPreviewHeight: dragPreviewHeight
    };
  }

  function getDragPreviewOffset(sourceNode, dragPreview, clientOffset, anchorPoint, offsetPoint) {
    // The browsers will use the image intrinsic size under different conditions.
    // Firefox only cares if it's an image, but WebKit also wants it to be detached.
    var isImage = isImageNode(dragPreview);
    var dragPreviewNode = isImage ? sourceNode : dragPreview;
    var dragPreviewNodeOffsetFromClient = getNodeClientOffset(dragPreviewNode);
    var offsetFromDragPreview = {
      x: clientOffset.x - dragPreviewNodeOffsetFromClient.x,
      y: clientOffset.y - dragPreviewNodeOffsetFromClient.y
    };
    var sourceWidth = sourceNode.offsetWidth,
        sourceHeight = sourceNode.offsetHeight;
    var anchorX = anchorPoint.anchorX,
        anchorY = anchorPoint.anchorY;

    var _getDragPreviewSize = getDragPreviewSize(isImage, dragPreview, sourceWidth, sourceHeight),
        dragPreviewWidth = _getDragPreviewSize.dragPreviewWidth,
        dragPreviewHeight = _getDragPreviewSize.dragPreviewHeight;

    var calculateYOffset = function calculateYOffset() {
      var interpolantY = new MonotonicInterpolant([0, 0.5, 1], [// Dock to the top
      offsetFromDragPreview.y, // Align at the center
      offsetFromDragPreview.y / sourceHeight * dragPreviewHeight, // Dock to the bottom
      offsetFromDragPreview.y + dragPreviewHeight - sourceHeight]);
      var y = interpolantY.interpolate(anchorY); // Work around Safari 8 positioning bug

      if (isSafari() && isImage) {
        // We'll have to wait for @3x to see if this is entirely correct
        y += (window.devicePixelRatio - 1) * dragPreviewHeight;
      }

      return y;
    };

    var calculateXOffset = function calculateXOffset() {
      // Interpolate coordinates depending on anchor point
      // If you know a simpler way to do this, let me know
      var interpolantX = new MonotonicInterpolant([0, 0.5, 1], [// Dock to the left
      offsetFromDragPreview.x, // Align at the center
      offsetFromDragPreview.x / sourceWidth * dragPreviewWidth, // Dock to the right
      offsetFromDragPreview.x + dragPreviewWidth - sourceWidth]);
      return interpolantX.interpolate(anchorX);
    }; // Force offsets if specified in the options.


    var offsetX = offsetPoint.offsetX,
        offsetY = offsetPoint.offsetY;
    var isManualOffsetX = offsetX === 0 || offsetX;
    var isManualOffsetY = offsetY === 0 || offsetY;
    return {
      x: isManualOffsetX ? offsetX : calculateXOffset(),
      y: isManualOffsetY ? offsetY : calculateYOffset()
    };
  }

  var FILE = '__NATIVE_FILE__';
  var URL = '__NATIVE_URL__';
  var TEXT = '__NATIVE_TEXT__';

  var NativeTypes = /*#__PURE__*/Object.freeze({
    __proto__: null,
    FILE: FILE,
    URL: URL,
    TEXT: TEXT
  });

  function getDataFromDataTransfer(dataTransfer, typesToTry, defaultValue) {
    var result = typesToTry.reduce(function (resultSoFar, typeToTry) {
      return resultSoFar || dataTransfer.getData(typeToTry);
    }, '');
    return result != null ? result : defaultValue;
  }

  var _nativeTypesConfig;
  var nativeTypesConfig = (_nativeTypesConfig = {}, _defineProperty(_nativeTypesConfig, FILE, {
    exposeProperties: {
      files: function files(dataTransfer) {
        return Array.prototype.slice.call(dataTransfer.files);
      },
      items: function items(dataTransfer) {
        return dataTransfer.items;
      }
    },
    matchesTypes: ['Files']
  }), _defineProperty(_nativeTypesConfig, URL, {
    exposeProperties: {
      urls: function urls(dataTransfer, matchesTypes) {
        return getDataFromDataTransfer(dataTransfer, matchesTypes, '').split('\n');
      }
    },
    matchesTypes: ['Url', 'text/uri-list']
  }), _defineProperty(_nativeTypesConfig, TEXT, {
    exposeProperties: {
      text: function text(dataTransfer, matchesTypes) {
        return getDataFromDataTransfer(dataTransfer, matchesTypes, '');
      }
    },
    matchesTypes: ['Text', 'text/plain']
  }), _nativeTypesConfig);

  var NativeDragSource =
  /*#__PURE__*/
  function () {
    function NativeDragSource(config) {
      _classCallCheck(this, NativeDragSource);

      this.config = config;
      this.item = {};
      this.initializeExposedProperties();
    }

    _createClass(NativeDragSource, [{
      key: "initializeExposedProperties",
      value: function initializeExposedProperties() {
        var _this = this;

        Object.keys(this.config.exposeProperties).forEach(function (property) {
          Object.defineProperty(_this.item, property, {
            configurable: true,
            enumerable: true,
            get: function get() {
              // eslint-disable-next-line no-console
              console.warn("Browser doesn't allow reading \"".concat(property, "\" until the drop event."));
              return null;
            }
          });
        });
      }
    }, {
      key: "loadDataTransfer",
      value: function loadDataTransfer(dataTransfer) {
        var _this2 = this;

        if (dataTransfer) {
          var newProperties = {};
          Object.keys(this.config.exposeProperties).forEach(function (property) {
            newProperties[property] = {
              value: _this2.config.exposeProperties[property](dataTransfer, _this2.config.matchesTypes),
              configurable: true,
              enumerable: true
            };
          });
          Object.defineProperties(this.item, newProperties);
        }
      }
    }, {
      key: "canDrag",
      value: function canDrag() {
        return true;
      }
    }, {
      key: "beginDrag",
      value: function beginDrag() {
        return this.item;
      }
    }, {
      key: "isDragging",
      value: function isDragging(monitor, handle) {
        return handle === monitor.getSourceId();
      }
    }, {
      key: "endDrag",
      value: function endDrag() {// empty
      }
    }]);

    return NativeDragSource;
  }();

  function createNativeDragSource(type, dataTransfer) {
    var result = new NativeDragSource(nativeTypesConfig[type]);
    result.loadDataTransfer(dataTransfer);
    return result;
  }
  function matchNativeItemType(dataTransfer) {
    if (!dataTransfer) {
      return null;
    }

    var dataTransferTypes = Array.prototype.slice.call(dataTransfer.types || []);
    return Object.keys(nativeTypesConfig).filter(function (nativeItemType) {
      var matchesTypes = nativeTypesConfig[nativeItemType].matchesTypes;
      return matchesTypes.some(function (t) {
        return dataTransferTypes.indexOf(t) > -1;
      });
    })[0] || null;
  }

  var OptionsReader =
  /*#__PURE__*/
  function () {
    function OptionsReader(globalContext) {
      _classCallCheck(this, OptionsReader);

      this.globalContext = globalContext;
    }

    _createClass(OptionsReader, [{
      key: "window",
      get: function get() {
        if (this.globalContext) {
          return this.globalContext;
        } else if (typeof window !== 'undefined') {
          return window;
        }

        return undefined;
      }
    }, {
      key: "document",
      get: function get() {
        if (this.window) {
          return this.window.document;
        }

        return undefined;
      }
    }]);

    return OptionsReader;
  }();

  var HTML5Backend =
  /*#__PURE__*/
  function () {
    function HTML5Backend(manager, globalContext) {
      var _this = this;

      _classCallCheck(this, HTML5Backend);

      this.sourcePreviewNodes = new Map();
      this.sourcePreviewNodeOptions = new Map();
      this.sourceNodes = new Map();
      this.sourceNodeOptions = new Map();
      this.dragStartSourceIds = null;
      this.dropTargetIds = [];
      this.dragEnterTargetIds = [];
      this.currentNativeSource = null;
      this.currentNativeHandle = null;
      this.currentDragSourceNode = null;
      this.altKeyPressed = false;
      this.mouseMoveTimeoutTimer = null;
      this.asyncEndDragFrameId = null;
      this.dragOverTargetIds = null;

      this.getSourceClientOffset = function (sourceId) {
        return getNodeClientOffset(_this.sourceNodes.get(sourceId));
      };

      this.endDragNativeItem = function () {
        if (!_this.isDraggingNativeItem()) {
          return;
        }

        _this.actions.endDrag();

        _this.registry.removeSource(_this.currentNativeHandle);

        _this.currentNativeHandle = null;
        _this.currentNativeSource = null;
      };

      this.isNodeInDocument = function (node) {
        // Check the node either in the main document or in the current context
        return _this.document && _this.document.body && document.body.contains(node);
      };

      this.endDragIfSourceWasRemovedFromDOM = function () {
        var node = _this.currentDragSourceNode;

        if (_this.isNodeInDocument(node)) {
          return;
        }

        if (_this.clearCurrentDragSourceNode()) {
          _this.actions.endDrag();
        }
      };

      this.handleTopDragStartCapture = function () {
        _this.clearCurrentDragSourceNode();

        _this.dragStartSourceIds = [];
      };

      this.handleTopDragStart = function (e) {
        if (e.defaultPrevented) {
          return;
        }

        var dragStartSourceIds = _this.dragStartSourceIds;
        _this.dragStartSourceIds = null;
        var clientOffset = getEventClientOffset(e); // Avoid crashing if we missed a drop event or our previous drag died

        if (_this.monitor.isDragging()) {
          _this.actions.endDrag();
        } // Don't publish the source just yet (see why below)


        _this.actions.beginDrag(dragStartSourceIds || [], {
          publishSource: false,
          getSourceClientOffset: _this.getSourceClientOffset,
          clientOffset: clientOffset
        });

        var dataTransfer = e.dataTransfer;
        var nativeType = matchNativeItemType(dataTransfer);

        if (_this.monitor.isDragging()) {
          if (dataTransfer && typeof dataTransfer.setDragImage === 'function') {
            // Use custom drag image if user specifies it.
            // If child drag source refuses drag but parent agrees,
            // use parent's node as drag image. Neither works in IE though.
            var sourceId = _this.monitor.getSourceId();

            var sourceNode = _this.sourceNodes.get(sourceId);

            var dragPreview = _this.sourcePreviewNodes.get(sourceId) || sourceNode;

            if (dragPreview) {
              var _this$getCurrentSourc = _this.getCurrentSourcePreviewNodeOptions(),
                  anchorX = _this$getCurrentSourc.anchorX,
                  anchorY = _this$getCurrentSourc.anchorY,
                  offsetX = _this$getCurrentSourc.offsetX,
                  offsetY = _this$getCurrentSourc.offsetY;

              var anchorPoint = {
                anchorX: anchorX,
                anchorY: anchorY
              };
              var offsetPoint = {
                offsetX: offsetX,
                offsetY: offsetY
              };
              var dragPreviewOffset = getDragPreviewOffset(sourceNode, dragPreview, clientOffset, anchorPoint, offsetPoint);
              dataTransfer.setDragImage(dragPreview, dragPreviewOffset.x, dragPreviewOffset.y);
            }
          }

          try {
            // Firefox won't drag without setting data
            dataTransfer.setData('application/json', {});
          } catch (err) {} // IE doesn't support MIME types in setData
          // Store drag source node so we can check whether
          // it is removed from DOM and trigger endDrag manually.


          _this.setCurrentDragSourceNode(e.target); // Now we are ready to publish the drag source.. or are we not?


          var _this$getCurrentSourc2 = _this.getCurrentSourcePreviewNodeOptions(),
              captureDraggingState = _this$getCurrentSourc2.captureDraggingState;

          if (!captureDraggingState) {
            // Usually we want to publish it in the next tick so that browser
            // is able to screenshot the current (not yet dragging) state.
            //
            // It also neatly avoids a situation where render() returns null
            // in the same tick for the source element, and browser freaks out.
            setTimeout(function () {
              return _this.actions.publishDragSource();
            }, 0);
          } else {
            // In some cases the user may want to override this behavior, e.g.
            // to work around IE not supporting custom drag previews.
            //
            // When using a custom drag layer, the only way to prevent
            // the default drag preview from drawing in IE is to screenshot
            // the dragging state in which the node itself has zero opacity
            // and height. In this case, though, returning null from render()
            // will abruptly end the dragging, which is not obvious.
            //
            // This is the reason such behavior is strictly opt-in.
            _this.actions.publishDragSource();
          }
        } else if (nativeType) {
          // A native item (such as URL) dragged from inside the document
          _this.beginDragNativeItem(nativeType);
        } else if (dataTransfer && !dataTransfer.types && (e.target && !e.target.hasAttribute || !e.target.hasAttribute('draggable'))) {
          // Looks like a Safari bug: dataTransfer.types is null, but there was no draggable.
          // Just let it drag. It's a native type (URL or text) and will be picked up in
          // dragenter handler.
          return;
        } else {
          // If by this time no drag source reacted, tell browser not to drag.
          e.preventDefault();
        }
      };

      this.handleTopDragEndCapture = function () {
        if (_this.clearCurrentDragSourceNode()) {
          // Firefox can dispatch this event in an infinite loop
          // if dragend handler does something like showing an alert.
          // Only proceed if we have not handled it already.
          _this.actions.endDrag();
        }
      };

      this.handleTopDragEnterCapture = function (e) {
        _this.dragEnterTargetIds = [];

        var isFirstEnter = _this.enterLeaveCounter.enter(e.target);

        if (!isFirstEnter || _this.monitor.isDragging()) {
          return;
        }

        var dataTransfer = e.dataTransfer;
        var nativeType = matchNativeItemType(dataTransfer);

        if (nativeType) {
          // A native item (such as file or URL) dragged from outside the document
          _this.beginDragNativeItem(nativeType, dataTransfer);
        }
      };

      this.handleTopDragEnter = function (e) {
        var dragEnterTargetIds = _this.dragEnterTargetIds;
        _this.dragEnterTargetIds = [];

        if (!_this.monitor.isDragging()) {
          // This is probably a native item type we don't understand.
          return;
        }

        _this.altKeyPressed = e.altKey;

        if (!isFirefox()) {
          // Don't emit hover in `dragenter` on Firefox due to an edge case.
          // If the target changes position as the result of `dragenter`, Firefox
          // will still happily dispatch `dragover` despite target being no longer
          // there. The easy solution is to only fire `hover` in `dragover` on FF.
          _this.actions.hover(dragEnterTargetIds, {
            clientOffset: getEventClientOffset(e)
          });
        }

        var canDrop = dragEnterTargetIds.some(function (targetId) {
          return _this.monitor.canDropOnTarget(targetId);
        });

        if (canDrop) {
          // IE requires this to fire dragover events
          e.preventDefault();

          if (e.dataTransfer) {
            e.dataTransfer.dropEffect = _this.getCurrentDropEffect();
          }
        }
      };

      this.handleTopDragOverCapture = function () {
        _this.dragOverTargetIds = [];
      };

      this.handleTopDragOver = function (e) {
        var dragOverTargetIds = _this.dragOverTargetIds;
        _this.dragOverTargetIds = [];

        if (!_this.monitor.isDragging()) {
          // This is probably a native item type we don't understand.
          // Prevent default "drop and blow away the whole document" action.
          e.preventDefault();

          if (e.dataTransfer) {
            e.dataTransfer.dropEffect = 'none';
          }

          return;
        }

        _this.altKeyPressed = e.altKey;

        _this.actions.hover(dragOverTargetIds || [], {
          clientOffset: getEventClientOffset(e)
        });

        var canDrop = (dragOverTargetIds || []).some(function (targetId) {
          return _this.monitor.canDropOnTarget(targetId);
        });

        if (canDrop) {
          // Show user-specified drop effect.
          e.preventDefault();

          if (e.dataTransfer) {
            e.dataTransfer.dropEffect = _this.getCurrentDropEffect();
          }
        } else if (_this.isDraggingNativeItem()) {
          // Don't show a nice cursor but still prevent default
          // "drop and blow away the whole document" action.
          e.preventDefault();
        } else {
          e.preventDefault();

          if (e.dataTransfer) {
            e.dataTransfer.dropEffect = 'none';
          }
        }
      };

      this.handleTopDragLeaveCapture = function (e) {
        if (_this.isDraggingNativeItem()) {
          e.preventDefault();
        }

        var isLastLeave = _this.enterLeaveCounter.leave(e.target);

        if (!isLastLeave) {
          return;
        }

        if (_this.isDraggingNativeItem()) {
          _this.endDragNativeItem();
        }
      };

      this.handleTopDropCapture = function (e) {
        _this.dropTargetIds = [];
        e.preventDefault();

        if (_this.isDraggingNativeItem()) {
          _this.currentNativeSource.loadDataTransfer(e.dataTransfer);
        }

        _this.enterLeaveCounter.reset();
      };

      this.handleTopDrop = function (e) {
        var dropTargetIds = _this.dropTargetIds;
        _this.dropTargetIds = [];

        _this.actions.hover(dropTargetIds, {
          clientOffset: getEventClientOffset(e)
        });

        _this.actions.drop({
          dropEffect: _this.getCurrentDropEffect()
        });

        if (_this.isDraggingNativeItem()) {
          _this.endDragNativeItem();
        } else {
          _this.endDragIfSourceWasRemovedFromDOM();
        }
      };

      this.handleSelectStart = function (e) {
        var target = e.target; // Only IE requires us to explicitly say
        // we want drag drop operation to start

        if (typeof target.dragDrop !== 'function') {
          return;
        } // Inputs and textareas should be selectable


        if (target.tagName === 'INPUT' || target.tagName === 'SELECT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
          return;
        } // For other targets, ask IE
        // to enable drag and drop


        e.preventDefault();
        target.dragDrop();
      };

      this.options = new OptionsReader(globalContext);
      this.actions = manager.getActions();
      this.monitor = manager.getMonitor();
      this.registry = manager.getRegistry();
      this.enterLeaveCounter = new EnterLeaveCounter(this.isNodeInDocument);
    } // public for test


    _createClass(HTML5Backend, [{
      key: "setup",
      value: function setup() {
        if (this.window === undefined) {
          return;
        }

        if (this.window.__isReactDndBackendSetUp) {
          throw new Error('Cannot have two HTML5 backends at the same time.');
        }

        this.window.__isReactDndBackendSetUp = true;
        this.addEventListeners(this.window);
      }
    }, {
      key: "teardown",
      value: function teardown() {
        if (this.window === undefined) {
          return;
        }

        this.window.__isReactDndBackendSetUp = false;
        this.removeEventListeners(this.window);
        this.clearCurrentDragSourceNode();

        if (this.asyncEndDragFrameId) {
          this.window.cancelAnimationFrame(this.asyncEndDragFrameId);
        }
      }
    }, {
      key: "connectDragPreview",
      value: function connectDragPreview(sourceId, node, options) {
        var _this2 = this;

        this.sourcePreviewNodeOptions.set(sourceId, options);
        this.sourcePreviewNodes.set(sourceId, node);
        return function () {
          _this2.sourcePreviewNodes.delete(sourceId);

          _this2.sourcePreviewNodeOptions.delete(sourceId);
        };
      }
    }, {
      key: "connectDragSource",
      value: function connectDragSource(sourceId, node, options) {
        var _this3 = this;

        this.sourceNodes.set(sourceId, node);
        this.sourceNodeOptions.set(sourceId, options);

        var handleDragStart = function handleDragStart(e) {
          return _this3.handleDragStart(e, sourceId);
        };

        var handleSelectStart = function handleSelectStart(e) {
          return _this3.handleSelectStart(e);
        };

        node.setAttribute('draggable', 'true');
        node.addEventListener('dragstart', handleDragStart);
        node.addEventListener('selectstart', handleSelectStart);
        return function () {
          _this3.sourceNodes.delete(sourceId);

          _this3.sourceNodeOptions.delete(sourceId);

          node.removeEventListener('dragstart', handleDragStart);
          node.removeEventListener('selectstart', handleSelectStart);
          node.setAttribute('draggable', 'false');
        };
      }
    }, {
      key: "connectDropTarget",
      value: function connectDropTarget(targetId, node) {
        var _this4 = this;

        var handleDragEnter = function handleDragEnter(e) {
          return _this4.handleDragEnter(e, targetId);
        };

        var handleDragOver = function handleDragOver(e) {
          return _this4.handleDragOver(e, targetId);
        };

        var handleDrop = function handleDrop(e) {
          return _this4.handleDrop(e, targetId);
        };

        node.addEventListener('dragenter', handleDragEnter);
        node.addEventListener('dragover', handleDragOver);
        node.addEventListener('drop', handleDrop);
        return function () {
          node.removeEventListener('dragenter', handleDragEnter);
          node.removeEventListener('dragover', handleDragOver);
          node.removeEventListener('drop', handleDrop);
        };
      }
    }, {
      key: "addEventListeners",
      value: function addEventListeners(target) {
        // SSR Fix (https://github.com/react-dnd/react-dnd/pull/813
        if (!target.addEventListener) {
          return;
        }

        target.addEventListener('dragstart', this.handleTopDragStart);
        target.addEventListener('dragstart', this.handleTopDragStartCapture, true);
        target.addEventListener('dragend', this.handleTopDragEndCapture, true);
        target.addEventListener('dragenter', this.handleTopDragEnter);
        target.addEventListener('dragenter', this.handleTopDragEnterCapture, true);
        target.addEventListener('dragleave', this.handleTopDragLeaveCapture, true);
        target.addEventListener('dragover', this.handleTopDragOver);
        target.addEventListener('dragover', this.handleTopDragOverCapture, true);
        target.addEventListener('drop', this.handleTopDrop);
        target.addEventListener('drop', this.handleTopDropCapture, true);
      }
    }, {
      key: "removeEventListeners",
      value: function removeEventListeners(target) {
        // SSR Fix (https://github.com/react-dnd/react-dnd/pull/813
        if (!target.removeEventListener) {
          return;
        }

        target.removeEventListener('dragstart', this.handleTopDragStart);
        target.removeEventListener('dragstart', this.handleTopDragStartCapture, true);
        target.removeEventListener('dragend', this.handleTopDragEndCapture, true);
        target.removeEventListener('dragenter', this.handleTopDragEnter);
        target.removeEventListener('dragenter', this.handleTopDragEnterCapture, true);
        target.removeEventListener('dragleave', this.handleTopDragLeaveCapture, true);
        target.removeEventListener('dragover', this.handleTopDragOver);
        target.removeEventListener('dragover', this.handleTopDragOverCapture, true);
        target.removeEventListener('drop', this.handleTopDrop);
        target.removeEventListener('drop', this.handleTopDropCapture, true);
      }
    }, {
      key: "getCurrentSourceNodeOptions",
      value: function getCurrentSourceNodeOptions() {
        var sourceId = this.monitor.getSourceId();
        var sourceNodeOptions = this.sourceNodeOptions.get(sourceId);
        return _objectSpread2({
          dropEffect: this.altKeyPressed ? 'copy' : 'move'
        }, sourceNodeOptions || {});
      }
    }, {
      key: "getCurrentDropEffect",
      value: function getCurrentDropEffect() {
        if (this.isDraggingNativeItem()) {
          // It makes more sense to default to 'copy' for native resources
          return 'copy';
        }

        return this.getCurrentSourceNodeOptions().dropEffect;
      }
    }, {
      key: "getCurrentSourcePreviewNodeOptions",
      value: function getCurrentSourcePreviewNodeOptions() {
        var sourceId = this.monitor.getSourceId();
        var sourcePreviewNodeOptions = this.sourcePreviewNodeOptions.get(sourceId);
        return _objectSpread2({
          anchorX: 0.5,
          anchorY: 0.5,
          captureDraggingState: false
        }, sourcePreviewNodeOptions || {});
      }
    }, {
      key: "isDraggingNativeItem",
      value: function isDraggingNativeItem() {
        var itemType = this.monitor.getItemType();
        return Object.keys(NativeTypes).some(function (key) {
          return NativeTypes[key] === itemType;
        });
      }
    }, {
      key: "beginDragNativeItem",
      value: function beginDragNativeItem(type, dataTransfer) {
        this.clearCurrentDragSourceNode();
        this.currentNativeSource = createNativeDragSource(type, dataTransfer);
        this.currentNativeHandle = this.registry.addSource(type, this.currentNativeSource);
        this.actions.beginDrag([this.currentNativeHandle]);
      }
    }, {
      key: "setCurrentDragSourceNode",
      value: function setCurrentDragSourceNode(node) {
        var _this5 = this;

        this.clearCurrentDragSourceNode();
        this.currentDragSourceNode = node; // A timeout of > 0 is necessary to resolve Firefox issue referenced
        // See:
        //   * https://github.com/react-dnd/react-dnd/pull/928
        //   * https://github.com/react-dnd/react-dnd/issues/869

        var MOUSE_MOVE_TIMEOUT = 1000; // Receiving a mouse event in the middle of a dragging operation
        // means it has ended and the drag source node disappeared from DOM,
        // so the browser didn't dispatch the dragend event.
        //
        // We need to wait before we start listening for mousemove events.
        // This is needed because the drag preview needs to be drawn or else it fires an 'mousemove' event
        // immediately in some browsers.
        //
        // See:
        //   * https://github.com/react-dnd/react-dnd/pull/928
        //   * https://github.com/react-dnd/react-dnd/issues/869
        //

        this.mouseMoveTimeoutTimer = setTimeout(function () {
          return _this5.window && _this5.window.addEventListener('mousemove', _this5.endDragIfSourceWasRemovedFromDOM, true);
        }, MOUSE_MOVE_TIMEOUT);
      }
    }, {
      key: "clearCurrentDragSourceNode",
      value: function clearCurrentDragSourceNode() {
        if (this.currentDragSourceNode) {
          this.currentDragSourceNode = null;

          if (this.window) {
            this.window.clearTimeout(this.mouseMoveTimeoutTimer || undefined);
            this.window.removeEventListener('mousemove', this.endDragIfSourceWasRemovedFromDOM, true);
          }

          this.mouseMoveTimeoutTimer = null;
          return true;
        }

        return false;
      }
    }, {
      key: "handleDragStart",
      value: function handleDragStart(e, sourceId) {
        if (e.defaultPrevented) {
          return;
        }

        if (!this.dragStartSourceIds) {
          this.dragStartSourceIds = [];
        }

        this.dragStartSourceIds.unshift(sourceId);
      }
    }, {
      key: "handleDragEnter",
      value: function handleDragEnter(e, targetId) {
        this.dragEnterTargetIds.unshift(targetId);
      }
    }, {
      key: "handleDragOver",
      value: function handleDragOver(e, targetId) {
        if (this.dragOverTargetIds === null) {
          this.dragOverTargetIds = [];
        }

        this.dragOverTargetIds.unshift(targetId);
      }
    }, {
      key: "handleDrop",
      value: function handleDrop(e, targetId) {
        this.dropTargetIds.unshift(targetId);
      }
    }, {
      key: "window",
      get: function get() {
        return this.options.window;
      }
    }, {
      key: "document",
      get: function get() {
        return this.options.document;
      }
    }]);

    return HTML5Backend;
  }();

  var emptyImage;
  function getEmptyImage() {
    if (!emptyImage) {
      emptyImage = new Image();
      emptyImage.src = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
    }

    return emptyImage;
  }

  var createHTML5Backend = function createHTML5Backend(manager, context) {
    return new HTML5Backend(manager, context);
  };

  exports.NativeTypes = NativeTypes;
  exports.default = createHTML5Backend;
  exports.getEmptyImage = getEmptyImage;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
