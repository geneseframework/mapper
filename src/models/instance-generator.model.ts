import { TConstructor } from './t-constructor.model';

export class InstanceGenerator<T> {

    // tConstructor: TConstructor<T> = undefined;
    typeDeclarationPath: string = undefined;
    typeName: string = undefined;


    constructor(typeName: string, typeDeclarationPath: string) {
        this.typeName = typeName;
        this.typeDeclarationPath = typeDeclarationPath;
    }


    get id(): string {
        return `${this.typeName}_${this.typeDeclarationPath}`;
    }
}
