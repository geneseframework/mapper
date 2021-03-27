import { Containerized, isContainerized } from './containerized.type';
import { isWord, Word } from './word.type';

export type Block = Containerized | Word;


export function isBlock(text: string): text is Block {
    return isContainerized(text) || isWord(text);
}


export function getBlocks(text: string): Block[] {
    return [];
}
