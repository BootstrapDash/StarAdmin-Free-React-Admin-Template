import * as React from "react";
import { GoogleViz, GoogleChartWrapper, ReactGoogleChartPropsWithDefaults, GoogleChartControlProp, GoogleChartControl, GoogleChartDashboard, GoogleChartEditor } from "../types";
export declare type Props = {
    google: GoogleViz;
    graphID?: string | null;
    graph_id?: string | null;
    options?: ReactGoogleChartPropsWithDefaults["options"];
    chartWrapperParams?: {};
    chartType: ReactGoogleChartPropsWithDefaults["chartType"];
    width?: ReactGoogleChartPropsWithDefaults["width"];
    height?: ReactGoogleChartPropsWithDefaults["height"];
    style?: ReactGoogleChartPropsWithDefaults["style"];
    className?: ReactGoogleChartPropsWithDefaults["className"];
    rootProps?: ReactGoogleChartPropsWithDefaults["rootProps"];
} & ReactGoogleChartPropsWithDefaults;
export interface State {
    googleChartWrapper: GoogleChartWrapper | null;
    isReady: boolean;
    googleChartDashboard: GoogleChartDashboard | null;
    googleChartEditor: GoogleChartEditor | null;
    googleChartControls: {
        control: GoogleChartControl;
        controlProp: GoogleChartControlProp;
    }[] | null;
}
export declare class GoogleChart extends React.Component<Props, State> {
    state: State;
    graphID: null | string;
    private dashboard_ref;
    private toolbar_ref;
    private getGraphID;
    private getControlID;
    addControls: (googleChartWrapper: GoogleChartWrapper, googleChartDashboard: GoogleChartDashboard) => {
        controlProp: GoogleChartControlProp;
        control: any;
    }[] | null;
    componentDidMount(): void;
    componentDidUpdate(): void;
    shouldComponentUpdate(nextProps: Props, nextState: State): boolean;
    renderChart: () => JSX.Element;
    renderControl: (filter?: ({ control, controlProp }: {
        control: GoogleChartControl;
        controlProp: GoogleChartControlProp;
    }) => boolean) => JSX.Element | null;
    renderToolBar: () => JSX.Element | null;
    render(): JSX.Element;
}
