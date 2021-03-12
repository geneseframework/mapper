import { DeclarationInfoInit } from './declaration-info.model';
import { IndexableTypeInit } from '../../types/indexable-type-init.type';
import { PropertyInit } from '../../types/property.type';

export class InterfaceInfoInit extends DeclarationInfoInit {

    indexableType: IndexableTypeInit = undefined;
    properties: PropertyInit[] = [];

    constructor(name: string, filePath: string, properties: PropertyInit[], typeParameters: any[] = []) {
        super(name, filePath, 'Interface', typeParameters);
        this.properties = properties;
    }

}
