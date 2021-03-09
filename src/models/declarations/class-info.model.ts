import { IndexableType } from '../../types/indexable-type.type';
import { Property } from '../../types/target/property.type';
import { DeclarationInfo } from './declaration-info.model';
import { TypeDeclarationKind } from '../../types/type-declaration-kind.type';

export class ClassInfo extends DeclarationInfo {

    hasPrivateConstructor: boolean = undefined;
    indexableType: IndexableType = undefined;
    isAbstract: boolean = undefined;
    numberOfConstructorArguments: number = undefined;
    properties: Property[] = [];


    constructor(name: string, filePath: string, numberOfConstructorArguments: number, properties: Property[], typeParameters: any[] = []) {
        super(name, filePath, 'Class', typeParameters);
        this.numberOfConstructorArguments = numberOfConstructorArguments;
        this.properties = properties;
    }

}
