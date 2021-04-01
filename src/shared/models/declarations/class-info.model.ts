import { DeclarationInfo } from './declaration-info.model';
import { IndexableType } from '../../types/indexable-type.type';
import { Property } from '../../types/target/property.type';

/**
 * Info about classes declared in the user's project.
 * These infos will be added in the generated file declaration-infos.js and then used at runtime by the create() method
 */
export class ClassInfo extends DeclarationInfo {

    hasPrivateConstructor: boolean = undefined;         // True if the class has a private or protected constructor, false if not
    indexableType: IndexableType = undefined;           // Eventual indexable type (ex: [key: string] = string)
    isAbstract: boolean = undefined;                    // True if the class is abstract, false if not
    numberOfConstructorArguments: number = undefined;   // The number of the arguments of the constructor of the class
    properties: Property[] = [];                        // The info about the properties of the class


    constructor(name: string, filePath: string, numberOfConstructorArguments: number, properties: Property[], typeParameters: any[] = []) {
        super(name, filePath, 'Class', typeParameters);
        this.numberOfConstructorArguments = numberOfConstructorArguments;
        this.properties = properties;
    }

}
