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

}
