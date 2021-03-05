import { Containerized } from './containerized.type';

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


export type HasLeftBorder = `{${string}` |`[{]${string}` |`(${string}` |`<${string}`;


export function getContainer(text: HasLeftBorder): Containerized {
    const leftBorder: LeftBorder = text[0] as LeftBorder;
    let nest = 0;
    for (let i = 0; i < text.length; i++) {
        if (text[i] === leftBorder) {
            nest++;
        }
        if (text[i] === getRightBorder(leftBorder)) {
            nest--;
        }
        // TODO
    }
    return
}


