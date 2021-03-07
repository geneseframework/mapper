import { TypeDeclarationKind } from '../types/type-declaration-kind.type';

export abstract class DeclarationInfo {

    filePath: string = undefined;
    kind: TypeDeclarationKind = undefined

    protected constructor(filePath: string, kind: TypeDeclarationKind) {
        this.filePath = filePath;
        this.kind = kind;
    }
}
