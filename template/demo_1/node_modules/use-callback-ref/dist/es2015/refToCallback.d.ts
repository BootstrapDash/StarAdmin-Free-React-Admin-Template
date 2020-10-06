import { ReactRef, RefCallback } from './types';
export declare function refToCallback<T>(ref: ReactRef<T>): RefCallback<T>;
export declare function useRefToCallback<T>(ref: ReactRef<T>): RefCallback<T>;
