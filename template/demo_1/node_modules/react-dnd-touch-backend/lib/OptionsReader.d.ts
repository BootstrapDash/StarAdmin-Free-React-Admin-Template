import { TouchBackendOptions, AngleRange } from './interfaces';
export declare class OptionsReader implements TouchBackendOptions {
    enableTouchEvents: boolean;
    enableMouseEvents: boolean;
    enableKeyboardEvents: boolean;
    ignoreContextMenu: boolean;
    enableHoverOutsideTarget: boolean;
    touchSlop: number;
    scrollAngleRanges: AngleRange[] | undefined;
    delayTouchStart: number;
    delayMouseStart: number;
    getDropTargetElementsAtPoint?: Function;
    private context;
    constructor(incoming: TouchBackendOptions, context?: any);
    get window(): any;
    get document(): any;
}
