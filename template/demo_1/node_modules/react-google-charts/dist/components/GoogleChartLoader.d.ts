import * as React from "react";
import { GoogleViz, ReactGoogleChartProps } from "../types";
export interface Props {
    chartVersion: ReactGoogleChartProps["chartVersion"];
    chartPackages: ReactGoogleChartProps["chartPackages"];
    chartLanguage: ReactGoogleChartProps["chartLanguage"];
    mapsApiKey: ReactGoogleChartProps["mapsApiKey"];
    onLoad: (google: GoogleViz) => void;
    onError: () => void;
}
export declare class GoogleChartLoader extends React.Component<Props> {
    private handleGoogleChartsLoaderScriptLoaded;
    shouldComponentUpdate(nextProps: Props): boolean;
    render(): JSX.Element;
}
