import { DeclarationInfo } from './declaration-info.model';
/**
 * Info about enums declared in the user's project.
 * These infos will be added in the generated file declaration-infos.js and then used at runtime by the create() method
 */
export class EnumInfo extends DeclarationInfo {

    initializers: any[] = [];       // The values of the enum members

    constructor(name: string, filePath: string, typeParameters: any[] = []) {
        super(name, filePath, 'Enum', typeParameters);
    }

}
