/**
 * Only touch events and mouse events where the left button is pressed should initiate a drag.
 * @param {MouseEvent | TouchEvent} e The event
 */
export declare function eventShouldStartDrag(e: any): boolean;
/**
 * Only touch events and mouse events where the left mouse button is no longer held should end a drag.
 * It's possible the user mouse downs with the left mouse button, then mouse down and ups with the right mouse button.
 * We don't want releasing the right mouse button to end the drag.
 * @param {MouseEvent | TouchEvent} e The event
 */
export declare function eventShouldEndDrag(e: any): boolean;
export declare function isTouchEvent(e: Touch | TouchEvent | MouseEvent): e is TouchEvent;
