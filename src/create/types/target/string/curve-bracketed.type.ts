import { getBlocks } from './block.type';

export type CurveBracketed = `{${string}}`;

export function isCurveBracketed(text: string): text is CurveBracketed {
    return /^{.*}$/g.test(text);
}


export function getCurveBracketedBlocs(text: string): CurveBracketed[] {
    return getBlocks(text).filter(b => isCurveBracketed(b)) as CurveBracketed[];
}
