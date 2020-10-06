function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import { useRef, useMemo } from 'react';
import invariant from 'invariant';
import { useMonitorOutput } from './internal/useMonitorOutput';
import { useIsomorphicLayoutEffect } from './internal/useIsomorphicLayoutEffect';
import { useDragSourceMonitor, useDragHandler } from './internal/drag';
/**
 * useDragSource hook
 * @param sourceSpec The drag source specification *
 */

export function useDrag(spec) {
  var specRef = useRef(spec);
  specRef.current = spec; // TODO: wire options into createSourceConnector

  invariant(spec.item != null, 'item must be defined');
  invariant(spec.item.type != null, 'item type must be defined');

  var _useDragSourceMonitor = useDragSourceMonitor(),
      _useDragSourceMonitor2 = _slicedToArray(_useDragSourceMonitor, 2),
      monitor = _useDragSourceMonitor2[0],
      connector = _useDragSourceMonitor2[1];

  useDragHandler(specRef, monitor, connector);
  var result = useMonitorOutput(monitor, specRef.current.collect || function () {
    return {};
  }, function () {
    return connector.reconnect();
  });
  var connectDragSource = useMemo(function () {
    return connector.hooks.dragSource();
  }, [connector]);
  var connectDragPreview = useMemo(function () {
    return connector.hooks.dragPreview();
  }, [connector]);
  useIsomorphicLayoutEffect(function () {
    connector.dragSourceOptions = specRef.current.options || null;
    connector.reconnect();
  }, [connector]);
  useIsomorphicLayoutEffect(function () {
    connector.dragPreviewOptions = specRef.current.previewOptions || null;
    connector.reconnect();
  }, [connector]);
  return [result, connectDragSource, connectDragPreview];
}