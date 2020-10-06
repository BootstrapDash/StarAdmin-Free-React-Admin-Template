import * as React from "react";
import { GoogleViz, GoogleChartWrapper, ReactGoogleChartProps, ReactGoogleChartPropsWithDefaults } from "../types";
export declare type ChartDrawArgs = {
    data: ReactGoogleChartProps["data"];
};
export interface Props {
    googleChartWrapper: GoogleChartWrapper;
    google: GoogleViz;
    chartActions: ReactGoogleChartPropsWithDefaults["chartActions"];
}
export declare class GoogleChartActionsInner extends React.Component<Props> {
    componentDidMount(): void;
    componentDidUpdate(prevProps: Props): void;
    shouldComponentUpdate(): boolean;
    private setChartActions;
    render(): null;
}
export declare class GoogleChartActions extends React.Component<Props> {
    render(): JSX.Element;
}
