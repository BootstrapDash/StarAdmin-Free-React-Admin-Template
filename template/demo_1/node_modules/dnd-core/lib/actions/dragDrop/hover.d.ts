import { Action, DragDropManager, HoverPayload, HoverOptions } from '../../interfaces';
export default function createHover(manager: DragDropManager): (targetIdsArg: string[], { clientOffset }?: HoverOptions) => Action<HoverPayload>;
