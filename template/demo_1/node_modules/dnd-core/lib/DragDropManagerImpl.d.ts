import { Backend, DragDropActions, DragDropMonitor, DragDropManager, HandlerRegistry } from './interfaces';
export default class DragDropManagerImpl implements DragDropManager {
    private store;
    private monitor;
    private backend;
    private isSetUp;
    constructor(debugMode?: boolean);
    receiveBackend(backend: Backend): void;
    getMonitor(): DragDropMonitor;
    getBackend(): Backend;
    getRegistry(): HandlerRegistry;
    getActions(): DragDropActions;
    dispatch(action: any): void;
    private handleRefCountChange;
}
