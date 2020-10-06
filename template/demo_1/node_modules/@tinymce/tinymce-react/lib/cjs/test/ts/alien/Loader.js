"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var agar_1 = require("@ephox/agar");
var katamari_1 = require("@ephox/katamari");
var React = require("react");
var ReactDOM = require("react-dom");
var Editor_1 = require("../../../main/ts/components/Editor");
var getRoot = function () {
    return katamari_1.Option.from(document.getElementById('root')).getOrThunk(function () {
        var root = document.createElement('div');
        root.id = 'root';
        document.body.appendChild(root);
        return root;
    });
};
var cRender = function (props) {
    return agar_1.Chain.async(function (_, next, die) {
        var originalInit = props.init || {};
        var originalSetup = originalInit.setup || katamari_1.Fun.noop;
        var ref = React.createRef();
        var init = __assign(__assign({}, originalInit), { setup: function (editor) {
                originalSetup(editor);
                editor.on('SkinLoaded', function () {
                    setTimeout(function () {
                        katamari_1.Option.from(ref.current)
                            .map(ReactDOM.findDOMNode)
                            .filter(function (val) { return val instanceof Element; })
                            .fold(function () { return die('Could not find DOMNode'); }, function (DOMNode) {
                            next({
                                ref: ref,
                                editor: editor,
                                DOMNode: DOMNode
                            });
                        });
                    }, 0);
                });
            } });
        /**
         * NOTE: TinyMCE will manipulate the DOM directly and this may cause issues with React's virtual DOM getting
         * out of sync. The official fix for this is wrap everything (textarea + editor) in an element. As far as React
         * is concerned, the wrapper always only has a single child, thus ensuring that React doesn’t have a reason to
         * touch the nodes created by TinyMCE. Since this only seems to be an issue when rendering TinyMCE 4 directly
         * into a root and a fix would be a breaking change, let's just wrap the editor in a <div> here for now.
         */
        ReactDOM.render(React.createElement("div", null,
            React.createElement(Editor_1.Editor, __assign({ ref: ref }, props, { init: init }))), getRoot());
    });
};
exports.cRender = cRender;
// By rendering the Editor into the same root, React will perform a diff and update.
var cReRender = function (props) {
    return agar_1.Chain.op(function (context) {
        ReactDOM.render(React.createElement("div", null,
            React.createElement(Editor_1.Editor, __assign({ ref: context.ref }, props))), getRoot());
    });
};
exports.cReRender = cReRender;
var cRemove = agar_1.Chain.op(function (_) {
    ReactDOM.unmountComponentAtNode(getRoot());
});
exports.cRemove = cRemove;
var cNamedChainDirect = function (name) { return agar_1.NamedChain.direct(agar_1.NamedChain.inputName(), agar_1.Chain.mapper(function (res) { return res[name]; }), name); };
exports.cNamedChainDirect = cNamedChainDirect;
var cDOMNode = function (chain) {
    return agar_1.NamedChain.asChain([
        cNamedChainDirect('DOMNode'),
        agar_1.NamedChain.read('DOMNode', chain),
        agar_1.NamedChain.outputInput
    ]);
};
exports.cDOMNode = cDOMNode;
var cEditor = function (chain) {
    return agar_1.NamedChain.asChain([
        cNamedChainDirect('editor'),
        agar_1.NamedChain.read('editor', chain),
        agar_1.NamedChain.outputInput
    ]);
};
exports.cEditor = cEditor;
