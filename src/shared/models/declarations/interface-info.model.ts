import { Property } from '../../types/target/property.type';
import { DeclarationInfo } from './declaration-info.model';
import { IndexableType } from '../../types/indexable-type.type';
import {
    CurvedBracketed,
    getPropertiesFromCurvedBracketed
} from '../../../create/types/target/string/curve-bracketed.type';
import * as chalk from 'chalk';
import { haveSameLength, includes } from '../../utils/arrays.util';

export class InterfaceInfo extends DeclarationInfo {

    indexableType: IndexableType = undefined;
    properties: Property[] = [];
    stringifiedType: string = undefined;

    constructor(name: string, filePath: string, properties: Property[] = [], typeParameters: any[] = []) {
        super(name, filePath, 'Interface', typeParameters);
        this.properties = properties;
    }


    correspondsTo(text: CurvedBracketed): boolean {
        console.log(chalk.blueBright('CTOOOO text'), text);
        console.log(chalk.blueBright('CTOOOO properties'), this.properties);
        const textProperties: Property[] = getPropertiesFromCurvedBracketed(text);
        console.log(chalk.blueBright('CTOOOO text properties'), textProperties);
        return haveSameLength(textProperties, this.properties) && this.textPropertiesAreIncludedInThisProperties(textProperties);
    }


    private textPropertiesAreIncludedInThisProperties(textProperties: Property[]): boolean {
        for (const textProperty of textProperties) {
            if (!this.textPropertyIsIncludedInThisProperties(textProperty)) {
                return false;
            }
        }
        return true;
    }


    private textPropertyIsIncludedInThisProperties(textProperty: Property): boolean {
        const property: Property = this.properties.find(p => p.name === textProperty.name);
        if (!property) {
            return false;
        } else {
            return textProperty.initializer === property.initializer
                && (textProperty.type === property.type || 'apparentType')
                && textProperty.isRequired === property.isRequired;
        }
    }

}
