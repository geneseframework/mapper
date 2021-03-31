import { Containerized } from './containerized.type';
import * as chalk from 'chalk';

export type LeftBorder = '{' | '[' | '(' | '<';     // The possible left borders of some containerized text
export type RightBorder = '}' | ']' | ')' | '>';    // The possible right borders of some containerized text
export type Border = LeftBorder | RightBorder;      // The possible borders of some containerized text

/**
 * Checks if a char is a left border
 * @param char
 */
export function isLeftBorder(char: string): char is LeftBorder {
    return ['{', '[', '(', '<'].includes(char);
}

/**
 * Checks if a char is a right border
 * @param char
 */
export function isRightBorder(char: string): char is RightBorder {
    return ['}', ']', ')', '>'].includes(char);
}

/**
 * Returns the opposite char of a given border char
 * @param char
 */
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

/**
 * Texts ending with a right border
 */
export type HasRightBorder = `${string}}` |`${string}]` |`${string})` |`${string}>`;

/**
 * Returns the last container of a text ending by a right border
 * @param text
 */
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


