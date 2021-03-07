import { TypeDeclarationKind } from '../types/type-declaration-kind.type';

export abstract class DeclarationInfo {

    filePath: string = undefined;
    kind: TypeDeclarationKind = undefined;
    name: string = undefined;

    protected constructor(name: string, filePath: string, kind: TypeDeclarationKind) {
        this.filePath = filePath;
        this.kind = kind;
        this.name = name;
    }
}
