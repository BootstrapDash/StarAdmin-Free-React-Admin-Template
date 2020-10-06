import { Assertions, Chain, GeneralSteps, Logger, Pipeline } from '@ephox/agar';
import { UnitTest } from '@ephox/bedrock-client';
import { ApiChains } from '@ephox/mcagar';
import { VersionLoader } from '@tinymce/miniature';
import { cRemove, cRender, cDOMNode, cEditor, cReRender } from '../alien/Loader';
UnitTest.asynctest('Editor.test', function (success, failure) {
    var cAssertProperty = function (propName, expected) {
        return Chain.op(function (el) {
            Assertions.assertEq(propName + ' should be ' + expected, expected, el[propName]);
        });
    };
    var sTestVersion = function (version) { return VersionLoader.sWithVersion(version, GeneralSteps.sequence([
        Logger.t('tagName prop changes element', GeneralSteps.sequence([
            Logger.t('it is div by default for inline', Chain.asStep({}, [
                cRender({ inline: true }),
                cDOMNode(cAssertProperty('tagName', 'DIV')),
                cRemove
            ])),
            Logger.t('can be set to inline in init', Chain.asStep({}, [
                cRender({
                    init: {
                        inline: true
                    }
                }),
                cDOMNode(cAssertProperty('tagName', 'DIV')),
                cRemove
            ])),
            Logger.t('it can be changed to p', Chain.asStep({}, [
                cRender({
                    inline: true,
                    tagName: 'p'
                }),
                cDOMNode(cAssertProperty('tagName', 'P')),
                cRemove
            ])),
            Logger.t('iframe editor does not change element', Chain.asStep({}, [
                cRender({ tagName: 'p' }),
                cDOMNode(cAssertProperty('tagName', 'TEXTAREA')),
                cRemove
            ]))
        ])),
        Logger.t('id is set automatically if id prop not provided', GeneralSteps.sequence([
            Logger.t('is set normally if prop is provided', Chain.asStep({}, [
                cRender({ id: 'test' }),
                cDOMNode(cAssertProperty('id', 'test')),
                cRemove
            ])),
            Logger.t('gets set automatically to uuid if not set', Chain.asStep({}, [
                cRender({}),
                cDOMNode(Chain.op(function (node) {
                    Assertions.assertEq('Should not be uuid', typeof node.id === 'string' && node.id.indexOf('tiny-react') !== -1, true);
                })),
                cRemove
            ])),
        ])),
        Logger.t('sets name on form', GeneralSteps.sequence([
            Logger.t('is not set when prop is not provided', Chain.asStep({}, [
                cRender({}),
                cDOMNode(cAssertProperty('name', '')),
                cRemove
            ])),
            Logger.t('is set when prop is provided', Chain.asStep({}, [
                cRender({ textareaName: 'test' }),
                cDOMNode(cAssertProperty('name', 'test')),
                cRemove
            ])),
        ])),
        Logger.t('Value prop should propagate changes to editor', Chain.asStep({}, [
            cRender({ value: '<p>Initial Value</p>' }),
            cEditor(ApiChains.cAssertContent('<p>Initial Value</p>')),
            cReRender({ value: '<p>New Value</p>' }),
            cEditor(ApiChains.cAssertContent('<p>New Value</p>')),
            cRemove
        ])),
        Logger.t('Disabled prop should disable editor', Chain.asStep({}, [
            cRender({}),
            cEditor(Chain.op(function (editor) {
                Assertions.assertEq('Should be design mode', true, version === '4' ? !editor.readonly : editor.mode.get() === 'design');
            })),
            cReRender({ disabled: true }),
            cEditor(Chain.op(function (editor) {
                Assertions.assertEq('Should be readonly mode', true, version === '4' ? editor.readonly : editor.mode.get() === 'readonly');
            })),
            cRemove
        ]))
    ])); };
    Pipeline.async({}, [
        sTestVersion('5'),
        sTestVersion('4'),
    ], success, failure);
});
