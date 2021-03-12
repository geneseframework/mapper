import { GenericParameterInit } from '../../types/generic-parameter.type';
import { TypeDeclarationKindInit } from '../../types/type-declaration-kind-init.type';

export abstract class DeclarationInfoInit {

    filePath: string = undefined;
    kind: TypeDeclarationKindInit = undefined;
    name: string = undefined;
    typeParameters: any[] = [];

    protected constructor(name: string, filePath: string, kind: TypeDeclarationKindInit, typeParameters: GenericParameterInit[] = []) {
        this.filePath = filePath;
        this.kind = kind;
        this.name = name;
        this.typeParameters = typeParameters;
    }
}
