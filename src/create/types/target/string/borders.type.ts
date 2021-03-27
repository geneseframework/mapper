import { Containerized } from './containerized.type';
import * as chalk from 'chalk';

export type LeftBorder = '{' | '[' | '(' | '<';
export type RightBorder = '}' | ']' | ')' | '>';
export type Border = LeftBorder | RightBorder;

export function isLeftBorder(text: string): text is LeftBorder {
    return ['{', '[', '(', '<'].includes(text);
}


export function isRightBorder(text: string): text is RightBorder {
    return ['}', ']', ')', '>'].includes(text);
}


export function isBorder(text: string): text is Border {
    return isLeftBorder(text) || isRightBorder(text);
}


export function hasLeftBorder(text: string): boolean {
    return text?.length > 0 && isLeftBorder(text.charAt(0));
}


export function hasRightBorder(text: string): boolean {
    return text?.length > 0 && isRightBorder(text.slice(-1));
}


export function oppositeBorder(char: LeftBorder): RightBorder
export function oppositeBorder(char: RightBorder): LeftBorder
export function oppositeBorder(char: Border): Border {
    if (isLeftBorder(char)) {
        switch (char) {
            case '{':
                return '}';
            case '[':
                return ']';
            case '(':
                return ')';
            case '<':
                return '>';
        }
    } else {
        switch (char) {
            case '}':
                return '{';
            case ']':
                return '[';
            case ')':
                return '(';
            case '>':
                return '<';
        }
    }
}


//
// export function getLeftBorder(char: RightBorder): LeftBorder {
//     switch (char) {
//         case '}':
//             return '{';
//         case ']':
//             return '[';
//         case ')':
//             return '(';
//         case '>':
//             return '<';
//     }
// }


export type HasLeftBorder = `{${string}` |`[${string}` |`(${string}` |`<${string}`;
export type HasRightBorder = `${string}}` |`${string}]` |`${string})` |`${string}>`;


export function getFirstContainer(text: HasLeftBorder): Containerized {
    const leftBorder: LeftBorder = text[0] as LeftBorder;
    let nest = 0;
    for (let i = 0; i < text.length; i++) {
        if (text[i] === leftBorder) {
            nest++;
        }
        if (text[i] === oppositeBorder(leftBorder)) {
            nest--;
        }
        if (nest === 0) {
            return text.slice(0, i) as Containerized;
        }
    }
    return undefined;
}


export function getLastContainer(text: HasRightBorder): Containerized {
    const rightBorder: RightBorder = text[text.length - 1] as RightBorder;
    let nest = 0;
    for (let i = 0; i < text.length; i++) {
        const position = text.length - 1 - i;
        if (text.charAt(position) === rightBorder) {
            nest++;
        }
        if (text.charAt(position) === oppositeBorder(rightBorder)) {
            nest--;
        }
        if (nest === 0) {
            return text.slice(position) as Containerized;
        }
    }
    return undefined;
}


