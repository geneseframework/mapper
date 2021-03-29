import { getBlockInfos, isInsideBlocks } from './block.type';
import { Property } from '../../../../shared/types/target/property.type';
import { removeBorders } from '../../../../shared/utils/strings.util';
import { isComma } from './commas.type';
import { firstWord } from './word.type';

export type CurvedBracketed = `{${string}}`;

export type CurvedBracketedBlockInfo = {
    block: CurvedBracketed,
    end: number,
    start: number
}


export function isCurvedBracketed(text: string): text is CurvedBracketed {
    return /^{.*}$/g.test(text);
}


export function getPropertiesFromCurvedBracketed(text: CurvedBracketed): Property[] {
    const properties: Property[] = [];
    const propertiesTexts: string[] = getPropertiesTexts(removeBorders(text));
    for (const propertyText of propertiesTexts) {
        properties.push(getProperty(propertyText));
    }
    return properties;
}


function getPropertiesTexts(text: string): string[] {
    let propertyText = '';
    const propertiesTexts: string[] = [];
    let rest = text;
    for (let i = 0; i < rest.length; i++) {
        const char: string = rest.charAt(i);
        if (i === rest.length - 1) {
            propertiesTexts.push(`${propertyText}${char}`);
        } else if (isInsideBlocks(i, text)) {
            propertyText = `${propertyText}${char}`;
        } else if (isComma(char)) {
            propertiesTexts.push(propertyText);
            propertyText = '';
            rest = rest.slice(propertyText.length + 1).trim();
        } else {
            propertyText = `${propertyText}${char}`;
        }
    }
    return propertiesTexts;
}


function getProperty(propertyText: string): Property {
    let rest: string = propertyText;
    const property: Property = {};
    rest = setNameAndReturnRest(rest, property);
    rest = setIsRequiredAndReturnRest(rest, property);
    rest = setTypeAndReturnRest(rest, property);
    setInitializer(rest, property);
    return property;
}


function setNameAndReturnRest(rest: string, property: Property): string {
    property.name = firstWord(rest);
    return rest.slice(property.name.length).trim();
}


function setIsRequiredAndReturnRest(rest: string, property: Property): string {
    property.isRequired = rest.charAt(0) !== '?';
    return property.isRequired ? rest: rest.slice(1);
}


function setTypeAndReturnRest(rest: string, property: Property): string {
    const split: string[] = rest.split('=');
    const beforeEqual: string = split[0] ?? '';
    const afterEqual: string = split[1] ?? '';
    if (beforeEqual.charAt(0) === ':') {
        property.type = beforeEqual.slice(1).trim();
    } else {
        property.type = afterEqual ? 'apparentType' : undefined;
    }
    return afterEqual.trim();
}


function setInitializer(rest: string, property: Property): void {
    property.initializer = rest || undefined;
}


export function getCurvedBracketedBlockInfos(text: string): CurvedBracketedBlockInfo[] {
    return getBlockInfos(text).filter(b => isCurvedBracketed(b.block)) as CurvedBracketedBlockInfo[];
}
