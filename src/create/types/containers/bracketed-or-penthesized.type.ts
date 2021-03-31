import { Bracketed, isBracketed } from './bracketed.type';
import { isParenthesized, Parenthesized } from './parenthesis.type';

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
