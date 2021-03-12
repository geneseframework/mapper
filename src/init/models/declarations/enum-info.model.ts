import { DeclarationInfoInit } from './declaration-info.model';

export class EnumInfoInit extends DeclarationInfoInit {

    initializers: any[] = [];

    constructor(name: string, filePath: string, typeParameters: any[] = []) {
        super(name, filePath, 'Enum', typeParameters);
    }

}
