import { getBlockInfos, isInsideBlocks } from './block.type';
import { Property } from '../../../shared/types/target/property.type';
import { removeBorders } from '../../../shared/utils/strings.util';
import { isComma } from '../separators/commas.type';
import { getIndexableTypeFromIndexableKey, startsWithIndexableKey } from '../properties/indexable-key.type';
import { getFirstBracketed } from './bracketed.type';
import { IndexableType } from '../../../shared/types/indexable-type.type';
import { firstWord } from '../others/word.type';

/**
 * Texts surrounded by curved brackets
 */
export type CurvedBracketed = `{${string}}`;

/**
 * Info corresponding to a CurvedBracketed
 */
export type CurvedBracketedBlockInfo = {
    block: CurvedBracketed,
    end: number,
    start: number
}

/**
 * Checks if a text is surrounded by curved brackets
 * @param text
 */
export function isCurvedBracketed(text: string): text is CurvedBracketed {
    return /^{.*}$/g.test(text);
}

/**
 * Returns the Property array corresponding to the eventual properties of the object defined with a text surrounded by curved brackets
 * @param text
 */
export function getPropertiesFromCurvedBracketed(text: CurvedBracketed): Property[] {
    const properties: Property[] = [];
    const propertiesTexts: string[] = getPropertiesTexts(removeBorders(text));
    for (const propertyText of propertiesTexts) {
        if (!startsWithIndexableKey(propertyText)) {
            properties.push(getProperty(propertyText));
        }
    }
    return properties;
}

/**
 * Returns the eventual indexable type of the object defined with a text surrounded by curved brackets
 * @param text
 */
export function getIndexableTypeFromCurvedBracketed(text: CurvedBracketed): IndexableType {
    const propertiesTexts: string[] = getPropertiesTexts(removeBorders(text));
    for (const propertyText of propertiesTexts) {
        if (startsWithIndexableKey(propertyText)) {
            return getIndexableTypeFromIndexableKey(propertyText);
        }
    }
    return undefined;
}

/**
 * Returns the array of strings corresponding to the content of a curved bracketed string
 * @param text      // The content of a text surrounded by curved brackets
 */
function getPropertiesTexts(text: string): string[] {
    let propertyText = '';
    const propertiesTexts: string[] = [];
    let rest = text.trim();
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

/**
 * Returns the Property object corresponding to a text representing a property
 * @param propertyText
 */
function getProperty(propertyText: string): Property {
    let rest: string = propertyText;
    const property: Property = {};
    rest = setNameAndReturnRest(rest, property);
    rest = setIsRequiredAndReturnRest(rest, property);
    rest = setTypeAndReturnRest(rest, property);
    setInitializer(rest, property);
    return property;
}

/**
 * Sets the name of a Property object from a text representing a property and returns this text without the name
 * @param rest          // The text representing a property
 * @param property      // The Property to update
 */
function setNameAndReturnRest(rest: string, property: Property): string {
    property.name = startsWithIndexableKey(rest) ? getFirstBracketed(rest) : firstWord(rest);
    return rest.slice(property.name.length).trim();
}

/**
 * Sets the isRequired value of a Property object from a text representing a property without its name and returns this text without the question mark
 * @param rest          // The text representing a property without its name
 * @param property      // The Property to update
 */
function setIsRequiredAndReturnRest(rest: string, property: Property): string {
    property.isRequired = rest.charAt(0) !== '?';
    return property.isRequired ? rest: rest.slice(1);
}

/**
 * Sets the type of a Property object from a text representing a property without its name and its question mark and returns this text without the type
 * @param rest          // The text representing a property without its name and its question mark
 * @param property      // The Property to update
 */
function setTypeAndReturnRest(rest: string, property: Property): string {
    const split: string[] = rest.split('=');
    const beforeEqual: string = split[0] ?? '';
    const afterEqual: string = split[1] ?? '';
    if (beforeEqual.charAt(0) === ':') {
        property.stringifiedType = beforeEqual.slice(1).trim();
    } else {
        property.stringifiedType = afterEqual ? 'apparentType' : undefined;
    }
    return afterEqual.trim();
}

/**
 * Sets the type of a Property object from a text representing a property without its name, its question mark and its type and returns this text without the type
 * @param rest          // The text representing a property without its name and its question mark and its type
 * @param property      // The Property to update
 */
function setInitializer(rest: string, property: Property): void {
    property.initializer = rest || undefined;
}

/**
 * Returns the array of info about the blocks a given text which are surrounded by curved brackets
 * @param text          // The text to analyze
 */
export function getCurvedBracketedBlockInfos(text: string): CurvedBracketedBlockInfo[] {
    return getBlockInfos(text).filter(b => isCurvedBracketed(b.block)) as CurvedBracketedBlockInfo[];
}
