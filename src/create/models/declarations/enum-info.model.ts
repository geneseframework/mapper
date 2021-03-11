import { DeclarationInfo } from './declaration-info.model';

export class EnumInfo extends DeclarationInfo {

    initializers: any[] = [];

    constructor(name: string, filePath: string, typeParameters: any[] = []) {
        super(name, filePath, 'Enum', typeParameters);
    }

}
