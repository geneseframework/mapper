import { Property } from '../../types/target/property.type';
import { DeclarationInfo } from './declaration-info.model';
import { IndexableType } from '../../types/indexable-type.type';
import { CurveBracketed } from '../../../create/types/target/string/curve-bracketed.type';
import * as chalk from 'chalk';

export class InterfaceInfo extends DeclarationInfo {

    indexableType: IndexableType = undefined;
    properties: Property[] = [];
    stringifiedType: string = undefined;

    constructor(name: string, filePath: string, properties: Property[] = [], typeParameters: any[] = []) {
        super(name, filePath, 'Interface', typeParameters);
        this.properties = properties;
    }


    correspondsTo(text: CurveBracketed): boolean {
        console.log(chalk.blueBright('CTOOOO text'), text);
        console.log(chalk.blueBright('CTOOOO properties'), this.properties);
        return undefined;
    }

}
