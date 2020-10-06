import * as React from "react";
import { GoogleViz, GoogleChartWrapper, ReactGoogleChartProps, ReactGoogleChartEvent } from "../types";
export declare type ChartDrawArgs = {
    data: ReactGoogleChartProps["data"];
};
export interface Props {
    googleChartWrapper: GoogleChartWrapper;
    google: GoogleViz;
}
export interface ListenToEventsArgs {
    googleChartWrapper: GoogleChartWrapper;
    google: GoogleViz;
    chartEvents: ReactGoogleChartEvent[] | null;
}
export declare class GoogleChartEvents extends React.Component<Props> {
    shouldComponentUpdate(): boolean;
    listenToEvents({ chartEvents, google, googleChartWrapper }: ListenToEventsArgs): void;
    render(): JSX.Element;
}
