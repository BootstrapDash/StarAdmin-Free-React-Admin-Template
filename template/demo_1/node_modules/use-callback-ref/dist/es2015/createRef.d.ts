import { RefObject } from 'react';
export declare function createCallbackRef<T>(callback: (newValue: T | null, lastValue: T | null) => any): RefObject<T>;
