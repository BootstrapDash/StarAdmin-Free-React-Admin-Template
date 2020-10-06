import * as React from "react";
export declare type ReactGoogleChartsLoaderProps = {
    onError: Function;
    onLoad: Function;
};
export declare class ReactGoogleChartsLoader extends React.Component<ReactGoogleChartsLoaderProps> {
    loadScript: boolean;
    constructor(props: ReactGoogleChartsLoaderProps);
    componentDidMount(): void;
    render(): JSX.Element | null;
}
