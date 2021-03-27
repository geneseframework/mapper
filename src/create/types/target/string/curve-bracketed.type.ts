import { getBlockInfos, isInsideBlock } from './block.type';
import { Property } from '../../../../shared/types/target/property.type';
import { removeBorders } from '../../../../shared/utils/strings.util';
import { isComma } from './commas.type';
import * as chalk from 'chalk';

export type CurveBracketed = `{${string}}`;

export function isCurveBracketed(text: string): text is CurveBracketed {
    return /^{.*}$/g.test(text);
}


// export function getCurveBracketedBlockInfos(text: string): CurveBracketed[] {
//     return getBlockInfos(text).filter(b => isCurveBracketed(b)) as CurveBracketed[];
// }


export function getPropertiesFromCurveBracketed(text: CurveBracketed): Property[] {
    // const textWithoutBorders: string = removeBorders(text);
    const properties: Property[] = [];
    const propertiesTexts: string[] = getPropertiesTexts(removeBorders(text));
    console.log(chalk.yellowBright('PROPTEXTTTTS'), propertiesTexts);
    for (const propertyText of propertiesTexts) {
        properties.push(getProperty(propertyText));
    }
    return properties;
}


function getPropertiesTexts(text: string): string[] {
    let propertyText = '';
    const propertiesTexts: string[] = [];
    for (let i = 0; i < text.length; i++) {
        const char: string = text.charAt(i);
        if (i === text.length - 1) {
            propertiesTexts.push(`${propertyText}${char}`);
        } else if (!isInsideBlock(i, text) && !isComma(char)) {
            propertyText = `${propertyText}${char}`;
        } else if (isComma(char)) {
            propertiesTexts.push(propertyText);
            propertyText = '';
        }
    }
    return propertiesTexts;
}


function getProperty(propertyText: string): Property {
    return undefined;
}
