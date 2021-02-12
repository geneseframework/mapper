export class InstanceGenerator<T> {

    numberOfConstructorArguments: number = undefined;
    typeDeclarationPath: string = undefined;
    typeName: string = undefined;


    constructor(typeName: string, typeDeclarationPath: string, numberOfConstructorArguments: number) {
        this.typeName = typeName;
        this.typeDeclarationPath = typeDeclarationPath;
        this.numberOfConstructorArguments = numberOfConstructorArguments;
    }


    get id(): string {
        return `${this.typeName}_${this.typeDeclarationPath.toLowerCase()}`;
    }
}
