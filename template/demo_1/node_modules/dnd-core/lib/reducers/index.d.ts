import { State as DragOffsetState } from './dragOffset';
import { State as DragOperationState } from './dragOperation';
import { State as RefCountState } from './refCount';
import { State as DirtyHandlerIdsState } from './dirtyHandlerIds';
import { State as StateIdState } from './stateId';
export interface State {
    dirtyHandlerIds: DirtyHandlerIdsState;
    dragOffset: DragOffsetState;
    refCount: RefCountState;
    dragOperation: DragOperationState;
    stateId: StateIdState;
}
export default function reduce(state: State | undefined, action: any): {
    dirtyHandlerIds: string[];
    dragOffset: DragOffsetState;
    refCount: number;
    dragOperation: DragOperationState;
    stateId: number;
};
