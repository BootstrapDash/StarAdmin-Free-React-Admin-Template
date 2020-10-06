import { Action } from '../interfaces';
export declare type State = string[];
export interface DirtyHandlerIdPayload {
    targetIds: string[];
    prevTargetIds: string[];
}
export default function dirtyHandlerIds(state: State | undefined, action: Action<DirtyHandlerIdPayload>): string[];
