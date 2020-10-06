import { GoogleViz } from "./types";
export declare const loadDataTableFromSpreadSheet: (googleViz: GoogleViz, spreadSheetUrl: string, urlParams?: {
    headers?: number | undefined;
    gid?: any;
    sheet?: string | undefined;
    query?: string | undefined;
    access_token?: string | undefined;
}) => Promise<{}>;
