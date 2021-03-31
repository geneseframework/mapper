import { Bracketed, isBracketed } from './bracketed.type';
import { isParenthesized, Parenthesized } from './parenthesis.type';
import { getContent } from './containerized.type';
import { getElements } from '../../utils/target.util';

/**
 * Texts surrounded by brackets or parenthesis
 */
export type BracketedOrParenthesized = Bracketed | Parenthesized;

/**
 * Checks if a text is surrounded by brackets or parenthesis
 * @param text
 */
export function isBracketedOrParenthesized(text: string): text is BracketedOrParenthesized {
    return isBracketed(text) || isParenthesized(text);
}

/**
 * Returns the elements inside a text surrounded by parentheses or brackets
 * @param text
 */
export function getContainerizedElements(text: BracketedOrParenthesized): string[] {
    const insideContainer = text.slice(1, -1).trim();
    return getContent(text) ? getElements(insideContainer) : [];
}
