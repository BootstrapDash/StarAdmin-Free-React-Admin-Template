import { Chain } from '@ephox/agar';
import { EventHandler } from 'src/main/ts/Events';
interface EventHandlerArgs<T> {
    editorEvent: T;
    editor: any;
}
declare type EventHandlerState = EventHandlerArgs<any>[];
declare const EventStore: () => {
    cEach: (name: string, assertState: (state: EventHandlerState) => void) => Chain<any, any>;
    createHandler: <T = any>(name: string) => EventHandler<T>;
    cClearState: Chain<unknown, unknown>;
};
export { EventStore };
