export class OptionsReader {
    constructor(incoming, context) {
        this.enableTouchEvents = true;
        this.enableMouseEvents = false;
        this.enableKeyboardEvents = false;
        this.ignoreContextMenu = false;
        this.enableHoverOutsideTarget = false;
        this.touchSlop = 0;
        this.scrollAngleRanges = undefined;
        this.context = context;
        this.delayTouchStart = incoming.delayTouchStart || incoming.delay || 0;
        this.delayMouseStart = incoming.delayMouseStart || incoming.delay || 0;
        Object.keys(incoming).forEach(key => {
            if (incoming[key] != null) {
                ;
                this[key] = incoming[key];
            }
        });
    }
    get window() {
        if (this.context && this.context.window) {
            return this.context.window;
        }
        else if (typeof window !== 'undefined') {
            return window;
        }
        return undefined;
    }
    get document() {
        if (this.window) {
            return this.window.document;
        }
        return undefined;
    }
}
