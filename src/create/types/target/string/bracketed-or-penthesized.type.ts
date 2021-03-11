import { Bracketed, isBracketed } from './bracketed.type';
import { isParenthesized, Parenthesized } from './parenthesis.type';

export type BracketedOrParenthesized = Bracketed | Parenthesized;

export function isBracketedOrParenthesized(text: string): text is BracketedOrParenthesized {
    return isBracketed(text) || isParenthesized(text);
}
