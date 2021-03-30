import { Containerized } from './containerized.type';
import { Word } from './word.type';
import { isLeftBorder, LeftBorder, oppositeBorder, RightBorder } from './borders.type';
import * as chalk from 'chalk';

export type Block = Containerized | Word;
export type BlockInfo = {
    block: Block,
    end?: number,
    name?: string,
    start?: number
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


export function isInsideBlocks(position: number, text: string): boolean {
    const blockInfos: BlockInfo[] = getBlockInfos(text);
    return blockInfos.some(b => isInsideBlock(position, b));
}


function isInsideBlock(position: number, blockInfo: BlockInfo): boolean {
    return position >= blockInfo.start && position <= blockInfo.end;
}
