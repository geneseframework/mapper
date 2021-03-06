import { Bracketed, isBracketed } from './bracketed.type';
import { isParenthesized, Parenthesized } from './parenthesis.type';
import { CurveBracketed, isCurveBracketed } from './curve-bracketed.type';
import { isTagged, Tagged } from './tagged.type';
import { isQuoted, Quoted } from './quoted.type';

export type Containerized = Bracketed | Parenthesized | CurveBracketed | Tagged | Quoted;

export function isContainerized(text: string): text is Containerized {
    return isBracketed(text) || isParenthesized(text) || isCurveBracketed(text) || isTagged(text) || isQuoted(text);
}


export function getContent(text: Containerized): string {
    return removeBorders(text).trim();
}


export function removeBorders(text: string): string {
    return text.slice(1, -1);
}
