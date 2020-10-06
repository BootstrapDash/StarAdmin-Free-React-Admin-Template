/**
 * Copyright (c) 2017-present, Ephox, Inc.
 *
 * This source code is licensed under the Apache 2 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import * as React from 'react';
import { ScriptLoader } from '../ScriptLoader';
import { getTinymce } from '../TinyMCE';
import { bindHandlers, isFunction, isTextarea, mergePlugins, uuid } from '../Utils';
import { EditorPropTypes } from './EditorPropTypes';
import { isNullOrUndefined } from 'util';
var Editor = /** @class */ (function (_super) {
    __extends(Editor, _super);
    function Editor(props) {
        var _this = _super.call(this, props) || this;
        _this.initialise = function () {
            var finalInit = __assign(__assign({}, _this.props.init), { target: _this.elementRef.current, readonly: _this.props.disabled, inline: _this.inline, plugins: mergePlugins(_this.props.init && _this.props.init.plugins, _this.props.plugins), toolbar: _this.props.toolbar || (_this.props.init && _this.props.init.toolbar), setup: function (editor) {
                    _this.editor = editor;
                    editor.on('init', function (e) {
                        _this.initEditor(e, editor);
                    });
                    if (_this.props.init && typeof _this.props.init.setup === 'function') {
                        _this.props.init.setup(editor);
                    }
                } });
            if (isTextarea(_this.elementRef.current)) {
                _this.elementRef.current.style.visibility = '';
            }
            getTinymce().init(finalInit);
        };
        _this.id = _this.props.id || uuid('tiny-react');
        _this.elementRef = React.createRef();
        _this.inline = _this.props.inline ? _this.props.inline : _this.props.init && _this.props.init.inline;
        _this.boundHandlers = {};
        return _this;
    }
    Editor.prototype.componentDidUpdate = function (prevProps) {
        if (this.editor && this.editor.initialized) {
            bindHandlers(this.editor, this.props, this.boundHandlers);
            this.currentContent = this.currentContent || this.editor.getContent({ format: this.props.outputFormat });
            if (typeof this.props.value === 'string' && this.props.value !== prevProps.value && this.props.value !== this.currentContent) {
                this.editor.setContent(this.props.value);
            }
            if (typeof this.props.disabled === 'boolean' && this.props.disabled !== prevProps.disabled) {
                this.editor.setMode(this.props.disabled ? 'readonly' : 'design');
            }
        }
    };
    Editor.prototype.componentDidMount = function () {
        if (getTinymce() !== null) {
            this.initialise();
        }
        else if (this.elementRef.current && this.elementRef.current.ownerDocument) {
            ScriptLoader.load(this.elementRef.current.ownerDocument, this.getScriptSrc(), this.initialise);
        }
    };
    Editor.prototype.componentWillUnmount = function () {
        if (getTinymce() !== null) {
            getTinymce().remove(this.editor);
        }
    };
    Editor.prototype.render = function () {
        return this.inline ? this.renderInline() : this.renderIframe();
    };
    Editor.prototype.getScriptSrc = function () {
        var channel = this.props.cloudChannel;
        var apiKey = this.props.apiKey ? this.props.apiKey : 'no-api-key';
        return isNullOrUndefined(this.props.tinymceScriptSrc) ?
            "https://cdn.tiny.cloud/1/" + apiKey + "/tinymce/" + channel + "/tinymce.min.js" :
            this.props.tinymceScriptSrc;
    };
    Editor.prototype.initEditor = function (initEvent, editor) {
        var _this = this;
        var value = typeof this.props.value === 'string' ? this.props.value : typeof this.props.initialValue === 'string' ? this.props.initialValue : '';
        editor.setContent(value);
        if (isFunction(this.props.onEditorChange)) {
            editor.on('change keyup setcontent', function (e) {
                var newContent = editor.getContent({ format: _this.props.outputFormat });
                if (newContent !== _this.currentContent) {
                    _this.currentContent = newContent;
                    if (isFunction(_this.props.onEditorChange)) {
                        _this.props.onEditorChange(_this.currentContent, editor);
                    }
                }
            });
        }
        if (isFunction(this.props.onInit)) {
            this.props.onInit(initEvent, editor);
        }
        bindHandlers(editor, this.props, this.boundHandlers);
    };
    Editor.prototype.renderInline = function () {
        var _a = this.props.tagName, tagName = _a === void 0 ? 'div' : _a;
        return React.createElement(tagName, {
            ref: this.elementRef,
            id: this.id
        });
    };
    Editor.prototype.renderIframe = function () {
        return React.createElement('textarea', {
            ref: this.elementRef,
            style: { visibility: 'hidden' },
            name: this.props.textareaName,
            id: this.id
        });
    };
    Editor.propTypes = EditorPropTypes;
    Editor.defaultProps = {
        cloudChannel: '5'
    };
    return Editor;
}(React.Component));
export { Editor };
