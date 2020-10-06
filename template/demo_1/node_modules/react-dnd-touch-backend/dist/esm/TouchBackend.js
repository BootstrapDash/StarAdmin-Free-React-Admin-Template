var _eventNames;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import invariant from 'invariant';
import { ListenerType } from './interfaces';
import { eventShouldStartDrag, eventShouldEndDrag } from './utils/predicates';
import { getEventClientOffset, getNodeClientOffset } from './utils/offsets';
import { distance, inAngleRanges } from './utils/math';
import supportsPassive from './utils/supportsPassive';
import { OptionsReader } from './OptionsReader';
var eventNames = (_eventNames = {}, _defineProperty(_eventNames, ListenerType.mouse, {
  start: 'mousedown',
  move: 'mousemove',
  end: 'mouseup',
  contextmenu: 'contextmenu'
}), _defineProperty(_eventNames, ListenerType.touch, {
  start: 'touchstart',
  move: 'touchmove',
  end: 'touchend'
}), _defineProperty(_eventNames, ListenerType.keyboard, {
  keydown: 'keydown'
}), _eventNames);

var TouchBackend =
/*#__PURE__*/
function () {
  function TouchBackend(manager, context, options) {
    var _this = this;

    _classCallCheck(this, TouchBackend);

    this.getSourceClientOffset = function (sourceId) {
      return getNodeClientOffset(_this.sourceNodes[sourceId]);
    };

    this.handleTopMoveStartCapture = function (e) {
      if (!eventShouldStartDrag(e)) {
        return;
      }

      _this.moveStartSourceIds = [];
    };

    this.handleMoveStart = function (sourceId) {
      // Just because we received an event doesn't necessarily mean we need to collect drag sources.
      // We only collect start collecting drag sources on touch and left mouse events.
      if (Array.isArray(_this.moveStartSourceIds)) {
        _this.moveStartSourceIds.unshift(sourceId);
      }
    };

    this.handleTopMoveStart = function (e) {
      if (!eventShouldStartDrag(e)) {
        return;
      } // Don't prematurely preventDefault() here since it might:
      // 1. Mess up scrolling
      // 2. Mess up long tap (which brings up context menu)
      // 3. If there's an anchor link as a child, tap won't be triggered on link


      var clientOffset = getEventClientOffset(e);

      if (clientOffset) {
        _this._mouseClientOffset = clientOffset;
      }

      _this.waitingForDelay = false;
    };

    this.handleTopMoveStartDelay = function (e) {
      if (!eventShouldStartDrag(e)) {
        return;
      }

      var delay = e.type === eventNames.touch.start ? _this.options.delayTouchStart : _this.options.delayMouseStart;
      _this.timeout = setTimeout(_this.handleTopMoveStart.bind(_this, e), delay);
      _this.waitingForDelay = true;
    };

    this.handleTopMoveCapture = function () {
      _this.dragOverTargetIds = [];
    };

    this.handleMove = function (_, targetId) {
      if (_this.dragOverTargetIds) {
        _this.dragOverTargetIds.unshift(targetId);
      }
    };

    this.handleTopMove = function (e) {
      if (_this.timeout) {
        clearTimeout(_this.timeout);
      }

      if (!_this.document || _this.waitingForDelay) {
        return;
      }

      var moveStartSourceIds = _this.moveStartSourceIds,
          dragOverTargetIds = _this.dragOverTargetIds;
      var enableHoverOutsideTarget = _this.options.enableHoverOutsideTarget;
      var clientOffset = getEventClientOffset(e);

      if (!clientOffset) {
        return;
      } // If the touch move started as a scroll, or is is between the scroll angles


      if (_this._isScrolling || !_this.monitor.isDragging() && inAngleRanges(_this._mouseClientOffset.x || 0, _this._mouseClientOffset.y || 0, clientOffset.x, clientOffset.y, _this.options.scrollAngleRanges)) {
        _this._isScrolling = true;
        return;
      } // If we're not dragging and we've moved a little, that counts as a drag start


      if (!_this.monitor.isDragging() && // eslint-disable-next-line no-prototype-builtins
      _this._mouseClientOffset.hasOwnProperty('x') && moveStartSourceIds && distance(_this._mouseClientOffset.x || 0, _this._mouseClientOffset.y || 0, clientOffset.x, clientOffset.y) > (_this.options.touchSlop ? _this.options.touchSlop : 0)) {
        _this.moveStartSourceIds = undefined;

        _this.actions.beginDrag(moveStartSourceIds, {
          clientOffset: _this._mouseClientOffset,
          getSourceClientOffset: _this.getSourceClientOffset,
          publishSource: false
        });
      }

      if (!_this.monitor.isDragging()) {
        return;
      }

      var sourceNode = _this.sourceNodes[_this.monitor.getSourceId()];

      _this.installSourceNodeRemovalObserver(sourceNode);

      _this.actions.publishDragSource();

      e.preventDefault(); // Get the node elements of the hovered DropTargets

      var dragOverTargetNodes = (dragOverTargetIds || []).map(function (key) {
        return _this.targetNodes[key];
      }); // Get the a ordered list of nodes that are touched by

      var elementsAtPoint = _this.options.getDropTargetElementsAtPoint ? _this.options.getDropTargetElementsAtPoint(clientOffset.x, clientOffset.y, dragOverTargetNodes) : _this.document.elementsFromPoint(clientOffset.x, clientOffset.y); // Extend list with parents that are not receiving elementsFromPoint events (size 0 elements and svg groups)

      var elementsAtPointExtended = [];

      for (var nodeId in elementsAtPoint) {
        // eslint-disable-next-line no-prototype-builtins
        if (!elementsAtPoint.hasOwnProperty(nodeId)) {
          continue;
        }

        var currentNode = elementsAtPoint[nodeId];
        elementsAtPointExtended.push(currentNode);

        while (currentNode) {
          currentNode = currentNode.parentElement;

          if (elementsAtPointExtended.indexOf(currentNode) === -1) {
            elementsAtPointExtended.push(currentNode);
          }
        }
      }

      var orderedDragOverTargetIds = elementsAtPointExtended // Filter off nodes that arent a hovered DropTargets nodes
      .filter(function (node) {
        return dragOverTargetNodes.indexOf(node) > -1;
      }) // Map back the nodes elements to targetIds
      .map(function (node) {
        for (var targetId in _this.targetNodes) {
          if (node === _this.targetNodes[targetId]) {
            return targetId;
          }
        }

        return undefined;
      }) // Filter off possible null rows
      .filter(function (node) {
        return !!node;
      }).filter(function (id, index, ids) {
        return ids.indexOf(id) === index;
      }); // Invoke hover for drop targets when source node is still over and pointer is outside

      if (enableHoverOutsideTarget) {
        for (var targetId in _this.targetNodes) {
          if (_this.targetNodes[targetId] && _this.targetNodes[targetId].contains(sourceNode) && orderedDragOverTargetIds.indexOf(targetId) === -1) {
            orderedDragOverTargetIds.unshift(targetId);
            break;
          }
        }
      } // Reverse order because dnd-core reverse it before calling the DropTarget drop methods


      orderedDragOverTargetIds.reverse();

      _this.actions.hover(orderedDragOverTargetIds, {
        clientOffset: clientOffset
      });
    };

    this.handleTopMoveEndCapture = function (e) {
      _this._isScrolling = false;

      if (!eventShouldEndDrag(e)) {
        return;
      }

      if (!_this.monitor.isDragging() || _this.monitor.didDrop()) {
        _this.moveStartSourceIds = undefined;
        return;
      }

      e.preventDefault();
      _this._mouseClientOffset = {};

      _this.uninstallSourceNodeRemovalObserver();

      _this.actions.drop();

      _this.actions.endDrag();
    };

    this.handleCancelOnEscape = function (e) {
      if (e.key === 'Escape' && _this.monitor.isDragging()) {
        _this._mouseClientOffset = {};

        _this.uninstallSourceNodeRemovalObserver();

        _this.actions.endDrag();
      }
    };

    this.options = new OptionsReader(options, context);
    this.actions = manager.getActions();
    this.monitor = manager.getMonitor();
    this.sourceNodes = {};
    this.sourcePreviewNodes = {};
    this.sourcePreviewNodeOptions = {};
    this.targetNodes = {};
    this.listenerTypes = [];
    this._mouseClientOffset = {};
    this._isScrolling = false;

    if (this.options.enableMouseEvents) {
      this.listenerTypes.push(ListenerType.mouse);
    }

    if (this.options.enableTouchEvents) {
      this.listenerTypes.push(ListenerType.touch);
    }

    if (this.options.enableKeyboardEvents) {
      this.listenerTypes.push(ListenerType.keyboard);
    }
  } // public for test


  _createClass(TouchBackend, [{
    key: "setup",
    value: function setup() {
      if (!this.window) {
        return;
      }

      invariant(!TouchBackend.isSetUp, 'Cannot have two Touch backends at the same time.');
      TouchBackend.isSetUp = true;
      this.addEventListener(this.window, 'start', this.getTopMoveStartHandler());
      this.addEventListener(this.window, 'start', this.handleTopMoveStartCapture, true);
      this.addEventListener(this.window, 'move', this.handleTopMove);
      this.addEventListener(this.window, 'move', this.handleTopMoveCapture, true);
      this.addEventListener(this.window, 'end', this.handleTopMoveEndCapture, true);

      if (this.options.enableMouseEvents && !this.options.ignoreContextMenu) {
        this.addEventListener(this.window, 'contextmenu', this.handleTopMoveEndCapture);
      }

      if (this.options.enableKeyboardEvents) {
        this.addEventListener(this.window, 'keydown', this.handleCancelOnEscape, true);
      }
    }
  }, {
    key: "teardown",
    value: function teardown() {
      if (!this.window) {
        return;
      }

      TouchBackend.isSetUp = false;
      this._mouseClientOffset = {};
      this.removeEventListener(this.window, 'start', this.handleTopMoveStartCapture, true);
      this.removeEventListener(this.window, 'start', this.handleTopMoveStart);
      this.removeEventListener(this.window, 'move', this.handleTopMoveCapture, true);
      this.removeEventListener(this.window, 'move', this.handleTopMove);
      this.removeEventListener(this.window, 'end', this.handleTopMoveEndCapture, true);

      if (this.options.enableMouseEvents && !this.options.ignoreContextMenu) {
        this.removeEventListener(this.window, 'contextmenu', this.handleTopMoveEndCapture);
      }

      if (this.options.enableKeyboardEvents) {
        this.removeEventListener(this.window, 'keydown', this.handleCancelOnEscape, true);
      }

      this.uninstallSourceNodeRemovalObserver();
    }
  }, {
    key: "addEventListener",
    value: function addEventListener(subject, event, handler, capture) {
      var options = supportsPassive ? {
        capture: capture,
        passive: false
      } : capture;
      this.listenerTypes.forEach(function (listenerType) {
        var evt = eventNames[listenerType][event];

        if (evt) {
          subject.addEventListener(evt, handler, options);
        }
      });
    }
  }, {
    key: "removeEventListener",
    value: function removeEventListener(subject, event, handler, capture) {
      var options = supportsPassive ? {
        capture: capture,
        passive: false
      } : capture;
      this.listenerTypes.forEach(function (listenerType) {
        var evt = eventNames[listenerType][event];

        if (evt) {
          subject.removeEventListener(evt, handler, options);
        }
      });
    }
  }, {
    key: "connectDragSource",
    value: function connectDragSource(sourceId, node) {
      var _this2 = this;

      var handleMoveStart = this.handleMoveStart.bind(this, sourceId);
      this.sourceNodes[sourceId] = node;
      this.addEventListener(node, 'start', handleMoveStart);
      return function () {
        delete _this2.sourceNodes[sourceId];

        _this2.removeEventListener(node, 'start', handleMoveStart);
      };
    }
  }, {
    key: "connectDragPreview",
    value: function connectDragPreview(sourceId, node, options) {
      var _this3 = this;

      this.sourcePreviewNodeOptions[sourceId] = options;
      this.sourcePreviewNodes[sourceId] = node;
      return function () {
        delete _this3.sourcePreviewNodes[sourceId];
        delete _this3.sourcePreviewNodeOptions[sourceId];
      };
    }
  }, {
    key: "connectDropTarget",
    value: function connectDropTarget(targetId, node) {
      var _this4 = this;

      if (!this.document) {
        return function () {
          return null;
        };
      }

      var handleMove = function handleMove(e) {
        if (!_this4.document || !_this4.monitor.isDragging()) {
          return;
        }

        var coords;
        /**
         * Grab the coordinates for the current mouse/touch position
         */

        switch (e.type) {
          case eventNames.mouse.move:
            coords = {
              x: e.clientX,
              y: e.clientY
            };
            break;

          case eventNames.touch.move:
            coords = {
              x: e.touches[0].clientX,
              y: e.touches[0].clientY
            };
            break;
        }
        /**
         * Use the coordinates to grab the element the drag ended on.
         * If the element is the same as the target node (or any of it's children) then we have hit a drop target and can handle the move.
         */


        var droppedOn = coords != null ? _this4.document.elementFromPoint(coords.x, coords.y) : undefined;
        var childMatch = droppedOn && node.contains(droppedOn);

        if (droppedOn === node || childMatch) {
          return _this4.handleMove(e, targetId);
        }
      };
      /**
       * Attaching the event listener to the body so that touchmove will work while dragging over multiple target elements.
       */


      this.addEventListener(this.document.body, 'move', handleMove);
      this.targetNodes[targetId] = node;
      return function () {
        if (_this4.document) {
          delete _this4.targetNodes[targetId];

          _this4.removeEventListener(_this4.document.body, 'move', handleMove);
        }
      };
    }
  }, {
    key: "getTopMoveStartHandler",
    value: function getTopMoveStartHandler() {
      if (!this.options.delayTouchStart && !this.options.delayMouseStart) {
        return this.handleTopMoveStart;
      }

      return this.handleTopMoveStartDelay;
    }
  }, {
    key: "installSourceNodeRemovalObserver",
    value: function installSourceNodeRemovalObserver(node) {
      var _this5 = this;

      this.uninstallSourceNodeRemovalObserver();
      this.draggedSourceNode = node;
      this.draggedSourceNodeRemovalObserver = new MutationObserver(function () {
        if (node && !node.parentElement) {
          _this5.resurrectSourceNode();

          _this5.uninstallSourceNodeRemovalObserver();
        }
      });

      if (!node || !node.parentElement) {
        return;
      }

      this.draggedSourceNodeRemovalObserver.observe(node.parentElement, {
        childList: true
      });
    }
  }, {
    key: "resurrectSourceNode",
    value: function resurrectSourceNode() {
      if (this.document && this.draggedSourceNode) {
        this.draggedSourceNode.style.display = 'none';
        this.draggedSourceNode.removeAttribute('data-reactid');
        this.document.body.appendChild(this.draggedSourceNode);
      }
    }
  }, {
    key: "uninstallSourceNodeRemovalObserver",
    value: function uninstallSourceNodeRemovalObserver() {
      if (this.draggedSourceNodeRemovalObserver) {
        this.draggedSourceNodeRemovalObserver.disconnect();
      }

      this.draggedSourceNodeRemovalObserver = undefined;
      this.draggedSourceNode = undefined;
    }
  }, {
    key: "window",
    get: function get() {
      return this.options.window;
    } // public for test

  }, {
    key: "document",
    get: function get() {
      if (this.window) {
        return this.window.document;
      }

      return undefined;
    }
  }]);

  return TouchBackend;
}();

export { TouchBackend as default };