/// <reference types="react" />
import { ReactGoogleChartPropsWithDefaults } from "./types";
export declare const ContextProvider: ({ children, value }: {
    children: any;
    value: ReactGoogleChartPropsWithDefaults;
}) => JSX.Element;
export declare const ContextConsumer: ({ render }: {
    render: (context: ReactGoogleChartPropsWithDefaults) => JSX.Element | null;
}) => JSX.Element;
