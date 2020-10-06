// TypeScript Version: 3.3

import { DomElement } from 'domhandler';

/**
 * Formats DOM attributes to a hash map.
 *
 * @param attributes - The list of attributes to format.
 * @returns - A map of attribute name to value.
 */
export function formatAttributes(attributes: NamedNodeMap): {[name: string]: string};

/**
 * Formats the browser DOM nodes to mimic the output of `htmlparser2.parseDOM()`.
 *
 * @param nodes - The DOM nodes to format.
 * @param parentObj - The formatted parent node of the given DOM nodes.
 * @param directive - The directive.
 */
export function formatDOM(nodes: NodeList, parentObj?: DomElement, directive?: string): DomElement[];

/**
 * Detects IE with or without version.
 *
 * @param version - The IE version to detect.
 * @returns - Whether IE or the version has been detected.
 */
export function isIE(version?: number): boolean;
