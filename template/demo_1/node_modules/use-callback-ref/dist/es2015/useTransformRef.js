import { useCallbackRef } from './useRef';
import { assignRef } from './assignRef';
export function useTransformRef(ref, transformer) {
    return useCallbackRef(undefined, function (value) {
        return assignRef(ref, transformer(value));
    });
}
