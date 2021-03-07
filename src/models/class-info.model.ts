import { IndexableType } from '../types/indexable-type.type';
import { Property } from '../types/target/property.type';
import { DeclarationInfo } from './declaration-info.model';

export class ClassInfo extends DeclarationInfo {

    hasPrivateConstructor: boolean = undefined;
    indexableType: IndexableType = undefined;
    isAbstract: boolean = undefined;
    numberOfConstructorArguments: number = undefined;
    properties: Property[] = [];


    constructor(filePath: string, numberOfConstructorArguments: number, properties: Property[]) {
        super(filePath, 'Class');
        this.numberOfConstructorArguments = numberOfConstructorArguments;
        this.properties = properties;
    }

}
