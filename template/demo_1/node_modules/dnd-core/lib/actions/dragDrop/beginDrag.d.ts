import { Action, DragDropManager, BeginDragPayload, BeginDragOptions } from '../../interfaces';
export default function createBeginDrag(manager: DragDropManager): (sourceIds?: string[], options?: BeginDragOptions) => Action<BeginDragPayload> | undefined;
