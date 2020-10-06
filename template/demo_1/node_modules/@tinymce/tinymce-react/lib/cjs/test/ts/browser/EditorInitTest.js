"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var agar_1 = require("@ephox/agar");
var bedrock_client_1 = require("@ephox/bedrock-client");
var mcagar_1 = require("@ephox/mcagar");
var miniature_1 = require("@tinymce/miniature");
var Loader_1 = require("../alien/Loader");
bedrock_client_1.UnitTest.asynctest('Editor.test', function (success, failure) {
    var cAssertProperty = function (propName, expected) {
        return agar_1.Chain.op(function (el) {
            agar_1.Assertions.assertEq(propName + ' should be ' + expected, expected, el[propName]);
        });
    };
    var sTestVersion = function (version) { return miniature_1.VersionLoader.sWithVersion(version, agar_1.GeneralSteps.sequence([
        agar_1.Logger.t('tagName prop changes element', agar_1.GeneralSteps.sequence([
            agar_1.Logger.t('it is div by default for inline', agar_1.Chain.asStep({}, [
                Loader_1.cRender({ inline: true }),
                Loader_1.cDOMNode(cAssertProperty('tagName', 'DIV')),
                Loader_1.cRemove
            ])),
            agar_1.Logger.t('can be set to inline in init', agar_1.Chain.asStep({}, [
                Loader_1.cRender({
                    init: {
                        inline: true
                    }
                }),
                Loader_1.cDOMNode(cAssertProperty('tagName', 'DIV')),
                Loader_1.cRemove
            ])),
            agar_1.Logger.t('it can be changed to p', agar_1.Chain.asStep({}, [
                Loader_1.cRender({
                    inline: true,
                    tagName: 'p'
                }),
                Loader_1.cDOMNode(cAssertProperty('tagName', 'P')),
                Loader_1.cRemove
            ])),
            agar_1.Logger.t('iframe editor does not change element', agar_1.Chain.asStep({}, [
                Loader_1.cRender({ tagName: 'p' }),
                Loader_1.cDOMNode(cAssertProperty('tagName', 'TEXTAREA')),
                Loader_1.cRemove
            ]))
        ])),
        agar_1.Logger.t('id is set automatically if id prop not provided', agar_1.GeneralSteps.sequence([
            agar_1.Logger.t('is set normally if prop is provided', agar_1.Chain.asStep({}, [
                Loader_1.cRender({ id: 'test' }),
                Loader_1.cDOMNode(cAssertProperty('id', 'test')),
                Loader_1.cRemove
            ])),
            agar_1.Logger.t('gets set automatically to uuid if not set', agar_1.Chain.asStep({}, [
                Loader_1.cRender({}),
                Loader_1.cDOMNode(agar_1.Chain.op(function (node) {
                    agar_1.Assertions.assertEq('Should not be uuid', typeof node.id === 'string' && node.id.indexOf('tiny-react') !== -1, true);
                })),
                Loader_1.cRemove
            ])),
        ])),
        agar_1.Logger.t('sets name on form', agar_1.GeneralSteps.sequence([
            agar_1.Logger.t('is not set when prop is not provided', agar_1.Chain.asStep({}, [
                Loader_1.cRender({}),
                Loader_1.cDOMNode(cAssertProperty('name', '')),
                Loader_1.cRemove
            ])),
            agar_1.Logger.t('is set when prop is provided', agar_1.Chain.asStep({}, [
                Loader_1.cRender({ textareaName: 'test' }),
                Loader_1.cDOMNode(cAssertProperty('name', 'test')),
                Loader_1.cRemove
            ])),
        ])),
        agar_1.Logger.t('Value prop should propagate changes to editor', agar_1.Chain.asStep({}, [
            Loader_1.cRender({ value: '<p>Initial Value</p>' }),
            Loader_1.cEditor(mcagar_1.ApiChains.cAssertContent('<p>Initial Value</p>')),
            Loader_1.cReRender({ value: '<p>New Value</p>' }),
            Loader_1.cEditor(mcagar_1.ApiChains.cAssertContent('<p>New Value</p>')),
            Loader_1.cRemove
        ])),
        agar_1.Logger.t('Disabled prop should disable editor', agar_1.Chain.asStep({}, [
            Loader_1.cRender({}),
            Loader_1.cEditor(agar_1.Chain.op(function (editor) {
                agar_1.Assertions.assertEq('Should be design mode', true, version === '4' ? !editor.readonly : editor.mode.get() === 'design');
            })),
            Loader_1.cReRender({ disabled: true }),
            Loader_1.cEditor(agar_1.Chain.op(function (editor) {
                agar_1.Assertions.assertEq('Should be readonly mode', true, version === '4' ? editor.readonly : editor.mode.get() === 'readonly');
            })),
            Loader_1.cRemove
        ]))
    ])); };
    agar_1.Pipeline.async({}, [
        sTestVersion('5'),
        sTestVersion('4'),
    ], success, failure);
});
