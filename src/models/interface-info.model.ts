import { Property } from '../types/target/property.type';
import { DeclarationInfo } from './declaration-info.model';

export class InterfaceInfo extends DeclarationInfo {

    properties: Property[] = [];

    constructor(filePath: string) {
        super(filePath, 'Interface');
    }

}
