import { Bracketed, isBracketed } from './bracketed.type';
import { isParenthesized, Parenthesized } from './parenthesis.type';
import { CurvedBracketed, isCurvedBracketed } from './curve-bracketed.type';
import { isQuoted, Quoted } from '../../../shared/types/quoted.type';
import { removeBorders } from '../../../shared/utils/strings.util';
import { isTagged, Tagged } from './tagged.type';

/**
 * Texts surrounded by {}, (), <> or []
 */
export type Containerized = Bracketed | Parenthesized | CurvedBracketed | Tagged | Quoted;

/**
 * Checks if a text is surrounded by {}, (), <> or []
 * @param text      // The text to check
 */
export function isContainerized(text: string): text is Containerized {
    return isBracketed(text) || isParenthesized(text) || isCurvedBracketed(text) || isTagged(text) || isQuoted(text);
}

/**
 * Returns the content of a given container
 * @param text
 */
export function getContent(text: Containerized): string {
    return removeBorders(text).trim();
}

