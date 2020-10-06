declare type EditorOption = "minLines" | "maxLines" | "readOnly" | "highlightActiveLine" | "tabSize" | "enableBasicAutocompletion" | "enableLiveAutocompletion" | "enableSnippets";
declare const editorOptions: EditorOption[];
declare type EditorEvent = "onChange" | "onFocus" | "onInput" | "onBlur" | "onCopy" | "onPaste" | "onSelectionChange" | "onCursorChange" | "onScroll" | "handleOptions" | "updateRef";
declare const editorEvents: EditorEvent[];
declare const getAceInstance: () => any;
declare const debounce: (fn: (...args: any[]) => void, delay: number) => () => void;
export { editorOptions, editorEvents, debounce, getAceInstance };
