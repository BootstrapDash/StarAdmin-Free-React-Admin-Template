/**
 * Copyright (c) 2017-present, Ephox, Inc.
 *
 * This source code is licensed under the Apache 2 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { eventPropTypes } from './components/EditorPropTypes';
export var isFunction = function (x) { return typeof x === 'function'; };
var isEventProp = function (name) {
    return name in eventPropTypes;
};
var findEventHandlers = function (props) {
    return Object.keys(props)
        .filter(isEventProp)
        .filter(function (name) { return isFunction(props[name]); })
        .map(function (name) { return ({
        handler: props[name],
        eventName: name.substring(2)
    }); });
};
export var bindHandlers = function (editor, props, boundHandlers) {
    findEventHandlers(props).forEach(function (found) {
        // Unbind old handler
        var oldHandler = boundHandlers[found.eventName];
        if (isFunction(oldHandler)) {
            editor.off(found.eventName, oldHandler);
        }
        // Bind new handler
        var newHandler = function (e) { return found.handler(e, editor); };
        boundHandlers[found.eventName] = newHandler;
        editor.on(found.eventName, newHandler);
    });
};
var unique = 0;
export var uuid = function (prefix) {
    var date = new Date();
    var time = date.getTime();
    var random = Math.floor(Math.random() * 1000000000);
    unique++;
    return prefix + '_' + random + unique + String(time);
};
export var isTextarea = function (element) {
    return element !== null && element.tagName.toLowerCase() === 'textarea';
};
var normalizePluginArray = function (plugins) {
    if (typeof plugins === 'undefined' || plugins === '') {
        return [];
    }
    return Array.isArray(plugins) ? plugins : plugins.split(' ');
};
export var mergePlugins = function (initPlugins, inputPlugins) {
    return normalizePluginArray(initPlugins).concat(normalizePluginArray(inputPlugins));
};
