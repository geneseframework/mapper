import { Bracketed } from './bracketed.type';
import { Parenthesized } from './parenthesis.type';
import { CurveBracketed } from './curve-bracketed.type';
import { Tagged } from './tagged.type';
import { Quoted } from '../../../../shared/types/quoted.type';

export type Containerized = Bracketed | Parenthesized | CurveBracketed | Tagged | Quoted;


export function getContent(text: Containerized): string {
    return removeBorders(text).trim();
}


export function removeBorders(text: string): string {
    return text.slice(1, -1);
}
