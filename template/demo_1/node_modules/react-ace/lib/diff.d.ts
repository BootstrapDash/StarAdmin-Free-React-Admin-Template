import * as PropTypes from "prop-types";
import * as React from "react";
import { IEditorProps } from "./types";
export interface IDiffEditorProps {
    cursorStart?: number;
    editorProps?: object;
    enableBasicAutocompletion?: boolean | string[];
    enableLiveAutocompletion?: boolean | string[];
    focus?: boolean;
    fontSize?: number;
    height?: string;
    highlightActiveLine?: boolean;
    maxLines?: number;
    minLines?: number;
    mode?: string;
    name?: string;
    className?: string;
    onLoad?: (editor: IEditorProps) => void;
    onChange?: (value: string[], event?: any) => void;
    onPaste?: (value: string) => void;
    onScroll?: (editor: IEditorProps) => void;
    orientation?: string;
    readOnly?: boolean;
    scrollMargin?: number[];
    setOptions?: object;
    showGutter?: boolean;
    showPrintMargin?: boolean;
    splits?: number;
    style?: object;
    tabSize?: number;
    theme?: string;
    value?: string[];
    width?: string;
    wrapEnabled?: boolean;
}
export interface IDiffEditorState {
    value: string[];
}
export default class DiffComponent extends React.Component<IDiffEditorProps, IDiffEditorState> {
    static propTypes: PropTypes.ValidationMap<IDiffEditorProps>;
    static defaultProps: Partial<IDiffEditorProps>;
    constructor(props: IDiffEditorProps);
    componentDidUpdate(): void;
    onChange(value: any): void;
    diff(): any[][];
    generateDiffedLines(diff: any): {
        left: any[];
        right: any[];
    };
    setCodeMarkers(diffedLines?: any): any[][];
    render(): JSX.Element;
}
