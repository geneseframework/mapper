import { Bracketed, isBracketed } from './bracketed.type';
import { isParenthesized, Parenthesized } from './parenthesis.type';

export type Containerized = Bracketed | Parenthesized;

export function isContainerized(text: string): text is Containerized {
    return isBracketed(text) || isParenthesized(text);
}

export function isNotEmptyContainer(text: string): text is Containerized {
    return isContainerized(text) && text.length > 2;
}


export function content(container: Containerized): string {
    return container.slice(1, -1);
}
