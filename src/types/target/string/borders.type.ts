import { Containerized } from './containerized.type';
import * as chalk from 'chalk';

export type LeftBorder = '{' | '[' | '(' | '<';
export function isLeftBorder(text: string): text is LeftBorder {
    return ['{', '[', '(', '<'].includes(text);
}

export type RightBorder = '}' | ']' | ')' | '>';
export function isRightBorder(text: string): text is RightBorder {
    return ['}', ']', ')', '>'].includes(text);
}


export function getRightBorder(char: LeftBorder): RightBorder {
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
}



export function getLeftBorder(char: RightBorder): LeftBorder {
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


export type HasLeftBorder = `{${string}` |`[${string}` |`(${string}` |`<${string}`;
export type HasRightBorder = `${string}}` |`${string}]` |`${string})` |`${string}>`;


export function getContainerFromLeft(text: HasLeftBorder): Containerized {
    const leftBorder: LeftBorder = text[0] as LeftBorder;
    let nest = 0;
    for (let i = 0; i < text.length; i++) {
        if (text[i] === leftBorder) {
            nest++;
        }
        if (text[i] === getRightBorder(leftBorder)) {
            nest--;
        }
        if (nest === 0) {
            return text.slice(0, i) as Containerized;
        }
    }
    return undefined;
}


export function getContainerFromRight(text: HasRightBorder): Containerized {
    const rightBorder: RightBorder = text[text.length - 1] as RightBorder;
    let nest = 0;
    for (let i = 0; i < text.length; i++) {
        const position = text.length - 1 - i;
        if (text.charAt(position) === rightBorder) {
            nest++;
        }
        if (text.charAt(position) === getLeftBorder(rightBorder)) {
            nest--;
        }
        if (nest === 0) {
            return text.slice(position) as Containerized;
        }
    }
    return undefined;
}


