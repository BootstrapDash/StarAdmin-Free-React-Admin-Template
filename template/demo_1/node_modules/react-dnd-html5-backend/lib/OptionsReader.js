export class OptionsReader {
    constructor(globalContext) {
        this.globalContext = globalContext;
    }
    get window() {
        if (this.globalContext) {
            return this.globalContext;
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
