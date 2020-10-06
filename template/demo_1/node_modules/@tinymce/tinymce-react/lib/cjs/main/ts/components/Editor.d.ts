/**
 * Copyright (c) 2017-present, Ephox, Inc.
 *
 * This source code is licensed under the Apache 2 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import * as React from 'react';
import { EventHandler, IEvents } from '../Events';
import { IEditorPropTypes } from './EditorPropTypes';
export interface IProps {
    apiKey: string;
    id: string;
    inline: boolean;
    initialValue: string;
    onEditorChange: EventHandler<any>;
    value: string;
    init: Record<string, any>;
    outputFormat: 'html' | 'text';
    tagName: string;
    cloudChannel: string;
    plugins: string | string[];
    toolbar: string | string[];
    disabled: boolean;
    textareaName: string;
    tinymceScriptSrc: string;
}
export interface IAllProps extends Partial<IProps>, Partial<IEvents> {
}
export declare class Editor extends React.Component<IAllProps> {
    static propTypes: IEditorPropTypes;
    static defaultProps: Partial<IAllProps>;
    private id;
    private elementRef;
    private editor?;
    private inline;
    private currentContent?;
    private boundHandlers;
    constructor(props: Partial<IAllProps>);
    componentDidUpdate(prevProps: Partial<IAllProps>): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): React.ReactElement<{
        ref: React.RefObject<Element>;
        id: string;
    }, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)>;
    private getScriptSrc;
    private initialise;
    private initEditor;
    private renderInline;
    private renderIframe;
}
