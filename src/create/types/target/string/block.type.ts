import { Containerized, isContainerized } from './containerized.type';
import { isWord, Word } from './word.type';
import * as chalk from 'chalk';
import { isLeftBorder, LeftBorder, oppositeBorder, RightBorder } from './borders.type';

export type Block = Containerized | Word;


export function isBlock(text: string): text is Block {
    return isContainerized(text) || isWord(text);
}


export function getBlocks(text: string): Block[] {
    console.log(chalk.cyanBright('GET CBBBB'), text);
    let leftBorder: LeftBorder;
    let openingBorders = 0;
    let block = '';
    const blocs: Block[] = [];
    for (let i = 0; i < text.length; i++) {
        const char: string = text.charAt(i);
        if (isLeftBorder(char) && openingBorders === 0) {
        }
        if (isStartOfBlock(char, openingBorders)) {
            leftBorder = char;
            block = char;
            openingBorders = 1;
        } else if (isEndOfBlock(char, leftBorder, openingBorders)) {
            block = `${block}${char}`;
            blocs.push(block as Block);
            leftBorder = undefined;
            openingBorders = 0;
        } else if (openingBorders > 0) {
            block = `${block}${char}`;
            if (char === leftBorder) {
                openingBorders++;
            } else if (char === oppositeBorder(leftBorder)) {
                openingBorders--;
            }
        }
    }
    console.log(chalk.magentaBright('GET CBBBB BLOCSSSSS'), blocs);
    return blocs;
}


function isStartOfBlock(char: string, openingBorders: number): char is LeftBorder {
    return isLeftBorder(char) && openingBorders === 0;
}


function isEndOfBlock(char: string, leftBorder: LeftBorder, openingBorders: number): char is RightBorder {
    return char === oppositeBorder(leftBorder) && openingBorders === 1;
}
