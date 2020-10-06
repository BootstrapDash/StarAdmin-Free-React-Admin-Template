/**
 * Copyright (c) 2017-present, Ephox, Inc.
 *
 * This source code is licensed under the Apache 2 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { IAllProps } from './components/Editor';
export declare const isFunction: (x: any) => x is Function;
export declare const bindHandlers: (editor: any, props: Partial<IAllProps>, boundHandlers: Record<string, Function>) => void;
export declare const uuid: (prefix: string) => string;
export declare const isTextarea: (element: Element | null) => element is HTMLTextAreaElement;
export declare const mergePlugins: (initPlugins: string | string[], inputPlugins?: string | string[] | undefined) => string[];
