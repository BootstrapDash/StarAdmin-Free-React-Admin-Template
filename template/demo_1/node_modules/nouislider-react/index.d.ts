import * as React from 'react';

interface Callback {
    /**
     * Array for both one-handle and two-handle sliders. It contains the current slider values,
     * with formatting applied.
     */
    (values: any[], handle: number, unencodedValues: number[], tap: boolean, positions: number[]): void;
}

interface Formatter {
    to(val: number): string;
    from(val: string): number;
}

export interface NouisliderProps {
    animate?: boolean;
    behaviour?: string;
    className?: string;
    clickablePips?: boolean;
    connect?: boolean[] | boolean;
    direction?: "ltr" | "rtl";
    disabled?: boolean;
    format?: Formatter;
    keyboardSupport?: boolean;
    id?: string;
    instanceRef?: (instance: React.Ref<any>) => void;
    limit?: number;
    margin?: number;
    onChange?: Callback;
    onEnd?: Callback;
    onSet?: Callback;
    onSlide?: Callback;
    onStart?: Callback;
    onUpdate?: Callback;
    orientation?: "horizontal" | "vertical";
    padding?: number | number[];
    pips?: object;
    range: object;
    snap?: boolean;
    start: number | number[] | string | string[];
    step?: number;
    style?: React.CSSProperties;
    tooltips?: boolean | (boolean | Formatter)[];
}

export default class Nouislider extends React.Component<NouisliderProps> {}
