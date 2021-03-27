import { Bracketed, isBracketed } from './bracketed.type';
import { isParenthesized, Parenthesized } from './parenthesis.type';
import { CurveBracketed, isCurveBracketed } from './curve-bracketed.type';
import { isTagged, Tagged } from './tagged.type';
import { isQuoted, Quoted } from '../../../../shared/types/quoted.type';
import { removeBorders } from '../../../../shared/utils/strings.util';

export type Containerized = Bracketed | Parenthesized | CurveBracketed | Tagged | Quoted;

export type rrr = {
    zzz,
    uuu
}

export function isContainerized(text: string): text is Containerized {
    return isBracketed(text) || isParenthesized(text) || isCurveBracketed(text) || isTagged(text) || isQuoted(text);
}


export function getContent(text: Containerized): string {
    return removeBorders(text).trim();
}

