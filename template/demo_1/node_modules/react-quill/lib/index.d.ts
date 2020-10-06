import React from 'react';
import Quill, { QuillOptionsStatic, DeltaStatic, RangeStatic, BoundsStatic, StringMap, Sources } from 'quill';
declare namespace ReactQuill {
    type Value = string | DeltaStatic;
    type Range = RangeStatic | null;
    interface QuillOptions extends QuillOptionsStatic {
        tabIndex?: number;
    }
    interface ReactQuillProps {
        bounds?: string | HTMLElement;
        children?: React.ReactElement<any>;
        className?: string;
        defaultValue?: Value;
        formats?: string[];
        id?: string;
        modules?: StringMap;
        onChange?(value: string, delta: DeltaStatic, source: Sources, editor: UnprivilegedEditor): void;
        onChangeSelection?(selection: Range, source: Sources, editor: UnprivilegedEditor): void;
        onFocus?(selection: Range, source: Sources, editor: UnprivilegedEditor): void;
        onBlur?(previousSelection: Range, source: Sources, editor: UnprivilegedEditor): void;
        onKeyDown?: React.EventHandler<any>;
        onKeyPress?: React.EventHandler<any>;
        onKeyUp?: React.EventHandler<any>;
        placeholder?: string;
        preserveWhitespace?: boolean;
        readOnly?: boolean;
        scrollingContainer?: string | HTMLElement;
        style?: React.CSSProperties;
        tabIndex?: number;
        theme?: string;
        value?: Value;
    }
    interface UnprivilegedEditor {
        getLength(): number;
        getText(index?: number, length?: number): string;
        getHTML(): string;
        getBounds(index: number, length?: number): BoundsStatic;
        getSelection(focus?: boolean): RangeStatic;
        getContents(index?: number, length?: number): DeltaStatic;
    }
}
import Value = ReactQuill.Value;
import Range = ReactQuill.Range;
import QuillOptions = ReactQuill.QuillOptions;
import ReactQuillProps = ReactQuill.ReactQuillProps;
import UnprivilegedEditor = ReactQuill.UnprivilegedEditor;
interface ReactQuillState {
    generation: number;
    value: Value;
    selection: Range;
}
declare class ReactQuill extends React.Component<ReactQuillProps, ReactQuillState> {
    static displayName: string;
    static Quill: typeof Quill;
    dirtyProps: (keyof ReactQuillProps)[];
    cleanProps: (keyof ReactQuillProps)[];
    static defaultProps: {
        theme: string;
        modules: {};
        readOnly: boolean;
    };
    state: ReactQuillState;
    editor?: Quill;
    editingArea?: React.ReactInstance | null;
    lastDeltaChangeSet?: DeltaStatic;
    regenerationSnapshot?: {
        delta: DeltaStatic;
        selection: Range;
    };
    unprivilegedEditor?: UnprivilegedEditor;
    constructor(props: ReactQuillProps);
    validateProps(props: ReactQuillProps): void;
    shouldComponentUpdate(nextProps: ReactQuillProps, nextState: ReactQuillState): boolean;
    shouldComponentRegenerate(nextProps: ReactQuillProps): boolean;
    componentDidMount(): void;
    componentWillUnmount(): void;
    componentDidUpdate(prevProps: ReactQuillProps, prevState: ReactQuillState): void;
    instantiateEditor(): void;
    destroyEditor(): void;
    isControlled(): boolean;
    getEditorConfig(): QuillOptions;
    getEditor(): Quill;
    /**
    Creates an editor on the given element. The editor will be passed the
    configuration, have its events bound,
    */
    createEditor(element: Element, config: QuillOptions): Quill;
    hookEditor(editor: Quill): void;
    unhookEditor(editor: Quill): void;
    getEditorContents(): Value;
    getEditorSelection(): Range;
    isDelta(value: any): boolean;
    isEqualValue(value: any, nextValue: any): boolean;
    setEditorContents(editor: Quill, value: Value): void;
    setEditorSelection(editor: Quill, range: Range): void;
    setEditorTabIndex(editor: Quill, tabIndex: number): void;
    setEditorReadOnly(editor: Quill, value: boolean): void;
    makeUnprivilegedEditor(editor: Quill): {
        getHTML: () => string;
        getLength: () => number;
        getText: (index?: number | undefined, length?: number | undefined) => string;
        getContents: (index?: number | undefined, length?: number | undefined) => DeltaStatic;
        getSelection: {
            (focus: true): RangeStatic;
            (focus?: false | undefined): Range;
        };
        getBounds: (index: number, length?: number | undefined) => BoundsStatic;
    };
    getEditingArea(): Element;
    renderEditingArea(): JSX.Element;
    render(): JSX.Element;
    onEditorChange: (eventName: "text-change" | "selection-change", rangeOrDelta: DeltaStatic | RangeStatic | null, oldRangeOrDelta: DeltaStatic | RangeStatic | null, source: Sources) => void;
    onEditorChangeText(value: string, delta: DeltaStatic, source: Sources, editor: UnprivilegedEditor): void;
    onEditorChangeSelection(nextSelection: RangeStatic, source: Sources, editor: UnprivilegedEditor): void;
    focus(): void;
    blur(): void;
}
export = ReactQuill;
