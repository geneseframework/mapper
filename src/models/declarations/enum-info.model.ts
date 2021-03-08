import { DeclarationInfo } from './declaration-info.model';

export class EnumInfo extends DeclarationInfo {

    values: any[] = [];


    constructor(name: string, filePath: string) {
        super(name, filePath, 'EnumDeclaration');
    }

}
