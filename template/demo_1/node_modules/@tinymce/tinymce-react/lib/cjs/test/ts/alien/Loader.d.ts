import { Chain } from '@ephox/agar';
import * as React from 'react';
import { Editor, IAllProps } from '../../../main/ts/components/Editor';
export interface Context {
    DOMNode: Element;
    editor: any;
    ref: React.RefObject<Editor>;
}
declare const cRender: (props: IAllProps) => Chain<Context, Context>;
declare const cReRender: (props: IAllProps) => Chain<Context, Context>;
declare const cRemove: Chain<unknown, unknown>;
declare const cNamedChainDirect: (name: "ref" | "DOMNode" | "editor") => Chain<Record<string, any>, Record<string, any>>;
declare const cDOMNode: (chain: Chain<any, any>) => Chain<unknown, any>;
declare const cEditor: (chain: Chain<any, any>) => Chain<unknown, any>;
export { cRender, cReRender, cRemove, cNamedChainDirect, cDOMNode, cEditor };
