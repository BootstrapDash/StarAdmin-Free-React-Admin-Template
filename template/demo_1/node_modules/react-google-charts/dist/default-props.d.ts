import { GoogleDataTableCell, GoogleDataTableColumn, ReactGoogleChartEvent, GoogleChartAction, GoogleChartWrapper, GoogleViz, GoogleChartControlProp, ReactGoogleChartDashboardRender, GoogleChartEditor } from "./types";
export declare const chartDefaultProps: {
    graph_id: string | null;
    legend_toggle: boolean;
    graphID: string | null;
    options: Partial<{
        [otherOptionKey: string]: any;
        width: number;
        height: number;
        is3D: boolean;
        title: string;
        backgroundColor: string;
        hAxis?: {
            [otherOptionKey: string]: any;
            minValue?: any;
            maxValue?: any;
            ticks?: number[] | undefined;
            title?: string | undefined;
            viewWindow?: {
                max?: any;
                min?: any;
            } | undefined;
        } | undefined;
        vAxis?: {
            [otherOptionKey: string]: any;
            minValue?: any;
            maxValue?: any;
            ticks?: number[] | undefined;
            title?: string | undefined;
            viewWindow?: {
                max?: any;
                min?: any;
            } | undefined;
        } | undefined;
        legend: any;
        colors: string[];
    }>;
    data: null;
    rows: GoogleDataTableCell[][] | null;
    columns: GoogleDataTableColumn[] | null;
    diffdata: {
        old: any;
        new: any;
    } | null;
    chartEvents: ReactGoogleChartEvent[] | null;
    legendToggle: boolean;
    chartActions: GoogleChartAction[] | null;
    getChartWrapper: (chartWrapper: GoogleChartWrapper, google: GoogleViz) => void;
    getChartEditor: ((args: {
        chartEditor: GoogleChartEditor;
        chartWrapper: GoogleChartWrapper;
        google: GoogleViz;
    }) => void) | null;
    className: string;
    style: {};
    formatters: null;
    spreadSheetUrl: null;
    spreadSheetQueryParameters: {
        headers: number;
        gid: number;
    };
    rootProps: {};
    chartWrapperParams: {};
    controls: GoogleChartControlProp[] | null;
    render: ReactGoogleChartDashboardRender | null;
    toolbarItems: null;
    toolbarID: null;
};
