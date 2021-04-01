import { TypeDeclarationKind } from '../../types/type-declaration-kind.type';
import { GenericParameter } from '../../types/target/generic-parameter.type';
/**
 * Info about classes, interfaces, enums or types declared in the user's project.
 * These infos will be added in the generated file declaration-infos.js and then used at runtime by the create() method
 */
export abstract class DeclarationInfo {

    filePath: string = undefined;               // The path of the file with the concerned declaration in the user's project
    kind: TypeDeclarationKind = undefined;      // The kind of Declaration (class, interface, enum, type)
    name: string = undefined;                   // The name of the class, interface, enum or type
    typeParameters: any[] = [];                 // Type parameters in case of generic parameters

    protected constructor(name: string, filePath: string, kind: TypeDeclarationKind, typeParameters: GenericParameter[] = []) {
        this.filePath = filePath;
        this.kind = kind;
        this.name = name;
        this.typeParameters = typeParameters;
    }
}
