import { Property } from '../../types/target/property.type';
import { DeclarationInfo } from './declaration-info.model';
import { IndexableType } from '../../types/indexable-type.type';

export class InterfaceInfo extends DeclarationInfo {

    indexableType: IndexableType = undefined;
    properties: Property[] = [];

    constructor(name: string, filePath: string, properties: Property[]) {
        super(name, filePath, 'Interface');
        this.properties = properties;
    }

}
