import { Bracketed } from './bracketed.type';
import { Parenthesized } from './parenthesis.type';
import { CurveBracketed } from './curve-bracketed.type';
import { Tagged } from './tagged.type';
import { Quoted } from '../../../../shared/types/quoted.type';
import { removeBorders } from '../../../../shared/utils/strings.util';

export type Containerized = Bracketed | Parenthesized | CurveBracketed | Tagged | Quoted;


export function getContent(text: Containerized): string {
    return removeBorders(text).trim();
}
