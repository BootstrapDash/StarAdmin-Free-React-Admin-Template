import * as React from 'react';
import { ReactRef } from './types';
export declare function mergeRefs<T>(refs: ReactRef<T>[]): React.MutableRefObject<T | null>;
