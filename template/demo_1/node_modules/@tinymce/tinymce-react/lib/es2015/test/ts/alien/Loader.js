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
import { Chain, NamedChain } from '@ephox/agar';
import { Fun, Option } from '@ephox/katamari';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Editor } from '../../../main/ts/components/Editor';
var getRoot = function () {
    return Option.from(document.getElementById('root')).getOrThunk(function () {
        var root = document.createElement('div');
        root.id = 'root';
        document.body.appendChild(root);
        return root;
    });
};
var cRender = function (props) {
    return Chain.async(function (_, next, die) {
        var originalInit = props.init || {};
        var originalSetup = originalInit.setup || Fun.noop;
        var ref = React.createRef();
        var init = __assign(__assign({}, originalInit), { setup: function (editor) {
                originalSetup(editor);
                editor.on('SkinLoaded', function () {
                    setTimeout(function () {
                        Option.from(ref.current)
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
            React.createElement(Editor, __assign({ ref: ref }, props, { init: init }))), getRoot());
    });
};
// By rendering the Editor into the same root, React will perform a diff and update.
var cReRender = function (props) {
    return Chain.op(function (context) {
        ReactDOM.render(React.createElement("div", null,
            React.createElement(Editor, __assign({ ref: context.ref }, props))), getRoot());
    });
};
var cRemove = Chain.op(function (_) {
    ReactDOM.unmountComponentAtNode(getRoot());
});
var cNamedChainDirect = function (name) { return NamedChain.direct(NamedChain.inputName(), Chain.mapper(function (res) { return res[name]; }), name); };
var cDOMNode = function (chain) {
    return NamedChain.asChain([
        cNamedChainDirect('DOMNode'),
        NamedChain.read('DOMNode', chain),
        NamedChain.outputInput
    ]);
};
var cEditor = function (chain) {
    return NamedChain.asChain([
        cNamedChainDirect('editor'),
        NamedChain.read('editor', chain),
        NamedChain.outputInput
    ]);
};
export { cRender, cReRender, cRemove, cNamedChainDirect, cDOMNode, cEditor };
