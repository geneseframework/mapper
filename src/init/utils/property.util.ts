import {
    CurvedBracketed,
    getPropertiesFromCurvedBracketed
} from '../../create/types/target/string/curve-bracketed.type';
import * as chalk from 'chalk';
import { Property } from '../../shared/types/target/property.type';
import { haveSameLength } from '../../shared/utils/arrays.util';
import { BlockInfo } from '../../create/types/target/string/block.type';


export function replaceBlocksByNames(text: string, blockInfos: BlockInfo[]): string {

}

export function textCorrespondsToProperties(text: CurvedBracketed, properties: Property[]): boolean {
    console.log(chalk.blueBright('CTOOOO text'), text);
    console.log(chalk.blueBright('CTOOOO properties'), properties);
    const textProperties: Property[] = getPropertiesFromCurvedBracketed(text);
    console.log(chalk.blueBright('CTOOOO text properties'), textProperties);
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
    if (!property) {
        return false;
    } else {
        return textProperty.initializer === property.initializer
            && (textProperty.type === property.type || 'apparentType')
            && textProperty.isRequired === property.isRequired;
    }
}
