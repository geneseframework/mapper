import { DeclarationInfoInit } from './declaration-info.model';
import { PropertyInit } from '../../types/property.type';
import { IndexableTypeInit } from '../../types/indexable-type-init.type';

export class ClassInfoInit extends DeclarationInfoInit {

    hasPrivateConstructor: boolean = undefined;
    indexableType: IndexableTypeInit = undefined;
    isAbstract: boolean = undefined;
    numberOfConstructorArguments: number = undefined;
    properties: PropertyInit[] = [];


    constructor(name: string, filePath: string, numberOfConstructorArguments: number, properties: PropertyInit[], typeParameters: any[] = []) {
        super(name, filePath, 'Class', typeParameters);
        this.numberOfConstructorArguments = numberOfConstructorArguments;
        this.properties = properties;
    }

}
