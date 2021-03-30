import {
    CurvedBracketed,
    getPropertiesFromCurvedBracketed
} from '../../create/types/target/string/curve-bracketed.type';
import { Property } from '../../shared/types/target/property.type';
import { haveSameLength } from '../../shared/utils/arrays.util';
import { BlockInfo } from '../../create/types/target/string/block.type';
import * as chalk from 'chalk';


export function replaceBlocksByNames(text: string, blockInfos: BlockInfo[]): string {
    for (const blockInfo of blockInfos) {
        text = text.replace(blockInfo.block, blockInfo.name);
    }
    return text;
}


export function textCorrespondsToProperties(text: CurvedBracketed, properties: Property[]): boolean {
    const textProperties: Property[] = getPropertiesFromCurvedBracketed(text);
    if (text.includes('key:')) {
        console.log(chalk.magentaBright('TEXT PROPPPPS'), text);
        console.log(chalk.magentaBright('TEXT PROPPPPS'), textProperties);
    }
    return haveSameLength(textProperties, properties) && textPropertiesAreIncludedInThisProperties(textProperties, properties);
}


function textPropertiesAreIncludedInThisProperties(textProperties: Property[], properties: Property[]): boolean {
    for (const textProperty of textProperties) {
        if (!textPropertyIsIncludedInThisProperties(textProperty, properties)) {
            return false;
        }
    }
    return true;
}


function textPropertyIsIncludedInThisProperties(textProperty: Property, properties: Property[]): boolean {
    const property: Property = properties.find(p => p.name === textProperty.name);
    if (textProperty.name.includes('key:')) {
        console.log(chalk.yellowBright('TXT INCLUDED IN PROPSSSSS ???'), textProperty);
        console.log(chalk.yellowBright('TXT INCLUDED IN PROPSSSSS ???'), properties);
        console.log(chalk.yellowBright('TXT INCLUDED IN PROPSSSSS ???'), property);
    }
    if (!property) {
        return false;
    } else {
        return textProperty.initializer === property.initializer
            && (textProperty.type === property.type || 'apparentType')
            && textProperty.isRequired === property.isRequired;
    }
}
