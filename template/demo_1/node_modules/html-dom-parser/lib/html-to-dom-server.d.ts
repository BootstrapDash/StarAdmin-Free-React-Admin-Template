// TypeScript Version: 3.3

import { DomHandlerOptions, DomElement } from 'domhandler';

/**
 * Parses HTML string to DOM nodes (server).
 *
 * @remarks
 * This is the same method as `require('htmlparser2').parseDOM`
 * https://github.com/fb55/htmlparser2/blob/v3.9.1/lib/index.js#L39-L43
 *
 * @param - Raw string of HTML to parse.
 * @param - Options to pass to domhandler (See https://github.com/fb55/DomHandler#readme).
 * @returns Parsed DomElements.
 */
export default function parseDOM(html: string, options?: DomHandlerOptions): DomElement[];
