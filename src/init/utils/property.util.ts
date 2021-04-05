import {
    CurvedBracketed,
    getPropertiesFromCurvedBracketed
} from '../../create/types/containers/curve-bracketed.type';
import { Property } from '../../shared/models/property.model';
import { BlockInfo } from '../../create/types/containers/block.type';
import { haveSameLength } from '@genese/core';


export function requiredProperties(properties: Property[]): Property[] {
    return properties.filter(p => isRequired(p));
}


export function isRequired(property: Property): boolean {
    return !property.hasQuestionToken && !property.initializer;
}

/**
 * Returns some text by replacing its curved bracketed blocks by their name (ie: the name of the InterfaceInfo corresponding to these blocks)
 * @param text          // The text to update
 * @param blockInfos    // The array of info of curved bracketed blocks included in the given text
 */
export function replaceBlocksByNames(text: string, blockInfos: BlockInfo[]): string {
    for (const blockInfo of blockInfos) {
        text = text.replace(blockInfo.block, blockInfo.name);
    }
    return text;
}

/**
 * Checks if a text surrounded by curved brackets corresponds to a given array or Property
 * @param text          // The text to analyze
 * @param properties    // The properties to compare with
 */
export function textCorrespondsToProperties(text: CurvedBracketed, properties: Property[]): boolean {
    const textProperties: Property[] = getPropertiesFromCurvedBracketed(text);
    return haveSameLength(textProperties, properties) && textPropertiesAreIncludedInThisProperties(textProperties, properties);
}

/**
 * Checks if the stringified properties written in a given text surrounded by curve brackets correspond to some array of Property
 * @param textProperties    // The stringified properties
 * @param properties        // The Property array to compare with
 */
function textPropertiesAreIncludedInThisProperties(textProperties: Property[], properties: Property[]): boolean {
    for (const textProperty of textProperties) {
        if (!textPropertyIsIncludedInThisProperties(textProperty, properties)) {
            return false;
        }
    }
    return true;
}

/**
 * Checks if a stringified property written in a given text surrounded by curve brackets corresponds to some array of Property
 * @param textProperty    // The stringified property
 * @param properties        // The Property array to compare with
 */
function textPropertyIsIncludedInThisProperties(textProperty: Property, properties: Property[]): boolean {
    const property: Property = properties.find(p => p.name === textProperty.name);
    if (!property) {
        return false;
    } else {
        return textProperty.initializer === property.initializer
            && (textProperty.stringifiedType === property.stringifiedType || 'apparentType')
            && textProperty.hasQuestionToken === property.hasQuestionToken;
    }
}
