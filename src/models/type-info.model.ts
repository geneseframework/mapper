import { Property } from '../types/target/property.type';
import { DeclarationInfo } from './declaration-info.model';

export class TypeInfo extends DeclarationInfo {

    constructor(name: string, filePath: string) {
        super(name, filePath, 'Interface');
    }

}
