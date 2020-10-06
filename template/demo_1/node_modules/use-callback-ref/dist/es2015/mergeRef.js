import { createCallbackRef } from './createRef';
import { assignRef } from './assignRef';
export function mergeRefs(refs) {
    return createCallbackRef(function (newValue) {
        return refs.forEach(function (ref) { return assignRef(ref, newValue); });
    });
}
