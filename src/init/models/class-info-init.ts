// import { DeclarationInfo } from '../../create/models/declarations/declaration-info.model';
// import { IndexableType } from '../../create/types/indexable-type.type';
// import { Property } from '../../create/types/target/property.type';
//
// export class ClassInfoInit {
//
//     hasPrivateConstructor: boolean = undefined;
//     indexableType: IndexableTypeInit = undefined;
//     isAbstract: boolean = undefined;
//     numberOfConstructorArguments: number = undefined;
//     properties: PropertyInit[] = [];
//     filePath: string = undefined;
//     kind: TypeDeclarationKindInit = undefined;
//     name: string = undefined;
//     typeParameters: any[] = [];
//
//
//     constructor(name: string, filePath: string, numberOfConstructorArguments: number, properties: PropertyInit[], typeParameters: any[] = []) {
//         this.numberOfConstructorArguments = numberOfConstructorArguments;
//         this.properties = properties;
//         this.filePath = filePath;
//         this.kind = 'Class';
//         this.name = name;
//         this.typeParameters = typeParameters;
//     }
//
// }
//
// type IndexableTypeInit = {
//     returnType: string,
//     type: 'string' | 'number'
// };
//
// type TypeDeclarationKindInit =  'Class' | 'Enum' | 'Interface' | 'TypeAlias' | 'Date';
//
// type PropertyInit = {
//     initializer: any, // TODO: Initializer with new()
//     isRequired: boolean,
//     name: string,
//     type: string,
// }
//
//
// export class InterfaceInfoInit extends DeclarationInfoInit {
//
//     indexableType: IndexableType = undefined;
//     properties: Property[] = [];
//
//     constructor(name: string, filePath: string, properties: Property[], typeParameters: any[] = []) {
//         super(name, filePath, 'Interface', typeParameters);
//         this.properties = properties;
//     }
//
// }
