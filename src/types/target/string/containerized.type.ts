import { Bracketed, isBracketed } from './bracketed.type';
import { isParenthesized, Parenthesized } from './parenthesis.type';

export type Containerized = Bracketed | Parenthesized;

export function isContainerized(text: string): text is Containerized {
    return isBracketed(text) || isParenthesized(text);
}
