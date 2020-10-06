import * as React from "react";
import { GoogleViz, GoogleChartWrapper, ReactGoogleChartProps, GoogleChartDashboard, ReactGoogleChartPropsWithDefaults } from "../types";
export declare type ChartDrawArgs = {
    data: ReactGoogleChartProps["data"];
};
export declare type GoogleChartDataTableProps = {
    googleChartWrapper: GoogleChartWrapper;
    google: GoogleViz;
    googleChartDashboard: GoogleChartDashboard | null;
};
interface State {
    hiddenColumns: string[];
}
export declare class GoogleChartDataTableInner extends React.Component<ReactGoogleChartPropsWithDefaults & GoogleChartDataTableProps, State> {
    state: State;
    private listenToLegendToggle;
    private applyFormatters;
    private getColumnID;
    private draw;
    private grayOutHiddenColumns;
    private onResize;
    componentDidMount(): void;
    componentWillUnmount(): void;
    componentDidUpdate(): void;
    render(): null;
}
export declare class GoogleChartDataTable extends React.Component<GoogleChartDataTableProps> {
    componentDidMount(): void;
    componentWillUnmount(): void;
    shouldComponentUpdate(): boolean;
    render(): JSX.Element;
}
export {};
