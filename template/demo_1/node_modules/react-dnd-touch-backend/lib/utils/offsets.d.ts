import { XYCoord } from 'dnd-core';
export declare function getNodeClientOffset(node: any): XYCoord | undefined;
export declare function getEventClientTouchOffset(e: TouchEvent): XYCoord | undefined;
export declare function getEventClientOffset(e: TouchEvent | Touch | MouseEvent): XYCoord | undefined;
