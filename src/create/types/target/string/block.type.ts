import { Containerized, isContainerized } from './containerized.type';
import { isWord, Word } from './word.type';
import * as chalk from 'chalk';
import { isLeftBorder, LeftBorder, oppositeBorder, RightBorder } from './borders.type';

export type Block = Containerized | Word;
export type BlockInfo = {
    block: Block,
    end?: number,
    name?: string,
    start?: number
}

export function isBlock(text: string): text is Block {
    return isContainerized(text) || isWord(text);
}


export function getBlockInfos(text: string): BlockInfo[] {
    // console.log(chalk.cyanBright('GET BBBBLOK INFOS'), text);
    let leftBorder: LeftBorder;
    let openingBorders = 0;
    let startPosition = 0;
    let block = '';
    const blocs: BlockInfo[] = [];
    for (let i = 0; i < text.length; i++) {
        const char: string = text.charAt(i);
        if (isLeftBorder(char) && openingBorders === 0) {
        }
        if (isStartOfBlock(char, openingBorders)) {
            leftBorder = char;
            block = char;
            openingBorders = 1;
            startPosition = i;
        } else if (isEndOfBlock(char, leftBorder, openingBorders)) {
            block = `${block}${char}`;
            const blockInfo: BlockInfo = {
                block: block as Block,
                end: i,
                start: startPosition
            }
            blocs.push(blockInfo);
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
    // console.log(chalk.magentaBright('GET BBBBLOK INFOS END'), blocs);
    return blocs;
}


function isStartOfBlock(char: string, openingBorders: number): char is LeftBorder {
    return isLeftBorder(char) && openingBorders === 0;
}


function isEndOfBlock(char: string, leftBorder: LeftBorder, openingBorders: number): char is RightBorder {
    return char === oppositeBorder(leftBorder) && openingBorders === 1;
}


export function isInsideBlock(position: number, text: string): boolean {
    return undefined;
}
