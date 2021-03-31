import { Containerized } from './containerized.type';
import { Word } from './word.type';
import { isLeftBorder, LeftBorder, oppositeBorder, RightBorder } from './borders.type';

export type Block = Containerized | Word;   // Elements like words or strings surrounded by {}, () or [] which are not included inside other strings surrounded by {}, () or []. Blocks are the ancestor elements of a stringified target.
export type BlockInfo = {                   // Information about blocks
    block: Block,
    end?: number,
    name?: string,
    start?: number
}

/**
 * Returns the blocks included in a given text with their information
 * @param text
 */
export function getBlockInfos(text: string): BlockInfo[] {
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
    return blocs;
}

/**
 * Checks if a char is the first char of a block
 * @param char              // The char to check
 * @param openingBorders    // The number of non-closed borders
 */
function isStartOfBlock(char: string, openingBorders: number): char is LeftBorder {
    return isLeftBorder(char) && openingBorders === 0;
}

/**
 * Checks if a char is the last char of a block
 * @param char              // The char to check
 * @param leftBorder        // The type of border of the current block
 * @param openingBorders    // The number of non-closed borders
 */
function isEndOfBlock(char: string, leftBorder: LeftBorder, openingBorders: number): char is RightBorder {
    return char === oppositeBorder(leftBorder) && openingBorders === 1;
}

/**
 * Checks if a position is inside one of the blocks of a given text
 * @param position  // The checked position
 * @param text      // The checked text
 */
export function isInsideBlocks(position: number, text: string): boolean {
    const blockInfos: BlockInfo[] = getBlockInfos(text);
    return blockInfos.some(b => isInsideBlock(position, b));
}

/**
 * Checks if a position is inside a given block
 * @param position      // The checked position
 * @param blockInfo     // The info of the given block
 */
function isInsideBlock(position: number, blockInfo: BlockInfo): boolean {
    return position >= blockInfo.start && position <= blockInfo.end;
}
