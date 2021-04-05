import { Property } from '../property.model';
import { DeclarationInfo } from './declaration-info.model';
import { IndexableType } from '../../types/indexable-type.type';
/**
 * Info about interfaces declared in the user's project.
 * These infos will be added in the generated file declaration-infos.js and then used at runtime by the create() method
 */
export class InterfaceInfo extends DeclarationInfo {

    indexableType: IndexableType = undefined;       // Eventual indexable type (ex: [key: string] = string)
    properties: Property[] = [];                    // The info about the properties of the interface
    stringifiedType: string = undefined;            // The stringified type corresponding to the interface (the text surrounded by curved brackets in some stringified type)

    constructor(name: string, filePath: string, properties: Property[] = [], typeParameters: any[] = []) {
        super(name, filePath, 'Interface', typeParameters);
        this.properties = properties;
    }

}
