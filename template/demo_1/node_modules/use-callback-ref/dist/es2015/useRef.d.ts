import { MutableRefObject } from 'react';
export declare function useCallbackRef<T>(initialValue: T | null, callback: (newValue: T | null, lastValue: T | null) => void): MutableRefObject<T | null>;
