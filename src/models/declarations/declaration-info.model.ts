import { TypeDeclarationKind } from '../../types/type-declaration-kind.type';
import { GenericParameter } from '../../types/target/generic-parameter.type';

export abstract class DeclarationInfo {

    filePath: string = undefined;
    kind: TypeDeclarationKind = undefined;
    name: string = undefined;
    typeParameters: any[] = [];

    protected constructor(name: string, filePath: string, kind: TypeDeclarationKind, typeParameters: GenericParameter[] = []) {
        this.filePath = filePath;
        this.kind = kind;
        this.name = name;
        this.typeParameters = typeParameters;
    }
}
