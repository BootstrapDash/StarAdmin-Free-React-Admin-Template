import * as React from 'react';
import { ReactRef } from './types';
export declare function useMergeRefs<T>(refs: ReactRef<T>[], defaultValue?: T): React.MutableRefObject<T | null>;
